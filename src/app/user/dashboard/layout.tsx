"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { HomeIcon, UserIcon, PackageIcon, PlusCircleIcon, UsersIcon, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/user/dashboard/vendor', icon: HomeIcon },
  { name: 'My Profile', href: '/user/dashboard/vendor/profile', icon: UserIcon },
  { name: 'Products', href: '/user/dashboard/vendor/products', icon: PackageIcon },
  { name: 'Create a product', href: '/user/dashboard/vendor/products/create', icon: PlusCircleIcon },
  { name: 'Customers', href: '/user/dashboard/vendor/customers', icon: UsersIcon },
]

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r">
          <div className="flex flex-col h-full">
            <div className="flex-1 py-6 overflow-y-auto">
              <nav className="px-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  )
                })}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 w-full"
                >
                    <LogOut />
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="py-6 px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

