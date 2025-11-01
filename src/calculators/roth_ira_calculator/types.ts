export interface roth_ira_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface roth_ira_calculatorResults {
  result: number;
  analysis?: string;
}

export interface roth_ira_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface roth_ira_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
