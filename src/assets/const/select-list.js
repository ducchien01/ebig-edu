export const listRequirementForm = [
  { name: 'Online', id: 1 },
  { name: 'Phỏng vấn trực tiếp', id: 2 },
  { name: 'Quay video', id: 3 }
]
/// status của đơn hàng
export const listMarriedStatus = [
  { name: 'Đã kết hôn', id: 1 },
  { name: 'Chưa kết hôn', id: 2 },
  { name: 'Đã kết hôn/ Chưa kết hôn', id: 3 }
]

export const listStatusExam = [
  { name: 'Chưa thi tuyển', id: 1 },
  { name: 'Đã thi tuyển', id: 2 }
]
export const listProductType = [
  { name: 'Thực tập sinh', id: 1 },
  { name: 'Kỹ sư', id: 2 },
  { name: 'Du học', id: 3 },
  { name: 'Tokutei', id: 4 }
]
export const listCustomerType = [
  { name: 'Admin', id: 0 },
  { name: 'Ứng viên', id: 1 },
  { name: 'Đối tác', id: 2 },
  { name: 'Cộng tác viên', id: 3 },
  { name: 'Tuyển dụng', id: 4 }
]

export const listStatus = [
  { name: 'Đang hoạt động', id: 1 },
  { name: 'Ngừng hoạt động', id: 2 }
]

export const applyStatusList = [
  { name: 'Ứng tuyển', id: 1, descript: 'Gửi hồ sơ ứng tuyển thành công' },
  { name: 'Hồ sơ bị loại', id: 2, descript: 'Hồ sơ đã bị loại', parentName: 'Kết quả trúng tuyển' },
  { name: 'Hồ sơ dự bị', id: 3, descript: 'Hồ sơ dự bị', parentName: 'Kết quả trúng tuyển' },
  { name: 'Hồ sơ đã trúng tuyển', id: 4, descript: 'Hồ sơ đã trúng tuyển', parentName: 'Kết quả trúng tuyển' },
  { name: 'Chốt danh sách ứng viên không đạt', id: 5, descript: 'Form không đạt', parentName: 'Chốt danh sách ứng viên' },
  { name: 'Chốt danh sách ứng viên đạt', id: 6, descript: 'Form đạt', parentName: 'Chốt danh sách ứng viên' },
  { name: 'Học', id: 7, descript: 'Ứng viên đang trong thời gian học tập' },
  { name: 'Ký hợp đồng lương', id: 8, descript: 'Ứng viên đã có hợp đồng lương' },
  { name: 'Tư cách lưu trú', id: 9, descript: 'Ứng viên đã có tư cách lưu trú' },
  { name: 'Visa', id: 10, descript: 'Ứng viên đã có visa' },
  { name: 'Xuất cảnh', id: 11, descript: 'Ứng viên đã xuất cảnh Việt Nam' },
  { name: 'Mãn hạn về nước', id: 12, descript: 'Ứng viên đã về Việt Nam' }
]

export const ticketStatus = [
  { name: 'Chờ phê duyệt', id: 1 },
  { name: 'Dã phê duyệt', id: 2 },
  { name: 'Đã từ chối', id: 3 }
]

export const listDepartment = [
  {
    name: 'Phòng kiểm soát - hồ sơ', id: 1, permissions: [
      { name: 'Quản lý hồ sơ, danh sách ứng viên', id: 1 },
      { name: 'Quản lý người dùng mobile app', id: 2 },
    ]
  },
  {
    name: 'Phòng đối ngoại - PTTT', id: 2, permissions: [
      { name: 'Quản lý đơn hàng', id: 1 },
      { name: 'Quản lý xí nghiệp', id: 2 },
    ]
  },
  {
    name: 'Phòng marketing', id: 3, permissions: [
      { name: 'Quản lý bài viết', id: 1 },
    ]
  },
  {
    name: 'Trung tâm đào tạo', id: 4, permissions: [
      { name: 'Quản lý lớp học', id: 1 },
    ]
  },
  {
    name: 'Phòng điều hành - nhân sự', id: 5, permissions: [
      { name: 'Admin chính ', id: 1 },
      { name: 'Admin phụ ', id: 2 },
    ]
  },
]

export const listJobTitle = [
  { name: 'Giám đốc', id: 1 },
  { name: 'Trợ lý', id: 2 },
  { name: 'Thư ký giám đốc', id: 3 },
  { name: 'Nhân viên', id: 4 }
]

export const listVideoType = [
  { name: 'Tiếng Nhật cơ bản', id: 2 },
  { name: 'Tiếng Nhật nâng cao', id: 3 },
  { name: 'Ngôn ngữ chuyên ngành', id: 4 },
  { name: 'Video chung', id: 5 }
]

export const listCustomerStatus = [
  { id: 1, name: "Ứng tuyển" },
  { id: 2, name: "Kết quả ứng tuyển" },
  { id: 3, name: "Chốt danh sách ứng viên" },
  { id: 4, name: "Học" },
  { id: 5, name: "Ký hợp đồng lương" },
  { id: 6, name: "Tư cách lưu trú" },
  { id: 7, name: "Visa" },
  { id: 8, name: "Xuất cảnh" },
  { id: 9, name: "Mãn hạn về nước" },
  { id: 10, name: "Không trúng tuyển" },
]

export const notiProduct = 1
export const notiApplyInfor = 2
export const notiNews = 3

export const ticketType = [{ name: 'Đề nghị', id: 1 }, { name: 'Xin phép', id: 2 }]
export const ticketTypeName = [{ name: 'Nghỉ học', id: 1 }, { name: 'Đi muộn', id: 2 }]