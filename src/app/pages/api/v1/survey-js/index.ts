
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //const decodedToken = await admin.auth().verifyIdToken(token);

    switch (req.method) {
      case "POST":
        // Handle POST request
        return handlePostRequest(req, res);

      default:
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: JSON.stringify(error) });
  }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID || "" },
      properties: {
        Question1: {
          title: [
            {
              type: "text",
              text: {
                content: req.body.question1,
              },
            },
          ],
        },
        Question2: {
          rich_text: [
            {
              type: "text",
              text: {
                content: req.body.question2,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    res.status(200).json({ message: "Survey data submitted." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: JSON.stringify(error) });
  }
}