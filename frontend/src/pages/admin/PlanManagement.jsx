import React, { useEffect, useState } from "react";
import PlanTable from "./components/PlanTable";
import PlanForm from "./components/PlanForm";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "../../services/planService";

export default function PlanManagement() {
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Fetch plans
  const loadPlans = async () => {
    setLoading(true);
    try {
      const data = await getPlans();
      setPlans(data);
      setError("");
    } catch (err) {
      console.error("Error fetching plans:", err);
      setError("Failed to load plans. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  // Add new plan
  const handleAddClick = () => {
    setEditingPlan(null);
    setShowForm(true);
  };

  // Save (create/update)
  const handleSubmit = async (plan) => {
    try {
      if (editingPlan) {
        await updatePlan(editingPlan.id, plan);
      } else {
        await createPlan(plan);
      }
      setShowForm(false);
      setEditingPlan(null);
      loadPlans();
    } catch (err) {
      console.error("Error saving plan:", err);
      setError("Failed to save plan.");
    }
  };

  // Delete plan
  const handleDelete = async (id) => {
    const plan = plans.find(p => p.id === id);
    if (!plan) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete the plan "${plan.name}"? This action cannot be undone.`
    );
    
    if (!confirmed) return;
    
    try {
      await deletePlan(id);
      loadPlans();
    } catch (err) {
      console.error("Error deleting plan:", err);
      setError("Failed to delete plan.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Plan Management
              </h1>
              <p className="text-gray-600">
                Manage your broadband subscription plans and pricing
              </p>
            </div>
            {!showForm && (
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={handleAddClick}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Plan
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading plans...</p>
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
                <PlanForm
                  onSubmit={handleSubmit}
                  onCancel={() => setShowForm(false)}
                  initialData={editingPlan}
                />
              </div>
            ) : (
              <div className="animate-fadeIn">
                <PlanTable
                  plans={plans}
                  onEdit={(plan) => {
                    setEditingPlan(plan);
                    setShowForm(true);
                  }}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
