export interface selfStorageFacilityROICalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface selfStorageFacilityROICalculatorResults {
  result: number;
  analysis?: string;
}

export interface selfStorageFacilityROICalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface selfStorageFacilityROICalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
