import { BalanceIcon, WithdrawIcon, Visa, MasterCard, PaypalIcon, ApplepayIcon, HistoryIcon } from "~/assets/icons";
import { Button, Radio } from "~/components/UI";
import  { BsPlusLg } from 'react-icons/bs'
import { ReactNode, useState } from "react";
import { Applepay, Stripe } from "./Payments";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripeApiKey = import.meta.env.VITE_STRIPE_KEY || '';
const stripePromise = loadStripe(stripeApiKey);

type paymentListProps = {
  text: string;
  value: string;
  icon: ReactNode;
}

const Deposit: React.FC = () => {
  
  const [top, setTop] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [usedMethod, setUsedMethod] = useState('');
  const hendleTopUp = () => {
    setTop(true);
    setWithdraw(false);
  }
  const handleWithdraw = () => {
    setTop(false);
    setWithdraw(true);
  }

  const selectPaymentMethod = (value: string) => {
    setUsedMethod(value);
  }
  

  
  const paymentList: paymentListProps[] = [
    {
      text:"Credit Card / Debit Card",
      value: "stripe",
      icon: <div className="flex gap-1 items-center"><Visa/><MasterCard/></div>
    },
    {
      text:"Paypal",
      value: "paypal",
      icon: <PaypalIcon />
    },
    {
      text:"Apple Pay",
      value: "apple",
      icon: <ApplepayIcon/>
    },
  ]
  return (
    <div className='ml-10 w-[70vw] h-[88vh] border rounded-md'>
      <div className='border-b w-full py-4 px-6 font-medium text-lg'>
        Payment Details
      </div>
      <div className="flex flex-col p-6">
        <div className="grid grid-cols-11">
          <div className="flex flex-col gap-6 col-span-3">
              <p className="flex items-center gap-2 font-bold"><BalanceIcon /> Balance</p>
              <p className="text-[#98A2B3] text-5xl font-bold">
                $ 0.00
              </p>
              <div className="flex gap-6">
                <Button
                  icon={<div className={`text-[#0151FF] border border-[#0151FF] bg-[#FFFFFF] w-fit h-fit ml-3 my-2 rounded-full`}><BsPlusLg /></div>}
                  text="Top up"
                  px="px-4"
                  bg_color={top ? 'bg-[#0151FF]' : ''}
                  text_color={top ? 'text-white-100' : ''}
                  onClick={hendleTopUp}
                  className="border"
                />
                <Button
                  icon={<div className={`flex justify-center my-2 text-xl`}><WithdrawIcon /></div>}
                  text="Withdraw"
                  px="px-2"
                  bg_color={withdraw ? 'bg-[#0151FF]' : ''}
                  text_color={withdraw ? 'text-white-100' : ''}
                  onClick={handleWithdraw}
                  className="border"
                />
              </div>
          </div>
          <div className={`w-0.5 h-[290px] bg-[#B4C7D8] col-span-1 ${top ? "block" : 'hidden'}`}></div>     
          <div className={`flex flex-col col-span-3 ${top ? "block" : 'hidden'}`}>
            <p className="flex items-center gap-2 font-bold">Select a Payment Method</p>
            <div className="flex flex-col gap-3">
              {
                paymentList.map((method, index) => {
                  return (
                    <Radio key = {index} text={method.text} value={method.value} icon={method.icon} checked={usedMethod} onClick={() => selectPaymentMethod(method.value)}/>
                  )
                })
              }
              
            </div>
          </div>
          <div className={`w-0.5 h-[290px] bg-[#B4C7D8] col-span-1 ${top && usedMethod === 'stripe' ? "block" : "hidden"}`}></div>     
          <div className={`col-span-3`}>
              <Elements stripe={stripePromise}>
                {
                  top && usedMethod === 'stripe' ?
                  <Stripe />
                  :
                  top && usedMethod === 'apple' ?
                  <Applepay />
                  :
                  ''
                }
              </Elements>
              
          </div>
        </div>
        <div className="mt-10">
          <p className="flex items-center gap-2 font-bold"><HistoryIcon />Transaction</p>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
