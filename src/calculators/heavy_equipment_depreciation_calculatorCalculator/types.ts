export interface heavy_equipment_depreciation_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface heavy_equipment_depreciation_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface heavy_equipment_depreciation_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface heavy_equipment_depreciation_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
