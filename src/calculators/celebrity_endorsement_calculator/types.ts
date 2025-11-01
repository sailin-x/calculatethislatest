export interface celebrity_endorsement_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface celebrity_endorsement_calculatorResults {
  result: number;
  analysis?: string;
}

export interface celebrity_endorsement_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface celebrity_endorsement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
