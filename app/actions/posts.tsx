import { toast } from "react-toastify";
import { PostItem } from "@/types/api";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/`;

export const getPosts = async (accessToken): Promise<PostItem[]> => {
  try {
    const response = await fetch(`${URL}all`, {
      headers: {
        Authorization: accessToken,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching Posts", error);
    return error;
  }
};

export const getPostBySlug = async (slug, accessToken): Promise<PostItem> => {
  try {
    const response = await fetch(`${URL}${slug}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching Post", error);
    return error;
  }
};

export const updatePost = async (item, accessToken): Promise<PostItem> => {
  try {
    const id = item?.createdOn ? item.slug : "new";
    const response = await fetch(`${URL}${id}`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
      },
      body: JSON.stringify(item),
    });
    if (response.ok) {
      toast.info("Post Updated Successfully!");
    } else {
      toast.error("Unable to update Post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating Posts", error);
    return error;
  }
};
export const deletePost = async (slug, accessToken): Promise<PostItem> => {
  try {
    const response = await fetch(`${URL}${slug}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
      },
    });
    if (response.ok) {
      toast.info("Post Deleted Successfully!");
    } else {
      toast.error("Unable to delete Post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating Posts", error);
    return error;
  }
};
