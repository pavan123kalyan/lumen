import React from "react";
import "./PlanAnalytics.css";

const PlanAnalytics = () => {
  const topPlans = [
    { name: "Premium Plan", subscribers: 1250, revenue: 49975, growth: "+12%" },
    { name: "Basic Plan", subscribers: 890, revenue: 17810, growth: "+8%" },
    { name: "Enterprise Plan", subscribers: 340, revenue: 27206, growth: "+15%" },
  ];

  const monthlyStats = [
    { month: "Jan", basic: 45, premium: 78, enterprise: 23 },
    { month: "Feb", basic: 52, premium: 85, enterprise: 28 },
    { month: "Mar", basic: 48, premium: 92, enterprise: 31 },
    { month: "Apr", basic: 61, premium: 105, enterprise: 35 },
    { month: "May", basic: 58, premium: 98, enterprise: 38 },
    { month: "Jun", basic: 67, premium: 112, enterprise: 42 },
  ];

  const yearlyStats = [
    { year: "2021", totalRevenue: 125000, totalSubscribers: 850 },
    { year: "2022", totalRevenue: 185000, totalSubscribers: 1200 },
    { year: "2023", totalRevenue: 245000, totalSubscribers: 1650 },
    { year: "2024", totalRevenue: 320000, totalSubscribers: 2100 },
  ];

  return (
    <div className="plan-analytics">
      <div className="analytics-header">
        <h2>Plan Analytics Dashboard</h2>
        <div className="analytics-filters">
          <select className="filter-select">
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Top Performing Plans</h3>
          <div className="top-plans-list">
            {topPlans.map((plan, index) => (
              <div key={index} className="top-plan-item">
                <div className="plan-rank">#{index + 1}</div>
                <div className="plan-info">
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-stats">
                    <span>{plan.subscribers} subscribers</span>
                    <span>${plan.revenue.toLocaleString()} revenue</span>
                  </div>
                </div>
                <div className="plan-growth positive">{plan.growth}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3>Monthly Subscriber Growth</h3>
          <div className="chart-container">
            <div className="chart-bars">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="chart-bar-group">
                  <div className="chart-bar basic" style={{ height: `${(stat.basic / 120) * 100}%` }}></div>
                  <div className="chart-bar premium" style={{ height: `${(stat.premium / 120) * 100}%` }}></div>
                  <div className="chart-bar enterprise" style={{ height: `${(stat.enterprise / 120) * 100}%` }}></div>
                  <div className="chart-label">{stat.month}</div>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color basic"></div>
                <span>Basic</span>
              </div>
              <div className="legend-item">
                <div className="legend-color premium"></div>
                <span>Premium</span>
              </div>
              <div className="legend-item">
                <div className="legend-color enterprise"></div>
                <span>Enterprise</span>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Yearly Revenue Growth</h3>
          <div className="revenue-chart">
            {yearlyStats.map((stat, index) => (
              <div key={index} className="revenue-item">
                <div className="revenue-year">{stat.year}</div>
                <div className="revenue-bar">
                  <div 
                    className="revenue-fill" 
                    style={{ width: `${(stat.totalRevenue / 320000) * 100}%` }}
                  ></div>
                </div>
                <div className="revenue-amount">${stat.totalRevenue.toLocaleString()}</div>
                <div className="revenue-subscribers">{stat.totalSubscribers} subscribers</div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3>Plan Performance Summary</h3>
          <div className="performance-metrics">
            <div className="metric">
              <div className="metric-label">Total Active Plans</div>
              <div className="metric-value">3</div>
            </div>
            <div className="metric">
              <div className="metric-label">Total Subscribers</div>
              <div className="metric-value">2,480</div>
            </div>
            <div className="metric">
              <div className="metric-label">Monthly Revenue</div>
              <div className="metric-value">$95,000</div>
            </div>
            <div className="metric">
              <div className="metric-label">Average Growth</div>
              <div className="metric-value">+12%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanAnalytics;


