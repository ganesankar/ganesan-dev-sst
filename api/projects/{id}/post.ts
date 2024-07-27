import { Table } from "sst/node/table";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { dynamoDbPut, dynamoDbUpdate } from "../../helpers/dynamoDb";
import { ApiHandler, useBody, usePathParam } from "sst/node/api";
export const handler = ApiHandler(async (evt) => {
  const body = useBody();
  const data = typeof body === "object" ? body : JSON.parse(body);
  const id = usePathParam("id");

  try {
    if (id === "new") {
      data.createdOn = moment().format();
      data.updatedOn = moment().format();
      const putParams = {
        TableName: Table.ProjectsTable.tableName,
        Item: data,
      };

      const result = await dynamoDbPut(putParams).catch((error) => {
        throw error;
      });
      return {
        statusCode: 200,
        body: JSON.stringify({
          response: "Item created successfully",
          result: result?.$metadata?.requestId,
        }),
      };
    } else {
      var putParams = {
        TableName: Table.ProjectsTable.tableName,
        Key: {
          slug: id,
        },
        UpdateExpression:
          "set content = :content, isPublished = :isPublished, title = :title , demo = :demo, github = :github, updatedOn = :updatedOn  ",
        ExpressionAttributeValues: {
          ":content": data?.content,
          ":isPublished": data?.isPublished,
          ":title": data?.title,
          ":demo": data?.demo,
          ":github": data?.github,
          ":updatedOn": moment().format(),
        },
        ReturnValues: "UPDATED_NEW",
      };
      const result = await dynamoDbUpdate(putParams).catch((error) => {
        throw error;
      });
      return {
        statusCode: 200,
        body: JSON.stringify({
          response: "Item updated successfully",
          result: result?.$metadata?.requestId,
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
});
