export interface './legalinsurancesettlements/legalsettlementhub/dental-malpractice-settlement-calculator/dental-malpractice-settlement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/dental-malpractice-settlement-calculator/dental-malpractice-settlement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/dental-malpractice-settlement-calculator/dental-malpractice-settlement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/dental-malpractice-settlement-calculator/dental-malpractice-settlement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
