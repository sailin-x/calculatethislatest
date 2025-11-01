export interface bill_of_materials_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bill_of_materials_calculatorResults {
  result: number;
  analysis?: string;
}

export interface bill_of_materials_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bill_of_materials_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
