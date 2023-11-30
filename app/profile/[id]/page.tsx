import { UserInterface } from "../../api/auth/register/route";
import SignOut from "@/app/Components/Profile/SignOut";
import EditProfile from "@/app/Components/Profile/EditProfile";
import Image from "next/image";
import AddAvatar from "@/app/Components/Profile/AddAvatar";
import Profile from "../../Components/Profile/Profile";
import "../../globals.css";


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
    <Profile userData={userData} userId={userId}/>
    // <div className="bg-greyBackground bg-contain">
    //   {!userData.image || userData.image == "default-image.png" || userData.image == "" ? (
    //     <Image src="/assests/pngwing 33.png" alt="default avatar" width={100} height={100} />
    //   ) : <Image src={`/uploads/${userData.image}`} alt="default avatar" width={100} height={100} />
    //   }

    //   <AddAvatar userId={userId} userData={userData} />
    //   <SignOut />
    //   <EditProfile userId={userId} userData={userData} />


    //   <div>
    //     <p>{userData.address}</p>
    //     <p>{userData.phone}</p>
    //   </div>
    //   h1heheeh

    // </div>
  )
}
