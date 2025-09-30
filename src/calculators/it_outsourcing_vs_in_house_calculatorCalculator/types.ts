export interface it_outsourcing_vs_in_house_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface it_outsourcing_vs_in_house_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface it_outsourcing_vs_in_house_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface it_outsourcing_vs_in_house_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
