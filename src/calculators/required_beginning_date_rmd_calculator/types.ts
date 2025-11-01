export interface required_beginning_date_rmd_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface required_beginning_date_rmd_calculatorResults {
  result: number;
  analysis?: string;
}

export interface required_beginning_date_rmd_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface required_beginning_date_rmd_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
