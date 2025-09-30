export interface estateTaxLiabilityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface estateTaxLiabilityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface estateTaxLiabilityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface estateTaxLiabilityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
