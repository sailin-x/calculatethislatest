export interface AlimonySpousalSupportCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface AlimonySpousalSupportCalculatorResults {
  result: number;
  analysis?: string;
}

export interface AlimonySpousalSupportCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface AlimonySpousalSupportCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
