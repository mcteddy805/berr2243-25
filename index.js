const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = "mongodb://localhost:27017"; // use this for local MongoDB
const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db('transport');
  const driversCollection = db.collection('drivers');

  // Load data
  let drivers = JSON.parse(fs.readFileSync('drivers.json'));

  // Print driver names
  console.log("Driver Names:");
  drivers.forEach(driver => console.log(driver.name));

  // Add new driver
  drivers.push({ name: "Sara Lin", rating: 4.6, available: true });

  // Insert all
  await driversCollection.insertMany(drivers);
  console.log("Inserted drivers.");

  // Find top drivers
  const topDrivers = await driversCollection.find({ rating: { $gte: 4.5 } }).toArray();
  console.log("Top-rated drivers:", topDrivers);

  // Update rating
  await driversCollection.updateOne({ name: "John Doe" }, { $inc: { rating: 0.1 } });
  console.log("Updated John Doe’s rating.");

  // Delete unavailable
  await driversCollection.deleteMany({ available: false });
  console.log("Deleted unavailable drivers.");

  await client.close();
}

main().catch(console.error);
