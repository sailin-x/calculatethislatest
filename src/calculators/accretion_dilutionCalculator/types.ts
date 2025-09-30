export interface accretion_dilutionCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface accretion_dilutionCalculatorResults {
  result: number;
  analysis?: string;
}

export interface accretion_dilutionCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface accretion_dilutionCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
