export interface ad_viewability_impact_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ad_viewability_impact_calculatorResults {
  result: number;
  analysis?: string;
}

export interface ad_viewability_impact_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ad_viewability_impact_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
