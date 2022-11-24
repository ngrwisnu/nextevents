import { MongoClient } from "mongodb";

const username = process.env.DB_UNAME;
const password = process.env.DB_PASSW;
const url = `mongodb+srv://${username}:${password}@cluster0.zqdeejn.mongodb.net/db_events?retryWrites=true&w=majority`;

export async function connectDatabase() {
  const client = await MongoClient.connect(url);

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
