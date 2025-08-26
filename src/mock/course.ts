import { ICourse } from 'src/types/course';

export const mockCourses: ICourse[] = [
  {
    id: 1,
    title: 'Tiếng Anh Giao Tiếp Cơ Bản',
    subtitle: 'Nắm vững các mẫu câu và từ vựng cơ bản',
    description:
      'Khóa học giúp bạn tự tin giao tiếp trong các tình huống hàng ngày như mua sắm, hỏi đường, và giới thiệu bản thân.',
    rating: { point: 4.6, count: 235 },
    students: 1200,
    price: 499000,
    content: [
      {
        id: 1,
        title: 'Giới thiệu',
        lectures: [
          {
            id: 1,
            title: 'Làm quen với tiếng Anh giao tiếp',
            description: 'Tổng quan về khóa học và mục tiêu',
            duration: 8,
          },
          {
            id: 2,
            title: 'Bảng chữ cái và phát âm',
            description: 'Cách đọc đúng bảng chữ cái tiếng Anh',
            duration: 12,
          },
        ],
      },
      {
        id: 2,
        title: 'Các chủ đề thông dụng',
        lectures: [
          {
            id: 3,
            title: 'Giới thiệu bản thân',
            description: 'Mẫu câu và từ vựng để tự giới thiệu',
            duration: 15,
          },
          {
            id: 4,
            title: 'Hỏi và chỉ đường',
            description: 'Học cách hỏi và đưa chỉ dẫn',
            duration: 14,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Tiếng Anh Thương Mại',
    subtitle: 'Tăng kỹ năng giao tiếp trong môi trường công việc',
    description:
      'Dành cho nhân viên văn phòng, kinh doanh muốn nâng cao tiếng Anh trong đàm phán, email và thuyết trình.',
    rating: { point: 4.8, count: 187 },
    students: 980,
    price: 799000,
    content: [
      {
        id: 1,
        title: 'Giao tiếp nơi làm việc',
        lectures: [
          {
            id: 1,
            title: 'Chào hỏi và giới thiệu trong công ty',
            description: 'Các mẫu câu chuyên nghiệp',
            duration: 10,
          },
          {
            id: 2,
            title: 'Gọi điện thoại công việc',
            description: 'Cách nói chuyện qua điện thoại chuyên nghiệp',
            duration: 15,
          },
        ],
      },
      {
        id: 2,
        title: 'Email và báo cáo',
        lectures: [
          {
            id: 3,
            title: 'Viết email chuyên nghiệp',
            description: 'Cấu trúc và cách dùng ngôn từ',
            duration: 20,
          },
          {
            id: 4,
            title: 'Báo cáo và thuyết trình',
            description: 'Ngôn ngữ dùng trong báo cáo',
            duration: 18,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Luyện Nghe Tiếng Anh Từ Cơ Bản Đến Nâng Cao',
    subtitle: 'Nâng cao kỹ năng nghe hiểu',
    description: 'Khóa học tập trung vào luyện nghe qua hội thoại thực tế và phim ảnh.',
    rating: { point: 4.7, count: 210 },
    students: 1100,
    price: 599000,
    content: [
      {
        id: 1,
        title: 'Nghe cơ bản',
        lectures: [
          {
            id: 1,
            title: 'Nghe từ và cụm từ',
            description: 'Làm quen với âm tiếng Anh',
            duration: 10,
          },
          {
            id: 2,
            title: 'Nghe câu ngắn',
            description: 'Luyện nghe câu cơ bản',
            duration: 12,
          },
        ],
      },
      {
        id: 2,
        title: 'Nghe nâng cao',
        lectures: [
          {
            id: 3,
            title: 'Nghe hội thoại dài',
            description: 'Luyện nghe hội thoại giữa nhiều người',
            duration: 20,
          },
          {
            id: 4,
            title: 'Nghe từ phim ảnh',
            description: 'Trích đoạn phim và cách luyện tập',
            duration: 18,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Ngữ Pháp Tiếng Anh Toàn Diện',
    subtitle: 'Nắm chắc mọi điểm ngữ pháp quan trọng',
    description: 'Từ thì cơ bản đến cấu trúc nâng cao, phù hợp mọi trình độ.',
    rating: { point: 4.9, count: 350 },
    students: 1500,
    price: 699000,
    content: [
      {
        id: 1,
        title: 'Ngữ pháp cơ bản',
        lectures: [
          {
            id: 1,
            title: 'Các thì trong tiếng Anh',
            description: 'Hiểu và áp dụng thì hiện tại, quá khứ, tương lai',
            duration: 25,
          },
          {
            id: 2,
            title: 'Câu khẳng định, phủ định, nghi vấn',
            description: 'Cấu trúc câu căn bản',
            duration: 15,
          },
        ],
      },
      {
        id: 2,
        title: 'Ngữ pháp nâng cao',
        lectures: [
          {
            id: 3,
            title: 'Mệnh đề quan hệ',
            description: 'Cách dùng và ví dụ',
            duration: 18,
          },
          {
            id: 4,
            title: 'Câu điều kiện',
            description: 'Điều kiện loại 0, 1, 2, 3',
            duration: 20,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Tiếng Anh Du Lịch',
    subtitle: 'Tự tin giao tiếp khi đi du lịch nước ngoài',
    description: 'Học các mẫu câu và từ vựng cần thiết khi di chuyển, đặt phòng, ăn uống.',
    rating: { point: 4.5, count: 145 },
    students: 850,
    price: 399000,
    content: [
      {
        id: 1,
        title: 'Chuẩn bị hành lý',
        lectures: [
          {
            id: 1,
            title: 'Từ vựng sân bay',
            description: 'Các từ cần biết khi check-in và boarding',
            duration: 12,
          },
          {
            id: 2,
            title: 'Đặt phòng khách sạn',
            description: 'Mẫu câu đặt phòng',
            duration: 15,
          },
        ],
      },
      {
        id: 2,
        title: 'Giao tiếp du lịch',
        lectures: [
          {
            id: 3,
            title: 'Đặt món tại nhà hàng',
            description: 'Hỏi món, thanh toán',
            duration: 14,
          },
          {
            id: 4,
            title: 'Hỏi thăm đường',
            description: 'Cách hỏi đường lịch sự',
            duration: 10,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Luyện Phát Âm Giọng Mỹ',
    subtitle: 'Phát âm chuẩn, tự tin hơn khi nói',
    description: 'Khóa học hướng dẫn phát âm theo chuẩn giọng Mỹ với các mẹo thực hành.',
    rating: { point: 4.8, count: 220 },
    students: 970,
    price: 499000,
    content: [
      {
        id: 1,
        title: 'Nguyên âm và phụ âm',
        lectures: [
          {
            id: 1,
            title: 'Nguyên âm đơn',
            description: 'Cách phát âm nguyên âm chuẩn',
            duration: 14,
          },
          {
            id: 2,
            title: 'Nguyên âm đôi',
            description: 'Cách phát âm nguyên âm đôi',
            duration: 16,
          },
        ],
      },
      {
        id: 2,
        title: 'Ngữ điệu',
        lectures: [
          {
            id: 3,
            title: 'Nhấn trọng âm',
            description: 'Quy tắc và luyện tập',
            duration: 18,
          },
          {
            id: 4,
            title: 'Ngữ điệu câu hỏi',
            description: 'Lên giọng, xuống giọng khi hỏi',
            duration: 15,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Tiếng Anh Phỏng Vấn Xin Việc',
    subtitle: 'Tự tin vượt qua phỏng vấn bằng tiếng Anh',
    description: 'Học cách trả lời các câu hỏi phổ biến, trình bày kinh nghiệm và kỹ năng.',
    rating: { point: 4.7, count: 190 },
    students: 720,
    price: 599000,
    content: [
      {
        id: 1,
        title: 'Chuẩn bị hồ sơ',
        lectures: [
          {
            id: 1,
            title: 'Viết CV tiếng Anh',
            description: 'Bố cục và từ vựng cần thiết',
            duration: 20,
          },
          {
            id: 2,
            title: 'Thư xin việc',
            description: 'Cách viết cover letter',
            duration: 15,
          },
        ],
      },
      {
        id: 2,
        title: 'Kỹ năng phỏng vấn',
        lectures: [
          {
            id: 3,
            title: 'Câu hỏi phổ biến',
            description: 'Phân tích và cách trả lời',
            duration: 18,
          },
          {
            id: 4,
            title: 'Trình bày kinh nghiệm',
            description: 'Sử dụng từ chuyên ngành',
            duration: 14,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Tiếng Anh Học Thuật',
    subtitle: 'Phục vụ mục tiêu học tập và nghiên cứu',
    description: 'Nâng cao kỹ năng đọc hiểu tài liệu học thuật, viết luận, và thuyết trình.',
    rating: { point: 4.9, count: 160 },
    students: 680,
    price: 899000,
    content: [
      {
        id: 1,
        title: 'Đọc hiểu',
        lectures: [
          {
            id: 1,
            title: 'Chiến lược đọc nhanh',
            description: 'Skimming và scanning',
            duration: 18,
          },
          {
            id: 2,
            title: 'Đọc hiểu sâu',
            description: 'Phân tích cấu trúc và ý chính',
            duration: 20,
          },
        ],
      },
      {
        id: 2,
        title: 'Viết học thuật',
        lectures: [
          {
            id: 3,
            title: 'Cấu trúc bài luận',
            description: 'Mở bài, thân bài, kết luận',
            duration: 22,
          },
          {
            id: 4,
            title: 'Trích dẫn và tài liệu tham khảo',
            description: 'APA, MLA, Chicago style',
            duration: 15,
          },
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Tiếng Anh Cho Trẻ Em',
    subtitle: 'Học tiếng Anh qua trò chơi và bài hát',
    description: 'Khóa học giúp trẻ làm quen tiếng Anh tự nhiên và vui nhộn.',
    rating: { point: 4.6, count: 300 },
    students: 1500,
    price: 299000,
    content: [
      {
        id: 1,
        title: 'Từ vựng cơ bản',
        lectures: [
          {
            id: 1,
            title: 'Màu sắc và hình dạng',
            description: 'Học qua bài hát và trò chơi',
            duration: 12,
          },
          {
            id: 2,
            title: 'Số đếm và chữ cái',
            description: 'Học qua trò chơi đếm số',
            duration: 10,
          },
        ],
      },
      {
        id: 2,
        title: 'Giao tiếp cơ bản',
        lectures: [
          {
            id: 3,
            title: 'Chào hỏi',
            description: 'Học qua tình huống hàng ngày',
            duration: 8,
          },
          {
            id: 4,
            title: 'Hỏi và trả lời đơn giản',
            description: 'Các câu hỏi quen thuộc',
            duration: 9,
          },
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Luyện Thi IELTS 7.0+',
    subtitle: 'Chiến lược đạt điểm cao trong kỳ thi IELTS',
    description: 'Bao quát cả 4 kỹ năng nghe, nói, đọc, viết với mẹo và bài tập thực hành.',
    rating: { point: 4.9, count: 400 },
    students: 2000,
    price: 1299000,
    content: [
      {
        id: 1,
        title: 'Nghe và Nói',
        lectures: [
          {
            id: 1,
            title: 'Nghe Part 1 và 2',
            description: 'Chiến thuật và luyện tập',
            duration: 25,
          },
          {
            id: 2,
            title: 'Nói Part 1 và 2',
            description: 'Cách trả lời tự nhiên',
            duration: 20,
          },
        ],
      },
      {
        id: 2,
        title: 'Đọc và Viết',
        lectures: [
          {
            id: 3,
            title: 'Đọc học thuật',
            description: 'Luyện tập và phân tích bài mẫu',
            duration: 30,
          },
          {
            id: 4,
            title: 'Viết Task 1 và Task 2',
            description: 'Cách viết mạch lạc và logic',
            duration: 28,
          },
        ],
      },
    ],
  },
];
