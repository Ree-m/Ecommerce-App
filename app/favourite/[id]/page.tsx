import DeleteFavourite from "../../Components/Cart/Favourite/DeleteFavourite"
export interface FavouriteInterface {
  name: string,
  price: number,
  itemId: object,
  userId: object,
  image: string
}
async function fetchFavoritesOfAUser(userId: string) {
  console.log("fav userId", userId)
  const response = await fetch(`http://localhost:3000/api/favourite/${userId}`,
    {
      cache: 'no-cache',
    }
  )
  const data = await response.json()
  return data
}
export default async function FavouritePage({ params }: { params: { id: string } }) {
  const userId = params.id
  const favourites = await fetchFavoritesOfAUser(userId)
  console.log("favourites inside", favourites)
  return (
    <div>
      <h1>My favourites</h1>
      <p>test</p>
      {favourites && favourites.map((favourite: FavouriteInterface, index: number) => (
        <div key={index}>
          <p>{favourite.name}</p>
          <DeleteFavourite userId={userId} itemId={favourite.itemId}/>
        </div>
      ))}

      <div>

      </div>
    </div>
  )
}
