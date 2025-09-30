export interface 401k_rolloverCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface 401k_rolloverCalculatorResults {
  result: number;
  analysis?: string;
}

export interface 401k_rolloverCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface 401k_rolloverCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
