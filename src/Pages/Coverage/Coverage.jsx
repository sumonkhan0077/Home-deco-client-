import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { CiSearch } from "react-icons/ci";
import AnimatedSection from "../../Utility/AnimatedSection"

const position = [23.685, 90.3563];

const Coverage = () => {
  // icon of pin
  const createCustomIcon = (projectCount = "") => {
    return L.divIcon({
      html: `
      <div class="relative">
        <!-- মেইন পিন -->
        <div class="w-8 h-8 bg-primary rounded-full border-2 border-secondary shadow-lg flex items-center justify-center text-secondary font-bold text-sm">
          ${projectCount || "?"}
        </div>
        <!-- নিচের ত্রিভুজ (পিনের ডগা) -->
        <div class="absolute top-7.5 left-4 -translate-x-1/2 w-0 h-0 
          border-l-8 border-l-transparent
          border-r-8 border-r-transparent
          border-t-8 border-t-secondary">
        </div>
      </div>
    `,
      className: "",
      iconSize: [40, 48],
      iconAnchor: [20, 48],
      popupAnchor: [0, -48],
      shadowUrl: iconShadow,
      shadowSize: [41, 41],
      shadowAnchor: [13, 41],
    });
  };

  const [locations, setLocations] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/location.json");
      const data = await res.json();
      setLocations(data);
    };
    fetchData();
  }, []);
  console.log(locations);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;

    const district = locations.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const coord = [district.latitude, district.longitude];
      // console.log(district, coord)
      // go to the location
      mapRef.current.flyTo(coord, 14);
    }
  };
  return (
    <div className="text-4xl max-w-7xl mx-auto px-6 py-16 lg:px-8 lg:py-24">
      <title>DecorNest-Coverage</title>
      <AnimatedSection variants="fadeUp">

      <div className=" mb-16 max-w-7xl mx-auto flex flex-col md:flex-row justify-between  md:items-center  gap-6 border-b border-primary/50 dark:border-white/10 pb-6">
        <div>
          <span className="text-secondary font-medium tracking-widest text-sm uppercase  flex items-center gap-2">
            <div className="inline-grid *:[grid-area:1/1]">
              <div className="status status-warning animate-ping"></div>
              <div className="status status-warning"></div>
            </div>{" "}
             <h1>Service Point</h1>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-primary dark:text-gray-100 leading-tight ">
            We are available in 64 districts!
          </h1>
        </div>

        {/* <hr /> */}
      </div>
      </AnimatedSection>
      <div className="mb-6 -mt-10">
        <AnimatedSection variants="fadeUp">

        {/* search  */}
        <form onSubmit={handleSearch}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow"
              name="location"
              placeholder="Search"
            />
          </label>
          <button type="submit" className="btn my-btn text-2xl">
            <CiSearch />
          </button>
        </form>
      </AnimatedSection>
      </div>
      <AnimatedSection variants="fadeUp">

      <div className="border w-full h-[700px] border-16 border-secondary rounded-2xl">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[670px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
              icon={createCustomIcon(center.project)}
            >
              <Popup>
                <strong className="font-bold text-3xl text-primary">
                  {center.district}
                </strong>{" "}
                <br />
                <h1 className="text-2xl text-secondary">
                  Project Complete:{" "}
                  <span className="text-primary">{center.project}</span>
                </h1>
                <h3 className="text-xl text-secondary">
                  Overall Review:{" "}
                  <span className="text-primary">{center.overall_review}</span>
                </h3>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      </AnimatedSection>
    </div>
  );
};

export default Coverage;
