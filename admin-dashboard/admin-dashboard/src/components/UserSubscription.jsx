import React, { useState } from "react";
import "./UserSubscription.css";

const UserSubscription = () => {
  const [currentPlan, setCurrentPlan] = useState({
    id: 2,
    name: "Advanced",
    price: 39.99,
    features: ["20GB Data", "Priority Support", "Advanced Analytics"],
    status: "active",
    nextBilling: "2024-01-15",
    usage: {
      dataUsed: 12.5,
      dataLimit: 20,
      percentage: 62.5
    }
  });

  const availablePlans = [
    { id: 1, name: "Basic", price: 19.99, features: ["5GB Data", "Basic Support"], recommended: false },
    { id: 2, name: "Advanced", price: 39.99, features: ["20GB Data", "Priority Support", "Advanced Analytics"], recommended: true, current: true },
    { id: 3, name: "Enterprise", price: 79.99, features: ["Unlimited Data", "24/7 Support", "Custom Features"], recommended: false }
  ];

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    setShowUpgradeModal(true);
  };

  const confirmPlanChange = () => {
    if (selectedPlan) {
      setCurrentPlan({
        ...selectedPlan,
        status: "active",
        nextBilling: "2024-01-15",
        usage: currentPlan.usage
      });
      setShowUpgradeModal(false);
      setSelectedPlan(null);
    }
  };

  const cancelSubscription = () => {
    if (window.confirm("Are you sure you want to cancel your subscription? You'll lose access to all premium features.")) {
      setCurrentPlan({
        ...currentPlan,
        status: "cancelled",
        nextBilling: "Cancelled"
      });
    }
  };

  return (
    <div className="user-subscription">
      <div className="subscription-header">
        <h2>My Subscription</h2>
        <div className="subscription-status">
          <span className={`status-badge ${currentPlan.status}`}>
            {currentPlan.status}
          </span>
        </div>
      </div>

      <div className="current-plan-card">
        <div className="plan-header">
          <h3>{currentPlan.name}</h3>
          <div className="plan-price">
            <span className="price">${currentPlan.price}</span>
            <span className="period">/month</span>
          </div>
        </div>
        
        <div className="plan-usage">
          <div className="usage-header">
            <span>Data Usage</span>
            <span>{currentPlan.usage.dataUsed}GB / {currentPlan.usage.dataLimit}GB</span>
          </div>
          <div className="usage-bar">
            <div 
              className="usage-fill" 
              style={{ width: `${currentPlan.usage.percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="plan-features">
          <h4>Features:</h4>
          <ul>
            {currentPlan.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="plan-actions">
          <button 
            className="btn-upgrade" 
            onClick={() => handlePlanChange(availablePlans[2])}
            disabled={currentPlan.id === 3}
          >
            Upgrade Plan
          </button>
          <button 
            className="btn-downgrade" 
            onClick={() => handlePlanChange(availablePlans[0])}
            disabled={currentPlan.id === 1}
          >
            Downgrade Plan
          </button>
          <button 
            className="btn-cancel" 
            onClick={cancelSubscription}
            disabled={currentPlan.status === "cancelled"}
          >
            Cancel Subscription
          </button>
        </div>
      </div>

      <div className="billing-info">
        <h3>Billing Information</h3>
        <div className="billing-details">
          <div className="billing-item">
            <span>Next Billing Date:</span>
            <span>{currentPlan.nextBilling}</span>
          </div>
          <div className="billing-item">
            <span>Payment Method:</span>
            <span>**** **** **** 1234</span>
          </div>
          <div className="billing-item">
            <span>Billing Address:</span>
            <span>123 Main St, City, State 12345</span>
          </div>
        </div>
      </div>

      {showUpgradeModal && selectedPlan && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Plan Change</h3>
            <div className="plan-comparison">
              <div className="current-plan">
                <h4>Current Plan</h4>
                <p>{currentPlan.name} - ${currentPlan.price}/month</p>
              </div>
              <div className="arrow">→</div>
              <div className="new-plan">
                <h4>New Plan</h4>
                <p>{selectedPlan.name} - ${selectedPlan.price}/month</p>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary" 
                onClick={() => setShowUpgradeModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={confirmPlanChange}
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSubscription;

