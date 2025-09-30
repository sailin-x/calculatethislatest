export interface human_capital_due_diligence_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface human_capital_due_diligence_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface human_capital_due_diligence_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface human_capital_due_diligence_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
