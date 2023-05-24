import { useState, useEffect } from "react";
import { useStripe, PaymentRequestButtonElement } from "@stripe/react-stripe-js";

export const Applepay = () => {
    const stripe = useStripe() as any;
    const [paymentRequest, setPaymentRequest] = useState<any>(null);
    useEffect(() => {
        if (stripe) {
          const pr = stripe.paymentRequest({
            country: "US",
            currency: "usd",
            total: {
              label: "Membership",
              amount: 2000,
            },
            requestPayerName: false,
            requestPayerEmail: false,
            // disableWallets: ["googlePay", "browserCard"],
          });
          
          pr.canMakePayment().then((result: any) => {
            console.warn(result);
            if (result) {
              setPaymentRequest(pr);
            }
          });
        }
    },[stripe]);
    
    const onPaymentSubmit = () => {
        paymentRequest.on("paymentmethod", handlePaymentRequest);
    };
    const handlePaymentRequest = async (event: any) => {
        console.warn(event);
    }
    
    return (
        <>
        <form>
            {
                paymentRequest && (
                    <PaymentRequestButtonElement 
                        options={{ paymentRequest }}
                        onClick={onPaymentSubmit}
                    />
                )
            }
        </form>
        </>
    )
}