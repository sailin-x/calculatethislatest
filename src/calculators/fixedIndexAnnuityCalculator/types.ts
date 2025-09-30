export interface fixedIndexAnnuityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fixedIndexAnnuityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface fixedIndexAnnuityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fixedIndexAnnuityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
