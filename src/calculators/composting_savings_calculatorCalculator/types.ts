export interface composting_savings_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface composting_savings_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface composting_savings_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface composting_savings_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
