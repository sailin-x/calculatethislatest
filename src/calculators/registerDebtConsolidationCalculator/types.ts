export interface registerDebtConsolidationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerDebtConsolidationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerDebtConsolidationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerDebtConsolidationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
