import React, { useRef, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UpdateServices = ({ service, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [ratingError, setRatingError] = useState(false);
  const modalRef = useRef(null);
  const formRef = useRef(null);
  console.log("servieces id up", service);

  const openModal = () => {
    modalRef.current.showModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const updatedService = {
      service_name: formData.get("service_name"),
      image: formData.get("image"),
      costs: [
        Number(formData.get("cost_basic")),
        Number(formData.get("cost_standard")),
        Number(formData.get("cost_premium")),
      ],
      currency: formData.get("currency"),
      unit: formData.get("unit"),
      service_category: formData.get("service_category"),
      service_type: formData.get("service_type"),
      description: formData.get("description"),
      time: formData.get("time"),
      rating: Number(formData.get("rating")),
      createdByEmail: user?.email,
    };
    console.log(updatedService)
    if (service.rating < 1 || service.rating > 5) {
      return setRatingError(true);
    }
    setRatingError(false);

    try {
      const res = await axiosSecure.patch(
        `/services/${service._id}`,
        updatedService
      );

      if (res.data.modifiedCount) {
        toast.success("Service updated successfully");
        modalRef.current.close();
        refetch && refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update service");
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="btn bg-primary hover:bg-green-600 rounded-full text-white"
      >
        Edit
      </button>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-xl">
          <h3 className="text-2xl font-bold mb-4 text-primary">
            Update Service
          </h3>

          {/* <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
            <label className="label">Product Image</label>
            <input
              type="text"
              name="product_image"
              placeholder="Product Image URL"
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              defaultValue={service.service_name || ""}
              required
            />

            <label className="label text-amber-600">Product Name {service.service_name || "fdfd"}</label>
            <input
              type="text"
              name="product_name"
              placeholder="Product Name"
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              defaultValue={service.service_name || ""}
              required
            />

            <label className="label">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price (USD)"
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              defaultValue={service.service_name || ""}
              required
            />

            <label className="label">Origin Country</label>
            <input
              type="text"
              name="origin_country"
              placeholder="Origin Country"
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              defaultValue={service.service_name || ""}
              required
            />

            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="label">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  name="rating"
                  placeholder="Rating (e.g. 4.5)"
                  className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  defaultValue={service.rating || ""}
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="label">Rating Number</label>
                <input
                  type="number"
                  name="rating_number"
                  placeholder="Rating Count"
                  className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  defaultValue={service.service_name || ""}
                  required
                />
              </div>
            </div>

            <label className="label">Available Quantity</label>
            <input
              type="number"
              name="available_quantity"
              placeholder="Available Quantity"
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              defaultValue={service.service_name || ""}
              required
            />

            <label className="label">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              className="textarea textarea-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              defaultValue={service.service_name || ""}
              required
            ></textarea>

            <label className="label">Exporter Email</label>
            <input
              type="email"
              name="exporter_email"
              placeholder="Exporter Email"
              defaultValue={user?.email || ""}
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
              readOnly={!!user?.email}
            />

            <div className="modal-action flex justify-between">
              <button
                type="submit"
                className="btn bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit
              </button>
              <form method="dialog">
                <button
                  onClick={() => {
                    importModal.current.close();
                    formRef.current.reset();
                  }}
                  className="btn bg-secondary text-white hover:bg-secondary-focus"
                >
                  Close
                </button>
              </form>
            </div>
          </form> */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            {/* Image URL */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">
                Service Image URL
              </legend>
              <input
                type="text"
                name="image"
                placeholder="e.g., https://i.ibb.co/meeting1.jpg"
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                defaultValue={service.image}
                required
              />
            </fieldset>

            {/* Service Name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">
                Service Name
              </legend>
              <input
                type="text"
                name="service_name"
                placeholder="e.g., Meeting Room Minimal Decoration"
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                 defaultValue={service.service_name}
                required
              />
            </fieldset>

            {/* Costs (3-tier pricing) */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">
                Pricing Packages (USD)
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label text-sm font-medium">Basic</label>
                  <input
                    type="number"
                    name="cost_basic"
                    placeholder="e.g., 499"
                    className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                     defaultValue={service.costs?.[0]}
                    required
                  />
                </div>
                <div>
                  <label className="label text-sm font-medium">Standard</label>
                  <input
                    type="number"
                    name="cost_standard"
                    placeholder="e.g., 699"
                    className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                    defaultValue={service.costs?.[1]}
                    required
                  />
                </div>
                <div>
                  <label className="label text-sm font-medium">Premium</label>
                  <input
                    type="number"
                    name="cost_premium"
                    placeholder="e.g., 999"
                    className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                    defaultValue={service.costs?.[2]}
                    required
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Unit:{" "}
                <input
                  type="text"
                  name="unit"
                  placeholder="e.g., per room"
                  
                  className="input input-sm input-bordered"
                  defaultValue={service.unit}
                />
              </p>
            </fieldset>

            {/* Currency & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">
                  Currency
                </legend>
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
                <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">
                  Category
                </legend>
                <select
                  name="service_category"
                  className="select select-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                >
                  <option disabled value="">
                    Select Category
                  </option>
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
              <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">
                Service Type
              </legend>
              <select
                name="service_type"
                className="select select-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                defaultValue={service.service_type}
                required
              >
                <option disabled value="">
                  Select Type
                </option>
                <option value="consultation">Consultation</option>
                <option value="on-site">On-Site Decoration</option>
              </select>
            </fieldset>

            {/* Time & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">
                  Estimated Time
                </legend>
                <input
                  type="text"
                  name="time"
                  placeholder="e.g., 3-5 hours"
                  defaultValue={service.time}
                  className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">
                  Description
                </legend>
                <textarea
                  name="description"
                  placeholder="Professional meeting room decoration with flexible pricing..."
                  className="textarea textarea-bordered w-full h-24 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  defaultValue={service.description}
                  required
                ></textarea>
              </fieldset>
            </div>

            {/* Rating & Rating Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">
                  Rating (1-5)
                </legend>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  name="rating"
                  placeholder="e.g., 4.2"
                  className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  defaultValue={service.rating}
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">
                  Rating Count
                </legend>
                <input
                  type="number"
                  min="0"
                  name="rating_number"
                  placeholder="e.g., 150"
                  className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  defaultValue={service.rating_number || ""}
                  required
                />
              </fieldset>
            </div>

            {/* Created By Email (Read-only) */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold text-gray-700 dark:text-gray-300">
                Created By Email
              </legend>
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

export default UpdateServices;
