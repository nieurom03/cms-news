const express = require('express');
const { readJSON } = require('../../utils/storage');
const router = express.Router();

// Lấy menu theo vị trí (public)
router.get('/:location', async (req, res) => {
  try {
    const menus = await readJSON('menus.json');
    const menu = menus.find(
      m => m.location === req.params.location && m.active
    );
    
    if (!menu) {
      return res.json({ items: [] });
    }

    // Sắp xếp items theo order và tổ chức thành cấu trúc tree
    const sortedItems = menu.items
      .filter(item => item.active)
      .sort((a, b) => a.order - b.order);

    // Tạo cấu trúc tree với parent-child
    const buildTree = (items, parentId = null) => {
      return items
        .filter(item => item.parentId === parentId)
        .map(item => ({
          ...item,
          children: buildTree(items, item.id)
        }));
    };

    const menuTree = buildTree(sortedItems);

    res.json({
      name: menu.name,
      location: menu.location,
      items: menuTree
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy tất cả menu (public)
router.get('/', async (req, res) => {
  try {
    const menus = await readJSON('menus.json');
    const activeMenus = menus.filter(m => m.active);
    
    const result = activeMenus.map(menu => {
      const sortedItems = menu.items
        .filter(item => item.active)
        .sort((a, b) => a.order - b.order);

      const buildTree = (items, parentId = null) => {
        return items
          .filter(item => item.parentId === parentId)
          .map(item => ({
            ...item,
            children: buildTree(items, item.id)
          }));
      };

      return {
        name: menu.name,
        location: menu.location,
        items: buildTree(sortedItems)
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
