export interface pensionPlanFundingCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface pensionPlanFundingCalculatorResults {
  result: number;
  analysis?: string;
}

export interface pensionPlanFundingCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface pensionPlanFundingCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
