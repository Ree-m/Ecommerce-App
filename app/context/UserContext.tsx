import { useState, useEffect, Dispatch, SetStateAction, createContext, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { CartItemInterface } from "../api/cart/[id]/route";
// import { useRouter } from "next/navigation";
import { UserInterface } from "../api/auth/register/route";
import UserDetailsPage from "../admin/users/details/[id]/page";

export interface UserContextInterface {
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface>>;

}


const initialState: UserContextInterface = {
    userData: {
        name: "",
        address: "",
        phone: 0,
        email:"",
        role:"",
        _id:""
    },
    setUserData: () => { },

};

export const UserContext = createContext(initialState);

type UserProviderProps = {
    children: ReactNode;
};


export default function UserProvider({ children }: UserProviderProps) {
    const [userData, setUserData] = useState<UserInterface>({
        name:"",
        address: "",
        phone:0,
        email:"",
        role:"",
        _id:""
    });

    const { data } = useSession();
    const userId: string = data?.user?.id;
    // const router = useRouter()

    useEffect(() => {
        async function fetchUserData() {
            try {
                if (userId) {
                    const response = await fetch(`http://localhost:3000/api/auth/user/${userId}`, {
                        credentials: 'include'
                    });
                    console.log("response", response)
                    const data:UserInterface[] = await response.json();

                    console.log("data", data)
                    setUserData(data);
                    // router.refresh()

                }

            } catch (error) {
                console.log("Error fetching bookmark data:", error);
            }
        }

        fetchUserData();
    }, [userId]);



    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}

