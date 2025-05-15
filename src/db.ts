import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; // Change if using Mongo Atlas
const client = new MongoClient(uri);

export async function connectDB() {
  await client.connect();
  return client.db("node_assignment");
}
