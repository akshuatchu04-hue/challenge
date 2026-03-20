import React, { useState } from 'react';
import { X, User, Receipt, DollarSign, Info } from 'lucide-react';

interface Order {
  id?: string;
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
}

interface Props {
  order: Order | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function OrderForm({ order, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState<Order>(order || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
    product: 'Fiber 300',
    quantity: 1,
    unitPrice: 0,
    totalAmount: 0,
    status: 'Pending',
    createdBy: 'Admin Sarah',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const method = order?.id ? 'PUT' : 'POST';
    const url = order?.id ? `/api/orders/${order.id}` : '/api/orders';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.error || `HTTP error! status: ${res.status}`);
      }
    } catch (err) {
      console.error('Order form submission error:', err);
      setError('Failed to submit order. Please check your connection and try again.');
    }
  };

  const totalAmount = formData.quantity * formData.unitPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 md:p-6">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-xl shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {order ? 'Edit Order' : 'Create New Order'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Enter the customer and order details below.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {/* Customer Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-2">
              <User className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Customer Info</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">First Name *</label>
                <input 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400" 
                  placeholder="e.g. John" 
                  required 
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Last Name *</label>
                <input 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400" 
                  placeholder="e.g. Doe" 
                  required 
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Email *</label>
                <input 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400" 
                  placeholder="john.doe@example.com" 
                  required 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Phone *</label>
                <input 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400" 
                  placeholder="+1 (555) 000-0000" 
                  required 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Street Address *</label>
                <input 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400" 
                  placeholder="123 Business Way" 
                  required
                  type="text"
                  value={formData.streetAddress}
                  onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">City *</label>
                <input 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400" 
                  placeholder="New York" 
                  required
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">State / Province *</label>
                <input 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400" 
                  placeholder="NY" 
                  required
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Postal Code *</label>
                <input 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400" 
                  placeholder="10001" 
                  required
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Country</label>
                <select 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                >
                  <option value="US">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Hong Kong">Hong Kong</option>
                </select>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-2">
              <Receipt className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Order Info</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Product Selection</label>
                <select 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                >
                  <option value="Fiber 300">Fiber 300</option>
                  <option value="5G Plan">5G Plan</option>
                  <option value="Enterprise License">Enterprise License</option>
                  <option value="Pro Architecture Kit">Pro Architecture Kit</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Quantity *</label>
                <input 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all" 
                  min="1" 
                  required 
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => {
                    const quantity = Math.max(1, parseInt(e.target.value) || 1);
                    setFormData({ 
                      ...formData, 
                      quantity,
                      totalAmount: quantity * formData.unitPrice
                    });
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Unit Price ($)</label>
                <input 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all" 
                  step="0.01" 
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) => {
                    const unitPrice = parseFloat(e.target.value) || 0;
                    setFormData({ 
                      ...formData, 
                      unitPrice,
                      totalAmount: formData.quantity * unitPrice
                    });
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Status</label>
                <select 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Created By</label>
                <input 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all" 
                  type="text"
                  value={formData.createdBy}
                  onChange={(e) => setFormData({ ...formData, createdBy: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Calculated Summary */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-100 dark:border-slate-700">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">Auto-Calculated Total</p>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">${totalAmount.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs italic">
              <Info className="w-4 h-4" />
              Calculated as Quantity × Unit Price
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6">
            <button 
              type="button"
              onClick={onClose} 
              className="px-6 py-2.5 text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors active:scale-95"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-8 py-2.5 text-sm font-bold text-white bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
