export interface './finance/retirement-savings/roth-ira-calculator/RothIRACalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/retirement-savings/roth-ira-calculator/RothIRACalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/retirement-savings/roth-ira-calculator/RothIRACalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/retirement-savings/roth-ira-calculator/RothIRACalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
