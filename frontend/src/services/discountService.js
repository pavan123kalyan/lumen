import api from "./api";

// Sample data for testing (remove when backend is ready)
let sampleDiscounts = [
  {
    id: 1,
    name: "New Year Special",
    description: "Get 20% off on all plans for new customers",
    type: "percentage",
    value: 20,
    minAmount: 0,
    maxDiscount: 50,
    applicablePlans: [1, 2, 3],
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "active",
    usageLimit: 100,
    usedCount: 45,
    code: "NEWYEAR2024",
    conditions: {
      newCustomersOnly: true,
      minSubscriptionDuration: 1
    },
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Premium Upgrade Discount",
    description: "Special discount for upgrading to Premium Fibernet",
    type: "fixed",
    value: 10,
    minAmount: 30,
    maxDiscount: 10,
    applicablePlans: [2],
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    status: "active",
    usageLimit: 50,
    usedCount: 12,
    code: "PREMIUM10",
    conditions: {
      upgradeOnly: true,
      fromPlanIds: [1]
    },
    createdAt: "2024-01-15T00:00:00Z"
  },
  {
    id: 3,
    name: "Student Discount",
    description: "15% discount for students with valid ID",
    type: "percentage",
    value: 15,
    minAmount: 0,
    maxDiscount: 25,
    applicablePlans: [1, 2],
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    usageLimit: 200,
    usedCount: 78,
    code: "STUDENT15",
    conditions: {
      studentVerification: true,
      validIdRequired: true
    },
    createdAt: "2024-01-01T00:00:00Z"
  }
];

let nextId = 4;

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get all discounts
export const getDiscounts = async () => {
  try {
    const res = await api.get("/discounts");
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    return [...sampleDiscounts];
  }
};

// Get discount by ID
export const getDiscountById = async (id) => {
  try {
    const res = await api.get(`/discounts/${id}`);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(300);
    return sampleDiscounts.find(discount => discount.id === id);
  }
};

// Create new discount
export const createDiscount = async (discountData) => {
  try {
    const res = await api.post("/discounts", discountData);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    const newDiscount = {
      id: nextId++,
      ...discountData,
      usedCount: 0,
      createdAt: new Date().toISOString()
    };
    
    sampleDiscounts.push(newDiscount);
    return newDiscount;
  }
};

// Update discount
export const updateDiscount = async (id, discountData) => {
  try {
    const res = await api.put(`/discounts/${id}`, discountData);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    const discountIndex = sampleDiscounts.findIndex(discount => discount.id === id);
    if (discountIndex !== -1) {
      sampleDiscounts[discountIndex] = {
        ...sampleDiscounts[discountIndex],
        ...discountData
      };
      return sampleDiscounts[discountIndex];
    }
    throw new Error("Discount not found");
  }
};

// Delete discount
export const deleteDiscount = async (id) => {
  try {
    const res = await api.delete(`/discounts/${id}`);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    const discountIndex = sampleDiscounts.findIndex(discount => discount.id === id);
    if (discountIndex !== -1) {
      const deletedDiscount = sampleDiscounts[discountIndex];
      sampleDiscounts.splice(discountIndex, 1);
      return deletedDiscount;
    }
    throw new Error("Discount not found");
  }
};

// Validate discount code
export const validateDiscountCode = async (code, planId, userId) => {
  try {
    const res = await api.post("/discounts/validate", { code, planId, userId });
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(300);
    
    const discount = sampleDiscounts.find(d => d.code === code && d.status === "active");
    
    if (!discount) {
      return { valid: false, message: "Invalid or expired discount code" };
    }
    
    // Check if discount is applicable to the plan
    if (!discount.applicablePlans.includes(planId)) {
      return { valid: false, message: "Discount not applicable to selected plan" };
    }
    
    // Check usage limit
    if (discount.usedCount >= discount.usageLimit) {
      return { valid: false, message: "Discount usage limit exceeded" };
    }
    
    // Check date validity
    const now = new Date();
    const startDate = new Date(discount.startDate);
    const endDate = new Date(discount.endDate);
    
    if (now < startDate || now > endDate) {
      return { valid: false, message: "Discount is not currently active" };
    }
    
    return {
      valid: true,
      discount: {
        id: discount.id,
        name: discount.name,
        type: discount.type,
        value: discount.value,
        maxDiscount: discount.maxDiscount
      }
    };
  }
};

// Apply discount to subscription
export const applyDiscount = async (subscriptionId, discountCode) => {
  try {
    const res = await api.post(`/subscriptions/${subscriptionId}/apply-discount`, { discountCode });
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    const discount = sampleDiscounts.find(d => d.code === discountCode);
    if (discount) {
      discount.usedCount += 1;
    }
    
    return {
      success: true,
      discountApplied: discount,
      message: "Discount applied successfully"
    };
  }
};

// Get discount analytics
export const getDiscountAnalytics = async () => {
  try {
    const res = await api.get("/discounts/analytics");
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    const totalDiscounts = sampleDiscounts.length;
    const activeDiscounts = sampleDiscounts.filter(d => d.status === "active").length;
    const totalUsage = sampleDiscounts.reduce((sum, d) => sum + d.usedCount, 0);
    const totalSavings = sampleDiscounts.reduce((sum, d) => {
      const avgPlanPrice = 30; // This would be calculated from actual plan prices
      const savingsPerUse = d.type === "percentage" 
        ? (avgPlanPrice * d.value / 100) 
        : d.value;
      return sum + (d.usedCount * savingsPerUse);
    }, 0);
    
    const mostUsedDiscount = sampleDiscounts.reduce((max, d) => 
      d.usedCount > max.usedCount ? d : max, sampleDiscounts[0] || { usedCount: 0 }
    );
    
    return {
      totalDiscounts,
      activeDiscounts,
      totalUsage,
      totalSavings,
      mostUsedDiscount,
      discountTypes: {
        percentage: sampleDiscounts.filter(d => d.type === "percentage").length,
        fixed: sampleDiscounts.filter(d => d.type === "fixed").length
      }
    };
  }
};

// Toggle discount status
export const toggleDiscountStatus = async (id) => {
  try {
    const res = await api.put(`/discounts/${id}/toggle-status`);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(300);
    
    const discountIndex = sampleDiscounts.findIndex(discount => discount.id === id);
    if (discountIndex !== -1) {
      sampleDiscounts[discountIndex] = {
        ...sampleDiscounts[discountIndex],
        status: sampleDiscounts[discountIndex].status === "active" ? "inactive" : "active"
      };
      return sampleDiscounts[discountIndex];
    }
    throw new Error("Discount not found");
  }
};
