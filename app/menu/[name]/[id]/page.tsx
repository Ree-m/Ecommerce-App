import AddToCart from "@/app/Components/Cart/AddToCart";
import AddToFavourite from "@/app/Components/Cart/Favourite/AddToFavourite";
async function fetchItem(id: string) {
    console.log("id", id)
    const response = await fetch(`http://localhost:3000/api/items/item/${id}`,

    )
    const data = await response.json()
    console.log("data", data)
    return data
}


export default async function ItemDetailsPage({ params }: { params: { id: string } }) {
    const itemId: string = params.id
    const item = await fetchItem(itemId)



    return (
        <div>
            {item && (
                <div>
                    <h1>Item details</h1>
                    <p>{item.name}</p>
                    <AddToCart item={item} />
                    <AddToFavourite item={item} />

                </div>
            )}
        </div>
    );

}

