import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  // * connecting to MongoDB
  const client = await MongoClient.connect(
    "mongodb+srv://ngrwisnu:784ethSWoypkKec3@cluster0.zqdeejn.mongodb.net/db_events?retryWrites=true&w=majority"
  );
  const db = client.db();

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

    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId;

    res
      .status(201)
      .json({ message: "Successfully add new comment", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyComment = [
      { id: "c1", name: "John", comment: "This is a comment from John." },
      { id: "c2", name: "Doe", comment: "This is a comment from Doe." },
    ];

    res.status(200).json({ comments: dummyComment });
  }

  client.close();
}

export default handler;
