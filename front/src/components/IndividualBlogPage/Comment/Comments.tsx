import image from "../../../../public/images/blog-image.avif";
import ProfileAvatar from "@/components/Avatar";
import Link from "next/link";
import { formatRelativeDate, generateUniqueUserId } from "@/lib/constants";

export default function Comments() {
  return (

    <div className="w-full mb-2">
      <div className="flex items-center gap-4 mt-10">
        <Link
          href={`/profile/${generateUniqueUserId("jeehwan.98@gmail.com")}/post`}
          className="flex items-center cursor-pointer gap-4"
        >
          <ProfileAvatar
            image={image || undefined}
            name={"호두과자" as string}
            sx={{ width: 50, height: 50 }}
            fontSize={20}
          />
          <div className="flex flex-col">
            <span className="font-bold">호두과자</span>
            <span className="text-gray-400 font-medium">{formatRelativeDate([2025, 2, 12, 14, 33, 54, 328748000])}</span>
          </div>
        </Link>
      </div>
      <p className="mt-4 w-full">
        굉장히 흥미로운 주제인 것 같습니다!! 구독하고 다음에 또 좋은 내용 부탁합니다!
      </p>
    </div>
  )
}