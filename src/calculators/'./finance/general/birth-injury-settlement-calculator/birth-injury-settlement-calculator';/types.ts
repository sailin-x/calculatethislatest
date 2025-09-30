export interface './finance/general/birth-injury-settlement-calculator/birth-injury-settlement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/birth-injury-settlement-calculator/birth-injury-settlement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/birth-injury-settlement-calculator/birth-injury-settlement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/birth-injury-settlement-calculator/birth-injury-settlement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
