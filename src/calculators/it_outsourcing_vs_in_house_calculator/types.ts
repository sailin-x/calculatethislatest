export interface it_outsourcing_vs_in_house_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface it_outsourcing_vs_in_house_calculatorResults {
  result: number;
  analysis?: string;
}

export interface it_outsourcing_vs_in_house_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface it_outsourcing_vs_in_house_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
