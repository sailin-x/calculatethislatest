export interface './legalinsurancesettlements/legalsettlementhub/property-tax-appeal-savings-calculator/property-tax-appeal-savings-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/property-tax-appeal-savings-calculator/property-tax-appeal-savings-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/property-tax-appeal-savings-calculator/property-tax-appeal-savings-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/property-tax-appeal-savings-calculator/property-tax-appeal-savings-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
