export interface film_slate_financing_roi_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface film_slate_financing_roi_calculatorResults {
  result: number;
  analysis?: string;
}

export interface film_slate_financing_roi_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface film_slate_financing_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
