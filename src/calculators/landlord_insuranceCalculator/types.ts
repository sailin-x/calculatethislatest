export interface landlord_insuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface landlord_insuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface landlord_insuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface landlord_insuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
