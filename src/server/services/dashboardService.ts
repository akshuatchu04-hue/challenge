import { orders, dashboardLayout } from '../data/store';
import { DashboardWidget, CustomerOrder } from '../models/types';

export class DashboardService {
  static saveLayout(widgets: DashboardWidget[]) {
    dashboardLayout.length = 0;
    dashboardLayout.push(...widgets);
    return dashboardLayout;
  }

  static getLayout() {
    return dashboardLayout;
  }

  static getKpiData(metric: keyof CustomerOrder, aggregation: 'SUM' | 'AVERAGE' | 'COUNT') {
    const numericFields: (keyof CustomerOrder)[] = ['quantity', 'unitPrice', 'totalAmount'];
    
    if (aggregation !== 'COUNT' && !numericFields.includes(metric)) {
      throw new Error(`Aggregation ${aggregation} only allowed on numeric fields: ${numericFields.join(', ')}`);
    }

    if (aggregation === 'COUNT') {
      return orders.length;
    }

    const values = orders.map(o => o[metric] as number);
    if (values.length === 0) return 0;

    const sum = values.reduce((acc, val) => acc + val, 0);

    if (aggregation === 'SUM') {
      return sum;
    }

    if (aggregation === 'AVERAGE') {
      return sum / values.length;
    }

    return 0;
  }

  static getChartData(xAxis: keyof CustomerOrder, yAxis: keyof CustomerOrder, aggregation: 'SUM' | 'AVERAGE' | 'COUNT') {
    const groups: Record<string, number[]> = {};

    orders.forEach(order => {
      const key = String(order[xAxis]);
      if (!groups[key]) groups[key] = [];
      groups[key].push(order[yAxis] as number);
    });

    return Object.entries(groups).map(([name, values]) => {
      let value = 0;
      if (aggregation === 'COUNT') {
        value = values.length;
      } else {
        const sum = values.reduce((acc, v) => acc + v, 0);
        value = aggregation === 'SUM' ? sum : sum / values.length;
      }
      return { name, value };
    });
  }

  static getTableData() {
    return orders.slice(0, 5).map(o => ({
      id: o.id,
      customer: `${o.firstName} ${o.lastName}`,
      product: o.product,
      amount: o.totalAmount,
      status: o.status
    }));
  }
}
