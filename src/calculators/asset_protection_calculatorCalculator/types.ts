export interface asset_protection_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface asset_protection_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface asset_protection_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface asset_protection_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
