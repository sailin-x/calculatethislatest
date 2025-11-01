export interface political_risk_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface political_risk_calculatorResults {
  result: number;
  analysis?: string;
}

export interface political_risk_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface political_risk_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
