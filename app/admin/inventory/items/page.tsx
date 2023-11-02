import Delete from "../../adminComponents/Delete"
import Link from 'next/link'
async function fetchItems() {
    const response = await fetch(`http://localhost:3000/api/admin/inventory/items`,
        {
            cache: 'no-cache',
            next: { revalidate: 0 }
        }
    )
    const data = await response.json()
    console.log("data", data)
    return data
}
export interface ItemInterface {
    _id: string,
    name: string,
    image: string,
    position: number,
    status: string,
    price: number,
    parentCategory: string
}


export default async function ItemsPage() {

    const items = await fetchItems()
    console.log("inside", items)


    return (
        <div>
            Items Page

            <div>
                <Link href={`/admin/inventory/items/add`}>Add Item</Link>

                {items && items.map((item: ItemInterface, index: number) => (
                    <div key={index}>
                        <h2>{item.name}</h2>
                        <Delete endpoint={`http://localhost:3000/api/admin/inventory/items/${item._id}`} />
                        <Link href={`/admin/inventory/items/edit/${item._id}`}>Edit</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

