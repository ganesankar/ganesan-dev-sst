
import { toast } from "react-toastify";
import { ProjectItem } from "@/types/api";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/projects/`;

export const getProjects = async (accessToken): Promise<ProjectItem[]> => {
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
    console.error("Error fetching Projects", error);
    return error;
  }
};

export const getProjectBySlug = async (slug, accessToken): Promise<ProjectItem> => {
  try {
    const response = await fetch(`${URL}${slug}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching Project", error);
    return error;
  }
};

export const updateProject = async (item, accessToken): Promise<ProjectItem> => {
  try {
    const response = await fetch(`${URL}${item.slug}`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
      },
      body: JSON.stringify(item),
    });
    if (response.ok) {
      toast.info("Project Updated Successfully!");
    } else {
      toast.error("Unable to update Project");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating Projects", error);
    return error;
  }
};
export const deleteProject = async (slug, accessToken): Promise<ProjectItem> => {
  try {
    const response = await fetch(`${URL}${slug}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
      },
    });
    if (response.ok) {
      toast.info("Project Deleted Successfully!");
    } else {
      toast.error("Unable to delete Project");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating Projects", error);
    return error;
  }
};
