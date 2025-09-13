import React, { useState, useEffect } from "react";

export default function PlanForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "Fibernet",
    dataQuota: "",
    price: "",
    duration: 1,
    status: "active",
    features: []
  });

  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        type: initialData.type || "Fibernet",
        dataQuota: initialData.dataQuota || "",
        price: initialData.price || "",
        duration: initialData.duration || 1,
        status: initialData.status || "active",
        features: initialData.features || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.dataQuota || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    const planData = {
      ...formData,
      dataQuota: parseInt(formData.dataQuota),
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration)
    };

    onSubmit(planData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {initialData ? "Edit Plan" : "Add New Plan"}
            </h3>
            <p className="text-sm text-gray-600">
              {initialData ? "Update plan details and settings" : "Create a new subscription plan for your customers"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-6">
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-lg font-medium text-gray-900">Basic Information</h4>
              <p className="text-sm text-gray-600">Essential details about your subscription plan</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Plan Name */}
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Plan Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="e.g., Premium Fibernet"
                  required
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Describe the plan features and benefits..."
                />
              </div>

              {/* Plan Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                  Plan Type
                </label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="Fibernet">Fibernet</option>
                  <option value="Broadband Copper">Broadband Copper</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Quota Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-lg font-medium text-gray-900">Pricing & Quota</h4>
              <p className="text-sm text-gray-600">Set pricing and data allocation for this plan</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {/* Data Quota */}
              <div>
                <label htmlFor="dataQuota" className="block text-sm font-semibold text-gray-700 mb-2">
                  Data Quota (GB) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="dataQuota"
                    id="dataQuota"
                    value={formData.dataQuota}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="100"
                    min="1"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">GB</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                  Price ($) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 pl-8 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="29.99"
                    step="0.01"
                    min="0"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">$</span>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (months)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="duration"
                    id="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    min="1"
                    max="24"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-lg font-medium text-gray-900">Plan Features</h4>
              <p className="text-sm text-gray-600">Add features and benefits that make this plan attractive</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Features
              </label>
              <div className="flex space-x-3 mb-4">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="e.g., 24/7 customer support"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add
                </button>
              </div>
              
              {formData.features.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Added Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-800 border border-blue-200"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-150"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {initialData ? "Update Plan" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
