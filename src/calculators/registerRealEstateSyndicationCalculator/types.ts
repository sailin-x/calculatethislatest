export interface registerRealEstateSyndicationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRealEstateSyndicationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRealEstateSyndicationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRealEstateSyndicationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
