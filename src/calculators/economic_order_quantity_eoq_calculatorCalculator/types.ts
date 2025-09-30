export interface economic_order_quantity_eoq_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface economic_order_quantity_eoq_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface economic_order_quantity_eoq_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface economic_order_quantity_eoq_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
