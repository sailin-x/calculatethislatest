export interface MortgageRateLockInputs {
  loanAmount: number;
  lockedInterestRate: number;
  currentMarketRate: number;
  lockPeriod: number; // days
  lockExpirationDate: string;
  rateAdjustmentCaps: {
    initial: number; // basis points
    periodic: number; // basis points
    lifetime: number; // basis points
  };
  estimatedClosingDate: string;
  rateLockCost: number;
  floatDownOption: boolean;
  floatDownRate: number;
  marketVolatility: 'Low' | 'Medium' | 'High';
  lenderCredit: number;
  expectedRateMovement: number; // basis points expected change
  confidenceLevel: number; // 0-100
  alternativeRateLockPeriods: number[]; // array of alternative periods in days
  historicalRateData: {
    averageMovement: number; // basis points per day
    volatilityIndex: number; // 0-100
    trendDirection: 'Rising' | 'Falling' | 'Stable';
  };
}

export interface MortgageRateLockOutputs {
  lockStatus: 'Active' | 'Expired' | 'Expiring Soon';
  daysRemaining: number;
  rateLockValue: number;
  potentialSavings: number;
  riskAssessment: {
    rateIncreaseRisk: 'Low' | 'Medium' | 'High';
    lockBreakRisk: 'Low' | 'Medium' | 'High';
    marketTimingRisk: 'Low' | 'Medium' | 'High';
    overallRisk: 'Low' | 'Medium' | 'High';
  };
  breakEvenAnalysis: {
    breakEvenDays: number;
    breakEvenRate: number;
    currentValue: number;
    projectedValue: number;
  };
  alternativeScenarios: {
    scenario: string;
    lockPeriod: number;
    projectedRate: number;
    cost: number;
    value: number;
    recommendation: string;
  }[];
  marketAnalysis: {
    currentTrend: string;
    expectedMovement: number;
    volatilityAssessment: string;
    optimalTiming: string;
  };
  costBenefitAnalysis: {
    totalLockCost: number;
    potentialBenefit: number;
    netValue: number;
    roi: number;
    payBackPeriod: number;
  };
  recommendations: {
    primaryRecommendation: string;
    alternativeActions: string[];
    riskMitigation: string[];
    timingAdvice: string;
  };
  sensitivityAnalysis: {
    rateChange: number; // basis points
    impact: number; // dollar impact
    probability: number; // 0-100
  }[];
}