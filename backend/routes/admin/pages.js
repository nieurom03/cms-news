const express = require('express');
const { readJSON, writeJSON } = require('../../utils/storage');
const { auth } = require('../../middleware/auth');
const router = express.Router();

// Lấy tất cả pages (admin)
router.get('/', auth, async (req, res) => {
  try {
    const pages = await readJSON('pages.json');
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy page theo ID (admin)
router.get('/:id', auth, async (req, res) => {
  try {
    const pages = await readJSON('pages.json');
    const page = pages.find(p => p.id === req.params.id);
    
    if (!page) {
      return res.status(404).json({ message: 'Không tìm thấy page' });
    }
    
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo page mới (admin)
router.post('/', auth, async (req, res) => {
  try {
    const pages = await readJSON('pages.json');
    
    // Kiểm tra slug trùng
    if (pages.find(p => p.slug === req.body.slug)) {
      return res.status(400).json({ message: 'Slug đã tồn tại' });
    }

    const newPage = {
      id: Date.now().toString(),
      ...req.body,
      author: req.user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    pages.push(newPage);
    await writeJSON('pages.json', pages);
    res.status(201).json(newPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật page (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const pages = await readJSON('pages.json');
    const index = pages.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Không tìm thấy page' });
    }

    // Kiểm tra slug trùng (trừ chính nó)
    if (req.body.slug && pages.find(p => p.slug === req.body.slug && p.id !== req.params.id)) {
      return res.status(400).json({ message: 'Slug đã tồn tại' });
    }

    pages[index] = {
      ...pages[index],
      ...req.body,
      updatedAt: new Date()
    };
    
    await writeJSON('pages.json', pages);
    res.json(pages[index]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa page (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const pages = await readJSON('pages.json');
    const filtered = pages.filter(p => p.id !== req.params.id);
    await writeJSON('pages.json', filtered);
    res.json({ message: 'Đã xóa page' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
