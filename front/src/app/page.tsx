import BreadCrumbs from "@/components/HomePage/BreadCrumbs";
import FeaturedPosts from "@/components/HomePage/FeaturedPosts";
import Introduction from "@/components/HomePage/Introduction";
import MainCategories from "@/components/HomePage/MainCategories";
import PostList from "@/components/HomePage/PostList";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <BreadCrumbs />
      <Introduction />
      <MainCategories />
      <FeaturedPosts />
      <PostList />
    </div>
  );
}
