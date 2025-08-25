/**
 * TypeScript interfaces for Asset Protection Calculator
 */

export interface AssetProtectionCalculatorInputs {
  // Personal Assets
  personalAssets: {
    cash: number;
    investments: number;
    realEstate: number;
    vehicles: number;
    businessInterests: number;
    retirementAccounts: number;
    lifeInsurance: number;
    otherAssets: number;
  };
  
  // Business Assets
  businessAssets: {
    businessValue: number;
    accountsReceivable: number;
    inventory: number;
    equipment: number;
    intellectualProperty: number;
    goodwill: number;
    otherBusinessAssets: number;
  };
  
  // Risk Factors
  riskFactors: {
    profession: 'low-risk' | 'medium-risk' | 'high-risk';
    businessType: 'low-risk' | 'medium-risk' | 'high-risk';
    personalLiability: number; // Expected liability exposure
    businessLiability: number; // Expected business liability exposure
    lawsuitProbability: number; // Probability of lawsuit (percentage)
    bankruptcyRisk: number; // Risk of bankruptcy (percentage)
    divorceRisk: number; // Risk of divorce (percentage)
    estateTaxExposure: number; // Estate tax exposure
  };
  
  // Current Protection
  currentProtection: {
    personalInsurance: number;
    businessInsurance: number;
    umbrellaPolicy: number;
    trusts: number;
    llcProtection: number;
    otherProtection: number;
  };
  
  // Protection Options
  protectionOptions: {
    includeTrusts: boolean;
    includeLLC: boolean;
    includeInsurance: boolean;
    includeOffshore: boolean;
    includeRetirementProtection: boolean;
    includeHomesteadExemption: boolean;
  };
  
  // Trust Configuration
  trustConfiguration: {
    revocableTrust: boolean;
    irrevocableTrust: boolean;
    assetProtectionTrust: boolean;
    domesticTrust: boolean;
    offshoreTrust: boolean;
    trustSetupCost: number;
    trustAnnualCost: number;
  };
  
  // LLC Configuration
  llcConfiguration: {
    singleMemberLLC: boolean;
    multiMemberLLC: boolean;
    seriesLLC: boolean;
    llcSetupCost: number;
    llcAnnualCost: number;
    llcJurisdiction: 'domestic' | 'delaware' | 'nevada' | 'wyoming' | 'offshore';
  };
  
  // Insurance Configuration
  insuranceConfiguration: {
    personalLiabilityInsurance: number;
    businessLiabilityInsurance: number;
    umbrellaPolicyAmount: number;
    professionalLiabilityInsurance: number;
    directorsAndOfficersInsurance: number;
    cyberLiabilityInsurance: number;
  };
  
  // Analysis Parameters
  analysisPeriod: number; // Analysis period in years
  discountRate: number; // Discount rate for present value calculations
  includeTaxAnalysis: boolean; // Whether to include tax analysis
  includeCostBenefitAnalysis: boolean; // Whether to include cost-benefit analysis
  includeRiskAssessment: boolean; // Whether to include risk assessment
  monteCarloSamples: number; // Number of Monte Carlo simulation samples
  confidenceLevel: number; // Confidence level for statistical analysis
}

export interface AssetProtectionCalculatorResults {
  assetSummary: {
    totalPersonalAssets: number;
    totalBusinessAssets: number;
    totalAssets: number;
    assetBreakdown: {
      personalPercentage: number;
      businessPercentage: number;
    };
  };
  
  riskAssessment: {
    overallRiskLevel: 'low' | 'medium' | 'high';
    riskScore: number;
    riskFactors: Array<{
      factor: string;
      riskLevel: 'low' | 'medium' | 'high';
      impact: number;
      probability: number;
    }>;
    vulnerabilityAnalysis: {
      unprotectedAssets: number;
      protectionGap: number;
      exposurePercentage: number;
    };
  };
  
  currentProtectionAnalysis: {
    totalProtection: number;
    protectionPercentage: number;
    protectionGap: number;
    protectionBreakdown: {
      insurancePercentage: number;
      trustPercentage: number;
      llcPercentage: number;
      otherPercentage: number;
    };
  };
  
  recommendedProtection: {
    totalRecommendedProtection: number;
    protectionIncrease: number;
    recommendedStrategies: Array<{
      strategy: string;
      cost: number;
      protection: number;
      roi: number;
      priority: 'high' | 'medium' | 'low';
    }>;
  };
  
  trustAnalysis?: {
    trustRecommendations: Array<{
      trustType: string;
      setupCost: number;
      annualCost: number;
      protectionAmount: number;
      benefits: string[];
      considerations: string[];
    }>;
    totalTrustCost: number;
    totalTrustProtection: number;
  };
  
  llcAnalysis?: {
    llcRecommendations: Array<{
      llcType: string;
      setupCost: number;
      annualCost: number;
      protectionAmount: number;
      benefits: string[];
      considerations: string[];
    }>;
    totalLLCCost: number;
    totalLLCProtection: number;
  };
  
  insuranceAnalysis?: {
    insuranceRecommendations: Array<{
      insuranceType: string;
      annualPremium: number;
      coverageAmount: number;
      benefits: string[];
      considerations: string[];
    }>;
    totalInsuranceCost: number;
    totalInsuranceCoverage: number;
  };
  
  costBenefitAnalysis?: {
    totalProtectionCost: number;
    totalProtectionValue: number;
    netBenefit: number;
    benefitCostRatio: number;
    paybackPeriod: number;
    roi: number;
  };
  
  taxAnalysis?: {
    taxImplications: {
      trustTaxBenefits: number;
      llcTaxBenefits: number;
      insuranceTaxBenefits: number;
      totalTaxBenefits: number;
    };
    estateTaxSavings: number;
    incomeTaxSavings: number;
    capitalGainsTaxSavings: number;
  };
  
  riskMitigation: {
    riskReduction: number;
    riskReductionPercentage: number;
    remainingRisk: number;
    riskMitigationStrategies: Array<{
      risk: string;
      strategy: string;
      effectiveness: number;
      cost: number;
    }>;
  };
  
  implementationPlan: {
    phases: Array<{
      phase: string;
      duration: number;
      cost: number;
      priority: 'high' | 'medium' | 'low';
      activities: string[];
    }>;
    totalImplementationCost: number;
    totalImplementationTime: number;
  };
  
  recommendations: {
    immediateActions: string[];
    shortTermActions: string[];
    longTermActions: string[];
    priorityRecommendations: string[];
    costOptimization: string[];
    riskMitigation: string[];
  };
  
  summary: {
    keyMetrics: {
      totalAssets: number;
      currentProtection: number;
      recommendedProtection: number;
      protectionGap: number;
      riskLevel: 'low' | 'medium' | 'high';
    };
    keyInsights: string[];
    actionItems: string[];
    riskLevel: 'low' | 'medium' | 'high';
  };
  
  monteCarloResults?: {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    expectedValue: number;
    standardDeviation: number;
  };
}
