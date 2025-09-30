export interface realEstateDepreciationScheduleCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface realEstateDepreciationScheduleCalculatorResults {
  result: number;
  analysis?: string;
}

export interface realEstateDepreciationScheduleCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface realEstateDepreciationScheduleCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
