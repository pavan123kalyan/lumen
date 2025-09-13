import React, { useState } from "react";
import "./PlanManagement.css";

const PlanManagement = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: "Basic Plan", price: 19.99, features: ["5GB Data", "Basic Support"], status: "active" },
    { id: 2, name: "Premium Plan", price: 39.99, features: ["20GB Data", "Priority Support", "Advanced Analytics"], status: "active" },
    { id: 3, name: "Enterprise Plan", price: 79.99, features: ["Unlimited Data", "24/7 Support", "Custom Features"], status: "active" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    features: "",
    status: "active"
  });

  const handleAddPlan = () => {
    setEditingPlan(null);
    setFormData({ name: "", price: "", features: "", status: "active" });
    setShowForm(true);
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      features: plan.features.join(", "),
      status: plan.status
    });
    setShowForm(true);
  };

  const handleDeletePlan = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter(plan => plan.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlan = {
      id: editingPlan ? editingPlan.id : Date.now(),
      name: formData.name,
      price: parseFloat(formData.price),
      features: formData.features.split(",").map(f => f.trim()),
      status: formData.status
    };

    if (editingPlan) {
      setPlans(plans.map(plan => plan.id === editingPlan.id ? newPlan : plan));
    } else {
      setPlans([...plans, newPlan]);
    }

    setShowForm(false);
    setEditingPlan(null);
    setFormData({ name: "", price: "", features: "", status: "active" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPlan(null);
    setFormData({ name: "", price: "", features: "", status: "active" });
  };

  return (
    <div className="plan-management">
      <div className="plan-header">
        <h2>Plan Management</h2>
        <button className="btn-primary" onClick={handleAddPlan}>
          + Add New Plan
        </button>
      </div>

      {showForm && (
        <div className="plan-form-overlay">
          <div className="plan-form">
            <h3>{editingPlan ? "Edit Plan" : "Add New Plan"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Features (comma-separated)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingPlan ? "Update Plan" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="plans-grid">
        {plans.map(plan => (
          <div key={plan.id} className="plan-card">
            <div className="plan-header-card">
              <h3>{plan.name}</h3>
              <span className={`status-badge ${plan.status}`}>
                {plan.status}
              </span>
            </div>
            <div className="plan-price">
              <span className="price">${plan.price}</span>
              <span className="period">/month</span>
            </div>
            <div className="plan-features">
              <h4>Features:</h4>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="plan-actions">
              <button 
                className="btn-edit" 
                onClick={() => handleEditPlan(plan)}
              >
                Edit
              </button>
              <button 
                className="btn-delete" 
                onClick={() => handleDeletePlan(plan.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanManagement;


