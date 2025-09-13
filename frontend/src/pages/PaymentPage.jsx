import React, { useState } from "react";

const paymentApps = [
  { id: "gpay", name: "Google Pay" },
  { id: "paytm", name: "Paytm" },
  { id: "phonepe", name: "PhonePe" },
];

export default function PaymentPage({ plan, onBack }) {
  const [method, setMethod] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [upiData, setUpiData] = useState({ name: "", phone: "" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (method === "card") {
      if (!/^\d{16}$/.test(cardData.cardNumber))
        return "Card number must be 16 digits";
      if (!/^\d{2}\/\d{2}$/.test(cardData.expiry))
        return "Expiry must be MM/YY";
      if (!/^\d{3}$/.test(cardData.cvv)) return "CVV must be 3 digits";
    } else if (method === "upi") {
      if (!upiData.name.trim()) return "Name is required";
      if (!/^\d{10}$/.test(upiData.phone)) return "Phone must be 10 digits";
    }
    return null;
  };

  const handleSubscribe = () => {
    const error = validateInputs();
    if (error) {
      alert(error);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  if (!plan)
    return (
      <div style={cardStyle}>
        <h2>No plan selected</h2>
        <button style={buttonStyle} onClick={onBack}>
          Back to Plans
        </button>
      </div>
    );

  return (
    <div style={outerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: 7 }}>Subscribe to: {plan.name}</h2>
        <p style={{ marginTop: 0, marginBottom: 20 }}>
          <strong>Price:</strong> ${plan.price.toFixed(2)} / month
        </p>

        {!method && !success && (
          <>
            <h3 style={{ marginBottom: 8 }}>Select Payment Method</h3>
            <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
              <button style={buttonStyle} onClick={() => setMethod("card")}>
                Pay using Card
              </button>
              <button style={buttonStyle} onClick={() => setMethod("upi")}>
                Pay using UPI
              </button>
            </div>
            <button style={backButtonStyle} onClick={onBack}>
              Back to Plans
            </button>
          </>
        )}

        {method === "card" && !success && (
          <>
            <h3 style={{ marginTop: 18, marginBottom: 10 }}>Card Payment</h3>
            <input
              style={inputStyle}
              type="text"
              placeholder="Card Number"
              maxLength={16}
              value={cardData.cardNumber}
              onChange={(e) =>
                setCardData({ ...cardData, cardNumber: e.target.value })
              }
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              value={cardData.expiry}
              onChange={(e) =>
                setCardData({ ...cardData, expiry: e.target.value })
              }
            />
            <input
              style={inputStyle}
              type="password"
              placeholder="CVV"
              maxLength={3}
              value={cardData.cvv}
              onChange={(e) =>
                setCardData({ ...cardData, cvv: e.target.value })
              }
            />
            <button
              style={buttonStyle}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? "Processing..." : "Subscribe to the plan"}
            </button>
            <button style={backButtonStyle} onClick={() => setMethod(null)}>
              Back
            </button>
          </>
        )}

        {method === "upi" && !success && !selectedApp && (
          <>
            <h3>Select UPI App</h3>
            <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
              {paymentApps.map((app) => (
                <button
                  key={app.id}
                  style={{ ...buttonStyle, padding: "8px 14px", fontSize: 14 }}
                  onClick={() => setSelectedApp(app)}
                >
                  {app.name}
                </button>
              ))}
            </div>
            <button style={backButtonStyle} onClick={() => setMethod(null)}>
              Back
            </button>
          </>
        )}

        {method === "upi" && !success && selectedApp && (
          <>
            <h3 style={{ marginTop: 18, marginBottom: 10 }}>
              Pay using {selectedApp.name}
            </h3>
            <input
              style={inputStyle}
              type="text"
              placeholder="Name"
              value={upiData.name}
              onChange={(e) => setUpiData({ ...upiData, name: e.target.value })}
            />
            <input
              style={inputStyle}
              type="tel"
              placeholder="Phone Number"
              maxLength={10}
              value={upiData.phone}
              onChange={(e) =>
                setUpiData({ ...upiData, phone: e.target.value })
              }
            />
            <button
              style={buttonStyle}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? "Processing..." : "Subscribe to the plan"}
            </button>
            <button
              style={backButtonStyle}
              onClick={() => setSelectedApp(null)}
            >
              Back
            </button>
          </>
        )}

        {success && (
          <div style={successBox}>
            <h3 style={{ color: "#155724" }}>
              Successfully Subscribed to the plan!
            </h3>
            <button style={buttonStyle} onClick={onBack}>
              Back to Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* Styles */
const outerStyle = {
  maxWidth: 600,
  margin: "40px auto",
  fontFamily: "Arial, sans-serif",
};
const cardStyle = {
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
  padding: 34,
  minWidth: 320,
};
const inputStyle = {
  width: "100%",
  padding: "12px 10px",
  marginBottom: 15,
  fontSize: 16,
  borderRadius: 6,
  border: "1px solid #ccc",
  outline: "none",
  boxSizing: "border-box",
};
const buttonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  padding: "12px 24px",
  borderRadius: 6,
  fontSize: 16,
  cursor: "pointer",
  marginRight: 8,
  marginTop: 8,
};
const backButtonStyle = {
  backgroundColor: "#f0f0f0",
  color: "#333",
  border: "none",
  padding: "10px 18px",
  borderRadius: 6,
  fontSize: 15,
  cursor: "pointer",
  marginRight: 8,
  marginTop: 8,
};
const successBox = {
  marginTop: 30,
  padding: 18,
  border: "1.5px solid #28a745",
  borderRadius: 12,
  backgroundColor: "#d4edda",
  textAlign: "center",
};
