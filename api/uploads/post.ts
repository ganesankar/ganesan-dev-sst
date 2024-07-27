import { Bucket } from "sst/node/bucket";
import { ApiHandler, useQueryParam } from "sst/node/api";
import { generateSignedUrl } from "@/api/helpers/s3";
export const handler = ApiHandler(async (event) => {
  try {
    const name = useQueryParam("name");
    const url = await generateSignedUrl(
      Bucket.uploadsBucket.bucketName,
      name
    ).catch((error) => {
      throw error;
    });
    return {
      status: 200,
      body: url,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
});
