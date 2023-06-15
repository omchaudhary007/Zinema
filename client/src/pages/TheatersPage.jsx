import React, { useState } from "react";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TheaterListPage = () => {
  const navigate = useNavigate();
  const theaters = useSelector((state) => state.theater.theaters);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter theaters based on search query
  const filteredTheaters = theaters.filter((theater) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      theater.name.toLowerCase().includes(searchLower) ||
      theater.location.address.toLowerCase().includes(searchLower)
    );
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTheaters.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pt-[72px]">
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Glowing Header */}
        <header className="relative h-80 overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Zinema hero"
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="relative z-20 container mx-auto px-6 py-24 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Find Your <span className="text-red-700">Zinema</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Premium movie experiences near you
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 -mt-18 relative z-30">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by location or Zinema..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-4 px-6 rounded-full bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-700 pr-16"
              />
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-full transition-all">
                {searchQuery ? "Clear" : "Search"}
              </button>
            </div>
          </div>

          {/* Zinema Cards */}
          <div className="grid gap-4">
            {currentItems.length > 0 ? (
              currentItems.map((theater) => (
                <div
                  key={theater._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 h-auto md:h-72 group">
                  <div className="md:flex h-full">
                    {/* Zinema Image */}
                    <div className="md:w-1/3 relative group overflow-hidden">
                      <img
                        className="w-full h-64 md:h-full object-cover transform group-hover:scale-105 transition-transform duration-600"
                        src={theater.cinemaImg}
                        alt={theater.name}
                      />
                    </div>

                    {/* Zinema Info */}
                    <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">
                            {theater.name}
                          </h2>
                          <div className="flex items-center mt-2 text-gray-600">
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span>{theater.location.address}</span>
                          </div>

                          {/* Features */}
                          <div className="mt-6 flex flex-wrap gap-2">
                            {theater.amenities
                              .map((feature, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                  {feature}
                                </span>
                              ))
                              .slice(0, 3)}
                          </div>
                        </div>
                        <div className="w-auto">
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 block">
                            Open Now
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-8 flex justify-end">
                        <button
                          onClick={() => navigate(`/theater/${theater._id}`)}
                          className="flex items-center justify-center px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-all duration-300 group">
                          See What's Playing
                          <svg
                            className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No theaters found matching your search.</p>
              </div>
            )}
          </div>

          <div className="mt-12 mb-6">
            <Pagination 
              totalItems={filteredTheaters.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TheaterListPage;
