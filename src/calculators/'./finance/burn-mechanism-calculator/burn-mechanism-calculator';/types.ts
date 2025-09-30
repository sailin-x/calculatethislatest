export interface './finance/burn-mechanism-calculator/burn-mechanism-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/burn-mechanism-calculator/burn-mechanism-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/burn-mechanism-calculator/burn-mechanism-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/burn-mechanism-calculator/burn-mechanism-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
