export interface './insurance/long-term-disability-ltd-elimination-period-calculator/long_term_disability_ltd_elimination_period_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/long-term-disability-ltd-elimination-period-calculator/long_term_disability_ltd_elimination_period_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/long-term-disability-ltd-elimination-period-calculator/long_term_disability_ltd_elimination_period_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/long-term-disability-ltd-elimination-period-calculator/long_term_disability_ltd_elimination_period_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
