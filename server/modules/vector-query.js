import { MongoClient } from 'mongodb';
import { getEmbedding } from './get-embeddings.js';

export async function vectorQuery(query) {

    const client = new MongoClient(process.env.DATABASE_URI);

    try {
        
        await client.connect();

        const database = client.db('website-db');
        const collection = database.collection('products');

        const queryEmbedding = await getEmbedding(query);

        const pipeline = [
            {
                $vectorSearch: {
                    index: "vector_index",
                    queryVector: queryEmbedding,
                    path: "embedding",
                    exact: true,
                    limit: 5
                }
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    name: 1,
                    url: 1,
                    thumbnail: 1,
                    score: {
                        $meta: "vectorSearchScore"
                    }
                }
            }
        ];

        const result = collection.aggregate(pipeline);
        let output = [];

        for await(const doc of result){
            output.push(JSON.stringify(doc));
        } 
        return output;
    } finally{
        await client.close();
    }
}
