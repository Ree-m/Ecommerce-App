"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState<number|undefined>(undefined);
    const [address, setAddress] = useState("");
    const router = useRouter();

    const { data, status } = useSession();
    const username = data?.user?.name;


    async function register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {

            e.preventDefault();
            const response = await fetch(`/api/auth/register`, {
                method: "POST",
                body: JSON.stringify({ name, email, password, address, phone, loyaltyPoints: 0 }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const responseData = await response.json();


            if (responseData == "User already exists") {

                alert(`User already exists`);
            } else if (response.ok) {
                alert("Registeration successful.You can login now");
                router.push(`/auth/login`)
            } else {
                alert("Registeration failed.Try again later.");

            }
            setName("")
            setEmail("")
            setPassword("")
            setAddress("")
            setPhone(undefined)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        //     <div >
        //         <form onSubmit={register}>
        //             <div>
        //                 <h2>Register</h2>
        //                 <input
        //                     type="text"
        //                     value={name}
        //                     placeholder="Name"
        //                     onChange={(e) => setName(e.target.value)}
        //                 />

        //                 <input
        //                     type="email"
        //                     value={email}
        //                     placeholder="Email"
        //                     onChange={(e) => setEmail(e.target.value)}
        //                 />
        //                 <input
        //                     type="text"
        //                     value={address}
        //                     placeholder="Address"
        //                     onChange={(e) => setAddress(e.target.value)}
        //                 />
        //                 <input
        //                     type="number"
        //                     value={phone}
        //                     placeholder="Phone number"
        //                     onChange={(e) => setPhone(+e.target.value)}
        //                 />

        //                 <input
        //                     type="password"
        //                     value={password}
        //                     placeholder="Password"
        //                     onChange={(e) => setPassword(e.target.value)}
        //                 />
        //                 <button>Register</button>
        //             </div>


        //         </form>
        //         <button onClick={() => signIn('google')}>Sign in with google</button>

        //     </div>
        <div className="bg-greyBackground bg-contain p-5 pt-14  md:grid md:grid-cols-2 md:p-14">
            <div className="hidden md:flex md:flex-col md:justify-center md:items-center md:gap-2 md:col-span-1">
                <img
                    className=" w-[70%] h-auto"
                    src="/assests/BarBak_Primary_PMS_page-0001-removebg-preview (1) 1.png"
                    alt="Watermark 1"
                />
                <img
                    className=" w-1/2 h-auto"
                    src="/assests/2650b7_6b803c17f4a3441cbc684184a05b6a38_mv2-removebg-preview 1.png"
                    alt="Watermark 2"
                />
                <img
                    src="/assests/2650b7_6b803c17f4a3441cbc684184a05b6a38_mv2-removebg-preview 3.png"
                    alt="Watermark 3"
                    className=" w-1/2 h-auto" />
            </div>

            <div className="flex flex-col gap-3 col-span-1 xl:gap-6">
                <h3 className="text-customYellow text-4xl text-center 2xl:text-5xl 3xl:text-6xl">Welcome</h3>
                <form onSubmit={register} className="bg-customBgGrey rounded-[1rem] flex flex-col gap-4 p-10 xl:gap-5 xl:pb-16">
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-transparent border-b-[1px] text-customYellow border-customYellow outline-none placeholder-customYellow pb-6 xl:text-lg xl:pb-8 2xl:text-xl 3xl:text-2xl 3xl:mb-5"

                    />
                    <input
                        type="text"
                        value={address}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="bg-transparent border-b-[1px] text-customYellow border-customYellow outline-none placeholder-customYellow pb-6 xl:text-lg xl:pb-8 2xl:text-xl 3xl:text-2xl 3xl:mb-5"

                    />
                    <input
                        type="number"
                        value={phone}
                        placeholder="Phone number"
                        onChange={(e) => setPhone(+e.target.value)}
                        required
                        className="bg-transparent border-b-[1px] text-customYellow border-customYellow outline-none placeholder-customYellow pb-6 xl:text-lg xl:pb-8 2xl:text-xl 3xl:text-2xl 3xl:mb-5"

                    />

                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-transparent border-b-[1px] text-customYellow border-customYellow outline-none placeholder-customYellow pb-6 xl:text-lg xl:pb-8 2xl:text-xl 3xl:text-2xl 3xl:mb-5"
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-transparent border-b-[1px] text-customYellow border-customYellow outline-none placeholder-customYellow pb-6 xl:text-lg xl:pb-8 2xl:text-xl 3xl:text-2xl 3xl:mb-5"

                    />
                    <button className="bg-customYellow font-semibold py-2 px-6 rounded-full xl:text-lg 2xl:text-xl 3xl:text-2xl 3xl:px-8 3xl:py-4">SignUp</button>
                    <button
                        onClick={() => signIn('google')}
                        className="bg-white font-semibold py-2 px-6 rounded-full xl:text-lg  2xl:text-xl 3xl:text-2xl 3xl:px-8 3xl:py-4">Signup with Google</button>
                </form>

                <div>
                    <p className="text-white text-center text-lg  2xl:text-xl 3xl:text-2xl">
                        Already have an account? <Link href="/auth/login" className="text-customYellow underline">Sign In</Link>
                    </p>
                </div>
            </div>

        </div>
    );

};

export default RegisterPage;
