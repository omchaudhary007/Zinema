import React from "react";

const Promotional = () => {
  return (
    <div className="px-4 sm:px-8 w-full mb-12">
      <div className="flex items-center justify-center bg-red-600 text-white px-6 py-3.5 rounded-tl-2xl rounded-br-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
        <p className="text-center font-medium text-sm sm:text-base md:text-lg">
          🍿 Free Popcorn on Fridays!
          <span className="hidden sm:inline"> -</span>
          <span className="block sm:inline">🎬 Bring your friends!</span>
        </p>
      </div>
    </div>
  );
};

export default Promotional;
