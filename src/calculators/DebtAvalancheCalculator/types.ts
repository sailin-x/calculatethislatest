export interface DebtAvalancheCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface DebtAvalancheCalculatorResults {
  result: number;
  analysis?: string;
}

export interface DebtAvalancheCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface DebtAvalancheCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
