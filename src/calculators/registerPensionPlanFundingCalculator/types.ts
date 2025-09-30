export interface registerPensionPlanFundingCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerPensionPlanFundingCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerPensionPlanFundingCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerPensionPlanFundingCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
