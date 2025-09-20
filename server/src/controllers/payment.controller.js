import { createCheckoutSessionService, handleWebhookEventService } from "../services/payment.services.js"


export const createCheckoutSession = async (req, res,next) => {
  try {
    const { items, orderId } = req.body
    const session = await createCheckoutSessionService(items, orderId)
    res.json({ success: true, url: session.url })
  } catch (err) {
    next(err)
   
  }
}

export const handleWebhook = async (req, res) => {
  try {
    await handleWebhookEventService(req)
    res.json({ received: true })
  } catch (err) {
    next(err)
  }
}
