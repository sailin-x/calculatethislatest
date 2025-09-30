export interface commercial_fleet_insurance_premium_estimatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface commercial_fleet_insurance_premium_estimatorMetrics {
  result: number;
  efficiency?: number;
}

export interface commercial_fleet_insurance_premium_estimatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface commercial_fleet_insurance_premium_estimatorOutputs {
  result: number;
  analysis: commercial_fleet_insurance_premium_estimatorAnalysis;
}
