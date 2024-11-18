const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String }, // Đường dẫn hình ảnh
    price: { type: Number, required: true },
    description: { type: String },
});

module.exports = mongoose.model('Trip', tripSchema);
