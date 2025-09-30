export interface './legalinsurancesettlements/legalsettlementhub/contract-breach-damages-calculator/contract-breach-damages-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/contract-breach-damages-calculator/contract-breach-damages-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/contract-breach-damages-calculator/contract-breach-damages-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/contract-breach-damages-calculator/contract-breach-damages-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
