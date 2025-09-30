export interface ZooCostCalculatorInputs {
  currentWeight: number;
  targetWeight: number;
  timeFrame: number;
  activityLevel: string;
}

export interface ZooCostCalculatorMetrics {
  weightLossRequired: number;
  weeklyLossRate: number;
  dailyCalorieDeficit: number;
  estimatedTime: number;
}

export interface ZooCostCalculatorAnalysis {
  feasibility: string;
  healthSafety: string;
  recommendations: string[];
}

export interface ZooCostCalculatorOutputs {
  weightLossRequired: number;
  weeklyLossRate: number;
  estimatedTime: number;
  analysis: ZooCostCalculatorAnalysis;
}
