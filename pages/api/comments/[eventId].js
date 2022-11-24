import { MongoClient } from "mongodb";
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  // * connecting to MongoDB
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Failed to connect to the database." });
    return;
  }

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
      client.close();
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      comment,
    };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);

      newComment._id = result.insertedId;

      res
        .status(201)
        .json({ message: "Successfully add new comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Failed to insert the comment." });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId }
      );

      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Failed to get the comments" });
    }
  }

  client.close();
}

export default handler;
