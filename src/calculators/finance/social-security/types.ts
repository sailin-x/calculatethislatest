export interface SocialSecurityInputs {
  // Personal Information
  birthDate: string;
  fullRetirementAge: number; // FRA in years and months
  currentAge: number;

  // Earnings Information
  averageIndexedMonthlyEarnings: number; // AIME
  primaryInsuranceAmount: number; // PIA at FRA

  // Claiming Strategy
  plannedClaimingAge: number;
  claimingDate: string;

  // Spousal Information (if applicable)
  hasSpouse: boolean;
  spouseBirthDate?: string;
  spousePIA?: number;
  spousePlannedClaimingAge?: number;

  // Benefit Calculations
  earlyRetirementReduction: number; // Reduction for claiming before FRA
  delayedRetirementCredits: number; // Increase for claiming after FRA

  // Cost of Living Adjustments
  colaRate: number; // Annual COLA rate
  includeCOLA: boolean;

  // Taxation
  taxRate: number; // Marginal tax rate on benefits
  includeTaxes: boolean;

  // Survivor Benefits
  calculateSurvivorBenefits: boolean;
  survivorTaxRate?: number;

  // Analysis Options
  analysisType: 'single' | 'couple' | 'survivor';
  includeBreakevenAnalysis: boolean;
  includeLifetimeAnalysis: boolean;

  // Financial Planning
  lifeExpectancy: number;
  discountRate: number; // For present value calculations
  inflationRate: number;

  // Current Benefits (if already receiving)
  isCurrentlyReceiving: boolean;
  currentMonthlyBenefit?: number;
  currentAnnualBenefit?: number;
}

export interface SocialSecurityMetrics {
  // Benefit Calculations
  monthlyBenefit: number;
  annualBenefit: number;
  lifetimeBenefits: number;
  presentValueOfBenefits: number;

  // Reduction/Credits Analysis
  reductionAmount: number;
  reductionPercentage: number;
  creditAmount: number;
  creditPercentage: number;

  // Tax Analysis
  annualTaxes: number;
  lifetimeTaxes: number;
  afterTaxMonthlyBenefit: number;
  afterTaxAnnualBenefit: number;

  // Breakeven Analysis
  breakevenAge: number;
  breakevenYears: number;
  additionalLifetimeBenefits: number;

  // Spousal Analysis
  spousalBenefit: number;
  survivorBenefit: number;
  totalHouseholdBenefit: number;

  // COLA Impact
  colaAdjustment: number;
  realValueOfBenefits: number;

  // Optimization Metrics
  optimalClaimingAge: number;
  maximumLifetimeBenefit: number;
  benefitEfficiency: number;
}

export interface SocialSecurityAnalysis {
  // Benefit Assessment
  benefitAdequacy: 'excellent' | 'good' | 'fair' | 'poor';
  claimingStrategy: 'optimal' | 'good' | 'fair' | 'suboptimal';

  // Recommendations
  recommendations: string[];
  claimingStrategyAdvice: string[];
  taxOptimizationTips: string[];

  // Risk Analysis
  riskFactors: string[];
  longevityRisk: string;
  inflationRisk: string;
  policyRisk: string;

  // Comparison Analysis
  vsEarlyClaiming: {
    difference: number;
    percentage: number;
    rationale: string;
  };
  vsDelayedClaiming: {
    difference: number;
    percentage: number;
    rationale: string;
  };

  // Financial Planning
  retirementReadiness: 'on_track' | 'caution' | 'at_risk';
  incomeReplacement: number;
  savingsGap: number;

  // Legal & Regulatory
  eligibilityRequirements: string[];
  claimingDeadlines: string[];
  appealRights: string[];

  // Family Impact
  spousalImpact: string;
  survivorImpact: string;
  dependentImpact: string;

  // Economic Analysis
  purchasingPower: number;
  realReturn: string;
  inflationAdjustedValue: number;
}

export interface SocialSecurityOutputs {
  // Core Results
  monthlyBenefit: number;
  annualBenefit: number;
  lifetimeBenefits: number;
  presentValueOfBenefits: number;

  // Tax Impact
  afterTaxMonthlyBenefit: number;
  afterTaxAnnualBenefit: number;
  lifetimeTaxes: number;

  // Optimization
  optimalClaimingAge: number;
  breakevenAge: number;
  additionalLifetimeBenefits: number;

  // Analysis
  analysis: SocialSecurityAnalysis;
}