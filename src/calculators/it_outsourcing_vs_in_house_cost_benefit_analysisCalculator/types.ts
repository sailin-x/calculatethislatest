export interface it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorResults {
  result: number;
  analysis?: string;
}

export interface it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
