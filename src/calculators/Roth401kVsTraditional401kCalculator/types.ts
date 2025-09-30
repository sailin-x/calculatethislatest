export interface Roth401kVsTraditional401kCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface Roth401kVsTraditional401kCalculatorResults {
  result: number;
  analysis?: string;
}

export interface Roth401kVsTraditional401kCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface Roth401kVsTraditional401kCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
