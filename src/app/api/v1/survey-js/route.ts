import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID || "" },
      properties: {
        Question1: {
          title: [
            {
              type: "text",
              text: {
                content: body.question1,
              },
            },
          ],
        },
        Question2: {
          rich_text: [
            {
              type: "text",
              text: {
                content: body.question2,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    return NextResponse.json({ message: "Survey data submitted." });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "GET method not allowed" },
    { status: 405 }
  );
}
