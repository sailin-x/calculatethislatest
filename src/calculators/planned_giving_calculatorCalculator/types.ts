export interface planned_giving_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface planned_giving_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface planned_giving_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface planned_giving_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
