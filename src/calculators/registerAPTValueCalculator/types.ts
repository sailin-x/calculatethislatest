export interface registerAPTValueCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerAPTValueCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerAPTValueCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerAPTValueCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
