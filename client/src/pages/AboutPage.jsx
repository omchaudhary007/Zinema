import React from "react";
import useCounter from "../hooks/useCounter";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const platform = [
  {
    icon: "🎬",
    title: "Wide Selection",
    description:
      "Access to hundreds of Zinemas and thousands of showtimes across the country",
  },
  {
    icon: "⚡",
    title: "Instant Booking",
    description:
      "Secure your seats in just a few taps with our lightning-fast booking system",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    description: "Book from anywhere with our responsive design and mobile app",
  },
  {
    icon: "💺",
    title: "Seat Selection",
    description: "Choose your preferred seats with our interactive seat maps",
  },
  {
    icon: "🎟️",
    title: "E-Tickets",
    description: "Receive digital tickets instantly - no printing needed",
  },
  {
    icon: "🔄",
    title: "Easy Refunds",
    description: "Cancel or modify bookings with our hassle-free refund policy",
  },
];

const AboutPage = () => {
  const [statsRef, isStatsVisible] = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "0px"
  });

  const customersCount = useCounter(5, 1000, 0, isStatsVisible);
  const cinemasCount = useCounter(200, 1000, 0, isStatsVisible);
  const bookingsCount = useCounter(10, 1000, 0, isStatsVisible);

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px]">
      <div className="relative bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Our Zinema Booking System
            </h1>
            <p className="text-xl text-gray-300">
              Revolutionizing the way you experience movies with seamless
              booking and premium entertainment
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <section className="mb-20">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 text-lg">
                Our Zinema booking system began with a simple
                mission: to make movie-going effortless and enjoyable. What
                started as a small local theater's online booking system has
                grown into a comprehensive platform serving millions of movie
                lovers nationwide.
              </p>
              <p className="text-gray-700 text-lg">
                Today, we partner with over 200 Zinemas across the country,
                offering the widest selection of movies, showtimes, and premium
                experiences like IMAX, 4DX, and Dolby Zinema.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-200 h-96 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Zinema interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-blue-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <p className="text-gray-700 text-xl text-center max-w-4xl mx-auto">
            To create unforgettable Zinematic experiences by combining
            cutting-edge technology with exceptional customer service, making
            movie booking as enjoyable as watching the film itself.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose Our Platform
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platform.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section ref={statsRef} className="bg-gray-900 text-white rounded-2xl p-12 mb-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">{customersCount}M+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">{cinemasCount}+</div>
              <div className="text-gray-300">Partner Zinemas</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">{bookingsCount}K+</div>
              <div className="text-gray-300">Daily Bookings</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-300">Customer Support</div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready for Your Next Movie Experience?
          </h2>
          <p className="text-gray-700 text-xl mb-8 max-w-2xl mx-auto">
            Join millions of movie lovers who trust our platform for their
            Zinema bookings
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors">
            Book Tickets Now
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
