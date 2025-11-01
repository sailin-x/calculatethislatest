export interface high_net_worth_divorce_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface high_net_worth_divorce_calculatorResults {
  result: number;
  analysis?: string;
}

export interface high_net_worth_divorce_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface high_net_worth_divorce_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
