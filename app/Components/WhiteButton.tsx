import Link from "next/link"
import Image from "next/image"
export default function WhiteButton({content}:{content:string}) {

    return (

        <div className="relative pb-10">

        <Link href={``}>
          <Image src={`/assests/btn_border_white.png.png`} alt={`Button image`} height={140} width={140} />
          <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-white text-sm hover:text-customYellow">{content}</p>
        </Link>
      </div>

        )
}

