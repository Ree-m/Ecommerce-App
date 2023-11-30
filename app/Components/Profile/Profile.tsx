import React from "react"
import Image from "next/image"
import AddAvatar from "./AddAvatar"
import SignOut from "./SignOut"
import EditProfile from "./EditProfile";
import { UserInterface } from "@/app/api/auth/register/route";
import Link from "next/link";

export default function Profile({ userData, userId }: { userData: UserInterface, userId: string }) {

    return (
        <div className="bg-greyBackground bg-contain text-white p-5 pt-14 flex flex-col gap-4 items-center">
            <div className="flex flex-col justify-center items-center" >
                {!userData.image || userData.image == "default-image.png" || userData.image == "" ? (
                    <Image src="/assests/pngwing 33.png" alt="default avatar" width={100} height={100} />
                ) : <Image src={`/uploads/${userData.image}`} alt="default avatar" width={100} height={100} />
                }
                <h3 className="text-customYellow uppercase">{userData.name}</h3>

            </div>
            {/* buttons */}
            <div className="flex flex-wrap">
                <SignOut />
                <div className="relative">

                    <Link href={`/my-orders`}>
                        <Image src={`/assests/btn_border_white.png.png`} alt={`Button image`} height={140} width={140} />
                        <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-white text-sm hover:text-customYellow">Orders</p>
                    </Link>
                </div>

                <div className="relative">

                    <Link href={``}>
                        <Image src={`/assests/btn_border_white.png.png`} alt={`Button image`} height={140} width={140} />
                        <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-white text-sm hover:text-customYellow">Favourites</p>
                    </Link>
                </div>

                <EditProfile userId={userId} userData={userData} />


            </div>

            <div className="bg-customBgGrey rounded-[1rem] p-6">
                <p><span className="text-customYellow">Name:- </span>{userData.name}</p>
                <p><span className="text-customYellow">Address:- </span>{userData.address}</p>
                <p><span className="text-customYellow">Phone:- </span>{userData.phone}</p>
                <AddAvatar userId={userId} userData={userData} />

            </div>

        </div>

    )
}

