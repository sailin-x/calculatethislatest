export interface pension_plan_funding_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface pension_plan_funding_calculatorResults {
  result: number;
  analysis?: string;
}

export interface pension_plan_funding_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface pension_plan_funding_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
