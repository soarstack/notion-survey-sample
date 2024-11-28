import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

// Initialize the Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export async function GET() {
  try {
    // Query the database
    const databaseId = process.env.NOTION_DATABASE_ID!;
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    // Log the JSON data to the console
    console.log("Fetched Data:", JSON.stringify(response, null, 2));

    // Return the response
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching Notion data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Notion data" },
      { status: 500 }
    );
  }
}
