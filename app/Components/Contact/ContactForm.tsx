"use client";
import React, { FormEventHandler, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";


export default function ContactForm() {

  const form = useRef();
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [message, setMessage] = useState<string>("")


  async function sendEmail(e: React.FormEvent) {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_KEY
      )
      .then(
        (result: any) => {
          console.log(result.text);
        },
        (error: any) => {
          console.log(error.text);
        }

      );

    setName("")
    setEmail("")
    setSubject("")
    setMessage("")

  };

  return (
    <div className="pb-14">
      <form ref={form} onSubmit={sendEmail} className="bg-[#D9D9D933] rounded-[1rem] p-6 flex flex-col gap-5  text-customYellow w-1/2 mx-auto">
        <div className="flex gap-10">
          <input type="text" name="user_name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name*" className="text-customYellow placeholder-customYellow border-[1px] border-customYellow bg-transparent outline-none rounded-lg pl-3 py-1 w-[33%]" />
          <input type="text" name="user_email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email*" className="text-customYellow placeholder-customYellow border-[1px]  border-customYellow bg-transparent outline-none rounded-lg pl-3 py-1 w-[33%]" />
        </div>
        <input type="text" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject*" className="text-customYellow placeholder-customYellow border-[1px] border-customYellow bg-transparent outline-none rounded-lg pl-3 py-1 w-[75%]" />

        <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message*" className="text-customYellow border-[1px] border-customYellow placeholder-customYellow bg-transparent outline-none rounded-lg pl-3 py-1 h-[100px] " />
        <div className="flex justify-center">
          <button className="bg-customYellow text-black uppercase font-semibold py-2 px-6 rounded-full w-1/4">Send</button>

        </div>
      </form>
    </div>


  );
};

