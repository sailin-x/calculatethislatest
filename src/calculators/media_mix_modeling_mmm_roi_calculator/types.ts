export interface media_mix_modeling_mmm_roi_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface media_mix_modeling_mmm_roi_calculatorResults {
  result: number;
  analysis?: string;
}

export interface media_mix_modeling_mmm_roi_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface media_mix_modeling_mmm_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
