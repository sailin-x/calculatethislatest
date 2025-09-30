export interface realEstateWaterfallModelCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface realEstateWaterfallModelCalculatorResults {
  result: number;
  analysis?: string;
}

export interface realEstateWaterfallModelCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface realEstateWaterfallModelCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
