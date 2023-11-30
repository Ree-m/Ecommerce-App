import Item from "@/app/Components/Item";
import WhiteButton from "../Components/WhiteButton";
import Link from "next/link";
import Image from "next/image";

import "../globals.css";


export default async function MenuPage() {


    return (
        <section className="bg-greyBackground bg-contain">
            <h3 className="text-white text-4xl text-center 2xl:text-5xl 3xl:text-6xl">We recommend</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <div className="bg-black rounded-[1rem] p-2 flex flex-col gap-3">
                    <img src="/assests/foodImages/Link → Picture → 548733-401b7149-a046-484e-9f56-3bcd6e49f3a3.webp (1).png" alt="" />
                    <p className="text-white text-lg 2xl:text-xl 3xl:text-2xl">Food 1</p>
                    <span className="text-customGrey">$22 / pc</span>

                    <div className="relative mx-auto">

                        <Link href={``}>
                            <Image src={`/assests/btn_border_white.png.png`} alt={`Button image`} height={140} width={200} />
                            <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-white hover:text-customYellow font-600 text-lg">$22</p>
                        </Link>
                    </div>
                </div>

                <div className="bg-black">
                    <img src="/assests/foodImages/Link → Picture → 548737-48480897-3806-439f-be9b-ecfcefe33779.webp (1).png" alt="" />
                    <p className="text-white">Food 1</p>
                    <span className="text-customGrey">$13 / pc</span>

                    <div className="relative">

                        <Link href={``}>
                            <Image src={`/assests/btn_border_white.png.png`} alt={`Button image`} height={140} width={140} />
                            <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-white text-sm hover:text-customYellow">$13</p>
                        </Link>
                    </div>
                </div>

                <div className="bg-black">
                    <img src="/assests/foodImages/Link → Picture → 548479-f3965572-eeaf-42c1-ad36-a94b662f946d.webp.png" alt="" />
                    <p className="text-white">Food 1</p>
                    <span className="text-customGrey">$23 / pc</span>

                    <div className="relative">

                        <Link href={``}>
                            <Image src={`/assests/btn_border_white.png.png`} alt={`Button image`} height={140} width={140} />
                            <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-white text-sm hover:text-customYellow">$23</p>
                        </Link>
                    </div>
                </div>

                <div className="bg-black">
                    <img src="/assests/foodImages/Link → Picture → 548595-334d110e-0d49-40b7-91d1-0d22a8ddf85b.webp.png" alt="" />
                    <p className="text-white">Food 1</p>
                    <span className="text-customGrey">$9 / pc</span>

                    <div className="relative">

                        <Link href={``}>
                            <Image src={`/assests/btn_border_white.png.png`} alt={`Button image`} height={140} width={140} />
                            <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-white text-sm hover:text-customYellow">$9</p>
                        </Link>
                    </div>
                </div>

                <div className="bg-black">
                    <img src="/assests/foodImages/Link → Picture → 548603-e5e07902-d14c-4933-a197-ee5f4391cab6.webp.png" alt="" />
                    <p className="text-white">Food 1</p>
                    <span className="text-customGrey">$34 / pc</span>

                    <div className="relative">

                        <Link href={``}>
                            <Image src={`/assests/btn_border_white.png.png`} alt={`Button image`} height={140} width={140} />
                            <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-white text-sm hover:text-customYellow">$34</p>
                        </Link>
                    </div>
                </div>

                <div className="bg-black">
                    <img src="/assests/foodImages/Link → Picture → 548599-de478184-ddff-4760-8756-de15622a27ec.webp.png" alt="" />
                    <p className="text-white">Food 1</p>
                    <span className="text-customGrey">$14 / pc</span>

                    <div className="relative">

                        <Link href={``}>
                            <Image src={`/assests/btn_border_white.png.png`} alt={`Button image`} height={140} width={140} />
                            <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-white text-sm hover:text-customYellow">$14</p>
                        </Link>
                    </div>
                </div>

                <div className="bg-black">
                    <img src="/assests/foodImages/Link → Picture → 548817-796e58a5-d7dc-4e88-b4eb-f926fc4896bd.webp.png" alt="" />
                    <p className="text-white">Food 1</p>
                    <span className="text-customGrey">$8 / pc</span>

                    <div className="relative">

                        <Link href={``}>
                            <Image src={`/assests/btn_border_white.png.png`} alt={`Button image`} height={140} width={140} />
                            <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-white text-sm hover:text-customYellow">$8</p>
                        </Link>
                    </div>
                </div>

                <div className="bg-black">
                    <img src="/assests/foodImages/Link → Picture → 548787-af4ed061-8483-4272-b380-d8d07ae16c08.webp.png" alt="" />
                    <p className="text-white">Food 1</p>
                    <span className="text-customGrey">$9 / pc</span>

                    <div className="relative">

                        <Link href={``}>
                            <Image src={`/assests/btn_border_white.png.png`} alt={`Button image`} height={140} width={140} />
                            <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-white text-sm hover:text-customYellow">$8</p>
                        </Link>
                    </div>
                </div>

            </div>

        </section>
    )
}

