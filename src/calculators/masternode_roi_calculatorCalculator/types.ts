export interface masternode_roi_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface masternode_roi_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface masternode_roi_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface masternode_roi_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
