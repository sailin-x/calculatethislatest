export interface asset_based_lending_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface asset_based_lending_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface asset_based_lending_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface asset_based_lending_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
