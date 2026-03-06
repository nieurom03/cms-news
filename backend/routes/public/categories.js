const express = require('express');
const { readJSON } = require('../../utils/storage');
const router = express.Router();

// Lấy danh sách danh mục (public)
router.get('/', async (req, res) => {
  try {
    const categories = await readJSON('categories.json');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy bài viết theo danh mục (public)
router.get('/:slug/articles', async (req, res) => {
  try {
    const categories = await readJSON('categories.json');
    const articles = await readJSON('articles.json');
    
    const category = categories.find(c => c.slug === req.params.slug);
    if (!category) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }

    const categoryArticles = articles.filter(
      a => a.category === category.id && a.status === 'published'
    );
    
    res.json(categoryArticles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
