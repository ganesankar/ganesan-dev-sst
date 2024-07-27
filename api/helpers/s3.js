import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  ListObjectsCommand,
  DeleteObjectCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-east-2",
  apiVersion: "2012-10-17",
  signatureVersion: "v4",
});

export const listObjects = async (params) => {
  try {
    const command = new ListObjectsCommand(params);
    const response = await s3.send(command);
    return await response;
  } catch (err) {
    throw new Error(err);
  }
};
export const generateSignedUrl = async (bucketName, fileName) => {
  try {
    const command = new PutObjectCommand({
      ACL: "public-read",
      Key: fileName,
      Bucket: bucketName,
    });
    return await getSignedUrl(s3, command, { expiresIn: 300 });;

  } catch (err) {
    throw new Error(err);
  }
};
export const uploadObject = async (params) => {
  try {
    const parallelUploads3 = new Upload({
      client: s3,
      queueSize: 4,
      leavePartsOnError: false,
      params: params,
    });
    return await parallelUploads3;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteObject = async (params) => {
  try {
    const command = new DeleteObjectCommand(params);
    const response = await s3.send(command);
    return await response;
  } catch (err) {
    throw new Error(err);
  }
};
