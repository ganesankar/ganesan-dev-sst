import { ApiHandler } from "sst/node/api";
import { Table } from "sst/node/table";
import { dynamoDbScan } from "../../helpers/dynamoDb";

export const handler = ApiHandler(async (event) => {
  try {
    const result = await dynamoDbScan({
      TableName: Table.PostTable.tableName,
    }).catch((error) => {
      throw error;
    });
    let posts = [];
    if (result?.Items?.length > 0) {
      posts = result?.Items.map((i) => {
        i.content = i.content
          .replace(/(<([^>]+)>)/gi, "")
          .replace(/[\r\n]+/gm, " ");
        i.content = i.content.split(/\s+/).slice(0, 20).join(" ");
        return i;
      });
    }
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
