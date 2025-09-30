export interface './finance/retirement-savings/retirement-abroad-calculator/retirement_abroad_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/retirement-savings/retirement-abroad-calculator/retirement_abroad_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/retirement-savings/retirement-abroad-calculator/retirement_abroad_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/retirement-savings/retirement-abroad-calculator/retirement_abroad_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
