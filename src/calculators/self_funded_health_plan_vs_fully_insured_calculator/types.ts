export interface self_funded_health_plan_vs_fully_insured_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface self_funded_health_plan_vs_fully_insured_calculatorResults {
  result: number;
  analysis?: string;
}

export interface self_funded_health_plan_vs_fully_insured_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface self_funded_health_plan_vs_fully_insured_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
