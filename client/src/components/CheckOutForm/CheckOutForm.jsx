import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaCity, FaFlag, FaGlobe, FaLandmark } from "react-icons/fa";
import { MdOutlineMarkunreadMailbox } from "react-icons/md";

const CheckoutForm = ({ onSubmit, onCancel }) => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");
  const [landmark, setLandmark] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!street.trim()) newErrors.street = "Required";
    if (!city.trim()) newErrors.city = "Required";
    if (!state.trim()) newErrors.state = "Required";
    if (!postalCode.trim()) newErrors.postalCode = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }
    onSubmit(
      { street, city, state, postalCode, country, landmark },
      paymentMethod
    );
  };

  const InputField = ({ icon: Icon, label, error, ...props }) => (
    <div className="relative">
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          {...props}
          className={`w-full pl-8 pr-2 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-green-700 focus:border-green-700 outline-none transition-all duration-200 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg transform transition-all duration-300 animate-fadeIn"
      >
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-gray-800">
          Shipping Address & Payment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <InputField
            icon={FaMapMarkerAlt}
            label="Street Address"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street address"
            required
            error={errors.street}
          />
          <InputField
            icon={FaCity}
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
            error={errors.city}
          />
          <InputField
            icon={FaFlag}
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            required
            error={errors.state}
          />
          <InputField
            icon={MdOutlineMarkunreadMailbox}
            label="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Postal code"
            required
            error={errors.postalCode}
          />
          <InputField
            icon={FaGlobe}
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            required
          />
          <InputField
            icon={FaLandmark}
            label="Landmark (Optional)"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="Landmark"
          />
        </div>

        <div className="mt-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-2 text-sm focus:ring-1 focus:ring-green-700 focus:border-green-700 outline-none transition-all duration-200"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="ONLINE">Pay Online (Card)</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;