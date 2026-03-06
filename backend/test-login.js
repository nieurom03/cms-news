const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

async function testLogin() {
  console.log('🔍 Kiểm tra đăng nhập...\n');
  
  // Đọc users
  const usersData = await fs.readFile(path.join(__dirname, 'storage/users.json'), 'utf8');
  const users = JSON.parse(usersData);
  
  console.log('📋 Danh sách users:');
  users.forEach(u => {
    console.log(`  - ${u.email} (${u.role})`);
  });
  console.log('');
  
  // Test password
  const testEmail = 'admin@example.com';
  const testPassword = '123456';
  
  const user = users.find(u => u.email === testEmail);
  
  if (!user) {
    console.log('❌ Không tìm thấy user:', testEmail);
    return;
  }
  
  console.log('✓ Tìm thấy user:', testEmail);
  console.log('  Username:', user.username);
  console.log('  Role:', user.role);
  console.log('  Password hash:', user.password.substring(0, 20) + '...');
  console.log('');
  
  // So sánh password
  const isMatch = await bcrypt.compare(testPassword, user.password);
  
  if (isMatch) {
    console.log('✅ Mật khẩu đúng! Đăng nhập thành công.');
    console.log('');
    console.log('Thông tin đăng nhập:');
    console.log('  Email:', testEmail);
    console.log('  Password:', testPassword);
  } else {
    console.log('❌ Mật khẩu sai!');
    console.log('');
    console.log('Đang tạo lại user với mật khẩu mới...');
    
    // Tạo lại password hash
    const newHash = await bcrypt.hash(testPassword, 10);
    user.password = newHash;
    
    await fs.writeFile(
      path.join(__dirname, 'storage/users.json'),
      JSON.stringify(users, null, 2)
    );
    
    console.log('✓ Đã cập nhật mật khẩu!');
  }
}

testLogin().catch(console.error);
