export interface private_mortgage_insuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface private_mortgage_insuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface private_mortgage_insuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface private_mortgage_insuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
