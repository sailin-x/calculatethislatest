export interface high_net_worth_divorce_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface high_net_worth_divorce_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface high_net_worth_divorce_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface high_net_worth_divorce_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
