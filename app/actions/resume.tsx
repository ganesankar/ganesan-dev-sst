
import { toast } from "react-toastify";
import { ResumeItem } from "@/types/api";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/resume/`;

export const getResume = async (accessToken): Promise<ResumeItem[]> => {
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
    console.error("Error fetching Resume", error);
    return error;
  }
};

export const getResumeById = async (slug, accessToken): Promise<ResumeItem> => {
  try {
    const response = await fetch(`${URL}${slug}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching Resume", error);
    return error;
  }
};

export const updateResume = async (item, accessToken): Promise<ResumeItem> => {
  try {
    const response = await fetch(`${URL}${item?.id || 'new'}`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
      },
      body: JSON.stringify(item),
    });
    if (response.ok) {
      toast.info("Resume Updated Successfully!");
    } else {
      toast.error("Unable to update Resume");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating Resume", error);
    return error;
  }
};
export const deleteResume = async (slug, accessToken): Promise<ResumeItem> => {
  try {
    const response = await fetch(`${URL}${slug}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
      },
    });
    if (response.ok) {
      toast.info("Resume Deleted Successfully!");
    } else {
      toast.error("Unable to delete Resume");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating Resume", error);
    return error;
  }
};
