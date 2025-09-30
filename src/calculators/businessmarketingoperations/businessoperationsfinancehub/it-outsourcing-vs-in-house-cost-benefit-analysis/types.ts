export interface it_outsourcing_vs_in_house_cost_benefit_analysisInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface it_outsourcing_vs_in_house_cost_benefit_analysisMetrics {
  result: number;
  efficiency?: number;
}

export interface it_outsourcing_vs_in_house_cost_benefit_analysisAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface it_outsourcing_vs_in_house_cost_benefit_analysisOutputs {
  result: number;
  analysis: it_outsourcing_vs_in_house_cost_benefit_analysisAnalysis;
}
