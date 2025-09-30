export interface average_order_value_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface average_order_value_calculatorResults {
  result: number;
  analysis?: string;
}

export interface average_order_value_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface average_order_value_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
