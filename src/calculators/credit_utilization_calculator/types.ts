export interface credit_utilization_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface credit_utilization_calculatorResults {
  result: number;
  analysis?: string;
}

export interface credit_utilization_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface credit_utilization_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
