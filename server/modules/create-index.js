import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_URI);

async function createIndex() {
    try {
        const database = client.db("website-db");
        const collection = database.collection("products");

        const index = {
            name: "vector_index",
            type: "vectorSearch",
            definition: {
                "fields": [
                    {
                        "type": "vector",
                        "path": "embedding",
                        "similarity": "dotProduct",
                        "numDimensions": 768 
                    }
                ]
            }
        }
        const result = await collection.createSearchIndex(index);
        console.log(result);
    } finally {
        await client.close();
    }  
}
createIndex().catch(console.dir);
  