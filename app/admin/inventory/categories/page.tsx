import { revalidateTag } from 'next/cache'

import Delete from "../../adminComponents/Delete"

async function fetchCategories() {
    const response = await fetch(`http://localhost:3000/api/admin/inventory/categories`,
        { next: { tags: ['collection'] } })
    const data = await response.json()
    console.log("data", data)
    return data
}
interface CategoryInterface {
    _id: string,
    name: string,
    icon: string,
    position: number,
    status: string
}
export default async function CategoriesPage() {
    const categories = await fetchCategories()
    console.log("inside", categories)


    return (
        <div>
            Categories Page

            <div>
                {categories && categories.map((category: CategoryInterface, index: number) => (
                    <div>
                        <h2>{category.name}</h2>
                        <Delete endpoint={`http://localhost:3000/api/admin/inventory/categories/${category._id}`} />
                    </div>
                ))}
            </div>
        </div>
    )
}

