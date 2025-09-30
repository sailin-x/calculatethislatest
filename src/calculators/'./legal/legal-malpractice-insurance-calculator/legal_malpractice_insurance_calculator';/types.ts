export interface './legal/legal-malpractice-insurance-calculator/legal_malpractice_insurance_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/legal-malpractice-insurance-calculator/legal_malpractice_insurance_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/legal-malpractice-insurance-calculator/legal_malpractice_insurance_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/legal-malpractice-insurance-calculator/legal_malpractice_insurance_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
