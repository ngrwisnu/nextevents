import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    // email validation
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "invalid email address." });
      return;
    }

    // * connecting to MongoDB Atlas
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting failed!" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
