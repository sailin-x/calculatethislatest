export interface pension_plan_funding_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface pension_plan_funding_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface pension_plan_funding_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface pension_plan_funding_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
