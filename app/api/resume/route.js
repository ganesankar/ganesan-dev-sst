
import { NextApiRequest, NextResponse } from "next/server";
import { Table } from "sst/node/table";
import { dynamoDbScan } from "@/app/util/dynamoDb";
export const dynamic = 'force-dynamic' // defaults to auto

export const GET = async (req) => {
  try {

    const result = await dynamoDbScan({
      TableName: Table.ResumeTable.tableName,
    }).catch((error) => {
      throw error;
    });
    let posts = [];
    if (result?.Items?.length > 0) {
      posts = result?.Items?.filter((i) => i.isPublished > 0);
    }
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json("Something went wrong with resume api...", {
      status: 500,
    });
  }
};
