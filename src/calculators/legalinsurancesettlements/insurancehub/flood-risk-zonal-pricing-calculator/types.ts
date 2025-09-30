export interface flood_risk_zonal_pricing_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface flood_risk_zonal_pricing_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface flood_risk_zonal_pricing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface flood_risk_zonal_pricing_calculatorOutputs {
  result: number;
  analysis: flood_risk_zonal_pricing_calculatorAnalysis;
}
