export interface overall_equipment_effectiveness_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface overall_equipment_effectiveness_calculatorResults {
  result: number;
  analysis?: string;
}

export interface overall_equipment_effectiveness_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface overall_equipment_effectiveness_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
