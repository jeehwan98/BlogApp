import { PostBlog } from "@/lib/interfaces";
import { URL } from "@/lib/constants";

// POST BLOG
export async function postBlogAPI(data: PostBlog) {
  console.log("data?: ", data);
  try {
    const response = await fetch(URL.BLOG, {
      method: "POST",
      headers: URL.HEADERS,
      credentials: "include",
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log("response data:", responseData.blog);
    if (!response.ok) {
      throw new Error(responseData.error || "Post failed");
    }

    if (response.ok) {
      return responseData;
    }
  } catch (error) {
    console.error("Error posting blog", error);
    throw error;
  }
}

// GET BLOG
export async function fetchBlogAPI() {
  try {
    const response = await fetch(URL.BLOG, {
      method: "GET",
      headers: URL.HEADERS,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    throw error;
  }
}
