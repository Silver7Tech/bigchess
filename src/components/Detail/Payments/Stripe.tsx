import { Input } from "~/components/UI";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const useOptions = () => {
    const options =
      {
        style: {
          base: {
            fontSize: '14px',
            color: "#424770",
            letterSpacing: "0.005em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
              color: "#aab7c4"
            }
          },
          invalid: {
            color: "#9e2146"
          }
        },
        hidePostalCode: true,

      }
  
    return options;
  };

export const Stripe = () => {
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
          return;
        }
    
        // const payload = await stripe.createPaymentMethod({
        //   type: "card",
        //   card: 
        // });
        console.warn(elements)
      };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
                <div className="text-xs">
                    <p>Name on Card</p>
                    <Input placeholder="John Doe" className="w-[290px] h-12"/>
                </div>
                <div className="text-xs">
                    <p>Card Information</p>
                    <div className="w-[290px] h-12 border py-[15px] rounded-md px-1">
                        <CardElement
                            options={options}
                        />
                    </div>
                </div>
                <p className="text-xs font-semibold">Contact Information</p>
                <div className="text-xs">
                    <p>Email Address</p>
                    <Input type="email" placeholder="Email address" className="w-[290px] h-12"/>
                </div>
                <button type="submit" disabled={!stripe}  className="bg-[#01B6FF] w-[290px] h-12 text-white-100 rounded-md" >
                    Pay
                </button>
            </div>
        </form>
    )
}