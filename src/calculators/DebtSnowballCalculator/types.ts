export interface DebtSnowballCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface DebtSnowballCalculatorResults {
  result: number;
  analysis?: string;
}

export interface DebtSnowballCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface DebtSnowballCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
