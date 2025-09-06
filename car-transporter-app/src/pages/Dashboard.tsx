// src/pages/Dashboard.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useOrders } from "../context/OrdersContext";
import { useCurrency } from "../context/CurrencyContext";
import InlinePrice from "../components/InlinePrice";
import EmptyState from "../components/EmptyState";

export default function Dashboard() {
  const { user } = useUser();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'profile'>('overview');

  if (!user) {
    return (
      <EmptyState
        icon="👤"
        title="მომხმარებელი ვერ მოიძებნა"
        description="თქვენი ანგარიში ვერ მოიძებნა. გთხოვთ ახლიდან შეხვიდეთ სისტემაში."
        actionText="ავტორიზაცია"
        actionLink="/login"
      />
    );
  }

  const recentOrders = orders.slice(0, 3);
  const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'მიღებული';
      case 'shipped': return 'გზავნილში';
      case 'processing': return 'დამუშავებაში';
      case 'pending': return 'მოლოდინში';
      case 'cancelled': return 'გაუქმებული';
      default: return status;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            მოგესალმებით, {user.fullName}
          </h1>
          <p className="text-gray-600">
            თქვენი ანგარიშის მართვა და შეკვეთების მონიტორინგი
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'overview', label: 'მიმოხილვა', icon: '📊' },
                { key: 'orders', label: 'შეკვეთები', icon: '📦' },
                { key: 'profile', label: 'პროფილი', icon: '👤' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">სულ შეკვეთები</p>
                    <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">სულ ხარჯი</p>
                    <div className="text-2xl font-bold text-gray-900">
                      <InlinePrice price={totalSpent} size="md" showCurrencyToggle={false} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <span className="text-2xl">🚗</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">შეძენილი მანქანები</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">ბოლო შეკვეთები</h2>
                  <Link 
                    to="#"
                    onClick={() => setActiveTab('orders')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    ყველას ნახვა →
                  </Link>
                </div>
              </div>
              
              {recentOrders.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">შეკვეთები არ არის</h3>
                  <p className="text-gray-600 mb-4">ჯერ არ გაქვთ გაფორმებული შეკვეთები</p>
                  <Link
                    to="/shop"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    შოპინგის დაწყება
                  </Link>
                </div>
              ) : (
                <div className="divide-y">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={order.items[0].car.images[0]}
                            alt={`${order.items[0].car.make} ${order.items[0].car.model}`}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {order.orderNumber}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.orderDate).toLocaleDateString('ka-GE')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <InlinePrice price={order.totalAmount} size="sm" showCurrencyToggle={false} />
                            <p className="text-xs text-gray-500">{order.items.length} ნივთი</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">ყველა შეკვეთა</h2>
            </div>
            
            {orders.length === 0 ? (
              <div className="p-8 text-center">
                <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">📦</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">შეკვეთები არ არის</h3>
                <p className="text-gray-600 mb-6">თქვენ ჯერ არ გაქვთ გაფორმებული შეკვეთები</p>
                <Link
                  to="/shop"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  შოპინგის დაწყება
                </Link>
              </div>
            ) : (
              <div className="divide-y">
                {orders.map((order) => (
                  <div key={order.id} className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={order.items[0].car.images[0]}
                            alt={`${order.items[0].car.make} ${order.items[0].car.model}`}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="font-bold text-gray-900">{order.orderNumber}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {order.items.map(item => `${item.car.year} ${item.car.make} ${item.car.model}`).join(', ')}
                          </p>
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>შეკვეთის თარიღი: {new Date(order.orderDate).toLocaleDateString('ka-GE')}</p>
                            {order.estimatedDelivery && (
                              <p>მოსალოდნელი მიღება: {new Date(order.estimatedDelivery).toLocaleDateString('ka-GE')}</p>
                            )}
                            {order.trackingNumber && (
                              <p>თრექინგ კოდი: {order.trackingNumber}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="mb-2">
                          <InlinePrice price={order.totalAmount} size="md" showCurrencyToggle={false} />
                        </div>
                        <p className="text-xs text-gray-500 mb-3">{order.items.length} ნივთი</p>
                        <div className="space-y-2">
                          <button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                            დეტალების ნახვა
                          </button>
                          {order.status === 'shipped' && (
                            <button className="w-full lg:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm transition-colors">
                              თრექინგი
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <ProfileTab user={user} />
        )}
      </div>
    </div>
  );
}

// Profile Tab Component
function ProfileTab({ user }: { user: any }) {
  const { updateProfile, isLoading } = useUser();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city,
    zipCode: user.zipCode
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleSave = async () => {
    const success = await updateProfile(formData);
    if (success) {
      setEditing(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {updateSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">პროფილი წარმატებით განახლდა!</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">პირადი ინფორმაცია</h2>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              რედაქტირება
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm transition-colors"
              >
                გაუქმება
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors disabled:bg-green-400"
              >
                {isLoading ? 'შენახვა...' : 'შენახვა'}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">სრული სახელი</label>
            {editing ? (
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{user.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ელ-ფოსტა</label>
            {editing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{user.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ტელეფონი</label>
            {editing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{user.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ქალაქი</label>
            {editing ? (
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{user.city}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">მისამართი</label>
            {editing ? (
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{user.address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">საფოსტო კოდი</label>
            {editing ? (
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{user.zipCode}</p>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="text-md font-medium text-gray-900 mb-3">ანგარიშის ინფორმაცია</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">რეგისტრაციის თარიღი</label>
              <p className="text-gray-900">{new Date(user.dateJoined).toLocaleDateString('ka-GE')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ვალუტის პრეფერენსი</label>
              <p className="text-gray-900">{user.preferences.currency}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">პარამეტრები</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">ელ-ფოსტის შეტყობინებები</p>
              <p className="text-sm text-gray-500">შეკვეთების და აქციების შესახებ</p>
            </div>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                user.preferences.notifications.email ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  user.preferences.notifications.email ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">SMS შეტყობინებები</p>
              <p className="text-sm text-gray-500">ტელეფონზე შეტყობინებები</p>
            </div>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                user.preferences.notifications.sms ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  user.preferences.notifications.sms ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}