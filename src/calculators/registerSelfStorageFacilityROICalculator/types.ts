export interface registerSelfStorageFacilityROICalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerSelfStorageFacilityROICalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerSelfStorageFacilityROICalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerSelfStorageFacilityROICalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
