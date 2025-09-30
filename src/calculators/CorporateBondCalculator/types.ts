export interface CorporateBondCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface CorporateBondCalculatorResults {
  result: number;
  analysis?: string;
}

export interface CorporateBondCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface CorporateBondCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
