require("dotenv").config();

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function run() {
  try {
    await client.connect();
    console.log("✅ CONNECTED");
  } catch (err) {
    console.log("❌ FAILED");
    console.log(err);
  }
}

run();