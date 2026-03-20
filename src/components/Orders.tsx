import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Download, Plus, 
  Edit, Trash2, ChevronLeft, ChevronRight, 
  RefreshCw, Package2, TrendingUp, DollarSign, AlertCircle 
} from 'lucide-react';
import { OrderForm } from './OrderForm';

interface Order {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  product: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: string;
  createdBy: string;
  createdAt: string;
}

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('All time');
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const fetchOrders = () => {
    const params = new URLSearchParams({ search, dateRange });
    setError(null);
    fetch(`/api/orders?${params}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Orders fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [search, dateRange]);

  const deleteOrder = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    try {
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      fetchOrders();
    } catch (err) {
      console.error('Failed to delete order:', err);
      alert('Failed to delete order. Please try again.');
    }
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);

  return (
    <section className="p-6 md:p-10 space-y-8">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm flex justify-between items-center border border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[11px] font-medium tracking-wide uppercase text-slate-400 mb-1">Total Revenue</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">${totalRevenue.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm flex justify-between items-center border border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[11px] font-medium tracking-wide uppercase text-slate-400 mb-1">Active Orders</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{orders.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Package2 className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm flex justify-between items-center border border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[11px] font-medium tracking-wide uppercase text-slate-400 mb-1">Completion Rate</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">94.2%</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </div>
        </div>
      </div>

      {/* Table Container */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 border border-red-100 dark:border-red-800">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">Failed to load orders: {error}</p>
          <button onClick={fetchOrders} className="ml-auto text-xs font-bold underline">Retry</button>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/10 placeholder:text-slate-400" 
              placeholder="Search orders, customers..." 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-4 py-2 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/10"
            >
              <option>Today</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>All time</option>
            </select>
            
            <button 
              onClick={() => { setEditingOrder(null); setShowForm(true); }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm active:scale-95 transition-transform"
            >
              <Plus className="w-4 h-4" />
              Create Order
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Customer Name</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Email</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Product</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">Qty</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Total</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                        {order.firstName[0]}{order.lastName[0]}
                      </div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{order.firstName} {order.lastName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{order.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{order.product}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 text-center">{order.quantity}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">${order.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                      order.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        order.status === 'Completed' ? 'bg-emerald-500' : 
                        order.status === 'In Progress' ? 'bg-blue-500' : 'bg-amber-500'
                      }`}></span>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setEditingOrder(order); setShowForm(true); }}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteOrder(order.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-800/20">
          <span className="text-sm text-slate-500 dark:text-slate-400">Showing <span className="font-bold text-slate-900 dark:text-white">1-{orders.length}</span> of <span className="font-bold text-slate-900 dark:text-white">{orders.length}</span></span>
          <div className="flex items-center gap-1">
            <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-30" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-bold">1</button>
            <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {orders.length === 0 && !loading && (
        <div className="bg-white dark:bg-slate-900 p-20 rounded-xl shadow-sm border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Package2 className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No active orders found</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-xs mb-8">It looks like there are no orders matching your criteria. Try adjusting your filters or create a new order.</p>
          <button 
            onClick={() => { setSearch(''); setDateRange('All time'); }}
            className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-6 py-2.5 text-sm font-bold text-slate-900 dark:text-white shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Clear All Filters
          </button>
        </div>
      )}

      {showForm && (
        <OrderForm 
          order={editingOrder} 
          onClose={() => setShowForm(false)} 
          onSuccess={() => { setShowForm(false); fetchOrders(); }}
        />
      )}
    </section>
  );
}
