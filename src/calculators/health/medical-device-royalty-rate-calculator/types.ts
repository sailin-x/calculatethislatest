export interface MedicalDeviceRoyaltyRateCalculatorInputs {
  currentWeight: number;
  targetWeight: number;
  timeFrame: number;
  activityLevel: string;
}

export interface MedicalDeviceRoyaltyRateCalculatorMetrics {
  weightLossRequired: number;
  weeklyLossRate: number;
  dailyCalorieDeficit: number;
  estimatedTime: number;
}

export interface MedicalDeviceRoyaltyRateCalculatorAnalysis {
  feasibility: string;
  healthSafety: string;
  recommendations: string[];
}

export interface MedicalDeviceRoyaltyRateCalculatorOutputs {
  weightLossRequired: number;
  weeklyLossRate: number;
  estimatedTime: number;
  analysis: MedicalDeviceRoyaltyRateCalculatorAnalysis;
}
