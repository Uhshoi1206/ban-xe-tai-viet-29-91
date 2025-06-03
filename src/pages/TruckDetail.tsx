import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import Layout from '@/components/Layout';
import TruckItem from '@/components/TruckItem';
import TruckActions from '@/components/TruckActions';
import PriceQuoteDialog from '@/components/PriceQuoteDialog';
import CostEstimatorDialog from '@/components/CostEstimatorDialog';
import LoanCalculatorDialog from '@/components/LoanCalculatorDialog';
import RollingCostCalculatorDialog from '@/components/RollingCostCalculatorDialog';
import { Badge } from '@/components/ui/badge';
import { trucks } from '@/data/truckData';
import { Truck, getVehicleTypeName, getVehicleUrlPrefix } from '@/models/TruckTypes';
import { useCompare } from '@/hooks/useCompare';

const TruckDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  
  const truck = trucks.find(t => t.slug === slug);
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showPriceQuote, setShowPriceQuote] = useState(false);
  const [showCostEstimator, setShowCostEstimator] = useState(false);
  const [showLoanCalculator, setShowLoanCalculator] = useState(false);
  const [showRollingCostCalculator, setShowRollingCostCalculator] = useState(false);

  if (!truck) {
    return (
      <Layout>
        <div className="container mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold">Sản phẩm không tồn tại</h1>
          <p className="text-gray-600 mt-2">Vui lòng kiểm tra lại đường dẫn.</p>
        </div>
      </Layout>
    );
  }

  // Helper function to handle brand as string or array
  const getBrandString = (brand: string | string[]): string => {
    return Array.isArray(brand) ? brand[0] : brand;
  };

  const getBrandArray = (brand: string | string[]): string[] => {
    return Array.isArray(brand) ? brand : [brand];
  };

  // Tìm xe tương tự dựa trên thương hiệu, loại xe, và cùng tầm giá
  const getSimilarTrucks = () => {
    const brandArray = getBrandArray(truck.brand);
    
    return trucks
      .filter(t => 
        t.id !== truck.id && 
        t.type === truck.type &&
        (
          // Cùng thương hiệu
          getBrandArray(t.brand).some(brand => 
            brandArray.some(truckBrand => 
              brand.toLowerCase() === truckBrand.toLowerCase()
            )
          ) ||
          // Hoặc cùng tầm giá (±20%)
          Math.abs(t.price - truck.price) <= truck.price * 0.2
        )
      )
      .slice(0, 4);
  };

  const similarTrucks = getSimilarTrucks();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleCompareToggle = () => {
    if (isInCompare(truck.id)) {
      removeFromCompare(truck.id);
    } else {
      addToCompare(truck);
    }
  };

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: getVehicleTypeName(truck.type), href: `/${getVehicleUrlPrefix(truck.type)}` },
    { label: truck.name, href: '' }
  ];

  const renderSpecification = (title: string, value: any, unit: string = '') => {
    if (value === undefined || value === null || value === '') {
      return null;
    }

    let displayValue = value;
    if (typeof value === 'number') {
      displayValue = new Intl.NumberFormat('vi-VN').format(value);
    }

    return (
      <div className="flex justify-between py-2 border-b border-gray-200">
        <span className="text-gray-600">{title}:</span>
        <span className="font-semibold">{displayValue} {unit}</span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-gray-400">/</span>}
                {item.href ? (
                  <Link to={item.href} className="text-blue-600 hover:text-blue-800">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-700">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="relative mb-4">
              <img
                src={truck.images[activeImageIndex]}
                alt={truck.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {truck.isNew && (
                <Badge className="absolute top-4 left-4 bg-green-500">
                  Mới
                </Badge>
              )}
              {truck.isHot && (
                <Badge className="absolute top-4 right-4 bg-red-500">
                  Hot
                </Badge>
              )}
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {truck.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${truck.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer ${
                    activeImageIndex === index ? 'border-2 border-blue-500' : ''
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{truck.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-2xl font-bold text-red-600">{truck.priceText}</span>
              <Badge variant="outline">Thương hiệu: {getBrandArray(truck.brand).join(', ')}</Badge>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Trọng tải:</span>
                <span className="font-semibold">{truck.weightText}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kích thước:</span>
                <span className="font-semibold">{truck.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Xuất xứ:</span>
                <span className="font-semibold">{truck.origin || 'N/A'}</span>
              </div>
            </div>

            <TruckActions
              truck={truck}
              isInCompare={isInCompare(truck.id)}
              onCompareToggle={handleCompareToggle}
              onPriceQuote={() => setShowPriceQuote(true)}
              onCostEstimate={() => setShowCostEstimator(true)}
              onLoanCalculate={() => setShowLoanCalculator(true)}
              onRollingCostCalculate={() => setShowRollingCostCalculator(true)}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Thông số kỹ thuật</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            {renderSpecification('Loại xe', getVehicleTypeName(truck.type))}
            {renderSpecification('Thương hiệu', getBrandString(truck.brand))}
            {renderSpecification('Giá', truck.priceText)}
            {renderSpecification('Trọng tải', truck.weightText)}
            {renderSpecification('Kích thước', truck.dimensions)}
            {renderSpecification('Xuất xứ', truck.origin || 'N/A')}

            {/* Engine Specs */}
            {truck.engineModel && renderSpecification('Model động cơ', truck.engineModel)}
            {truck.engineCapacity && renderSpecification('Dung tích động cơ', truck.engineCapacity)}
            {truck.enginePower && renderSpecification('Công suất động cơ', truck.enginePower)}
            {truck.engineTorque && renderSpecification('Mô-men xoắn', truck.engineTorque)}
            {truck.emissionStandard && renderSpecification('Tiêu chuẩn khí thải', truck.emissionStandard)}

            {/* Common Specs */}
            {truck.engineType && renderSpecification('Loại động cơ', truck.engineType)}
            {truck.fuel && renderSpecification('Nhiên liệu', truck.fuel)}
            {truck.transmission && renderSpecification('Hộp số', truck.transmission)}
            {truck.wheelbaseText && renderSpecification('Chiều dài cơ sở', truck.wheelbaseText)}
            {truck.tires && renderSpecification('Lốp xe', truck.tires)}
            {truck.brakeSystem && renderSpecification('Hệ thống phanh', truck.brakeSystem)}
            {truck.cabinType && renderSpecification('Loại cabin', truck.cabinType)}
            {truck.seats && renderSpecification('Số chỗ ngồi', truck.seats)}
            {truck.steeringSystem && renderSpecification('Hệ thống lái', truck.steeringSystem)}
            {truck.suspensionType && renderSpecification('Loại hệ thống treo', truck.suspensionType)}

            {/* Chassis Specs */}
            {truck.chassisMaterial && renderSpecification('Vật liệu khung gầm', truck.chassisMaterial)}
            {truck.frontSuspension && renderSpecification('Hệ thống treo trước', truck.frontSuspension)}
            {truck.rearSuspension && renderSpecification('Hệ thống treo sau', truck.rearSuspension)}
            {truck.frontBrake && renderSpecification('Phanh trước', truck.frontBrake)}
            {truck.rearBrake && renderSpecification('Phanh sau', truck.rearBrake)}
            {truck.parkingBrake && renderSpecification('Phanh tay/phanh đỗ', truck.parkingBrake)}
            {truck.steeringType && renderSpecification('Loại hệ thống lái', truck.steeringType)}

            {/* Dimensions */}
            {truck.insideDimension && renderSpecification('Kích thước thùng bên trong (DxRxC)', truck.insideDimension)}
            {truck.groundClearance && renderSpecification('Khoảng sáng gầm xe', truck.groundClearance, 'mm')}
            {truck.wheelTrack && renderSpecification('Vết bánh xe (trước/sau)', truck.wheelTrack, 'mm')}
            {truck.turningRadius && renderSpecification('Bán kính quay vòng', truck.turningRadius, 'm')}

            {/* Weight Details */}
            {truck.grossWeight && renderSpecification('Tổng tải trọng', truck.grossWeight)}
            {truck.kerbWeight && renderSpecification('Trọng lượng không tải', truck.kerbWeight)}
            {truck.frontAxleLoad && renderSpecification('Tải trọng cầu trước', truck.frontAxleLoad)}
            {truck.rearAxleLoad && renderSpecification('Tải trọng cầu sau', truck.rearAxleLoad)}

            {/* Performance Specs */}
            {truck.maxSpeed && renderSpecification('Tốc độ tối đa', truck.maxSpeed)}
            {truck.climbingAbility && renderSpecification('Khả năng leo dốc', truck.climbingAbility)}
            {truck.fuelConsumption && renderSpecification('Mức tiêu thụ nhiên liệu', truck.fuelConsumption)}

            {/* Cabin Features */}
            {truck.cabinFeatures && renderSpecification('Tính năng cabin', truck.cabinFeatures.join(', '))}

            {/* Add more specific specs based on truck type */}
            {truck.boxType === 'đông-lạnh' && truck.coolingBox && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2">Thông số thùng đông lạnh</h3>
                {renderSpecification('Số lớp vách', truck.coolingBox.wallLayers)}
                {renderSpecification('Vật liệu vách', truck.coolingBox.wallMaterials?.join(', '))}
                {renderSpecification('Số lớp sàn', truck.coolingBox.floorLayers)}
                {renderSpecification('Vật liệu sàn', truck.coolingBox.floorMaterials?.join(', '))}
                {renderSpecification('Số lớp mái', truck.coolingBox.roofLayers)}
                {renderSpecification('Vật liệu mái', truck.coolingBox.roofMaterials?.join(', '))}
                {renderSpecification('Loại cửa', truck.coolingBox.doorType)}
                {renderSpecification('Độ dày cách nhiệt', truck.coolingBox.insulationThickness)}
                {renderSpecification('Hệ thống làm lạnh', truck.coolingBox.refrigerationSystem)}
                {renderSpecification('Phạm vi nhiệt độ', truck.coolingBox.temperatureRange)}
                {renderSpecification('Đơn vị làm lạnh', truck.coolingBox.coolingUnit)}
                {renderSpecification('Loại máy nén', truck.coolingBox.compressorType)}
                {renderSpecification('Loại môi chất lạnh', truck.coolingBox.refrigerantType)}
                {renderSpecification('Hệ thống điều khiển nhiệt độ', truck.coolingBox.temperatureControl)}
                {renderSpecification('Kích thước cửa', truck.coolingBox.doorSize)}
                {renderSpecification('Số lượng cửa', truck.coolingBox.doorCount)}
                {renderSpecification('Chiều cao bên trong thùng', truck.coolingBox.insideHeight)}
                {renderSpecification('Chiều rộng bên trong thùng', truck.coolingBox.insideWidth)}
                {renderSpecification('Chiều dài bên trong thùng', truck.coolingBox.insideLength)}
                {renderSpecification('Vật liệu bên ngoài', truck.coolingBox.outsideMaterial)}
                {renderSpecification('Vật liệu bên trong', truck.coolingBox.insideMaterial)}
                {renderSpecification('Vật liệu sàn', truck.coolingBox.floorMaterial)}
                {renderSpecification('Hệ thống an toàn hàng hóa', truck.coolingBox.loadingSecurity)}
              </>
            )}

            {truck.boxType === 'bảo-ôn' && truck.insulatedBox && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2">Thông số thùng bảo ôn</h3>
                {renderSpecification('Độ dày vách', truck.insulatedBox.wallThickness)}
                {renderSpecification('Độ dày sàn', truck.insulatedBox.floorThickness)}
                {renderSpecification('Độ dày mái', truck.insulatedBox.roofThickness)}
                {renderSpecification('Vật liệu cách nhiệt', truck.insulatedBox.insulationMaterial)}
                {renderSpecification('Vật liệu bên ngoài', truck.insulatedBox.outerMaterial)}
                {renderSpecification('Vật liệu bên trong', truck.insulatedBox.innerMaterial)}
                {renderSpecification('Loại cửa', truck.insulatedBox.doorType)}
                {renderSpecification('Số lượng cửa', truck.insulatedBox.doorCount)}
                {renderSpecification('Phạm vi nhiệt độ duy trì', truck.insulatedBox.temperatureRange)}
                {renderSpecification('Kích thước bên trong', truck.insulatedBox.insideDimension)}
                {renderSpecification('Khả năng chịu tải', truck.insulatedBox.loadingCapacity)}
              </>
            )}

            {truck.boxType === 'kín' && truck.closedBox && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2">Thông số thùng kín</h3>
                {renderSpecification('Cấu trúc khung', truck.closedBox.frameStructure)}
                {renderSpecification('Vật liệu panel', truck.closedBox.panelMaterial)}
                {renderSpecification('Độ dày', truck.closedBox.thickness)}
                {renderSpecification('Loại cửa', truck.closedBox.doorType)}
                {renderSpecification('Số lượng cửa', truck.closedBox.doorCount)}
                {renderSpecification('Loại mái', truck.closedBox.roofType)}
                {renderSpecification('Vật liệu sàn', truck.closedBox.floorMaterial)}
                {renderSpecification('Hệ thống an toàn hàng hóa', truck.closedBox.loadingSecurity)}
                {renderSpecification('Gia cường', truck.closedBox.reinforcement)}
                {renderSpecification('Chống thấm nước', truck.closedBox.waterproofing)}
              </>
            )}

            {truck.boxType === 'bạt' && truck.tarpaulinBox && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2">Thông số thùng bạt</h3>
                {renderSpecification('Cấu trúc khung', truck.tarpaulinBox.frameStructure)}
                {renderSpecification('Vật liệu bạt', truck.tarpaulinBox.tarpaulinMaterial)}
                {renderSpecification('Độ dày bạt', truck.tarpaulinBox.tarpaulinThickness)}
                {renderSpecification('Loại khung', truck.tarpaulinBox.frameType)}
                {renderSpecification('Khả năng tiếp cận từ bên hông', truck.tarpaulinBox.sideAccess ? 'Có' : 'Không')}
                {renderSpecification('Loại mui phủ', truck.tarpaulinBox.coverType)}
                {renderSpecification('Vật liệu sàn', truck.tarpaulinBox.floorMaterial)}
              </>
            )}

            {truck.boxType === 'lửng' && truck.flatbedBox && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2">Thông số thùng lửng</h3>
                {renderSpecification('Vật liệu sàn', truck.flatbedBox.floorMaterial)}
                {renderSpecification('Chiều cao thành bên', truck.flatbedBox.sideHeight)}
                {renderSpecification('Loại thành bên', truck.flatbedBox.sideType)}
                {renderSpecification('Khả năng tiếp cận bên hông', truck.flatbedBox.sideAccess)}
                {renderSpecification('Độ dày sàn', truck.flatbedBox.floorThickness)}
                {renderSpecification('Gia cường', truck.flatbedBox.reinforcement)}
              </>
            )}

            {truck.boxType === 'xi-téc' && truck.tankSpec && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2">Thông số bồn xi téc</h3>
                {renderSpecification('Dung tích', truck.tankSpec.capacity, 'lít')}
                {renderSpecification('Số ngăn', truck.tankSpec.compartments)}
                {renderSpecification('Vật liệu', truck.tankSpec.material)}
                {renderSpecification('Độ dày', truck.tankSpec.thickness)}
                {renderSpecification('Hệ thống van', truck.tankSpec.valveSystem)}
                {renderSpecification('Áp suất định mức', truck.tankSpec.pressureRating)}
                {renderSpecification('Hệ thống xả', truck.tankSpec.dischargingSystem)}
                {renderSpecification('Vật liệu lót trong', truck.tankSpec.liningMaterial)}
                {renderSpecification('Thiết bị an toàn', truck.tankSpec.safetyEquipment)}
                {renderSpecification('Có cách nhiệt không', truck.tankSpec.insulationPresent ? 'Có' : 'Không')}
                {renderSpecification('Hệ thống làm nóng', truck.tankSpec.heatingSystem)}
                {renderSpecification('Hệ thống đo lường', truck.tankSpec.measurementSystem)}
              </>
            )}

            {truck.craneType === 'cẩu-rời' && truck.craneSpec && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2">Thông số cẩu</h3>
                {renderSpecification('Sức nâng lớn nhất', truck.craneSpec.liftingCapacity, 'kg')}
                {renderSpecification('Chiều cao nâng lớn nhất', truck.craneSpec.maxLiftingHeight, 'm')}
              </>
            )}

            {truck.trailerType && truck.trailerSpec && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2">Thông số Mooc</h3>
                {renderSpecification('Số trục', truck.trailerSpec.axleCount)}
                {renderSpecification('Loại trục', truck.trailerSpec.axleType)}
                {renderSpecification('Tải trọng trục', truck.trailerSpec.axleWeight)}
                {renderSpecification('Tải trọng chốt kéo', truck.trailerSpec.kingpinLoad)}
                {renderSpecification('Loại hệ thống treo', truck.trailerSpec.suspensionType)}
                {renderSpecification('Hệ thống phanh', truck.trailerSpec.brakeSystem)}
                {renderSpecification('Loại sàn', truck.trailerSpec.floorType)}
                {renderSpecification('Độ dày sàn', truck.trailerSpec.floorThickness)}
                {renderSpecification('Chiều cao thành bên', truck.trailerSpec.sideHeight)}
                {renderSpecification('Loại ramp', truck.trailerSpec.rampType)}
                {renderSpecification('Chiều dài mở rộng', truck.trailerSpec.extensionLength)}
                {renderSpecification('Chiều dài tổng thể', truck.trailerSpec.totalLength)}
                {renderSpecification('Khoảng cách trục bánh', truck.trailerSpec.wheelbase)}
                {renderSpecification('Chiều cao sàn', truck.trailerSpec.loadingHeight)}
                {renderSpecification('Bán kính quay vòng', truck.trailerSpec.turningRadius)}
                {renderSpecification('Hệ thống thủy lực', truck.trailerSpec.hydraulicSystem)}
                {renderSpecification('Góc nâng', truck.trailerSpec.liftingAngle)}
                {renderSpecification('Thời gian đổ', truck.trailerSpec.dumpingTime)}
                {renderSpecification('Khóa container', truck.trailerSpec.containerLock)}
                {renderSpecification('Tính năng đặc biệt', truck.trailerSpec.specialFeatures?.join(', '))}
              </>
            )}

            {truck.tractorSpec && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2">Thông số Đầu Kéo</h3>
                {renderSpecification('Công suất', truck.tractorSpec.horsepower)}
                {renderSpecification('Mô-men xoắn', truck.tractorSpec.torque)}
                {renderSpecification('Hộp số', truck.tractorSpec.transmission)}
                {renderSpecification('Loại hộp số', truck.tractorSpec.transmissionType)}
                {renderSpecification('Loại ly hợp', truck.tractorSpec.clutchType)}
                {renderSpecification('Loại cabin', truck.tractorSpec.cabinType)}
                {renderSpecification('Chiều dài cơ sở', truck.tractorSpec.wheelbase)}
                {renderSpecification('Dung tích bình nhiên liệu', truck.tractorSpec.fuelTankCapacity)}
                {renderSpecification('Chiều cao yên ngựa', truck.tractorSpec.saddleHeight)}
                {renderSpecification('Loại mâm kéo', truck.tractorSpec.fifthWheelType)}
                {renderSpecification('Sức kéo tối đa', truck.tractorSpec.maxTowingCapacity)}
                {renderSpecification('Hệ thống phanh', truck.tractorSpec.brakingSystem)}
                {renderSpecification('Hệ thống hãm', truck.tractorSpec.retarderSystem)}
                {renderSpecification('Có giường nằm không', truck.tractorSpec.sleepingBerth ? 'Có' : 'Không')}
                {renderSpecification('Cấu hình trục', truck.tractorSpec.axleConfiguration)}
                {renderSpecification('Tính năng nội thất', truck.tractorSpec.interiorFeatures?.join(', '))}
                {renderSpecification('Có điều hòa không', truck.tractorSpec.airConditioner ? 'Có' : 'Không')}
                {renderSpecification('Hệ thống điện', truck.tractorSpec.electricSystem)}
              </>
            )}
          </div>
        </div>

        {truck.description && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Mô tả sản phẩm</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 leading-relaxed">{truck.description}</p>
            </div>
          </div>
        )}

        {similarTrucks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Sản phẩm tương tự</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarTrucks.map(similarTruck => (
                <TruckItem key={similarTruck.id} truck={similarTruck} />
              ))}
            </div>
          </div>
        )}
      </div>

      <PriceQuoteDialog
        isOpen={showPriceQuote}
        onClose={() => setShowPriceQuote(false)}
        truck={truck}
      />

      <CostEstimatorDialog
        isOpen={showCostEstimator}
        onClose={() => setShowCostEstimator(false)}
        truck={truck}
      />

      <LoanCalculatorDialog
        isOpen={showLoanCalculator}
        onClose={() => setShowLoanCalculator(false)}
        truck={truck}
      />
      
      <RollingCostCalculatorDialog
        isOpen={showRollingCostCalculator}
        onClose={() => setShowRollingCostCalculator(false)}
        truck={truck}
      />
    </Layout>
  );
};

export default TruckDetail;
