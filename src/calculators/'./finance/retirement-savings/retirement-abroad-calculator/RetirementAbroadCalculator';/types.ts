export interface './finance/retirement-savings/retirement-abroad-calculator/RetirementAbroadCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/retirement-savings/retirement-abroad-calculator/RetirementAbroadCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/retirement-savings/retirement-abroad-calculator/RetirementAbroadCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/retirement-savings/retirement-abroad-calculator/RetirementAbroadCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
