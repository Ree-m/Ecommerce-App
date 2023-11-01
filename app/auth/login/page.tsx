"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const { data, status } = useSession();
  const username = data?.user?.name;


  async function login(e) {
    e.preventDefault()

    try {

      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
        name,
      });

      if (data?.error) {
        // Handle login error
        alert("Wrong credentials");
      } else {
        // Login successful
      
        setName("");
        setEmail("");
        setPassword("");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div >
      <form onSubmit={login}>
        <div>
          <h2>Login</h2>
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
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
        </div>

        <div >
          <p>
            Don't have an account? <Link href="/auth/register">Register</Link>
          </p>


        </div>
      </form>
      <button onClick={()=>signIn('google')}>Sign in with google</button>

    </div>
  );

};

export default LoginPage;
