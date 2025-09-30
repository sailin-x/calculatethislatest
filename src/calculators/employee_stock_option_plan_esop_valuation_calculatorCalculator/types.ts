export interface employee_stock_option_plan_esop_valuation_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface employee_stock_option_plan_esop_valuation_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface employee_stock_option_plan_esop_valuation_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface employee_stock_option_plan_esop_valuation_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
