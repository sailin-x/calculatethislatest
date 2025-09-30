export interface './finance/general/legal-malpractice-insurance-calculator/legal-malpractice-insurance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/legal-malpractice-insurance-calculator/legal-malpractice-insurance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/legal-malpractice-insurance-calculator/legal-malpractice-insurance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/legal-malpractice-insurance-calculator/legal-malpractice-insurance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
