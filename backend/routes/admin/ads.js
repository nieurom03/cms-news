const express = require('express');
const { readJSON, writeJSON } = require('../../utils/storage');
const { auth, adminAuth } = require('../../middleware/auth');
const router = express.Router();

// Lấy tất cả quảng cáo (admin)
router.get('/', auth, async (req, res) => {
  try {
    const ads = await readJSON('ads.json');
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo quảng cáo mới (admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const ads = await readJSON('ads.json');
    const newAd = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date()
    };

    ads.push(newAd);
    await writeJSON('ads.json', ads);
    res.status(201).json(newAd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật quảng cáo (admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const ads = await readJSON('ads.json');
    const index = ads.findIndex(a => a.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Không tìm thấy quảng cáo' });
    }

    ads[index] = { ...ads[index], ...req.body };
    await writeJSON('ads.json', ads);
    res.json(ads[index]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa quảng cáo (admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const ads = await readJSON('ads.json');
    const filtered = ads.filter(a => a.id !== req.params.id);
    await writeJSON('ads.json', filtered);
    res.json({ message: 'Đã xóa quảng cáo' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
