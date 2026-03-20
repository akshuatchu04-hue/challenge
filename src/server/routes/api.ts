import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { DashboardController } from '../controllers/dashboardController';

const router = Router();

console.log('API routes loaded');

// Orders
router.get('/orders', OrderController.getAll);
router.post('/orders', OrderController.create);
router.put('/orders/:id', OrderController.update);
router.delete('/orders/:id', OrderController.delete);

// Dashboard
router.get('/dashboard', DashboardController.get);
router.post('/dashboard/save', DashboardController.save);
router.get('/dashboard/kpi', DashboardController.getKpi);
router.get('/dashboard/chart', DashboardController.getChart);
router.get('/dashboard/table', DashboardController.getTable);

export default router;
