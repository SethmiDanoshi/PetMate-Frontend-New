// PaymentModal.jsx (can be in same file)
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { createOrder, createPaymentIntent } from "../../apis/paymnetApis";

const PaymentModal = ({ open, onClose, pet, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!stripe || !elements) return;

        try {
            setProcessing(true);

            const data =  {
                amount: Math.round(pet.price * 100), 
                currency: "LKR",
                metadata: { itemId: pet.id, itemType: "pet", itemName: pet.name }
            }
            // const resp = await axios.post("http://localhost:8080/api/payments/create-payment-intent", {
            //     amount: Math.round(pet.price * 100), 
            //     currency: "LKR",
            //     metadata: { itemId: pet.id, itemType: "pet", itemName: pet.name }
            // });

            const resp = await createPaymentIntent(data);

            const clientSecret = resp.data.clientSecret; 
            
            const cardElement = elements.getElement(CardElement);
            const confirmResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement, billing_details: { name: "Buyer" } }
            });

            if (confirmResult.error) {
                setError(confirmResult.error.message);
                setProcessing(false);
                return;
            }

            if (confirmResult.paymentIntent && confirmResult.paymentIntent.status === "succeeded") {
                
                const data =  {
                    itemId: pet.id,
                    itemType: "pet",
                    amount: pet.price,
                    sellerId: pet.sellerId,
                    currency: "LKR",
                    paymentIntentId: confirmResult.paymentIntent.id,
                    buyerId: sessionStorage.getItem("uid")
                }

                // await axios.post("http://localhost:8080/api/payments/orders", {
                //     itemId: pet.id,
                //     itemType: "pet",
                //     amount: pet.price,
                //     sellerId: pet.sellerId,
                //     currency: "LKR",
                //     paymentIntentId: confirmResult.paymentIntent.id,
                //     buyerId: sessionStorage.getItem("uid")
                // });

                await createOrder(data);

                onSuccess(confirmResult.paymentIntent);
                setProcessing(false);
                onClose();
            } else {
                setError("Payment did not succeed.");
                setProcessing(false);
            }
        } catch (err) {
            setError(err?.response?.data?.message || err.message || "Payment failed");
            setProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-2">Buy {pet.name}</h2>
                <p className="text-sm text-gray-600 mb-4">Price: LKR {pet.price.toFixed(2)}</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Card details</label>
                        <div className="border p-3 rounded">
                            <CardElement options={{ hidePostalCode: true }} />
                        </div>
                    </div>

                    {error && <div className="text-red-500 mb-2">{error}</div>}

                    <div className="flex justify-end gap-3">
                        <button type="button" disabled={processing} onClick={onClose}
                            className="px-4 py-2 border rounded">Cancel</button>
                        <button type="submit" disabled={!stripe || processing}
                            className="px-4 py-2 bg-[#640D56] text-white rounded">
                            {processing ? "Processing..." : `Pay LKR ${pet.price.toFixed(2)}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;
