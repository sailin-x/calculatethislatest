export interface soc_2_compliance_cost_estimatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface soc_2_compliance_cost_estimatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface soc_2_compliance_cost_estimatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface soc_2_compliance_cost_estimatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
