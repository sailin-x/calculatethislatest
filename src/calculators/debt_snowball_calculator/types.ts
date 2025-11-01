export interface debt_snowball_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface debt_snowball_calculatorResults {
  result: number;
  analysis?: string;
}

export interface debt_snowball_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface debt_snowball_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
