import React, { useState } from "react";
import WebsiteHeader from "./WebsiteHeader";
import WebsiteHero from "./WebsiteHero";
import UserDashboardCards from "./UserDashboardCards";
import UserActivity from "./UserActivity";
import UserSubscription from "./UserSubscription";
import AIRecommendations from "./AIRecommendations";
import PlanManagement from "./PlanManagement";
import PlanAnalytics from "./PlanAnalytics";
import AdminSubscriptionManagement from "./AdminSubscriptionManagement";
import UserManagement from "./UserManagement";
import WebsiteFooter from "./WebsiteFooter";
import "./UserDashboard.css";

const RoleBasedDashboard = () => {
  const [userRole, setUserRole] = useState("admin"); // "user" or "admin"
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderUserContent = () => {
    switch (activeTab) {
      case "subscription":
        return <UserSubscription />;
      case "recommendations":
        return <AIRecommendations />;
      case "dashboard":
      default:
        return (
          <>
            <UserDashboardCards />
            <UserActivity />
          </>
        );
    }
  };

  const renderAdminContent = () => {
    switch (activeTab) {
      case "plans":
        return <PlanManagement />;
      case "analytics":
        return <PlanAnalytics />;
      case "subscriptions":
        return <AdminSubscriptionManagement />;
      case "users":
        return <UserManagement />;
      case "activity":
        return <UserActivity />;
      case "dashboard":
      default:
        return (
          <>
            <UserDashboardCards />
            <UserActivity />
          </>
        );
    }
  };

  const getNavigationItems = () => {
    if (userRole === "admin") {
      return [
        { id: "dashboard", label: "Dashboard" },
        { id: "plans", label: "Manage Plans" },
        { id: "analytics", label: "Plan Analytics" },
        { id: "subscriptions", label: "Subscriptions" },
        { id: "users", label: "User Management" },
        { id: "activity", label: "User Activity" },
        { id: "settings", label: "Settings" }
      ];
    } else {
      return [
        { id: "dashboard", label: "Dashboard" },
        { id: "subscription", label: "My Subscription" },
        { id: "recommendations", label: "AI Recommendations" },
        { id: "usage", label: "Usage Analytics" },
        { id: "billing", label: "Billing" },
        { id: "support", label: "Support" }
      ];
    }
  };

  return (
    <div className="website-layout">
      <WebsiteHeader 
        userRole={userRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigationItems={getNavigationItems()}
      />
      <main className="main-content">
        {activeTab === "dashboard" && <WebsiteHero userRole={userRole} />}
        <div className="dashboard-content">
          {userRole === "admin" ? renderAdminContent() : renderUserContent()}
        </div>
      </main>
      <WebsiteFooter />
    </div>
  );
};

export default RoleBasedDashboard;
