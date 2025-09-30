export interface './financeinvestment/retirementsavingshub/required-minimum-distribution-rmd-calculator/required_minimum_distribution_rmd_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/retirementsavingshub/required-minimum-distribution-rmd-calculator/required_minimum_distribution_rmd_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/retirementsavingshub/required-minimum-distribution-rmd-calculator/required_minimum_distribution_rmd_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/retirementsavingshub/required-minimum-distribution-rmd-calculator/required_minimum_distribution_rmd_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
