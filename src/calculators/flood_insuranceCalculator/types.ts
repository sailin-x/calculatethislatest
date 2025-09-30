export interface flood_insuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface flood_insuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface flood_insuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface flood_insuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
