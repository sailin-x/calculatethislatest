export interface aptValueCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface aptValueCalculatorResults {
  result: number;
  analysis?: string;
}

export interface aptValueCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface aptValueCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
