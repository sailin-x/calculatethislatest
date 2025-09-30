export interface ChildSupportCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ChildSupportCalculatorResults {
  result: number;
  analysis?: string;
}

export interface ChildSupportCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ChildSupportCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
