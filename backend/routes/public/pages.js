const express = require('express');
const { readJSON } = require('../../utils/storage');
const router = express.Router();

// Lấy page theo slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const pages = await readJSON('pages.json');
    const page = pages.find(p => p.slug === req.params.slug && p.status === 'published');
    
    if (!page) {
      return res.status(404).json({ message: 'Không tìm thấy trang' });
    }
    
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy danh sách pages published (public)
router.get('/', async (req, res) => {
  try {
    const pages = await readJSON('pages.json');
    const published = pages.filter(p => p.status === 'published');
    
    // Chỉ trả về thông tin cơ bản
    const pageList = published.map(({ id, title, slug, metaDescription }) => ({
      id,
      title,
      slug,
      metaDescription
    }));
    
    res.json(pageList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
