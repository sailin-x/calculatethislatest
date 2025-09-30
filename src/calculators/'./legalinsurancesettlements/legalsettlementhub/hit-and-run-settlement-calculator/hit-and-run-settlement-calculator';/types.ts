export interface './legalinsurancesettlements/legalsettlementhub/hit-and-run-settlement-calculator/hit-and-run-settlement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/hit-and-run-settlement-calculator/hit-and-run-settlement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/hit-and-run-settlement-calculator/hit-and-run-settlement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/hit-and-run-settlement-calculator/hit-and-run-settlement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
