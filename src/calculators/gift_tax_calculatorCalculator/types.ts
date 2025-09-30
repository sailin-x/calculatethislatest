export interface gift_tax_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface gift_tax_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface gift_tax_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface gift_tax_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
