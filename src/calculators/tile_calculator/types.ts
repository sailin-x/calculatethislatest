export interface tile_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface tile_calculatorResults {
  result: number;
  analysis?: string;
}

export interface tile_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface tile_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
