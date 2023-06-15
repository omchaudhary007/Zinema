import React from "react";

export const locations = [
  {
    id: 1,
    name: "PVR Cinemas: Phoenix Marketcity",
    city: "Mumbai",
    address: "LBS Marg, Kurla West",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.715635726926!2d72.8892143153776!3d19.065265258727835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c627a20bcaa9%3A0x6f7fe8276c8b1c8e!2sPVR%20Cinemas%20Phoenix%20Marketcity!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
  },
  {
    id: 2,
    name: "INOX: R City Mall",
    city: "Mumbai",
    address: "LBS Marg, Ghatkopar West",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.755635726926!2d72.9084143153782!3d19.135265258727835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c627a20bcaa9%3A0x6f7fe8276c8b1c8e!2sINOX%20R%20City%20Mall!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
  },
  {
    id: 3,
    name: "Cinepolis: Viviana Mall",
    city: "Thane",
    address: "Eastern Express Highway",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.755635726926!2d72.9684143153798!3d19.235265258727835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c627a20bcaa9%3A0x6f7fe8276c8b1c8e!2sCinepolis%20Viviana%20Mall!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
  },
  {
    id: 4,
    name: "IMAX: Wadala",
    city: "Mumbai",
    address: "Dr. Baba Saheb Ambedkar Road",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.215635726926!2d72.8584143153779!3d19.095265258727835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c627a20bcaa9%3A0x6f7fe8276c8b1c8e!2sIMAX%20Wadala!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
  },
];

const TheaterLocations = () => {
  return (
    <section className="px-8 py-12 bg-white">
      <div className="mx-auto">
        <h2 className="text-3xl uppercase font-bold text-gray-800 mb-6">
          Our Cinemas
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map Section */}
          <div className="lg:w-2/3">
            <div className="rounded-lg overflow-hidden shadow-lg h-full">
              <iframe
                src={locations[0].mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Theater Location Map"></iframe>
            </div>
          </div>

          {/* Locations List */}
          <div className="lg:w-1/3">
            <div className="space-y-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-lg">{location.city}</h3>
                  <p className="text-gray-600">{location.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {location.address}
                  </p>
                </div>
              ))}

              <a
                href="/all-locations"
                className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium">
                View All Locations →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheaterLocations;
