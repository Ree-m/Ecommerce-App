import Item from "@/app/Components/Item";
import "../../globals.css";

async function fetchAllItemsOfACategory(name: string) {
    const response = await fetch(`http://localhost:3000/api/items/${name}`,
        {
            cache: 'no-cache',
            next: { revalidate: 0 }
        }
    )
    const data = await response.json()
    return data
}
async function fetchCategoryData(categoryId: string) {
    const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`,
        {
            cache: 'no-cache',
            next: { revalidate: 0 }
        }
    )
    const data = await response.json()
    return data
}
export default async function MenuPage({ params }: { params: { categoryId: string } }) {
    const categoryId = params.categoryId;
    const categoryData= await fetchCategoryData(categoryId)
    console.log("categoryData inside",categoryData)
    const categoryName = categoryData.name
    const items = await fetchAllItemsOfACategory(categoryId)
    console.log("items inside", items)

    if (!items) {

        return (
            <div>
                <h3 className="text-white text-4xl 2xl:text-5xl 3xl:text-7xl pb-5 2xl:pb-8 3xl:pb-10">{categoryName}</h3>
                <p className="text-white">No items in this category</p>

            </div>
        )

    } else

        return (
            <div>
                <h3 className="text-white text-4xl 2xl:text-5xl 3xl:text-7xl pb-5 2xl:pb-8 3xl:pb-10 capitalize">{categoryName}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">

                    {items.length > 0 && items.map((item: any, index: number) => (
                        <Item key={index} item={item} categoryName={categoryName} />
                    ))}
                </div>

            </div>
        )
}

