import ProfileAvatar from "@/components/Avatar";
import blogPicture from "../../../../../public/images/blog-image.avif";
import Image from "next/image";
import TabsSection from "@/components/ProfilePage/TabSection";

export default function ProfilePage({ params }: { params: { userId: string } }) {
  const { userId } = params;
  console.log(userId);
  return (
    <div className="flex justify-center mt-10">
      {/* Content Container */}
      <div className="w-[70%]">
        {/* Profile Section */}
        <div className="flex items-center mb-10">
          <ProfileAvatar
            image={undefined}
            name="김지환"
            sx={{ width: 80, height: 80, marginRight: 2 }}
            fontSize={40}
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold">김지환</h1>
            <p className="text-gray-500">@jeehwankim5249</p>
          </div>
        </div>

        {/* TABS SECTION */}
        <TabsSection userId={userId} />

        {/* Blog Section */}
        <div>
          {/* <h2 className="text-xl font-bold mb-4">Created Playlists</h2> */}
          <div className="grid gap-6">
            {/* Blog Card */}
            <div className="flex overflow-hidden">
              <Image
                src={blogPicture}
                alt="Playlist Cover"
                className="w-1/3 h-48 object-cover"
              />
              <div className="w-2/3 px-4 flex flex-col justify-between">
                <h3 className="font-semibold text-xl font-bold">블로그 타이틀</h3>
                <p className="text-sm text-gray-500 mt-3">태그</p>
                <p className="text-sm text-gray-500 mt-2 h-full truncate">content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
