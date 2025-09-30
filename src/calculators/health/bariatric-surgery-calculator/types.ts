export interface BariatricSurgeryCalculatorInputs {
  currentWeight: number;
  targetWeight: number;
  timeFrame: number;
  activityLevel: string;
}

export interface BariatricSurgeryCalculatorMetrics {
  weightLossRequired: number;
  weeklyLossRate: number;
  dailyCalorieDeficit: number;
  estimatedTime: number;
}

export interface BariatricSurgeryCalculatorAnalysis {
  feasibility: string;
  healthSafety: string;
  recommendations: string[];
}

export interface BariatricSurgeryCalculatorOutputs {
  weightLossRequired: number;
  weeklyLossRate: number;
  estimatedTime: number;
  analysis: BariatricSurgeryCalculatorAnalysis;
}
