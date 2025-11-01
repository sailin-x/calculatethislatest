export interface distressed_debt_investing_roi_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface distressed_debt_investing_roi_calculatorResults {
  result: number;
  analysis?: string;
}

export interface distressed_debt_investing_roi_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface distressed_debt_investing_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
