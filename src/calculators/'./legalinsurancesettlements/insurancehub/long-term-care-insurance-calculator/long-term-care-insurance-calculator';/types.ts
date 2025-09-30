export interface './legalinsurancesettlements/insurancehub/long-term-care-insurance-calculator/long-term-care-insurance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/insurancehub/long-term-care-insurance-calculator/long-term-care-insurance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/insurancehub/long-term-care-insurance-calculator/long-term-care-insurance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/insurancehub/long-term-care-insurance-calculator/long-term-care-insurance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
