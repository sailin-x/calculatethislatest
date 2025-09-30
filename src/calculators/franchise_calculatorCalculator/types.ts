export interface franchise_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface franchise_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface franchise_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface franchise_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
