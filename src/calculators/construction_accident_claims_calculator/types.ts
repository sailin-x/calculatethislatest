export interface construction_accident_claims_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface construction_accident_claims_calculatorResults {
  result: number;
  analysis?: string;
}

export interface construction_accident_claims_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface construction_accident_claims_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
