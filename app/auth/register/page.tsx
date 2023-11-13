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
    const [phone, setPhone] = useState<number>(0);
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
                body: JSON.stringify({ name, email, password, address, phone}),
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
            setPhone(0)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div >
            <form onSubmit={register}>
                <div>
                    <h2>Register</h2>
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        value={address}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        type="number"
                        value={phone}
                        placeholder="Phone number"
                        onChange={(e) => setPhone(+e.target.value)}
                    />

                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>Register</button>
                </div>


            </form>
            <button onClick={() => signIn('google')}>Sign in with google</button>

        </div>
    );

};

export default RegisterPage;
