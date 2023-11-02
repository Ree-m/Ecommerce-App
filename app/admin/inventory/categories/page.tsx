
import Delete from "../../adminComponents/Delete"
import Link from 'next/link';

async function fetchCategories() {
    const response = await fetch(`http://localhost:3000/api/admin/inventory/categories`,
        { cache: 'no-cache' })
    const data = await response.json()
    console.log("data", data)
    return data
}
export interface CategoryInterface {
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
                    <div key={index}>
                        <h2>{category.name}</h2>
                        <Delete endpoint={`http://localhost:3000/api/admin/inventory/categories/${category._id}`} />
                        <Link href={`/admin/inventory/categories/edit/${category._id}`}>Edit</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

