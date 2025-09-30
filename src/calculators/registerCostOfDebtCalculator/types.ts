export interface registerCostOfDebtCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerCostOfDebtCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerCostOfDebtCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerCostOfDebtCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
