export interface mezzanine_financing_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mezzanine_financing_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mezzanine_financing_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mezzanine_financing_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
