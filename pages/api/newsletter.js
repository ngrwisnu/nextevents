import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    // email validation
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "invalid email address." });
      return;
    }

    // * connecting to MongoDB Atlas
    const client = await MongoClient.connect(
      "mongodb+srv://ngrwisnu:784ethSWoypkKec3@cluster0.zqdeejn.mongodb.net/db_events?retryWrites=true&w=majority"
    );

    const db = client.db();

    await db.collection("newsletter").insertOne({ email });

    client.close();

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
