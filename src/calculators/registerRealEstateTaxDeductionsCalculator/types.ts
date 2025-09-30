export interface registerRealEstateTaxDeductionsCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRealEstateTaxDeductionsCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRealEstateTaxDeductionsCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRealEstateTaxDeductionsCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
