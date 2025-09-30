export interface pet_care_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface pet_care_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface pet_care_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface pet_care_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
