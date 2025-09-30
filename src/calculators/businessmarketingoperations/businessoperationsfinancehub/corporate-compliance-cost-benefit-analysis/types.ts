export interface corporate_compliance_cost_benefit_analysisInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface corporate_compliance_cost_benefit_analysisMetrics {
  result: number;
  efficiency?: number;
}

export interface corporate_compliance_cost_benefit_analysisAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface corporate_compliance_cost_benefit_analysisOutputs {
  result: number;
  analysis: corporate_compliance_cost_benefit_analysisAnalysis;
}
