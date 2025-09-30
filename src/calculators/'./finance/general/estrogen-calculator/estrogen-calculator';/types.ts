export interface './finance/general/estrogen-calculator/estrogen-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/estrogen-calculator/estrogen-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/estrogen-calculator/estrogen-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/estrogen-calculator/estrogen-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
