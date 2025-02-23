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

// GET BLOG BY USER
export async function fetchBlogByUserAPI(email: string) {
  try {
    const response = await fetch(`${URL.BLOG}/user/${email}`, {
      method: "GET",
      headers: URL.HEADERS,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return responseData;
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    throw error;
  }
}

export async function fetchBlogById(id: string) {
  try {
    const response = await fetch(`${URL.BLOG}/${id}`, {
      method: "GET",
      headers: URL.HEADERS,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("Error fetching blog");
    }

    return responseData;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}