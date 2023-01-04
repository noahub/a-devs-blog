import type { NextApiRequest, NextApiResponse } from "next";
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email and name are required" });
  }

  try {
    const response = await client.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        merge_fields: {
          FNAME: name,
        },
        status: "subscribed",
        tags: ["portfolio"],
      }
    );

    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the newsletter.`,
      });
    }

    return res.status(201).json({ error: "" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: (error as Error).message || (error as Error).toString() });
  }
}
