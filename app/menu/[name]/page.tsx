import Item from "@/app/Components/Item";

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
export default async function MenuPage({ params }: { params: { name: string } }) {
    const categoryName = params.name;
    const items = await fetchAllItemsOfACategory(categoryName)


    return (
        <div>
            Menu Page
            {items.length>0 && items.map((item:any,index:number)=>(
                <Item key={index} item={item} categoryName={categoryName}/>
            ))}
 
        </div>
    )
}

