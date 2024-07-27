import { Table } from "sst/node/table";
import { dynamoDbGet } from "../../helpers/dynamoDb";
import { ApiHandler, usePathParam } from "sst/node/api";
export const handler = ApiHandler(async (evt) => {
  try {
    const id = usePathParam("id");
    const dBParams = {
      TableName: Table.ResumeTable.tableName,
      Key: {
        id
      },
    };
    const result = await dynamoDbGet(dBParams).catch((error) => {
      throw error;
    });
    const posts = result.Item;

    return {
      statusCode: 200,
      body: JSON.stringify(posts),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
});
