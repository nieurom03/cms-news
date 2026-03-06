const fs = require('fs').promises;
const path = require('path');

const STORAGE_DIR = path.join(__dirname, '../storage');

async function seedMenus() {
  console.log('Đang tạo menu mẫu...');

  const menus = [
    {
      id: "1",
      name: "Menu Header",
      location: "header",
      active: true,
      items: [
        {
          id: "1",
          label: "Trang chủ",
          url: "/",
          type: "link",
          target: "_self",
          order: 0,
          parentId: null,
          active: true
        },
        {
          id: "2",
          label: "Tin tức",
          url: "#",
          type: "link",
          target: "_self",
          order: 1,
          parentId: null,
          active: true
        },
        {
          id: "3",
          label: "Thời sự",
          url: "/category/thoi-su",
          type: "category",
          target: "_self",
          order: 0,
          parentId: "2",
          active: true
        },
        {
          id: "4",
          label: "Công nghệ",
          url: "/category/cong-nghe",
          type: "category",
          target: "_self",
          order: 1,
          parentId: "2",
          active: true
        },
        {
          id: "5",
          label: "Kinh doanh",
          url: "/category/kinh-doanh",
          type: "category",
          target: "_self",
          order: 2,
          parentId: "2",
          active: true
        },
        {
          id: "6",
          label: "Thể thao",
          url: "/category/the-thao",
          type: "category",
          target: "_self",
          order: 3,
          parentId: "2",
          active: true
        },
        {
          id: "7",
          label: "Giải trí",
          url: "/category/giai-tri",
          type: "category",
          target: "_self",
          order: 4,
          parentId: "2",
          active: true
        },
        {
          id: "8",
          label: "Liên hệ",
          url: "/page/contact",
          type: "page",
          target: "_self",
          order: 2,
          parentId: null,
          active: true
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      name: "Menu Footer",
      location: "footer",
      active: true,
      items: [
        {
          id: "9",
          label: "Về chúng tôi",
          url: "/page/about",
          type: "page",
          target: "_self",
          order: 0,
          parentId: null,
          active: true
        },
        {
          id: "10",
          label: "Chính sách",
          url: "/page/privacy",
          type: "page",
          target: "_self",
          order: 1,
          parentId: null,
          active: true
        },
        {
          id: "11",
          label: "Điều khoản",
          url: "/page/terms",
          type: "page",
          target: "_self",
          order: 2,
          parentId: null,
          active: true
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  await fs.writeFile(
    path.join(STORAGE_DIR, 'menus.json'),
    JSON.stringify(menus, null, 2)
  );

  console.log('✓ Đã tạo menu mẫu');
  console.log('  - Menu Header với submenu danh mục');
  console.log('  - Menu Footer');
}

seedMenus().catch(console.error);
