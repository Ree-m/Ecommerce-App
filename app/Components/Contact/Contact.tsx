import React from "react";
import ContactForm from "./ContactForm";


export default function Contact() {



    return (
        <div className="bg-greyBackground bg-contain">
            {/* contacts */}
            <div className="flex gap-10 p-14 text-white pb-20 ">
                <div>
                    <h3 className="text-4xl pb-6">Contacts</h3>
                    <div>
                        <h5 className="text-2xl pb-2">Address</h5>
                        <p className="text-customGrey text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                    </div>
                    <div className="flex gap-16 pt-4">
                        <div className="flex flex-col">
                            <h5 className="text-2xl pb-1">Phone</h5>
                            <span className="text-customGrey text-lg">12345678</span>
                            <span className="text-customGrey text-lg">12345678</span>
                        </div>
                        <div className="flex flex-col">
                            <h5 className="text-2xl pb-1">Email</h5>
                            <span className="text-customGrey text-lg">abcd@gmail.com</span>
                            <span className="text-customGrey text-lg">efgh@gmail.com</span>

                        </div>
                    </div>

                </div>
                <img src="/assests/contacts-phone.png" alt="Image of a phone" className="w-1/3 h-auto" />
            </div>

            <ContactForm/>



        </div>
    );
};

