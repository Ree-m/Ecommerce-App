
async function fetchItem(id: string) {
    console.log("name", id)
    const response = await fetch(`http://localhost:3000/api/items/item/${id}`,
        {
            cache: 'no-cache',
            next: { revalidate: 0 }
        }
    )
    const data = await response.json()
    console.log("data", data)
    return data
}
export default async function ItemDetailsPage({ params }: { params: { id: string } }) {
    const itemId = params.id;
    const item = await fetchItem(itemId)
    console.log("item", item)


    return (
        <div>
            <h1>Item details</h1>
            <p>{item.name}</p>

        </div>
    )
}

