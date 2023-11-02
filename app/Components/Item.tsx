import Link from "next/link";
import { ItemInterface } from "../admin/inventory/items/page";

export default function Item({ item,categoryName }: { item: ItemInterface,categoryName:string }) {

    return (
        <div>
            <Link href={`/menu/${categoryName}/${item._id}`}>{item.name}</Link>

        </div>
    )
}

