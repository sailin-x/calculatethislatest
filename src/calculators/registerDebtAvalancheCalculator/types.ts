export interface registerDebtAvalancheCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerDebtAvalancheCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerDebtAvalancheCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerDebtAvalancheCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
