import { useState, useEffect, Dispatch, SetStateAction, createContext, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { CartItemInterface } from "../api/cart/[id]/route";

export interface Cart {
  userId: object,
  items: CartItemInterface[]

}

export interface CartContextInterface {
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
}

// Define your initial state separately
const initialState: CartContextInterface = {
  cart: {
    userId: {},
    items: []

  },
  setCart: () => { },
};

export const CartContext = createContext(initialState);

type CartProviderProps = {
  children: ReactNode;
};


export default function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>({
    userId: {},
    items: [],
  });
  const { data } = useSession();
  const userId: string = data?.user?.id;


  useEffect(() => {
    async function fetchCartOfAUser() {
      try {
        if (userId) {
          const response = await fetch(`http://localhost:3000/api/cart/${userId}`, {
            credentials: 'include'
          });
          console.log("response", response)
          const data = await response.json();
          console.log("data", data)
          setCart(data);
        }

      } catch (error) {
        console.log("Error fetching bookmark data:", error);
      }
    }

    fetchCartOfAUser();
  }, [userId]);



  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
