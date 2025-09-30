export interface './legalinsurancesettlements/legalsettlementhub/roundup-settlement-calculator/roundup-settlement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/roundup-settlement-calculator/roundup-settlement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/roundup-settlement-calculator/roundup-settlement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/roundup-settlement-calculator/roundup-settlement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
