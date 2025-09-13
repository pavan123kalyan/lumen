import api from "./api";

// Sample data for testing (remove when backend is ready)
let sampleSubscriptions = [
  {
    id: 1,
    userId: 1,
    planId: 1,
    planName: "Basic Fibernet",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    autoRenew: true,
    dataUsed: 35,
    dataQuota: 50,
    price: 19.99,
    nextBillingDate: "2024-02-15"
  },
  {
    id: 2,
    userId: 2,
    planId: 2,
    planName: "Premium Fibernet",
    status: "active",
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    autoRenew: false,
    dataUsed: 150,
    dataQuota: 200,
    price: 39.99,
    nextBillingDate: "2024-02-10"
  }
];

let nextId = 3;

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get user subscriptions
export const getUserSubscriptions = async (userId) => {
  try {
    const res = await api.get(`/users/${userId}/subscriptions`);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    return sampleSubscriptions.filter(sub => sub.userId === userId);
  }
};

// Subscribe to a plan
export const subscribeToPlan = async (userId, planId) => {
  try {
    const res = await api.post(`/users/${userId}/subscriptions`, { planId });
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    // Find the plan details (this would come from planService in real app)
    const planDetails = {
      1: { name: "Basic Fibernet", price: 19.99, dataQuota: 50 },
      2: { name: "Premium Fibernet", price: 39.99, dataQuota: 200 },
      3: { name: "Business Broadband", price: 49.99, dataQuota: 100 }
    };
    
    const plan = planDetails[planId];
    if (!plan) throw new Error("Plan not found");
    
    const newSubscription = {
      id: nextId++,
      userId,
      planId,
      planName: plan.name,
      status: "active",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      autoRenew: true,
      dataUsed: 0,
      dataQuota: plan.dataQuota,
      price: plan.price,
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    
    sampleSubscriptions.push(newSubscription);
    return newSubscription;
  }
};

// Upgrade subscription
export const upgradeSubscription = async (subscriptionId, newPlanId) => {
  try {
    const res = await api.put(`/subscriptions/${subscriptionId}/upgrade`, { newPlanId });
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    const subscriptionIndex = sampleSubscriptions.findIndex(sub => sub.id === subscriptionId);
    if (subscriptionIndex === -1) throw new Error("Subscription not found");
    
    const planDetails = {
      1: { name: "Basic Fibernet", price: 19.99, dataQuota: 50 },
      2: { name: "Premium Fibernet", price: 39.99, dataQuota: 200 },
      3: { name: "Business Broadband", price: 49.99, dataQuota: 100 }
    };
    
    const newPlan = planDetails[newPlanId];
    if (!newPlan) throw new Error("Plan not found");
    
    sampleSubscriptions[subscriptionIndex] = {
      ...sampleSubscriptions[subscriptionIndex],
      planId: newPlanId,
      planName: newPlan.name,
      price: newPlan.price,
      dataQuota: newPlan.dataQuota
    };
    
    return sampleSubscriptions[subscriptionIndex];
  }
};

// Downgrade subscription
export const downgradeSubscription = async (subscriptionId, newPlanId) => {
  return upgradeSubscription(subscriptionId, newPlanId); // Same logic as upgrade
};

// Cancel subscription
export const cancelSubscription = async (subscriptionId) => {
  try {
    const res = await api.put(`/subscriptions/${subscriptionId}/cancel`);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    const subscriptionIndex = sampleSubscriptions.findIndex(sub => sub.id === subscriptionId);
    if (subscriptionIndex === -1) throw new Error("Subscription not found");
    
    sampleSubscriptions[subscriptionIndex] = {
      ...sampleSubscriptions[subscriptionIndex],
      status: "cancelled"
    };
    
    return sampleSubscriptions[subscriptionIndex];
  }
};

// Renew subscription
export const renewSubscription = async (subscriptionId) => {
  try {
    const res = await api.put(`/subscriptions/${subscriptionId}/renew`);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    const subscriptionIndex = sampleSubscriptions.findIndex(sub => sub.id === subscriptionId);
    if (subscriptionIndex === -1) throw new Error("Subscription not found");
    
    const subscription = sampleSubscriptions[subscriptionIndex];
    const newEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    sampleSubscriptions[subscriptionIndex] = {
      ...subscription,
      status: "active",
      endDate: newEndDate,
      nextBillingDate: newEndDate,
      dataUsed: 0 // Reset data usage on renewal
    };
    
    return sampleSubscriptions[subscriptionIndex];
  }
};

// Toggle auto-renewal
export const toggleAutoRenewal = async (subscriptionId) => {
  try {
    const res = await api.put(`/subscriptions/${subscriptionId}/auto-renewal`);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    const subscriptionIndex = sampleSubscriptions.findIndex(sub => sub.id === subscriptionId);
    if (subscriptionIndex === -1) throw new Error("Subscription not found");
    
    sampleSubscriptions[subscriptionIndex] = {
      ...sampleSubscriptions[subscriptionIndex],
      autoRenew: !sampleSubscriptions[subscriptionIndex].autoRenew
    };
    
    return sampleSubscriptions[subscriptionIndex];
  }
};

// Get subscription analytics (for admin)
export const getSubscriptionAnalytics = async () => {
  try {
    const res = await api.get("/admin/subscriptions/analytics");
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    const totalSubscriptions = sampleSubscriptions.length;
    const activeSubscriptions = sampleSubscriptions.filter(sub => sub.status === "active").length;
    const cancelledSubscriptions = sampleSubscriptions.filter(sub => sub.status === "cancelled").length;
    
    const planStats = sampleSubscriptions.reduce((acc, sub) => {
      if (!acc[sub.planName]) {
        acc[sub.planName] = { count: 0, revenue: 0 };
      }
      acc[sub.planName].count++;
      acc[sub.planName].revenue += sub.price;
      return acc;
    }, {});
    
    return {
      totalSubscriptions,
      activeSubscriptions,
      cancelledSubscriptions,
      planStats,
      monthlyRevenue: sampleSubscriptions.reduce((sum, sub) => sum + sub.price, 0)
    };
  }
};
