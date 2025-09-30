export interface overall_equipment_effectiveness_oee_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface overall_equipment_effectiveness_oee_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface overall_equipment_effectiveness_oee_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface overall_equipment_effectiveness_oee_calculatorOutputs {
  result: number;
  analysis: overall_equipment_effectiveness_oee_calculatorAnalysis;
}
