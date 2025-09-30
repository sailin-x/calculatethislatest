export interface ConcertTicketCostCalculatorInputs {
  currentWeight: number;
  targetWeight: number;
  timeFrame: number;
  activityLevel: string;
}

export interface ConcertTicketCostCalculatorMetrics {
  weightLossRequired: number;
  weeklyLossRate: number;
  dailyCalorieDeficit: number;
  estimatedTime: number;
}

export interface ConcertTicketCostCalculatorAnalysis {
  feasibility: string;
  healthSafety: string;
  recommendations: string[];
}

export interface ConcertTicketCostCalculatorOutputs {
  weightLossRequired: number;
  weeklyLossRate: number;
  estimatedTime: number;
  analysis: ConcertTicketCostCalculatorAnalysis;
}
