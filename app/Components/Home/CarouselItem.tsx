import Image from "next/image";
import WhiteButton from "../WhiteButton";
export default function CarouselItem({ name, imageSrc, price }: { name: string, imageSrc: string, price: number }) {



    return (
        <div className="text-customLightGrey font-extralight flex flex-col gap-4 pl-32">
            <h5 className="text-lg font-normal pb-3">{name}</h5>
            <Image className=""src={imageSrc} alt={``} height={150} width={150} />
            <p className="text-customLightGrey font-extralight">${price} / 1pc</p>
            <WhiteButton content={`$${price}`} />

        </div>
    );
};

