export interface biological_age_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface biological_age_calculatorResults {
  result: number;
  analysis?: string;
}

export interface biological_age_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface biological_age_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
