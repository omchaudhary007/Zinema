import React, { useEffect, useState } from "react";

const featuredMovies = [
  {
    id: 1,
    title: "Pushpa: The Rise",
    description: "Smuggler's rise against corruption.",
    imageUrl: "https://m.media-amazon.com/images/S/pv-target-images/7d27e807956470ab502f555534d4531ade27a43808791c232cac2115530e9c96.jpg",
    trailer:"https://www.youtube.com/watch?v=pKctjlxbFDQ",
  },
  {
    id: 2,
    title: "RRR",
    description: "Two freedom fighters' fierce journey.",
    imageUrl: "https://wallpapersok.com/images/hd/rrr-movie-trailer-poster-u79atg08s19esbf6.jpg",
    trailer:"https://www.youtube.com/watch?v=NgBoMJy386M",
  },
  {
    id: 3,
    title: "Barbie",
    description: "Doll questions reality and identity.",
    imageUrl: "https://images8.alphacoders.com/133/1331131.jpeg",
    trailer:"https://www.youtube.com/watch?v=pBk4NYhWNMM",
  },
  {
    id: 4,
    title: "Oppenheimer",
    description: "Man behind the atomic bomb.",
    imageUrl: "https://wallpapercave.com/wp/wp11928890.jpg",
    trailer:"https://www.youtube.com/watch?v=uYPbbksJxIg",
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === featuredMovies.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredMovies.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden pt-[70px]">
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {featuredMovies.map((movie) => (
            <div
              key={movie.id}
              className="w-full h-full flex-shrink-0 relative">
              <div className="w-full h-full relative">
                <img
                  src={movie.imageUrl}
                  className="object-cover w-full h-full"
                  alt={movie.title}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
              </div>

              <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-start text-white px-4 sm:px-8 md:px-12 lg:px-24">
                <div className="max-w-2xl">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg">
                    {movie.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 max-w-xl drop-shadow-md text-gray-200">
                    {movie.description}
                  </p>
                  <a 
                    href={movie.trailer} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base md:text-lg transition duration-300 transform hover:scale-105"
                  >
                    Watch trailer
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/75 transition"
        aria-label="Previous slide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/75 transition"
        aria-label="Next slide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-red-600 w-6 sm:w-8"
                : "bg-white/50 w-2 sm:w-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
