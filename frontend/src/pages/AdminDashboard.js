import React from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import DashboardCards from "../components/dashboardcards";
import PlanTable from "../components/plantable";

const AdminDashboard = () => {
  return (
    <div>
      <Sidebar />
      <Topbar />
      <DashboardCards />
      <PlanTable />
    </div>
  );
};

export default AdminDashboard;
