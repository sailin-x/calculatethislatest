export interface registerPensionLumpSumVsAnnuityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerPensionLumpSumVsAnnuityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerPensionLumpSumVsAnnuityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerPensionLumpSumVsAnnuityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
