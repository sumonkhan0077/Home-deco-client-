import React, { useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi'; // Install: npm install react-icons

const FilterSection = ({ onFilterApply }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Categories (your 6 home decor categories)
  const categories = [
    'Kitchen Remodeling',
    'Living Room Decoration',
    'Bedroom Interior',
    'Bathroom Renovation',
    'Wall Painting',
    'Furniture Arrangement'
  ];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');

  const handleApply = () => {
    const filters = {
      category: selectedCategory,
      min: parseInt(minBudget) || 0,
      max: parseInt(maxBudget) || Infinity,
    };
    onFilterApply(filters);
    setIsOpen(false); // Close modal after apply
  };

  const handleReset = () => {
    setSelectedCategory('');
    setMinBudget('');
    setMaxBudget('');
    onFilterApply({ category: '', min: 0, max: Infinity });
    setIsOpen(false);
  };

  return (
    <>
      {/* 3-Dots Button (visible only on mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-2xl hover:bg-primary-dark transition-all duration-300 transform hover:scale-110"
        aria-label="Open Filters"
      >
        {isOpen ? <FiX size={28} /> : <FiFilter size={28} />}
      </button>

      {/* Filter Modal (slide-up from bottom on mobile) */}
      <div
        className={` fixed inset-0 bg-[#fffaec] bg-opacity-50 z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6 transition-transform duration-500 transform ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-800">
              <FiX size={28} />
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            >
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Range */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Budget Range ($)
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                placeholder="Min"
                className="flex-1 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              />
              <input
                type="number"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                placeholder="Max"
                className="flex-1 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="flex-1 py-4 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition-all duration-300"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="flex-1 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-300"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSection;