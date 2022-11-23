function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, comment } = req.body;

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
      id: Date.now().toString(),
      email,
      name,
      comment,
    };
    console.log(newComment);

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
}

export default handler;
