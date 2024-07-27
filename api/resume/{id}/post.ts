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
      data.id = uuidv4();;
      data.createdOn = moment().format();
      data.updatedOn = moment().format();
      const putParams = {
        TableName: Table.ResumeTable.tableName,
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
        TableName: Table.ResumeTable.tableName,
        Key: {
          id: id,
        },
        UpdateExpression:
          "set title = :title, subtitle = :subtitle, category = :category, description = :description, isPublished = :isPublished, startDate = :startDate , endDate = :endDate , listing = :listing, place = :place, updatedOn = :updatedOn  ",
        ExpressionAttributeValues: {
          ":title": data?.title,
          ":subtitle": data?.subtitle,
          ":category": data?.category,
          ":description": data?.description,
          ":isPublished": data?.isPublished,
          ":startDate": data?.startDate,
          ":endDate": data?.endDate,
          ":listing": data?.listing,
          ":place": data?.place,
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
