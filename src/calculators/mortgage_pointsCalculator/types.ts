export interface mortgage_pointsCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_pointsCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_pointsCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_pointsCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
