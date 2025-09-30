export interface './legalinsurancesettlements/insurancehub/policy-lapse-rate-calculator/policy-lapse-rate-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/insurancehub/policy-lapse-rate-calculator/policy-lapse-rate-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/insurancehub/policy-lapse-rate-calculator/policy-lapse-rate-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/insurancehub/policy-lapse-rate-calculator/policy-lapse-rate-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
