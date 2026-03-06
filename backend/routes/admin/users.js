const express = require('express');
const bcrypt = require('bcryptjs');
const { readJSON, writeJSON } = require('../../utils/storage');
const { auth, adminAuth } = require('../../middleware/auth');
const router = express.Router();

// Lấy danh sách users (admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const users = await readJSON('users.json');
    // Không trả về password
    const safeUsers = users.map(({ password, ...user }) => user);
    res.json(safeUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo user mới (admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const users = await readJSON('users.json');
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      role: role || 'editor',
      createdAt: new Date()
    };

    users.push(newUser);
    await writeJSON('users.json', users);

    const { password: _, ...safeUser } = newUser;
    res.status(201).json(safeUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật user (admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const users = await readJSON('users.json');
    const index = users.findIndex(u => u.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }

    const { password, ...updateData } = req.body;
    
    // Nếu có password mới, hash nó
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    users[index] = { ...users[index], ...updateData };
    await writeJSON('users.json', users);

    const { password: _, ...safeUser } = users[index];
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa user (admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const users = await readJSON('users.json');
    
    // Không cho xóa chính mình
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: 'Không thể xóa chính mình' });
    }

    const filtered = users.filter(u => u.id !== req.params.id);
    await writeJSON('users.json', filtered);
    res.json({ message: 'Đã xóa user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
