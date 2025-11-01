export interface blood_pressure_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface blood_pressure_calculatorResults {
  result: number;
  analysis?: string;
}

export interface blood_pressure_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface blood_pressure_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
