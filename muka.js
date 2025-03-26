const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        const startTime = Date.now();
        await client.connect();
        const endTime = Date.now();
        console.log(`Connected to MongoDB in ${endTime - startTime} ms`);

        const database = client.db("testDB");
        const collection = database.collection("users");

        const doc = { name: "aiman", age: 21 };
        const result = await collection.insertOne(doc);

        console.log("Inserted document ID:", result.insertedId);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
