import React from "react";
import WebsiteHeader from "./WebsiteHeader";
import WebsiteHero from "./WebsiteHero";
import UserDashboardCards from "./UserDashboardCards";
import UserActivity from "./UserActivity";
import WebsiteFooter from "./WebsiteFooter";
import "./UserDashboard.css";

const UserDashboard = () => {
  return (
    <div className="website-layout">
      <WebsiteHeader />
      <main className="main-content">
        <WebsiteHero />
        <div className="dashboard-content">
          <UserDashboardCards />
          <UserActivity />
        </div>
      </main>
      <WebsiteFooter />
    </div>
  );
};

export default UserDashboard;
