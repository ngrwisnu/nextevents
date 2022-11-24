import { MongoClient } from "mongodb";
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  // * connecting to MongoDB
  const client = await connectDatabase();

  if (req.method === "POST") {
    const { email, name, comment } = req.body;

    // ! validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      comment,
    };

    const result = await insertDocument(client, "comments", newComment);

    newComment.id = result.insertedId;

    res
      .status(201)
      .json({ message: "Successfully add new comment", comment: newComment });
  }

  if (req.method === "GET") {
    const documents = await getAllDocuments(
      client,
      "comments",
      { _id: -1 },
      { eventId }
    );

    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
