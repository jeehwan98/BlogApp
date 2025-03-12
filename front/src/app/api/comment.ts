import { URL } from "@/lib/constants";

export async function postCommentAPI(blogId: number, comment: string) {
  console.log("comment?: ", comment);
  try {
    const response = await fetch(`${URL.COMMENT}/${blogId}`, {
      method: "POST",
      body: comment,
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
    console.log("responseData:", responseData);


    if (response.ok) {
      console.log("완료!");
      return responseData;
    }

    if (!response.ok) {
      // 여기?
      throw new Error("Error fetching comments");
    }
  } catch (error) {
    console.error("Error fetching comments", error);
    throw error;
  }
}

export async function deleteCommentAPI(blogId: number, commentId: number, email: string) {
  console.log("in delete comment API!");
  console.log(blogId);
  console.log(commentId);
  console.log(email);
  try {
    const response = await fetch(`http://localhost:8080/api/v1/comments/${blogId}/${commentId}`, {
      method: "DELETE",
      headers: URL.HEADERS,
      body: email,
    });

    const responseData = await response.json();

    if (!response) {
      throw new Error("Error deleting comment");
    }

    if (response.ok) {
      console.log("responseData?: ", responseData.success);
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
}