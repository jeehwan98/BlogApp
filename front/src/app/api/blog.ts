"use server"

import { cookies } from "next/headers";
import { PostBlog } from "@/interfaces/blog";
import { getServerSession } from "@/lib/auth/auth-server";
import { URL } from "@/lib/constants/url";

// POST BLOG
export async function postBlogAPI(data: PostBlog) {
  console.log("blog to post?:", data);
  try {
    const response = await fetch(URL.BLOG, {
      method: "POST",
      headers: {
        Cookie: (await cookies()).toString(),
        "Content-Type": "application/json"
      },
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
      headers: { Cookie: (await cookies()).toString() }
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
      headers: { Cookie: (await cookies()).toString() },
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

export async function fetchBlogById(id: number) {
  try {
    const response = await fetch(`${URL.BLOG}/${id}`, {
      method: "GET",
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

// LIKE AND DISLIKE BLOG
export const likeBlogAPI = async (blogId: number, like: boolean) => {
  const user = await getServerSession();
  const method = like ? "POST" : "DELETE";
  const response = await fetch(`http://localhost:8080/api/v1/like/${blogId}/${user?.email}`, {
    method,
    headers: { Cookie: (await cookies()).toString() }
  });
  if (!response.ok) {
    console.log("Response Status:", response.status, response.statusText);
    throw new Error("Failed to update like");
  }
  const responseData = await response.json();
  return responseData;
};

export async function fetchLikedBlogsByUserAPI(email: string) {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/like/user/${email}`, {
      headers: { Cookie: (await cookies()).toString() },
    });

    const responseData = await response.json();

    if (!response.ok) {
      return responseData;
    }

    return responseData;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}

export async function fetchBlogsByTagNameAPI(tagName: string) {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/blog/tag/${tagName}`, {
      method: "GET"
    });

    const responseData = await response.json();

    if (!response.ok) {
      return responseData;
    }

    return responseData;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}