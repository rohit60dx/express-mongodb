import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const dbName = "collage";
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

let db; // Hold the database reference

// Connect once at startup
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    db = client.db(dbName);
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

connectToDatabase();

// Route
app.get("/", async (req, res) => {
  try {
    const collection = db.collection('students');
    const result = await collection.find({}).toArray();
    res.render("usersCard", { users: result });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error loading students");
  }
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});