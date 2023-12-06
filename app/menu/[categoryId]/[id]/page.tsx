import AddToCart from "@/app/Components/Cart/AddToCart";
import AddToFavourite from "@/app/Components/Cart/Favourite/AddToFavourite";
import "../../../globals.css";

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
        <section className="bgGreyBackground bg-contain">
            {item && (
                <div className="flex flex-col lg:flex-row">
                    <img src={`/uploads/${item.image}`} alt={`Image of ${item.name}`} />
                    <div className="flex flex-col">
                        <h3>{item.name}</h3>
                        <span>{`${item.price} / pc`}</span>
                        <div>
                            <h4>Details</h4>
                            <p>{item.description}</p>
                        </div>
                        <div>
                            <AddToCart item={item} />
                            <AddToFavourite item={item} />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );

}

