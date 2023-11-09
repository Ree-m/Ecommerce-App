import { useState, Dispatch, SetStateAction, createContext, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { CartItemInterface } from "../api/cart/[id]/route";
import { useRouter } from "next/navigation";
export interface CheckoutDataInterface {

}

export interface CheckoutDataContextInterface {
  cart: CheckoutDataContextInterface;
  setCart: Dispatch<SetStateAction<CheckoutDataContextInterface>>;
  message:string,
  setMessage: Dispatch<SetStateAction<string>>
  deliveryTime:string,
  setDeliveryTime:Dispatch<SetStateAction<string>>

}

// Define your initial state separately
const initialState: CheckoutDataContextInterface = {
  checkoutData: {
   
  },
  setCheckoutData: () => { },
  message:"",
  setMessage:()=>{},
  deliveryTime:"8am-3pm",
  setDeliveryTime:()=>{}
  
};

export const CheckoutDataContext = createContext(initialState);

type CheckoutProviderProps = {
  children: ReactNode;
};


export default function CheckoutDataProvider({ children }: CheckoutProviderProps) {
  const [checkoutData, setCheckoutData] = useState<CheckoutDataInterface>({});
  const [message,setMessage]=useState<string>("")
  const [deliveryTime,setDeliveryTime]=useState<string>("8am-3pm")


  return (
    <CheckoutDataContext.Provider value={{ checkoutData, setCheckoutData,message, setMessage,deliveryTime,setDeliveryTime}}>
      {children}
    </CheckoutDataContext.Provider>
  );
}
