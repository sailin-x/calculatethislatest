export interface pet_care_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface pet_care_calculatorResults {
  result: number;
  analysis?: string;
}

export interface pet_care_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface pet_care_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
