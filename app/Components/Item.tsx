import React from 'react';
import Link from "next/link";
import { ItemInterface } from "../admin/inventory/items/page";

export default function Item({ item, categoryName }: { item: ItemInterface, categoryName: string }) {

    return (
        <div>
            <div className="bg-black rounded-[1rem] p-3 flex flex-col gap-3">
                <img src={`/uploads/${item.image}`} alt="Image of this food item" />
                <p className="text-white text-lg 2xl:text-2xl 3xl:text-3xl">{item.name}</p>
                <span className="text-customGrey  2xl:text-xl 3xl:text-2xl">{`$${item.price} / pc`}</span>

                <div className="relative mx-auto">
                    <Link href={`/menu/${categoryName}/${item._id}`}>
                        <img src="/assests/btn_border_white.png.png" alt="" className="h-auto w-[140px] lg:h-auto lg:w-[175px]" />
                        <p className="absolute top-6 left-14 pb-[10px] pl-[12px] lg:top-8 lg:left-[70px] transform -translate-x-1/2 -translate-y-1/2 text-white text-sm 2xl:text-lg 3xl:text-xl hover:text-customYellow">{`$${item.price}`}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

