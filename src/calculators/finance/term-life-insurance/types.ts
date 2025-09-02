export interface TermLifeInsuranceInputs {
  // Personal Information
  age: number;
  gender: 'male' | 'female';
  smokingStatus: 'non-smoker' | 'smoker' | 'former-smoker';
  healthRating: 'excellent' | 'very-good' | 'good' | 'fair' | 'poor';
  
  // Policy Information
  coverageAmount: number;
  termLength: number;
  policyType: 'level-term' | 'decreasing-term' | 'increasing-term';
  
  // Health Information
  height: number;
  weight: number;
  bmi: number;
  hasPreExistingConditions: boolean;
  preExistingConditions: string[];
  
  // Lifestyle Information
  occupation: string;
  occupationRisk: 'low' | 'medium' | 'high';
  hobbies: string[];
  hobbyRisk: 'low' | 'medium' | 'high';
  travelFrequency: 'domestic' | 'international' | 'none';
  
  // Family History
  familyHistory: {
    heartDisease: boolean;
    cancer: boolean;
    diabetes: boolean;
    stroke: boolean;
    otherConditions: string[];
  };
  
  // Financial Information
  annualIncome: number;
  existingLifeInsurance: number;
  debtAmount: number;
  funeralExpenses: number;
  
  // Policy Features
  riders: {
    accidentalDeath: boolean;
    disabilityWaiver: boolean;
    criticalIllness: boolean;
    returnOfPremium: boolean;
    childRider: boolean;
  };
  
  // Market Information
  marketRates: {
    excellent: number;
    veryGood: number;
    good: number;
    fair: number;
    poor: number;
  };
  
  // Analysis Parameters
  inflationRate: number;
  investmentReturn: number;
  analysisPeriod: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'currency' | 'percentage' | 'decimal';
}

export interface TermLifeInsuranceMetrics {
  // Premium Calculations
  basePremium: number;
  adjustedPremium: number;
  totalPremium: number;
  monthlyPremium: number;
  annualPremium: number;
  
  // Cost Analysis
  costPerThousand: number;
  costPerMonth: number;
  totalCost: number;
  averageAnnualCost: number;
  
  // Coverage Analysis
  coverageRatio: number;
  incomeReplacement: number;
  debtCoverage: number;
  funeralCoverage: number;
  
  // Risk Assessment
  riskScore: number;
  riskCategory: 'low' | 'medium' | 'high';
  mortalityRisk: number;
  healthRisk: number;
  lifestyleRisk: number;
  
  // Financial Analysis
  presentValue: number;
  futureValue: number;
  inflationAdjustedValue: number;
  realReturn: number;
  
  // Comparison Metrics
  marketComparison: number;
  affordabilityScore: number;
  valueScore: number;
  recommendationScore: number;
}

export interface PremiumBreakdown {
  category: string;
  amount: number;
  percentage: number;
  description: string;
  isAdjustable: boolean;
}

export interface RiskAnalysis {
  riskScore: number;
  riskCategory: 'low' | 'medium' | 'high';
  riskFactors: string[];
  riskMitigation: string[];
  recommendations: string[];
  mortalityTable: MortalityRate[];
}

export interface MortalityRate {
  age: number;
  maleRate: number;
  femaleRate: number;
  smokerRate: number;
  nonSmokerRate: number;
}

export interface PolicyComparison {
  company: string;
  premium: number;
  rating: string;
  features: string[];
  pros: string[];
  cons: string[];
  recommendation: 'recommended' | 'consider' | 'avoid';
}

export interface FinancialAnalysis {
  affordabilityScore: number;
  valueScore: number;
  recommendationScore: number;
  alternatives: string[];
  recommendations: string[];
  warnings: string[];
}

export interface TermLifeInsuranceOutputs {
  metrics: TermLifeInsuranceMetrics;
  premiumBreakdown: PremiumBreakdown[];
  riskAnalysis: RiskAnalysis;
  policyComparison: PolicyComparison[];
  financialAnalysis: FinancialAnalysis;
}