export interface fourZeroOneKCompanyMatchRoiCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fourZeroOneKCompanyMatchRoiCalculatorResults {
  result: number;
  analysis?: string;
}

export interface fourZeroOneKCompanyMatchRoiCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fourZeroOneKCompanyMatchRoiCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
