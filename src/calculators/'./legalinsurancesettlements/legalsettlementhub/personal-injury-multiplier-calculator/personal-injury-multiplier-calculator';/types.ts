export interface './legalinsurancesettlements/legalsettlementhub/personal-injury-multiplier-calculator/personal-injury-multiplier-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/personal-injury-multiplier-calculator/personal-injury-multiplier-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/personal-injury-multiplier-calculator/personal-injury-multiplier-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/personal-injury-multiplier-calculator/personal-injury-multiplier-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
