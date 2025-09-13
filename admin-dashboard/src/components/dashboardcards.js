import React from "react";
import "./DashboardCards.css";

const DashboardCards = () => {
  return (
    <div className="cards-container">
      <div className="card">
        <h3>Total Users</h3>
        <p>120</p>
      </div>
      <div className="card">
        <h3>Active Plans</h3>
        <p>35</p>
      </div>
      <div className="card">
        <h3>Cancelled Plans</h3>
        <p>10</p>
      </div>
    </div>
  );
};

export default DashboardCards;
