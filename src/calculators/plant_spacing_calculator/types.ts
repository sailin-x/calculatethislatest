export interface plant_spacing_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface plant_spacing_calculatorResults {
  result: number;
  analysis?: string;
}

export interface plant_spacing_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface plant_spacing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
