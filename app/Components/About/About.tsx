import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function About() {
    return (
        <div>
            <div className="grid bg-greyBackground bg-contain grid-cols-4 gap-8">
                {/* Why us  */}
                <div className="col-span-2 flex flex-col pl-36 pt-10 pb-16 ">
                    <h3 className="text-customYellow text-5xl pb-5">Why us</h3>
                    <div className="text-white flex flex-col gap-3 leading-6 z-[999]">
                        <p>
                            BarBak Hospitality was founded in Charlotte, NC in 2019. <br /> We
                            are the Official Restaurant Depot Delivery partner of choice!
                        </p>

                        <p>
                            In November of 2020, we expanded to Charleston, SC. even despite the
                            global pandemic arising. Since 2021, we have been fortunate to
                            launch our services to the following locations: Cary, NC and Miami,
                            FL..
                        </p>

                        <p>
                            BarBak Hospitality provides professional logistics services for
                            hospitality businesses, and government sectors that value
                            reliability, timeliness, and high customer satisfaction.We
                            have partnered with Restaurant Depot, a leading whole supplier, to
                            deliver the best quality products at a fraction of the cost.
                        </p>
                    </div>
                </div>

                {/* Watermark Images */}
                <div className="">
                    <img
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-auto"
                        src="/assests/BarBak_Primary_PMS_page-0001-removebg-preview (1) 1.png"
                        alt="Watermark 1"
                    />
                    <img
                        className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-auto"
                        src="/assests/2650b7_6b803c17f4a3441cbc684184a05b6a38_mv2-removebg-preview 1.png"
                        alt="Watermark 2"
                    />
                </div>

                {/* Right side (empty) */}
                <div className="col-span-2"></div>
            </div >
            {/* Why you can trust us */}
            <div className="px-14">
                <div className="px-5 py-20 relative">
                    <span className="absolute top-[18%] left-[90%] transform -translate-x-1/2 -translate-y-1/2 bg-circleSmall bg-no-repeat w-24 h-24"></span>

                    <h3 className="text-center text-5xl pb-10  relative z-10 ">Why you can <span className="text-customYellow">trust</span> us</h3>
                    <span className="absolute top-1/4 left-[95%] transform -translate-x-1/2 -translate-y-1/2 bg-circleBig bg-no-repeat w-24 h-24"></span>

                    <div className="grid grid-cols-4 gap-5">
                        <div className="cols-1 flex flex-col items-center justify-center px-10 py-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                            <h5 className="text-customYellow pb-2 text-2xl">Fast</h5>
                            <p className="text-customLightBlack text-center">Ordering your items has never
                                been more efficient using the Restaurant Depot website.
                                Order online by 9pm EST for next day delivery.</p>
                        </div>

                        <div className="cols-1 flex flex-col items-center justify-center px-10 py-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                            <h5 className="text-customYellow pb-2 text-2xl">Local</h5>
                            <p className="text-customLightBlack text-center">BarBak Hospitality is your
                                go-to delivery service.
                                Our goal is to assist individual's and local businesses by loading, transporting, and delivering items to clients businesses in a safe, timely manner.</p>
                        </div>

                        <div className="cols-1 flex flex-col items-center justify-center px-10 py-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                            <h5 className="text-customYellow pb-2 text-2xl">Reliable</h5>
                            <p className="text-customLightBlack text-center">Your business is our business. If you experience any dissatisfaction we will address it immediately. If we are experiencing delays in our routes we will contact you in advance.</p>
                        </div>

                        <div className="cols-1 flex flex-col items-center justify-center px-10 py-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                            <h5 className="text-customYellow pb-2 text-2xl">Hospitality</h5>
                            <p className="text-customLightBlack text-center">It's rooted in our name. Providing quality service with one smile at a time. Our staff is committed to creating a friendly environment for our clients..</p>
                        </div>
                    </div>

                </div>

            </div>

            {/* client testimonials */}
            <div className="bg-greyBackground bg-contain px-36 py-14">
                <h3 className="text-customYellow text-4xl capitalize text-center pb-10">A Message From Joe Valley,<br/> Vice President Resturant Depot</h3>
                <div className="flex justify-center items-center gap-10">
                    <img src="/assests/ce830f_a429e1d23f1549ea96840bab0a21ed0d_mv2-removebg-preview 1.png" alt="" className="w-1/6 h-auto" />
                    <div className="flex flex-col gap-3 text-white bg-[#D9D9D933] p-8 rounded-br-[1rem] rounded-tl-[1rem]">
                        <p>For almost 40 years, Restaurant Depot has been committed to helping independently owned and operated restaurants succeed. We operate more than 140 cash & carry warehouses across the US.</p>
                        <p> Over the past few years, our members asked for more ways to shop, including a delivery option. We knew we needed delivery partners that we could trust with our customers. We partnered with BarBak in our Charlotte, NC branch and the results exceeded our expectations. Customers were delighted by BarBak’s customer service and willingness to go the extra mile to make sure every order is right and on time</p>
                        <p>BarBak now operates our delivery service in 5 locations with plans to expand. “We’re proud to have BarBak as a premier delivery partner and look forward to working together to help every RD customer succeed by saving them money over the costs of traditional food service delivery companies – Restaurant Depot.</p>
                    </div>
                </div>
            </div>


            {/* We create an excellent service built on values */}
            <div>
                <div className="flex justify-start" >
                    <img src="/assests/div.reason-section__petrushka0.png" alt="decrotive image of a leaf" />

                </div>

                <div className="flex flex-col items-center p-10">
                    <div className="flex">
                        <img src="/assests/div.reason-section__petrushka1.png" alt="decrotive image of a leaf" className="self-start" />

                        <div className="flex flex-col items-center">
                            <h3 className="text-5xl px-64 leading-normal text-center pb-10">We create an excellent service built on values</h3>
                            <p className="text-customBlack font-light pb-20">The quality of our product is very important to us and we take care of our employees to take care of our customers</p>
                        </div>
                    </div>

                    <div className="flex gap-40">
                        <div className="flex flex-col gap-5 items-center">
                            <img src="/assests/SVG (4).png" alt="" />
                            <span className="text-customBlack">Loyalty</span>
                        </div>

                        <div className="flex flex-col gap-5 items-center">
                            <img src="/assests/SVG (5).png" alt="" />
                            <span className="text-customBlack">Sincerity</span>
                        </div>

                        <div className="flex flex-col items-center gap-5">
                            <img src="/assests/SVG (6).png" alt="" />
                            <span className="text-customBlack">Trust</span>
                        </div>

                        <div className="flex flex-col items-center gap-5">
                            <img src="/assests/SVG (7).png" alt="" />
                            <span className="text-customBlack">Team work</span>
                        </div>

                    </div>


                </div>
                <div className="flex justify-end" >
                    <img src="/assests/div.team__cabbage.png" alt="decrotive image of a cabbage" />

                </div>

            </div>


            {/* Team */}
            <div className="bg-greyBackground bg-contain p-14">
                <h3 className="text-white text-center text-5xl pb-10">Team</h3>
                <div className="flex flex-wrap gap-3">
                    <div className="flex flex-col gap-2">
                        <img className="w-[70%] h-auto" src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">CEO, co-owner</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <img className="w-[70%] h-auto" src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">Position</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <img className="w-[70%] h-auto" src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">Position</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <img className="w-[70%] h-auto" src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">Position</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <img className="w-[70%] h-auto" src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">Position</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <img className="w-[70%] h-auto" src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">Position</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <img className="w-[70%] h-auto" src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">Position</span>
                    </div>
                </div>
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
                        <h4 className="text-customBlack hover:text-customYellow text-xl py-4 uppercase text-center">Restaurant<br />Depot Delivery
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

        </div>


    );
}
