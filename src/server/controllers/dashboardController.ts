import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboardService';

export class DashboardController {
  static save(req: Request, res: Response) {
    try {
      const layout = DashboardService.saveLayout(req.body);
      res.json(layout);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static get(req: Request, res: Response) {
    try {
      const layout = DashboardService.getLayout();
      res.json(layout);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static getKpi(req: Request, res: Response) {
    try {
      const { metric, aggregation } = req.query;
      const value = DashboardService.getKpiData(metric as any, aggregation as any);
      res.json({ value });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static getChart(req: Request, res: Response) {
    try {
      const { xAxis, yAxis, aggregation } = req.query;
      const data = DashboardService.getChartData(xAxis as any, yAxis as any, aggregation as any);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static getTable(req: Request, res: Response) {
    try {
      const data = DashboardService.getTableData();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
