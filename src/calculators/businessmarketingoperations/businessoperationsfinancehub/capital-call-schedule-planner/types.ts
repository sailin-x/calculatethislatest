export interface capital_call_schedule_plannerInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface capital_call_schedule_plannerMetrics {
  result: number;
  efficiency?: number;
}

export interface capital_call_schedule_plannerAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface capital_call_schedule_plannerOutputs {
  result: number;
  analysis: capital_call_schedule_plannerAnalysis;
}
