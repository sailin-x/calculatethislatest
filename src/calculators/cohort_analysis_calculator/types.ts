export interface cohort_analysis_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cohort_analysis_calculatorResults {
  result: number;
  analysis?: string;
}

export interface cohort_analysis_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cohort_analysis_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
