import React from "react";
import "./WebsiteHero.css";

const WebsiteHero = ({ userRole = "admin" }) => {
  const isAdmin = userRole === "admin";
  
  return (
    <section className="website-hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome back, <span className="highlight">{isAdmin ? "Admin" : "User"}!</span>
          </h1>
          <p className="hero-subtitle">
            {isAdmin 
              ? "Here's what's happening with your Lumen admin dashboard today. Monitor plan performance, manage subscriptions, and analyze user data."
              : "Here's what's happening with your Lumen account today. Monitor your usage, manage your subscription, and discover personalized recommendations."
            }
          </p>
          <div className="hero-actions">
            {isAdmin ? (
              <>
                <button className="btn-primary">View Plan Analytics</button>
                <button className="btn-secondary">Manage Plans</button>
              </>
            ) : (
              <>
                <button className="btn-primary">View My Subscription</button>
                <button className="btn-secondary">AI Recommendations</button>
              </>
            )}
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">2.4GB</div>
            <div className="stat-label">Used This Month</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">48%</div>
            <div className="stat-label">Data Remaining</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15</div>
            <div className="stat-label">Days Left</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteHero;
