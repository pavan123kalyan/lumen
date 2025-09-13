import React, { useState } from "react";
import BrowsePlans from "./pages/BrowsePlans";
import MySubscriptions from "./pages/MySubscriptions";
import PaymentPage from "./pages/PaymentPage";

export default function App() {
  const [page, setPage] = useState("browse"); // 'browse', 'subscribe', 'mySubs'
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setPage("subscribe");
  };

  const showBrowse = () => {
    setPage("browse");
    setSelectedPlan(null);
  };

  const showMySubs = () => setPage("mySubs");

  return (
    <>
      {page === "browse" && (
        <BrowsePlans onSubscribe={handleSubscribe} onShowMySubs={showMySubs} />
      )}
      {page === "mySubs" && (
        <MySubscriptions onBack={showBrowse} onSelectPlan={handleSubscribe} />
      )}
      {page === "subscribe" && selectedPlan && (
        <PaymentPage plan={selectedPlan} onBack={showBrowse} />
      )}
    </>
  );
}
