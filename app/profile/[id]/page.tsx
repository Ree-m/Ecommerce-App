import { UserInterface } from "../../api/auth/register/route";
import SignOut from "@/app/Components/Profile/SignOut";
import EditProfile from "@/app/Components/Profile/EditProfile";

async function fetchAUser(userId: string) {
  const response = await fetch(`http://localhost:3000/api/auth/user/${userId}`,
    {
      cache: 'no-cache',
    }
  )
  const data = await response.json();
  return data;
}
export default async function ProfilePage({ params }: { params: { id: string } }) {
  const userId = params.id;
  const userDataArr: UserInterface[] = await fetchAUser(userId);
  const userData: UserInterface = userDataArr[0];

  return (
    <div>
      <h2>{userData.name}</h2>
      <SignOut />
      <EditProfile userId={userId} userData={userData}/>


      <div>
        <p>{userData.address}</p>
        <p>{userData.phone}</p>

      </div>



    </div>
  )
}
