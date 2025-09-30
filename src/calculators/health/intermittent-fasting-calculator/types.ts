export interface IntermittentFastingCalculatorInputs {
  currentWeight: number;
  targetWeight: number;
  timeFrame: number;
  activityLevel: string;
}

export interface IntermittentFastingCalculatorMetrics {
  weightLossRequired: number;
  weeklyLossRate: number;
  dailyCalorieDeficit: number;
  estimatedTime: number;
}

export interface IntermittentFastingCalculatorAnalysis {
  feasibility: string;
  healthSafety: string;
  recommendations: string[];
}

export interface IntermittentFastingCalculatorOutputs {
  weightLossRequired: number;
  weeklyLossRate: number;
  estimatedTime: number;
  analysis: IntermittentFastingCalculatorAnalysis;
}
