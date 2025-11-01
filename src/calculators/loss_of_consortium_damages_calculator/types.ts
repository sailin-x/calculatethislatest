export interface loss_of_consortium_damages_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface loss_of_consortium_damages_calculatorResults {
  result: number;
  analysis?: string;
}

export interface loss_of_consortium_damages_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface loss_of_consortium_damages_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
