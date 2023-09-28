const mongoose = require("mongoose");

// cardData-schema
const cardSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    images: [Array]
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
