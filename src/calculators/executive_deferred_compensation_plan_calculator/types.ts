export interface executive_deferred_compensation_plan_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface executive_deferred_compensation_plan_calculatorResults {
  result: number;
  analysis?: string;
}

export interface executive_deferred_compensation_plan_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface executive_deferred_compensation_plan_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
