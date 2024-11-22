"use client"

import { Users, Package, Monitor } from 'lucide-react'

const stats = [
  {
    name: 'Total Products',
    value: '523',
    change: '+16%',
    changeType: 'increase',
    icon: Package,
    timeframe: 'this month'
  },
  {
    name: 'Active Customers',
    value: '388',
    change: '-1%',
    changeType: 'decrease',
    icon: Users,
    timeframe: 'this month'
  },
  {
    name: 'Current Online Sales',
    value: '189',
    icon: Monitor,
  },
]

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden rounded-lg border"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      {stat.change && (
                        <div className={`ml-2 flex items-baseline text-sm ${
                          stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                          <span className="ml-1 text-gray-500">
                            {stat.timeframe}
                          </span>
                        </div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

