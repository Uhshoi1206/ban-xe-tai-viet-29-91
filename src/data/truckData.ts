import { Truck, TruckBrand, VehicleType, TruckWeight } from '@/models/TruckTypes';

// Dữ liệu thương hiệu xe
export const truckBrands: TruckBrand[] = [
  { id: 1, name: 'Hyundai' },
  { id: 2, name: 'Isuzu' },
  { id: 3, name: 'Hino' },
  { id: 4, name: 'Thaco' },
  { id: 5, name: 'JAC' },
  { id: 6, name: 'Suzuki' },
  { id: 7, name: 'Dongfeng' },
  { id: 8, name: 'Kia' },
  { id: 9, name: 'VEAM' },
  { id: 10, name: 'TADANO' },
  { id: 11, name: 'UNIC' },
  { id: 12, name: 'Kanglim' },
  { id: 13, name: 'Soosan' },
  { id: 14, name: 'CIMC' },
  { id: 15, name: 'DOOSUNG' },
  { id: 16, name: 'HOWO' },
];

// Định nghĩa các phạm vi tải trọng
export const truckWeights: TruckWeight[] = [
  { id: 1, name: 'Dưới 1 tấn', minWeight: 0, maxWeight: 1 }, // Tải trọng xe dưới 1 tấn
  { id: 2, name: '1 - 2 tấn', minWeight: 1, maxWeight: 2 }, // Tải trọng xe từ 1 đến 2 tấn
  { id: 3, name: '2 - 3.5 tấn', minWeight: 2, maxWeight: 3.5 }, // Tải trọng xe từ 2 đến 3.5 tấn
  { id: 4, name: '3.5 - 5 tấn', minWeight: 3.5, maxWeight: 5 }, // Tải trọng xe từ 3.5 đến 5 tấn
  { id: 5, name: '5 - 8 tấn', minWeight: 5, maxWeight: 8 }, // Tải trọng xe từ 5 đến 8 tấn
  { id: 6, name: '8 - 15 tấn', minWeight: 8, maxWeight: 15 }, // Tải trọng xe từ 8 đến 15 tấn
  { id: 7, name: '15 - 20 tấn', minWeight: 15, maxWeight: 20 }, // Tải trọng xe từ 15 đến 20 tấn
  { id: 8, name: 'Trên 20 tấn', minWeight: 20, maxWeight: 100 }, // Tải trọng xe trên 20 tấn
];

