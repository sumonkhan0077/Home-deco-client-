import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import AnimatedSection from '../../Utility/AnimatedSection';

const BeADecorator = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [previewImage, setPreviewImage] = useState(user?.photoURL || '');

  const handleDecorator = async (data) => {
    data.email = user?.email;
    data.imageUrl = previewImage || user?.photoURL; 

    try {
      const res = await axiosSecure.post('/decorator', data);
      if (res.data.insertedId) {
        reset();

      } else if (res.data.message) {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center px-4 py-12">
      <title>DecorNest-De A decorator</title>
      <div className="card bg-base-100 shadow-2xl rounded-2xl overflow-hidden max-w-2xl w-full">
        <AnimatedSection variants="fadeUp">

        <div className="bg-primary text-white py-8 px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Become a DecorNest</h1>
          <p className="text-lg opacity-90">Join StyleDecor and showcase your decoration skills!</p>
        </div>
      </AnimatedSection>
        {/* Header */}

        {/* Form */}
        <div className="card-body p-8 md:p-10">
          <AnimatedSection variants="fadeUp">

          <form onSubmit={handleSubmit(handleDecorator)}>
              {/* Image URL + Preview */}
            <fieldset className="fieldset mt-8">
                {previewImage && (
                <div className="avatar mx-auto">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={previewImage} alt="Preview" />
                  </div>
                </div>
              )}
              <legend className="fieldset-legend font-medium">Profile Image URL</legend>
              <input
                required
                type="text"
                {...register("imageUrl")}
                defaultValue={user?.photoURL || ''}
                onChange={(e) => setPreviewImage(e.target.value)}
                className="input input-bordered w-full mb-4"
              />
              
            </fieldset>
            {/* Grid for fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* User Name */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-medium">Your Name</legend>
                  <input
                    defaultValue={user?.displayName || ''}
                    disabled
                    type="text"
                    className="input input-bordered w-full"
                  />
                </fieldset>

                {/* Expertise Type */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-medium">Expertise Type</legend>
                  <select
                    required
                    {...register("service_type", { required: true })}
                    className="select select-bordered w-full"
                  >
                    <option disabled value="">Select Type</option>
                    <option value="home">Home Decoration</option>
                    <option value="wedding">Wedding Ceremony</option>
                    <option value="office">Office Interior</option>
                    <option value="seminar">Seminar/Events</option>
                    <option value="meeting">Meeting Setup</option>
                    <option value="others">Others</option>
                  </select>
                  {errors.service_type && <p className="text-error text-sm mt-1">Required</p>}
                </fieldset>

                {/* NID */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-medium">NID Number</legend>
                  <input
                    required
                    {...register("nid", { required: true })}
                    placeholder="Enter your NID"
                    className="input input-bordered w-full"
                  />
                  {errors.nid && <p className="text-error text-sm mt-1">Required</p>}
                </fieldset>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Email */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-medium">Email</legend>
                  <input
                    defaultValue={user?.email || ''}
                    disabled
                    type="email"
                    className="input input-bordered w-full"
                  />
                </fieldset>

                {/* Decorator Name */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-medium">Decorator Name</legend>
                  <input
                    required
                    {...register("name", { required: true })}
                    placeholder="Your Decorator Name"
                    className="input input-bordered w-full"
                  />
                  {errors.name && <p className="text-error text-sm mt-1">Required</p>}
                </fieldset>

                {/* Experience */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-medium">Experience</legend>
                  <input
                    required
                    {...register("experience", { required: true })}
                    placeholder="e.g., 5 years"
                    className="input input-bordered w-full"
                  />
                  {errors.experience && <p className="text-error text-sm mt-1">Required</p>}
                </fieldset>
              </div>
            </div>

          <AnimatedSection variants="fadeUp">
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`main-btn2 w-full mt-8 text-lg font-normal ${isSubmitting ? 'loading' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </button>

      </AnimatedSection>

          </form>
      </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default BeADecorator;