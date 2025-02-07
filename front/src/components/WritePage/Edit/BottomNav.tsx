import { Button } from "@/components/UI/Button";
import Link from "next/link";

export default function EditBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 w-1/2 bg-white border-t border-gray-300 flex justify-between items-center px-4 py-3">
      {/* <button className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-black border-lg text-lg">
      </button>
        나가기 */}
      <Link
        href="../"
        className="text-black px-4 py-2 rounded-md flex items-center hover:bg-gray-100"
      >
        나가기
      </Link>
      <div className="flex gap-4">
        <Button className="bg-green-500 text-white hover:bg-green-600 font-bold px-4 py-2">
          출간하기
        </Button>
      </div>
    </div>
  )
}