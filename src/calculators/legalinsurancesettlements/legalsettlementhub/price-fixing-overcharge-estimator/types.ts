export interface price_fixing_overcharge_estimatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface price_fixing_overcharge_estimatorMetrics {
  result: number;
  efficiency?: number;
}

export interface price_fixing_overcharge_estimatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface price_fixing_overcharge_estimatorOutputs {
  result: number;
  analysis: price_fixing_overcharge_estimatorAnalysis;
}
