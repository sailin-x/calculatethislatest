export interface merger_acquisition_divestiture_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface merger_acquisition_divestiture_calculatorResults {
  result: number;
  analysis?: string;
}

export interface merger_acquisition_divestiture_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface merger_acquisition_divestiture_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
