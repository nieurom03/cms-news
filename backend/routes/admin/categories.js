const express = require('express');
const { readJSON, writeJSON } = require('../../utils/storage');
const { auth } = require('../../middleware/auth');
const router = express.Router();

// Lấy tất cả danh mục (admin)
router.get('/', auth, async (req, res) => {
  try {
    const categories = await readJSON('categories.json');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo danh mục mới (admin)
router.post('/', auth, async (req, res) => {
  try {
    const categories = await readJSON('categories.json');
    const newCategory = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date()
    };

    categories.push(newCategory);
    await writeJSON('categories.json', categories);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật danh mục (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const categories = await readJSON('categories.json');
    const index = categories.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }

    categories[index] = { ...categories[index], ...req.body };
    await writeJSON('categories.json', categories);
    res.json(categories[index]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa danh mục (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const categories = await readJSON('categories.json');
    const filtered = categories.filter(c => c.id !== req.params.id);
    await writeJSON('categories.json', filtered);
    res.json({ message: 'Đã xóa danh mục' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
