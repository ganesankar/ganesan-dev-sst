import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
  GetCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
// const docClient = DynamoDBDocumentClient.from(client);
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export const dynamoDbGet = async (params) => {
  try {
    return await docClient.send(new GetCommand(params));
  } catch (err) {
    throw new Error(err);
  }
};

export const dynamoDbScan = async (params) => {
  try {
    return await docClient.send(new ScanCommand(params));
  } catch (err) {
    throw new Error(err);
  }
};

export const dynamoDbPut = async (params) => {
  try {
    return await docClient.send(new PutCommand(params));
  } catch (err) {
    throw new Error(err);
  }
};

export const dynamoDbQuery = async (params) => {
  try {
    return await docClient.send(new QueryCommand(params));
  } catch (err) {
    throw new Error(err);
  }
};

export const dynamoDbUpdate = async (params) => {
  try {
    return await docClient.send(new UpdateCommand(params));
  } catch (err) {
    throw new Error(err);
  }
};
export const dynamoDbDelete = async (params) => {
  try {
    return await docClient.send(new DeleteCommand(params));
  } catch (err) {
    throw new Error(err);
  }
};
