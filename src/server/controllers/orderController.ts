import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';

export class OrderController {
  static getAll(req: Request, res: Response) {
    try {
      const { dateRange, search } = req.query;
      const orders = OrderService.getAllOrders({ 
        dateRange: dateRange as string, 
        search: search as string 
      });
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static create(req: Request, res: Response) {
    try {
      const order = OrderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static update(req: Request, res: Response) {
    try {
      const order = OrderService.updateOrder(req.params.id, req.body);
      res.json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static delete(req: Request, res: Response) {
    try {
      OrderService.deleteOrder(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
