export interface long_term_disability_ltd_elimination_period_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface long_term_disability_ltd_elimination_period_calculatorResults {
  result: number;
  analysis?: string;
}

export interface long_term_disability_ltd_elimination_period_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface long_term_disability_ltd_elimination_period_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
