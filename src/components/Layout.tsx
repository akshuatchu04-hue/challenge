import React from 'react';
import { LayoutGrid, ShoppingCart, BarChart3, Settings, Menu, MoreVertical } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  currentView: 'dashboard' | 'orders' | 'analytics' | 'settings';
  onNavigate: (view: 'dashboard' | 'orders' | 'analytics' | 'settings') => void;
}

export function Layout({ children, currentView, onNavigate }: LayoutProps) {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex overflow-hidden font-body">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full z-40 bg-slate-50 dark:bg-slate-950 w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-200 ease-in-out">
        <div className="px-6 py-8">
          <h1 className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">Architect UI</h1>
        </div>
        
        <nav className="flex-1 space-y-1 px-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out",
              currentView === 'dashboard' 
                ? "text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-900/20 border-r-2 border-indigo-600" 
                : "text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
            )}
          >
            <LayoutGrid className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => onNavigate('orders')}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out",
              currentView === 'orders' 
                ? "text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-900/20 border-r-2 border-indigo-600" 
                : "text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
            )}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Orders</span>
          </button>
          
          <button
            onClick={() => onNavigate('analytics')}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out",
              currentView === 'analytics' 
                ? "text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-900/20 border-r-2 border-indigo-600" 
                : "text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
            )}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </button>
          
          <button
            onClick={() => onNavigate('settings')}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out",
              currentView === 'settings' 
                ? "text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-900/20 border-r-2 border-indigo-600" 
                : "text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
            )}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-surface-container-low rounded-xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-xs">JD</div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-on-surface">John Doe</p>
              <p className="text-[10px] text-on-surface-variant">Admin Access</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen relative overflow-y-auto">
        {/* Top Bar */}
        <header className="sticky top-0 w-full flex justify-between items-center px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none z-50">
          <div className="flex items-center gap-4">
            <button className="text-indigo-600 dark:text-indigo-400 active:scale-95 transition-transform">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
              {currentView === 'dashboard' ? 'Dashboard Builder' : 'Order Management'}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:opacity-80 transition-opacity active:scale-95 transition-transform">
              Cancel
            </button>
            <button className="px-5 py-2 text-sm font-semibold text-on-primary bg-gradient-to-br from-primary to-primary-dim rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all">
              Save Changes
            </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
