export interface './finance/recaptitalization-impact-calculator/recaptitalization-impact-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/recaptitalization-impact-calculator/recaptitalization-impact-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/recaptitalization-impact-calculator/recaptitalization-impact-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/recaptitalization-impact-calculator/recaptitalization-impact-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
