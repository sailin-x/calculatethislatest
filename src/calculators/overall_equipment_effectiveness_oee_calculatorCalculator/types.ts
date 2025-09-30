export interface overall_equipment_effectiveness_oee_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface overall_equipment_effectiveness_oee_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface overall_equipment_effectiveness_oee_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface overall_equipment_effectiveness_oee_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
