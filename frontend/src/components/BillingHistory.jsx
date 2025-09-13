import { useState } from "react";

function BillingHistory() {
  const [billingData] = useState([
    { billing_id: 1, subscription_id: 54, amount: 308.56, billing_date: "2024-01-04", payment_status: "paid" },
    { billing_id: 2, subscription_id: 52, amount: 200.11, billing_date: "2024-05-26", payment_status: "paid" },
    { billing_id: 3, subscription_id: 6, amount: 407.49, billing_date: "2024-06-24", payment_status: "paid" },
    { billing_id: 4, subscription_id: 100, amount: 289.68, billing_date: "2024-04-09", payment_status: "pending" },
    { billing_id: 5, subscription_id: 16, amount: 114.07, billing_date: "2024-11-22", payment_status: "pending" },
    { billing_id: 6, subscription_id: 24, amount: 411.41, billing_date: "2024-11-26", payment_status: "paid" },
    { billing_id: 7, subscription_id: 97, amount: 194.83, billing_date: "2024-08-27", payment_status: "failed" },
    { billing_id: 8, subscription_id: 17, amount: 32.64, billing_date: "2024-09-13", payment_status: "pending" },
    { billing_id: 9, subscription_id: 10, amount: 336.98, billing_date: "2024-09-12", payment_status: "pending" },
    { billing_id: 10, subscription_id: 63, amount: 376.25, billing_date: "2023-12-02", payment_status: "pending" },
    { billing_id: 11, subscription_id: 86, amount: 493.15, billing_date: "2024-06-26", payment_status: "failed" },
    { billing_id: 12, subscription_id: 51, amount: 10.43, billing_date: "2024-07-02", payment_status: "paid" },
    { billing_id: 13, subscription_id: 85, amount: 463.86, billing_date: "2024-02-12", payment_status: "failed" },
    { billing_id: 14, subscription_id: 18, amount: 84.45, billing_date: "2024-08-08", payment_status: "failed" },
    { billing_id: 15, subscription_id: 74, amount: 110.86, billing_date: "2024-07-24", payment_status: "failed" },
    // 👉 Add rest of your records here
  ]);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("billing_date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // 🔍 Filter data
  const filteredData = billingData.filter(
    (row) =>
      row.billing_id.toString().includes(search) ||
      row.subscription_id.toString().includes(search) ||
      row.payment_status.toLowerCase().includes(search.toLowerCase())
  );

  // ↕️ Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortField === "billing_date") {
      return sortOrder === "asc"
        ? new Date(a.billing_date) - new Date(b.billing_date)
        : new Date(b.billing_date) - new Date(a.billing_date);
    } else {
      return sortOrder === "asc"
        ? a[sortField].toString().localeCompare(b[sortField].toString())
        : b[sortField].toString().localeCompare(a[sortField].toString());
    }
  });

  // 📑 Pagination
  const start = (page - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(start, start + rowsPerPage);

  // 📊 Summary
  const summary = {
    paid: billingData.filter((d) => d.payment_status === "paid").length,
    pending: billingData.filter((d) => d.payment_status === "pending").length,
    failed: billingData.filter((d) => d.payment_status === "failed").length,
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Billing History</h2>

      {/* ✅ Summary */}
      <div className="flex gap-6 mb-6">
        <div className="p-4 bg-green-100 rounded-lg">✅ Paid: {summary.paid}</div>
        <div className="p-4 bg-yellow-100 rounded-lg">⏳ Pending: {summary.pending}</div>
        <div className="p-4 bg-red-100 rounded-lg">❌ Failed: {summary.failed}</div>
      </div>

      {/* 🔍 Search & Sort */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by ID, Subscription, or Status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="billing_date">Billing Date</option>
          <option value="amount">Amount</option>
          <option value="payment_status">Status</option>
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="ml-2 border px-4 py-2 rounded"
        >
          {sortOrder === "asc" ? "⬆️ Asc" : "⬇️ Desc"}
        </button>
      </div>

      {/* 📋 Table */}
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
          {paginatedData.map((h) => (
            <tr key={h.billing_id}>
              <td className="p-2 border">{h.billing_id}</td>
              <td className="p-2 border">{h.subscription_id}</td>
              <td className="p-2 border">{h.billing_date}</td>
              <td className="p-2 border">₹{h.amount.toFixed(2)}</td>
              <td
                className={`p-2 border font-bold ${h.payment_status === "paid"
                    ? "text-green-600"
                    : h.payment_status === "pending"
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

      {/* 📑 Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: Math.ceil(sortedData.length / rowsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BillingHistory;
