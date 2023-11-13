async function fetchUser(id:string) {
    const response = await fetch(`http://localhost:3000/api/auth/user/${id}`)
    const data = await response.json()
    return data
}
export default async function UserDetailsPage({ params }: { params: { id: string } }) {
    const data= await fetchUser(params.id)
    const user = data[0]

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

