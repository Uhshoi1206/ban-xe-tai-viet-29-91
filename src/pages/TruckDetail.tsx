
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trucks } from '@/data/truckData';
import { Truck, VehicleType, getVehicleUrlPrefix, getVehicleTypeName, getBoxTypeName } from '@/models/TruckTypes';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ContactForm from '@/components/ContactForm';
import TruckItem from '@/components/TruckItem';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { blogPosts } from '@/data/blogData';
import { CalendarDays, Clock, Phone, GitCompare } from 'lucide-react';
import PriceQuoteDialog from '@/components/PriceQuoteDialog';
import { useCompare } from '@/contexts/CompareContext';
import TruckActions from '@/components/TruckDetail/TruckActions';
import CostEstimator from '@/components/TruckDetail/CostEstimator'; // Thêm mới

const TruckDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [truck, setTruck] = useState<Truck | null>(null);
  const [relatedTrucks, setRelatedTrucks] = useState<Truck[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const location = useLocation();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  
  useEffect(() => {
    if (slug) {
      const foundTruck = trucks.find(t => t.slug === slug);
      if (foundTruck) {
        setTruck(foundTruck);
        
        // Find related trucks (same brand or similar weight)
        const related = trucks
          .filter(t => 
            (t.brand === foundTruck.brand || 
             Math.abs(t.weight - foundTruck.weight) < 2) && 
            t.id !== foundTruck.id
          )
          .slice(0, 4);
        
        setRelatedTrucks(related);
      }
    }
  }, [slug]);

  // ====== CẢI TIẾN LỌC BÀI VIẾT BLOG LIÊN QUAN ======
  let relatedBlogs: typeof blogPosts = [];
  if (truck) {
    // Tạo ra các từ khóa chính xác cho sản phẩm hiện tại
    const nameKeywords = [
      truck.name.toLowerCase(),
      truck.slug.replace(/-/g, ' ').toLowerCase()
    ];
    // Tìm các bài viết có nhắc đến đúng sản phẩm này trong tiêu đề/mô tả/tag (ưu tiên số 1)
    let mainRelated = blogPosts.filter(post =>
      nameKeywords.some(kw =>
        post.title.toLowerCase().includes(kw) ||
        post.description.toLowerCase().includes(kw) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(kw)))
      )
    );

    // Loại bỏ trùng id
    mainRelated = mainRelated.filter(
      (post, idx, arr) => arr.findIndex(p => p.id === post.id) === idx
    );

    // Nếu có ít hơn 3 bài viết liên quan trực tiếp, mở rộng thêm bài viết cùng thương hiệu nhưng trừ bài khác sản phẩm
    if (mainRelated.length < 3) {
      const brandKeyword = truck.brand.toLowerCase();
      const extraRelated = blogPosts.filter(post =>
        // Cùng thương hiệu, không phải bài chính này và chưa nằm trong mainRelated
        (post.title.toLowerCase().includes(brandKeyword) ||
         post.description.toLowerCase().includes(brandKeyword) ||
         (post.tags && post.tags.some(tag => tag.toLowerCase().includes(brandKeyword)))
        )
        && !mainRelated.some(p => p.id === post.id)
      );
      // Gộp lại, vẫn loại trùng id
      relatedBlogs = [...mainRelated, ...extraRelated].filter(
        (post, idx, arr) => arr.findIndex(p => p.id === post.id) === idx
      );
    } else {
      relatedBlogs = mainRelated;
    }
  }
  
  if (!truck) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Không tìm thấy phương tiện</h2>
            <p className="text-gray-600 mb-4">Thông tin phương tiện bạn đang tìm kiếm không tồn tại.</p>
            <Button asChild>
              <Link to="/danh-muc-xe">Quay lại danh mục xe</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleToggleCompare = () => {
    if (isInCompare(truck.id)) {
      removeFromCompare(truck.id);
      toast({
        title: "Đã xóa khỏi danh sách so sánh",
        description: `${truck.name} đã được xóa khỏi danh sách so sánh`,
      });
    } else {
      addToCompare(truck);
      toast({
        title: "Đã thêm vào danh sách so sánh",
        description: `${truck.name} đã được thêm vào danh sách so sánh`,
      });
    }
  };
  
  const vehicleUrlPrefix = getVehicleUrlPrefix(truck.type);
  const vehicleTypeName = getVehicleTypeName(truck.type);
  const boxTypeName = truck.boxType ? getBoxTypeName(truck.boxType) : '';

  // Xác định các tab cần hiển thị dựa trên loại xe
  const getTabs = () => {
    const baseTabs = [
      { value: "description", label: "Mô tả chi tiết" },
      { value: "specifications", label: "Thông số kỹ thuật" }
    ];

    // Thêm tab dựa vào loại xe
    if (truck.boxType === 'đông-lạnh') {
      baseTabs.push({ value: "refrigeration", label: "Thông số thùng đông lạnh" });
    } 
    else if (truck.boxType === 'bảo-ôn') {
      baseTabs.push({ value: "insulated", label: "Thông số thùng bảo ôn" });
    } 
    else if (truck.boxType === 'kín') {
      baseTabs.push({ value: "closed", label: "Thông số thùng kín" });
    } 
    else if (truck.boxType === 'bạt') {
      baseTabs.push({ value: "tarpaulin", label: "Thông số thùng bạt" });
    } 
    else if (truck.boxType === 'lửng') {
      baseTabs.push({ value: "flatbed", label: "Thông số thùng lửng" });
    } 
    else if (truck.boxType === 'xi-téc') {
      baseTabs.push({ value: "tank", label: "Thông số xi téc" });
    }

    if (truck.type === 'xe-cau') {
      baseTabs.push({ value: "crane", label: "Thông số cẩu" });
    } 
    else if (truck.type === 'mooc') {
      baseTabs.push({ value: "trailer", label: "Thông số sơ mi rơ mooc" });
    } 
    else if (truck.type === 'dau-keo') {
      baseTabs.push({ value: "tractor", label: "Thông số đầu kéo" });
    }

    // Tab liên hệ luôn có
    baseTabs.push({ value: "contact", label: "Liên hệ tư vấn" });

    return baseTabs;
  };

  const tabs = getTabs();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto py-8 px-4">
        {/* Breadcrumbs - cập nhật để hiển thị đường dẫn phù hợp */}
        <div className="flex items-center mb-6 text-sm">
          <Link to="/" className="text-gray-600 hover:text-primary">Trang chủ</Link>
          <span className="mx-2">›</span>
          <Link to="/danh-muc-xe" className="text-gray-600 hover:text-primary">Danh mục xe</Link>
          <span className="mx-2">›</span>
          <Link to={`/danh-muc-xe?type=${truck.type}`} className="text-gray-600 hover:text-primary">
            {vehicleTypeName}
          </Link>
          {truck.boxType && (
            <>
              <span className="mx-2">›</span>
              <Link to={`/danh-muc-xe?type=${truck.type}&boxType=${truck.boxType}`} className="text-gray-600 hover:text-primary">
                {boxTypeName}
              </Link>
            </>
          )}
          <span className="mx-2">›</span>
          <span className="font-medium">{truck.name}</span>
        </div>
        
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Left: Product Images */}
          <div>
            <div className="mb-4 border rounded-lg overflow-hidden">
              <img 
                src={truck.images[activeImageIndex]} 
                alt={truck.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {truck.images.map((image, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`border-2 rounded-md overflow-hidden flex-shrink-0 w-20 h-20 transition-all ${
                    activeImageIndex === i ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${truck.name} - hình ${i+1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Right: Product Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {truck.isNew && (
                <Badge className="bg-blue-500 hover:bg-blue-600">Mới</Badge>
              )}
              {truck.isHot && (
                <Badge className="bg-primary hover:bg-red-700">Hot</Badge>
              )}
              <Badge variant="outline">{truck.brand}</Badge>
              {truck.boxType && (
                <Badge variant="outline" className="bg-blue-50">{boxTypeName}</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold">{truck.name}</h1>
            
            <div className="text-2xl font-bold text-primary mb-6">
              {truck.priceText}
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4 mb-6">
              <h2 className="text-lg font-bold">Thông số cơ bản:</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-gray-600 text-sm">Thương hiệu</div>
                  <div className="font-medium">{truck.brand.join(' / ')}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-gray-600 text-sm">Tải trọng</div>
                  <div className="font-medium">{truck.weightText}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-gray-600 text-sm">Kích thước tổng thể</div>
                  <div className="font-medium">{truck.dimensions}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-gray-600 text-sm">Xuất xứ</div>
                  <div className="font-medium">{truck.origin || 'Nhật Bản'}</div>
                </div>
                {truck.boxType === 'đông-lạnh' && truck.coolingBox && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-gray-600 text-sm">Nhiệt độ làm lạnh</div>
                    <div className="font-medium">{truck.coolingBox.temperatureRange || '-18°C đến +5°C'}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">Tính năng nổi bật:</h2>
              <ul className="list-disc list-inside space-y-1">
                {truck.features && truck.features.length > 0 ? (
                  truck.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))
                ) : (
                  truck.boxType === 'đông-lạnh' ? (
                    <>
                      <li className="text-gray-700">Thùng đông lạnh được sản xuất theo tiêu chuẩn châu Âu</li>
                      <li className="text-gray-700">Hệ thống làm lạnh mạnh mẽ với máy lạnh hiệu suất cao</li>
                      <li className="text-gray-700">Cách nhiệt Polyurethane chuẩn quốc tế, độ dày 80mm</li>
                      <li className="text-gray-700">Thùng composite nguyên khối, chống thấm nước tuyệt đối</li>
                      <li className="text-gray-700">Khả năng duy trì nhiệt độ -18°C đến +5°C tùy nhu cầu</li>
                    </>
                  ) : (
                    <li className="text-gray-700">Thông tin đang được cập nhật</li>
                  )
                )}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className={`flex items-center justify-center gap-2 w-full sm:w-auto ${isInCompare(truck.id) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-primary hover:bg-primary/90'}`}
                onClick={handleToggleCompare}
              >
                <GitCompare className="w-5 h-5" />
                {isInCompare(truck.id) ? 'Đã thêm vào so sánh' : 'So sánh'}
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
                asChild
              >
                <a href="tel:0764678901">
                  <Phone className="w-4 h-4" /> 
                  0764.678.901
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <Tabs defaultValue="description">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
            {tabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="description" className="p-6 bg-white border rounded-b-lg mt-2">
            <h2 className="text-xl font-bold mb-4">Mô tả chi tiết {truck.name}</h2>
            
            {truck.boxType === 'đông-lạnh' ? (
              <div className="space-y-4">
                <p className="text-gray-700">
                  <strong>Xe tải {truck.name}</strong> là dòng xe tải đông lạnh chuyên dụng được thiết kế đặc biệt để vận chuyển các loại hàng hóa cần bảo quản ở nhiệt độ thấp như thực phẩm đông lạnh, thủy hải sản, sữa, thuốc và các sản phẩm y tế...
                </p>
                
                <p className="text-gray-700">
                  Với tải trọng {truck.weightText}, xe tải đông lạnh {truck.name} là lựa chọn lý tưởng cho các doanh nghiệp vừa và nhỏ chuyên vận chuyển hàng đông lạnh trong thành phố và liên tỉnh. Xe được trang bị thùng đông lạnh cao cấp với khả năng cách nhiệt vượt trội, đảm bảo duy trì nhiệt độ bên trong thùng ổn định.
                </p>

                <h3 className="font-bold text-lg mt-6">Ưu điểm nổi bật của xe tải đông lạnh {truck.name}</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-gray-700">
                    <strong>Thùng đông lạnh tiêu chuẩn:</strong> Được sản xuất theo công nghệ tiên tiến, thùng đông lạnh có cấu trúc chắc chắn, vách panel cách nhiệt Polyurethane độ dày 80mm, đảm bảo khả năng giữ lạnh tối ưu.
                  </li>
                  <li className="text-gray-700">
                    <strong>Hệ thống làm lạnh hiệu quả:</strong> Trang bị máy lạnh công suất lớn, khả năng làm lạnh nhanh và duy trì nhiệt độ ổn định từ -18°C đến +5°C tùy thuộc vào nhu cầu sử dụng.
                  </li>
                  <li className="text-gray-700">
                    <strong>Tiết kiệm nhiên liệu:</strong> Động cơ {truck.engineType || truck.engine || 'hiện đại'} tiết kiệm nhiên liệu, vận hành êm ái, chi phí bảo dưỡng thấp.
                  </li>
                  <li className="text-gray-700">
                    <strong>Tính năng an toàn:</strong> Trang bị đầy đủ các hệ thống an toàn như phanh ABS, cân bằng điện tử, túi khí, đảm bảo an toàn cho người và hàng hóa.
                  </li>
                  <li className="text-gray-700">
                    <strong>Dễ dàng vận hành:</strong> Cabin thiết kế rộng rãi, tầm nhìn thoáng, vô lăng trợ lực điện, điều hòa cabin, giúp tài xế vận hành thoải mái trong thời gian dài.
                  </li>
                </ul>

                <p className="text-gray-700 mt-4">
                  Đặc biệt, xe tải đông lạnh {truck.name} được nhập khẩu nguyên chiếc hoặc lắp ráp trong nước với linh kiện chính hãng 100%, đảm bảo chất lượng và độ bền cao, phù hợp với điều kiện đường sá và thời tiết Việt Nam.
                </p>

                <p className="text-gray-700">
                  Liên hệ ngay với chúng tôi để được tư vấn chi tiết và báo giá tốt nhất cho dòng xe tải đông lạnh {truck.name}.
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-700 mb-4">{truck.description}</p>
                <p className="text-gray-700 mb-4">
                  {truck.name} là một trong những dòng {vehicleTypeName.toLowerCase()} phổ biến trên thị trường Việt Nam hiện nay. 
                  Với thiết kế hiện đại, khả năng vận hành ổn định và độ bền cao, {truck.name} là sự lựa chọn 
                  lý tưởng cho các doanh nghiệp vận tải.
                </p>
                <p className="text-gray-700">
                  {truck.type === 'xe-tai' || truck.type === 'dau-keo' ? 
                    `Xe được trang bị động cơ ${truck.engineType || truck.engine || 'hiện đại'} mạnh mẽ và tiết kiệm nhiên liệu, 
                    cùng với hệ thống treo chắc chắn, giúp xe vận hành êm ái trên mọi địa hình.` 
                    : 
                    truck.type === 'xe-cau' ?
                    `Thiết bị được trang bị hệ thống thủy lực mạnh mẽ và linh hoạt, 
                    giúp nâng hạ hàng hóa an toàn và hiệu quả trên nhiều địa hình khác nhau.`
                    :
                    `Được thiết kế chắc chắn, bền bỉ với khả năng chịu tải cao, 
                    phù hợp cho việc vận chuyển nhiều loại hàng hóa khác nhau.`
                  }
                  {truck.type !== 'mooc' && ` Thùng xe có chiều dài ${truck.length}m, rộng rãi và thiết kế hợp lý, giúp tối ưu công suất vận chuyển.`}
                </p>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="specifications" className="p-6 bg-white border rounded-b-lg mt-2">
            <h2 className="text-xl font-bold mb-6">Thông số kỹ thuật chi tiết</h2>
            <div className="space-y-6">
              {/* Thông số chung */}
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thông số chung:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Hãng sản xuất</td>
                      <td className="py-2 font-medium">{truck.brand}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Model</td>
                      <td className="py-2 font-medium">{truck.name}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Xuất xứ</td>
                      <td className="py-2 font-medium">{truck.origin || 'Nhật Bản'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Màu sắc</td>
                      <td className="py-2 font-medium">Trắng (tùy chọn theo yêu cầu)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Năm sản xuất</td>
                      <td className="py-2 font-medium">2023-2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Kích thước & Trọng lượng */}
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Kích thước & Trọng lượng:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Kích thước tổng thể (DxRxC)</td>
                      <td className="py-2 font-medium">{truck.dimensions || '7500 x 2200 x 3200 mm'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Chiều dài cơ sở</td>
                      <td className="py-2 font-medium">{truck.wheelbaseText || '4300 mm'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Chiều dài thùng</td>
                      <td className="py-2 font-medium">{truck.length} m</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Chiều rộng thùng</td>
                      <td className="py-2 font-medium">{truck.width || 2.0} m</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Chiều cao thùng</td>
                      <td className="py-2 font-medium">{truck.height || 2.0} m</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Trọng lượng bản thân</td>
                      <td className="py-2 font-medium">{truck.kerbWeight || '4500 kg'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Tải trọng cho phép</td>
                      <td className="py-2 font-medium">{truck.weightText || '7500 kg'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Trọng lượng toàn bộ</td>
                      <td className="py-2 font-medium">{truck.grossWeight || '12000 kg'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Số người cho phép chở</td>
                      <td className="py-2 font-medium">{truck.seats || 3} người</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Động cơ */}
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Động cơ:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Kiểu động cơ</td>
                      <td className="py-2 font-medium">{truck.engineType || truck.engine || 'Diesel, 4 kỳ, 4 xi lanh thẳng hàng, tăng áp'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Model động cơ</td>
                      <td className="py-2 font-medium">{truck.engineModel || 'N04C-UT'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Dung tích xi lanh</td>
                      <td className="py-2 font-medium">{truck.engineCapacity || '4000 cc'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Công suất tối đa</td>
                      <td className="py-2 font-medium">{truck.enginePower || '150 PS'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Mô-men xoắn tối đa</td>
                      <td className="py-2 font-medium">{truck.engineTorque || '420 Nm'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Tiêu chuẩn khí thải</td>
                      <td className="py-2 font-medium">{truck.emissionStandard || 'Euro 4'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Nhiên liệu</td>
                      <td className="py-2 font-medium">{truck.fuel || 'Dầu Diesel'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Hệ thống truyền động */}
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Hệ thống truyền động:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Hộp số</td>
                      <td className="py-2 font-medium">{truck.transmission || 'Số sàn, 6 số tiến, 1 số lùi'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Ly hợp</td>
                      <td className="py-2 font-medium">{truck.clutchType || 'Đĩa ma sát khô, dẫn động thủy lực, trợ lực khí nén'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ dẫn động</td>
                      <td className="py-2 font-medium">Cầu sau</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Hệ thống treo */}
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Hệ thống treo:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Treo trước</td>
                      <td className="py-2 font-medium">{truck.frontSuspension || 'Phụ thuộc, nhíp lá, giảm chấn thủy lực'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Treo sau</td>
                      <td className="py-2 font-medium">{truck.rearSuspension || 'Phụ thuộc, nhíp lá, giảm chấn thủy lực'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Hệ thống lái */}
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Hệ thống lái:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Kiểu hệ thống lái</td>
                      <td className="py-2 font-medium">{truck.steeringType || 'Trục vít - bi recirculating'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Trợ lực</td>
                      <td className="py-2 font-medium">Thủy lực</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Hệ thống phanh */}
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Hệ thống phanh:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Phanh trước</td>
                      <td className="py-2 font-medium">{truck.frontBrake || 'Tang trống, dẫn động thủy lực, trợ lực chân không'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Phanh sau</td>
                      <td className="py-2 font-medium">{truck.rearBrake || 'Tang trống, dẫn động thủy lực, trợ lực chân không'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Phanh tay / Phanh đỗ</td>
                      <td className="py-2 font-medium">{truck.parkingBrake || 'Cơ khí, tác động lên bánh sau'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Lốp xe */}
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Lốp xe:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Lốp trước / sau</td>
                      <td className="py-2 font-medium">{truck.tires || '8.25-16 / 8.25-16'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Lốp dự phòng</td>
                      <td className="py-2 font-medium">01 bộ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Tính năng an toàn */}
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Tính năng an toàn:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Hệ thống chống bó cứng phanh (ABS)</td>
                      <td className="py-2 font-medium">Có</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống phân phối lực phanh điện tử (EBD)</td>
                      <td className="py-2 font-medium">Có</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Túi khí</td>
                      <td className="py-2 font-medium">01 túi khí cho người lái</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Dây đai an toàn</td>
                      <td className="py-2 font-medium">3 điểm, có bộ căng đai</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Tiện nghi */}
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Tiện nghi:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Điều hòa</td>
                      <td className="py-2 font-medium">Chỉnh tay</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Ghế lái</td>
                      <td className="py-2 font-medium">Điều chỉnh cơ</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Cửa sổ điện</td>
                      <td className="py-2 font-medium">Có</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Khóa cửa điện</td>
                      <td className="py-2 font-medium">Có</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống âm thanh</td>
                      <td className="py-2 font-medium">AM/FM, MP3, USB, AUX</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Tab thùng đông lạnh */}
          <TabsContent value="refrigeration" className="p-6 bg-white border rounded-b-lg mt-2">
            <h2 className="text-xl font-bold mb-6">Thông số chi tiết thùng đông lạnh</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thùng đông lạnh:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Kích thước thùng (DxRxC)</td>
                      <td className="py-2 font-medium">{truck.insideDimension || `${truck.length}m x ${truck.width}m x ${truck.height}m (Bên trong)`}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu vỏ ngoài</td>
                      <td className="py-2 font-medium">{truck.coolingBox?.outsideMaterial || 'Composite cao cấp'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu vỏ trong</td>
                      <td className="py-2 font-medium">{truck.coolingBox?.insideMaterial || 'Inox 304 dập sóng / FRP kháng khuẩn'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu sàn</td>
                      <td className="py-2 font-medium">{truck.coolingBox?.floorMaterial || 'Inox chống trượt / FRP chống trượt'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Khung xương</td>
                      <td className="py-2 font-medium">Hợp kim nhôm / FRP</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Cách nhiệt</td>
                      <td className="py-2 font-medium">Polyurethane (PU) cao cấp</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Độ dày vách</td>
                      <td className="py-2 font-medium">{truck.coolingBox?.insulationThickness || '80mm'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Độ dày sàn</td>
                      <td className="py-2 font-medium">100mm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Độ dày trần</td>
                      <td className="py-2 font-medium">80mm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Cửa sau</td>
                      <td className="py-2 font-medium">{truck.coolingBox?.doorType || '2 cánh mở 270 độ'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Kích thước cửa sau</td>
                      <td className="py-2 font-medium">{truck.coolingBox?.doorSize || `Rộng ${truck.width}m x Cao ${truck.height - 0.1}m`}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Ron cao su cửa</td>
                      <td className="py-2 font-medium">2 lớp, chịu nhiệt, chống thoát lạnh</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Bản lề</td>
                      <td className="py-2 font-medium">Inox chống rỉ</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Khóa cửa</td>
                      <td className="py-2 font-medium">Inox chống rỉ, kèm chốt an toàn</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Hệ thống làm lạnh:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Đơn vị làm lạnh</td>
                      <td className="py-2 font-medium">{truck.coolingBox?.coolingUnit || 'THERMO-KING/CARRIER'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Xuất xứ máy lạnh</td>
                      <td className="py-2 font-medium">Nhật Bản/Mỹ</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Công suất làm lạnh</td>
                      <td className="py-2 font-medium">3,500 - 5,000 kcal/h</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Loại máy nén</td>
                      <td className="py-2 font-medium">{truck.coolingBox?.compressorType || 'Piston/Scroll/Rotary'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Môi chất lạnh</td>
                      <td className="py-2 font-medium">{truck.coolingBox?.refrigerantType || 'R404A/R134A (thân thiện môi trường)'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Nhiệt độ làm lạnh</td>
                      <td className="py-2 font-medium">{truck.coolingBox?.temperatureRange || '-18°C đến +5°C (tùy chỉnh)'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống điều khiển</td>
                      <td className="py-2 font-medium">{truck.coolingBox?.temperatureControl || 'Bộ điều khiển nhiệt độ kỹ thuật số'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Nguồn cấp</td>
                      <td className="py-2 font-medium">Từ động cơ xe</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Tùy chọn nguồn điện</td>
                      <td className="py-2 font-medium">380V/220V (tùy chọn thêm)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Dàn lạnh</td>
                      <td className="py-2 font-medium">Lắp trên trần thùng</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Dàn nóng</td>
                      <td className="py-2 font-medium">Lắp phía trên cabin</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Tiện ích bổ sung:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Hệ thống chiếu sáng</td>
                      <td className="py-2 font-medium">Đèn LED bên trong thùng</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Rèm cửa</td>
                      <td className="py-2 font-medium">Màn nhựa PVC chống thoát lạnh</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống thoát nước</td>
                      <td className="py-2 font-medium">Có van xả nước đáy thùng</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Thanh chèn hàng</td>
                      <td className="py-2 font-medium">Có (tùy chọn thêm)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Sàn nhôm</td>
                      <td className="py-2 font-medium">Tùy chọn thêm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống ghi nhiệt độ</td>
                      <td className="py-2 font-medium">Tùy chọn thêm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Tab thùng bảo ôn */}
          <TabsContent value="insulated" className="p-6 bg-white border rounded-b-lg mt-2">
            <h2 className="text-xl font-bold mb-6">Thông số chi tiết thùng bảo ôn</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thùng bảo ôn:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Kích thước thùng (DxRxC)</td>
                      <td className="py-2 font-medium">{truck.insideDimension || `${truck.length}m x ${truck.width}m x ${truck.height}m (Bên trong)`}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu vỏ ngoài</td>
                      <td className="py-2 font-medium">{truck.insulatedBox?.outerMaterial || 'Composite cao cấp / Inox'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu vỏ trong</td>
                      <td className="py-2 font-medium">{truck.insulatedBox?.innerMaterial || 'Inox 304 / FRP kháng khuẩn'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu cách nhiệt</td>
                      <td className="py-2 font-medium">{truck.insulatedBox?.insulationMaterial || 'Foam PU cách nhiệt'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Độ dày vách</td>
                      <td className="py-2 font-medium">{truck.insulatedBox?.wallThickness || '50mm'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Độ dày sàn</td>
                      <td className="py-2 font-medium">{truck.insulatedBox?.floorThickness || '50mm'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Độ dày mái</td>
                      <td className="py-2 font-medium">{truck.insulatedBox?.roofThickness || '50mm'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Cửa sau</td>
                      <td className="py-2 font-medium">{truck.insulatedBox?.doorType || '2 cánh mở 270 độ'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Ron cửa</td>
                      <td className="py-2 font-medium">Ron cao su kép chống thấm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Khung xương</td>
                      <td className="py-2 font-medium">Khung thép mạ kẽm / nhôm định hình</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Phụ kiện</td>
                      <td className="py-2 font-medium">Bản lề, khóa Inox 304 chống rỉ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Tính năng bảo ôn:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Khả năng cách nhiệt</td>
                      <td className="py-2 font-medium">Duy trì nhiệt độ 2-8°C trong 8-10 giờ</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Nhiệt độ bảo quản</td>
                      <td className="py-2 font-medium">{truck.insulatedBox?.temperatureRange || '2°C đến +8°C'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Khả năng chống thấm nước</td>
                      <td className="py-2 font-medium">Hoàn toàn kín nước</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Khả năng chịu tải</td>
                      <td className="py-2 font-medium">{truck.insulatedBox?.loadingCapacity || 'Tối đa theo tải trọng xe'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống thoát nước</td>
                      <td className="py-2 font-medium">Van xả đáy thùng</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Tiện ích bổ sung:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Hệ thống chiếu sáng</td>
                      <td className="py-2 font-medium">Đèn LED bên trong thùng</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Kệ chứa hàng</td>
                      <td className="py-2 font-medium">Tùy chọn thêm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Sàn chống trượt</td>
                      <td className="py-2 font-medium">Sàn nhám, chống trơn trượt</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Thanh chèn hàng</td>
                      <td className="py-2 font-medium">Tùy chọn thêm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Tab thùng kín */}
          <TabsContent value="closed" className="p-6 bg-white border rounded-b-lg mt-2">
            <h2 className="text-xl font-bold mb-6">Thông số chi tiết thùng kín</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thông số thùng kín:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Kích thước thùng (DxRxC)</td>
                      <td className="py-2 font-medium">{truck.insideDimension || `${truck.length}m x ${truck.width}m x ${truck.height}m (Bên trong)`}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Cấu trúc khung</td>
                      <td className="py-2 font-medium">{truck.closedBox?.frameStructure || 'Khung thép mạ kẽm, sơn tĩnh điện'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu vách</td>
                      <td className="py-2 font-medium">{truck.closedBox?.panelMaterial || 'Tôn mạ kẽm / Composite / Inox'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Độ dày vách</td>
                      <td className="py-2 font-medium">{truck.closedBox?.thickness || '1.0 - 1.2 mm'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu sàn</td>
                      <td className="py-2 font-medium">{truck.closedBox?.floorMaterial || 'Gỗ/Thép chống trượt'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu mái</td>
                      <td className="py-2 font-medium">{truck.closedBox?.roofType || 'Tôn mạ kẽm / Composite / Inox'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Cửa sau</td>
                      <td className="py-2 font-medium">{truck.closedBox?.doorType || '2 cánh mở 270 độ'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống chống thấm</td>
                      <td className="py-2 font-medium">{truck.closedBox?.waterproofing || 'Gioăng cao su kín nước'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống gia cường</td>
                      <td className="py-2 font-medium">{truck.closedBox?.reinforcement || 'Xương thép gia cường'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Sơn</td>
                      <td className="py-2 font-medium">Sơn tĩnh điện chống gỉ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Tiện ích bổ sung:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Hệ thống chiếu sáng</td>
                      <td className="py-2 font-medium">Đèn LED bên trong thùng</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống chằng buộc</td>
                      <td className="py-2 font-medium">{truck.closedBox?.loadingSecurity || 'Móc chằng buộc hàng hóa'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Bậc lên xuống</td>
                      <td className="py-2 font-medium">Bậc nhôm chống trượt</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Tab thùng bạt */}
          <TabsContent value="tarpaulin" className="p-6 bg-white border rounded-b-lg mt-2">
            <h2 className="text-xl font-bold mb-6">Thông số chi tiết thùng bạt</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thông số thùng bạt:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Kích thước thùng (DxRxC)</td>
                      <td className="py-2 font-medium">{truck.insideDimension || `${truck.length}m x ${truck.width}m x ${truck.height}m (Bên trong)`}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Cấu trúc khung</td>
                      <td className="py-2 font-medium">{truck.tarpaulinBox?.frameStructure || 'Khung thép mạ kẽm, sơn tĩnh điện'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu bạt</td>
                      <td className="py-2 font-medium">{truck.tarpaulinBox?.tarpaulinMaterial || 'Bạt nhựa PVC cao cấp, chống thấm nước'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Độ dày bạt</td>
                      <td className="py-2 font-medium">{truck.tarpaulinBox?.tarpaulinThickness || '0.8 - 1.0 mm'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Loại khung</td>
                      <td className="py-2 font-medium">{truck.tarpaulinBox?.frameType || 'Khung thép chữ U'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu sàn</td>
                      <td className="py-2 font-medium">{truck.tarpaulinBox?.floorMaterial || 'Sàn gỗ/thép'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Kiểu mui phủ</td>
                      <td className="py-2 font-medium">{truck.tarpaulinBox?.coverType || 'Bạt phủ toàn bộ, có thể mở bên hông'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Tiếp cận bên hông</td>
                      <td className="py-2 font-medium">{truck.tarpaulinBox?.sideAccess ? 'Có, mở được hai bên hông' : 'Không, chỉ mở phía sau'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Tiện ích bổ sung:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Khả năng chống thấm</td>
                      <td className="py-2 font-medium">Bạt chống thấm nước 100%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống chằng buộc</td>
                      <td className="py-2 font-medium">Móc chằng buộc hàng hóa</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Bậc lên xuống</td>
                      <td className="py-2 font-medium">Bậc nhôm chống trượt</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Tab thùng lửng */}
          <TabsContent value="flatbed" className="p-6 bg-white border rounded-b-lg mt-2">
            <h2 className="text-xl font-bold mb-6">Thông số chi tiết thùng lửng</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thông số thùng lửng:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Kích thước thùng (DxRxC)</td>
                      <td className="py-2 font-medium">{truck.insideDimension || `${truck.length}m x ${truck.width}m x ${truck.flatbedBox?.sideHeight || 0.4}m (Bên trong)`}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu sàn</td>
                      <td className="py-2 font-medium">{truck.flatbedBox?.floorMaterial || 'Thép / Gỗ cứng'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Độ dày sàn</td>
                      <td className="py-2 font-medium">{truck.flatbedBox?.floorThickness || '4 - 5 mm (thép) / 20mm (gỗ)'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Chiều cao thành</td>
                      <td className="py-2 font-medium">{truck.flatbedBox?.sideHeight || 400} mm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Loại thành bên</td>
                      <td className="py-2 font-medium">{truck.flatbedBox?.sideType || 'Thép hợp kim, có thể tháo rời'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Khả năng tiếp cận</td>
                      <td className="py-2 font-medium">{truck.flatbedBox?.sideAccess || 'Mở được cả 3 bên (trừ phía cabin)'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống gia cường</td>
                      <td className="py-2 font-medium">{truck.flatbedBox?.reinforcement || 'Dầm thép chữ I chạy dọc thùng xe'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Tiện ích bổ sung:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Hệ thống chốt khóa</td>
                      <td className="py-2 font-medium">Chốt khóa thành bên chắc chắn</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống chằng buộc</td>
                      <td className="py-2 font-medium">Móc chằng buộc hàng hóa</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Bậc lên xuống</td>
                      <td className="py-2 font-medium">Bậc nhôm chống trượt</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Tab xi téc */}
          <TabsContent value="tank" className="p-6 bg-white border rounded-b-lg mt-2">
            <h2 className="text-xl font-bold mb-6">Thông số chi tiết xi téc chở xăng dầu</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thông số xi téc:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Dung tích bồn</td>
                      <td className="py-2 font-medium">{truck.tankSpec?.capacityText || truck.tankSpec?.capacity + ' lít' || '6,000 - 10,000 lít'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Số khoang</td>
                      <td className="py-2 font-medium">{truck.tankSpec?.compartments || '2-3 khoang'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu bồn</td>
                      <td className="py-2 font-medium">{truck.tankSpec?.material || 'Thép carbon Q235B / Thép không gỉ SUS304'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Độ dày thành bồn</td>
                      <td className="py-2 font-medium">{truck.tankSpec?.thickness || '4-5 mm'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Vật liệu lót trong</td>
                      <td className="py-2 font-medium">{truck.tankSpec?.liningMaterial || 'Epoxy chống ăn mòn (cho xăng dầu)'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống van</td>
                      <td className="py-2 font-medium">{truck.tankSpec?.valveSystem || 'Van đáy và van xả API tiêu chuẩn'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Áp suất làm việc</td>
                      <td className="py-2 font-medium">{truck.tankSpec?.pressureRating || '0.2 - 0.3 MPa'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống xả</td>
                      <td className="py-2 font-medium">{truck.tankSpec?.dischargingSystem || 'Bơm xả và hệ thống xả trọng lực'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống đo lường</td>
                      <td className="py-2 font-medium">{truck.tankSpec?.measurementSystem || 'Đồng hồ đo cơ khí / kỹ thuật số'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Tiện ích bổ sung:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Thiết bị an toàn</td>
                      <td className="py-2 font-medium">{truck.tankSpec?.safetyEquipment || 'Van an toàn, dây tiếp mát, thoát hơi'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống bơm</td>
                      <td className="py-2 font-medium">Bơm tự hút hoặc bơm ly tâm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống làm nóng</td>
                      <td className="py-2 font-medium">{truck.tankSpec?.heatingSystem || 'Tùy chọn cho dầu nặng'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống cách nhiệt</td>
                      <td className="py-2 font-medium">{truck.tankSpec?.insulationPresent ? 'Có' : 'Tùy chọn thêm'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Thang và đường đi</td>
                      <td className="py-2 font-medium">Thang leo và đường đi chống trượt</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Tiêu chuẩn và chứng nhận:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Chứng nhận áp lực</td>
                      <td className="py-2 font-medium">Đạt tiêu chuẩn áp lực làm việc an toàn</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Chứng nhận chống cháy nổ</td>
                      <td className="py-2 font-medium">Hệ thống điện chống cháy nổ EX</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Tiêu chuẩn vận chuyển</td>
                      <td className="py-2 font-medium">Đạt tiêu chuẩn vận chuyển xăng dầu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Tab xe cẩu */}
          <TabsContent value="crane" className="p-6 bg-white border rounded-b-lg mt-2">
  <h2 className="text-xl font-bold mb-6">Thông số chi tiết cẩu {truck.craneSpec?.craneModelName || truck.brand}</h2>
  {truck.craneSpec ? (
    <div className="space-y-6">
      {/* Thông số nâng của cẩu */}
      <div>
        <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thông số nâng:</h3>
        <table className="w-full border-collapse">
          <tbody>
            {truck.craneSpec.craneModelName && (
              <tr className="border-b">
                <td className="py-2 text-gray-600 w-1/3">Model cẩu</td>
                <td className="py-2 font-medium">{truck.craneSpec.craneModelName}</td>
              </tr>
            )}
            {truck.craneSpec.liftingCapacityText && (
              <tr className="border-b">
                <td className="py-2 text-gray-600 w-1/3">Sức nâng lớn nhất / tầm với</td>
                <td className="py-2 font-medium">{truck.craneSpec.liftingCapacityText}</td>
              </tr>
            )}
            {truck.craneSpec.maxLiftingMoment && (
              <tr className="border-b">
                <td className="py-2 text-gray-600">Momen nâng lớn nhất</td>
                <td className="py-2 font-medium">{truck.craneSpec.maxLiftingMoment}</td>
              </tr>
            )}
             {truck.craneSpec.maxLiftingHeight && (
              <tr className="border-b">
                <td className="py-2 text-gray-600">Chiều cao làm việc tối đa</td>
                <td className="py-2 font-medium">{truck.craneSpec.maxLiftingHeight}</td>
              </tr>
            )}
            {truck.craneSpec.maxWorkingRadius && (
              <tr className="border-b">
                <td className="py-2 text-gray-600">Bán kính làm việc lớn nhất</td>
                <td className="py-2 font-medium">{truck.craneSpec.maxWorkingRadius}</td>
              </tr>
            )}
            {/* Chi tiết biểu đồ tải */}
            {truck.craneSpec.detailedLiftingCapacity && truck.craneSpec.detailedLiftingCapacity.length > 0 && (
              <tr className="border-b">
                <td className="py-2 text-gray-600 align-top">Biểu đồ tải trọng</td>
                <td className="py-2 font-medium">
                  <ul className="list-disc pl-5">
                    {truck.craneSpec.detailedLiftingCapacity.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Thông số cần */}
      <div>
        <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Cần cẩu (Boom):</h3>
        <table className="w-full border-collapse">
          <tbody>
            {truck.craneSpec.boomType && (
              <tr className="border-b">
                <td className="py-2 text-gray-600 w-1/3">Loại cần</td>
                <td className="py-2 font-medium">{truck.craneSpec.boomType}</td>
              </tr>
            )}
             {truck.craneSpec.boomSections && (
              <tr className="border-b">
                <td className="py-2 text-gray-600 w-1/3">Số đoạn</td>
                <td className="py-2 font-medium">{truck.craneSpec.boomSections} đoạn</td>
              </tr>
            )}
            {truck.craneSpec.boomLength && (
              <tr className="border-b">
                <td className="py-2 text-gray-600">Chiều dài cần</td>
                <td className="py-2 font-medium">{truck.craneSpec.boomLength}</td>
              </tr>
            )}
            {truck.craneSpec.boomExtensionSpeed && (
              <tr className="border-b">
                <td className="py-2 text-gray-600">Tốc độ ra cần</td>
                <td className="py-2 font-medium">{truck.craneSpec.boomExtensionSpeed}</td>
              </tr>
            )}
            {truck.craneSpec.boomLuffingAngle && (
              <tr className="border-b">
                <td className="py-2 text-gray-600">Góc nâng cần</td>
                <td className="py-2 font-medium">{truck.craneSpec.boomLuffingAngle}</td>
              </tr>
            )}
            {truck.craneSpec.boomLuffingSpeed && (
              <tr className="border-b">
                <td className="py-2 text-gray-600">Tốc độ nâng cần</td>
                <td className="py-2 font-medium">{truck.craneSpec.boomLuffingSpeed}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Thông số tời */}
      <div>
        <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Tời (Winch):</h3>
        <table className="w-full border-collapse">
          <tbody>
            {truck.craneSpec.winchRatedSpeed && (
              <tr className="border-b">
                <td className="py-2 text-gray-600 w-1/3">Tốc độ tời định mức</td>
                <td className="py-2 font-medium">{truck.craneSpec.winchRatedSpeed}</td>
              </tr>
            )}
            {truck.craneSpec.winchHookSpeed && (
               <tr className="border-b">
                <td className="py-2 text-gray-600 w-1/3">Tốc độ móc cẩu</td>
                <td className="py-2 font-medium">{truck.craneSpec.winchHookSpeed}</td>
              </tr>
            )}
            {truck.craneSpec.winchRopeType && (
              <tr className="border-b">
                <td className="py-2 text-gray-600">Loại cáp tời</td>
                <td className="py-2 font-medium">{truck.craneSpec.winchRopeType}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Thông số xoay */}
      <div>
        <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Hệ thống xoay (Swing):</h3>
        <table className="w-full border-collapse">
          <tbody>
            {truck.craneSpec.swingAngle && (
              <tr className="border-b">
                <td className="py-2 text-gray-600 w-1/3">Góc xoay</td>
                <td className="py-2 font-medium">{truck.craneSpec.swingAngle}</td>
              </tr>
            )}
            {truck.craneSpec.swingSpeed && (
              <tr className="border-b">
                <td className="py-2 text-gray-600">Tốc độ xoay</td>
                <td className="py-2 font-medium">{truck.craneSpec.swingSpeed}</td>
              </tr>
            )}
            {truck.craneSpec.swingReductionType && (
              <tr className="border-b">
                <td className="py-2 text-gray-600">Kiểu giảm tốc xoay</td>
                <td className="py-2 font-medium">{truck.craneSpec.swingReductionType}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Chân chống */}
      <div>
        <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Chân chống (Outriggers):</h3>
        <table className="w-full border-collapse">
          <tbody>
            {truck.craneSpec.outriggersType && (
              <tr className="border-b">
                <td className="py-2 text-gray-600 w-1/3">Loại chân chống</td>
                <td className="py-2 font-medium">{truck.craneSpec.outriggersType}</td>
              </tr>
            )}
            {truck.craneSpec.outriggersFrontExtension && (
              <tr className="border-b">
                <td className="py-2 text-gray-600">Chân chống trước (mở rộng tối đa)</td>
                <td className="py-2 font-medium">{truck.craneSpec.outriggersFrontExtension}</td>
              </tr>
            )}
            {truck.craneSpec.outriggersRearExtension && (
              <tr className="border-b">
                <td className="py-2 text-gray-600">Chân chống sau (mở rộng tối đa)</td>
                <td className="py-2 font-medium">{truck.craneSpec.outriggersRearExtension}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    {/* Hệ thống thủy lực */}
    <div>
      <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Hệ thống thủy lực:</h3>
      <table className="w-full border-collapse">
        <tbody>
          {truck.craneSpec.hydraulicPumpType && (
            <tr className="border-b">
              <td className="py-2 text-gray-600 w-1/3">Loại bơm thủy lực</td>
              <td className="py-2 font-medium">{truck.craneSpec.hydraulicPumpType}</td>
            </tr>
          )}
          {/* Thay đổi ở đây: Hiển thị các thông số của hệ thống thủy lực thẳng hàng */}
          {truck.craneSpec.hydraulicOilFlow && (
            <tr className="border-b">
              <td className="py-2 text-gray-600 w-1/3">Lưu lượng dầu</td>
              <td className="py-2 font-medium">{truck.craneSpec.hydraulicOilFlow}</td>
            </tr>
          )}
          {truck.craneSpec.hydraulicOperatingPressure && (
            <tr className="border-b">
              <td className="py-2 text-gray-600 w-1/3">Áp suất dầu định mức</td>
              <td className="py-2 font-medium">{truck.craneSpec.hydraulicOperatingPressure}</td>
            </tr>
          )}
          {truck.craneSpec.hydraulicTankCapacity && (
            <tr className="border-b">
              <td className="py-2 text-gray-600 w-1/3">Dung tích thùng dầu</td>
              <td className="py-2 font-medium">{truck.craneSpec.hydraulicTankCapacity}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
      
      {/* Các thông số khác của cẩu nếu có */}
      {(truck.craneSpec.safetySystem || truck.craneSpec.controlSystem || truck.craneSpec.remoteControl !== undefined) && (
        <div>
          <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Tính năng khác:</h3>
          <table className="w-full border-collapse">
            <tbody>
              {truck.craneSpec.safetySystem && (
                <tr className="border-b">
                  <td className="py-2 text-gray-600 w-1/3">Hệ thống an toàn</td>
                  <td className="py-2 font-medium">{truck.craneSpec.safetySystem}</td>
                </tr>
              )}
              {truck.craneSpec.controlSystem && (
                <tr className="border-b">
                  <td className="py-2 text-gray-600 w-1/3">Hệ thống điều khiển</td>
                  <td className="py-2 font-medium">{truck.craneSpec.controlSystem}</td>
                </tr>
              )}
              {truck.craneSpec.remoteControl !== undefined && (
                <tr className="border-b">
                  <td className="py-2 text-gray-600 w-1/3">Điều khiển từ xa</td>
                  <td className="py-2 font-medium">{truck.craneSpec.remoteControl ? 'Có' : 'Không (Tùy chọn)'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
       <p className="mt-4 text-sm text-gray-600">
        <em>Lưu ý: Các thông số kỹ thuật trên có thể thay đổi tùy theo model xe nền và cấu hình lắp đặt thực tế. Vui lòng liên hệ để được tư vấn chi tiết.</em>
      </p>
    </div>
  ) : (
    <p>Không có thông số chi tiết cho cẩu của sản phẩm này.</p>
  )}
</TabsContent>
          
          {/* Tab mooc */}
          <TabsContent value="trailer" className="p-6 bg-white border rounded-b-lg mt-2">
            <h2 className="text-xl font-bold mb-6">Thông số chi tiết sơ mi rơ mooc</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thông số cơ bản:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Chiều dài tổng thể</td>
                      <td className="py-2 font-medium">{truck.trailerSpec?.totalLength || '12.4 m'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Số trục</td>
                      <td className="py-2 font-medium">{truck.trailerSpec?.axleCount || '3'} trục</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Loại trục</td>
                      <td className="py-2 font-medium">{truck.trailerSpec?.axleType || 'Trục rút JOST (Đức)'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Tải trọng trục</td>
                      <td className="py-2 font-medium">{truck.trailerSpec?.axleWeight || '13'} tấn/trục</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Chiều cao sàn</td>
                      <td className="py-2 font-medium">{truck.trailerSpec?.loadingHeight || '1.5 m'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Tải chốt kéo</td>
                      <td className="py-2 font-medium">{truck.trailerSpec?.kingpinLoad || '14'} tấn</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thông số khung gầm:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Hệ thống treo</td>
                      <td className="py-2 font-medium">{truck.trailerSpec?.suspensionType || 'Nhíp lá / Hệ thống treo hơi'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Khoảng cách trục bánh</td>
                      <td className="py-2 font-medium">{truck.trailerSpec?.wheelbase || '1310 + 1310 mm'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống phanh</td>
                      <td className="py-2 font-medium">{truck.trailerSpec?.brakeSystem || 'Hệ thống phanh khí nén 2 dòng'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Bán kính quay vòng</td>
                      <td className="py-2 font-medium">{truck.trailerSpec?.turningRadius || '12 m'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Thông số đặc biệt theo loại mooc */}
              {truck.trailerType === 'ben' && (
                <div>
                  <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thông số đặc biệt mooc ben:</h3>
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600 w-1/3">Hệ thống thủy lực</td>
                        <td className="py-2 font-medium">{truck.trailerSpec?.hydraulicSystem || 'Hệ thống thủy lực HYVA'}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Góc nâng thùng</td>
                        <td className="py-2 font-medium">{truck.trailerSpec?.liftingAngle || '45-50°'}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Thời gian đổ</td>
                        <td className="py-2 font-medium">{truck.trailerSpec?.dumpingTime || '35-45 giây'}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Vật liệu thùng</td>
                        <td className="py-2 font-medium">Thép cường lực Q345B</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              {truck.trailerType === 'xương' && (
                <div>
                  <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thông số đặc biệt mooc xương:</h3>
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600 w-1/3">Khóa container</td>
                        <td className="py-2 font-medium">{truck.trailerSpec?.containerLock || '4 bộ khóa xoay'}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Kích thước container</td>
                        <td className="py-2 font-medium">20ft, 40ft</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Chiều cao khung gầm</td>
                        <td className="py-2 font-medium">1.4 m (tiêu chuẩn)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              {truck.trailerType === 'sàn-rút' && (
                <div>
                  <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thông số đặc biệt mooc sàn rút:</h3>
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600 w-1/3">Chiều dài mở rộng</td>
                        <td className="py-2 font-medium">{truck.trailerSpec?.extensionLength || '2-3 m'}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Hệ thống rút/kéo</td>
                        <td className="py-2 font-medium">Thủy lực hoặc cơ khí</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Vật liệu sàn</td>
                        <td className="py-2 font-medium">{truck.trailerSpec?.floorType || 'Thép cường lực'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Tab đầu kéo */}
          <TabsContent value="tractor" className="p-6 bg-white border rounded-b-lg mt-2">
            <h2 className="text-xl font-bold mb-6">Thông số chi tiết đầu kéo</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Thông số cơ bản:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Công suất động cơ</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.horsepower || '380-420'} PS</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Mô-men xoắn</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.torque || '1800-2000'} Nm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Cấu hình trục</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.axleConfiguration || '6x4'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Chiều dài cơ sở</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.wheelbase || '3.9'} m</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Dung tích bình nhiên liệu</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.fuelTankCapacityText || `${truck.tractorSpec?.fuelTankCapacity || 400} lít`}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Khả năng kéo tối đa</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.maxTowingCapacityText || `${truck.tractorSpec?.maxTowingCapacity || 45} tấn`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Hệ thống truyền động:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Hộp số</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.transmission || '16 số tiến, 2 số lùi'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Loại hộp số</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.transmissionType || 'Cơ khí / Tự động'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Ly hợp</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.clutchType || 'Đĩa đơn, dẫn động thủy lực'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống phanh</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.brakingSystem || 'Phanh khí nén toàn phần, ABS'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống hãm</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.retarderSystem || 'Phanh giảm tốc động cơ / thủy lực'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gray-100 p-2 rounded">Cabin và tiện nghi:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 w-1/3">Loại cabin</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.cabinType || 'Cabin đôi / cabin đơn'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Giường nằm</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.sleepingBerth ? 'Có' : 'Không'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Điều hòa không khí</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.airConditioner ? 'Có' : 'Không'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Chiều cao chốt kéo</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.saddleHeight || '1350'} mm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Loại mâm kéo</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.fifthWheelType || 'JOST (Đức) / Holland (Mỹ)'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Hệ thống điện</td>
                      <td className="py-2 font-medium">{truck.tractorSpec?.electricSystem || '24V'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="p-6 bg-white border rounded-b-lg mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Liên hệ tư vấn</h2>
                <p className="text-gray-700 mb-6">
                  Vui lòng điền thông tin bên dưới để được tư vấn chi tiết về sản phẩm {truck.name} 
                  và nhận báo giá tốt nhất từ chúng tôi.
                </p>
                <ContactForm productName={truck.name} />
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Thông tin liên hệ</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-bold">Phòng kinh doanh:</div>
                    <div className="text-gray-700">
                      <a
                        href="tel:0764678901"
                        className="hover:underline font-semibold text-black"
                        aria-label="Gọi ngay: 0764678901"
                      >0764678901</a>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Email:</div>
                    <div className="text-gray-700">contact@xetaiviet.vn</div>
                  </div>
                  <div>
                    <div className="font-bold">Địa chỉ:</div>
                    <div className="text-gray-700">123 Đường Quốc Lộ 1A, Quận Bình Tân, TP. Hồ Chí Minh</div>
                  </div>
                  <div>
                    <div className="font-bold">Thời gian làm việc:</div>
                    <div className="text-gray-700">Thứ Hai - Thứ Bảy: 8:00 - 18:00</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Cost Estimator Section */}
        {truck && (
          <section className="my-12" id="cost-estimator-section"> {/* Thêm ID để scroll tới */}
            <CostEstimator truck={truck} />
          </section>
        )}
      
        {/* Related Products */}
        {relatedTrucks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTrucks.map(relatedTruck => (
                <TruckItem key={relatedTruck.id} truck={relatedTruck} />
              ))}
            </div>
          </div>
        )}

        {/* Related Blog Section */}
        {relatedBlogs.length > 0 && (
          <section className="mt-16">
            <div
              className="rounded-2xl shadow-xl border border-blue-100 bg-gradient-to-b from-blue-50 via-white to-white px-2 py-7 mb-2"
            >
              <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center uppercase tracking-wider">
                Bài viết liên quan về {truck.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.slice(0, 3).map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col h-full border border-blue-100">
                      <div className="aspect-video w-full overflow-hidden relative">
                        <img
                          src={post.images[0]}
                          alt={post.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <div className="flex items-center text-xs text-blue-700 mb-1 gap-2">
                          <CalendarDays className="h-4 w-4 mr-1 inline-block" />
                          {new Date(post.publishDate).toLocaleDateString('vi-VN')}
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1 inline-block" />
                          {post.readTime} phút đọc
                        </div>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 line-clamp-2 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.description}</p>
                        <span className="mt-auto inline-block px-4 py-1 text-blue-700 font-semibold bg-blue-50 rounded-full text-xs hover:bg-blue-100 transition">
                          Đọc chi tiết
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default TruckDetail;
