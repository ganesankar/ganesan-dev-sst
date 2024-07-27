import { NextResponse } from "next/server";
import { Table } from "sst/node/table";
import moment from "moment";
import { dynamoDbScan } from "@/app/util/dynamoDb";

export const GET = async (req) => {
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
        i.year = moment(i.publishedOn).year();
        return i;
      })
        .filter((i) => i.isPublished > 0)
        .sort((a, b) => {
          return b.publishedOn - a.publishedOn;
        });
    }
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json("Something went wrong with blog api...", {
      status: 500,
    });
  }
};
