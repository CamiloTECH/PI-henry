import Link from "next/link";
import Image from "next/image";
import Carousel from "@/components/Carousel";

const Landing = () => {
  return (
    <div className="bg-gray-100 min-h-max">
      <header className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">
            Welcome to Our E-commerce Store
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-8">
        <Carousel />
        <div className="text-center mb-8">
          <Link href="/home">
            <button className="px-8 py-3 bg-gray-800 text-white hover:bg-gray-700 text-lg font-semibold rounded-md shadow-md transition duration-300">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Why Shop With Us?
            </h2>
            <p className="text-gray-600">
              We offer the best products at the most competitive prices. Our
              extensive range of products ensures that you&apos;ll find exactly
              what you&apos;re looking for. With fast shipping and excellent
              customer service, shopping with us is a breeze.
            </p>
          </section>
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Top Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-gray-200 p-4 rounded-lg text-center">
                <Image
                  width={100}
                  height={100}
                  src="https://mac-center.com/cdn/shop/files/iPhone_15_Pro_Max_Natural_Titanium_PDP_Image_Position-1__COES_c580637e-3e23-44bf-81f8-dd2a33da038a.jpg?v=1700298575"
                  alt="Category 1"
                  className="w-full mx-auto mb-4 rounded-lg object-cover"
                />
                <h3 className="text-lg font-medium text-gray-800">
                  Cell phones
                </h3>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg text-center">
                <Image
                  width={100}
                  height={100}
                  src="https://mac-center.com/cdn/shop/files/MacBook_Pro_13_in_Space_Gray_PDP_Image_Position-1_MXLA_5395ce92-3d36-4483-a995-b6bb011179c0.jpg?v=1700304877"
                  alt="Category 2"
                  className="w-full mx-auto mb-4 rounded-lg object-cover"
                />
                <h3 className="text-lg font-medium text-gray-800">Computers</h3>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg text-center">
                <Image
                  width={100}
                  height={100}
                  src="https://mac-center.com/cdn/shop/files/Apple_Watch_SE_GPS_40mm_Midnight_Aluminum_Midnight_Sport_Band_PDP_Image_2023_Position-1__COES_0269001e-4a97-4757-8246-4363cd39d8a6.jpg?v=1700486480"
                  alt="Category 3"
                  className="w-full mx-auto mb-4 rounded-lg object-cover"
                />
                <h3 className="text-lg font-medium text-gray-800">
                  Smart Watches
                </h3>
              </div>
            </div>
          </section>
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Customer Reviews
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-200 rounded-lg">
                <p className="text-gray-600">
                  &quot;Great shopping experience! Fast delivery and excellent
                  customer support.&quot;
                </p>
                <p className="text-gray-800 font-medium">- John Doe</p>
              </div>
              <div className="p-4 bg-gray-200 rounded-lg">
                <p className="text-gray-600">
                  &quot;Wide variety of products. Found exactly what I needed at
                  a great price.&quot;
                </p>
                <p className="text-gray-800 font-medium">- Jane Smith</p>
              </div>
              <div className="p-4 bg-gray-200 rounded-lg">
                <p className="text-gray-600">
                  &quot;Highly recommend! Quality products and prompt
                  service.&quot;
                </p>
                <p className="text-gray-800 font-medium">- Michael Brown</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Landing;
