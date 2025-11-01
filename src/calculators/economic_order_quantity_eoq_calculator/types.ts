export interface economic_order_quantity_eoq_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface economic_order_quantity_eoq_calculatorResults {
  result: number;
  analysis?: string;
}

export interface economic_order_quantity_eoq_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface economic_order_quantity_eoq_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
