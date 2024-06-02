import Image from "next/image";

import CardsContainer from "@/components/CardsContainer";

const Home = () => {
  return (
    <div className="bg-gray-100 px-8 min-h-max py-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8 overflow-hidden rounded-full">
          <div className="relative h-64 bg-gray-200">
            <Image
              width={100}
              height={100}
              src="https://mac-center.com/cdn/shop/files/Total_Care_iPad_x172.png?v=1715797323"
              alt="Featured 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 rounded-t-lg">
              <p className="text-white font-bold text-center">Modern</p>
            </div>
          </div>
          <div className="relative h-64 bg-gray-200">
            <Image
              width={100}
              height={100}
              src="https://mac-center.com/cdn/shop/files/Apple_Watch_SE_GPS_40mm_Midnight_Aluminum_Midnight_Sport_Band_PDP_Image_2023_Position-1__COES_0269001e-4a97-4757-8246-4363cd39d8a6.jpg?v=1700486480"
              alt="Featured 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 rounded-t-lg">
              <p className="text-white font-bold text-center">Unique</p>
            </div>
          </div>
          <div className="relative h-64 bg-gray-200">
            <Image
              width={100}
              height={100}
              src="https://mac-center.com/cdn/shop/files/iMac_24-in_Blue_4-port_PDP_Image_Position-1__WWEN_1100x.jpg?v=1700301090"
              alt="Featured 3"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 rounded-t-lg">
              <p className="text-white font-bold text-center">Classic</p>
            </div>
          </div>
          <div className="relative h-64 bg-gray-200">
            <Image
              width={100}
              height={100}
              src="https://mac-center.com/cdn/shop/files/iPhone15_Pink_PDP_Image_Position-1__COES_219154e7-6da8-4e44-adb5-e74aa69994be.jpg?v=1700296797"
              alt="Featured 4"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 rounded-t-lg">
              <p className="text-white font-bold text-center">Innovative</p>
            </div>
          </div>
        </div>
        <CardsContainer />
      </div>
    </div>
  );
};

export default Home;
