import React, { useEffect, useState } from 'react'
import { 
  getUserSubscriptions, 
  subscribeToPlan, 
  upgradeSubscription, 
  downgradeSubscription, 
  cancelSubscription, 
  renewSubscription, 
  toggleAutoRenewal 
} from '../../services/subscriptionService'
import { getPlans } from '../../services/planService'

export default function SubscriptionManagement({ userId = 1 }) {
  const [subscriptions, setSubscriptions] = useState([])
  const [availablePlans, setAvailablePlans] = useState([])
  const [showSubscribeForm, setShowSubscribeForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [userId])

  const loadData = async () => {
    setLoading(true)
    try {
      const [subscriptionsData, plansData] = await Promise.all([
        getUserSubscriptions(userId),
        getPlans()
      ])
      setSubscriptions(subscriptionsData)
      setAvailablePlans(plansData)
      setError('')
    } catch (err) {
      console.error('Error loading data:', err)
      setError('Failed to load subscription data.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async (planId) => {
    try {
      await subscribeToPlan(userId, planId)
      setShowSubscribeForm(false)
      loadData()
    } catch (err) {
      console.error('Error subscribing:', err)
      setError('Failed to subscribe to plan.')
    }
  }

  const handleUpgrade = async (subscriptionId, newPlanId) => {
    try {
      await upgradeSubscription(subscriptionId, newPlanId)
      loadData()
    } catch (err) {
      console.error('Error upgrading:', err)
      setError('Failed to upgrade subscription.')
    }
  }

  const handleDowngrade = async (subscriptionId, newPlanId) => {
    try {
      await downgradeSubscription(subscriptionId, newPlanId)
      loadData()
    } catch (err) {
      console.error('Error downgrading:', err)
      setError('Failed to downgrade subscription.')
    }
  }

  const handleCancel = async (subscriptionId) => {
    const subscription = subscriptions.find(s => s.id === subscriptionId)
    if (!subscription) return

    const confirmed = window.confirm(
      `Are you sure you want to cancel your "${subscription.planName}" subscription?`
    )

    if (!confirmed) return

    try {
      await cancelSubscription(subscriptionId)
      loadData()
    } catch (err) {
      console.error('Error cancelling:', err)
      setError('Failed to cancel subscription.')
    }
  }

  const handleRenew = async (subscriptionId) => {
    try {
      await renewSubscription(subscriptionId)
      loadData()
    } catch (err) {
      console.error('Error renewing:', err)
      setError('Failed to renew subscription.')
    }
  }

  const handleToggleAutoRenewal = async (subscriptionId) => {
    try {
      await toggleAutoRenewal(subscriptionId)
      loadData()
    } catch (err) {
      console.error('Error toggling auto-renewal:', err)
      setError('Failed to update auto-renewal setting.')
    }
  }

  return (
    <div className="px-4 py-8 sm:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Subscriptions</h1>
              <p className="text-gray-600 mt-2">Manage your broadband subscriptions</p>
            </div>
            <button
              onClick={() => setShowSubscribeForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Subscribe to Plan
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading subscriptions...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Subscriptions List */}
            {subscriptions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No subscriptions yet</h3>
                <p className="text-gray-600 mb-4">Get started by subscribing to a plan</p>
                <button
                  onClick={() => setShowSubscribeForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Browse Plans
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {subscriptions.map((subscription) => (
                  <div key={subscription.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{subscription.planName}</h3>
                        <p className="text-sm text-gray-600">Subscription #{subscription.id}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        subscription.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscription.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Price:</span>
                        <span className="text-sm font-medium">${subscription.price}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Data Quota:</span>
                        <span className="text-sm font-medium">{subscription.dataQuota} GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Data Used:</span>
                        <span className="text-sm font-medium">{subscription.dataUsed} GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Next Billing:</span>
                        <span className="text-sm font-medium">{subscription.nextBillingDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Auto Renewal:</span>
                        <span className={`text-sm font-medium ${subscription.autoRenew ? 'text-green-600' : 'text-red-600'}`}>
                          {subscription.autoRenew ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>

                    {/* Data Usage Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Data Usage</span>
                        <span>{subscription.dataUsed} / {subscription.dataQuota} GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((subscription.dataUsed / subscription.dataQuota) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {subscription.status === 'active' && (
                        <>
                          <button
                            onClick={() => handleToggleAutoRenewal(subscription.id)}
                            className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                              subscription.autoRenew
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {subscription.autoRenew ? 'Disable Auto-Renewal' : 'Enable Auto-Renewal'}
                          </button>
                          <button
                            onClick={() => handleCancel(subscription.id)}
                            className="px-3 py-1 text-xs font-medium rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {subscription.status === 'cancelled' && (
                        <button
                          onClick={() => handleRenew(subscription.id)}
                          className="px-3 py-1 text-xs font-medium rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                        >
                          Renew
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Subscribe to New Plan Modal */}
            {showSubscribeForm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Subscribe to a Plan</h3>
                      <button
                        onClick={() => setShowSubscribeForm(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {availablePlans.map((plan) => (
                        <div key={plan.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">{plan.name}</h4>
                              <p className="text-sm text-gray-600">{plan.description}</p>
                              <p className="text-sm text-gray-500">{plan.dataQuota} GB • ${plan.price}/month</p>
                            </div>
                            <button
                              onClick={() => handleSubscribe(plan.id)}
                              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

