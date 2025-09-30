export interface merger_acquisition_divestiture_valuationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface merger_acquisition_divestiture_valuationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface merger_acquisition_divestiture_valuationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface merger_acquisition_divestiture_valuationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
