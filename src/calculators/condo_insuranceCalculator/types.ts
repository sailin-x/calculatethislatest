export interface condo_insuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface condo_insuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface condo_insuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface condo_insuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
