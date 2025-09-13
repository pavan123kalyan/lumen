import React, { useEffect, useState } from "react";
import {
  getDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  toggleDiscountStatus,
  getDiscountAnalytics
} from "../../services/discountService";

export default function DiscountManagement() {
  const [discounts, setDiscounts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [discountsData, analyticsData] = await Promise.all([
        getDiscounts(),
        getDiscountAnalytics()
      ]);
      setDiscounts(discountsData);
      setAnalytics(analyticsData);
      setError("");
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load discount data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (discountData) => {
    try {
      if (editingDiscount) {
        await updateDiscount(editingDiscount.id, discountData);
      } else {
        await createDiscount(discountData);
      }
      setShowForm(false);
      setEditingDiscount(null);
      loadData();
    } catch (err) {
      console.error("Error saving discount:", err);
      setError("Failed to save discount.");
    }
  };

  const handleDelete = async (id) => {
    const discount = discounts.find(d => d.id === id);
    if (!discount) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete the discount "${discount.name}"? This action cannot be undone.`
    );
    
    if (!confirmed) return;
    
    try {
      await deleteDiscount(id);
      loadData();
    } catch (err) {
      console.error("Error deleting discount:", err);
      setError("Failed to delete discount.");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleDiscountStatus(id);
      loadData();
    } catch (err) {
      console.error("Error toggling discount status:", err);
      setError("Failed to update discount status.");
    }
  };

  const getStatusColor = (status) => {
    return status === "active" 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
  };

  const getTypeColor = (type) => {
    return type === "percentage" 
      ? "bg-blue-100 text-blue-800" 
      : "bg-purple-100 text-purple-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Discount Management
              </h1>
              <p className="text-gray-600">
                Create and manage promotional offers and discounts
              </p>
            </div>
            {!showForm && (
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => {
                    setEditingDiscount(null);
                    setShowForm(true);
                  }}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Discount
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Discounts</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalDiscounts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Discounts</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.activeDiscounts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Usage</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalUsage}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Savings</p>
                  <p className="text-2xl font-bold text-gray-900">${analytics.totalSavings.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading discounts...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!loading && (
          <div className="transition-all duration-300">
            {showForm ? (
              <div className="animate-fadeIn">
                <DiscountForm
                  onSubmit={handleSubmit}
                  onCancel={() => setShowForm(false)}
                  initialData={editingDiscount}
                />
              </div>
            ) : (
              <div className="animate-fadeIn">
                <DiscountTable
                  discounts={discounts}
                  onEdit={(discount) => {
                    setEditingDiscount(discount);
                    setShowForm(true);
                  }}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Discount Form Component
function DiscountForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "percentage",
    value: "",
    minAmount: "",
    maxDiscount: "",
    applicablePlans: [],
    startDate: "",
    endDate: "",
    status: "active",
    usageLimit: "",
    code: "",
    conditions: {
      newCustomersOnly: false,
      upgradeOnly: false,
      studentVerification: false,
      validIdRequired: false
    }
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        type: initialData.type || "percentage",
        value: initialData.value || "",
        minAmount: initialData.minAmount || "",
        maxDiscount: initialData.maxDiscount || "",
        applicablePlans: initialData.applicablePlans || [],
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        status: initialData.status || "active",
        usageLimit: initialData.usageLimit || "",
        code: initialData.code || "",
        conditions: initialData.conditions || {
          newCustomersOnly: false,
          upgradeOnly: false,
          studentVerification: false,
          validIdRequired: false
        }
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("conditions.")) {
      const conditionKey = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        conditions: {
          ...prev.conditions,
          [conditionKey]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const discountData = {
      ...formData,
      value: parseFloat(formData.value),
      minAmount: parseFloat(formData.minAmount) || 0,
      maxDiscount: parseFloat(formData.maxDiscount) || 0,
      usageLimit: parseInt(formData.usageLimit) || 0
    };

    onSubmit(discountData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {initialData ? "Edit Discount" : "Create New Discount"}
            </h3>
            <p className="text-sm text-gray-600">
              {initialData ? "Update discount details and settings" : "Create a new promotional discount for your customers"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-lg font-medium text-gray-900">Basic Information</h4>
              <p className="text-sm text-gray-600">Essential details about your discount</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  placeholder="e.g., New Year Special"
                  required
                />
              </div>

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
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  placeholder="Describe the discount offer..."
                />
              </div>

              <div>
                <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Code *
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  placeholder="e.g., NEWYEAR2024"
                  required
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Type
                </label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
            </div>
          </div>

          {/* Discount Details */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-lg font-medium text-gray-900">Discount Details</h4>
              <p className="text-sm text-gray-600">Set the discount value and limits</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="value" className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Value *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="value"
                    id="value"
                    value={formData.value}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                    placeholder="20"
                    min="0"
                    step={formData.type === "percentage" ? "1" : "0.01"}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">
                      {formData.type === "percentage" ? "%" : "$"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="minAmount" className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="minAmount"
                    id="minAmount"
                    value={formData.minAmount}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 pl-8 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">$</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="maxDiscount" className="block text-sm font-semibold text-gray-700 mb-2">
                  Max Discount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="maxDiscount"
                    id="maxDiscount"
                    value={formData.maxDiscount}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 pl-8 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                    placeholder="50"
                    min="0"
                    step="0.01"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">$</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Validity & Usage */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-lg font-medium text-gray-900">Validity & Usage</h4>
              <p className="text-sm text-gray-600">Set when and how the discount can be used</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="usageLimit" className="block text-sm font-semibold text-gray-700 mb-2">
                  Usage Limit
                </label>
                <input
                  type="number"
                  name="usageLimit"
                  id="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  placeholder="100"
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Conditions */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-lg font-medium text-gray-900">Conditions</h4>
              <p className="text-sm text-gray-600">Set special conditions for this discount</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="conditions.newCustomersOnly"
                  checked={formData.conditions.newCustomersOnly}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">New customers only</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="conditions.upgradeOnly"
                  checked={formData.conditions.upgradeOnly}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Upgrade only</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="conditions.studentVerification"
                  checked={formData.conditions.studentVerification}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Student verification required</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="conditions.validIdRequired"
                  checked={formData.conditions.validIdRequired}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Valid ID required</span>
              </label>
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
              className="w-full sm:w-auto px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {initialData ? "Update Discount" : "Create Discount"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Discount Table Component
function DiscountTable({ discounts, onEdit, onDelete, onToggleStatus }) {
  if (!discounts || discounts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center py-16 px-6">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Discounts Available</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Get started by creating your first promotional discount. Click "Create Discount" to begin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Active Discounts</h3>
            <p className="mt-1 text-sm text-gray-600">
              {discounts.length} {discounts.length === 1 ? 'discount' : 'discounts'} available
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Discount Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Type & Value
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Validity
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Usage
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {discounts.map((discount) => (
              <tr key={discount.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-5">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {discount.name}
                    </div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {discount.description}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Code: {discount.code}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      discount.type === "percentage" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-purple-100 text-purple-800"
                    }`}>
                      {discount.type}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {discount.type === "percentage" ? `${discount.value}%` : `$${discount.value}`}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div>{new Date(discount.startDate).toLocaleDateString()}</div>
                    <div className="text-gray-500">to {new Date(discount.endDate).toLocaleDateString()}</div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div>{discount.usedCount} / {discount.usageLimit}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(discount.usedCount / discount.usageLimit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    discount.status === "active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {discount.status}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onEdit(discount)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onToggleStatus(discount.id)}
                      className={`${
                        discount.status === "active" 
                          ? "text-yellow-600 hover:text-yellow-900" 
                          : "text-green-600 hover:text-green-900"
                      }`}
                    >
                      {discount.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => onDelete(discount.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
