export interface long_term_disability_ltd_elimination_period_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface long_term_disability_ltd_elimination_period_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface long_term_disability_ltd_elimination_period_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface long_term_disability_ltd_elimination_period_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
