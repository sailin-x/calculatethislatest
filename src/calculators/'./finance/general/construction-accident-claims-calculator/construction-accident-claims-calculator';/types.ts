export interface './finance/general/construction-accident-claims-calculator/construction-accident-claims-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/construction-accident-claims-calculator/construction-accident-claims-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/construction-accident-claims-calculator/construction-accident-claims-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/construction-accident-claims-calculator/construction-accident-claims-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
