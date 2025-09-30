export interface professional_liability_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface professional_liability_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface professional_liability_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface professional_liability_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
