export interface HobbiesCalculatorInputs {
  hobbyType: 'gardening' | 'photography' | 'music' | 'sports' | 'crafting' | 'collecting' | 'gaming' | 'cooking' | 'reading' | 'other';
  initialInvestment: number;
  monthlySpending: number;
  timeCommitment: number; // hours per week
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  equipmentQuality: 'budget' | 'mid_range' | 'premium' | 'professional';
  frequency: 'daily' | 'weekly' | 'monthly' | 'occasional';
  duration: number; // months
}

export interface HobbiesCalculatorMetrics {
  totalCost: number;
  costPerHour: number;
  costPerMonth: number;
  breakEvenPoint: number;
  roi: number;
  enjoymentRating: number;
  skillProgression: string[];
}

export interface HobbiesCalculatorAnalysis {
  costEfficiency: string;
  timeInvestment: string;
  skillDevelopment: string;
  recommendations: string[];
}

export interface HobbiesCalculatorOutputs {
  totalCost: number;
  costPerHour: number;
  costPerMonth: number;
  analysis: HobbiesCalculatorAnalysis;
}
