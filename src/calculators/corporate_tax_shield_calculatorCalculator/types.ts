export interface corporate_tax_shield_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface corporate_tax_shield_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface corporate_tax_shield_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface corporate_tax_shield_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
