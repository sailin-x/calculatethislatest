export interface intellectual_property_licensing_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface intellectual_property_licensing_calculatorResults {
  result: number;
  analysis?: string;
}

export interface intellectual_property_licensing_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface intellectual_property_licensing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
