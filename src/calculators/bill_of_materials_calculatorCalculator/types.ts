export interface bill_of_materials_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bill_of_materials_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface bill_of_materials_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bill_of_materials_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
