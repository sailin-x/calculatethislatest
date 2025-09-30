export interface './finance/required-minimum-distribution-rmd-calculator/required-minimum-distribution-rmd-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/required-minimum-distribution-rmd-calculator/required-minimum-distribution-rmd-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/required-minimum-distribution-rmd-calculator/required-minimum-distribution-rmd-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/required-minimum-distribution-rmd-calculator/required-minimum-distribution-rmd-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
