import React from "react";

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

            {/* Team */}
            <div className="bg-greyBackground bg-contain p-14">
                <h3 className="text-white text-center text-5xl">Team</h3>
                <div className="flex flex-wrap gap-3">
                    <div className="flex flex-col gap-2">
                        <img src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">CEO, co-owner</span>
                    </div>

                    <div  className="flex flex-col gap-2">
                        <img src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">Position</span>
                    </div>

                    <div  className="flex flex-col gap-2">
                        <img src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">Position</span>
                    </div>

                    <div  className="flex flex-col gap-2">
                        <img src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">Position</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <img src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">Position</span>
                    </div>

                    <div  className="flex flex-col gap-2">
                        <img src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">Position</span>
                    </div>

                    <div  className="flex flex-col gap-2">
                        <img className="pb-2" src="/assests/profile-pic-dummy 1.png" alt="" />
                        <h6 className="text-white uppercase text-xl">Name</h6>
                        <span className="text-customGrey">Position</span>
                    </div>
                </div>
            </div>

        </div>


    );
}
