import { Table } from "sst/node/table";
import { dynamoDbDelete } from "@/api/helpers/dynamoDb";
import { ApiHandler, usePathParam } from "sst/node/api";
export const handler = ApiHandler(async (evt) => {
  try {
    const slug = usePathParam("id");
    const dBParams = {
      TableName: Table.ProjectsTable.tableName,
      Key: {
        slug
      },
    };
    const result = await dynamoDbDelete(dBParams).catch((error) => {
      throw error;
    });
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
});
