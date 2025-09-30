export interface rentVsBuyCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface rentVsBuyCalculatorResults {
  result: number;
  analysis?: string;
}

export interface rentVsBuyCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface rentVsBuyCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
