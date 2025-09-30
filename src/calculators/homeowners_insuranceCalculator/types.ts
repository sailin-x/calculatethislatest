export interface homeowners_insuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface homeowners_insuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface homeowners_insuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface homeowners_insuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
