export interface ad_viewability_impact_on_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface ad_viewability_impact_on_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface ad_viewability_impact_on_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ad_viewability_impact_on_roi_calculatorOutputs {
  result: number;
  analysis: ad_viewability_impact_on_roi_calculatorAnalysis;
}
