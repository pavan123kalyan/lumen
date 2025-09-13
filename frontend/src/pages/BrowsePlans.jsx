import React from "react";

const plansData = [
  {
    id: 1,
    name: "Fibernet Basic",
    price: 49.99,
    quota: "100 GB / month",
    features: [
      "High-speed fiber broadband",
      "24/7 customer support",
      "No contract required",
      "Speed up to 100 Mbps",
    ],
  },
  {
    id: 2,
    name: "Broadband Copper Plus",
    price: 29.99,
    quota: "50 GB / month",
    features: [
      "Reliable copper broadband",
      "Affordable pricing",
      "Speed up to 50 Mbps",
      "Email support",
    ],
  },
  {
    id: 3,
    name: "Fibernet Premium",
    price: 79.99,
    quota: "300 GB / month",
    features: [
      "Premium fiber broadband",
      "Priority support",
      "Speed up to 300 Mbps",
      "Free installation",
    ],
  },
];

export default function BrowsePlans({ onSubscribe, onShowMySubs }) {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1>Browse Plans</h1>
        <button
          onClick={onShowMySubs}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          My Subscriptions
        </button>
      </div>

      {plansData.map((plan) => (
        <div
          key={plan.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 20,
            marginBottom: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h2>{plan.name}</h2>
          <p>
            <strong>Price:</strong> ${plan.price.toFixed(2)} / month
          </p>
          <p>
            <strong>Quota:</strong> {plan.quota}
          </p>
          <ul style={{ paddingLeft: 20 }}>
            {plan.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
          <button
            style={{
              marginTop: 15,
              padding: "12px 25px",
              fontSize: 16,
              backgroundColor: "#007bff",
              border: "none",
              color: "#fff",
              borderRadius: 6,
              cursor: "pointer",
            }}
            onClick={() => onSubscribe(plan)}
          >
            Subscribe
          </button>
        </div>
      ))}
    </div>
  );
}
