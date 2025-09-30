export interface './legalinsurancesettlements/legalsettlementhub/bad-faith-insurance-claim-calculator/bad-faith-insurance-claim-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/bad-faith-insurance-claim-calculator/bad-faith-insurance-claim-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/bad-faith-insurance-claim-calculator/bad-faith-insurance-claim-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/bad-faith-insurance-claim-calculator/bad-faith-insurance-claim-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
