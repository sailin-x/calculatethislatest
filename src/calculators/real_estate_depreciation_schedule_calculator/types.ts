export interface real_estate_depreciation_schedule_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface real_estate_depreciation_schedule_calculatorResults {
  result: number;
  analysis?: string;
}

export interface real_estate_depreciation_schedule_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface real_estate_depreciation_schedule_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
