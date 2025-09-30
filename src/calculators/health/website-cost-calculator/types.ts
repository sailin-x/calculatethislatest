export interface WebsiteCostCalculatorInputs {
  currentWeight: number;
  targetWeight: number;
  timeFrame: number;
  activityLevel: string;
}

export interface WebsiteCostCalculatorMetrics {
  weightLossRequired: number;
  weeklyLossRate: number;
  dailyCalorieDeficit: number;
  estimatedTime: number;
}

export interface WebsiteCostCalculatorAnalysis {
  feasibility: string;
  healthSafety: string;
  recommendations: string[];
}

export interface WebsiteCostCalculatorOutputs {
  weightLossRequired: number;
  weeklyLossRate: number;
  estimatedTime: number;
  analysis: WebsiteCostCalculatorAnalysis;
}
