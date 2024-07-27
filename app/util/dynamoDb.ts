import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  QueryCommand,
  ScanCommand,
  GetCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
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

export const dynamoDbQuery = async (params) => {
  try {
    return await docClient.send(new QueryCommand(params));
  } catch (err) {
    throw new Error(err);
  }
};
