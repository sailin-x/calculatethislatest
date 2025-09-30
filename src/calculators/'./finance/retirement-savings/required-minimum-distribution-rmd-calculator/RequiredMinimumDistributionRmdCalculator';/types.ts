export interface './finance/retirement-savings/required-minimum-distribution-rmd-calculator/RequiredMinimumDistributionRmdCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/retirement-savings/required-minimum-distribution-rmd-calculator/RequiredMinimumDistributionRmdCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/retirement-savings/required-minimum-distribution-rmd-calculator/RequiredMinimumDistributionRmdCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/retirement-savings/required-minimum-distribution-rmd-calculator/RequiredMinimumDistributionRmdCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
