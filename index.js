import express from "express";
import cors from 'cors';
import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';
const port = process.env.Port || 5000;

const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s1w3enf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
console.log('connected to the database');
    const menuCollection = client.db("banglaGrill").collection("menu");
    const reviewCollection = client.db("banglaGrill").collection("reviews");

    app.get('/menu', async(req, res) => {
      const result = await menuCollection.find({}).toArray();
      res.send(result);
    })
    
    app.get('/reviews', async(req, res) => {
      const result = await reviewCollection.find({}).toArray();
      res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hasan is hare');
})

app.listen(port, (req, res) => {
  console.log( `Server is running inthe port ${port}` );
})