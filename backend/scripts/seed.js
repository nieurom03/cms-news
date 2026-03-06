const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

const STORAGE_DIR = path.join(__dirname, '../storage');

async function seed() {
  console.log('Đang tạo dữ liệu mẫu...');

  // Tạo user với mật khẩu đã hash
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  const users = [
    {
      id: "1",
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      username: "editor",
      email: "editor@example.com",
      password: hashedPassword,
      role: "editor",
      createdAt: new Date().toISOString()
    }
  ];

  await fs.writeFile(
    path.join(STORAGE_DIR, 'users.json'),
    JSON.stringify(users, null, 2)
  );

  console.log('✓ Đã tạo users (admin@example.com / 123456)');
  console.log('✓ Đã tạo categories');
  console.log('✓ Đã tạo articles');
  console.log('✓ Đã tạo ads');
  console.log('\nHoàn tất! Bạn có thể đăng nhập với:');
  console.log('Email: admin@example.com');
  console.log('Password: 123456');
}

seed().catch(console.error);
