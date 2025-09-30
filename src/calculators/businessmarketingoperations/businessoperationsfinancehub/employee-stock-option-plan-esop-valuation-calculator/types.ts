export interface employee_stock_option_plan_esop_valuation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface employee_stock_option_plan_esop_valuation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface employee_stock_option_plan_esop_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface employee_stock_option_plan_esop_valuation_calculatorOutputs {
  result: number;
  analysis: employee_stock_option_plan_esop_valuation_calculatorAnalysis;
}
