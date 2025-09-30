export interface soc_2_compliance_cost_estimatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface soc_2_compliance_cost_estimatorMetrics {
  result: number;
  efficiency?: number;
}

export interface soc_2_compliance_cost_estimatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface soc_2_compliance_cost_estimatorOutputs {
  result: number;
  analysis: soc_2_compliance_cost_estimatorAnalysis;
}
