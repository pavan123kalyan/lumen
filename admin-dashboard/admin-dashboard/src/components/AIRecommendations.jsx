import React, { useState } from "react";
import "./AIRecommendations.css";

const AIRecommendations = () => {
  const [recommendations] = useState([
    {
      id: 1,
      type: "upgrade",
      title: "Upgrade to Enterprise Plan",
      reason: "Based on your high data usage (85% of limit), we recommend upgrading to avoid overage charges.",
      confidence: 92,
      savings: "Save $200/year on overage fees",
      plan: "Enterprise Plan",
      price: "$79.99/month"
    },
    {
      id: 2,
      type: "feature",
      title: "Enable Advanced Analytics",
      reason: "Your usage patterns suggest you'd benefit from detailed analytics to optimize your data consumption.",
      confidence: 78,
      savings: "Optimize usage by 15-20%",
      plan: "Premium Plan",
      price: "Included"
    },
    {
      id: 3,
      type: "discount",
      title: "Annual Billing Discount",
      reason: "Switch to annual billing to save 20% on your current plan.",
      confidence: 85,
      savings: "Save $95.98/year",
      plan: "Premium Plan",
      price: "$31.99/month (annual)"
    }
  ]);

  const [usageInsights] = useState({
    peakHours: "2:00 PM - 6:00 PM",
    averageDailyUsage: "0.8GB",
    weeklyTrend: "+12%",
    monthlyProjection: "24.5GB",
    recommendations: [
      "Consider using data during off-peak hours (10 PM - 6 AM) for better performance",
      "Your usage spikes on weekends - consider a weekend data boost add-on",
      "You're using 85% of your monthly allowance with 10 days remaining"
    ]
  });

  const handleRecommendationAction = (recommendation, action) => {
    console.log(`${action} recommendation:`, recommendation);
    // Here you would implement the actual action logic
  };

  return (
    <div className="ai-recommendations">
      <div className="recommendations-header">
        <h2>AI-Powered Recommendations</h2>
        <p>Personalized suggestions based on your usage patterns and preferences</p>
      </div>

      <div className="recommendations-grid">
        {recommendations.map((rec) => (
          <div key={rec.id} className={`recommendation-card ${rec.type}`}>
            <div className="recommendation-header">
              <h3>{rec.title}</h3>
              <div className="confidence-score">
                <span className="confidence-label">Confidence</span>
                <span className="confidence-value">{rec.confidence}%</span>
              </div>
            </div>
            
            <p className="recommendation-reason">{rec.reason}</p>
            
            <div className="recommendation-details">
              <div className="detail-item">
                <span className="detail-label">Savings:</span>
                <span className="detail-value savings">{rec.savings}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Plan:</span>
                <span className="detail-value">{rec.plan}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Price:</span>
                <span className="detail-value">{rec.price}</span>
              </div>
            </div>

            <div className="recommendation-actions">
              <button 
                className="btn-accept"
                onClick={() => handleRecommendationAction(rec, 'accept')}
              >
                Accept Recommendation
              </button>
              <button 
                className="btn-dismiss"
                onClick={() => handleRecommendationAction(rec, 'dismiss')}
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="usage-insights">
        <h3>Usage Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Peak Usage Hours</h4>
            <p className="insight-value">{usageInsights.peakHours}</p>
            <p className="insight-description">When you use the most data</p>
          </div>
          
          <div className="insight-card">
            <h4>Daily Average</h4>
            <p className="insight-value">{usageInsights.averageDailyUsage}</p>
            <p className="insight-description">Average data usage per day</p>
          </div>
          
          <div className="insight-card">
            <h4>Weekly Trend</h4>
            <p className="insight-value trend-positive">{usageInsights.weeklyTrend}</p>
            <p className="insight-description">Change from last week</p>
          </div>
          
          <div className="insight-card">
            <h4>Monthly Projection</h4>
            <p className="insight-value">{usageInsights.monthlyProjection}</p>
            <p className="insight-description">Expected usage this month</p>
          </div>
        </div>

        <div className="insights-recommendations">
          <h4>Smart Tips</h4>
          <ul>
            {usageInsights.recommendations.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;

