export interface threat_intelligence_platform_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface threat_intelligence_platform_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface threat_intelligence_platform_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface threat_intelligence_platform_roi_calculatorOutputs {
  result: number;
  analysis: threat_intelligence_platform_roi_calculatorAnalysis;
}
