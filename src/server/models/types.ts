export type Country = 'US' | 'Canada' | 'Australia' | 'Singapore' | 'Hong Kong';
export type OrderStatus = 'Pending' | 'In Progress' | 'Completed';

export interface CustomerOrder {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: Country;
  product: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: OrderStatus;
  createdBy: string;
  createdAt: string; // ISO string
}

export type WidgetType = 'kpi' | 'bar' | 'line' | 'pie' | 'table';

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  config: any;
  width: number;
  height: number;
  position: { x: number; y: number };
}

export interface DashboardLayout {
  widgets: DashboardWidget[];
}
