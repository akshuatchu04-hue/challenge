import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Plus, Settings as SettingsIcon, Trash2, 
  LayoutGrid, BarChart3, PieChart as PieChartIcon, 
  Table as TableIcon, Activity, TrendingUp, 
  Zap, UserPlus, AlertCircle 
} from 'lucide-react';
import { WidgetConfigurator } from './WidgetConfigurator';

interface Widget {
  id: string;
  type: 'kpi' | 'bar' | 'line' | 'pie' | 'table';
  title: string;
  config: any;
  width: number;
  height: number;
  position: { x: number; y: number };
}

const KpiCardComponent = ({ data, config }: any) => (
  <div className="flex items-baseline gap-2">
    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
      {config.metric === 'totalAmount' || config.metric === 'unitPrice' ? '$' : ''}
      {data?.value?.toLocaleString() || 0}
    </h4>
    <span className="text-xs text-green-600 font-medium">+12.5%</span>
  </div>
);

const BarChartComponent = ({ data }: any) => (
  <div className="h-full w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data || []}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
        <YAxis fontSize={10} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
        <Bar dataKey="value" fill="#494bd6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const LineChartComponent = ({ data }: any) => (
  <div className="h-full w-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data || []}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
        <YAxis fontSize={10} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
        <Line type="monotone" dataKey="value" stroke="#494bd6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const PieChartComponent = ({ data }: any) => (
  <div className="h-full w-full">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data || []} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
          {(data || []).map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={['#494bd6', '#8083ff', '#3c3dca', '#d1d0ff'][index % 4]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const DataTableComponent = ({ data }: any) => (
  <div className="flex-1 overflow-hidden">
    <table className="w-full text-[10px]">
      <thead>
        <tr className="text-left text-slate-400 border-b border-slate-50 dark:border-slate-800">
          <th className="pb-2 font-bold uppercase tracking-wider">Customer</th>
          <th className="pb-2 font-bold uppercase tracking-wider">Product</th>
          <th className="pb-2 font-bold uppercase tracking-wider text-right">Amount</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
        {(data || []).map((row: any) => (
          <tr key={row.id} className="text-slate-600 dark:text-slate-300">
            <td className="py-2 font-medium">{row.customer}</td>
            <td className="py-2">{row.product}</td>
            <td className="py-2 text-right font-bold text-slate-900 dark:text-white">${row.amount.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const widgetComponents: Record<string, React.ComponentType<any>> = {
  kpi: KpiCardComponent,
  bar: BarChartComponent,
  line: LineChartComponent,
  pie: PieChartComponent,
  table: DataTableComponent
};

export function Dashboard() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setWidgets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Dashboard fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSave = async (newWidgets: Widget[]) => {
    try {
      const res = await fetch('/api/dashboard/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWidgets),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      setWidgets(newWidgets);
    } catch (err) {
      console.error('Failed to save dashboard:', err);
      alert('Failed to save dashboard. Please try again.');
    }
  };

  const removeWidget = (id: string) => {
    const newWidgets = widgets.filter(w => w.id !== id);
    handleSave(newWidgets);
  };

  const addWidget = (type: Widget['type'], title: string) => {
    console.log("Widget clicked:", type);
    const newWidget: Widget = {
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      title: title,
      config: type === 'kpi' 
        ? { metric: 'totalAmount', aggregation: 'SUM' }
        : { xAxis: 'country', yAxis: 'totalAmount', aggregation: 'SUM' },
      width: type === 'kpi' ? 4 : 8,
      height: type === 'kpi' ? 1 : 3,
      position: { x: 0, y: 0 }
    };
    const updatedWidgets = [...widgets, newWidget];
    setWidgets(updatedWidgets);
    console.log("Widgets state:", updatedWidgets);
    handleSave(updatedWidgets);
  };

  if (loading) return <div className="p-12 text-center">Loading dashboard...</div>;

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Widget List Sidebar */}
      <aside className="w-72 bg-surface-container-low p-6 overflow-y-auto border-r border-slate-200 dark:border-slate-800">
        <div className="mb-6">
          <h3 className="text-on-surface font-semibold text-sm mb-1">Available Widgets</h3>
          <p className="text-on-surface-variant text-xs">Click to add to canvas</p>
        </div>
        
        <div className="grid gap-3">
          {[
            { type: 'bar', title: 'Bar Chart', icon: BarChart3 },
            { type: 'line', title: 'Line Chart', icon: Activity },
            { type: 'pie', title: 'Pie Chart', icon: PieChartIcon },
            { type: 'table', title: 'Data Table', icon: TableIcon },
            { type: 'kpi', title: 'KPI Card', icon: Zap },
          ].map((item) => (
            <button
              key={item.title}
              onClick={() => addWidget(item.type as any, item.title)}
              className="group p-4 bg-white dark:bg-slate-900 rounded-xl border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all shadow-sm flex items-center gap-3 text-left"
            >
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">{item.title}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Center Canvas */}
      <div className="flex-1 p-8 overflow-y-auto bg-surface canvas-grid">
        <div className="max-w-6xl mx-auto space-y-6">
          {widgets.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-full border border-dashed border-slate-300 dark:border-slate-700 p-12 flex flex-col items-center text-center shadow-sm mt-4">
              <div className="w-24 h-24 mb-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <LayoutGrid className="w-12 h-12 text-slate-400" />
              </div>
              <h2 className="text-on-surface text-xl font-bold mb-2">No widgets configured</h2>
              <p className="text-on-surface-variant text-sm max-w-[240px] mb-8">
                Add your first widget to get started with your workspace analytics.
              </p>
              <button className="flex items-center gap-2 text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors">
                <Plus className="w-5 h-5" />
                Explore Templates
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-6 min-h-[800px]">
              {widgets.map((widget) => (
                <WidgetCard 
                  key={widget.id} 
                  widget={widget} 
                  onRemove={() => removeWidget(widget.id)}
                  onEdit={() => { setSelectedWidget(widget); }}
                />
              ))}
              
              <div className="col-span-12 h-24 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/50">
                <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Drag widget here to add
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Settings Sidebar */}
      {selectedWidget && (
        <WidgetConfigurator 
          widget={selectedWidget} 
          onClose={() => setSelectedWidget(null)}
          onSave={(updated) => {
            const newWidgets = widgets.map(w => w.id === updated.id ? updated : w);
            handleSave(newWidgets);
            setSelectedWidget(null);
          }}
        />
      )}
    </div>
  );
}

function WidgetCard({ widget, onRemove, onEdit }: { widget: Widget; onRemove: () => void; onEdit: () => void; key?: string }) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let endpoint = '/api/dashboard/chart';
    if (widget.type === 'kpi') endpoint = '/api/dashboard/kpi';
    if (widget.type === 'table') endpoint = '/api/dashboard/table';

    const params = new URLSearchParams(widget.config);
    setError(null);
    fetch(`${endpoint}?${params}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch(err => {
        console.error('Widget data fetch error:', err);
        setError(err.message);
      });
  }, [widget.config, widget.type]);

  const colSpan = widget.width === 4 ? 'col-span-4' : widget.width === 8 ? 'col-span-8' : 'col-span-12';
  const heightClass = widget.height === 1 ? 'h-32' : 'h-80';

  return (
    <div className={`${colSpan} ${heightClass} group relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all flex flex-col`}>
      <div className="flex justify-between items-start mb-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{widget.title}</p>
        <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
          <button onClick={onEdit} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
            <SettingsIcon className="w-4 h-4" />
          </button>
          <button onClick={onRemove} className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {error ? (
          <div className="flex flex-col items-center text-center text-red-500 gap-2">
            <AlertCircle className="w-6 h-6" />
            <p className="text-[10px] font-medium">Failed to load data</p>
          </div>
        ) : (
          (() => {
            const Component = widgetComponents[widget.type];
            return Component ? <Component data={data} config={widget.config} /> : <div className="text-xs text-slate-400 italic">Unknown widget type: {widget.type}</div>;
          })()
        )}
      </div>
    </div>
  );
}
