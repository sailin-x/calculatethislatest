export interface './finance/general/hospital-negligence-settlement-calculator/hospital-negligence-settlement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/hospital-negligence-settlement-calculator/hospital-negligence-settlement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/hospital-negligence-settlement-calculator/hospital-negligence-settlement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/hospital-negligence-settlement-calculator/hospital-negligence-settlement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
