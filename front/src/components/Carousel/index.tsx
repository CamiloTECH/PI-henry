"use client";
import { useEffect, useRef, useState } from "react";
const images = [
  "https://mac-center.com/cdn/shop/files/iPhone15_Pink_PDP_Image_Position-5__COES_859aebaf-cb3e-4a75-ad46-49cf525fca75.jpg?v=1700296828",
  "https://mac-center.com/cdn/shop/files/iPhone15_Pink_PDP_Image_Position-1__COES_219154e7-6da8-4e44-adb5-e74aa69994be.jpg?v=1700296797",
  "https://mac-center.com/cdn/shop/files/MacBook_Air_15-in_M3_Chip_Midnight_Hero_Horizontal_Screen__USEN_x172_1305e971-27df-454c-a492-3bf85ff7a481_x172.webp?v=1709714861",
  "https://mac-center.com/cdn/shop/files/16320VM14035-9.png?v=1685717631",
];
const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 4000);

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  return (
    <div className="mb-8 relative">
      <div className="overflow-hidden relative h-64 sm:h-80 md:h-96 rounded-lg">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out transform ${
              index === currentSlide
                ? "translate-x-0"
                : index < currentSlide
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition duration-300"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition duration-300"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
