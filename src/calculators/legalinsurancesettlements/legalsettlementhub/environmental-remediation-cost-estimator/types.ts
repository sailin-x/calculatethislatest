export interface environmental_remediation_cost_estimatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface environmental_remediation_cost_estimatorMetrics {
  result: number;
  efficiency?: number;
}

export interface environmental_remediation_cost_estimatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface environmental_remediation_cost_estimatorOutputs {
  result: number;
  analysis: environmental_remediation_cost_estimatorAnalysis;
}
