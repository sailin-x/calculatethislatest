export interface registerAlimonySpousalSupportCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerAlimonySpousalSupportCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerAlimonySpousalSupportCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerAlimonySpousalSupportCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
