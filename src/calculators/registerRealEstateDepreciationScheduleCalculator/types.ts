export interface registerRealEstateDepreciationScheduleCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRealEstateDepreciationScheduleCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRealEstateDepreciationScheduleCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRealEstateDepreciationScheduleCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
