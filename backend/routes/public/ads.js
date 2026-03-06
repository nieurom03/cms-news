const express = require('express');
const { readJSON } = require('../../utils/storage');
const router = express.Router();

// Lấy quảng cáo đang hoạt động (public)
router.get('/', async (req, res) => {
  try {
    const ads = await readJSON('ads.json');
    const active = ads.filter(a => a.active);
    res.json(active);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy quảng cáo theo vị trí (public)
router.get('/position/:position', async (req, res) => {
  try {
    const ads = await readJSON('ads.json');
    const positionAds = ads.filter(
      a => a.active && a.position === req.params.position
    );
    res.json(positionAds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
