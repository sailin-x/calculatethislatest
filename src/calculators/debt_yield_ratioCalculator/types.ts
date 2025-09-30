export interface debt_yield_ratioCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface debt_yield_ratioCalculatorResults {
  result: number;
  analysis?: string;
}

export interface debt_yield_ratioCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface debt_yield_ratioCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
