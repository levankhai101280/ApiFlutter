// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// API để lấy tất cả người dùng
router.get('/', async (req, res) => {
  try {
    const users = await User.find();  // Lấy tất cả người dùng từ MongoDB
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu người dùng', error: err });
  }
});

// API để tạo người dùng mới
router.post('/', async (req, res) => {
  const { name, email, age } = req.body;

  // Kiểm tra nếu thiếu thông tin
  if (!name || !email || !age) {
    return res.status(400).json({ message: 'Thiếu thông tin người dùng' });
  }

  try {
    const newUser = new User({ name, email, age });
    await newUser.save();  // Lưu người dùng vào MongoDB
    res.status(201).json(newUser);  // Trả về người dùng mới đã lưu
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo người dùng', error: err });
  }
});

// API để cập nhật thông tin người dùng
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { name, email, age }, 
      { new: true }  // Trả về đối tượng đã được cập nhật
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật người dùng', error: err });
  }
});

// API để xóa người dùng
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    res.json({ message: 'Người dùng đã bị xóa' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa người dùng', error: err });
  }
});

module.exports = router;
