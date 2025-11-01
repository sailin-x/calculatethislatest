export interface biology_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface biology_calculatorResults {
  result: number;
  analysis?: string;
}

export interface biology_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface biology_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
