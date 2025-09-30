export interface media_mix_modeling_mmm_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface media_mix_modeling_mmm_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface media_mix_modeling_mmm_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface media_mix_modeling_mmm_roi_calculatorOutputs {
  result: number;
  analysis: media_mix_modeling_mmm_roi_calculatorAnalysis;
}
