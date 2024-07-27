import { ApiHandler } from "sst/node/api";
import { Table } from "sst/node/table";
import { dynamoDbScan } from "../../helpers/dynamoDb";

export const handler = ApiHandler(async (event) => {
  try {
    const result = await dynamoDbScan({
      TableName: Table.ResumeTable.tableName,
    }).catch((error) => {
      throw error;
    });
    return {
      statusCode: 200,
      body: JSON.stringify(result?.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
});
