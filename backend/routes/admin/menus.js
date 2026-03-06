const express = require('express');
const { readJSON, writeJSON } = require('../../utils/storage');
const { auth, adminAuth } = require('../../middleware/auth');
const router = express.Router();

// Lấy tất cả menu (admin)
router.get('/', auth, async (req, res) => {
  try {
    const menus = await readJSON('menus.json');
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy menu theo ID (admin)
router.get('/:id', auth, async (req, res) => {
  try {
    const menus = await readJSON('menus.json');
    const menu = menus.find(m => m.id === req.params.id);
    
    if (!menu) {
      return res.status(404).json({ message: 'Không tìm thấy menu' });
    }
    
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo menu mới (admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const menus = await readJSON('menus.json');
    const newMenu = {
      id: Date.now().toString(),
      ...req.body,
      items: req.body.items || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    menus.push(newMenu);
    await writeJSON('menus.json', menus);
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật menu (admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const menus = await readJSON('menus.json');
    const index = menus.findIndex(m => m.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Không tìm thấy menu' });
    }

    menus[index] = {
      ...menus[index],
      ...req.body,
      updatedAt: new Date()
    };
    
    await writeJSON('menus.json', menus);
    res.json(menus[index]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa menu (admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const menus = await readJSON('menus.json');
    const filtered = menus.filter(m => m.id !== req.params.id);
    await writeJSON('menus.json', filtered);
    res.json({ message: 'Đã xóa menu' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm item vào menu (admin only)
router.post('/:id/items', auth, adminAuth, async (req, res) => {
  try {
    const menus = await readJSON('menus.json');
    const menu = menus.find(m => m.id === req.params.id);
    
    if (!menu) {
      return res.status(404).json({ message: 'Không tìm thấy menu' });
    }

    const newItem = {
      id: Date.now().toString(),
      ...req.body,
      order: req.body.order || menu.items.length
    };

    menu.items.push(newItem);
    menu.updatedAt = new Date();
    
    await writeJSON('menus.json', menus);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật item trong menu (admin only)
router.put('/:id/items/:itemId', auth, adminAuth, async (req, res) => {
  try {
    const menus = await readJSON('menus.json');
    const menu = menus.find(m => m.id === req.params.id);
    
    if (!menu) {
      return res.status(404).json({ message: 'Không tìm thấy menu' });
    }

    const itemIndex = menu.items.findIndex(i => i.id === req.params.itemId);
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy menu item' });
    }

    menu.items[itemIndex] = {
      ...menu.items[itemIndex],
      ...req.body
    };
    menu.updatedAt = new Date();
    
    await writeJSON('menus.json', menus);
    res.json(menu.items[itemIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa item khỏi menu (admin only)
router.delete('/:id/items/:itemId', auth, adminAuth, async (req, res) => {
  try {
    const menus = await readJSON('menus.json');
    const menu = menus.find(m => m.id === req.params.id);
    
    if (!menu) {
      return res.status(404).json({ message: 'Không tìm thấy menu' });
    }

    menu.items = menu.items.filter(i => i.id !== req.params.itemId);
    menu.updatedAt = new Date();
    
    await writeJSON('menus.json', menus);
    res.json({ message: 'Đã xóa menu item' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
