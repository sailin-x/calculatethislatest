export interface CostOfEquityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface CostOfEquityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface CostOfEquityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface CostOfEquityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
