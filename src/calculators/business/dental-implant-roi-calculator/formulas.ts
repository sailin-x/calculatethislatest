import { dental-implant-roi-calculatorInputs, dental-implant-roi-calculatorMetrics, dental-implant-roi-calculatorAnalysis } from './types';

// ROI Calculator
export function calculateROI(netProfit: number, investment: number): number {
  return (netProfit / investment) * 100;
}

export function calculateNetProfit(revenue: number, costs: number): number {
  return revenue - costs;
}

export function calculatePaybackPeriod(investment: number, annualCashFlow: number): number {
  return investment / annualCashFlow;
}

export function calculateResult(inputs: dental-implant-roi-calculatorInputs): number {
  if ('netProfit' in inputs && 'investment' in inputs) {
    return calculateROI(inputs.netProfit, inputs.investment);
  }
  if ('revenue' in inputs && 'costs' in inputs && 'investment' in inputs) {
    const netProfit = calculateNetProfit(inputs.revenue, inputs.costs);
    return calculateROI(netProfit, inputs.investment);
  }
  return 0;
}

export function generateAnalysis(inputs: dental-implant-roi-calculatorInputs, metrics: dental-implant-roi-calculatorMetrics): dental-implant-roi-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result < 10) riskLevel = 'High';
  else if (result < 20) riskLevel = 'Medium';

  const recommendation = result >= 15 ?
    'Strong ROI - investment appears profitable' :
    'ROI below industry average - review costs and revenue projections';

  return { recommendation, riskLevel };
}