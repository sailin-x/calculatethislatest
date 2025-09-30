export interface merger_acquisition_divestiture_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface merger_acquisition_divestiture_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface merger_acquisition_divestiture_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface merger_acquisition_divestiture_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
