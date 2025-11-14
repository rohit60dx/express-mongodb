import express from 'express'
import { MongoClient } from 'mongodb';

const dbName="collage"
const url ="mongodb://localhost:27017"
const client= new MongoClient(url)


const app = express();
app.set("view engine",'ejs')
client.connect().then((connection)=>{
    const db =connection.db(dbName);

    app.get("/api",async (req,resp)=>{
        const collection =db.collection("students")
        const students= await collection.find().toArray();
        resp.send(students)
    })

     app.get("/",async (req,resp)=>{
        const collection =db.collection("students")
        const students= await collection.find().toArray();
        resp.render("usersCard", { users: students });

    })

    app.get("/add-student", async (req,resp)=>{
         resp.render("addStudent");
    })

app.post("/add-student", express.urlencoded({ extended: true }), async (req,resp)=>{
    const {name,age,email}= req.body;
    const collection =db .collection("students")
    await collection.insertOne({name,age,email})
        // await collection.insertOne(req.body) //you can also use this for insert the record

    resp.redirect("/")            
  })
})

// app.set("view engine",'ejs')

app.listen(8080)




