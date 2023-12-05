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
        <ul>
            {categories && categories.map((category: CategoryInterface, index: number) => (
                <div key={index} className="flex gap-1 xl:gap-2 ">
                    <img src={`/uploads/${category.icon}`} alt={`Icon of ${category.name}`} className="h-auto" />
                    <Link href={`/menu/${category.name}`} key={index} className="text-customGrey">{category.name}</Link>
                </div>
            ))}
        </ul>


    )
}

