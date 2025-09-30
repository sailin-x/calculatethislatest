export interface './legalinsurancesettlements/legalsettlementhub/car-accident-pain-suffering-calculator/car-accident-pain-suffering-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/car-accident-pain-suffering-calculator/car-accident-pain-suffering-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/car-accident-pain-suffering-calculator/car-accident-pain-suffering-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/car-accident-pain-suffering-calculator/car-accident-pain-suffering-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
