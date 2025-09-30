export interface pensionLumpSumVsAnnuityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface pensionLumpSumVsAnnuityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface pensionLumpSumVsAnnuityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface pensionLumpSumVsAnnuityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
