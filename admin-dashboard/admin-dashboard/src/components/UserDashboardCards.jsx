import React from "react";
import "./UserDashboardCards.css";

const UserDashboardCards = () => {
  return (
    <div className="user-cards-container">
      <div className="user-card">
        <div className="card-icon">👥</div>
        <div className="card-content">
          <h3>Total Users</h3>
          <p className="card-value">2,480</p>
          <p className="card-subtitle">Active subscribers</p>
        </div>
      </div>
      
      <div className="user-card">
        <div className="card-icon">📊</div>
        <div className="card-content">
          <h3>Active Plans</h3>
          <p className="card-value">3</p>
          <p className="card-subtitle">Available plans</p>
        </div>
      </div>
      
      <div className="user-card">
        <div className="card-icon">💰</div>
        <div className="card-content">
          <h3>Monthly Revenue</h3>
          <p className="card-value">$95,000</p>
          <p className="card-subtitle">This month</p>
        </div>
      </div>
      
      <div className="user-card">
        <div className="card-icon">📈</div>
        <div className="card-content">
          <h3>Growth Rate</h3>
          <p className="card-value">+12%</p>
          <p className="card-subtitle">vs last month</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardCards;
