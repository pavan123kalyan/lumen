import { useEffect, useState } from "react";

function BillingHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/billing-history?userId=123")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch(() => {
        setHistory([
          { billing_id: 1, subscription_id: 54, amount: 308.56, billing_date: "2024-01-04", payment_status: "paid" },
          { billing_id: 2, subscription_id: 52, amount: 200.11, billing_date: "2024-05-26", payment_status: "paid" },
          { billing_id: 3, subscription_id: 6, amount: 407.49, billing_date: "2024-06-24", payment_status: "paid" },
          { billing_id: 4, subscription_id: 100, amount: 289.68, billing_date: "2024-04-09", payment_status: "pending" },
          { billing_id: 5, subscription_id: 16, amount: 114.07, billing_date: "2024-11-22", payment_status: "pending" },
          { billing_id: 6, subscription_id: 24, amount: 411.41, billing_date: "2024-11-26", payment_status: "paid" },
          { billing_id: 7, subscription_id: 97, amount: 194.83, billing_date: "2024-08-27", payment_status: "failed" },
          { billing_id: 8, subscription_id: 17, amount: 32.64, billing_date: "2024-09-13", payment_status: "pending" },
          { billing_id: 9, subscription_id: 10, amount: 336.98, billing_date: "2024-09-12", payment_status: "pending" },
        ]);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Billing History</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Billing ID</th>
            <th className="p-2 border">Subscription ID</th>
            <th className="p-2 border">Billing Date</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.billing_id}>
              <td className="p-2 border">{h.billing_id}</td>
              <td className="p-2 border">{h.subscription_id}</td>
              <td className="p-2 border">{h.billing_date}</td>
              <td className="p-2 border">₹{h.amount.toFixed(2)}</td>
              <td
                className={`p-2 border ${h.payment_status.toLowerCase() === "paid"
                    ? "text-green-600"
                    : h.payment_status.toLowerCase() === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
              >
                {h.payment_status.charAt(0).toUpperCase() + h.payment_status.slice(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BillingHistory;
