"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function AddReview() {
  const [message, setMessage] = useState<string>("")
  const [restaurant, setRestaurant] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<number | undefined>(undefined)
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const { data, status } = useSession();
  const userId = data?.user?.id;


  const router = useRouter()

  async function addReview(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    console.log("review values", message, rating,file)
    let formData = new FormData();
    formData.append("image", file);
    formData.append("message", message);
    formData.append("restaurant", restaurant);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("rating", rating);
    formData.append("userId", userId);


    console.log(formData.has("image"))
    console.log("formdata review", formData,formData.has("image"))
    console.log("starting adding review")
    const response = await fetch(`http://localhost:3000/api/review`, {
      method: 'POST',
      // body: JSON.stringify({
      //   message,
      //   restaurant,
      //   name,
      //   phone,
      //   rating,
      //   userId
      // }),
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formData,
      credentials: "include",
    })
    const responseData = await response.json()
    if (responseData.message === 'Review added') {
      console.log("Review added")
      setMessage("")
      setRestaurant("")
      setName("")
      setPhone(0)
      setRating(0)
      setHover(0)
      setFileName(null)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log("seleceted file", selectedFile)
    setFile(selectedFile);
    setFileName(selectedFile?.name || null);

  }

  return (
    <div className="bg-greyBackground flex flex-col items-center justify-center pt-24 w-full">
      <div className="flex flex-col items-center">
        <h3 className="text-white pb-4 text-3xl">Leave your feedback</h3>
        <p className="text-customGrey">Your opinion is important to us</p>
      </div>


      <div className="flex justify-between  w-1/2">
        <p className="text-white w-full py-8">Rating our service:</p>

        <div className="star-rating flex gap-2 flex-nowrap text-3xl">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (

              index <= (hover || rating) ?
                (<button
                  type="button"
                  key={index}
                  className="text-customYellow"
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span className="star"><FaStar /></span>
                </button>)
                :
                (
                  <button
                    type="button"
                    key={index}
                    className="text-customLightGrey"
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <span className="star"><FaRegStar /></span>
                  </button>
                )

            );
          })}
        </div>

      </div>


      <form className="flex flex-col w-1/2 text-customGrey" onSubmit={addReview}>
        <div className="pt-4 pb-8">
          <input className="bg-transparent pb-3 focus:outline-none border-b-[1px] border-customGrey w-full" type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" />
        </div>

        <div className="pt-4 pb-8">

          <input className="bg-transparent pb-3 focus:outline-none border-b-[1px] border-customGrey w-full" type="text" value={restaurant} onChange={(e) => setRestaurant(e.target.value)} placeholder="Choose a restaurant" />
        </div>

        <div className="pt-4 pb-8">
          <input className="bg-transparent pb-3 focus:outline-none border-b-[1px] border-customGrey w-full" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        </div>

        <div className="pt-4 pb-8">
          <input className="bg-transparent pb-3 focus:outline-none border-b-[1px] border-customGrey w-full " type="number" value={phone} onChange={(e) => setPhone(+e.target.value)} placeholder="Phone" />
        </div>

        {/* <div className="pt-4 pb-8">
          <input className="bg-transparent pb-3 focus:outline-none w-full " type="file" onChange={handleFileChange} />
        </div> */}
        <label htmlFor="fileInput" className="bg-transparent pb-5 focus:outline-none w-full cursor-pointer">
          <span className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g clipPath="url(#clip0_1_559)">
                <path d="M14.6549 1.82773C12.9471 0.102375 10.1126 0.137586 8.35204 1.89815L3.80979 6.4404L1.90838 8.34181L1.41542 8.83477L1.06331 9.18688C0.429505 9.82068 0.0773926 10.6834 0.0773926 11.5812C0.0773926 12.4791 0.429505 13.3418 1.06331 13.9756C1.69711 14.6094 2.54218 14.9615 3.45767 14.9615C4.30274 14.9615 5.07739 14.6622 5.7112 14.1165C5.74641 14.0989 5.76401 14.0812 5.78162 14.046L7.22528 12.6024L8.59852 11.2291L13.264 6.56364C13.7042 6.1235 13.933 5.54252 13.9154 4.90871C13.8978 4.29252 13.6513 3.71153 13.2112 3.25378C12.7711 2.81364 12.1901 2.56716 11.5563 2.54956C10.9225 2.53195 10.3415 2.76083 9.90134 3.20097L5.44711 7.6904C5.23584 7.90167 5.23584 8.23618 5.44711 8.42984C5.65838 8.64111 5.99289 8.64111 6.18655 8.42984L10.6584 3.95801C10.8873 3.72914 11.2042 3.6059 11.5387 3.6059C11.8908 3.6059 12.2077 3.74674 12.4542 4.01083C12.9647 4.52139 12.9823 5.33125 12.507 5.8066L6.94359 11.4052L5.1126 13.2362C4.67246 13.6763 4.09148 13.9228 3.45767 13.9228C2.82387 13.9228 2.24289 13.6763 1.80274 13.2362C1.3626 12.796 1.13373 12.2151 1.13373 11.5812C1.13373 10.9651 1.38021 10.3665 1.82035 9.92632L4.1619 7.58477L9.10908 2.63759C10.4471 1.29956 12.6126 1.26435 13.9154 2.56716C14.5492 3.20097 14.8837 4.04604 14.8661 4.94392C14.8485 5.85942 14.4964 6.72209 13.845 7.3735L6.57387 14.6622C6.3626 14.8735 6.3626 15.208 6.57387 15.4017C6.67951 15.5073 6.82035 15.5601 6.94359 15.5601C7.06683 15.5601 7.20767 15.5073 7.31331 15.4017L14.5844 8.13054C15.4295 7.28547 15.9049 6.15871 15.9225 4.97914C15.9401 3.78195 15.4823 2.65519 14.6549 1.82773Z" fill="#AEAEAE" />
              </g>
              <defs>
                <clipPath id="clip0_1_559">
                  <rect width="16" height="15" fill="white" transform="translate(0 0.560059)" />
                </clipPath>
              </defs>
            </svg>

            <p>{fileName ? fileName : "Attach a photo"}</p>

          </span>
        </label>
        <input
          id="fileInput"
          className="hidden"
          type="file"
          onChange={handleFileChange}
        />



        <div className="relative pb-10 flex items-center justify-center">
          <button className="flex flex-col items-center text-white hover:text-customYellow">
            <Image src={`/assests/btn_border_white.png.png`} alt={`Button image`} height={140} width={140} />
            <p className="absolute top-3 text-sm capitalize">Leave a review</p>
          </button>
        </div>

      </form>
    </div>
  )
}

