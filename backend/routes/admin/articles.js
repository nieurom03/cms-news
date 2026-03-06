const express = require('express');
const { readJSON, writeJSON } = require('../../utils/storage');
const { auth } = require('../../middleware/auth');
const router = express.Router();

// Lấy tất cả bài viết (admin)
router.get('/', auth, async (req, res) => {
  try {
    const articles = await readJSON('articles.json');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy chi tiết bài viết (admin)
router.get('/:id', auth, async (req, res) => {
  try {
    const articles = await readJSON('articles.json');
    const article = articles.find(a => a.id === req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    }
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo bài viết mới (admin)
router.post('/', auth, async (req, res) => {
  try {
    const articles = await readJSON('articles.json');
    const newArticle = {
      id: Date.now().toString(),
      ...req.body,
      author: req.user.id,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    articles.push(newArticle);
    await writeJSON('articles.json', articles);
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật bài viết (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const articles = await readJSON('articles.json');
    const index = articles.findIndex(a => a.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    }

    articles[index] = { ...articles[index], ...req.body, updatedAt: new Date() };
    await writeJSON('articles.json', articles);
    res.json(articles[index]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa bài viết (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const articles = await readJSON('articles.json');
    const filtered = articles.filter(a => a.id !== req.params.id);
    await writeJSON('articles.json', filtered);
    res.json({ message: 'Đã xóa bài viết' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
