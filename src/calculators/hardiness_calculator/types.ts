export interface hardiness_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hardiness_calculatorResults {
  result: number;
  analysis?: string;
}

export interface hardiness_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hardiness_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
