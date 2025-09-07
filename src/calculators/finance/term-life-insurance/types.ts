export interface TermLifeInsuranceInputs {
  // Personal Information
  age: number;
  gender: 'male' | 'female';
  filingStatus?: 'non-smoker' | 'smoker' | 'former-smoker';
  height?: number;
  weight?: number;

  // Policy Details
  coverageAmount: number;
  termLength: number;
  policyType?: 'level-term' | 'decreasing-term' | 'increasing-term' | 'return-of-premium';
  riders?: 'none' | 'waiver-of-premium' | 'accelerated-death-benefit' | 'child-rider' | 'spouse-rider' | 'multiple';

  // Financial Information
  annualIncome?: number;
  debts?: number;
  savings?: number;
  existingLifeInsurance?: number;
  funeralExpenses?: number;

  // Family Information
  dependents?: number;
  childrenAge?: number;
  spouseIncome?: number;
  collegeCosts?: number;

  // Health Information
  healthRating?: 'preferred-plus' | 'preferred' | 'standard-plus' | 'standard' | 'substandard';
  medicalConditions?: 'none' | 'diabetes' | 'heart-disease' | 'cancer' | 'high-blood-pressure' | 'multiple';
  familyHistory?: 'none' | 'heart-disease' | 'cancer' | 'diabetes' | 'multiple';
  occupation?: 'office' | 'manual-labor' | 'hazardous' | 'military' | 'aviation';
  hobbies?: 'none' | 'scuba-diving' | 'skydiving' | 'rock-climbing' | 'racing' | 'multiple';

  // Market Factors
  inflationRate?: number;
  investmentReturn?: number;
  discountRate?: number;

  // Analysis Options
  analysisType?: 'basic' | 'detailed' | 'comparison' | 'needs-analysis';
  comparisonTerms?: '10-20-30' | '15-25' | '20-30' | 'custom';
}

export interface TermLifeInsuranceMetrics {
  annualPremium: number;
  monthlyPremium: number;
  totalPremium: number;
  coverageNeeded: number;
  coverageGap: number;
  premiumPerThousand: number;
  costPerDay: number;
  presentValue: number;
  futureValue: number;
  opportunityCost: number;
  breakevenYears: number;
  affordabilityScore: number;
  adequacyScore: number;
  valueScore: number;
  riskScore: number;
}

export interface TermLifeInsuranceAnalysis {
  termLifeInsuranceRating: 'Excellent Coverage' | 'Good Coverage' | 'Adequate Coverage' | 'Insufficient Coverage' | 'Review Needed';
  costRating: 'Very Affordable' | 'Affordable' | 'Moderate Cost' | 'High Cost' | 'Very High Cost';
  recommendation: 'Increase Coverage' | 'Maintain Current' | 'Consider Reduction' | 'Review Options' | 'Immediate Action';
  keyStrengths: string[];
  keyWeaknesses: string[];
  costFactors: string[];
  opportunities: string[];
  termLifeInsuranceSummary: string;
  costAnalysis: string;
  needsAnalysis: string;
  coverageAnalysis: string;
  premiumAnalysis: string;
  affordabilityAnalysis: string;
  adequacyAnalysis: string;
  valueAnalysis: string;
  riskAnalysis: string;
  comparisonAnalysis: string;
  recommendationSummary: string;
  actionItems: string[];
  nextSteps: string[];
  monitoringPlan: string;
  keyMetrics: string[];
  reviewSchedule: string;
  riskManagement: string;
  mitigationStrategies: string[];
  contingencyPlans: string[];
  performanceBenchmarks: Array<{
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }>;
  decisionRecommendation: string;
  presentationPoints: string[];
  decisionFactors: string[];
  termComparison: Array<{
    term: number;
    annualPremium: number;
    totalPremium: number;
    premiumPerThousand: number;
  }>;
  policyComparison: Array<{
    policyType: string;
    annualPremium: number;
    features: string[];
    suitability: string;
  }>;
  needsBreakdown: {
    incomeReplacement: number;
    debtCoverage: number;
    educationCosts: number;
    funeralExpenses: number;
    totalNeeds: number;
  };
  recommendations: string[];
  keyFactors: string[];
  risks: string[];
}