const { MongoClient } = require("mongodb");
// Define array of driver objects
const drivers = [
    {   
        name: "aiman",
        VehicleType:"Sedan", 
        rating: 4.6,
        available: true },
    {   
            name: "amir",
            VehicleType:"Sedan", 
            rating: 1.0,
            available: true },
    {   
                name: "adam",
                VehicleType:"Sedan", 
                rating: 5.0,
                available: false},
  ];
  
  //  Display each driver name
  drivers.forEach(driver => {
    console.log("Driver:", driver.name);
  });
  
  // Add a new driver
  drivers.push(
    {   
    name: "johan",
    VehicleType:"SUV", 
    rating: 4.9,
    available: true},
    );
  
  console.log("\nUpdated Drivers:");
  console.log(drivers);
  
    const uri = "mongodb://localhost:27017"; // change if using MongoDB Atlas
    const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db("driverDB"); // database name
    const collection = db.collection("drivers"); // collection name

    // Insert all drivers into MongoDB
    const result = await collection.insertMany(drivers);
    console.log("Drivers inserted:", result.insertedCount);
       
    // Find drivers with rating >= 4.5
        const topDrivers = await collection.find({ rating: { $gte: 4.5 } }).toArray();
        console.log("Top Drivers:", topDrivers);
    
        // Update John Doe's rating
        await collection.updateOne(
          { name: "johan" },
          { $inc: { rating: 0.1 } }
        );
        console.log("Updated johan's rating");

        // Delete unavailable drivers
        await collection.deleteMany({ available: false });
        console.log("Deleted unavailable drivers");
    
  } catch (err) {
    console.error("Error inserting drivers:", err);
  } finally {
    await client.close();
  }
}

main();
