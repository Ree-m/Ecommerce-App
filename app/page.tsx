"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Home() {

  const { data, status } = useSession();
  const username = data?.user?.name;

  return (
    <main >
      hello world  {username ? `${username}` : ``}
      <button onClick={() => signOut()}>signOut</button>
      {!username && <Link href="/auth/login">Login</Link>}

    </main>
  )
}
