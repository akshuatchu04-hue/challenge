import { CustomerOrder, DashboardWidget } from '../models/types';

export const orders: CustomerOrder[] = [];
export let dashboardLayout: DashboardWidget[] = [];

// Sample test data
const sampleOrders: CustomerOrder[] = [
  {
    id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 000-0000',
    streetAddress: '123 Business Way',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US',
    product: 'Fiber 300',
    quantity: 1,
    unitPrice: 1299.00,
    totalAmount: 1299.00,
    status: 'Completed',
    createdBy: 'Admin Sarah',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    firstName: 'Bill',
    lastName: 'Miller',
    email: 'b.miller@method.ai',
    phone: '+1 (555) 111-2222',
    streetAddress: '456 Tech Ave',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'US',
    product: '5G Plan',
    quantity: 2,
    unitPrice: 225.00,
    totalAmount: 450.00,
    status: 'In Progress',
    createdBy: 'Self-Checkout',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: '3',
    firstName: 'Alice',
    lastName: 'Luna',
    email: 'aluna@corp.com',
    phone: '+1 (555) 333-4444',
    streetAddress: '789 Enterprise Blvd',
    city: 'Sydney',
    state: 'NSW',
    postalCode: '2000',
    country: 'Australia',
    product: 'Enterprise License',
    quantity: 5,
    unitPrice: 1750.00,
    totalAmount: 8750.00,
    status: 'Pending',
    createdBy: 'Admin Mike',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
  }
];

orders.push(...sampleOrders);

// Sample dashboard layout
dashboardLayout = [
  {
    id: 'w1',
    type: 'kpi',
    title: 'Total Revenue',
    config: { metric: 'totalAmount', aggregation: 'SUM' },
    width: 4,
    height: 1,
    position: { x: 0, y: 0 }
  },
  {
    id: 'w2',
    type: 'kpi',
    title: 'Active Orders',
    config: { metric: 'id', aggregation: 'COUNT' },
    width: 4,
    height: 1,
    position: { x: 4, y: 0 }
  },
  {
    id: 'w3',
    type: 'bar',
    title: 'Revenue by Country',
    config: { xAxis: 'country', yAxis: 'totalAmount', aggregation: 'SUM' },
    width: 8,
    height: 3,
    position: { x: 0, y: 1 }
  }
];
