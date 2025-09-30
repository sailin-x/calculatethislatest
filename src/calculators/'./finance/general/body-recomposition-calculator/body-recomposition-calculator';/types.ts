export interface './finance/general/body-recomposition-calculator/body-recomposition-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/body-recomposition-calculator/body-recomposition-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/body-recomposition-calculator/body-recomposition-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/body-recomposition-calculator/body-recomposition-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
