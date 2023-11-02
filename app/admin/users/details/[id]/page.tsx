async function fetchUser(id:string) {
    console.log("id",id)
    const response = await fetch(`http://localhost:3000/api/auth/${id}`)
    const data = await response.json()
    console.log("users data", data)
    return data
}
export default async function UserDetailsPage({ params }: { params: { id: string } }) {
    const data= await fetchUser(params.id)
    const user = data[0]
    console.log("users inside",user.name)

    return (
        <div>
            About

                <div>
                    <p>Name:{user.name}</p>
                    <p>Address:{user.address}</p>
                    <p>{user.phone}</p>
                    <p>{user.email}</p>
                </div>
            
        </div>
    )
}

