import { Table } from "sst/node/table";
import { Bucket } from "sst/node/bucket";
import { listObjects } from "@/api/helpers/s3";
import { ApiHandler } from "sst/node/api";
export const handler = ApiHandler(async (evt) => {
  try {
    const listObjectsResults = await listObjects({
      Bucket: Bucket.uploadsBucket.bucketName,
    }).catch((error) => {
      throw error;
    }); 
    const Contents = listObjectsResults?.Contents?.map((item) => {
      return {
        name: item.Key,
        modified: item.LastModified,
        url: `${process.env.NEXT_PUBLIC_UPLOAD_ATTACHMENTS_URL}${item.Key}`,
        fileType: item?.Key?.split(".").pop(),
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(Contents),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
});
