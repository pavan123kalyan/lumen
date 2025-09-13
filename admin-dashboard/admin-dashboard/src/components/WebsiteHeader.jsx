import React, { useState, useEffect, useRef } from "react";
import "./WebsiteHeader.css";

const WebsiteHeader = ({ userRole = "admin", activeTab = "dashboard", setActiveTab, navigationItems = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const handleNavClick = (tabId) => {
    if (setActiveTab) {
      setActiveTab(tabId);
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const userDetails = {
    admin: {
      name: "Admin User",
      email: "admin@lumen.com",
      plan: "Administrator",
      planPrice: "N/A",
      usage: "Full Access",
      nextBilling: "N/A"
    },
    user: {
      name: "John Smith",
      email: "john.smith@email.com",
      plan: "Premium Plan",
      planPrice: "$39.99",
      usage: "12.5GB / 20GB",
      nextBilling: "Feb 15, 2024"
    }
  };

  const currentUser = userDetails[userRole];

  return (
    <header className="website-header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#3B82F6"/>
                <path d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z" fill="white"/>
                <circle cx="22" cy="10" r="3" fill="#FBBF24"/>
              </svg>
            </div>
            <div className="logo-text">
              <span className="company-name">LUMEN</span>
              <span className="role-badge">{userRole === "admin" ? "Admin Portal" : "User Portal"}</span>
            </div>
          </div>
        </div>

        <nav className="main-nav">
          <ul className="nav-list">
            {navigationItems.map((item) => (
              <li 
                key={item.id} 
                className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              >
                <button onClick={() => handleNavClick(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <div className="search-container">
            <input type="text" placeholder="Search..." className="search-input" />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="notification-container">
            <button className="notification-btn">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </button>
          </div>

        <div className="user-profile" ref={profileRef} onClick={() => setIsProfileOpen(!isProfileOpen)}>
          <div className="user-avatar">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="user-info">
            <span className="user-name">{currentUser.name}</span>
            <span className="user-plan">{currentUser.plan}</span>
          </div>
          <button className="profile-dropdown">▼</button>
          
          {isProfileOpen && (
            <div className="profile-dropdown-menu">
              <div className="profile-header">
                <div className="profile-avatar-large">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="profile-details">
                  <h4>{currentUser.name}</h4>
                  <p>{currentUser.email}</p>
                </div>
              </div>
              
              <div className="plan-info">
                <div className="plan-detail">
                  <span className="plan-label">Current Plan:</span>
                  <span className="plan-value">{currentUser.plan}</span>
                </div>
                <div className="plan-detail">
                  <span className="plan-label">Price:</span>
                  <span className="plan-value">{currentUser.planPrice}/month</span>
                </div>
                <div className="plan-detail">
                  <span className="plan-label">Usage:</span>
                  <span className="plan-value">{currentUser.usage}</span>
                </div>
                <div className="plan-detail">
                  <span className="plan-label">Next Billing:</span>
                  <span className="plan-value">{currentUser.nextBilling}</span>
                </div>
              </div>
              
              <div className="profile-actions">
                <button className="profile-action-btn">
                  <span className="action-icon">👤</span>
                  Profile Settings
                </button>
                <button className="profile-action-btn">
                  <span className="action-icon">💳</span>
                  Billing
                </button>
                <button className="profile-action-btn">
                  <span className="action-icon">⚙️</span>
                  Preferences
                </button>
                <button className="profile-action-btn logout">
                  <span className="action-icon">🚪</span>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-list">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button onClick={() => handleNavClick(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default WebsiteHeader;