// Dữ liệu xe - đã sắp xếp theo danh mục và thêm comment chi tiết
export const trucks: Truck[] = [
  // ===== XE TẢI =====
  {
    id: "101", // Mã sản phẩm duy nhất
    name: 'Hino XZU 7.5 Tấn Thùng Đông Lạnh', // Tên đầy đủ của sản phẩm
    slug: 'hino-xzu-7-5tan-thung-dong-lanh', // Chuỗi rút gọn cho URL, thường là tên sản phẩm không dấu, nối bằng gạch ngang
    brand: 'Hino', // Thương hiệu của xe
    price: 1250000000, // Giá bán của xe (dạng số, đơn vị VNĐ)
    priceText: '1.250.000.000 đ', // Giá bán của xe (dạng chữ, đã định dạng)
    weightText: '7.5 Tấn', // Tải trọng cho phép chở của xe (dạng chữ)
    weight: 7.5, // Tải trọng cho phép chở (số, đơn vị: tấn)
    length: 6.1, // Chiều dài lọt lòng thùng xe hoặc chiều dài tổng thể (mét) - cần làm rõ ý nghĩa tùy ngữ cảnh
    width: 2.1, // Chiều rộng lọt lòng thùng xe hoặc chiều rộng tổng thể (mét)
    height: 2.2, // Chiều cao lọt lòng thùng xe hoặc chiều cao tổng thể (mét)
    dimensions: '6.1 x 2.1 x 2.2 m', // Kích thước (DxRxC) của thùng xe hoặc tổng thể xe
    type: 'xe-tai', // Phân loại chính của xe (xe-tai, xe-cau, mooc, dau-keo)
    boxType: 'đông-lạnh', // Loại thùng chuyên dụng của xe tải (đông-lạnh, bảo-ôn, kín, bạt, lửng, xi-téc)
    isNew: true, // Trạng thái xe mới (true) hoặc đã qua sử dụng (false)
    isHot: true, // Đánh dấu sản phẩm là nổi bật, bán chạy
    origin: 'Nhật Bản/Việt Nam', // Nguồn gốc, xuất xứ của xe
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Hino/hino-xzu-dong-lanh.jpg', // Đường dẫn ảnh đại diện sản phẩm
    images: [ // Danh sách đường dẫn các ảnh chi tiết khác của sản phẩm
      'https://tongkhoxetai.vn/upload/images/Hino/hino-xzu-dong-lanh.jpg',
      'https://tongkhoxetai.vn/upload/images/Hino/hino-xzu-dong-lanh-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Hino/hino-xzu-dong-lanh-3.jpg',
    ],
    specifications: { // Các thông số kỹ thuật chung của xe
      engineType: 'Diesel N04C-WB', // Kiểu động cơ / Tên model động cơ
      engineCapacity: '4.0L', // Dung tích xi lanh của động cơ (Lít hoặc cc)
      horsePower: '150 HP', // Công suất cực đại của động cơ (Mã lực)
      torque: '420 Nm', // Mô-men xoắn cực đại của động cơ (Nm)
      transmission: 'Số sàn 5 cấp', // Loại hộp số và số cấp
      fuelConsumption: '12L/100km', // Mức tiêu thụ nhiên liệu trung bình (Lít/100km)
      emission: 'Euro 4', // Tiêu chuẩn khí thải
      warranty: '3 năm hoặc 100.000 km', // Chính sách bảo hành
      seats: 3, // Số chỗ ngồi trong cabin
      year: 2023 // Năm sản xuất của xe
    },
    coolingBox: { // Thông số chi tiết của thùng đông lạnh
      wallLayers: 3, // Số lớp vật liệu của vách thùng
      wallMaterials: ['Inox 304', 'Foam PU', 'Composite'], // Danh sách vật liệu cấu tạo vách thùng
      floorLayers: 3, // Số lớp vật liệu của sàn thùng
      floorMaterials: ['Inox 304', 'Foam PU', 'Composite chống trượt'], // Danh sách vật liệu cấu tạo sàn thùng
      roofLayers: 3, // Số lớp vật liệu của nóc thùng
      roofMaterials: ['Inox 304', 'Foam PU', 'Composite'], // Danh sách vật liệu cấu tạo nóc thùng
      doorType: 'Cửa mở 2 cánh phía sau, 1 cửa bên hông', // Kiểu thiết kế cửa thùng
      insulationThickness: '80mm', // Độ dày của lớp cách nhiệt (milimét)
      refrigerationSystem: 'Máy lạnh Carrier Citimax 700', // Model hoặc loại hệ thống làm lạnh
      temperatureRange: '-18°C đến +18°C' // Dải nhiệt độ mà thùng có thể duy trì
    },
    description: 'Hino XZU 7.5 Tấn Thùng Đông Lạnh là giải pháp vận chuyển hàng đông lạnh chuyên nghiệp với thùng đông lạnh được thiết kế đặc biệt để duy trì nhiệt độ thấp ổn định, phù hợp để vận chuyển thực phẩm, dược phẩm và các sản phẩm yêu cầu bảo quản lạnh.', // Mô tả chi tiết về sản phẩm
    features: [ // Danh sách các tính năng nổi bật của sản phẩm
      'Thùng đông lạnh cách nhiệt 3 lớp tiêu chuẩn',
      'Máy lạnh công suất lớn Carrier Citimax',
      'Khả năng duy trì nhiệt độ -18°C',
      'Sàn thùng chống trượt cao cấp',
      'Cửa kín khí đảm bảo không thất thoát lạnh',
      'Động cơ tiết kiệm nhiên liệu',
      'Hệ thống giám sát nhiệt độ thời gian thực'
    ]
  },
  {
    id: "102",
    name: 'Hyundai H150 Thùng Bảo Ôn',
    slug: 'hyundai-h150-thung-bao-on',
    brand: 'Hyundai',
    price: 560000000,
    priceText: '560.000.000 đ',
    weightText: '1.5 Tấn', // Tải trọng chuyên chở
    weight: 1.5, // Tải trọng (tấn)
    length: 3.0, // Chiều dài lọt lòng thùng (mét)
    width: 1.6, // Chiều rộng lọt lòng thùng (mét)
    height: 1.8, // Chiều cao lọt lòng thùng (mét)
    dimensions: '3.0 x 1.6 x 1.8 m', // Kích thước lọt lòng thùng (DxRxC)
    type: 'xe-tai',
    boxType: 'bảo-ôn', // Loại thùng bảo ôn
    isNew: false, // Xe đã qua sử dụng hoặc model cũ
    isHot: true,
    origin: 'Hàn Quốc/Việt Nam',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Hyundai/h150-bao-on.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Hyundai/h150-bao-on.jpg',
      'https://tongkhoxetai.vn/upload/images/Hyundai/h150-bao-on-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Hyundai/h150-bao-on-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel Kappa',
      engineCapacity: '2.5L',
      horsePower: '130 HP',
      torque: '255 Nm',
      transmission: 'Số sàn 6 cấp',
      fuelConsumption: '9L/100km',
      emission: 'Euro 4',
      warranty: '3 năm hoặc 100.000 km',
      seats: 3,
      year: 2023
    },
    insulatedBox: { // Thông số thùng bảo ôn
      wallThickness: '50mm', // Độ dày vách thùng
      floorThickness: '50mm', // Độ dày sàn thùng
      roofThickness: '50mm', // Độ dày nóc thùng
      insulationMaterial: 'Foam PU cách nhiệt', // Vật liệu cách nhiệt chính
      outerMaterial: 'Inox 430', // Vật liệu lớp ngoài cùng của thùng
      innerMaterial: 'Foam PU', // Vật liệu lớp trong cùng của thùng (thường là Inox/Composite/Tôn)
      doorType: 'Cửa mở 2 cánh phía sau', // Kiểu cửa thùng
      temperatureRange: '0°C đến +10°C' // Dải nhiệt độ bảo quản của thùng
    },
    description: 'Hyundai H150 Thùng Bảo Ôn là giải pháp hoàn hảo để vận chuyển thực phẩm, hàng hóa cần duy trì nhiệt độ mát. Thùng xe được thiết kế với lớp cách nhiệt chuyên dụng giúp duy trì nhiệt độ ổn định, phù hợp với các loại hàng như rau củ quả, bánh kẹo, sữa và các sản phẩm tươi sống.',
    features: [
      'Thùng bảo ôn 2 lớp cách nhiệt hiệu quả',
      'Cấu trúc thùng chắc chắn, dễ vệ sinh',
      'Sàn inox chống trượt, dễ dàng vệ sinh',
      'Cửa sau kín khí với gioăng cao su đặc biệt',
      'Động cơ mạnh mẽ, tiết kiệm nhiên liệu',
      'Cabin tiện nghi với nhiều tiện ích',
      'Vận hành êm ái, dễ dàng di chuyển trong đô thị'
    ]
  },
  {
    id: "103",
    name: 'Isuzu QKR Thùng Kín',
    slug: 'isuzu-qkr-thung-kin',
    brand: 'Isuzu',
    price: 520000000,
    priceText: '520.000.000 đ',
    weightText: '2.9 Tấn', // Tải trọng chuyên chở
    weight: 2.9, // Tải trọng (tấn)
    length: 4.3, // Chiều dài lọt lòng thùng (mét)
    width: 1.9, // Chiều rộng lọt lòng thùng (mét)
    height: 2.0, // Chiều cao lọt lòng thùng (mét)
    dimensions: '4.3 x 1.9 x 2.0 m', // Kích thước lọt lòng thùng (DxRxC)
    type: 'xe-tai',
    boxType: 'kín', // Loại thùng kín
    isNew: true,
    isHot: false,
    origin: 'Nhật Bản/Việt Nam',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Isuzu/qkr-thung-kin.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Isuzu/qkr-thung-kin.jpg',
      'https://tongkhoxetai.vn/upload/images/Isuzu/qkr-thung-kin-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Isuzu/qkr-thung-kin-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel 4JB1', // Kiểu động cơ
      engineCapacity: '2.8L', // Dung tích động cơ
      horsePower: '110 HP', // Công suất
      torque: '240 Nm', // Mô-men xoắn
      transmission: 'Số sàn 5 cấp', // Hộp số
      fuelConsumption: '10L/100km', // Tiêu thụ nhiên liệu
      emission: 'Euro 4', // Khí thải
      warranty: '3 năm hoặc 100.000 km', // Bảo hành
      seats: 3, // Số chỗ
      year: 2023 // Năm sản xuất
    },
    closedBox: { // Thông số thùng kín
        panelMaterial: 'Composite/Inox/Tôn', // Vật liệu vách thùng (Composite, Inox, Tôn kẽm)
        doorType: '2 cánh mở phía sau, có thể có cửa hông', // Kiểu cửa thùng
        floorMaterial: 'Sàn thép/gỗ', // Vật liệu sàn thùng
        thickness: 'Tùy chọn (ví dụ: 0.5mm - 1.2mm cho tôn)', // Độ dày vật liệu vách
        reinforcement: 'Khung xương thép hộp gia cường', // Gia cố khung xương
    },
    description: 'Isuzu QKR Thùng Kín là giải pháp vận chuyển hàng hóa an toàn, tránh tác động của môi trường bên ngoài. Thùng xe được thiết kế chắc chắn, kín hoàn toàn, bảo vệ hàng hóa khỏi mưa gió, bụi bẩn và tác động vật lý. Đặc biệt phù hợp để vận chuyển đồ điện tử, nội thất, quần áo và các mặt hàng cần được bảo vệ.',
    features: [
      'Thùng kín hoàn toàn bằng composite cao cấp',
      'Cánh cửa sau đóng mở linh hoạt',
      'Sàn thùng chắc chắn, chịu lực tốt',
      'Khả năng chống thấm nước cao',
      'Động cơ bền bỉ, tiết kiệm nhiên liệu',
      'Cabin rộng rãi, thoải mái cho người lái',
      'Hệ thống khung gầm chắc chắn'
    ]
  },
  {
    id: "104",
    name: 'VEAM VPT350 Thùng Bạt',
    slug: 'veam-vpt350-thung-bat',
    brand: 'VEAM',
    price: 380000000,
    priceText: '380.000.000 đ',
    weightText: '3.5 Tấn', // Tải trọng chuyên chở
    weight: 3.5, // Tải trọng (tấn)
    length: 4.8, // Chiều dài lọt lòng thùng (mét)
    width: 2.0, // Chiều rộng lọt lòng thùng (mét)
    height: 2.1, // Chiều cao từ mặt sàn thùng đến nóc phủ bạt (mét)
    dimensions: '4.8 x 2.0 x 2.1 m', // Kích thước lọt lòng thùng (DxRxC)
    type: 'xe-tai',
    boxType: 'bạt', // Loại thùng mui bạt
    isNew: false,
    isHot: false,
    origin: 'Việt Nam',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Veam/vpt350-thung-bat.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Veam/vpt350-thung-bat.jpg',
      'https://tongkhoxetai.vn/upload/images/Veam/vpt350-thung-bat-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Veam/vpt350-thung-bat-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel ISUZU',
      engineCapacity: '2.7L',
      horsePower: '105 HP',
      torque: '230 Nm',
      transmission: 'Số sàn 5 cấp',
      fuelConsumption: '11L/100km',
      emission: 'Euro 4',
      warranty: '2 năm hoặc 80.000 km',
      seats: 3,
      year: 2023
    },
    tarpaulinBox: { // Thông số thùng mui bạt
        tarpaulinMaterial: 'Bạt Simili/PVC chống thấm 3 lớp', // Chất liệu bạt phủ
        frameType: 'Khung xương thép hộp, có kèo tháo rời', // Loại khung kèo và bửng
        sideAccess: true, // Có khả năng mở bửng hông
        floorMaterial: 'Sàn thép phẳng/gỗ', // Vật liệu sàn thùng
    },
    description: 'VEAM VPT350 Thùng Bạt là giải pháp vận chuyển hàng hóa linh hoạt với khả năng tiếp cận hàng từ nhiều phía. Thùng xe được thiết kế với khung thép chắc chắn, bạt chống thấm cao cấp, giúp bảo vệ hàng hóa khỏi mưa gió, đồng thời cho phép dễ dàng bốc dỡ hàng từ cả phía sau và hai bên hông.',
    features: [
      'Khung thùng thép chắc chắn, bạt chống thấm cao cấp',
      'Bạt thùng có thể mở từ nhiều phía để dễ dàng bốc xếp hàng',
      'Sàn thùng làm bằng gỗ cứng, chịu lực tốt',
      'Tấm bạt chống thấm nước, chống tia UV',
      'Động cơ mạnh mẽ, tiết kiệm nhiên liệu',
      'Cabin thoải mái với nhiều tiện ích',
      'Chi phí bảo dưỡng thấp'
    ]
  },
  {
    id: "105",
    name: 'Isuzu VM FX Thùng Lửng',
    slug: 'isuzu-vm-fx-thung-lung',
    brand: 'Isuzu',
    price: 710000000,
    priceText: '710.000.000 đ',
    weightText: '8.2 Tấn', // Tải trọng chuyên chở
    weight: 8.2, // Tải trọng (tấn)
    length: 6.5, // Chiều dài lọt lòng thùng (mét)
    width: 2.3, // Chiều rộng lọt lòng thùng (mét)
    height: 0.6, // Chiều cao của bửng thùng (mét)
    dimensions: '6.5 x 2.3 x 0.6 m', // Kích thước lọt lòng thùng (DxRxC của phần bửng)
    type: 'xe-tai',
    boxType: 'lửng', // Loại thùng lửng
    isNew: false,
    isHot: false,
    origin: 'Nhật Bản',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Isuzu/vm-fx-thung-lung.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Isuzu/vm-fx-thung-lung.jpg',
      'https://tongkhoxetai.vn/upload/images/Isuzu/vm-fx-thung-lung-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Isuzu/vm-fx-thung-lung-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel Common Rail',
      engineCapacity: '5.2L',
      horsePower: '210 HP',
      torque: '650 Nm',
      transmission: 'Số sàn 6 cấp',
      fuelConsumption: '14L/100km',
      emission: 'Euro 4',
      warranty: '3 năm hoặc 100.000 km',
      seats: 3,
      year: 2023
    },
    flatbedBox: { // Thông số thùng lửng
        floorMaterial: 'Sàn thép phẳng dày', // Vật liệu sàn
        sideHeight: 0.6, // Chiều cao bửng (mét)
        sideType: 'Bửng thép có thể mở hoặc tháo rời', // Kiểu bửng
        floorThickness: '3-5mm', // Độ dày sàn thép (ví dụ)
    },
    description: 'Isuzu VM FX Thùng Lửng là giải pháp tối ưu cho việc vận chuyển hàng hóa kích thước lớn, dài, vật liệu xây dựng và các thiết bị công nghiệp. Với thiết kế thùng không có thành cao, xe có khả năng chở được các loại hàng hóa có kích thước vượt quá chiều rộng của thùng xe.',
    features: [
      'Thùng lửng thấp, thuận tiện cho việc bốc dỡ hàng hóa',
      'Nền thùng làm từ thép chịu lực cao',
      'Thành thùng thấp giúp dễ dàng chất/dỡ hàng hóa',
      'Khung gầm chắc chắn, chịu tải tốt',
      'Động cơ mạnh mẽ, bền bỉ',
      'Cabin rộng rãi, trang bị đầy đủ tiện nghi',
      'Hệ thống phanh ABS/EBD đảm bảo an toàn'
    ]
  },
  {
    id: "106",
    name: 'Dongfeng Xi Téc 9 Khối',
    slug: 'dongfeng-xi-tec-9-khoi',
    brand: 'Dongfeng',
    price: 920000000,
    priceText: '920.000.000 đ',
    weightText: '9 Tấn', // Tải trọng hàng hóa (tương đương khối lượng nhiên liệu)
    weight: 9, // Tải trọng (tấn)
    length: 7.2, // Chiều dài tổng thể xe (mét)
    width: 2.4, // Chiều rộng tổng thể xe (mét)
    height: 2.8, // Chiều cao tổng thể xe (mét)
    dimensions: '7.2 x 2.4 x 2.8 m', // Kích thước tổng thể (DxRxC)
    type: 'xe-tai',
    boxType: 'xi-téc', // Loại thùng xi téc chở xăng dầu
    isNew: true,
    isHot: true,
    origin: 'Trung Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Dongfeng/xi-tec-9-khoi.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Dongfeng/xi-tec-9-khoi.jpg',
      'https://tongkhoxetai.vn/upload/images/Dongfeng/xi-tec-9-khoi-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Dongfeng/xi-tec-9-khoi-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel Cummins',
      engineCapacity: '6.7L',
      horsePower: '240 HP',
      torque: '820 Nm',
      transmission: 'Số sàn 8 cấp',
      fuelConsumption: '16L/100km',
      emission: 'Euro 4',
      warranty: '2 năm hoặc 100.000 km',
      seats: 2,
      year: 2023
    },
    tankSpec: { // Thông số bồn xi téc
      capacity: 9000, // Dung tích bồn (lít)
      capacityText: '9.000 lít', // Dung tích bồn (chữ, tương đương 9 khối)
      compartments: 3, // Số ngăn của bồn chứa
      material: 'Thép carbon Q345 dày 5mm', // Vật liệu chế tạo bồn
      thickness: '5mm', // Độ dày thành bồn
      valveSystem: 'Van đáy, van xả, van khẩn cấp', // Hệ thống van của bồn
      pressureRating: '0.3 MPa', // Áp suất làm việc thiết kế của bồn
      dischargingSystem: 'Bơm ly tâm + hệ thống ống đường ống', // Hệ thống bơm và xả nhiên liệu
      safetyEquipment: 'Van thở, dây tiếp đất, bình chữa cháy, hệ thống thu hồi hơi', // Thiết bị an toàn PCCC
    },
    description: 'Dongfeng Xi Téc 9 Khối là xe chuyên dụng phục vụ vận chuyển xăng dầu, được thiết kế đặc biệt theo tiêu chuẩn an toàn quốc tế. Bồn chứa được chia thành 3 khoang riêng biệt với hệ thống van và điều khiển độc lập, đảm bảo an toàn tuyệt đối khi vận chuyển.',
    features: [
      'Bồn chứa 3 khoang riêng biệt, dung tích 9.000 lít',
      'Thiết kế theo tiêu chuẩn an toàn PCCC',
      'Hệ thống bơm xăng dầu hiệu suất cao',
      'Hệ thống van an toàn đạt tiêu chuẩn quốc tế',
      'Động cơ mạnh mẽ, tiết kiệm nhiên liệu',
      'Trang bị hệ thống phanh ABS/ESP',
      'Cabin cách âm, giảm chấn tốt'
    ]
  },
  {
    id: "1",
    name: 'Hyundai Porter H150 1.5 Tấn',
    slug: 'hyundai-porter-h150-1-5-tan',
    brand: 'Hyundai',
    price: 410000000,
    priceText: '410.000.000 đ',
    weightText: '1.5 Tấn', // Tải trọng cho phép chở
    weight: 1.5, // Tải trọng (tấn)
    length: 3.6, // Chiều dài lọt lòng thùng (mét) - phụ thuộc loại thùng đóng
    width: 1.6, // Chiều rộng lọt lòng thùng (mét)
    height: 1.9, // Chiều cao lọt lòng thùng (mét)
    dimensions: '3.6 x 1.6 x 1.9 m', // Kích thước lọt lòng thùng (DxRxC)
    type: 'xe-tai',
    // boxType:  // Không có boxType cụ thể, có thể là xe chassis hoặc đóng thùng theo yêu cầu
    isNew: true,
    isHot: true,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Hyundai/h150.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Hyundai/h150.jpg',
      'https://tongkhoxetai.vn/upload/images/Hyundai/h150-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Hyundai/h150-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel',
      engineCapacity: '2.5L',
      horsePower: '130 HP',
      torque: '260 Nm',
      transmission: 'Số sàn 6 cấp',
      fuelConsumption: '8L/100km',
      emission: 'Euro 4',
      warranty: '3 năm hoặc 100.000 km',
      seats: 3,
      year: 2023
    },
    description: 'Hyundai Porter H150 1.5 tấn là một trong những dòng xe tải nhẹ được nhập khẩu, chính hãng tại Hyundai Thành Công. Xe được trang bị động cơ Kappa 1.5L, mạnh mẽ và tiết kiệm nhiên liệu. Mẫu xe này được thiết kế để đáp ứng nhu cầu vận chuyển hàng hóa trong đô thị một cách linh hoạt.',
    features: [
      'Động cơ Kappa 1.5L tiết kiệm nhiên liệu',
      'Hệ thống phanh ABS/EBD',
      'Cabin rộng rãi, tiện nghi',
      'Khả năng chở hàng linh hoạt trong đô thị',
      'Tiêu chuẩn khí thải Euro 4'
    ]
  },
  {
    id: "2",
    name: 'Suzuki Super Carry Pro 940kg',
    slug: 'suzuki-super-carry-pro-940kg',
    brand: 'Suzuki',
    price: 334000000,
    priceText: '334.000.000 đ',
    weightText: '940kg', // Tải trọng cho phép chở
    weight: 0.94, // Tải trọng (tấn)
    length: 3.2, // Chiều dài lọt lòng thùng (mét)
    width: 1.6, // Chiều rộng lọt lòng thùng (mét)
    height: 1.8, // Chiều cao tổng thể hoặc chiều cao bửng (mét)
    dimensions: '3.2 x 1.6 x 1.8 m', // Kích thước lọt lòng thùng (DxRxC)
    type: 'xe-tai',
    // boxType: // Thường là thùng lửng hoặc đóng thùng theo yêu cầu
    isNew: false,
    isHot: false,
    origin: 'Nhật Bản',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Suzuki/super-carry-pro.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Suzuki/super-carry-pro.jpg',
      'https://tongkhoxetai.vn/upload/images/Suzuki/super-carry-pro-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Suzuki/super-carry-pro-3.jpg',
    ],
    specifications: {
      engineType: 'Xăng',
      engineCapacity: '1.6L',
      horsePower: '92 HP',
      torque: '133 Nm',
      transmission: 'Số sàn 5 cấp',
      fuelConsumption: '7L/100km',
      emission: 'Euro 4',
      warranty: '3 năm hoặc 100.000 km',
      seats: 2,
      year: 2023
    },
    description: 'Suzuki Super Carry Pro là dòng xe tải nhẹ được ưa chuộng tại Việt Nam với khả năng chở hàng linh hoạt trong đô thị. Xe có thiết kế nhỏ gọn, dễ dàng di chuyển trong các ngõ hẹp và khu vực đông đúc.',
    features: [
      'Thiết kế nhỏ gọn, dễ dàng di chuyển',
      'Tiết kiệm nhiên liệu',
      'Chi phí bảo dưỡng thấp',
      'Khả năng vận hành bền bỉ',
      'Khả năng chở hàng linh hoạt'
    ]
  },
  {
    id: "3",
    name: 'Hyundai Mighty EX8 GTL 8 Tấn',
    slug: 'hyundai-mighty-ex8-gtl-8-tan',
    brand: 'Hyundai',
    price: 750000000,
    priceText: '750.000.000 đ',
    weightText: '8 Tấn', // Tải trọng chuyên chở
    weight: 8, // Tải trọng (tấn)
    length: 6.6, // Chiều dài lọt lòng thùng (mét)
    width: 2.2, // Chiều rộng lọt lòng thùng (mét)
    height: 2.3, // Chiều cao lọt lòng thùng (mét)
    dimensions: '6.6 x 2.2 x 2.3 m', // Kích thước lọt lòng thùng (DxRxC)
    type: 'xe-tai',
    // boxType: // Cần loại thùng cụ thể
    isNew: true,
    isHot: true,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Hyundai/mighty-ex8.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Hyundai/mighty-ex8.jpg',
      'https://tongkhoxetai.vn/upload/images/Hyundai/mighty-ex8-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Hyundai/mighty-ex8-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel',
      engineCapacity: '3.9L',
      horsePower: '170 HP',
      torque: '608 Nm',
      transmission: 'Số sàn 5 cấp',
      fuelConsumption: '13L/100km',
      emission: 'Euro 4',
      warranty: '3 năm hoặc 100.000 km',
      seats: 3,
      year: 2023
    },
    description: 'Hyundai Mighty EX8 GTL 8 tấn là dòng xe tải trung được ưa chuộng tại Việt Nam với thiết kế hiện đại và khả năng vận hành mạnh mẽ. Xe được trang bị động cơ Diesel 3.9L, mang lại hiệu suất cao và tiết kiệm nhiên liệu.',
    features: [
      'Động cơ mạnh mẽ, tiết kiệm nhiên liệu',
      'Cabin rộng rãi, tiện nghi',
      'Hệ thống phanh ABS/EBD',
      'Khung gầm chắc chắn',
      'Tải trọng lớn, phù hợp vận chuyển đường dài'
    ]
  },
  {
    id: "4",
    name: 'Isuzu QKR 2.9 Tấn',
    slug: 'isuzu-qkr-2-9-tan',
    brand: 'Isuzu',
    price: 465000000,
    priceText: '465.000.000 đ',
    weightText: '2.9 Tấn', // Tải trọng chuyên chở
    weight: 2.9, // Tải trọng (tấn)
    length: 4.5, // Chiều dài lọt lòng thùng (mét)
    width: 1.7, // Chiều rộng lọt lòng thùng (mét)
    height: 2.0, // Chiều cao lọt lòng thùng (mét)
    dimensions: '4.5 x 1.7 x 2.0 m', // Kích thước lọt lòng thùng (DxRxC)
    type: 'xe-tai',
    // boxType: // Cần loại thùng cụ thể
    isNew: false,
    isHot: false,
    origin: 'Nhật Bản',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Isuzu/qkr.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Isuzu/qkr.jpg',
      'https://tongkhoxetai.vn/upload/images/Isuzu/qkr-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Isuzu/qkr-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel',
      engineCapacity: '2.8L',
      horsePower: '106 HP',
      torque: '280 Nm',
      transmission: 'Số sàn 5 cấp',
      fuelConsumption: '9L/100km',
      emission: 'Euro 4',
      warranty: '3 năm hoặc 100.000 km',
      seats: 3,
      year: 2023
    },
    description: 'Isuzu QKR 2.9 tấn là dòng xe tải nhẹ được nhiều khách hàng tin dùng với ưu điểm về độ bền, tiết kiệm nhiên liệu và chi phí bảo dưỡng thấp. Xe được thiết kế phù hợp với điều kiện vận chuyển hàng hóa tại Việt Nam.',
    features: [
      'Động cơ bền bỉ, tiết kiệm nhiên liệu',
      'Chi phí bảo dưỡng thấp',
      'Khả năng chở hàng linh hoạt',
      'Cabin thoải mái, thiết kế hiện đại',
      'Hệ thống treo chắc chắn'
    ]
  },
  {
    id: "5",
    name: 'Thaco Kia K200 1.9 Tấn',
    slug: 'thaco-kia-k200-1-9-tan',
    brand: 'Kia', // Thương hiệu Kia, lắp ráp bởi Thaco
    price: 335000000,
    priceText: '335.000.000 đ',
    weightText: '1.9 Tấn', // Tải trọng chuyên chở
    weight: 1.9, // Tải trọng (tấn)
    length: 3.5, // Chiều dài lọt lòng thùng (mét)
    width: 1.6, // Chiều rộng lọt lòng thùng (mét)
    height: 1.9, // Chiều cao lọt lòng thùng (mét)
    dimensions: '3.5 x 1.6 x 1.9 m', // Kích thước lọt lòng thùng (DxRxC)
    type: 'xe-tai',
    // boxType: // Cần loại thùng cụ thể
    isNew: false,
    isHot: true,
    origin: 'Hàn Quốc/Việt Nam',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Kia/k200.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Kia/k200.jpg',
      'https://tongkhoxetai.vn/upload/images/Kia/k200-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Kia/k200-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel',
      engineCapacity: '2.0L',
      horsePower: '139 HP',
      torque: '340 Nm',
      transmission: 'Số sàn 6 cấp',
      fuelConsumption: '8L/100km',
      emission: 'Euro 4',
      warranty: '3 năm hoặc 100.000 km',
      seats: 3,
      year: 2023
    },
    description: 'Thaco Kia K200 1.9 tấn là dòng xe tải nhẹ được sản xuất và lắp ráp tại Việt Nam với sự kết hợp công nghệ của Hàn Quốc. Xe có thiết kế hiện đại, khả năng vận hành bền bỉ và tiết kiệm nhiên liệu.',
    features: [
      'Thiết kế cabin hiện đại, rộng rãi',
      'Động cơ mạnh mẽ, tiết kiệm nhiên liệu',
      'Khả năng di chuyển linh hoạt trong đô thị',
      'Chi phí bảo dưỡng thấp',
      'Giá thành cạnh tranh'
    ]
  },
  {
    id: "6",
    name: 'Dongfeng Hoàng Huy 7 Tấn',
    slug: 'dongfeng-hoang-huy-7-tan',
    brand: 'Dongfeng',
    price: 600000000,
    priceText: '600.000.000 đ',
    weightText: '7 Tấn', // Tải trọng chuyên chở
    weight: 7, // Tải trọng (tấn)
    length: 6.2, // Chiều dài lọt lòng thùng (mét)
    width: 2.2, // Chiều rộng lọt lòng thùng (mét)
    height: 2.3, // Chiều cao lọt lòng thùng (mét)
    dimensions: '6.2 x 2.2 x 2.3 m', // Kích thước lọt lòng thùng (DxRxC)
    type: 'xe-tai',
    // boxType: // Cần loại thùng cụ thể (thường là mui bạt hoặc thùng kín)
    isNew: false,
    isHot: false,
    origin: 'Trung Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Dongfeng/hoang-huy.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Dongfeng/hoang-huy.jpg',
      'https://tongkhoxetai.vn/upload/images/Dongfeng/hoang-huy-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Dongfeng/hoang-huy-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel', // Cần model động cơ cụ thể, ví dụ Cummins B180
      engineCapacity: '3.8L', // Hoặc dung tích khác tùy model
      horsePower: '160 HP', // Hoặc công suất khác
      torque: '580 Nm', // Hoặc mô-men xoắn khác
      transmission: 'Số sàn 6 cấp',
      fuelConsumption: '12L/100km',
      emission: 'Euro 4',
      warranty: '2 năm hoặc 100.000 km',
      seats: 3,
      year: 2023
    },
    description: 'Dongfeng Hoàng Huy 7 tấn là dòng xe tải trung được nhập khẩu và phân phối bởi công ty Hoàng Huy. Xe có thiết kế bền bỉ, cabin rộng rãi và khả năng chở hàng linh hoạt với tải trọng lớn.',
    features: [
      'Tải trọng lớn, phù hợp vận chuyển đường dài',
      'Động cơ mạnh mẽ, bền bỉ',
      'Cabin rộng rãi, thoải mái',
      'Hệ thống phanh ABS/EBD',
      'Giá thành cạnh tranh'
    ]
  },
  {
    id: "7",
    name: 'Hino 500 Series 16 Tấn',
    slug: 'hino-500-series-16-tan',
    brand: 'Hino',
    price: 1250000000,
    priceText: '1.250.000.000 đ',
    weightText: '16 Tấn', // Tải trọng chuyên chở
    weight: 16, // Tải trọng (tấn)
    length: 9.2, // Chiều dài lọt lòng thùng (mét) - phụ thuộc loại thùng
    width: 2.5, // Chiều rộng tổng thể (mét)
    height: 3.0, // Chiều cao tổng thể (mét) - phụ thuộc loại thùng
    dimensions: '9.2 x 2.5 x 3.0 m', // Kích thước (DxRxC) - có thể là tổng thể hoặc thùng
    type: 'xe-tai',
    // boxType: // Cần loại thùng cụ thể (mui bạt, thùng kín,...)
    isNew: true,
    isHot: false,
    origin: 'Nhật Bản',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Hino/500-series.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Hino/500-series.jpg',
      'https://tongkhoxetai.vn/upload/images/Hino/500-series-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Hino/500-series-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel', // Ví dụ: J08E-WD
      engineCapacity: '7.6L',
      horsePower: '280 HP',
      torque: '900 Nm',
      transmission: 'Số sàn 8 cấp', // Hoặc 9 cấp tùy model
      fuelConsumption: '18L/100km', // Tham khảo
      emission: 'Euro 4', // Hoặc Euro 5 tùy đời
      warranty: '3 năm hoặc 150.000 km',
      seats: 3,
      year: 2023
    },
    description: 'Hino 500 Series 16 tấn là dòng xe tải nặng đến từ Nhật Bản với ưu điểm về độ bền, công nghệ tiên tiến và hiệu suất cao. Xe được thiết kế để vận chuyển hàng hóa trọng tải lớn trên các cung đường dài.',
    features: [
      'Động cơ công suất lớn, bền bỉ',
      'Hệ thống phanh hiện đại ABS/EBD/BA',
      'Cabin rộng rãi, tiện nghi cao cấp',
      'Khung gầm cứng cáp, chịu tải tốt',
      'Hệ thống treo chắc chắn'
    ]
  },
  {
    id: "8",
    name: 'Hyundai Xcient 25 Tấn',
    slug: 'hyundai-xcient-25-tan',
    brand: 'Hyundai',
    price: 1850000000,
    priceText: '1.850.000.000 đ',
    weightText: '25 Tấn', // Tải trọng chuyên chở (cho xe tải thùng)
    weight: 25, // Tải trọng (tấn)
    length: 12.0, // Chiều dài tổng thể xe (mét)
    width: 2.5, // Chiều rộng tổng thể xe (mét)
    height: 3.2, // Chiều cao tổng thể xe (mét)
    dimensions: '12.0 x 2.5 x 3.2 m', // Kích thước tổng thể (DxRxC)
    type: 'xe-tai', // Xcient có cả phiên bản xe tải thùng và đầu kéo, cần phân biệt
    // boxType: 'thùng siêu trường siêu trọng', // Ví dụ nếu là xe tải thùng
    isNew: false,
    isHot: true,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Hyundai/xcient.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Hyundai/xcient.jpg',
      'https://tongkhoxetai.vn/upload/images/Hyundai/xcient-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Hyundai/xcient-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel', // Ví dụ: D6CC hoặc D6HB
      engineCapacity: '12.7L',
      horsePower: '520 HP', // Công suất có thể thay đổi tùy cấu hình
      torque: '2500 Nm',
      transmission: 'Số tự động 12 cấp', // Hoặc số sàn
      fuelConsumption: '26L/100km', // Tham khảo
      emission: 'Euro 5',
      warranty: '3 năm hoặc 200.000 km',
      seats: 2, // Thường là 2 chỗ cho cabin Xcient
      year: 2023
    },
    description: 'Hyundai Xcient 25 tấn là dòng xe tải hạng nặng cao cấp của Hyundai với thiết kế hiện đại, công nghệ tiên tiến và khả năng vận chuyển hàng hóa trọng tải lớn. Xe được trang bị động cơ mạnh mẽ và các tính năng an toàn hiện đại.',
    features: [
      'Động cơ công suất lớn, mạnh mẽ',
      'Cabin thiết kế hiện đại, tiện nghi cao cấp',
      'Hệ thống an toàn tiên tiến',
      'Hệ thống phanh hiện đại ABS/EBD/ESP',
      'Khả năng chịu tải cao, bền bỉ'
    ]
  },

  // ===== XE CẨU =====
  // ... (Đã comment chi tiết ở phần trả lời trước, giữ nguyên và đảm bảo đầy đủ) ...
  {
    id: "cau201",
    name: 'Soosan SCS335 3 Tấn',
    slug: 'soosan-scs335',
    brand: 'Soosan',
    price: 850000000,
    priceText: '850.000.000 đ',
    weightText: '5 Tấn', // Sức nâng của cẩu
    weight: 5, // Sức nâng (tấn)
    length: 3.5, // Chiều dài cơ sở của cẩu (mét)
    width: 1.8, // Chiều rộng cơ sở của cẩu (mét)
    height: 2.3, // Chiều cao khi thu gọn của cẩu (mét)
    dimensions: '3.5 x 1.8 x 2.3 m', // Kích thước cẩu khi thu gọn
    type: 'xe-cau',
    craneType: 'cẩu-rời', // Loại cẩu (cẩu rời hay cẩu gắn liền xe)
    isNew: true,
    isHot: false,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Cau/kanglim-5t.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Cau/kanglim-5t.jpg',
      'https://tongkhoxetai.vn/upload/images/Cau/kanglim-5t-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Cau/kanglim-5t-3.jpg',
    ],
    specifications: { // Thông số của cẩu, không phải xe nền
      warranty: '2 năm hoặc 4.000 giờ', // Bảo hành cẩu
      year: 2023 // Năm sản xuất cẩu
    },
    craneSpec: { // Thông số của cẩu Soosan
      craneModelName: 'SOOSAN SCS335', // Model cẩu
      liftingCapacityText: '10,000 kg / 2.5 m', // Sức nâng tối đa tại tầm với cụ thể
      maxLiftingMoment: '25.0 tấn.m', // Mô men nâng lớn nhất
      maxLiftingHeight: '24.5 m', // Chiều cao làm việc tối đa của cẩu
      maxWorkingRadius: '20.7 m', // Bán kính làm việc lớn nhất của cẩu
      boomType: 'Cần lục giác, 5 đoạn', // Kiểu cần cẩu và số đoạn
      boomSections: 5, // Số đoạn cần chính
      boomLength: '6.0 m ~ 20.7 m', // Chiều dài cần khi thu vào và duỗi ra tối đa
      boomExtensionSpeed: '14.75 m / 50 giây', // Tốc độ ra cần
      boomLuffingAngle: '-17° ~ 80°', // Góc nâng hạ cần
      boomLuffingSpeed: '1° ~ 80° / 20 giây', // Tốc độ nâng hạ cần
      winchRatedSpeed: '16 m/phút (ở lớp cáp thứ 4)', // Tốc độ tời định mức
      winchHookSpeed: '16 m/phút', // Tốc độ móc của tời
      winchRopeType: 'Ø 10 mm x 120 m (IWRC)', // Loại và kích thước cáp tời
      swingAngle: '360° liên tục', // Góc quay toa
      swingSpeed: '2.0 vòng/phút', // Tốc độ quay toa
      swingReductionType: 'Bánh răng trục vít, mô tơ thủy lực', // Kiểu bộ giảm tốc quay toa
      outriggersFrontExtension: '5.7 m (Mở rộng tối đa)', // Độ mở rộng tối đa của chân chống trước
      outriggersRearExtension: '4.4 m (Mở rộng tối đa, tùy chọn)', // Độ mở rộng tối đa của chân chống sau (nếu có)
      outriggersType: 'Thủy lực, chân chống hạ xuống đất', // Loại chân chống
      hydraulicOilFlow: '60 L/phút (ở 1000 vòng/phút)', // Lưu lượng dầu thủy lực
      hydraulicOperatingPressure: '210 kgf/cm²', // Áp suất làm việc của hệ thống thủy lực
      hydraulicTankCapacity: '120 L', // Dung tích thùng dầu thủy lực
      detailedLiftingCapacity: [ // Biểu đồ tải chi tiết
        "10,000 kg / 2.5 m",
        "6,100 kg / 4.4 m",
        "3,600 kg / 7.5 m",
        "2,350 kg / 10.6 m",
        "1,700 kg / 13.7 m",
        "1,200 kg / 16.8 m",
        "1,030 kg / 20.7 m"
      ],
      safetySystem: 'Van an toàn, còi báo quá tải, chỉ báo góc cần, khóa xoay', // Các thiết bị an toàn
    },
    description: 'Soosan SCS335 là cẩu tự hành 5 tấn cao cấp đến từ Hàn Quốc, được thiết kế với công nghệ tiên tiến và khả năng nâng hạ chính xác. Cẩu có thể vươn xa đến 18.7m với 6 đoạn boom, cho phép nâng hàng ở những vị trí khó tiếp cận.',
    features: [
      'Cần cẩu 6 đoạn, với tầm với xa 18.7m',
      'Khả năng nâng tải trọng lớn 5 tấn tại bán kính 3m',
      'Hệ thống xoay 360° liên tục',
      'Hệ thống chân chống thủy lực mở rộng',
      'Bộ điều khiển từ xa không dây (tùy chọn)',
      'Hệ thống an toàn chống quá tải',
      'Cấu trúc chắc chắn, độ bền cao'
    ]
  },
  {
    id: "cau202",
    name: 'Soosan SCS525 5 Tấn',
    slug: 'soosan-scs525',
    brand: 'Soosan',
    price: 880000000,
    priceText: '880.000.000 đ',
    weightText: '5 Tấn', // Sức nâng
    weight: 5,
    length: 3.6, // Kích thước cẩu
    width: 1.8,
    height: 2.4,
    dimensions: '3.6 x 1.8 x 2.4 m',
    type: 'xe-cau',
    craneType: 'cẩu-rời',
    isNew: false,
    isHot: true,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Cau/tadano-5t-tm.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Cau/tadano-5t-tm.jpg',
      'https://tongkhoxetai.vn/upload/images/Cau/tadano-5t-tm-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Cau/tadano-5t-tm-3.jpg',
    ],
    specifications: {
      warranty: '2 năm hoặc 5.000 giờ',
      year: 2023
    },
    craneSpec: { // Thông số của cẩu Soosan
      craneModelName: 'SOOSAN SCS525', // Model cẩu
      liftingCapacityText: '10,000 kg / 2.5 m', // Sức nâng tối đa tại tầm với cụ thể
      maxLiftingMoment: '25.0 tấn.m', // Mô men nâng lớn nhất
      maxLiftingHeight: '24.5 m', // Chiều cao làm việc tối đa của cẩu
      maxWorkingRadius: '20.7 m', // Bán kính làm việc lớn nhất của cẩu
      boomType: 'Cần lục giác, 5 đoạn', // Kiểu cần cẩu và số đoạn
      boomSections: 5, // Số đoạn cần chính
      boomLength: '6.0 m ~ 20.7 m', // Chiều dài cần khi thu vào và duỗi ra tối đa
      boomExtensionSpeed: '14.75 m / 50 giây', // Tốc độ ra cần
      boomLuffingAngle: '-17° ~ 80°', // Góc nâng hạ cần
      boomLuffingSpeed: '1° ~ 80° / 20 giây', // Tốc độ nâng hạ cần
      winchRatedSpeed: '16 m/phút (ở lớp cáp thứ 4)', // Tốc độ tời định mức
      winchHookSpeed: '16 m/phút', // Tốc độ móc của tời
      winchRopeType: 'Ø 10 mm x 120 m (IWRC)', // Loại và kích thước cáp tời
      swingAngle: '360° liên tục', // Góc quay toa
      swingSpeed: '2.0 vòng/phút', // Tốc độ quay toa
      swingReductionType: 'Bánh răng trục vít, mô tơ thủy lực', // Kiểu bộ giảm tốc quay toa
      outriggersFrontExtension: '5.7 m (Mở rộng tối đa)', // Độ mở rộng tối đa của chân chống trước
      outriggersRearExtension: '4.4 m (Mở rộng tối đa, tùy chọn)', // Độ mở rộng tối đa của chân chống sau (nếu có)
      outriggersType: 'Thủy lực, chân chống hạ xuống đất', // Loại chân chống
      hydraulicOilFlow: '60 L/phút (ở 1000 vòng/phút)', // Lưu lượng dầu thủy lực
      hydraulicOperatingPressure: '210 kgf/cm²', // Áp suất làm việc của hệ thống thủy lực
      hydraulicTankCapacity: '120 L', // Dung tích thùng dầu thủy lực
      detailedLiftingCapacity: [ // Biểu đồ tải chi tiết
        "10,000 kg / 2.5 m",
        "6,100 kg / 4.4 m",
        "3,600 kg / 7.5 m",
        "2,350 kg / 10.6 m",
        "1,700 kg / 13.7 m",
        "1,200 kg / 16.8 m",
        "1,030 kg / 20.7 m"
      ],
      safetySystem: 'Van an toàn, còi báo quá tải, chỉ báo góc cần, khóa xoay', // Các thiết bị an toàn
    },
    description: 'Soosan SCS525 là cần cẩu 5 tấn cao cấp với công nghệ tiên tiến từ Hàn Quốc, mang lại hiệu suất cao và độ tin cậy tuyệt đối. Với cần 5 đoạn chính và 1 đoạn phụ, cẩu có thể vươn xa đến 21m, đáp ứng nhiều nhu cầu nâng hạ khác nhau.',
    features: [
      'Cần cẩu 5 đoạn chính và 1 đoạn phụ với tầm với lên đến 21m',
      'Công nghệ AML (Automatic Moment Limiter) tự động kiểm soát tải trọng',
      'Hệ thống xoay 360° liên tục, không giới hạn',
      'Chân chống thủy lực kiểu H với độ ổn định cao',
      'Hệ thống điều khiển thủy lực tỷ lệ chính xác',
      'Bộ cảm biến an toàn toàn diện',
      'Khả năng hoạt động trong nhiều điều kiện thời tiết'
    ]
  },
  {
    id: "cau203",
    name: 'Hino FC9JLSW Gắn Cẩu Soosan SCS746L',
    slug: 'hino-fc9jlsw-gan-cau-soosan-scs746l',
    brand: ['Hino', 'Soosan'], // Thương hiệu xe nền
    price: 1350000000, // Giá xe + cẩu
    priceText: '1.350.000.000 đ',
    weightText: '6 Tấn', // Tải trọng chuyên chở của xe nền sau khi gắn cẩu
    weight: 6, // Tải trọng xe (tấn)
    length: 6.4, // Chiều dài tổng thể xe gắn cẩu (mét)
    width: 2.2, // Chiều rộng tổng thể xe gắn cẩu (mét)
    height: 3.1, // Chiều cao tổng thể xe gắn cẩu (mét)
    dimensions: '6.4 x 2.2 x 3.1 m', // Kích thước tổng thể xe + cẩu
    type: 'xe-cau',
    craneType: 'cẩu-gắn-xe', // Cẩu gắn liền trên xe tải
    isNew: true,
    isHot: true,
    origin: 'Nhật Bản', // Xe Hino và cẩu UNIC đều từ Nhật
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Cau/hino-gan-cau.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Cau/hino-gan-cau.jpg',
      'https://tongkhoxetai.vn/upload/images/Cau/hino-gan-cau-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Cau/hino-gan-cau-3.jpg',
    ],
    specifications: { // Thông số xe nền Hino FC9JLSW
      engineType: 'Diesel J05E-UG',
      engineCapacity: '5.1L',
      horsePower: '180 HP',
      torque: '520 Nm',
      transmission: 'Số sàn 6 cấp',
      fuelConsumption: '14L/100km',
      emission: 'Euro 4',
      warranty: '3 năm hoặc 100.000 km', // Bảo hành cho xe nền
      seats: 3,
      year: 2023
    },
    craneSpec: { // Thông số của cẩu Soosan
      craneModelName: 'SOOSAN SCS746L', // Model cẩu
      liftingCapacityText: '10,000 kg / 2.5 m', // Sức nâng tối đa tại tầm với cụ thể
      maxLiftingMoment: '25.0 tấn.m', // Mô men nâng lớn nhất
      maxLiftingHeight: '24.5 m', // Chiều cao làm việc tối đa của cẩu
      maxWorkingRadius: '20.7 m', // Bán kính làm việc lớn nhất của cẩu
      boomType: 'Cần lục giác, 5 đoạn', // Kiểu cần cẩu và số đoạn
      boomSections: 5, // Số đoạn cần chính
      boomLength: '6.0 m ~ 20.7 m', // Chiều dài cần khi thu vào và duỗi ra tối đa
      boomExtensionSpeed: '14.75 m / 50 giây', // Tốc độ ra cần
      boomLuffingAngle: '-17° ~ 80°', // Góc nâng hạ cần
      boomLuffingSpeed: '1° ~ 80° / 20 giây', // Tốc độ nâng hạ cần
      winchRatedSpeed: '16 m/phút (ở lớp cáp thứ 4)', // Tốc độ tời định mức
      winchHookSpeed: '16 m/phút', // Tốc độ móc của tời
      winchRopeType: 'Ø 10 mm x 120 m (IWRC)', // Loại và kích thước cáp tời
      swingAngle: '360° liên tục', // Góc quay toa
      swingSpeed: '2.0 vòng/phút', // Tốc độ quay toa
      swingReductionType: 'Bánh răng trục vít, mô tơ thủy lực', // Kiểu bộ giảm tốc quay toa
      outriggersFrontExtension: '5.7 m (Mở rộng tối đa)', // Độ mở rộng tối đa của chân chống trước
      outriggersRearExtension: '4.4 m (Mở rộng tối đa, tùy chọn)', // Độ mở rộng tối đa của chân chống sau (nếu có)
      outriggersType: 'Thủy lực, chân chống hạ xuống đất', // Loại chân chống
      hydraulicOilFlow: '60 L/phút (ở 1000 vòng/phút)', // Lưu lượng dầu thủy lực
      hydraulicOperatingPressure: '210 kgf/cm²', // Áp suất làm việc của hệ thống thủy lực
      hydraulicTankCapacity: '120 L', // Dung tích thùng dầu thủy lực
      detailedLiftingCapacity: [ // Biểu đồ tải chi tiết
        "10,000 kg / 2.5 m",
        "6,100 kg / 4.4 m",
        "3,600 kg / 7.5 m",
        "2,350 kg / 10.6 m",
        "1,700 kg / 13.7 m",
        "1,200 kg / 16.8 m",
        "1,030 kg / 20.7 m"
      ],
      safetySystem: 'Van an toàn, còi báo quá tải, chỉ báo góc cần, khóa xoay', // Các thiết bị an toàn
    },
    description: 'Hino FC9JLSW Gắn Cẩu SOOSAN SCS746L là giải pháp vận chuyển và nâng hạ hàng hóa hiệu quả. Kết hợp giữa xe tải chất lượng cao của Hino và cẩu SOOSAN nổi tiếng của Hàn Quốc, xe mang lại khả năng vận chuyển và bốc dỡ hàng hóa nặng mà không cần thiết bị hỗ trợ bên ngoài.',
    features: [
      'Kết hợp giữa xe tải và cần cẩu trong cùng một phương tiện',
      'Cẩu SOOSAN chính hãng Hàn Quốc, nâng tải 3 tấn',
      'Thùng xe phía sau cẩu rộng rãi',
      'Hệ thống ổn định khi cẩu hoạt động',
      'Động cơ Hino mạnh mẽ, bền bỉ',
      'Cabin tiện nghi với đầy đủ trang bị',
      'Hệ thống phanh ABS, túi khí an toàn'
    ]
  },
  {
    id: "cau204", // ID này bị trùng, cần sửa lại nếu là sản phẩm khác
    name: 'Soosan SCS1015LS 12 Tấn', // Cần tên model cẩu cụ thể hoặc xe nền + cẩu
    slug: 'soosan-scs1015ls',
    brand: 'Soosan',
    price: 1800000000,
    priceText: '1.800.000.000 đ',
    weightText: '5 Tấn', // Sức nâng của cẩu
    weight: 5,
    length: 8.2, // Kích thước xe nền (ước chừng)
    width: 2.3,
    height: 3.1,
    dimensions: '8.2 x 2.3 x 3.1 m',
    type: 'xe-cau',
    craneType: 'cẩu-gắn-xe', // Giả định
    isNew: true,
    isHot: true,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Cau/tadano-5t.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Cau/tadano-5t.jpg',
      'https://tongkhoxetai.vn/upload/images/Cau/tadano-5t-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Cau/tadano-5t-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel', // Thông số xe nền
      engineCapacity: '5.2L',
      horsePower: '180 HP',
      torque: '750 Nm',
      transmission: 'Số sàn 6 cấp',
      fuelConsumption: '15L/100km',
      emission: 'Euro 4',
      warranty: '2 năm hoặc 100.000 km',
      seats: 2,
      year: 2023
    },
    craneSpec: { // Thông số của cẩu Soosan
      craneModelName: 'SOOSAN SCS1015LS', // Model cẩu
      liftingCapacityText: '10,000 kg / 2.5 m', // Sức nâng tối đa tại tầm với cụ thể
      maxLiftingMoment: '25.0 tấn.m', // Mô men nâng lớn nhất
      maxLiftingHeight: '24.5 m', // Chiều cao làm việc tối đa của cẩu
      maxWorkingRadius: '20.7 m', // Bán kính làm việc lớn nhất của cẩu
      boomType: 'Cần lục giác, 5 đoạn', // Kiểu cần cẩu và số đoạn
      boomSections: 5, // Số đoạn cần chính
      boomLength: '6.0 m ~ 20.7 m', // Chiều dài cần khi thu vào và duỗi ra tối đa
      boomExtensionSpeed: '14.75 m / 50 giây', // Tốc độ ra cần
      boomLuffingAngle: '-17° ~ 80°', // Góc nâng hạ cần
      boomLuffingSpeed: '1° ~ 80° / 20 giây', // Tốc độ nâng hạ cần
      winchRatedSpeed: '16 m/phút (ở lớp cáp thứ 4)', // Tốc độ tời định mức
      winchHookSpeed: '16 m/phút', // Tốc độ móc của tời
      winchRopeType: 'Ø 10 mm x 120 m (IWRC)', // Loại và kích thước cáp tời
      swingAngle: '360° liên tục', // Góc quay toa
      swingSpeed: '2.0 vòng/phút', // Tốc độ quay toa
      swingReductionType: 'Bánh răng trục vít, mô tơ thủy lực', // Kiểu bộ giảm tốc quay toa
      outriggersFrontExtension: '5.7 m (Mở rộng tối đa)', // Độ mở rộng tối đa của chân chống trước
      outriggersRearExtension: '4.4 m (Mở rộng tối đa, tùy chọn)', // Độ mở rộng tối đa của chân chống sau (nếu có)
      outriggersType: 'Thủy lực, chân chống hạ xuống đất', // Loại chân chống
      hydraulicOilFlow: '60 L/phút (ở 1000 vòng/phút)', // Lưu lượng dầu thủy lực
      hydraulicOperatingPressure: '210 kgf/cm²', // Áp suất làm việc của hệ thống thủy lực
      hydraulicTankCapacity: '120 L', // Dung tích thùng dầu thủy lực
      detailedLiftingCapacity: [ // Biểu đồ tải chi tiết
        "10,000 kg / 2.5 m",
        "6,100 kg / 4.4 m",
        "3,600 kg / 7.5 m",
        "2,350 kg / 10.6 m",
        "1,700 kg / 13.7 m",
        "1,200 kg / 16.8 m",
        "1,030 kg / 20.7 m"
      ],
      safetySystem: 'Van an toàn, còi báo quá tải, chỉ báo góc cần, khóa xoay', // Các thiết bị an toàn
    },
    description: 'Soosan 12 tấn là dòng xe cẩu chuyên dụng đến từ Hàn Quốc, được thiết kế để nâng và di chuyển các hàng hóa nặng. Xe được trang bị cần cẩu có thể nâng tải trọng lên đến 5 tấn và với tầm với xa.',
    features: [
      'Cần cẩu chắc chắn, nâng tải trọng lớn',
      'Hệ thống thủy lực mạnh mẽ',
      'Điều khiển chính xác, an toàn',
      'Cabin rộng rãi, tầm nhìn tốt',
      'Khả năng vận hành linh hoạt'
    ]
  },
  {
    id: "cau205", // ID này bị trùng, cần sửa lại nếu là sản phẩm khác
    name: 'Soosan SCS1516S 15 Tấn', // Cần tên model cẩu cụ thể hoặc xe nền + cẩu
    slug: 'soosan-scs1516s',
    brand: 'SOOSAN',
    price: 1200000000,
    priceText: '1.200.000.000 đ',
    weightText: '3 Tấn', // Sức nâng cẩu
    weight: 3,
    length: 6.8, // Kích thước xe nền (ước chừng)
    width: 2.2,
    height: 2.8,
    dimensions: '6.8 x 2.2 x 2.8 m',
    type: 'xe-cau',
    craneType: 'cẩu-gắn-xe', // Giả định
    isNew: false,
    isHot: false,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Cau/unic-3t.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Cau/unic-3t.jpg',
      'https://tongkhoxetai.vn/upload/images/Cau/unic-3t-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Cau/unic-3t-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel', // Thông số xe nền
      engineCapacity: '4.0L',
      horsePower: '150 HP',
      torque: '580 Nm',
      transmission: 'Số sàn 5 cấp',
      fuelConsumption: '12L/100km',
      emission: 'Euro 4',
      warranty: '2 năm hoặc 100.000 km',
      seats: 2,
      year: 2023
    },
     craneSpec: { // Thông số của cẩu Soosan
      craneModelName: 'SOOSAN SCS1516S', // Model cẩu
      liftingCapacityText: '10,000 kg / 2.5 m', // Sức nâng tối đa tại tầm với cụ thể
      maxLiftingMoment: '25.0 tấn.m', // Mô men nâng lớn nhất
      maxLiftingHeight: '24.5 m', // Chiều cao làm việc tối đa của cẩu
      maxWorkingRadius: '20.7 m', // Bán kính làm việc lớn nhất của cẩu
      boomType: 'Cần lục giác, 5 đoạn', // Kiểu cần cẩu và số đoạn
      boomSections: 5, // Số đoạn cần chính
      boomLength: '6.0 m ~ 20.7 m', // Chiều dài cần khi thu vào và duỗi ra tối đa
      boomExtensionSpeed: '14.75 m / 50 giây', // Tốc độ ra cần
      boomLuffingAngle: '-17° ~ 80°', // Góc nâng hạ cần
      boomLuffingSpeed: '1° ~ 80° / 20 giây', // Tốc độ nâng hạ cần
      winchRatedSpeed: '16 m/phút (ở lớp cáp thứ 4)', // Tốc độ tời định mức
      winchHookSpeed: '16 m/phút', // Tốc độ móc của tời
      winchRopeType: 'Ø 10 mm x 120 m (IWRC)', // Loại và kích thước cáp tời
      swingAngle: '360° liên tục', // Góc quay toa
      swingSpeed: '2.0 vòng/phút', // Tốc độ quay toa
      swingReductionType: 'Bánh răng trục vít, mô tơ thủy lực', // Kiểu bộ giảm tốc quay toa
      outriggersFrontExtension: '5.7 m (Mở rộng tối đa)', // Độ mở rộng tối đa của chân chống trước
      outriggersRearExtension: '4.4 m (Mở rộng tối đa, tùy chọn)', // Độ mở rộng tối đa của chân chống sau (nếu có)
      outriggersType: 'Thủy lực, chân chống hạ xuống đất', // Loại chân chống
      hydraulicOilFlow: '60 L/phút (ở 1000 vòng/phút)', // Lưu lượng dầu thủy lực
      hydraulicOperatingPressure: '210 kgf/cm²', // Áp suất làm việc của hệ thống thủy lực
      hydraulicTankCapacity: '120 L', // Dung tích thùng dầu thủy lực
      detailedLiftingCapacity: [ // Biểu đồ tải chi tiết
        "10,000 kg / 2.5 m",
        "6,100 kg / 4.4 m",
        "3,600 kg / 7.5 m",
        "2,350 kg / 10.6 m",
        "1,700 kg / 13.7 m",
        "1,200 kg / 16.8 m",
        "1,030 kg / 20.7 m"
      ],
      safetySystem: 'Van an toàn, còi báo quá tải, chỉ báo góc cần, khóa xoay', // Các thiết bị an toàn
    },
    description: 'SOOSAN SCS1516S 15 tấn là dòng xe cẩu nhỏ gọn, linh hoạt và dễ dàng di chuyển trong các không gian hẹp. Xe được trang bị cần cẩu có thể nâng tải trọng lên đến 3 tấn, phù hợp với các công trình xây dựng vừa và nhỏ.',
    features: [
      'Kích thước nhỏ gọn, linh hoạt',
      'Hệ thống thủy lực mạnh mẽ',
      'Dễ dàng vận hành',
      'Chi phí bảo dưỡng thấp',
      'Độ bền cao'
    ]
  },
  {
    id: "cau206", // ID này đã được sử dụng cho xe cẩu Soosan ở trên. Cần đảm bảo ID là duy nhất. Nếu đây là sản phẩm khác, hãy đổi ID.
    name: 'Xe Tải Gắn Cẩu Soosan 10 Tấn', // Giữ nguyên nếu đây là sản phẩm đã có
    slug: 'xe-tai-gan-cau-soosan-10-tan',
    brand: 'Hyundai',
    price: 2500000000,
    priceText: '2.500.000.000 đ',
    weightText: '10 Tấn (Cẩu)', // Sức nâng của cẩu
    weight: 10, // Sức nâng cẩu (tấn)
    length: 9.5, // Chiều dài tổng thể của xe gắn cẩu
    width: 2.5, // Chiều rộng tổng thể của xe gắn cẩu
    height: 3.5, // Chiều cao tổng thể của xe gắn cẩu
    dimensions: '9.5 x 2.5 x 3.5 m',
    type: 'xe-cau',
    craneType: 'cẩu-gắn-xe',
    isNew: true,
    isHot: true,
    origin: 'Hàn Quốc (Cẩu Soosan)',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Cau/soosan-10t.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Cau/soosan-10t.jpg',
      'https://tongkhoxetai.vn/upload/images/Cau/soosan-10t-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Cau/soosan-10t-3.jpg',
    ],
    specifications: { // Thông số của xe nền
      engineType: 'Diesel D6CC',
      engineCapacity: '12.7L',
      horsePower: '380 HP',
      warranty: '2 năm hoặc 100.000 km (xe nền)',
      seats: 2,
      year: 2024
    },
    craneSpec: { // Thông số của cẩu Soosan
      craneModelName: 'SOOSAN SCS1015LS', // Model cẩu
      liftingCapacityText: '10,000 kg / 2.5 m', // Sức nâng tối đa tại tầm với cụ thể
      maxLiftingMoment: '25.0 tấn.m', // Mô men nâng lớn nhất
      maxLiftingHeight: '24.5 m', // Chiều cao làm việc tối đa của cẩu
      maxWorkingRadius: '20.7 m', // Bán kính làm việc lớn nhất của cẩu
      boomType: 'Cần lục giác, 5 đoạn', // Kiểu cần cẩu và số đoạn
      boomSections: 5, // Số đoạn cần chính
      boomLength: '6.0 m ~ 20.7 m', // Chiều dài cần khi thu vào và duỗi ra tối đa
      boomExtensionSpeed: '14.75 m / 50 giây', // Tốc độ ra cần
      boomLuffingAngle: '-17° ~ 80°', // Góc nâng hạ cần
      boomLuffingSpeed: '1° ~ 80° / 20 giây', // Tốc độ nâng hạ cần
      winchRatedSpeed: '16 m/phút (ở lớp cáp thứ 4)', // Tốc độ tời định mức
      winchHookSpeed: '16 m/phút', // Tốc độ móc của tời
      winchRopeType: 'Ø 10 mm x 120 m (IWRC)', // Loại và kích thước cáp tời
      swingAngle: '360° liên tục', // Góc quay toa
      swingSpeed: '2.0 vòng/phút', // Tốc độ quay toa
      swingReductionType: 'Bánh răng trục vít, mô tơ thủy lực', // Kiểu bộ giảm tốc quay toa
      outriggersFrontExtension: '5.7 m (Mở rộng tối đa)', // Độ mở rộng tối đa của chân chống trước
      outriggersRearExtension: '4.4 m (Mở rộng tối đa, tùy chọn)', // Độ mở rộng tối đa của chân chống sau (nếu có)
      outriggersType: 'Thủy lực, chân chống hạ xuống đất', // Loại chân chống
      hydraulicOilFlow: '60 L/phút (ở 1000 vòng/phút)', // Lưu lượng dầu thủy lực
      hydraulicOperatingPressure: '210 kgf/cm²', // Áp suất làm việc của hệ thống thủy lực
      hydraulicTankCapacity: '120 L', // Dung tích thùng dầu thủy lực
      detailedLiftingCapacity: [ // Biểu đồ tải chi tiết
        "10,000 kg / 2.5 m",
        "6,100 kg / 4.4 m",
        "3,600 kg / 7.5 m",
        "2,350 kg / 10.6 m",
        "1,700 kg / 13.7 m",
        "1,200 kg / 16.8 m",
        "1,030 kg / 20.7 m"
      ],
      safetySystem: 'Van an toàn, còi báo quá tải, chỉ báo góc cần, khóa xoay', // Các thiết bị an toàn
    },
    description: 'Xe tải Hyundai gắn cẩu Soosan SCS1015LS 10 tấn là giải pháp nâng hạ và vận chuyển hàng hóa nặng hiệu quả. Cẩu Soosan với sức nâng vượt trội và tầm với xa, kết hợp với xe nền Hyundai mạnh mẽ, bền bỉ.',
    features: [
      'Cẩu Soosan SCS1015LS sức nâng 10 tấn',
      'Bán kính làm việc tối đa 20.7m',
      'Chiều cao nâng tối đa 24.5m',
      'Hệ thống chân chống thủy lực vững chắc',
      'Vận hành êm ái, chính xác',
      'Tích hợp các tính năng an toàn tiên tiến'
    ]
  },

  // ===== MOOC =====
  {
    id: "301",
    name: 'DOOSUNG 3 Trục Ben',
    slug: 'doosung-3-truc-ben',
    brand: 'DOOSUNG',
    price: 650000000,
    priceText: '650.000.000 đ',
    weightText: '30 Tấn', // Tải trọng hàng hóa cho phép chở của mooc
    weight: 30, // Tải trọng (tấn)
    length: 9.5, // Chiều dài tổng thể của mooc (mét)
    width: 2.3, // Chiều rộng của thùng ben (mét)
    height: 1.5, // Chiều cao của thùng ben (mét)
    dimensions: '9.5 x 2.3 x 1.5 m', // Kích thước thùng ben (DxRxC)
    type: 'mooc',
    trailerType: 'ben', // Loại mooc (ben, sàn, xương, xi-téc...)
    isNew: true,
    isHot: true,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/doosung-ben.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-ben.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-ben-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-ben-3.jpg',
    ],
    specifications: { // Thông số chung của mooc
      warranty: '1 năm', // Thời gian bảo hành
      year: 2023, // Năm sản xuất
      // Các thông số khác có thể thêm vào đây nếu cần, ví dụ: tự trọng mooc
    },
    trailerSpec: { // Thông số kỹ thuật chi tiết của mooc
      axleCount: 3, // Số lượng trục
      axleType: 'Trục JOST Đức', // Thương hiệu/loại trục
      axleWeight: 13, // Tải trọng thiết kế cho mỗi trục (tấn)
      kingpinLoad: 17, // Tải trọng tác động lên chốt kéo của đầu kéo (tấn)
      suspensionType: 'Nhíp lá phẳng/bầu hơi', // Loại hệ thống treo (nhíp hoặc bầu hơi)
      brakeSystem: 'Hệ thống phanh khí nén, ABS WABCO', // Hệ thống phanh
      floorThickness: '5mm', // Độ dày của sàn thùng ben
      sideHeight: 1.2, // Chiều cao của thành thùng ben (mét)
      rampType: 'Không có', // Loại cầu dẫn lên xuống (nếu có)
      hydraulicSystem: 'Hệ thống ben thủy lực HYVA/DOOSUNG', // Hệ thống nâng hạ ben
      liftingAngle: '45-50°', // Góc nâng tối đa của thùng ben (độ)
      dumpingTime: '30-45 giây', // Thời gian để ben nâng và hạ hết hành trình
      // totalLength: '9.5m', // Chiều dài tổng thể của mooc (đã có ở trên)
      wheelbase: '1310 + 1310 mm', // Khoảng cách giữa các trục (milimét)
      loadingHeight: '1.5m (ước tính)', // Chiều cao từ mặt đất đến sàn thùng khi chưa nâng ben (mét)
      turningRadius: 'Phụ thuộc đầu kéo', // Bán kính quay vòng của tổ hợp xe
      containerLock: 'Không có', // Khóa container (nếu là mooc chở cont)
      specialFeatures: ['Thùng ben chữ U hoặc vuông', 'Cửa hậu mở tự động'], // Các tính năng đặc biệt khác
    },
    description: 'DOOSUNG 3 Trục Ben là sơ mi rơ mooc ben chất lượng cao đến từ Hàn Quốc, được thiết kế để vận chuyển và đổ các loại vật liệu rời như cát, đá, đất. Với hệ thống thủy lực mạnh mẽ và cấu trúc chắc chắn, mooc có khả năng nâng và đổ hàng một cách nhanh chóng và an toàn.',
    features: [
      'Hệ thống ben thủy lực mạnh mẽ, góc nâng lên đến 50°',
      'Kết cấu thùng bán vòng tăng khả năng đổ hàng',
      'Sàn thép dày 5mm chống mài mòn cao',
      'Hệ thống 3 trục chắc chắn, tải trọng cao',
      'Khung gầm được làm từ thép Q345B',
      'Hệ thống treo bầu hơi/nhíp lá phẳng tùy chọn',
      'Cửa sau mở tự động khi ben nâng'
    ]
  },
  {
    id: "302",
    name: 'CIMC 3 Trục Sàn',
    slug: 'cimc-3-truc-san',
    brand: 'CIMC',
    price: 420000000,
    priceText: '420.000.000 đ',
    weightText: '34 Tấn', // Tải trọng hàng hóa tối đa
    weight: 34, // Tải trọng (tấn)
    length: 12.4, // Chiều dài mặt sàn sử dụng của mooc (mét)
    width: 2.5, // Chiều rộng của mooc (mét)
    height: 1.6, // Chiều cao từ mặt đất đến mặt sàn của mooc (mét)
    dimensions: '12.4 x 2.5 x 1.6 m', // Kích thước tổng thể của mooc (DxRxC)
    type: 'mooc',
    trailerType: 'sàn', // Mooc sàn phẳng
    isNew: true,
    isHot: false,
    origin: 'Trung Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/cimc-san.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-san.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-san-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-san-3.jpg',
    ],
    specifications: {
      warranty: '1 năm',
      year: 2023,
    },
    trailerSpec: {
      axleCount: 3,
      axleType: 'Fuwa/BPW', // Thương hiệu trục
      axleWeight: 14, // Tải trọng mỗi trục (tấn)
      kingpinLoad: 20, // Tải trọng lên chốt kéo (tấn)
      suspensionType: 'Nhíp lá phẳng',
      brakeSystem: 'Hệ thống phanh khí nén, ABS',
      floorType: 'Thép tấm', // Vật liệu sàn
      floorThickness: '4mm', // Độ dày sàn
      sideHeight: 0.6, // Chiều cao thành lửng (nếu có, mét)
      // totalLength: '12.4m', // Đã có ở trên
    },
    description: 'CIMC 3 Trục Sàn là sơ mi rơ mooc sàn đa năng, phù hợp để vận chuyển nhiều loại hàng hóa khác nhau như máy móc, thiết bị, container, vật liệu xây dựng. Với cấu trúc khung gầm chắc chắn và sàn thép dày, mooc có khả năng chịu tải trọng lớn lên đến 34 tấn.',
    features: [
      'Khung gầm bằng thép hợp kim cường độ cao',
      'Sàn thép dày 4mm chịu lực tốt',
      'Hệ thống 3 trục chất lượng cao',
      'Thành thấp 0.6m có thể tháo rời',
      'Chân chống cơ khí hoặc thủy lực',
      'Hệ thống điện LED đầy đủ',
      'Có lốp dự phòng và hộp đựng dụng cụ'
    ]
  },
  {
    id: "303",
    name: 'DOOSUNG 3 Trục Sàn Rút',
    slug: 'doosung-3-truc-san-rut',
    brand: 'DOOSUNG',
    price: 520000000,
    priceText: '520.000.000 đ',
    weightText: '32 Tấn', // Tải trọng hàng hóa
    weight: 32,
    length: 13.5, // Chiều dài khi chưa rút (mét)
    width: 2.5, // Chiều rộng mooc
    height: 1.5, // Chiều cao sàn mooc
    dimensions: '13.5 x 2.5 x 1.5 m (có thể kéo dài đến 18m)', // Kích thước khi chưa rút và khi rút tối đa
    type: 'mooc',
    trailerType: 'sàn-rút', // Mooc sàn có khả năng kéo dài
    isNew: false,
    isHot: true,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/doosung-san-rut.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-san-rut.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-san-rut-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-san-rut-3.jpg',
    ],
    specifications: {
      warranty: '1 năm',
      year: 2023,
    },
    trailerSpec: {
      axleCount: 3,
      axleType: 'JOST Đức',
      axleWeight: 13, // Tải trọng mỗi trục
      kingpinLoad: 19, // Tải trọng chốt kéo
      suspensionType: 'Bầu hơi', // Hệ thống treo bầu hơi
      brakeSystem: 'Hệ thống phanh khí nén, ABS WABCO',
      floorType: 'Thép tấm+Gỗ', // Vật liệu sàn kết hợp
      floorThickness: '3mm+28mm', // Độ dày sàn (thép + gỗ)
      sideHeight: 0.4, // Chiều cao thành lửng (mét)
      extensionLength: 4.5 // Chiều dài có thể rút thêm (mét)
    },
    description: 'DOOSUNG 3 Trục Sàn Rút là sơ mi rơ mooc sàn cao cấp với khả năng kéo dài đặc biệt, lý tưởng để vận chuyển các hàng hóa siêu trường, siêu trọng như cột điện, dầm cầu, thiết bị công nghiệp lớn. Mooc có thể mở rộng chiều dài từ 13.5m lên đến 18m, mang lại sự linh hoạt tối đa.',
    features: [
      'Khả năng kéo dài từ 13.5m đến 18m',
      'Hệ thống rút/mở khóa đơn giản, an toàn',
      'Khung gầm thép cường lực Q345B',
      'Hệ thống 3 trục JOST chất lượng cao',
      'Sàn thép phủ gỗ chống trượt',
      'Hệ thống treo bầu hơi êm ái',
      'Có móc buộc hàng hai bên thành'
    ]
  },
  {
    id: "304",
    name: 'DOOSUNG Chuyên Chở Container',
    slug: 'doosung-chuyen-cho-container',
    brand: 'DOOSUNG',
    price: 350000000,
    priceText: '350.000.000 đ',
    weightText: '33 Tấn', // Tổng tải trọng cho phép (bao gồm cả container và hàng hóa)
    weight: 33,
    length: 12.4, // Chiều dài mooc (phù hợp container 40ft)
    width: 2.5, // Chiều rộng mooc
    height: 1.5, // Chiều cao mặt sàn (chỗ đặt container) so với mặt đất
    dimensions: '12.4 x 2.5 x 1.5 m',
    type: 'mooc',
    trailerType: 'lùn', // Mooc lùn (hoặc mooc xương) chuyên chở container
    isNew: false,
    isHot: false,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/doosung-container.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-container.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-container-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-container-3.jpg',
    ],
    specifications: {
      warranty: '1 năm',
      year: 2023,
    },
    trailerSpec: {
      axleCount: 3,
      axleType: 'JOST Đức',
      axleWeight: 13, // Tải trọng mỗi trục
      kingpinLoad: 20, // Tải trọng chốt kéo
      suspensionType: 'Nhíp lá phẳng',
      brakeSystem: 'Hệ thống phanh khí nén, ABS',
      floorType: 'Khung thép', // Mooc chở container thường là khung xương, không có sàn kín
      containerLock: '8-12 khóa gù', // Số lượng khóa gù để cố định container
      // specialFeatures: ['Chở được container 20ft, 40ft, 45ft (tùy thiết kế)']
    },
    description: 'DOOSUNG Chuyên Chở Container (Mooc Lùn) là sơ mi rơ mooc chuyên dụng để vận chuyển container 20ft, 40ft và 45ft. Được thiết kế với khung gầm thấp, mooc mang lại sự ổn định cao khi vận chuyển container và dễ dàng di chuyển trong các cảng, nhà máy.',
    features: [
      'Thiết kế khóa container 20ft, 40ft, 45ft',
      'Khung gầm thép hợp kim cường lực cao',
      'Hệ thống 3 trục JOST chất lượng cao',
      'Chiều cao khung gầm thấp tăng tính ổn định',
      'Hệ thống treo nhíp lá phẳng bền bỉ',
      'Khóa container tự động an toàn',
      'Trọng lượng bản thân thấp, tăng khả năng chở hàng'
    ]
  },
  {
    id: "305",
    name: 'DOOSUNG Cổ Cò',
    slug: 'doosung-co-co',
    brand: 'DOOSUNG',
    price: 450000000,
    priceText: '450.000.000 đ',
    weightText: '32 Tấn', // Tải trọng hàng hóa
    weight: 32,
    length: 13.5, // Chiều dài sàn sử dụng của mooc
    width: 2.5, // Chiều rộng mooc
    height: 2.8, // Chiều cao tổng thể của mooc (tính cả phần cổ cò)
    dimensions: '13.5 x 2.5 x 2.8 m',
    type: 'mooc',
    trailerType: 'cổ-cò', // Mooc có thiết kế cổ ngỗng
    isNew: true,
    isHot: false,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/doosung-co-co.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-co-co.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-co-co-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-co-co-3.jpg',
    ],
    specifications: {
      warranty: '1 năm',
      year: 2023,
    },
    trailerSpec: {
      axleCount: 3,
      axleType: 'JOST Đức',
      axleWeight: 13, // Tải trọng mỗi trục
      kingpinLoad: 19, // Tải trọng chốt kéo
      suspensionType: 'Bầu hơi', // Thường dùng bầu hơi cho mooc cổ cò
      brakeSystem: 'Hệ thống phanh khí nén, ABS',
      floorType: 'Thép tấm + Gỗ', // Vật liệu sàn
      floorThickness: '3mm+28mm', // Độ dày sàn
      sideHeight: 1.2, // Chiều cao thành (nếu có, mét)
      // loadingHeight: 'Khoảng 0.9m - 1.2m ở phần sàn thấp', // Chiều cao sàn làm việc
    },
    description: 'DOOSUNG Cổ Cò là sơ mi rơ mooc với thiết kế cổ cong đặc biệt (còn gọi là cổ ngỗng), cho phép sàn xe phẳng từ đầu đến cuối. Thiết kế này đặc biệt thích hợp cho việc vận chuyển thiết bị xây dựng, máy móc công nghiệp và hàng hóa có chiều cao lớn.',
    features: [
      'Thiết kế cổ cong (cổ ngỗng) cho phép sàn xe phẳng',
      'Nâng chiều cao thùng chở hàng', // Hoặc cho phép chở hàng cao hơn do sàn thấp
      'Khung gầm thép cường lực Q345B',
      'Sàn thép phủ gỗ chống trượt',
      'Hệ thống 3 trục JOST chất lượng cao',
      'Hệ thống treo bầu hơi êm ái',
      'Có móc buộc hàng hai bên thành'
    ]
  },
  {
    id: "306",
    name: 'DOOSUNG Xương',
    slug: 'doosung-xuong',
    brand: 'DOOSUNG',
    price: 400000000,
    priceText: '400.000.000 đ',
    weightText: '34 Tấn', // Tổng tải trọng cho phép (bao gồm tự trọng mooc và hàng hóa)
    weight: 34,
    length: 12.4, // Chiều dài mooc
    width: 2.5, // Chiều rộng mooc
    height: 2.0, // Chiều cao từ mặt đất đến điểm cao nhất của khung xương
    dimensions: '12.4 x 2.5 x 2.0 m',
    type: 'mooc',
    trailerType: 'xương', // Mooc khung xương
    isNew: false,
    isHot: false,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/doosung-xuong.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-xuong.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-xuong-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-xuong-3.jpg',
    ],
    specifications: {
      warranty: '1 năm',
      year: 2023,
    },
    trailerSpec: {
      axleCount: 3,
      axleType: 'JOST Đức',
      axleWeight: 13, // Tải trọng mỗi trục
      kingpinLoad: 21, // Tải trọng chốt kéo
      suspensionType: 'Nhíp lá phẳng',
      brakeSystem: 'Hệ thống phanh khí nén, ABS',
      floorType: 'Khung dạng xương', // Không có sàn đầy đủ
      containerLock: 'Có thể trang bị khóa gù container', // Tùy chọn
    },
    description: 'DOOSUNG Xương là sơ mi rơ mooc với cấu trúc khung dạng xương, không có sàn đầy đủ. Thiết kế này giúp giảm trọng lượng bản thân của mooc, tăng khả năng chở hàng, đặc biệt phù hợp để vận chuyển ống cống, bồn tròn, thiết bị dạng trụ và các hàng hóa có thể gác lên khung xương.',
    features: [
      'Cấu trúc khung dạng xương giảm trọng lượng',
      'Khung thép cường lực Q345B',
      'Hệ thống 3 trục JOST chất lượng cao',
      'Chuyên dụng cho vận chuyển ống, bồn, thiết bị dạng trụ',
      'Hệ thống móc buộc hàng dọc theo khung xương',
      'Trọng lượng bản thân nhẹ, tăng khả năng chở hàng',
      'Chi phí vận hành thấp'
    ]
  },
  {
    id: "307",
    name: 'CIMC Lửng',
    slug: 'cimc-lung',
    brand: 'CIMC',
    price: 380000000,
    priceText: '380.000.000 đ',
    weightText: '34 Tấn', // Tải trọng hàng hóa
    weight: 34,
    length: 12.4, // Chiều dài sàn mooc
    width: 2.5, // Chiều rộng mooc
    height: 0.8, // Chiều cao tổng thể của mooc (bao gồm cả thành lửng)
    dimensions: '12.4 x 2.5 x 0.8 m', // Kích thước sàn và thành lửng
    type: 'mooc',
    trailerType: 'lửng', // Mooc có thành lửng
    isNew: false,
    isHot: false,
    origin: 'Trung Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/cimc-lung.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-lung.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-lung-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-lung-3.jpg',
    ],
    specifications: {
      warranty: '1 năm',
      year: 2023,
    },
    trailerSpec: {
      axleCount: 3,
      axleType: 'Fuwa',
      axleWeight: 13, // Tải trọng mỗi trục
      kingpinLoad: 21, // Tải trọng chốt kéo
      suspensionType: 'Nhíp lá phẳng',
      brakeSystem: 'Hệ thống phanh khí nén, ABS',
      floorType: 'Thép tấm', // Vật liệu sàn
      floorThickness: '4mm', // Độ dày sàn
      sideHeight: 0.3, // Chiều cao của thành lửng (mét)
    },
    description: 'CIMC Lửng là sơ mi rơ mooc với thiết kế thành thấp, lý tưởng để vận chuyển các loại hàng hóa lớn, vượt quá kích thước thành xe. Mooc có thể chở được nhiều loại hàng hóa như máy móc, thiết bị công nghiệp, vật liệu xây dựng dài, và tạo điều kiện thuận lợi cho việc bốc xếp hàng từ nhiều phía.',
    features: [
      'Thành lửng thấp 0.3m giúp dễ dàng bốc xếp hàng',
      'Sàn thép dày 4mm chịu lực tốt',
      'Khung gầm thép cường lực',
      'Hệ thống 3 trục Fuwa chất lượng cao',
      'Khóa chốt thành tiện lợi, dễ tháo lắp',
      'Trọng lượng bản thân nhẹ',
      'Có móc buộc hàng hai bên thành'
    ]
  },
  {
    id: "308",
    name: 'CIMC Rào',
    slug: 'cimc-rao',
    brand: 'CIMC',
    price: 410000000,
    priceText: '410.000.000 đ',
    weightText: '33 Tấn', // Tải trọng hàng hóa
    weight: 33,
    length: 12.4, // Chiều dài sàn mooc
    width: 2.5, // Chiều rộng mooc
    height: 2.2, // Chiều cao tổng thể của mooc (bao gồm cả rào)
    dimensions: '12.4 x 2.5 x 2.2 m', // Kích thước sàn và chiều cao rào
    type: 'mooc',
    trailerType: 'rào', // Mooc có rào chắn xung quanh
    isNew: true,
    isHot: false,
    origin: 'Trung Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/cimc-rao.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-rao.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-rao-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-rao-3.jpg',
    ],
    specifications: {
      warranty: '1 năm',
      year: 2023,
    },
    trailerSpec: {
      axleCount: 3,
      axleType: 'Fuwa',
      axleWeight: 13, // Tải trọng mỗi trục
      kingpinLoad: 20, // Tải trọng chốt kéo
      suspensionType: 'Nhíp lá phẳng',
      brakeSystem: 'Hệ thống phanh khí nén, ABS',
      floorType: 'Thép tấm',
      floorThickness: '4mm', // Độ dày sàn
      sideHeight: 1.8, // Chiều cao của rào chắn (mét)
    },
    description: 'CIMC Rào là sơ mi rơ mooc với thiết kế thành rào cao, lý tưởng để vận chuyển hàng hóa nhẹ, cồng kềnh như sản phẩm nông nghiệp, gia súc, gia cầm, và các sản phẩm đóng kiện lớn. Thành rào giúp hàng hóa không bị rơi ra ngoài trong quá trình vận chuyển và vẫn đảm bảo thông thoáng.',
    features: [
      'Thành rào cao 1.8m với thanh thép chắc chắn',
      'Thiết kế thông thoáng giúp giảm sức cản gió',
      'Sàn thép dày 4mm chịu lực tốt',
      'Khung gầm thép cường lực',
      'Hệ thống 3 trục Fuwa chất lượng cao',
      'Cửa sau mở rộng thuận tiện cho bốc xếp hàng',
      'Trọng lượng bản thân nhẹ, tăng khả năng chở hàng'
    ]
  },
  {
    id: "309",
    name: 'DOOSUNG Xitec Xăng Dầu',
    slug: 'doosung-xitec-xang-dau',
    brand: 'DOOSUNG',
    price: 700000000,
    priceText: '700.000.000 đ',
    weightText: '30 Tấn', // Tải trọng hàng hóa (xăng dầu)
    weight: 30,
    length: 12.0, // Chiều dài tổng thể mooc
    width: 2.5, // Chiều rộng mooc
    height: 3.2, // Chiều cao tổng thể mooc
    dimensions: '12.0 x 2.5 x 3.2 m',
    type: 'mooc',
    trailerType: 'xi-téc', // Mooc bồn xi téc
    isNew: true,
    isHot: true,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/doosung-xitec.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-xitec.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-xitec-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-xitec-3.jpg',
    ],
    specifications: {
      warranty: '1 năm',
      year: 2023,
    },
    tankSpec: { // Thông số bồn xi téc
      capacity: 40000, // Dung tích bồn (lít)
      capacityText: '40.000 lít', // Dung tích (chữ)
      compartments: 4, // Số ngăn của bồn
      material: 'Thép carbon Q345 dày 6mm', // Vật liệu chế tạo bồn
      thickness: '6mm', // Độ dày thành bồn
      valveSystem: 'Van đáy API, van xả, van khẩn cấp', // Hệ thống van
      pressureRating: '0.3 MPa', // Áp suất làm việc
      dischargingSystem: 'Hệ thống ống mềm + bơm', // Hệ thống xả nhiên liệu
      safetyEquipment: 'Van thở, hệ thống nối đất, PCCC', // Thiết bị an toàn
    },
    description: 'DOOSUNG Xitec Xăng Dầu là sơ mi rơ mooc xi téc chuyên dụng để vận chuyển xăng dầu với dung tích lớn. Được thiết kế theo tiêu chuẩn an toàn quốc tế, mooc có kết cấu bồn chứa dạng elip với 4 khoang riêng biệt, cho phép vận chuyển đồng thời nhiều loại nhiên liệu khác nhau.',
    features: [
      'Bồn chứa 4 khoang riêng biệt, dung tích tổng 40.000 lít',
      'Vách ngăn chống sóng giảm xóc khi di chuyển',
      'Thiết kế theo tiêu chuẩn an toàn PCCC',
      'Hệ thống van API tiêu chuẩn quốc tế',
      'Cổ bồn với nắp nhanh thuận tiện khi nạp liệu',
      'Hệ thống 3 trục JOST chất lượng cao',
      'Tích hợp hệ thống thu hồi hơi xăng dầu'
    ]
  },
  {
    id: "310",
    name: 'CIMC Bồn Xi Măng',
    slug: 'cimc-bon-xi-mang',
    brand: 'CIMC',
    price: 580000000,
    priceText: '580.000.000 đ',
    weightText: '31 Tấn', // Tải trọng xi măng chở được
    weight: 31,
    length: 12.0, // Chiều dài tổng thể mooc
    width: 2.5, // Chiều rộng mooc
    height: 3.6, // Chiều cao tổng thể mooc
    dimensions: '12.0 x 2.5 x 3.6 m',
    type: 'mooc',
    trailerType: 'bồn-xi-măng', // Mooc bồn chở xi măng rời
    isNew: false,
    isHot: false,
    origin: 'Trung Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/cimc-bon-xi-mang.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-bon-xi-mang.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-bon-xi-mang-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-bon-xi-mang-3.jpg',
    ],
    specifications: {
      warranty: '1 năm',
      year: 2023,
    },
    tankSpec: {
      capacity: 35000, // Dung tích bồn (mét khối hoặc lít tùy quy đổi)
      capacityText: '35 khối xi măng', // Dung tích (chữ)
      compartments: 1, // Số ngăn (thường là 1 cho xi măng rời)
      material: 'Thép carbon Q345 dày 5mm', // Vật liệu bồn
      thickness: '5mm', // Độ dày thành bồn
      valveSystem: 'Hệ thống van khí nén', // Hệ thống van xả
      pressureRating: '0.35 MPa', // Áp suất làm việc
      dischargingSystem: 'Hệ thống máy nén khí 15HP', // Hệ thống xả xi măng bằng khí nén
      liningMaterial: 'Không có (cho xi măng)', // Vật liệu lót trong (nếu có)
      safetyEquipment: 'Van an toàn, van xả áp', // Thiết bị an toàn
    },
    description: 'CIMC Bồn Xi Măng là sơ mi rơ mooc bồn chuyên dụng để vận chuyển xi măng rời. Với thiết kế kín hoàn toàn và hệ thống máy nén khí chuyên dụng, mooc có khả năng bảo quản xi măng khỏi ảnh hưởng của môi trường và cho phép bơm xi măng nhanh chóng, hiệu quả.',
    features: [
      'Bồn kín hoàn toàn, bảo vệ xi măng khỏi môi trường',
      'Máy nén khí công suất 15HP đẩy xi măng nhanh chóng',
      'Hệ thống van khí nén đảm bảo an toàn',
      'Cổ bồn với nắp kín thuận tiện khi nạp liệu',
      'Hệ thống 3 trục Fuwa chất lượng cao',
      'Lớp sơn đặc biệt chống ăn mòn',
      'Thanh vệ sinh bồn đi kèm'
    ]
  },
  {
    id: "311",
    name: 'DOOSUNG Bồn Bụi Sắt',
    slug: 'doosung-bon-bui-sat',
    brand: 'DOOSUNG',
    price: 620000000,
    priceText: '620.000.000 đ',
    weightText: '30 Tấn', // Tải trọng bụi sắt
    weight: 30,
    length: 11.8, // Chiều dài tổng thể mooc
    width: 2.5, // Chiều rộng mooc
    height: 3.8, // Chiều cao tổng thể mooc
    dimensions: '11.8 x 2.5 x 3.8 m',
    type: 'mooc',
    trailerType: 'bồn-sắt', // Hoặc 'bồn-bụi-sắt'
    isNew: true,
    isHot: false,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/doosung-bon-bui-sat.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-bon-bui-sat.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-bon-bui-sat-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-bon-bui-sat-3.jpg',
    ],
    specifications: {
      warranty: '1 năm',
      year: 2023,
    },
    tankSpec: {
      capacity: 30000, // Dung tích bồn (mét khối)
      capacityText: '30 khối', // Dung tích (chữ)
      compartments: 1, // Số ngăn
      material: 'Thép đặc biệt chống mài mòn', // Vật liệu bồn chịu mài mòn
      thickness: '6mm', // Độ dày thành bồn
      valveSystem: 'Hệ thống van khí nén đặc biệt cho bụi sắt', // Hệ thống van
      pressureRating: '0.4 MPa', // Áp suất làm việc
      dischargingSystem: 'Máy nén khí công suất cao 18HP', // Hệ thống xả
      safetyEquipment: 'Hệ thống lọc bụi, van an toàn', // Thiết bị an toàn
    },
    description: 'DOOSUNG Bồn Bụi Sắt là sơ mi rơ mooc bồn chuyên dụng để vận chuyển bụi, bột sắt và các loại vật liệu bột kim loại. Được thiết kế với vật liệu đặc biệt chống mài mòn và hệ thống bơm khí mạnh mẽ, mooc đảm bảo an toàn khi vận chuyển và xả hàng hiệu quả.',
    features: [
      'Bồn làm từ thép đặc biệt chống mài mòn do bụi sắt',
      'Máy nén khí công suất cao 18HP',
      'Hệ thống lọc để tránh bụi bay ra môi trường',
      'Thiết kế đảm bảo không rò rỉ bụi sắt',
      'Hệ thống 3 trục JOST chất lượng cao',
      'Lớp phủ bên trong chống dính bụi',
      'Thiết kế an toàn chống nổ'
    ]
  },
  {
    id: "312",
    name: 'CIMC Bồn Bột Mì',
    slug: 'cimc-bon-bot-mi',
    brand: 'CIMC',
    price: 550000000,
    priceText: '550.000.000 đ',
    weightText: '28 Tấn', // Tải trọng bột mì
    weight: 28,
    length: 11.5, // Chiều dài tổng thể mooc
    width: 2.5, // Chiều rộng mooc
    height: 3.7, // Chiều cao tổng thể mooc
    dimensions: '11.5 x 2.5 x 3.7 m',
    type: 'mooc',
    trailerType: 'bồn-bột-mì', // Mooc bồn chở bột mì
    isNew: false,
    isHot: true,
    origin: 'Trung Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/cimc-bon-bot-mi.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-bon-bot-mi.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-bon-bot-mi-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-bon-bot-mi-3.jpg',
    ],
    specifications: {
      warranty: '1 năm',
      year: 2023,
    },
    tankSpec: {
      capacity: 38000, // Dung tích bồn (mét khối hoặc lít)
      capacityText: '38 khối', // Dung tích (chữ)
      compartments: 1, // Số ngăn
      material: 'Thép không gỉ 304', // Vật liệu an toàn thực phẩm
      thickness: '4mm', // Độ dày thành bồn
      valveSystem: 'Hệ thống van an toàn thực phẩm', // Hệ thống van
      pressureRating: '0.3 MPa', // Áp suất làm việc
      dischargingSystem: 'Máy nén khí sạch 12HP', // Hệ thống xả chuyên dụng cho thực phẩm
      liningMaterial: 'Inox 304 (toàn bộ bồn)', // Vật liệu lót trong
      safetyEquipment: 'Van xả áp, hệ thống làm sạch', // Thiết bị an toàn và vệ sinh
    },
    description: 'CIMC Bồn Bột Mì là sơ mi rơ mooc bồn chuyên dụng để vận chuyển bột mì và các loại thực phẩm dạng bột. Được thiết kế với tiêu chuẩn an toàn thực phẩm cao, bồn được làm từ thép không gỉ 304, đảm bảo vệ sinh và chất lượng sản phẩm trong quá trình vận chuyển.',
    features: [
      'Bồn inox 304 đảm bảo an toàn thực phẩm',
      'Máy nén khí sạch cho thực phẩm',
      'Hệ thống lọc khí đảm bảo không nhiễm bẩn',
      'Cửa kiểm tra và vệ sinh bồn tiện lợi',
      'Hệ thống 3 trục Fuwa chất lượng cao',
      'Thiết kế chống đọng nước, ngưng tụ bên trong bồn',
      'Lớp cách nhiệt giữ nhiệt độ ổn định cho bột'
    ]
  },
  {
    id: "12", // ID này bị trùng, cần đảm bảo ID là duy nhất nếu đây là sản phẩm mới
    name: 'DOOSUNG 3 Trục', // Cần làm rõ loại mooc (sàn, xương, lửng, rào,...)
    slug: 'doosung-3-truc',
    brand: 'DOOSUNG',
    price: 550000000,
    priceText: '550.000.000 đ',
    weightText: '32 Tấn', // Tải trọng hàng hóa
    weight: 32, // Tải trọng (tấn)
    length: 12.4, // Chiều dài của mooc (mét)
    width: 2.5, // Chiều rộng của mooc (mét)
    height: 3.8, // Chiều cao tổng thể của mooc (mét) - có thể bao gồm cả thành/rào nếu có
    dimensions: '12.4 x 2.5 x 3.8 m', // Kích thước tổng thể (DxRxC)
    type: 'mooc',
    trailerType: 'sàn', // Mặc định là mooc sàn nếu không có thông tin cụ thể
    isNew: false,
    isHot: true,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/doosung-3-truc.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-3-truc.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-3-truc-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/doosung-3-truc-3.jpg',
    ],
    specifications: {
      warranty: '1 năm',
      year: 2023,
      // payload: '32 tấn', // Đã có weight và weightText
    },
    trailerSpec: {
        axleCount: 3, // Số trục
        suspensionType: 'Nhíp lá phẳng', // Loại hệ thống treo
        brakeSystem: 'Phanh khí nén', // Loại hệ thống phanh
        axleType: 'JOST/FUWA (tùy chọn)', // Loại trục
        axleWeight: 13, // Tải trọng cho phép trên mỗi trục (tấn)
        kingpinLoad: 19, // Tải trọng tối đa lên chốt kéo (tấn)
        floorType: 'Sàn thép', // Loại sàn
        floorThickness: '3-5mm', // Độ dày sàn
        // sideHeight: // Chiều cao thành/bửng (nếu có)
        // containerLock: // Số lượng khóa gù container (nếu có)
    },
    description: 'DOOSUNG 3 trục là loại sơ mi rơ mooc chất lượng cao đến từ Hàn Quốc, được thiết kế để vận chuyển hàng hóa nặng với tải trọng lên đến 32 tấn. Sản phẩm có cấu trúc chắc chắn, bền bỉ và khả năng chịu tải cao.',
    features: [
      'Cấu trúc khung gầm chắc chắn',
      'Hệ thống 3 trục tăng khả năng chịu tải',
      'Sàn thép cường lực dày',
      'Hệ thống phanh ABS an toàn',
      'Tuổi thọ cao, bảo dưỡng đơn giản'
    ]
  },
  {
    id: "13", // ID này bị trùng, cần đảm bảo ID là duy nhất nếu đây là sản phẩm mới
    name: 'CIMC Xitec Chở Xăng Dầu',
    slug: 'cimc-xitec-cho-xang-dau',
    brand: 'CIMC',
    price: 680000000,
    priceText: '680.000.000 đ',
    weightText: '30 Tấn', // Tải trọng hàng hóa (xăng dầu)
    weight: 30, // Tải trọng (tấn)
    length: 13.5, // Chiều dài tổng thể của mooc (mét)
    width: 2.5, // Chiều rộng của mooc (mét)
    height: 3.9, // Chiều cao tổng thể của mooc (mét)
    dimensions: '13.5 x 2.5 x 3.9 m', // Kích thước tổng thể (DxRxC)
    type: 'mooc',
    trailerType: 'xi-téc', // Mooc bồn chở xăng dầu
    isNew: true,
    isHot: false,
    origin: 'Trung Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/cimc-xitec.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-xitec.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-xitec-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/cimc-xitec-3.jpg',
    ],
    specifications: {
      warranty: '2 năm',
      year: 2023,
      // capacity: '40.000 lít', // Nên đưa vào tankSpec
      // payload: '30 tấn', // Đã có weight và weightText
    },
    tankSpec: { // Thông số bồn xi téc
        capacity: 40000, // Dung tích bồn (lít)
        capacityText: '40.000 lít', // Dung tích (chữ)
        compartments: 3, // Số ngăn (ví dụ 3-5 ngăn)
        material: 'Thép hợp kim chống ăn mòn', // Vật liệu bồn
        thickness: '5-6mm', // Độ dày thành bồn
        valveSystem: 'Van đáy API, van xả khẩn cấp', // Hệ thống van
        pressureRating: '0.035 MPa', // Áp suất làm việc
        dischargingSystem: 'Bơm hoặc xả tự nhiên', // Hệ thống xả
        safetyEquipment: 'Van thở, hệ thống PCCC, dây tiếp đất', // Thiết bị an toàn
    },
    description: 'CIMC Xitec là loại sơ mi rơ mooc chuyên dụng để chở xăng dầu, được thiết kế với bồn chứa dung tích lớn và các hệ thống an toàn chuyên biệt cho việc vận chuyển nhiên liệu.',
    features: [
      'Bồn chứa dung tích lớn bằng thép chống ăn mòn',
      'Hệ thống van an toàn chuyên dụng',
      'Trang bị hệ thống chống tràn',
      'Thiết kế tuân thủ tiêu chuẩn an toàn quốc tế',
      'Hệ thống 3 trục chắc chắn'
    ]
  },
  {
    id: "14", // ID này bị trùng, cần đảm bảo ID là duy nhất nếu đây là sản phẩm mới
    name: 'KOKSAN Ben 3 Trục',
    slug: 'koksan-ben-3-truc',
    brand: 'KOKSAN', // Cần thêm 'KOKSAN' vào truckBrands nếu chưa có
    price: 600000000,
    priceText: '600.000.000 đ',
    weightText: '28 Tấn', // Tải trọng hàng hóa
    weight: 28, // Tải trọng (tấn)
    length: 11.8, // Chiều dài tổng thể mooc (mét)
    width: 2.5, // Chiều rộng mooc (mét)
    height: 3.6, // Chiều cao tổng thể mooc (mét)
    dimensions: '11.8 x 2.5 x 3.6 m', // Kích thước tổng thể (DxRxC)
    type: 'mooc',
    trailerType: 'ben', // Mooc ben tự đổ
    isNew: false,
    isHot: false,
    origin: 'Hàn Quốc', // Hoặc Thổ Nhĩ Kỳ tùy nhà sản xuất KOKSAN
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Mooc/koksan-ben.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Mooc/koksan-ben.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/koksan-ben-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Mooc/koksan-ben-3.jpg',
    ],
    specifications: {
      warranty: '1 năm',
      year: 2023,
      // payload: '28 tấn', // Đã có weight và weightText
    },
    trailerSpec: {
        axleCount: 3, // Số trục
        suspensionType: 'Nhíp lá', // Hệ thống treo
        brakeSystem: 'Phanh khí nén', // Hệ thống phanh
        hydraulicSystem: 'Hệ thống ben thủy lực KOKSAN', // Hệ thống ben
        axleType: 'Trục KOKSAN/SAF (tùy chọn)', // Loại trục
        axleWeight: 12, // Tải trọng mỗi trục (tấn) - ví dụ
        kingpinLoad: 16, // Tải trọng chốt kéo (tấn) - ví dụ
        floorThickness: '6-8mm', // Độ dày sàn thùng ben
        sideHeight: '1.3-1.6m', // Chiều cao thành thùng ben
        liftingAngle: '45-52°', // Góc nâng ben
    },
    description: 'KOKSAN Ben 3 trục là loại sơ mi rơ mooc ben cao cấp từ Hàn Quốc, được thiết kế để vận chuyển và đổ các vật liệu rời như cát, đá, xi măng. Sản phẩm có cấu trúc chắc chắn với hệ thống ben thủy lực mạnh mẽ.',
    features: [
      'Hệ thống ben thủy lực mạnh mẽ',
      'Thùng hàng có độ bền cao',
      'Khung gầm cứng cáp',
      'Hệ thống 3 trục chắc chắn',
      'Tuổi thọ cao, chi phí bảo dưỡng thấp'
    ]
  },

  // ===== XE ĐẦU KÉO =====
  {
    id: "401",
    name: 'Hyundai Xcient Đầu Kéo',
    slug: 'hyundai-xcient-dau-keo',
    brand: 'Hyundai',
    price: 1950000000,
    priceText: '1.950.000.000 đ',
    weightText: '40 Tấn', // Tổng trọng tải kéo theo cho phép của tổ hợp xe (đầu kéo + mooc)
    weight: 40, // Tổng trọng tải kéo (tấn)
    length: 6.8, // Chiều dài tổng thể của đầu kéo (mét)
    width: 2.5, // Chiều rộng tổng thể của đầu kéo (mét)
    height: 3.5, // Chiều cao tổng thể của đầu kéo (mét)
    dimensions: '6.8 x 2.5 x 3.5 m', // Kích thước tổng thể của đầu kéo (DxRxC)
    type: 'dau-keo', // Phân loại xe đầu kéo
    isNew: true,
    isHot: true,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Dau-Keo/hyundai-xcient.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Dau-Keo/hyundai-xcient.jpg',
      'https://tongkhoxetai.vn/upload/images/Dau-Keo/hyundai-xcient-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Dau-Keo/hyundai-xcient-3.jpg',
    ],
    specifications: { // Thông số kỹ thuật chung của đầu kéo
      engineType: 'Diesel D6CC', // Kiểu động cơ / Tên model động cơ
      engineCapacity: '12.7L', // Dung tích xi lanh
      horsePower: '520 HP', // Công suất cực đại
      torque: '2500 Nm', // Mô-men xoắn cực đại
      transmission: 'Số tự động 12 cấp ZF', // Loại hộp số và số cấp
      fuelConsumption: '32L/100km', // Mức tiêu thụ nhiên liệu (tham khảo)
      emission: 'Euro 5', // Tiêu chuẩn khí thải
      warranty: '3 năm hoặc 200.000 km', // Chính sách bảo hành
      seats: 2, // Số chỗ ngồi trong cabin
      year: 2023 // Năm sản xuất
    },
    tractorSpec: { // Thông số kỹ thuật chuyên biệt của xe đầu kéo
      horsepower: 520, // Công suất (mã lực) - đã có ở specifications
      torque: '2500 Nm tại 1200 rpm', // Mô-men xoắn và vòng tua máy tương ứng
      transmission: 'ZF 12 cấp tự động', // Chi tiết hộp số - đã có ở specifications
      transmissionType: 'AMT (Automated Manual Transmission)', // Loại truyền động (số tự động, số sàn)
      clutchType: 'Ly hợp khô đĩa đơn, điều khiển thủy lực', // Loại ly hợp
      cabinType: 'Cabin ngủ rộng rãi', // Kiểu cabin (cabin đơn, cabin đôi có giường ngủ)
      wheelbase: 3900, // Chiều dài cơ sở của đầu kéo (milimét)
      fuelTankCapacity: 400, // Dung tích bình nhiên liệu (lít)
      fuelTankCapacityText: '400 lít (2 bình)', // Mô tả dung tích bình nhiên liệu
      saddleHeight: 1250, // Chiều cao mâm kéo tính từ mặt đất (milimét)
      fifthWheelType: 'JOST Đức 2 inch', // Loại mâm kéo (ví dụ: JOST, Holland) và kích thước
      maxTowingCapacity: 60, // Khối lượng kéo theo cho phép lớn nhất (tấn)
      maxTowingCapacityText: '60 tấn', // Khối lượng kéo theo (chữ)
      brakingSystem: 'Phanh khí nén hai dòng, ABS, EBS, ESP', // Hệ thống phanh chính
      retarderSystem: 'Phanh động cơ (Exhaust Brake)', // Hệ thống phanh phụ (phanh động cơ, phanh thủy lực)
      sleepingBerth: true, // Có giường nằm trong cabin hay không
      axleConfiguration: '6x4', // Cấu hình trục (ví dụ: 4x2, 6x4)
      airConditioner: true, // Có hệ thống điều hòa không khí
      electricSystem: '24V', // Hệ thống điện trên xe
      // interiorFeatures: ['Ghế hơi', 'Radio CD/MP3/USB', 'Điều hòa tự động'], // Các tiện nghi nội thất
    },
    description: 'Hyundai Xcient Đầu Kéo là xe đầu kéo hạng nặng cao cấp đến từ Hyundai, được thiết kế để kéo các loại sơ mi rơ mooc nặng trên đường trường. Với động cơ mạnh mẽ D6CC 12.7L sản sinh công suất 520 mã lực và mô-men xoắn lên đến 2500 Nm, xe có khả năng kéo tải trọng lớn lên đến 60 tấn.',
    features: [
      'Động cơ D6CC 12.7L mạnh mẽ 520 mã lực',
      'Hệ thống số tự động ZF 12 cấp',
      'Cabin ngủ rộng rãi với 2 giường',
      'Hệ thống phanh EBS và ESP tiên tiến',
      'Hệ thống điều hòa tự động, ghế hơi cao cấp',
      'Bình nhiên liệu dung tích lớn 400 lít',
      'Kính chắn gió toàn cảnh tăng tầm nhìn',
      'Hệ thống giám sát hành trình (GPS Fleet Management)'
    ]
  },
  {
    id: "402",
    name: 'HOWO Đầu Kéo', // Cần model cụ thể như HOWO A7, SITRAK C7H
    slug: 'howo-dau-keo',
    brand: 'HOWO',
    price: 1250000000,
    priceText: '1.250.000.000 đ',
    weightText: '35 Tấn', // Khả năng kéo theo thiết kế
    weight: 35, // Khả năng kéo (tấn)
    length: 6.5, // Chiều dài đầu kéo
    width: 2.5, // Chiều rộng đầu kéo
    height: 3.3, // Chiều cao cabin
    dimensions: '6.5 x 2.5 x 3.3 m',
    type: 'dau-keo',
    isNew: false,
    isHot: false,
    origin: 'Trung Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Dau-Keo/howo-dau-keo.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Dau-Keo/howo-dau-keo.jpg',
      'https://tongkhoxetai.vn/upload/images/Dau-Keo/howo-dau-keo-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Dau-Keo/howo-dau-keo-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel WD615', // Hoặc MC11, MC13 tùy model
      engineCapacity: '9.7L', // Hoặc 10.5L, 12.4L
      horsePower: '420 HP', // Công suất có thể từ 380HP đến 540HP
      torque: '1900 Nm', // Mô-men xoắn
      transmission: 'Số sàn 16 cấp', // Hoặc 12 cấp, hoặc số tự động
      fuelConsumption: '30L/100km', // Mức tiêu thụ nhiên liệu (tham khảo)
      emission: 'Euro 4', // Hoặc Euro 5
      warranty: '2 năm hoặc 100.000 km',
      seats: 2,
      year: 2023
    },
    tractorSpec: {
      horsepower: 420,
      torque: '1900 Nm tại 1300 rpm',
      transmission: 'Fuller 16 cấp', // Hoặc HW (Sinotruk)
      transmissionType: 'Số sàn',
      clutchType: 'Ly hợp khô đĩa đơn',
      cabinType: 'Cabin ngủ', // Ví dụ: A7 (nóc cao/thấp), T7H
      wheelbase: 3800, // mm
      fuelTankCapacity: 350, // lít (có thể có tùy chọn bình lớn hơn)
      fuelTankCapacityText: '350 lít',
      saddleHeight: 1200, // mm (tiêu chuẩn)
      fifthWheelType: 'HOWO 2 inch', // Hoặc JOST
      maxTowingCapacity: 55, // Tấn
      maxTowingCapacityText: '55 tấn',
      axleConfiguration: '6x4',
      brakingSystem: 'Phanh khí nén, ABS, ASR',
    },
    description: 'HOWO Đầu Kéo là xe đầu kéo hạng nặng đến từ Trung Quốc, được biết đến với giá thành hợp lý và hiệu suất ổn định. Với động cơ WD615 9.7L công suất 420 mã lực, xe có khả năng kéo các loại sơ mi rơ mooc nặng với tải trọng lên đến 55 tấn, phù hợp cho các công việc vận tải đường dài.',
    features: [
      'Động cơ WD615 9.7L công suất 420 mã lực',
      'Hệ thống số sàn Fuller 16 cấp',
      'Cabin ngủ trang bị tiện nghi cơ bản',
      'Hệ thống phanh ABS/ASR',
      'Ghế người lái hơi với giảm chấn',
      'Bình nhiên liệu dung tích 350 lít',
      'Chi phí bảo dưỡng thấp',
      'Phụ tùng dễ tìm, giá rẻ'
    ]
  },
  {
    id: "403",
    name: 'Isuzu Giga Đầu Kéo',
    slug: 'isuzu-giga-dau-keo',
    brand: 'Isuzu',
    price: 1650000000,
    priceText: '1.650.000.000 đ',
    weightText: '38 Tấn', // Khả năng kéo
    weight: 38, // Khả năng kéo (tấn)
    length: 6.7, // Chiều dài đầu kéo
    width: 2.5, // Chiều rộng đầu kéo
    height: 3.4, // Chiều cao cabin
    dimensions: '6.7 x 2.5 x 3.4 m',
    type: 'dau-keo',
    isNew: true,
    isHot: false,
    origin: 'Nhật Bản',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Dau-Keo/isuzu-giga.jpg',
    images: [
      'https://tongkhoxetai.vn/upload/images/Dau-Keo/isuzu-giga.jpg',
      'https://tongkhoxetai.vn/upload/images/Dau-Keo/isuzu-giga-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Dau-Keo/isuzu-giga-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel 6UZ1', // Model động cơ
      engineCapacity: '9.8L', // Dung tích xi lanh
      horsePower: '460 HP', // Công suất cực đại
      torque: '2100 Nm', // Mô-men xoắn cực đại
      transmission: 'Số sàn 16 cấp', // Loại hộp số (ví dụ: ZF Ecosplit)
      fuelConsumption: '29L/100km', // Mức tiêu thụ nhiên liệu (tham khảo)
      emission: 'Euro 4', // Tiêu chuẩn khí thải (có thể là Euro 5 cho các model mới hơn)
      warranty: '3 năm hoặc 150.000 km', // Bảo hành
      seats: 2, // Số chỗ ngồi
      year: 2023 // Năm sản xuất
    },
    tractorSpec: {
      horsepower: 460, // Công suất (HP)
      torque: '2100 Nm tại 1400 rpm', // Mô-men xoắn và vòng tua
      transmission: 'ZF 16 cấp', // Chi tiết hộp số
      transmissionType: 'Số sàn', // Loại truyền động
      clutchType: 'Ly hợp khô đĩa đơn', // Loại ly hợp
      cabinType: 'Cabin ngủ tiện nghi', // Kiểu cabin
      wheelbase: 3850, // Chiều dài cơ sở (mm)
      fuelTankCapacity: 380, // Dung tích bình nhiên liệu (lít)
      fuelTankCapacityText: '380 lít (2 bình)', // Mô tả dung tích bình nhiên liệu
      saddleHeight: 1220, // Chiều cao mâm kéo (mm)
      fifthWheelType: 'JOST Đức 2 inch', // Loại mâm kéo
      maxTowingCapacity: 58, // Khả năng kéo theo thiết kế (tấn)
      maxTowingCapacityText: '58 tấn', // Khả năng kéo (chữ)
      axleConfiguration: '6x4', // Cấu hình trục
      brakingSystem: 'Phanh khí nén, ABS, EBS', // Hệ thống phanh
      retarderSystem: 'Phanh động cơ Isuzu', // Phanh phụ
      sleepingBerth: true, // Có giường nằm
      airConditioner: true, // Có điều hòa
    },
    description: 'Isuzu Giga Đầu Kéo là xe đầu kéo hạng nặng từ thương hiệu Isuzu Nhật Bản nổi tiếng với độ bền và tiết kiệm nhiên liệu. Với động cơ 6UZ1 9.8L công suất 460 mã lực, xe có khả năng kéo các loại sơ mi rơ mooc nặng với hiệu suất cao và chi phí vận hành tối ưu.',
    features: [
      'Động cơ 6UZ1 9.8L công suất 460 mã lực',
      'Hệ thống số sàn ZF 16 cấp',
      'Cabin ngủ thiết kế tiện nghi, rộng rãi',
      'Hệ thống phanh ABS/EBS hiện đại',
      'Ghế người lái hơi cao cấp',
      'Hệ thống giảm xóc cabin khí nén',
      'Độ bền cao, chi phí bảo dưỡng thấp',
      'Tiết kiệm nhiên liệu vượt trội'
    ]
  },
  {
    id: "15", // ID này trùng với ID của xe tải Hyundai Xcient 25 Tấn, cần sửa lại nếu là sản phẩm khác biệt
    name: 'Hyundai HD1000 Đầu Kéo', // HD1000 là một dòng cũ hơn Xcient, hoặc là tên gọi khác của Xcient tại một số thị trường. Cần làm rõ.
    slug: 'hyundai-hd1000-dau-keo',
    brand: 'Hyundai',
    price: 1950000000, // Giá tương đương Xcient 40 tấn
    priceText: '1.950.000.000 đ',
    weightText: '40 Tấn', // Khả năng kéo
    weight: 40, // Khả năng kéo (tấn)
    length: 6.8, // Chiều dài xe
    width: 2.5, // Chiều rộng xe
    height: 3.6, // Chiều cao cabin
    dimensions: '6.8 x 2.5 x 3.6 m',
    type: 'dau-keo',
    isNew: true,
    isHot: true,
    origin: 'Hàn Quốc',
    thumbnailUrl: 'https://tongkhoxetai.vn/upload/images/Dau-Keo/hd1000.jpg', // Ảnh này giống Xcient
    images: [
      'https://tongkhoxetai.vn/upload/images/Dau-Keo/hd1000.jpg',
      'https://tongkhoxetai.vn/upload/images/Dau-Keo/hd1000-2.jpg',
      'https://tongkhoxetai.vn/upload/images/Dau-Keo/hd1000-3.jpg',
    ],
    specifications: {
      engineType: 'Diesel', // Model động cơ, ví dụ D6CB, D6CC, D6CK
      engineCapacity: '12.7L', // Dung tích xi lanh
      horsePower: '520 HP', // Công suất
      torque: '2500 Nm', // Mô-men xoắn
      transmission: 'Số tự động 12 cấp', // Hộp số (ví dụ ZF hoặc Hyundai Transys)
      fuelConsumption: '30L/100km', // Tiêu thụ nhiên liệu (tham khảo)
      emission: 'Euro 5', // Tiêu chuẩn khí thải
      warranty: '3 năm hoặc 200.000 km', // Bảo hành
      seats: 2, // Số chỗ
      year: 2023 // Năm sản xuất
    },
    tractorSpec: {
        horsepower: 520, // Công suất
        torque: '2500 Nm', // Mô-men xoắn
        transmission: 'Số tự động 12 cấp ZF', // Chi tiết hộp số
        cabinType: 'Cabin Xcient', // Loại cabin (HD1000 có thể dùng cabin Xcient hoặc cabin riêng)
        maxTowingCapacity: 60, // Khả năng kéo tối đa (tấn)
        maxTowingCapacityText: '60 tấn', // Khả năng kéo (chữ)
        wheelbase: 3900, // Chiều dài cơ sở (mm)
        fuelTankCapacity: 400, // Dung tích bình nhiên liệu (lít)
        saddleHeight: 1250, // Chiều cao mâm (mm)
        fifthWheelType: 'JOST Đức 2 inch', // Loại mâm
        axleConfiguration: '6x4', // Cấu hình trục
        brakingSystem: 'Phanh khí nén, ABS, EBS', // Hệ thống phanh
        retarderSystem: 'Phanh động cơ', // Phanh phụ
    },
    description: 'Hyundai HD1000 là dòng xe đầu kéo cao cấp của Hyundai, được thiết kế để kéo các loại sơ mi rơ mooc nặng với hiệu suất cao và độ bền vượt trội. Xe được trang bị động cơ mạnh mẽ cùng hệ thống an toàn tiên tiến.',
    features: [
      'Động cơ công suất lớn, mạnh mẽ',
      'Cabin thiết kế sang trọng, tiện nghi cao cấp',
      'Hệ thống an toàn tiên tiến',
      'Hệ thống phanh hiện đại ABS/EBD/ESP',
      'Tiêu chuẩn khí thải Euro 5'
    ]
  },
];

// Phân loại xe theo từng danh mục
// Xe tải nổi bật
export const featuredTrucks: Truck[] = trucks.filter(truck =>
  truck.type === 'xe-tai' && (truck.isHot || truck.isNew)
).slice(0, 8);

// Xe cẩu chuyên dụng
export const specializedCranes: Truck[] = trucks.filter(truck =>
  truck.type === 'xe-cau'
);

// Sơ mi rơ mooc
export const semiTrailers: Truck[] = trucks.filter(truck =>
  truck.type === 'mooc'
);

// Xe đầu kéo
export const tractors: Truck[] = trucks.filter(truck =>
  truck.type === 'dau-keo'
);
