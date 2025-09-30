export interface commercial_property_insuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface commercial_property_insuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface commercial_property_insuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface commercial_property_insuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
