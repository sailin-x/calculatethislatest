export interface bad_faith_insurance_claim_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bad_faith_insurance_claim_calculatorResults {
  result: number;
  analysis?: string;
}

export interface bad_faith_insurance_claim_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bad_faith_insurance_claim_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
