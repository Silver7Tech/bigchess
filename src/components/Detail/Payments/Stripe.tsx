import { Input } from "~/components/UI";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { trpc } from '~/helpers/trpc';

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
const schema = Yup.object({
    name: Yup.string().required('Please provide a valid name'),
    email: Yup.string().email().required('Please provide a valid email'),
});
export const Stripe = () => {
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
        },
      });
    const sendPayment = useMutation({
        mutationFn: async (data: { paymentMethodId: string }) => await trpc.mutation('payment.stripePayment', data),
        onSuccess: (data: any) => {
            console.warn(data);            
        },
        onError: (_error: any) => {
            // show error message in toast
        },
    });
    async function onSubmit(param: {name: string, email: string }) {
        if (!stripe || !elements) {
            return;
        }
        const { paymentMethod }: any = await stripe.createPaymentMethod({
            elements,
            params: {
                billing_details : {
                    name: param.name,
                    email: param.email
                }
            }
        });
        const data = {paymentMethodId: paymentMethod?.id}
        sendPayment.mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
                <div className="text-xs">
                    <p>Name on Card</p>
                    <Input 
                        {...register('name')} 
                        placeholder="John Doe" 
                        error={errors.name?.message}
                        className="w-[290px] h-12"
                    />
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
                    <Input 
                        {...register('email')} 
                        type="email" 
                        placeholder="Email address"
                        error={errors.email?.message}
                        className="w-[290px] h-12"
                    />
                </div>
                <button type="submit" disabled={!stripe}  className="bg-[#01B6FF] w-[290px] h-12 text-white-100 rounded-md" >
                    Pay
                </button>
            </div>
        </form>
    )
}