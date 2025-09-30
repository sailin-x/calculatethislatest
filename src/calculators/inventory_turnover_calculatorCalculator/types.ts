export interface inventory_turnover_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface inventory_turnover_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface inventory_turnover_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface inventory_turnover_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
