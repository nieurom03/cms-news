const express = require('express');
const { readJSON, writeJSON } = require('../../utils/storage');
const router = express.Router();

// Lấy danh sách bài viết đã xuất bản (public)
router.get('/', async (req, res) => {
  try {
    const articles = await readJSON('articles.json');
    const published = articles.filter(a => a.status === 'published');
    res.json(published);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy chi tiết bài viết theo slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const articles = await readJSON('articles.json');
    const article = articles.find(a => a.slug === req.params.slug && a.status === 'published');
    
    if (!article) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    }

    // Tăng lượt xem
    article.views = (article.views || 0) + 1;
    await writeJSON('articles.json', articles);
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
