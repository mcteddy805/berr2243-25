# Week 1 Exercise
MongoDB & Node.js Setup Guide

Project Overview

This guide walks you through setting up a simple Node.js project that connects to a MongoDB database. You'll install the necessary tools, create a basic script, and push your work to GitHub.

Installation Steps

Step 1: Install Required Tools

Download and install VSCode from here.

You can install the MongoDB for VSCode extension for easier database interaction (optional).

Install Node.js & npm

Get the latest LTS version from nodejs.org.

Check if it's installed by running:

node -v  # Check Node.js version
npm -v   # Check npm version

Install MongoDB

Download MongoDB Community Edition from here.

Follow the installation guide for your OS.

Start MongoDB by running:

mongod

Install Git

Download from git-scm.com.

Set up your Git username and email:

git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

(Optional) Install MongoDB Compass

This graphical tool helps manage your database. Get it from here.

Step 2: Set Up Your GitHub Repository

Create a GitHub account if you don’t have one.

Set up a new repository on GitHub.

Initialize Git locally:

git init

Create a README file (this one!).

Commit and push to GitHub:

git add .
git commit -m "Initial setup"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main

Step 3: Create the Node.js Project

Initialize your project:

npm init -y

Install the MongoDB package:

npm install mongodb

Create index.js and add the following code:

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db("testDB");
        const collection = database.collection("users");

        const user = { name: "Alice", age: 30 };
        const result = await collection.insertOne(user);

        console.log(`Inserted document ID: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

run().catch(console.error);

Run the script:

node index.js

Check your data using MongoDB Shell:

mongosh
use testDB
db.users.find().pretty()

Step 4: Push Your Code to GitHub

Create a .gitignore file to ignore node_modules/

echo "node_modules/" >> .gitignore

Commit and push your changes: