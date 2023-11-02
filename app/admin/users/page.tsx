import Link from "next/link"
import Delete from "../adminComponents/Delete"
async function fetchUsers() {
    const response = await fetch(`http://localhost:3000/api/auth`,
        {
            cache: 'no-cache',
            next: { revalidate: 0 }
        }
    )
    const data = await response.json()
    console.log("users data", data)
    return data
}
export default async function UserManagementPage() {
    const users = await fetchUsers()
    console.log("users inside",users)

    return (
        <div>
            User Management

            {users&&users.map((user,index:number)=>(
                <div key={index}>
                    <p>{user.name}</p>
                    <Delete endpoint={`http://localhost:3000/api/auth/${user._id}`} />
                    <Link href={`/admin/users/edit/${user._id}`}>Edit</Link>
                    <Link href={`/admin/users/details/${user._id}`}>Eye</Link>

                </div>
            ))}
        </div>
    )
}

