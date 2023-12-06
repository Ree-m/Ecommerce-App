import Link from "next/link";
import React from 'react';
import { CategoryInterface } from "../admin/inventory/categories/page";
async function fetchAllCategories() {
    const response = await fetch(`http://localhost:3000/api/categories`,
        {
            cache: 'no-cache',
            next: { revalidate: 0 }
        }
    )
    const data = await response.json()
    console.log("data", data)
    return data
}

export default async function MenuSideBar() {

    const categories = await fetchAllCategories()
    console.log("categories inisde", categories)

    return (
        <ul className="hidden lg:flex flex-col items-center flex-nowrap lg:pr-10">
            {categories && categories.map((category: CategoryInterface, index: number) => (
                <li key={index} className="flex gap-1 xl:gap-2">
                    <img src={`/uploads/${category.icon}`} alt={`Icon of ${category.name}`} className="h-auto w-[100%]" />
                    <Link href={`/menu/${category._id}`} key={index} className="text-customGrey capitalize flex flex-row flex-nowrap">{category.name}</Link>
                </li>
            ))}
        </ul>
    )
}

