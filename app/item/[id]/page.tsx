import AddToCart from "@/app/Components/Cart/AddToCart";
import AddToFavourite from "@/app/Components/Cart/Favourite/AddToFavourite";
import "../../globals.css";

async function fetchItem(id: string) {
    console.log("id", id)
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
    const itemId: string = params.id
    const item = await fetchItem(itemId)



    return (
        <section className="bg-greyBackground bg-contain">
            {item && (
                <div className="flex flex-col items-center gap-3 lg:grid lg:grid-cols-2">
                    <img src={`/uploads/${item.image}`} alt="Image of this food item" className="w-auto h-[100%" />
                    <div className="flex flex-col w-1/2">
                        <h3 className="text-customYellow font-600 text-4xl 2xl:text-5xl 3xl:text-7xl pb-5 2xl:pb-8 3xl:pb-10 capitalize">{item.name}</h3>
                        <span className="text-customGrey 2xl:text-xl 3xl:text-2xl pb-5 2xl:pb-8 3xl:pb-10">{`$${item.price} / pc`}</span>
                        <div>
                            <h4 className="text-white text-xl 2xl:text-xl 3xl:text-2xl pb-4">Details</h4>
                            <p className="text-customGrey border-b-[1px] border-white pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                        </div>
                        <div className="flex justify-start pt-6">
                            <AddToCart item={item} />
                            <AddToFavourite item={item} />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );

}

