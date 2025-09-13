import React, { useState } from "react";
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "User1", phone: "1234567801", email: "user1@example.com", status: "active" },
    { id: 2, name: "User2", phone: "1234567802", email: "user2@example.com", status: "inactive" },
    { id: 3, name: "User3", phone: "1234567803", email: "user3@example.com", status: "inactive" },
    { id: 4, name: "User4", phone: "1234567804", email: "user4@example.com", status: "active" },
    { id: 5, name: "User5", phone: "1234567805", email: "user5@example.com", status: "active" },
    { id: 6, name: "User6", phone: "1234567806", email: "user6@example.com", status: "inactive" },
    { id: 7, name: "User7", phone: "1234567807", email: "user7@example.com", status: "active" },
    { id: 8, name: "User8", phone: "1234567808", email: "user8@example.com", status: "inactive" },
    { id: 9, name: "User9", phone: "1234567809", email: "user9@example.com", status: "active" },
    { id: 10, name: "User10", phone: "1234567810", email: "user10@example.com", status: "active" },
    { id: 11, name: "User11", phone: "1234567811", email: "user11@example.com", status: "inactive" },
    { id: 12, name: "User12", phone: "1234567812", email: "user12@example.com", status: "active" },
    { id: 13, name: "User13", phone: "1234567813", email: "user13@example.com", status: "inactive" },
    { id: 14, name: "User14", phone: "1234567814", email: "user14@example.com", status: "active" },
    { id: 15, name: "User15", phone: "1234567815", email: "user15@example.com", status: "inactive" },
    { id: 16, name: "User16", phone: "1234567816", email: "user16@example.com", status: "active" },
    { id: 17, name: "User17", phone: "1234567817", email: "user17@example.com", status: "active" },
    { id: 18, name: "User18", phone: "1234567818", email: "user18@example.com", status: "inactive" },
    { id: 19, name: "User19", phone: "1234567819", email: "user19@example.com", status: "active" },
    { id: 20, name: "User20", phone: "1234567820", email: "user20@example.com", status: "active" },
    { id: 21, name: "User21", phone: "1234567821", email: "user21@example.com", status: "inactive" },
    { id: 22, name: "User22", phone: "1234567822", email: "user22@example.com", status: "active" },
    { id: 23, name: "User23", phone: "1234567823", email: "user23@example.com", status: "inactive" },
    { id: 24, name: "User24", phone: "1234567824", email: "user24@example.com", status: "active" },
    { id: 25, name: "User25", phone: "1234567825", email: "user25@example.com", status: "active" },
    { id: 26, name: "User26", phone: "1234567826", email: "user26@example.com", status: "inactive" },
    { id: 27, name: "User27", phone: "1234567827", email: "user27@example.com", status: "active" },
    { id: 28, name: "User28", phone: "1234567828", email: "user28@example.com", status: "inactive" },
    { id: 29, name: "User29", phone: "1234567829", email: "user29@example.com", status: "inactive" },
    { id: 30, name: "User30", phone: "1234567830", email: "user30@example.com", status: "active" },
    { id: 31, name: "User31", phone: "1234567831", email: "user31@example.com", status: "active" },
    { id: 32, name: "User32", phone: "1234567832", email: "user32@example.com", status: "inactive" },
    { id: 33, name: "User33", phone: "1234567833", email: "user33@example.com", status: "active" }
  ]);

  const [userActivity, setUserActivity] = useState([
    { id: 1, userId: 1, action: "Login", timestamp: "2024-01-15 09:30:00", details: "User logged in successfully" },
    { id: 2, userId: 2, action: "Logout", timestamp: "2024-01-15 10:15:00", details: "User logged out" },
    { id: 3, userId: 4, action: "Plan Change", timestamp: "2024-01-15 11:20:00", details: "Upgraded to Premium Plan" },
    { id: 4, userId: 5, action: "Payment", timestamp: "2024-01-15 12:45:00", details: "Monthly payment processed" },
    { id: 5, userId: 7, action: "Login", timestamp: "2024-01-15 14:10:00", details: "User logged in successfully" },
    { id: 6, userId: 9, action: "Data Usage", timestamp: "2024-01-15 15:30:00", details: "Reached 80% of monthly limit" },
    { id: 7, userId: 12, action: "Support", timestamp: "2024-01-15 16:00:00", details: "Contacted support for billing inquiry" },
    { id: 8, userId: 16, action: "Plan Change", timestamp: "2024-01-15 17:15:00", details: "Downgraded to Basic Plan" },
    { id: 9, userId: 20, action: "Login", timestamp: "2024-01-15 18:30:00", details: "User logged in successfully" },
    { id: 10, userId: 22, action: "Payment", timestamp: "2024-01-15 19:45:00", details: "Annual payment processed" }
  ]);

  const [filters, setFilters] = useState({
    status: "all",
    search: ""
  });

  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    status: "active"
  });

  const filteredUsers = users.filter(user => {
    const matchesStatus = filters.status === "all" || user.status === filters.status;
    const matchesSearch = filters.search === "" || 
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.phone.includes(filters.search);
    
    return matchesStatus && matchesSearch;
  });

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormData({ name: "", phone: "", email: "", status: "active" });
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      phone: user.phone,
      email: user.email,
      status: user.status
    });
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      setUsers(users.filter(user => user.id !== userId));
      setUserActivity(prev => [...prev, {
        id: Date.now(),
        userId: 0,
        action: "User Deleted",
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        details: `User ID ${userId} was deleted by admin`
      }]);
    }
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    setUserActivity(prev => [...prev, {
      id: Date.now(),
      userId: userId,
      action: "Status Change",
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
      details: `Status changed to ${newStatus}`
    }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: editingUser ? editingUser.id : Math.max(...users.map(u => u.id)) + 1,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      status: formData.status
    };

    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? newUser : user));
      setUserActivity(prev => [...prev, {
        id: Date.now(),
        userId: newUser.id,
        action: "User Updated",
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        details: `User information updated`
      }]);
    } else {
      setUsers([...users, newUser]);
      setUserActivity(prev => [...prev, {
        id: Date.now(),
        userId: newUser.id,
        action: "User Created",
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        details: `New user created`
      }]);
    }

    setShowUserModal(false);
    setEditingUser(null);
    setFormData({ name: "", phone: "", email: "", status: "active" });
  };

  const getStatusColor = (status) => {
    return status === "active" ? "#059669" : "#dc2626";
  };

  const getStatusIcon = (status) => {
    return status === "active" ? "✅" : "❌";
  };

  const getUserActivity = (userId) => {
    return userActivity.filter(activity => activity.userId === userId).slice(0, 5);
  };

  return (
    <div className="user-management">
      <div className="management-header">
        <h2>User Management</h2>
        <div className="header-actions">
          <button className="btn-export">Export Users</button>
          <button className="btn-refresh">Refresh</button>
          <button className="btn-create" onClick={handleCreateUser}>
            + Add New User
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={filters.status} 
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Search:</label>
          <input 
            type="text" 
            placeholder="Search by name, email, or phone..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>
      </div>

      <div className="users-table">
        <div className="table-header">
          <div className="table-cell">User ID</div>
          <div className="table-cell">Name</div>
          <div className="table-cell">Phone</div>
          <div className="table-cell">Email</div>
          <div className="table-cell">Status</div>
          <div className="table-cell">Activity</div>
          <div className="table-cell">Actions</div>
        </div>
        
        {filteredUsers.map(user => (
          <div key={user.id} className="table-row">
            <div className="table-cell">
              <span className="user-id">#{user.id}</span>
            </div>
            
            <div className="table-cell">
              <div className="user-info">
                <div className="user-avatar">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="user-name">{user.name}</span>
              </div>
            </div>
            
            <div className="table-cell">
              <span className="phone-number">{user.phone}</span>
            </div>
            
            <div className="table-cell">
              <span className="email">{user.email}</span>
            </div>
            
            <div className="table-cell">
              <div className="status-container">
                <span className="status-icon">{getStatusIcon(user.status)}</span>
                <select 
                  value={user.status}
                  onChange={(e) => handleStatusChange(user.id, e.target.value)}
                  className="status-select"
                  style={{ color: getStatusColor(user.status) }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="table-cell">
              <div className="activity-preview">
                {getUserActivity(user.id).length > 0 ? (
                  <div className="recent-activity">
                    <span className="activity-text">
                      {getUserActivity(user.id)[0].action}
                    </span>
                    <span className="activity-time">
                      {getUserActivity(user.id)[0].timestamp.split(' ')[0]}
                    </span>
                  </div>
                ) : (
                  <span className="no-activity">No recent activity</span>
                )}
              </div>
            </div>
            
            <div className="table-cell actions-cell">
              <button 
                className="btn-edit"
                onClick={() => handleEditUser(user)}
              >
                Edit
              </button>
              <button 
                className="btn-delete"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showUserModal && (
        <div className="modal-overlay">
          <div className="user-modal">
            <div className="modal-header">
              <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
              <button 
                className="btn-close"
                onClick={() => setShowUserModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-content">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Status:</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowUserModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingUser ? "Update User" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

