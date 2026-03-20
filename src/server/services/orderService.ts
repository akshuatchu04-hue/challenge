import { orders } from '../data/store';
import { CustomerOrder, Country, OrderStatus } from '../models/types';
import { v4 as uuidv4 } from 'uuid';
import { subDays, startOfDay, isAfter } from 'date-fns';

export class OrderService {
  static getAllOrders(filters?: { dateRange?: string; search?: string }) {
    let filtered = [...orders];

    if (filters?.dateRange && filters.dateRange !== 'All time') {
      const now = new Date();
      let cutoffDate: Date;

      switch (filters.dateRange) {
        case 'Today':
          cutoffDate = startOfDay(now);
          break;
        case 'Last 7 days':
          cutoffDate = subDays(now, 7);
          break;
        case 'Last 30 days':
          cutoffDate = subDays(now, 30);
          break;
        case 'Last 90 days':
          cutoffDate = subDays(now, 90);
          break;
        default:
          cutoffDate = new Date(0);
      }

      filtered = filtered.filter(order => isAfter(new Date(order.createdAt), cutoffDate));
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(order => 
        order.firstName.toLowerCase().includes(search) ||
        order.lastName.toLowerCase().includes(search) ||
        order.email.toLowerCase().includes(search) ||
        order.product.toLowerCase().includes(search)
      );
    }

    return filtered;
  }

  static createOrder(data: Partial<CustomerOrder>) {
    const requiredFields: (keyof CustomerOrder)[] = [
      'firstName', 'lastName', 'email', 'phone', 'streetAddress', 
      'city', 'state', 'postalCode', 'country', 'product', 
      'quantity', 'unitPrice', 'status', 'createdBy'
    ];

    for (const field of requiredFields) {
      const value = data[field];
      if (value === undefined || value === null || value === '') {
        throw new Error(`Please fill the field: ${field}`);
      }
    }

    if (data.quantity! < 1) {
      throw new Error('quantity cannot be less than 1');
    }

    const newOrder: CustomerOrder = {
      id: uuidv4(),
      firstName: data.firstName!,
      lastName: data.lastName!,
      email: data.email!,
      phone: data.phone!,
      streetAddress: data.streetAddress!,
      city: data.city!,
      state: data.state!,
      postalCode: data.postalCode!,
      country: data.country as Country,
      product: data.product!,
      quantity: data.quantity!,
      unitPrice: data.unitPrice!,
      totalAmount: data.quantity! * data.unitPrice!,
      status: data.status as OrderStatus,
      createdBy: data.createdBy!,
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    return newOrder;
  }

  static updateOrder(id: string, data: Partial<CustomerOrder>) {
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Order not found');

    const updated = { ...orders[index], ...data };
    
    // Recalculate totalAmount if quantity or unitPrice changed
    if (data.quantity !== undefined || data.unitPrice !== undefined) {
      updated.totalAmount = updated.quantity * updated.unitPrice;
    }

    if (updated.quantity < 1) {
      throw new Error('quantity cannot be less than 1');
    }

    orders[index] = updated;
    return updated;
  }

  static deleteOrder(id: string) {
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Order not found');
    orders.splice(index, 1);
    return true;
  }
}
