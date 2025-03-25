const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db("testDB");
        const collection = database.collection("users");

        const doc = { name: "mat sabu", age: 30 };
        const result = await collection.insertOne(doc);

        console.log("Inserted document ID:", result.insertedId);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
