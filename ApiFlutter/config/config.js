const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Kết nối MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Dừng ứng dụng nếu lỗi kết nối
    }
};

module.exports = connectDB;
