export interface backdoor_roth_iraCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface backdoor_roth_iraCalculatorResults {
  result: number;
  analysis?: string;
}

export interface backdoor_roth_iraCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface backdoor_roth_iraCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
