import api from "./api";

// Sample data for testing (remove when backend is ready)
let samplePlans = [
  {
    id: 1,
    name: "Basic Fibernet",
    description: "Perfect for light internet usage",
    type: "Fibernet",
    dataQuota: 50,
    price: 19.99,
    duration: 1,
    status: "active",
    features: ["High-speed internet", "24/7 support", "Free installation"]
  },
  {
    id: 2,
    name: "Premium Fibernet",
    description: "Ideal for heavy internet users and families",
    type: "Fibernet",
    dataQuota: 200,
    price: 39.99,
    duration: 1,
    status: "active",
    features: ["Ultra-fast internet", "Priority support", "Free router", "No data caps"]
  },
  {
    id: 3,
    name: "Business Broadband",
    description: "Reliable connection for business needs",
    type: "Broadband Copper",
    dataQuota: 100,
    price: 49.99,
    duration: 3,
    status: "active",
    features: ["Business support", "Static IP", "SLA guarantee", "Free setup"]
  }
];

let nextId = 4;

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getPlans = async () => {
  try {
    // Try to fetch from real API first
    const res = await api.get("/plans");
    return res.data;
  } catch (error) {
    // Fallback to sample data if API is not available
    console.log("Using sample data - API not available");
    await delay(500); // Simulate network delay
    return [...samplePlans];
  }
};

export const createPlan = async (plan) => {
  try {
    // Try to create via real API first
    const res = await api.post("/plans", plan);
    return res.data;
  } catch (error) {
    // Fallback to sample data manipulation
    console.log("Using sample data - API not available");
    await delay(500);
    const newPlan = {
      id: nextId++,
      ...plan,
      createdAt: new Date().toISOString()
    };
    samplePlans.push(newPlan);
    return newPlan;
  }
};

export const updatePlan = async (id, plan) => {
  try {
    // Try to update via real API first
    const res = await api.put(`/plans/${id}`, plan);
    return res.data;
  } catch (error) {
    // Fallback to sample data manipulation
    console.log("Using sample data - API not available");
    await delay(500);
    const index = samplePlans.findIndex(p => p.id === id);
    if (index !== -1) {
      samplePlans[index] = { ...samplePlans[index], ...plan };
      return samplePlans[index];
    }
    throw new Error("Plan not found");
  }
};

export const deletePlan = async (id) => {
  try {
    // Try to delete via real API first
    const res = await api.delete(`/plans/${id}`);
    return res.data;
  } catch (error) {
    // Fallback to sample data manipulation
    console.log("Using sample data - API not available");
    await delay(500);
    const index = samplePlans.findIndex(p => p.id === id);
    if (index !== -1) {
      const deletedPlan = samplePlans[index];
      samplePlans.splice(index, 1);
      return deletedPlan;
    }
    throw new Error("Plan not found");
  }
};
