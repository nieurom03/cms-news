const fs = require('fs').promises;
const path = require('path');

const STORAGE_DIR = path.join(__dirname, '../storage');

async function seedPages() {
  console.log('Đang tạo pages mẫu...');

  const pages = [
    {
      id: "1",
      title: "Về chúng tôi",
      slug: "about",
      content: `
        <h2>Giới thiệu về Tin Tức 24h</h2>
        <p>Chào mừng bạn đến với Tin Tức 24h - nguồn tin tức uy tín và cập nhật nhất.</p>
        
        <h3>Sứ mệnh</h3>
        <p>Chúng tôi cam kết mang đến cho bạn đọc những thông tin chính xác, khách quan và kịp thời nhất về mọi lĩnh vực trong cuộc sống.</p>
        
        <h3>Giá trị cốt lõi</h3>
        <ul>
          <li>Độc lập và khách quan trong mọi bài viết</li>
          <li>Cập nhật tin tức nhanh chóng và chính xác</li>
          <li>Đa dạng góc nhìn và chuyên sâu</li>
          <li>Tôn trọng quyền riêng tư và đạo đức báo chí</li>
        </ul>
        
        <h3>Đội ngũ</h3>
        <p>Chúng tôi có đội ngũ phóng viên, biên tập viên giàu kinh nghiệm, luôn sẵn sàng đưa tin từ mọi miền đất nước.</p>
      `,
      template: "default",
      metaTitle: "Về chúng tôi - Tin Tức 24h",
      metaDescription: "Tìm hiểu về Tin Tức 24h - nguồn tin tức uy tín và cập nhật",
      status: "published",
      author: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      title: "Liên hệ",
      slug: "contact",
      content: `
        <h2>Liên hệ với chúng tôi</h2>
        <p>Chúng tôi luôn sẵn sàng lắng nghe ý kiến đóng góp của bạn.</p>
        
        <h3>Thông tin liên hệ</h3>
        <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM</p>
        <p><strong>Email:</strong> contact@tintuc24h.com</p>
        <p><strong>Hotline:</strong> 1900 xxxx</p>
        
        <h3>Giờ làm việc</h3>
        <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
        <p>Thứ 7: 8:00 - 12:00</p>
        <p>Chủ nhật: Nghỉ</p>
        
        <h3>Gửi tin bài</h3>
        <p>Nếu bạn có tin bài muốn chia sẻ, vui lòng gửi về email: <strong>news@tintuc24h.com</strong></p>
      `,
      template: "sidebar",
      metaTitle: "Liên hệ - Tin Tức 24h",
      metaDescription: "Thông tin liên hệ với Tin Tức 24h",
      status: "published",
      author: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "3",
      title: "Chính sách bảo mật",
      slug: "privacy",
      content: `
        <h2>Chính sách bảo mật thông tin</h2>
        <p>Cập nhật lần cuối: ${new Date().toLocaleDateString('vi-VN')}</p>
        
        <h3>1. Thu thập thông tin</h3>
        <p>Chúng tôi thu thập thông tin khi bạn đăng ký, đăng nhập hoặc tương tác với website.</p>
        
        <h3>2. Sử dụng thông tin</h3>
        <p>Thông tin được sử dụng để:</p>
        <ul>
          <li>Cải thiện trải nghiệm người dùng</li>
          <li>Gửi thông báo và cập nhật</li>
          <li>Phân tích và thống kê</li>
        </ul>
        
        <h3>3. Bảo mật thông tin</h3>
        <p>Chúng tôi cam kết bảo mật thông tin cá nhân của bạn bằng các biện pháp kỹ thuật và tổ chức phù hợp.</p>
        
        <h3>4. Chia sẻ thông tin</h3>
        <p>Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn cho bên thứ ba.</p>
        
        <h3>5. Liên hệ</h3>
        <p>Nếu có thắc mắc về chính sách bảo mật, vui lòng liên hệ: privacy@tintuc24h.com</p>
      `,
      template: "default",
      metaTitle: "Chính sách bảo mật - Tin Tức 24h",
      metaDescription: "Chính sách bảo mật thông tin người dùng",
      status: "published",
      author: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "4",
      title: "Điều khoản sử dụng",
      slug: "terms",
      content: `
        <h2>Điều khoản sử dụng</h2>
        
        <h3>1. Chấp nhận điều khoản</h3>
        <p>Bằng việc truy cập và sử dụng website, bạn đồng ý tuân thủ các điều khoản và điều kiện sau.</p>
        
        <h3>2. Quyền sở hữu trí tuệ</h3>
        <p>Tất cả nội dung trên website thuộc quyền sở hữu của Tin Tức 24h. Nghiêm cấm sao chép, phân phối mà không có sự cho phép.</p>
        
        <h3>3. Trách nhiệm người dùng</h3>
        <p>Người dùng cam kết:</p>
        <ul>
          <li>Không đăng tải nội dung vi phạm pháp luật</li>
          <li>Không spam hoặc quấy rối người khác</li>
          <li>Tôn trọng quyền riêng tư của người khác</li>
        </ul>
        
        <h3>4. Giới hạn trách nhiệm</h3>
        <p>Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng website.</p>
        
        <h3>5. Thay đổi điều khoản</h3>
        <p>Chúng tôi có quyền thay đổi điều khoản bất cứ lúc nào. Việc tiếp tục sử dụng website sau khi thay đổi đồng nghĩa với việc bạn chấp nhận điều khoản mới.</p>
      `,
      template: "default",
      metaTitle: "Điều khoản sử dụng - Tin Tức 24h",
      metaDescription: "Điều khoản và điều kiện sử dụng website",
      status: "published",
      author: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  await fs.writeFile(
    path.join(STORAGE_DIR, 'pages.json'),
    JSON.stringify(pages, null, 2)
  );

  console.log('✓ Đã tạo pages mẫu');
  console.log('  - Về chúng tôi (/page/about)');
  console.log('  - Liên hệ (/page/contact)');
  console.log('  - Chính sách bảo mật (/page/privacy)');
  console.log('  - Điều khoản sử dụng (/page/terms)');
}

seedPages().catch(console.error);
