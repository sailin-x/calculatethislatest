export interface './businessmarketingoperations/businessoperationsfinancehub/overall-equipment-effectiveness-oee-calculator/overall_equipment_effectiveness_oee_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/businessoperationsfinancehub/overall-equipment-effectiveness-oee-calculator/overall_equipment_effectiveness_oee_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/businessoperationsfinancehub/overall-equipment-effectiveness-oee-calculator/overall_equipment_effectiveness_oee_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/businessoperationsfinancehub/overall-equipment-effectiveness-oee-calculator/overall_equipment_effectiveness_oee_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
