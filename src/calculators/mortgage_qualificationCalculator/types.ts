export interface mortgage_qualificationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_qualificationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_qualificationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_qualificationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
