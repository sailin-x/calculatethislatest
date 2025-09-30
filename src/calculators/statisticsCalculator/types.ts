export interface statisticsCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface statisticsCalculatorResults {
  result: number;
  analysis?: string;
}

export interface statisticsCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface statisticsCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
