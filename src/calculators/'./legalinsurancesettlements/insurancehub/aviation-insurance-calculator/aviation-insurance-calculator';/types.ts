export interface './legalinsurancesettlements/insurancehub/aviation-insurance-calculator/aviation-insurance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/insurancehub/aviation-insurance-calculator/aviation-insurance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/insurancehub/aviation-insurance-calculator/aviation-insurance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/insurancehub/aviation-insurance-calculator/aviation-insurance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
