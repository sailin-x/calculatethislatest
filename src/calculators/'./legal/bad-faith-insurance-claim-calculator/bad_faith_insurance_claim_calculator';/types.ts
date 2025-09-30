export interface './legal/bad-faith-insurance-claim-calculator/bad_faith_insurance_claim_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/bad-faith-insurance-claim-calculator/bad_faith_insurance_claim_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/bad-faith-insurance-claim-calculator/bad_faith_insurance_claim_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/bad-faith-insurance-claim-calculator/bad_faith_insurance_claim_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
