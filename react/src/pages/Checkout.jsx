import React, { useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { CustomButton } from "../components";
import { getCanvasImage } from "../config/helpers";
import { motion, AnimatePresence } from "framer-motion";
import { fadeAnimation } from "../config/motion";

const Checkout = () => {
  const snap = useSnapshot(state); // Get the state from the store

  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handleMockPaymentSubmission = () => {
    console.log("Billing Info: ", billingInfo);
    alert("Payment successfully processed (mock)!");
  };

  return (
    <AnimatePresence>
      {snap.check && (
        <section className="bg-gray-50 min-h-screen flex flex-col items-center py-10 px-4">
          {/* Product Section */}
          <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-4">
              Your Customized Product
            </h2>
            <div className="flex justify-center items-center mb-6">
              {getCanvasImage() ? (
                <img
                  src={getCanvasImage()}
                  alt="Your customized product"
                  className="w-64 h-auto rounded-lg border"
                />
              ) : (
                <p className="text-gray-500">Loading image...</p>
              )}
            </div>

            {/* Checkout Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {/* Billing Info */}
              <div>
                <h2 className="text-xl font-bold mb-4">Billing Information</h2>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Full Name"
                      value={billingInfo.name}
                      onChange={handleBillingChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      value={billingInfo.email}
                      onChange={handleBillingChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Address"
                      value={billingInfo.address}
                      onChange={handleBillingChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
                    style={{ zIndex: 30, position: "relative" }}
                    onClick={handleMockPaymentSubmission}
                  >
                    Submit Billing Information
                  </button>
                </form>
              </div>

              {/* Payment Options */}
              <div>
                <h2 className="text-xl font-bold mb-4">
                  Choose Payment Method
                </h2>
                <div className="space-y-4">
                  <CustomButton
                    type="filled"
                    title="💳 Pay with Credit Card"
                    handleClick={handleMockPaymentSubmission}
                    customStyles="w-full text-lg bg-yellow-400 py-3 rounded-lg hover:bg-yellow-500 transition duration-200"
                  />
                  <div className="text-center font-semibold text-gray-500">
                    or
                  </div>
                  <CustomButton
                    type="filled"
                    title="🛡️ Pay with PayPal"
                    handleClick={handleMockPaymentSubmission}
                    customStyles="w-full text-lg bg-yellow-400 py-3 rounded-lg hover:bg-yellow-500 transition duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <motion.div className="absolute bottom-5 right-5" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="Customize it"
              handleClick={() => {
                state.custom = true;
                state.check = false;
                state.canv = true;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm bg-gray-900 text-white hover:bg-gray-700 transition duration-200"
            />
          </motion.div>
          <motion.div className="absolute top-5 right-5" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="Home"
              handleClick={() => {
                state.intro = true;
                state.check = false;
                state.canv = true;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm bg-gray-900 text-white hover:bg-gray-700 transition duration-200"
            />
          </motion.div>
        </section>
      )}
    </AnimatePresence>
  );
};

export default Checkout;
