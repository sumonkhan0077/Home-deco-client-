import React, { useRef, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CreateServices = ({ handleProductAdded }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [ratingError, setRatingError] = useState(false);
  const importModal = useRef(null);

  const handelModal = () => {
    importModal.current.showModal();
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const form = e.target;

    // Costs array তৈরি করো (Basic, Standard, Premium)
    const costs = [
      parseInt(form.costs0.value) || 0,
      parseInt(form.costs1.value) || 0,
      parseInt(form.costs2.value) || 0,
    ];

    const newService = {
      service_name: form.service_name.value,
      costs, // array [basic, standard, premium]
      currency: form.currency.value,
      unit: form.unit.value,
      service_category: form.service_category.value,
      service_type: form.service_type.value,
      description: form.description.value,
      time: form.time.value,
      image: form.image.value,
      rating: parseFloat(form.rating.value),
      rating_number: parseInt(form.rating_number.value),
      createdByEmail: user?.email || "admin@styledecor.com",
      createdAt: new Date().toISOString(),
    };

    // ভ্যালিডেশন
    if (newService.rating < 1 || newService.rating > 5) {
      return setRatingError(true);
    }
    setRatingError(false);

    // Backend-এ পোস্ট
    axiosSecure.post('/services', newService)
      .then((res) => {
        if (res.data.insertedId) {
          const addedService = { _id: res.data.insertedId, ...newService };
          handleProductAdded(addedService);

          Swal.fire({
            icon: "success",
            title: "Service Added!",
            text: "Your decoration service has been successfully added.",
          });

          form.reset();
          importModal.current.close();
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please try again later.",
        });
      });
  };

  return (
    <div>
      <button
        onClick={handelModal}
        className="btn bg-primary text-white text-xl font-normal"
      >
        Create Service <span className="text-2xl font-bold">+</span>
      </button>

      {/* Modal */}
      <dialog ref={importModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 max-w-xl rounded-2xl shadow-2xl">
          <h3 className="font-bold text-3xl text-primary mb-6 text-center">
            Add New Decoration Service
          </h3>

          <form onSubmit={handleAddProduct} className="space-y-5">
            {/* Image URL */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">Service Image URL</legend>
              <input
                type="text"
                name="image"
                placeholder="e.g., https://i.ibb.co/meeting1.jpg"
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                required
              />
            </fieldset>

            {/* Service Name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">Service Name</legend>
              <input
                type="text"
                name="service_name"
                placeholder="e.g., Meeting Room Minimal Decoration"
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                required
              />
            </fieldset>

            {/* Costs (3-tier pricing) */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">Pricing Packages (USD)</legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label text-sm font-medium">Basic</label>
                  <input
                    type="number"
                    name="costs0"
                    placeholder="e.g., 499"
                    className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="label text-sm font-medium">Standard</label>
                  <input
                    type="number"
                    name="costs1"
                    placeholder="e.g., 699"
                    className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="label text-sm font-medium">Premium</label>
                  <input
                    type="number"
                    name="costs2"
                    placeholder="e.g., 999"
                    className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Unit: <input
                  type="text"
                  name="unit"
                  placeholder="e.g., per room"
                  defaultValue="per room"
                  className="input input-sm input-bordered"
                />
              </p>
            </fieldset>

            {/* Currency & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">Currency</legend>
                <select
                  name="currency"
                  className="select select-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  defaultValue="USD"
                >
                  <option value="USD">USD</option>
                  <option value="BDT">BDT</option>
                </select>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">Category</legend>
                <select
                  name="service_category"
                  className="select select-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                >
                  <option disabled value="">Select Category</option>
                  <option value="meeting">Meeting</option>
                  <option value="home">Home</option>
                  <option value="wedding">Wedding</option>
                  <option value="office">Office</option>
                  <option value="seminar">Seminar</option>
                </select>
              </fieldset>
            </div>

            {/* Service Type */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">Service Type</legend>
              <select
                name="service_type"
                className="select select-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              >
                <option disabled value="">Select Type</option>
                <option value="consultation">Consultation</option>
                <option value="on-site">On-Site Decoration</option>
              </select>
            </fieldset>

            {/* Time & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">Estimated Time</legend>
                <input
                  type="text"
                  name="time"
                  placeholder="e.g., 3-5 hours"
                  defaultValue="3-5 hours"
                  className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">Description</legend>
                <textarea
                  name="description"
                  placeholder="Professional meeting room decoration with flexible pricing..."
                  className="textarea textarea-bordered w-full h-24 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                ></textarea>
              </fieldset>
            </div>

            {/* Rating & Rating Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">Rating (1-5)</legend>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  name="rating"
                  placeholder="e.g., 4.2"
                  className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">Rating Count</legend>
                <input
                  type="number"
                  min="0"
                  name="rating_number"
                  placeholder="e.g., 150"
                  className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </fieldset>
            </div>

            {/* Created By Email (Read-only) */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">Created By Email</legend>
              <input
                type="email"
                name="createdByEmail"
                defaultValue={user?.email || "admin@styledecor.com"}
                readOnly
                className="input input-bordered w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-not-allowed"
              />
            </fieldset>

            {/* Error Messages */}
            {ratingError && (
              <p className="text-red-500 text-center font-medium mt-4">
                Sorry, rating must be between 1 and 5.
              </p>
            )}

            {/* Buttons */}
            <div className="modal-action flex justify-between mt-6">
              <button
                type="submit"
                className="btn btn-primary text-white px-6 py-3 text-lg font-semibold hover:bg-primary-focus transition-all"
              >
                Add Service
              </button>
              <form method="dialog">
                <button className="btn bg-gray-500 text-white hover:bg-gray-600 px-6 py-3 text-lg font-semibold">
                  Close
                </button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CreateServices;