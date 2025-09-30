export interface './legalinsurancesettlements/legalsettlementhub/personal-injury-multiplier-calculator/personal_injury_multiplier_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/personal-injury-multiplier-calculator/personal_injury_multiplier_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/personal-injury-multiplier-calculator/personal_injury_multiplier_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/personal-injury-multiplier-calculator/personal_injury_multiplier_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
