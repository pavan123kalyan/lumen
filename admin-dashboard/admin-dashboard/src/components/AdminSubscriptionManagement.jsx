import React, { useState } from "react";
import "./AdminSubscriptionManagement.css";

const AdminSubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      userId: "user_001",
      userName: "John Smith",
      email: "john.smith@email.com",
      plan: "Advanced",
      status: "active",
      startDate: "2024-01-01",
      nextBilling: "2024-02-01",
      amount: 39.99,
      paymentMethod: "****1234"
    },
    {
      id: 2,
      userId: "user_002",
      userName: "Sarah Johnson",
      email: "sarah.j@email.com",
      plan: "Basic",
      status: "active",
      startDate: "2024-01-15",
      nextBilling: "2024-02-15",
      amount: 19.99,
      paymentMethod: "****5678"
    },
    {
      id: 3,
      userId: "user_003",
      userName: "Mike Davis",
      email: "mike.davis@email.com",
      plan: "Basic",
      status: "active",
      startDate: "2024-01-10",
      nextBilling: "2024-02-10",
      amount: 19.99,
      paymentMethod: "****9012"
    },
    {
      id: 4,
      userId: "user_004",
      userName: "Emily Wilson",
      email: "emily.w@email.com",
      plan: "Advanced",
      status: "active",
      startDate: "2023-11-01",
      nextBilling: "2024-02-01",
      amount: 39.99,
      paymentMethod: "****3456"
    },
    {
      id: 5,
      userId: "user_005",
      userName: "Alex Chen",
      email: "alex.chen@email.com",
      plan: "Basic",
      status: "active",
      startDate: "2024-01-20",
      nextBilling: "2024-02-20",
      amount: 19.99,
      paymentMethod: "****7890"
    },
    {
      id: 6,
      userId: "user_006",
      userName: "Maria Garcia",
      email: "maria.garcia@email.com",
      plan: "Advanced",
      status: "active",
      startDate: "2024-01-05",
      nextBilling: "2024-02-05",
      amount: 39.99,
      paymentMethod: "****2468"
    },
    {
      id: 7,
      userId: "user_007",
      userName: "David Brown",
      email: "david.brown@email.com",
      plan: "Basic",
      status: "paused",
      startDate: "2023-12-15",
      nextBilling: "Paused",
      amount: 19.99,
      paymentMethod: "****1357"
    },
    {
      id: 8,
      userId: "user_008",
      userName: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      plan: "Advanced",
      status: "active",
      startDate: "2024-01-12",
      nextBilling: "2024-02-12",
      amount: 39.99,
      paymentMethod: "****9753"
    },
    {
      id: 9,
      userId: "user_009",
      userName: "Tom Wilson",
      email: "tom.wilson@email.com",
      plan: "Basic",
      status: "cancelled",
      startDate: "2023-11-20",
      nextBilling: "Cancelled",
      amount: 19.99,
      paymentMethod: "****8642"
    },
    {
      id: 10,
      userId: "user_010",
      userName: "Jennifer Lee",
      email: "jennifer.lee@email.com",
      plan: "Advanced",
      status: "active",
      startDate: "2024-01-08",
      nextBilling: "2024-02-08",
      amount: 39.99,
      paymentMethod: "****7531"
    }
  ]);

  const [filters, setFilters] = useState({
    status: "all",
    plan: "all",
    search: ""
  });

  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesStatus = filters.status === "all" || sub.status === filters.status;
    const matchesPlan = filters.plan === "all" || sub.plan === filters.plan;
    const matchesSearch = filters.search === "" || 
      sub.userName.toLowerCase().includes(filters.search.toLowerCase()) ||
      sub.email.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesPlan && matchesSearch;
  });

  const handleStatusChange = (subscriptionId, newStatus) => {
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, status: newStatus }
          : sub
      )
    );
  };

  const handlePlanChange = (subscriptionId, newPlan) => {
    const planPrices = {
      "Basic": 19.99,
      "Advanced": 39.99,
      "Enterprise": 79.99
    };
    
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, plan: newPlan, amount: planPrices[newPlan] }
          : sub
      )
    );
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "#059669";
      case "cancelled": return "#dc2626";
      case "paused": return "#d97706";
      default: return "#64748b";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return "✅";
      case "cancelled": return "❌";
      case "paused": return "⏸️";
      default: return "❓";
    }
  };

  return (
    <div className="admin-subscription-management">
      <div className="management-header">
        <h2>Subscription Management</h2>
        <div className="header-actions">
          <button className="btn-export">Export Data</button>
          <button className="btn-refresh">Refresh</button>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={filters.status} 
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="cancelled">Cancelled</option>
            <option value="paused">Paused</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Plan:</label>
          <select 
            value={filters.plan} 
            onChange={(e) => setFilters({...filters, plan: e.target.value})}
          >
            <option value="all">All Plans</option>
            <option value="Basic">Basic</option>
            <option value="Advanced">Advanced</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Search:</label>
          <input 
            type="text" 
            placeholder="Search users..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>
      </div>

      <div className="subscriptions-table">
        <div className="table-header">
          <div className="table-cell">User</div>
          <div className="table-cell">Plan</div>
          <div className="table-cell">Status</div>
          <div className="table-cell">Amount</div>
          <div className="table-cell">Next Billing</div>
          <div className="table-cell">Actions</div>
        </div>
        
        {filteredSubscriptions.length > 0 ? (
          filteredSubscriptions.map(subscription => (
            <div key={subscription.id} className="table-row">
              <div className="table-cell user-cell">
                <div className="user-info">
                  <div className="user-avatar">
                    {subscription.userName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{subscription.userName}</div>
                    <div className="user-email">{subscription.email}</div>
                  </div>
                </div>
              </div>
              
              <div className="table-cell">
                <select 
                  value={subscription.plan}
                  onChange={(e) => handlePlanChange(subscription.id, e.target.value)}
                  className="plan-select"
                >
                  <option value="Basic">Basic</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              
              <div className="table-cell">
                <div className="status-container">
                  <span className="status-icon">{getStatusIcon(subscription.status)}</span>
                  <select 
                    value={subscription.status}
                    onChange={(e) => handleStatusChange(subscription.id, e.target.value)}
                    className="status-select"
                    style={{ color: getStatusColor(subscription.status) }}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="table-cell amount-cell">
                <span className="amount">${subscription.amount}</span>
                <span className="period">/month</span>
              </div>
              
              <div className="table-cell">
                <span className="billing-date">{subscription.nextBilling}</span>
              </div>
              
              <div className="table-cell actions-cell">
                <button 
                  className="btn-view"
                  onClick={() => openUserModal(subscription)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data-message">
            <p>No subscriptions found matching the current filters.</p>
            <p>Total subscriptions: {subscriptions.length}</p>
            <p>Filtered subscriptions: {filteredSubscriptions.length}</p>
          </div>
        )}
      </div>

      {showUserModal && selectedUser && (
        <div className="modal-overlay">
          <div className="user-modal">
            <div className="modal-header">
              <h3>User Subscription Details</h3>
              <button 
                className="btn-close"
                onClick={() => setShowUserModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="user-profile">
                <div className="profile-avatar">
                  {selectedUser.userName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="profile-info">
                  <h4>{selectedUser.userName}</h4>
                  <p>{selectedUser.email}</p>
                  <p>User ID: {selectedUser.userId}</p>
                </div>
              </div>
              
              <div className="subscription-details">
                <h4>Subscription Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Current Plan:</span>
                    <span className="value">{selectedUser.plan}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Status:</span>
                    <span className="value" style={{ color: getStatusColor(selectedUser.status) }}>
                      {selectedUser.status}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Start Date:</span>
                    <span className="value">{selectedUser.startDate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Next Billing:</span>
                    <span className="value">{selectedUser.nextBilling}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Amount:</span>
                    <span className="value">${selectedUser.amount}/month</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Payment Method:</span>
                    <span className="value">{selectedUser.paymentMethod}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={() => setShowUserModal(false)}
              >
                Close
              </button>
              <button className="btn-primary">
                Edit Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubscriptionManagement;

