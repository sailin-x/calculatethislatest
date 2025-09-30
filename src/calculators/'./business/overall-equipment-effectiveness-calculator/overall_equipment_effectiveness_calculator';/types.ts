export interface './business/overall-equipment-effectiveness-calculator/overall_equipment_effectiveness_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/overall-equipment-effectiveness-calculator/overall_equipment_effectiveness_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/overall-equipment-effectiveness-calculator/overall_equipment_effectiveness_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/overall-equipment-effectiveness-calculator/overall_equipment_effectiveness_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
