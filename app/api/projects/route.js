import { NextApiRequest, NextResponse } from "next/server";
import { Table } from "sst/node/table";
import moment from "moment";
import { dynamoDbScan } from "@/app/util/dynamoDb";
export const revalidate = 60
export const dynamic = 'force-dynamic' // defaults to auto
export const GET = async (req) => {
  try {
    const result = await dynamoDbScan({
      TableName: Table.ProjectsTable.tableName,
    }).catch((error) => {
      throw error;
    });
    let posts = [];
    if (result?.Items?.length > 0) {
      posts = result?.Items?.filter((i) => i.isPublished > 0).sort((a, b) => {
        return moment(b.createdOn).format("X") - moment(a.createdOn).format("X");
      });
    }
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json("Something went wrong with resume api...", {
      status: 500,
    });
  }
};
