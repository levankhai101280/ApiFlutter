const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Tạo ứng dụng Express
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Kết nối đến MongoDB
const DB_URI = 'mongodb://localhost:27017/ApiFlutter';
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Kết nối MongoDB thành công!'))
  .catch((err) => console.error('Kết nối MongoDB thất bại:', err));

// Thêm route cơ bản để kiểm tra server
app.get('/', (req, res) => {
  res.send('Server đang chạy và đã kết nối với MongoDB!');
});

// Kết nối routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
