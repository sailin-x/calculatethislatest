export interface './legalinsurancesettlements/insurancehub/guideline-premium-test-gpt-calculator/guideline-premium-test-gpt-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/insurancehub/guideline-premium-test-gpt-calculator/guideline-premium-test-gpt-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/insurancehub/guideline-premium-test-gpt-calculator/guideline-premium-test-gpt-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/insurancehub/guideline-premium-test-gpt-calculator/guideline-premium-test-gpt-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
