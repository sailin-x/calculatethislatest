export interface BalancedScorecardPerformanceCalculatorInputs {
  perspectives: {
    financial: Record<string, number>;
    customer: Record<string, number>;
    internalProcess: Record<string, number>;
    learningGrowth: Record<string, number>;
  };
  targets: {
    financial: Record<string, number>;
    customer: Record<string, number>;
    internalProcess: Record<string, number>;
    learningGrowth: Record<string, number>;
  };
  weights: {
    financial: number;
    customer: number;
    internalProcess: number;
    learningGrowth: number;
  };
  timePeriod: 'quarterly' | 'annually';
  industryBenchmarks: Record<string, number>;
}

export interface BalancedScorecardPerformanceCalculatorMetrics {
  overallScore: number;
  perspectiveScores: Record<string, number>;
  targetAchievement: Record<string, number>;
  trendAnalysis: Record<string, number>;
  gapAnalysis: Record<string, number>;
}

export interface BalancedScorecardPerformanceCalculatorAnalysis {
  performanceRating: string;
  strengths: string[];
  weaknesses: string[];
  improvementAreas: string[];
  strategicRecommendations: string[];
}

export interface BalancedScorecardPerformanceCalculatorOutputs {
  overallScore: number;
  perspectiveScores: Record<string, number>;
  targetAchievement: Record<string, number>;
  analysis: BalancedScorecardPerformanceCalculatorAnalysis;
}