export interface registerRealEstateWaterfallModelCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRealEstateWaterfallModelCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRealEstateWaterfallModelCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRealEstateWaterfallModelCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
