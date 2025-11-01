export interface catastrophic_injury_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface catastrophic_injury_calculatorResults {
  result: number;
  analysis?: string;
}

export interface catastrophic_injury_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface catastrophic_injury_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
