export interface './legalinsurancesettlements/legalsettlementhub/legal-practice-valuation-calculator/legal-practice-valuation-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/legal-practice-valuation-calculator/legal-practice-valuation-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/legal-practice-valuation-calculator/legal-practice-valuation-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/legal-practice-valuation-calculator/legal-practice-valuation-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
