export interface './finance/general/birth-injury-malpractice-calculator/birth-injury-malpractice-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/birth-injury-malpractice-calculator/birth-injury-malpractice-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/birth-injury-malpractice-calculator/birth-injury-malpractice-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/birth-injury-malpractice-calculator/birth-injury-malpractice-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
