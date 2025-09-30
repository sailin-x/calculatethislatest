export interface registerRealEstateDevelopmentProFormaCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRealEstateDevelopmentProFormaCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRealEstateDevelopmentProFormaCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRealEstateDevelopmentProFormaCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
