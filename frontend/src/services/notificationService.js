import api from "./api";

// Sample data for testing (remove when backend is ready)
let sampleNotifications = [
  {
    id: 1,
    userId: 1,
    type: "renewal_reminder",
    title: "Subscription Renewal Reminder",
    message: "Your Basic Fibernet plan will renew in 3 days. Current usage: 35/50 GB",
    isRead: false,
    createdAt: "2024-01-12T10:30:00Z",
    priority: "medium",
    actionRequired: true,
    actionUrl: "/subscriptions/1/renew"
  },
  {
    id: 2,
    userId: 1,
    type: "usage_alert",
    title: "High Data Usage Alert",
    message: "You've used 80% of your monthly data quota. Consider upgrading your plan.",
    isRead: false,
    createdAt: "2024-01-10T14:20:00Z",
    priority: "high",
    actionRequired: true,
    actionUrl: "/plans"
  },
  {
    id: 3,
    userId: 1,
    type: "recommendation",
    title: "Plan Recommendation",
    message: "Based on your usage patterns, Premium Fibernet might be a better fit for you.",
    isRead: true,
    createdAt: "2024-01-08T09:15:00Z",
    priority: "low",
    actionRequired: false,
    actionUrl: "/plans/2"
  },
  {
    id: 4,
    userId: 2,
    type: "promotion",
    title: "Special Offer Available",
    message: "Get 20% off on Premium Fibernet for the next 30 days! Limited time offer.",
    isRead: false,
    createdAt: "2024-01-11T16:45:00Z",
    priority: "medium",
    actionRequired: true,
    actionUrl: "/offers/premium-discount"
  }
];

let nextId = 5;

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get user notifications
export const getUserNotifications = async (userId) => {
  try {
    const res = await api.get(`/users/${userId}/notifications`);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    return sampleNotifications.filter(notification => notification.userId === userId);
  }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const res = await api.put(`/notifications/${notificationId}/read`);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(300);
    
    const notificationIndex = sampleNotifications.findIndex(n => n.id === notificationId);
    if (notificationIndex !== -1) {
      sampleNotifications[notificationIndex] = {
        ...sampleNotifications[notificationIndex],
        isRead: true
      };
    }
    return sampleNotifications[notificationIndex];
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (userId) => {
  try {
    const res = await api.put(`/users/${userId}/notifications/read-all`);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    sampleNotifications = sampleNotifications.map(notification => 
      notification.userId === userId 
        ? { ...notification, isRead: true }
        : notification
    );
    
    return sampleNotifications.filter(n => n.userId === userId);
  }
};

// Delete notification
export const deleteNotification = async (notificationId) => {
  try {
    const res = await api.delete(`/notifications/${notificationId}`);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(300);
    
    const notificationIndex = sampleNotifications.findIndex(n => n.id === notificationId);
    if (notificationIndex !== -1) {
      const deletedNotification = sampleNotifications[notificationIndex];
      sampleNotifications.splice(notificationIndex, 1);
      return deletedNotification;
    }
    throw new Error("Notification not found");
  }
};

// Create notification (for admin/system)
export const createNotification = async (notificationData) => {
  try {
    const res = await api.post("/notifications", notificationData);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    const newNotification = {
      id: nextId++,
      ...notificationData,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    
    sampleNotifications.push(newNotification);
    return newNotification;
  }
};

// Get notification statistics
export const getNotificationStats = async (userId) => {
  try {
    const res = await api.get(`/users/${userId}/notifications/stats`);
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(300);
    
    const userNotifications = sampleNotifications.filter(n => n.userId === userId);
    const unreadCount = userNotifications.filter(n => !n.isRead).length;
    const highPriorityCount = userNotifications.filter(n => n.priority === "high" && !n.isRead).length;
    const actionRequiredCount = userNotifications.filter(n => n.actionRequired && !n.isRead).length;
    
    return {
      total: userNotifications.length,
      unread: unreadCount,
      highPriority: highPriorityCount,
      actionRequired: actionRequiredCount
    };
  }
};

// Send renewal reminder (system function)
export const sendRenewalReminder = async (subscriptionId) => {
  try {
    const res = await api.post(`/notifications/renewal-reminder`, { subscriptionId });
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    // This would typically fetch subscription details and create a notification
    const renewalNotification = {
      id: nextId++,
      userId: 1, // This would come from subscription data
      type: "renewal_reminder",
      title: "Subscription Renewal Reminder",
      message: "Your subscription will renew in 3 days. Make sure your payment method is up to date.",
      isRead: false,
      createdAt: new Date().toISOString(),
      priority: "medium",
      actionRequired: true,
      actionUrl: `/subscriptions/${subscriptionId}/renew`
    };
    
    sampleNotifications.push(renewalNotification);
    return renewalNotification;
  }
};

// Send usage alert (system function)
export const sendUsageAlert = async (subscriptionId, usagePercentage) => {
  try {
    const res = await api.post(`/notifications/usage-alert`, { subscriptionId, usagePercentage });
    return res.data;
  } catch (error) {
    console.log("Using sample data - API not available");
    await delay(500);
    
    const alertNotification = {
      id: nextId++,
      userId: 1, // This would come from subscription data
      type: "usage_alert",
      title: "High Data Usage Alert",
      message: `You've used ${usagePercentage}% of your monthly data quota. Consider upgrading your plan.`,
      isRead: false,
      createdAt: new Date().toISOString(),
      priority: usagePercentage > 90 ? "high" : "medium",
      actionRequired: true,
      actionUrl: "/plans"
    };
    
    sampleNotifications.push(alertNotification);
    return alertNotification;
  }
};
