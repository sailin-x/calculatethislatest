export interface realEstateSyndicationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface realEstateSyndicationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface realEstateSyndicationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface realEstateSyndicationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
