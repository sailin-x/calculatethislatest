export interface './finance/general/sum-of-parts-calculator/sum-of-parts-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/sum-of-parts-calculator/sum-of-parts-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/sum-of-parts-calculator/sum-of-parts-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/sum-of-parts-calculator/sum-of-parts-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
