import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Find Your Perfect Study Partner",
    desc: "Connect with students who match your learning style.",
    img: "/public/photo-01.jpg",
  },
  {
    id: 2,
    title: "Join Study Groups",
    desc: "Collaborate, discuss and learn together.",
    img: "/public/photo-02.jpg",
  },
  {
    id: 3,
    title: "Achieve Your Goals",
    desc: "Stay motivated and track your progress.",
    img: "/public/photo-03.jpg",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  // Automatic slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
            <p className="text-lg">{slide.desc}</p>
          </div>
        </div>
      ))}

      {/* Dots navigation */}
      <div className="absolute bottom-5 w-full flex justify-center space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              current === idx ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
