export interface './finance/retirement-savings/sep-ira-calculator/SepIRACalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/retirement-savings/sep-ira-calculator/SepIRACalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/retirement-savings/sep-ira-calculator/SepIRACalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/retirement-savings/sep-ira-calculator/SepIRACalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
