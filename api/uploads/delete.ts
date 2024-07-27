import { ApiHandler, useQueryParam } from "sst/node/api";
import { Bucket } from "sst/node/bucket";
import { deleteObject } from "@/api/helpers/s3";
export const handler = ApiHandler(async (event) => {
  try {
    const name = useQueryParam("name");
    var params = { Bucket: Bucket.uploadsBucket.bucketName, Key: name };

    const deleteResults = await deleteObject(params).catch((error) => {
      throw error;
    });
    return {
      status: 200,
      body: "FILE DELETED SUCCESSFULLY",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
});
