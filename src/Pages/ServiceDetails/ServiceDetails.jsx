import React, { useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeftLong, FaRegHeart, FaStar } from "react-icons/fa6";
import { LuShapes } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { IoHammerOutline, IoLeafOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const importModal = useRef(null);
   const navigate = useNavigate()
    const location = useLocation()

  const { data: services = {} } = useQuery({
    queryKey: ["services", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
  });
  console.log(services);

  // const paragraphs = services.description
  //   ? services.description.split("\n\n")
  //   : [];

  // const mid = Math.ceil(paragraphs.length / 2);
  // const left = paragraphs.slice(0, mid);
  // const right = paragraphs.slice(mid);

  const handelModal = () => {
    importModal.current.showModal();
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const bookingInfo = {
      servicesId: services._id,
      service_category: services.service_category,
      service_name: services.service_name,
      image:services.image,
      unit:services.unit,
      cost:e.target.package.value,
      email: user?.email,
      displayName: user?.displayName,
      event_date:new Date(e.target.date.value), 
      location: e.target.location.value,
    };
        axiosSecure.post('/booking', bookingInfo)
            .then(res => {
                if (res.data.insertedId) {
                    importModal.current.close()
                    Swal.fire({
                        title: "Your Booking is confirm!",
                        icon: "success",
                        draggable: false
                    });
                    navigate('/dashboard/my_booking')
                }
            })
            .catch(err => console.log(err))
  };
  return (
    <div>
      <div className=" ">
        <Link
          to="/services"
          className="flex  items-center mt-4 ml-12 gap-2 text-xl text-primary"
        >
          <span>
            <FaArrowLeftLong />
          </span>
          Back to Services
        </Link>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-7 flex flex-col gap-16">
              <div className="relative w-full aspect-[4/5] lg:aspect-square overflow-hidden rounded-[2rem] bg-secondary/30 group shadow-soft">
                <img
                  alt={services.service_name}
                  className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-105"
                  src={services.image}
                />
                <div className="absolute top-6 left-6">
                  <span className="rounded-full bg-white/5 backdrop-blur-xl  shadow-2xl backdrop-saturate-150 uppercase tracking-wide px-4 py-2 ">
                    {services.service_category}
                  </span>
                </div>
              </div>

              <div className="hidden lg:block border-t border-gray-100 pt-12">
                <h2 className="text-3xl text-secondary mb-8">
                  The Product Details
                </h2>
                {services.description ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* LEFT */}
                    <div className="prose prose-sm text-text-muted leading-relaxed font-serif">
                      {(() => {
                        const paragraphs =
                          services.description?.split("\n\n") || [];
                        const mid = Math.ceil(paragraphs.length / 2);
                        const left = paragraphs.slice(0, mid);

                        return left.map((p, i) => (
                          <p
                            key={i}
                            className={
                              i === 0
                                ? "mb-4 first-letter:text-4xl first-letter:font-display first-letter:text-primary first-letter:mr-2 first-letter:float-left"
                                : "mb-4"
                            }
                          >
                            {" "}
                            {p.includes("-") ? (
                              <ul className=" list-inside">
                                {" "}
                                {p.split("\n").map((line, i) => (
                                  <li className="" key={i}>
                                    {line.replace("-", "").trim()}
                                  </li>
                                ))}{" "}
                              </ul>
                            ) : (
                              <p>{p}</p>
                            )}{" "}
                          </p>
                        ));
                      })()}
                    </div>

                    {/* RIGHT */}
                    <div className="prose prose-sm text-text-muted leading-relaxed font-serif">
                      {(() => {
                        const paragraphs =
                          services.description?.split("\n\n") || [];
                        const mid = Math.ceil(paragraphs.length / 2);
                        const right = paragraphs.slice(mid);

                        return right.map((p, i) => (
                          <p key={i} className="mb-4 ">
                            {" "}
                            {p.includes("-") ? (
                              <ul className=" list-inside">
                                {" "}
                                {p.split("\n").map((line, i) => (
                                  <li className="" key={i}>
                                    {line.replace("-", "").trim()}
                                  </li>
                                ))}{" "}
                              </ul>
                            ) : (
                              <p>{p}</p>
                            )}{" "}
                          </p>
                        ));
                      })()}
                    </div>
                  </div>
                ) : (
                  <p>Loading product details...</p>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-32 space-y-10">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                      <span className=" text-[16px] text-yellow-500">
                        <FaStar />
                      </span>
                      <span className="text-sm font-bold text-yellow-500 pt-0.5">
                        {services.rating} / 5.0
                      </span>
                    </div>
                    <button className="text-text-muted hover:text-red-500 transition-colors">
                      <span className="text-xl">
                        <FaRegHeart />
                      </span>
                    </button>
                  </div>
                  <h1 className="text-4xl  lg:text-5xl text-secondary leading-[1.15] mb-4">
                    {services.service_name}
                  </h1>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-normal text-primary">
                        ${services.costs?.[0]}
                      </span>
                      <span className="text-lg text-gray-600">
                        starting from
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500">
                        Range: ${services.costs?.[0]} - ${services.costs?.[2]}{" "}
                        {services.unit && `/ ${services.unit}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="space-y-4 pt-4">
                  <button
                    onClick={handelModal}
                    class="w-full bg-primary hover:bg-transparent hover:border border-primary hover:text-primary text-white text-lg font-medium py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Place Order Now</span>
                    <span className="text-2xl group-hover:translate-x-1 transition-transform">
                      <FiShoppingCart />
                    </span>
                  </button>

                  <dialog
                    ref={importModal}
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Hello!</h3>
                      <p className="py-4">
                        Press ESC key or click the button below to close
                      </p>
                      <form onSubmit={handelSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* left  */}
                          <div>
                            {/*  Name */}
                            <fieldset className="fieldset w-full">
                              <legend className="fieldset-legend">
                                User Name
                              </legend>
                              <input
                                defaultValue={user?.displayName}
                                disabled
                                type="text"
                                className="input w-full"
                              />
                            </fieldset>
                            {/*  Category */}
                            <fieldset className="fieldset w-full">
                              <legend className="fieldset-legend">
                                Category
                              </legend>
                              <input
                                defaultValue={services.service_category}
                                disabled
                                type="text"
                                className="input w-full"
                              />
                            </fieldset>
                            {/*  Price */}
                            <fieldset className="fieldset w-full">
                              <legend className="fieldset-legend">
                                Choose Your Package
                              </legend>

                              <div className="flex flex-col gap-3">
                                <label className="label cursor-pointer justify-start gap-4">
                                  <input
                                    type="radio"
                                    name="package"
                                    className="radio radio-primary"
                                    value={services.costs?.[0]}
                                  
                                  />
                                  <span>Basic: $ {services.costs?.[0]} </span>
                                </label>

                                <label className="label cursor-pointer justify-start gap-4">
                                  <input
                                    type="radio"
                                    name="package"
                                    className="radio radio-primary"
                                    value={services.costs?.[1]}
                                    onChange={() => {
                                      // selected costs[1]
                                    }}
                                  />
                                  <span>
                                    Standard: $ {services.costs?.[1]}{" "}
                                  </span>
                                </label>

                                <label className="label cursor-pointer justify-start gap-4">
                                  <input
                                    type="radio"
                                    name="package"
                                    className="radio radio-primary"
                                    value={services.costs?.[2]}
                                    onChange={() => {
                                      // selected costs[2]
                                    }}
                                  />
                                  <span>Premium: $ {services.costs?.[2]} </span>
                                </label>
                              </div>
                            </fieldset>
                            {/*  Location */}
                            <fieldset className="fieldset w-full">
                              <legend className="fieldset-legend">
                                Location
                              </legend>
                              <input
                                required
                                defaultValue={"Savar , Dhaka"}
                                type="text"
                                name="location"
                                className="input w-full"
                              />
                            </fieldset>
                          </div>

                          {/* right  */}
                          <div>
                            {/*  email */}
                            <fieldset className="fieldset w-full">
                              <legend className="fieldset-legend">
                                User Email
                              </legend>
                              <input
                                defaultValue={user?.email}
                                disabled
                                type="email"
                                className="input w-full"
                                placeholder="User Email"
                              />
                            </fieldset>
                            {/*  name */}
                            <fieldset className="fieldset w-full">
                              <legend className="fieldset-legend">Name</legend>
                              <input
                                defaultValue={services.service_name}
                                disabled
                                type="text"
                                className="input w-full"
                              />
                            </fieldset>
                            {/*  unit */}
                            <fieldset className="fieldset w-full">
                              <legend className="fieldset-legend">Unit</legend>
                              <input
                                defaultValue={services.unit}
                                disabled
                                type="text"
                                className="input w-full"
                              />
                            </fieldset>
                            {/*  date */}
                            <fieldset className="fieldset w-full">
                              <legend className="fieldset-legend">Date</legend>
                              <input
                                required
                                type="date"
                                name="date"
                                className="input w-full"
                              />
                            </fieldset>
                          </div>
                        </div>
                        <input
                          className="btn btn-primary mt-8 w-full"
                          type="submit"
                          value="Submit"
                        />
                      </form>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
                <div className="bg-secondary py-6 px-5 rounded-2xl">
                  <h3 className=" text-lg mb-4 text-primary">Specifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-600">
                      <div className="flex text-white  items-center gap-1  text-text-muted">
                        <span className="text-primary">
                          <IoLeafOutline />
                        </span>{" "}
                        Theme
                      </div>
                      <span className="text-sm text-white font-medium text-text-main">
                        Customized Themes,
                        <br /> Elegant &amp; Modern Styling.
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-600">
                      <div className="flex text-white items-center gap-1 text-text-muted">
                        <span className="text-primary">
                          <IoHammerOutline />
                        </span>{" "}
                        Services
                      </div>
                      <span className="text-sm text-white font-medium text-text-main">
                        Full Setup, <br />
                        Fresh Flowers, Lighting &amp; Effects
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-600">
                      <div className="flex text-white items-center gap-1 text-text-muted">
                        <span className="text-primary">
                          <LuShapes />
                        </span>
                        Guarantee
                      </div>
                      <span className="text-sm text-white font-medium text-text-main">
                        On-time Setup, <br />
                        Quality & Customer Satisfaction
                      </span>
                    </div>
                  </div>
                </div>

                <div className="block lg:hidden border-t border-gray-100 pt-12">
                  <h2 className="text-3xl text-secondary mb-8">
                    The Product Details
                  </h2>
                  {services.description ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {/* LEFT */}
                      <div className="prose prose-sm text-text-muted leading-relaxed font-serif">
                        {(() => {
                          const paragraphs =
                            services.description?.split("\n\n") || [];
                          const mid = Math.ceil(paragraphs.length / 2);
                          const left = paragraphs.slice(0, mid);

                          return left.map((p, i) => (
                            <p
                              key={i}
                              className={
                                i === 0
                                  ? "mb-4 first-letter:text-4xl first-letter:font-display first-letter:text-primary first-letter:mr-2 first-letter:float-left"
                                  : "mb-4"
                              }
                            >
                              {" "}
                              {p.includes("-") ? (
                                <ul className=" list-inside">
                                  {" "}
                                  {p.split("\n").map((line, i) => (
                                    <li className="" key={i}>
                                      {line.replace("-", "").trim()}
                                    </li>
                                  ))}{" "}
                                </ul>
                              ) : (
                                <p>{p}</p>
                              )}{" "}
                            </p>
                          ));
                        })()}
                      </div>

                      {/* RIGHT */}
                      <div className="prose prose-sm text-text-muted leading-relaxed font-serif">
                        {(() => {
                          const paragraphs =
                            services.description?.split("\n\n") || [];
                          const mid = Math.ceil(paragraphs.length / 2);
                          const right = paragraphs.slice(mid);

                          return right.map((p, i) => (
                            <p key={i} className="mb-4 ">
                              {" "}
                              {p.includes("-") ? (
                                <ul className=" list-inside">
                                  {" "}
                                  {p.split("\n").map((line, i) => (
                                    <li className="" key={i}>
                                      {line.replace("-", "").trim()}
                                    </li>
                                  ))}{" "}
                                </ul>
                              ) : (
                                <p>{p}</p>
                              )}{" "}
                            </p>
                          ));
                        })()}
                      </div>
                    </div>
                  ) : (
                    <p>Loading product details...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceDetails;
