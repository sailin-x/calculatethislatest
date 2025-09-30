export interface './finance/corporate-bond-calculator/CorporateBondCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/corporate-bond-calculator/CorporateBondCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/corporate-bond-calculator/CorporateBondCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/corporate-bond-calculator/CorporateBondCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
