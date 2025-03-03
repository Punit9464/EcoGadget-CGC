const pipeline = (embedding, filter={}) => [
    {
        "$vectorSearch": {
            "index": "vector_index",
            "queryVector": embedding,
            "path": "embedding",
            "numCandidates": 50,
            "filter": filter,
            "limit": 5,
        }
    },
    {
        "$project": {
            "productName": 1,
            "productType": 1,
            "price": 1,
            "condition": 1,
            "warranty": 1,
            "rating": 1,
            "description": 1,
            "image": 1,
        }
    }
];

module.exports = pipeline;