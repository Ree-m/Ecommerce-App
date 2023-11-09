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
    <div>
      <h3>Contact</h3>

      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="user_name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" name="user_email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="text" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
        <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
        <button>Send</button>
      </form>

    </div>
  );
};

