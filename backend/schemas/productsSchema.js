const { Schema } = require("mongoose");
const getEmbedding = require("../utils/getEmbedding");

const productSchema = new Schema({
    productName: {
        type : String,
        required : true
    },
    productType : {
        type: String,
        required : true
    },
    price : {
        type: Number,
        required : true
    },
    condition: {
        type: String,
        required: true
    },
    warranty: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false,
        validate: {
            validator: function(data) {
                return (data <= 5 && data >= 0);
            },
            message: "Rating cannot be greater than 5 or less than 0"
        }
    },
    embedding: {
        type: Array, 
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: false,
        default: 10
    }
});

productSchema.pre('save', async function(next) {
    this.embedding = await getEmbedding(this.productName + '\n' + this.description + '\n' + d.price);
    next();
});


module.exports = productSchema;