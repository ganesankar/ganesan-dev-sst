import { UploadItem } from "@/types/api";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/uploads`;

export const getUploads = async (accessToken): Promise<UploadItem[]> => {
  try {
    const response = await fetch(URL, {
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
    console.error("Error fetching uploads", error);
    return [];
  }
};

export const generateSignedUrl = async (fileName, accessToken) => {
  try {
    const response = await fetch(`${URL}?name=${fileName}`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching uploads", error);
    return error;
  }
};

export const deleteUpload = async (item, accessToken) => {
  try {
    const response = await fetch(`${URL}?name=${item}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
      },
      body: JSON.stringify(item),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating uploads", error);
    return error;
  }
};
