export interface net_operating_incomeCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface net_operating_incomeCalculatorResults {
  result: number;
  analysis?: string;
}

export interface net_operating_incomeCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface net_operating_incomeCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
