export interface SimpleIRACalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface SimpleIRACalculatorResults {
  result: number;
  analysis?: string;
}

export interface SimpleIRACalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface SimpleIRACalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
