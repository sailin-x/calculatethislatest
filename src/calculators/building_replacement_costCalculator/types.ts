export interface building_replacement_costCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface building_replacement_costCalculatorResults {
  result: number;
  analysis?: string;
}

export interface building_replacement_costCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface building_replacement_costCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
