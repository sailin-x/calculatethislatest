export interface BmrTdeeCalculatorInputs {
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number; // in kg
  height: number; // in cm
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
  bodyFatPercentage: number;
  leanBodyMass: number;
  measurementSystem: 'metric' | 'imperial';
  calculationMethod: 'harris_benedict' | 'mifflin_st_jeor' | 'katch_mcardle' | 'cunningham';
}

export interface BmrTdeeCalculatorMetrics {
  bmr: number; // Basal Metabolic Rate
  tdee: number; // Total Daily Energy Expenditure
  maintenanceCalories: number;
  weightLossCalories: number;
  weightGainCalories: number;
  proteinNeeds: number;
  carbNeeds: number;
  fatNeeds: number;
}

export interface BmrTdeeCalculatorAnalysis {
  activityLevelAssessment: string;
  caloricNeedsBreakdown: string;
  macronutrientDistribution: Record<string, number>;
  healthRecommendations: string[];
}

export interface BmrTdeeCalculatorOutputs {
  bmr: number;
  tdee: number;
  maintenanceCalories: number;
  analysis: BmrTdeeCalculatorAnalysis;
}
