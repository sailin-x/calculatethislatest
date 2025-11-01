export interface real_estate_syndication_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface real_estate_syndication_calculatorResults {
  result: number;
  analysis?: string;
}

export interface real_estate_syndication_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface real_estate_syndication_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
