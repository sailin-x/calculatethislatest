export interface opportunity_zone_investmentCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface opportunity_zone_investmentCalculatorResults {
  result: number;
  analysis?: string;
}

export interface opportunity_zone_investmentCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface opportunity_zone_investmentCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
