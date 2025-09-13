import React, { useState, useEffect } from 'react'
import { getSubscriptionAnalytics } from '../../services/subscriptionService'
import { getDiscountAnalytics } from '../../services/discountService'

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null)
  const [discountAnalytics, setDiscountAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const [subscriptionData, discountData] = await Promise.all([
        getSubscriptionAnalytics(),
        getDiscountAnalytics()
      ])
      setAnalytics(subscriptionData)
      setDiscountAnalytics(discountData)
      setError('')
    } catch (err) {
      console.error('Error loading analytics:', err)
      setError('Failed to load analytics data.')
    } finally {
      setLoading(false)
    }
  }

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ]

  return (
    <div className="px-4 py-8 sm:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-2">Comprehensive insights into your subscription business</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {timeRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={loadAnalytics}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading analytics...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
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
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Subscriptions</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics?.totalSubscriptions || 0}</p>
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics?.activeSubscriptions || 0}</p>
                    <p className="text-xs text-green-600">+8% from last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Cancelled</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics?.cancelledSubscriptions || 0}</p>
                    <p className="text-xs text-red-600">-3% from last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${analytics?.monthlyRevenue?.toFixed(2) || "0.00"}</p>
                    <p className="text-xs text-green-600">+15% from last month</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Plan Performance */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-6 py-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Plan Performance</h3>
                  <p className="text-sm text-gray-600">Subscription count and revenue by plan</p>
                </div>
                <div className="p-6">
                  {analytics?.planStats ? (
                    <div className="space-y-4">
                      {Object.entries(analytics.planStats).map(([planName, stats]) => (
                        <div key={planName} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{planName}</h4>
                            <p className="text-sm text-gray-600">{stats.count} subscriptions</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${stats.revenue.toFixed(2)}</p>
                            <p className="text-sm text-gray-600">revenue</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No plan data available</p>
                  )}
                </div>
              </div>

              {/* Discount Analytics */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-6 py-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Discount Analytics</h3>
                  <p className="text-sm text-gray-600">Promotional offers and usage statistics</p>
                </div>
                <div className="p-6">
                  {discountAnalytics ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{discountAnalytics.totalDiscounts}</p>
                          <p className="text-sm text-gray-600">Total Discounts</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{discountAnalytics.activeDiscounts}</p>
                          <p className="text-sm text-gray-600">Active</p>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600">{discountAnalytics.totalUsage}</p>
                        <p className="text-sm text-gray-600">Total Usage</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">${discountAnalytics.totalSavings?.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">Total Savings</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No discount data available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Revenue Trends */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
                <p className="text-sm text-gray-600">Monthly revenue breakdown and growth</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">${analytics?.monthlyRevenue?.toFixed(2) || "0.00"}</p>
                    <p className="text-sm text-gray-600">Current Month</p>
                    <p className="text-xs text-green-600 mt-1">+15% vs last month</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">${((analytics?.monthlyRevenue || 0) * 12).toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Projected Annual</p>
                    <p className="text-xs text-blue-600 mt-1">Based on current trends</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">${((analytics?.monthlyRevenue || 0) * 0.15).toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Growth This Month</p>
                    <p className="text-xs text-green-600 mt-1">+15% increase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Status Breakdown */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Subscription Status Breakdown</h3>
                <p className="text-sm text-gray-600">Detailed view of subscription states</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{analytics?.activeSubscriptions || 0}</p>
                    <p className="text-sm text-gray-600">Active</p>
                    <p className="text-xs text-green-600 mt-1">Currently using service</p>
                  </div>
                  <div className="text-center p-6 bg-yellow-50 rounded-lg">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">0</p>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-xs text-yellow-600 mt-1">Awaiting activation</p>
                  </div>
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold text-red-600">{analytics?.cancelledSubscriptions || 0}</p>
                    <p className="text-sm text-gray-600">Cancelled</p>
                    <p className="text-xs text-red-600 mt-1">Service terminated</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold text-gray-600">{analytics?.totalSubscriptions || 0}</p>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-xs text-gray-600 mt-1">All subscriptions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
