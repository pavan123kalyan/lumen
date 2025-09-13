import React, { useState } from "react";

const allPlans = [
  {
    id: 1,
    name: "Fibernet Basic",
    price: 49.99,
    quota: "100 GB / month",
  },
  {
    id: 2,
    name: "Broadband Copper Plus",
    price: 29.99,
    quota: "50 GB / month",
  },
  {
    id: 3,
    name: "Fibernet Premium",
    price: 79.99,
    quota: "300 GB / month",
  },
];

const initialSubscriptions = [
  {
    id: 1,
    name: "Fibernet Basic",
    planId: 1,
    price: 49.99,
    quota: "100 GB / month",
    status: "active",
  },
  {
    id: 2,
    name: "Broadband Copper Plus",
    planId: 2,
    price: 29.99,
    quota: "50 GB / month",
    status: "cancelled",
  },
];

export default function MySubscriptions({ onBack, onSelectPlan }) {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [modal, setModal] = useState({ open: false, type: null, subId: null });

  const openModal = (type, subId) => setModal({ open: true, type, subId });
  const closeModal = () => setModal({ open: false, type: null, subId: null });

  const getSubscriptionById = (id) => subscriptions.find((s) => s.id === id);

  const handleChangePlan = (newPlan) => {
    if (modal.type === "upgrade") {
      // Navigate to payment page to pay for upgrade
      closeModal();
      onSelectPlan(newPlan);
    } else if (modal.type === "downgrade") {
      // Downgrade plan immediately without payment
      setSubscriptions((subs) =>
        subs.map((sub) =>
          sub.id === modal.subId
            ? {
                ...sub,
                name: newPlan.name,
                planId: newPlan.id,
                price: newPlan.price,
                quota: newPlan.quota,
                status: "active",
              }
            : sub
        )
      );
      closeModal();
      alert(`Subscription downgraded to ${newPlan.name}`);
    } else {
      closeModal();
    }
  };

  const getEligiblePlans = () => {
    const sub = getSubscriptionById(modal.subId);
    if (!sub) return [];
    if (modal.type === "upgrade") {
      return allPlans.filter((p) => p.price > sub.price);
    } else if (modal.type === "downgrade") {
      return allPlans.filter((p) => p.price < sub.price);
    }
    return [];
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>My Subscriptions</h1>
      {subscriptions.length === 0 ? (
        <p>You have no subscriptions.</p>
      ) : (
        subscriptions.map((sub) => (
          <div key={sub.id} style={subscriptionCardStyle}>
            <div>
              <h2 style={{ margin: 0 }}>{sub.name}</h2>
              <p style={{ margin: "4px 0" }}>
                <strong>Price:</strong> ${sub.price.toFixed(2)} / month
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Quota:</strong> {sub.quota}
              </p>
              <p
                style={{
                  margin: "4px 0",
                  fontWeight: "bold",
                  color: getStatusColor(sub.status),
                }}
              >
                Status:{" "}
                {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
              </p>
            </div>
            <div style={actionsStyle}>
              {sub.status === "active" && (
                <>
                  <button
                    style={actionButton}
                    onClick={() => openModal("upgrade", sub.id)}
                  >
                    Upgrade
                  </button>
                  <button
                    style={actionButton}
                    onClick={() => openModal("downgrade", sub.id)}
                  >
                    Downgrade
                  </button>
                  <button
                    style={{ ...actionButton, backgroundColor: "#dc3545" }}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to cancel this subscription?"
                        )
                      ) {
                        setSubscriptions(
                          subscriptions.map((s) =>
                            s.id === sub.id ? { ...s, status: "cancelled" } : s
                          )
                        );
                      }
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
              {sub.status === "cancelled" && (
                <button
                  style={actionButton}
                  onClick={() => {
                    alert(`Renew subscription ${sub.id} clicked`);
                    setSubscriptions(
                      subscriptions.map((s) =>
                        s.id === sub.id ? { ...s, status: "active" } : s
                      )
                    );
                  }}
                >
                  Renew
                </button>
              )}
            </div>
          </div>
        ))
      )}

      <button style={backButtonStyle} onClick={onBack}>
        Back to Browse Plans
      </button>

      {modal.open && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3 style={{ marginTop: 0, marginBottom: 15 }}>
              Select a {modal.type === "upgrade" ? "Upgrade" : "Downgrade"} Plan
            </h3>
            {getEligiblePlans().length === 0 ? (
              <p>No {modal.type} options available.</p>
            ) : (
              getEligiblePlans().map((plan) => (
                <div key={plan.id} style={planOptionStyle}>
                  <div>
                    <strong>{plan.name}</strong>
                    <p style={{ margin: 0 }}>
                      Price: ${plan.price.toFixed(2)} / month
                    </p>
                    <p style={{ margin: 0 }}>Quota: {plan.quota}</p>
                  </div>
                  <button
                    style={{ ...actionButton, marginLeft: 20 }}
                    onClick={() => handleChangePlan(plan)}
                  >
                    Select
                  </button>
                </div>
              ))
            )}
            <button style={backButtonStyle} onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const subscriptionCardStyle = {
  border: "1px solid #ccc",
  padding: 20,
  borderRadius: 8,
  marginBottom: 20,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
};

const actionsStyle = {
  display: "flex",
  gap: "10px",
};

const actionButton = {
  padding: "8px 14px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  backgroundColor: "#007bff",
  color: "#fff",
  fontSize: 14,
};

const backButtonStyle = {
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: 6,
  fontSize: 16,
  cursor: "pointer",
  marginTop: 20,
};

const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "green";
    case "cancelled":
      return "orange";
    default:
      return "#333";
  }
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "#fff",
  borderRadius: 8,
  padding: 25,
  width: 400,
  maxHeight: "80vh",
  overflowY: "auto",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
};

const planOptionStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid #ddd",
};
