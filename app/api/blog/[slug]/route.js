
import { NextResponse } from "next/server";
import { Table } from "sst/node/table";
import { dynamoDbGet } from "@/app/util/dynamoDb";

export async function GET(req, { params }) {
  try {
    const slug = params.slug;
    const dBParams = {
      TableName: Table.PostTable.tableName,
      Key: {
        slug,
      },
    };
    const post = await dynamoDbGet(dBParams).catch((error) => {
      throw error;
    });

    return NextResponse.json(post?.Item);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong with blog api..." }
    );
  }
}

