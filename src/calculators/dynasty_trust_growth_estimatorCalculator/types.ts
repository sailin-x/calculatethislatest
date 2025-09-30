export interface dynasty_trust_growth_estimatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface dynasty_trust_growth_estimatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface dynasty_trust_growth_estimatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface dynasty_trust_growth_estimatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
