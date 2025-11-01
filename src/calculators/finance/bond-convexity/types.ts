export interface BondConvexityInputs {
  faceValue: number;
  couponRate: number;
  yearsToMaturity: number;
  yieldToMaturity: number;
  couponFrequency: number;
  currentPrice?: number;
}

export interface BondConvexityOutputs {
  convexity: number;
  modifiedConvexity: number;
  effectiveConvexity: number;
  duration: number;
  modifiedDuration: number;
  priceChange: number;
  percentagePriceChange: number;
  convexityAdjustment: number;
}

export interface BondConvexityMetrics {
  result: number;
  convexity: number;
  duration: number;
  priceChange: number;
}

export interface BondConvexityAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  interestRateSensitivity: number;
  convexityBenefit: string;
  stabilityScore: number;
}