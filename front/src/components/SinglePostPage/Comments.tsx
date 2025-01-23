import Image from "next/image";
import image from "../../../public/images/blog-image.avif";

export default function Comments() {
  return (

    <div className="w-full mb-2">
      <div className="flex items-center gap-4 mt-10">
        <Image
          alt="profile picture"
          src={image}
          className="w-10 h-10 rounded-full object-cover block"
          width="40"
        />
        <div className="flex flex-col">
          <span className="font-bold">호두과자</span>
          <span className="text-gray-400 font-medium">2025년 1월 13일</span>
        </div>
      </div>
      <p className="mt-4 w-full">
        **Version***: policy language version
        **Id**: identifier for the policy (optional)
      </p>
    </div>
  )
}