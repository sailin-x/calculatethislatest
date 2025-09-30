export interface registerCostOfEquityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerCostOfEquityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerCostOfEquityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerCostOfEquityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
