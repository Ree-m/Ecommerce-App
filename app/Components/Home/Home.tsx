import React from "react";
import Link from "next/link";
import Image from "next/image";
import ItemCarousel from "./Carousel";
import AddReview from "./AddReview";

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

        </div>
        <img className="w-full" src={`/assests/div.intro-home__bottomPattern (1).png`} alt={``} />

      </div>

      {/* Try our services */}
      <div className="w-full px-14">


        <div className=" flex gap-20">
          <div className="flex-shrink-0 gap-8 mr-6">
            <Image src={`/assests/div.links-block0__bg (3).png`} alt={``} height={327} width={282} />
          </div>
          <div className="  flex justify-center items-end pl-4">
            <h3 className="text-customBlack text-3xl text-center font-medium pb-10">It's time to try our services</h3>
          </div>
        </div>


        {/* <div className="bg-red-800 flex">
  <div className="flex-shrink-0 gap-8 mr-6">
    <Image src={`/assests/div.links-block0__bg (3).png`} alt={``} height={327} width={282} />
  </div>
  <div className="flex-grow bg-red-300 flex flex-col justify-end items-center">
    <h3 className="text-customBlack text-3xl text-center font-medium pb-10">It's time to try our services</h3>
  </div>
</div> */}


        <div className="flex justify-center px-5 pt-5 pb-10">

          <div className="flex flex-col justify-center items-center gap-1 px-10 py-10 hover:border-opacity-50 hover:border-yellow-500 hover:bg-opacity-40 hover:shadow-lg transition-all duration-300">
            <h4 className="text-customBlack hover:text-customYellow text-xl py-4 uppercase text-center">Hospitality<br />Couriers
            </h4>
            <p className="text-[12px] leading-6 text-customLightBlack pb-8">We give you hours of your precious life back, with full price transparency, by supplying everything you need to run your business from our fulfillment centers to your shelves and fridges.
            </p>

            <div className="relative">

              <Link href={``}>
                <Image src={`/assests/btn-border_black.png.png`} alt={``} height={140} width={140} />
                <p className="absolute top-6 left-14 pb-[10px] pl-[8px] transform -translate-x-1/2 -translate-y-1/2 text-customBlack text-sm hover:text-customYellow font-bold">Learn More</p>
              </Link>
            </div>

          </div>


          <div className="flex flex-col justify-center items-center gap-1 px-10 py-10 hover:border-opacity-50 hover:border-yellow-500 hover:bg-opacity-40 hover:shadow-lg transition-all duration-300">
            <h4 className="text-customBlack hover:text-customYellow text-xl py-4 uppercase text-center">Alcohol<br />Depot Delivery
            </h4>
            <p className="text-[12px] leading-6 text-customLightBlack pb-8">We give you hours of your precious life back, with full price transparency, by supplying everything you need to run your business from our fulfillment centers to your shelves and fridges.
            </p>


            <div className="relative">

              <Link href={``}>
                <Image src={`/assests/btn-border_black.png.png`} alt={``} height={140} width={140} />
                <p className="absolute top-6 left-14 pb-[10px] pl-[8px] transform -translate-x-1/2 -translate-y-1/2 text-customBlack text-sm hover:text-customYellow font-bold">Learn More</p>
              </Link>
            </div>

          </div>

          <div className="flex flex-col justify-center items-center gap-1 px-10 py-10 hover:border-opacity-50 hover:border-yellow-500 hover:bg-opacity-40 hover:shadow-lg transition-all duration-300">
            <h4 className="text-customBlack hover:text-customYellow text-xl py-4 uppercase text-center">Alcohol<br />Delivery
            </h4>
            <p className="text-[12px] leading-6 text-customLightBlack pb-8">We give you hours of your precious life back, with full price transparency, by supplying everything you need to run your business from our fulfillment centers to your shelves and fridges.
            </p>


            <div className="relative">

              <Link href={``}>
                <Image src={`/assests/btn-border_black.png.png`} alt={``} height={140} width={140} />
                <p className="absolute top-6 left-14 pb-[10px] pl-[8px] transform -translate-x-1/2 -translate-y-1/2 text-customBlack text-sm hover:text-customYellow font-bold">Learn More</p>
              </Link>
            </div>

          </div>

          <div className="flex flex-col justify-center items-center gap-1 px-10 py-10 hover:border-opacity-50 hover:border-yellow-500 hover:bg-opacity-40 hover:shadow-lg transition-all duration-300">
            <h4 className="text-customBlack hover:text-customYellow text-xl py-4 uppercase text-center">Commercial<br />Cleaning
            </h4>
            <p className="text-[12px] leading-6 text-customLightBlack pb-8">We give you hours of your precious life back, with full price transparency, by supplying everything you need to run your business from our fulfillment centers to your shelves and fridges.
            </p>


            <div className="relative">

              <Link href={``}>
                <Image src={`/assests/btn-border_black.png.png`} alt={``} height={140} width={140} />
                <p className="absolute top-6 left-14 pb-[10px] pl-[8px] transform -translate-x-1/2 -translate-y-1/2 text-customBlack text-sm hover:text-customYellow font-bold">Learn More</p>
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

      <ItemCarousel />
      <AddReview />

      <div className="flex gap-28 p-16 pr-20">
        <div className="flex justify-center items-center">
          <Image src={`/assests/iPhone 13 Pro Mockup Right View label.png`} alt={``} width={384} height={544} />
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-customYellow text-4xl pb-3">
            Transparent Pricing

          </h4>
          <p className="text-2xl leading-loose">At BARBAK, we believe in transparency and simplicity when it comes to pricing. We want our valued customers to shop with confidence, knowing that they are getting the best value for their money. That's why we are committed to providing clear, upfront pricing on all our products.</p>

          <p className="text-2xl leading-loose">Shop confidently at BARBAK, where transparent pricing is at the heart of our commitment to your satisfaction.</p>
        </div>

      </div>
    </div>
  );
}

