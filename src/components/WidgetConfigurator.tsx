import React, { useState } from 'react';
import { X, Settings, Database, Maximize2, Palette, Trash2 } from 'lucide-react';

interface Widget {
  id: string;
  type: 'kpi' | 'bar' | 'line' | 'pie' | 'table';
  title: string;
  config: any;
  width: number;
  height: number;
  position: { x: number; y: number };
}

interface Props {
  widget: Widget;
  onClose: () => void;
  onSave: (widget: Widget) => void;
}

export function WidgetConfigurator({ widget, onClose, onSave }: Props) {
  const [config, setConfig] = useState(widget);

  const handleChange = (field: string, value: any) => {
    if (field.startsWith('config.')) {
      const configField = field.split('.')[1];
      setConfig({
        ...config,
        config: { ...config.config, [configField]: value }
      });
    } else {
      setConfig({ ...config, [field]: value });
    }
  };

  return (
    <aside className="w-[400px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-y-auto z-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-on-surface font-semibold text-sm mb-1">Widget Settings</h3>
            <p className="text-on-surface-variant text-xs">Configure the active element</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-10">
          {/* Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider">Widget Identity</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Widget Title</label>
                <input 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10 placeholder:text-slate-400" 
                  type="text" 
                  value={config.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Maximize2 className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider">Canvas Settings</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Width (Cols)</label>
                <select 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10"
                  value={config.width}
                  onChange={(e) => handleChange('width', parseInt(e.target.value))}
                >
                  <option value={4}>4 (Small)</option>
                  <option value={8}>8 (Medium)</option>
                  <option value={12}>12 (Full)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Height (Rows)</label>
                <input 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10" 
                  type="number" 
                  value={config.height}
                  onChange={(e) => handleChange('height', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Data Mapping */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider">Data Source</h3>
            </div>
            
            <div className="space-y-6">
              {config.type === 'kpi' ? (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Metric Source</label>
                  <select 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10"
                    value={config.config.metric}
                    onChange={(e) => handleChange('config.metric', e.target.value)}
                  >
                    <option value="totalAmount">Total Revenue</option>
                    <option value="quantity">Total Quantity</option>
                    <option value="unitPrice">Average Unit Price</option>
                    <option value="id">Order Count</option>
                  </select>
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">X-Axis Field</label>
                    <select 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10"
                      value={config.config.xAxis}
                      onChange={(e) => handleChange('config.xAxis', e.target.value)}
                    >
                      <option value="country">Country</option>
                      <option value="product">Product</option>
                      <option value="status">Status</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Y-Axis Field</label>
                    <select 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10"
                      value={config.config.yAxis}
                      onChange={(e) => handleChange('config.yAxis', e.target.value)}
                    >
                      <option value="totalAmount">Total Revenue</option>
                      <option value="quantity">Quantity</option>
                    </select>
                  </div>
                </>
              )}
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Aggregation</label>
                <div className="flex gap-2">
                  {['SUM', 'AVERAGE', 'COUNT'].map((agg) => (
                    <button
                      key={agg}
                      onClick={() => handleChange('config.aggregation', agg)}
                      className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                        config.config.aggregation === agg 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {agg}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
            <button 
              onClick={() => onSave(config)}
              className="w-full py-3 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
