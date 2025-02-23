import { URL } from "@/lib/constants";

export async function postCommentAPI(blogId: number, comment: string) {
  try {
    const response = await fetch(`${URL.COMMENT}/${blogId}`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: URL.HEADERS,
      credentials: "include",
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error("Error posting comments");
    }

    if (response.ok) {
      return responseData;
    }
  } catch (error) {
    console.error("Error posting comments", error);
    throw error;
  }
}

export async function fetchCommentsAPI(id: number) {
  try {
    const response = await fetch(`${URL.COMMENT}/${id}`, {
      method: "GET",
      headers: URL.HEADERS
    });

    const responseData = await response.json();
    console.log("responseData?: ", responseData);

    if (!response.ok) {
      throw new Error("Error fetching comments");
    }

    if (response.ok) {
      return responseData;
    }
  } catch (error) {
    console.error("Error fetching comments", error);
    throw error;
  }
}