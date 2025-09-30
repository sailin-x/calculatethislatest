export interface registerEstateTaxLiabilityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerEstateTaxLiabilityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerEstateTaxLiabilityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerEstateTaxLiabilityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
