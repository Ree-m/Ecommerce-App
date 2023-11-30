import Link from "next/link";
import Image from "next/image";
import React from 'react'
import { SiVisa } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {

    return (
        <div className="w-full bg-greyBackground bg-contain flex justify-around text-white py-12 px-8 sticky">
            <div className="flex flex-col items-start justify-between ">
                <div className="flex">
                    <img className="w-full h-auto" src={`/assests/BarBak_Primary_PMS_page-0001-removebg-preview 3.png`} alt={``} />
                    <img className="w-full h-auto" src={`/assests/BarBak_Primary_PMS_page-0001-removebg-preview 1.png`} alt={``} />
                </div>
                <span className="">© 2020 - 2023 BarBak</span>
            </div>
            <div className="flex flex-col gap-7">
                <nav>

                    <ul className="flex flex-col gap-3">
                        <li><Link href={``}>Menu</Link></li>
                        <li><Link href={`/about`}>About</Link></li>
                        <li><Link href={``}>Service</Link></li>
                        <li><Link href={`/contact`}>Contact</Link></li>

                    </ul>
                </nav>
                <div className="flex text-white justify-center items-center gap-2">
                    <p>We accept payments:</p>
                    <div className="flex items-start gap-2">
                        <i className="text-3xl"><SiVisa /></i>
                        <i className="text-3xl"><FaCcMastercard /></i>
                    </div>


                </div>
            </div>
            <div>
                <ul className="flex flex-col gap-3">
                    <li><Link href={``}>Overview of the service</Link></li>
                    <li><Link href={``}>FAQ's</Link></li>
                    <li><Link href={``}>Approach & Outcome</Link></li>

                </ul>
            </div>
            <div className="flex flex-col gap-3">
                <span>123456789</span>
                <span>123456789</span>
            </div>
            <div className="flex flex-col text-white">
                <p className="pb-2">We are in social networks</p>
                <div className="flex gap-3 ">
                    <Link className="bg-[#474749] p-2 rounded-full" href={``}>
                        <i><FaYoutube /></i>
                    </Link>
                    <Link className="bg-[#474749] p-2 rounded-full" href={``}>

                        <i><FaFacebookF /></i>
                    </Link>
                    <Link className="bg-[#474749] p-2 rounded-full" href={``}>
                        <i>
                            <AiFillInstagram />
                        </i>
                    </Link>
                </div>

                <div>

                </div>
            </div>

        </div>
    )
}

