export interface tax_loss_harvesting_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface tax_loss_harvesting_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface tax_loss_harvesting_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface tax_loss_harvesting_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
