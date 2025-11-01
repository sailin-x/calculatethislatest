export interface net_worth_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface net_worth_calculatorResults {
  result: number;
  analysis?: string;
}

export interface net_worth_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface net_worth_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
