import React, { useState } from "react";

const PlanTable = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: "Basic Plan", quota: "100GB", price: "$10" },
    { id: 2, name: "Premium Plan", quota: "500GB", price: "$30" },
  ]);

  const [newPlan, setNewPlan] = useState({ name: "", quota: "", price: "" });

  const addPlan = () => {
    if (newPlan.name && newPlan.quota && newPlan.price) {
      setPlans([...plans, { id: plans.length + 1, ...newPlan }]);
      setNewPlan({ name: "", quota: "", price: "" });
    }
  };

  const deletePlan = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  return (
    <div style={{ marginLeft: "240px", marginTop: "20px" }}>
      <h2>Manage Plans</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quota</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.id}</td>
              <td>{plan.name}</td>
              <td>{plan.quota}</td>
              <td>{plan.price}</td>
              <td>
                <button onClick={() => deletePlan(plan.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>#</td>
            <td>
              <input
                type="text"
                placeholder="Plan Name"
                value={newPlan.name}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, name: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Quota"
                value={newPlan.quota}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, quota: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Price"
                value={newPlan.price}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, price: e.target.value })
                }
              />
            </td>
            <td>
              <button onClick={addPlan}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PlanTable;
