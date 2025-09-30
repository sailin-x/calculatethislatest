export interface ransomware_downtime_cost_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface ransomware_downtime_cost_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface ransomware_downtime_cost_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ransomware_downtime_cost_calculatorOutputs {
  result: number;
  analysis: ransomware_downtime_cost_calculatorAnalysis;
}
