"use client";
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselItem from "./CarouselItem";



export default function ItemCarousel() {

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };



  return (
    <div className="bg-greyBackground bg-contain">
      <h3 className="text-white text-4xl font-normal pl-28 pt-28 pb-10">We recommend you try it</h3>
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        // showDots={true}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        // keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <CarouselItem  name={`Item 1`} imageSrc={`/assests/Link → Picture → 545799-8b3d3d5f-d3c6-410c-bea5-28344d9d87ef.webp.png`} price={16} />
        <CarouselItem  name={`Item 2`} imageSrc={`/assests/Link → Picture → 545799-8b3d3d5f-d3c6-410c-bea5-28344d9d87ef.webp.png`} price={16} />
        <CarouselItem  name={`Item 3`} imageSrc={`/assests/Link → Picture → 545799-8b3d3d5f-d3c6-410c-bea5-28344d9d87ef.webp.png`} price={16} />
        <CarouselItem  name={`Item 4`} imageSrc={`/assests/Link → Picture → 545799-8b3d3d5f-d3c6-410c-bea5-28344d9d87ef.webp.png`} price={16} />
        <CarouselItem  name={`Item 5`} imageSrc={`/assests/Link → Picture → 545799-8b3d3d5f-d3c6-410c-bea5-28344d9d87ef.webp.png`} price={16} />
        <CarouselItem name={`Item 6`} imageSrc={`/assests/Link → Picture → 545799-8b3d3d5f-d3c6-410c-bea5-28344d9d87ef.webp.png`} price={16} />
        <CarouselItem  name={`Item 7`} imageSrc={`/assests/Link → Picture → 545799-8b3d3d5f-d3c6-410c-bea5-28344d9d87ef.webp.png`} price={16} />
        <CarouselItem name={`Item 8`} imageSrc={`/assests/Link → Picture → 545799-8b3d3d5f-d3c6-410c-bea5-28344d9d87ef.webp.png`} price={16} />



      </Carousel>
      
      </div>




  );
};

