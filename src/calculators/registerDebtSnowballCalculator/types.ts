export interface registerDebtSnowballCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerDebtSnowballCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerDebtSnowballCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerDebtSnowballCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
