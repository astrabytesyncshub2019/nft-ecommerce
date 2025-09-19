// payment.js
import { Router } from "express";
import Stripe from "stripe";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";

// Import your order service for updating order status
// import { updateOrderStatus } from "../services/orderService.js";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// -------------------------
// 1️⃣ Create Checkout Session
// -------------------------
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, orderId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items provided" });
    }

    // Convert items into Stripe format
    const line_items = items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cart", // Redirect to cart on cancel
      metadata: { orderId }, // Ensure orderId is in metadata
      payment_intent_data: {
        description: `Order #${orderId}`, // Display orderId in Stripe dashboard
      },
      locale: "en",
    });

    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// -------------------------
// 2️⃣ Webhook Endpoint
// -------------------------
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"]

    let event
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle successful payment
    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      const { orderId } = session.metadata

      try {
        // ✅ Update order status to 'paid' and automatically clear cart
        await updateOrderStatusService(orderId, "paid")
        console.log("✅ Payment succeeded and cart cleared for order:", orderId)
      } catch (err) {
        console.error("Failed to update order status:", err)
      }
    }

    res.json({ received: true })
  }
)

export default router;