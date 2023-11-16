// import Link from "next/link";
// import Image from "next/image";

// export default function HomePage() {
//   return (
//     <div>
//       {/* hero */}
//       <div className="bg-greyBackground bg-cover bg-center bg-no-repeat relative">
//         <div className="bg-watermark bg-center bg-no-repeat flex justify-between">
//           <div>
//             <h1 className="text-white text-3xl leading-loose">Need your favourite <span className="text-customYellow capitalize">restaurant</span> at Home?</h1>
//             <h4 className="text-white">Try it at <span className="uppercase">Barbak</span></h4>
//             <Link href={``} className="text-white">Order Delivery</Link>
//           </div>
//           <div className="relative flex flex-col items-end pr-8">
//           <div className="w-[200px] h-[200px] rounded-full border-2 border-white"></div>

//               <Image className="" src={`/assests/div.intro-home__pattern (1).png`} alt={``} height={200} width={200} />
//               <Image className="origin-top-left rotate-[-8deg]" src={`/assests/div.intro-home__pattern.png`} alt={``} height={400} width={400} />
//               <Image className="origin-top-left rotate-[-8deg]" src={`/assests/div.skewer-with-meat.png`} alt={``} height={200} width={200} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );

// }
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      {/* hero */}
      <div className="bg-greyBackground bg-contain">
        <div className="bg-watermark bg-center bg-no-repeat flex justify-between relative">
          <div className="pl-36 pt-36">
            <h1 className="text-white text-5xl tracking-wide">Need your favourite <br /><span className="text-customYellow capitalize">restaurant</span> at Home?</h1>
            <h4 className="text-white pt-6 pb-8 text-2xl">Try it at <span className="uppercase">Barbak</span></h4>
            <Link href={``} className="text-white inline-block px-8 py-2  border border-white hover:border-customYellow hover:text-customYellow">Order Delivery</Link>

          </div>
          {/* <div className="relative flex flex-col items-end pr-8">
            <div className="w-[200px] h-[200px] rounded-full border-2 border-white absolute right-0 top-1/2 transform -translate-y-1/2"></div>
            <Image className="z-10" src={`/assests/div.intro-home__pattern (1).png`} alt={``} height={200} width={200} />
            <Image className="z-10 origin-top-left rotate-[-8deg]" src={`/assests/div.intro-home__pattern.png`} alt={``} height={400} width={400} />
            <Image className="z-10 origin-top-left rotate-[-8deg]" src={`/assests/div.skewer-with-meat.png`} alt={``} height={200} width={200} />
          </div> */}
        </div>
        <img className="w-full" src={`/assests/div.intro-home__bottomPattern (1).png`} alt={``} />

      </div>

      {/* Try our services */}
      <div className="w-full px-14">
        <div>
          <Image src={`/assests/div.links-block0__bg (3).png`} alt={``} height={327} width={282} />
          <h3 className="text-customBlack text-3xl text-center font-medium pb-10">It's time to try our services</h3>

        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center gap-5 px-5 hover:border-opacity-50 hover:border-yellow-500 hover:bg-opacity-40 hover:shadow-lg transition-all duration-300">
            <h4 className="text-customBlack hover:text-customYellow text-xl  py-4 uppercase text-center">Hospitality <br /> Couriers
            </h4>
            <p className="text-[12px] leading-6 text-customLightBlack pb-8">We give you hours of your precious life back, with full price transparency, by supplying everything you need to run your business from our fulfillment centers to your shelves and fridges.
            </p>


            <div className="relative pb-10">

              <Link href={``}>
                <Image src={`/assests/btn-border_black.png.png`} alt={``} height={140} width={140} />
                <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-customBlack text-sm hover:text-customYellow">Learn More</p>
              </Link>
            </div>

          </div>

          <div className="flex flex-col justify-center items-center gap-5  px-5 hover:border-opacity-50 hover:border-yellow-500 hover:bg-opacity-40 hover:shadow-lg transition-all duration-300">
            <h4 className="text-customBlack hover:text-customYellow text-xl  py-4 uppercase text-center">Restaurant<br />Depot Delivery
            </h4>
            <p className="text-[12px] leading-6 text-customLightBlack pb-8">We give you hours of your precious life back, with full price transparency, by supplying everything you need to run your business from our fulfillment centers to your shelves and fridges.
            </p>


            <div className="relative pb-10">

              <Link href={``}>
                <Image src={`/assests/btn-border_black.png.png`} alt={``} height={140} width={140} />
                <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-customBlack text-sm hover:text-customYellow">Learn More</p>
              </Link>
            </div>

          </div>

          <div className="flex flex-col justify-center items-center gap-5  px-5 hover:border-opacity-50 hover:border-yellow-500 hover:bg-opacity-40 hover:shadow-lg transition-all duration-300">
            <h4 className="text-customBlack hover:text-customYellow text-xl  py-4 uppercase text-center">Alcohol<br />Delivery
            </h4>
            <p className="text-[12px] leading-6 text-customLightBlack pb-8">We give you hours of your precious life back, with full price transparency, by supplying everything you need to run your business from our fulfillment centers to your shelves and fridges.
            </p>


            <div className="relative pb-10">

              <Link href={``}>
                <Image src={`/assests/btn-border_black.png.png`} alt={``} height={140} width={140} />
                <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-customBlack text-sm hover:text-customYellow">Learn More</p>
              </Link>
            </div>

          </div>

          <div className="flex flex-col justify-center items-center gap-5  px-5 hover:border-opacity-50 hover:border-yellow-500 hover:bg-opacity-40 hover:shadow-lg transition-all duration-300">
            <h4 className="text-customBlack hover:text-customYellow text-xl py-4 uppercase text-center">Commercial<br />Cleaning</h4>
            <p className="text-[12px] leading-6 text-customLightBlack pb-8">We give you hours of your precious life back, with full price transparency, by supplying everything you need to run your business from our fulfillment centers to your shelves and fridges.</p>

            <div className="relative pb-10">

              <Link href={``}>
                <Image src={`/assests/btn-border_black.png.png`} alt={``} height={140} width={140} />
                <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-customBlack text-sm hover:text-customYellow">Learn More</p>
              </Link>
            </div>

          </div>


        </div>
        <div className="flex justify-end w-full">
          <Image className="mr-32" src={`/assests/div.links-block0__bg.png`} alt={``} height={100} width={100} />
          <Image src={`/assests/div.links-block0__bg (1).png`} alt={``} height={100} width={100} />
          <Image src={`/assests/div.links-block0__bg (2).png`} alt={``} height={100} width={100} />

        </div>

      </div>
    </div>
  );
}

