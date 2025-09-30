export interface executive_deferred_compensation_plan_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface executive_deferred_compensation_plan_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface executive_deferred_compensation_plan_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface executive_deferred_compensation_plan_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
