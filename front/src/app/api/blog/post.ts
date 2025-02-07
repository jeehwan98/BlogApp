import { PostBlog } from "@/lib/interfaces";
import { URL } from "@/lib/constants";

export async function postBlogAPI(data: PostBlog) {
  console.log("data?: ", data);
  try {
    const response = await fetch(URL.POST_BLOG, {
      method: "POST",
      headers: URL.HEADERS,
      credentials: "include",
      body: JSON.stringify(data),
    });

    // console.log("response:", response);
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