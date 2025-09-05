export interface LandlordInsuranceInputs {
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'condo' | 'townhouse' | 'multi_family' | 'apartment' | 'duplex' | 'triplex' | 'fourplex';
  propertyAge: number;
  squareFootage: number;
  numberOfUnits: number;
  constructionType: 'frame' | 'brick' | 'stone' | 'stucco' | 'concrete' | 'steel' | 'other';
  roofType: 'asphalt_shingle' | 'metal' | 'tile' | 'slate' | 'wood_shake' | 'flat' | 'other';
  foundationType: 'concrete' | 'crawl_space' | 'basement' | 'slab' | 'pier_beam' | 'other';
  
  // Location & Risk Factors
  state: string;
  city: string;
  zipCode: string;
  floodZone: 'low_risk' | 'moderate_risk' | 'high_risk' | 'very_high_risk' | 'unknown';
  earthquakeRisk: 'low' | 'moderate' | 'high' | 'very_high';
  wildfireRisk: 'low' | 'moderate' | 'high' | 'very_high';
  crimeRate: 'low' | 'moderate' | 'high' | 'very_high';
  distanceToFireStation: number; // miles
  distanceToHydrant: number; // feet
  
  // Coverage Details
  dwellingCoverage: number;
  personalPropertyCoverage: number;
  liabilityCoverage: number;
  medicalPaymentsCoverage: number;
  lossOfRentsCoverage: number;
  additionalLivingExpenses: number;
  deductible: number;
  
  // Policy Features
  replacementCost: boolean;
  extendedReplacementCost: boolean;
  guaranteedReplacementCost: boolean;
  inflationProtection: boolean;
  ordinanceOrLawCoverage: boolean;
  waterBackupCoverage: boolean;
  equipmentBreakdownCoverage: boolean;
  rentalIncomeProtection: boolean;
  
  // Discounts & Credits
  multiPolicyDiscount: boolean;
  securitySystemDiscount: boolean;
  smokeDetectorDiscount: boolean;
  deadboltDiscount: boolean;
  newHomeDiscount: boolean;
  claimsFreeDiscount: boolean;
  loyaltyDiscount: boolean;
  paperlessDiscount: boolean;
  autopayDiscount: boolean;
  
  // Landlord Specific Information
  age: number;
  creditScore: 'poor' | 'fair' | 'good' | 'very_good' | 'excellent';
  claimsHistory: number; // number of claims in past 5 years
  insuranceScore: 'poor' | 'fair' | 'good' | 'very_good' | 'excellent';
  landlordExperience: number; // years of landlord experience
  numberOfProperties: number;
  
  // Rental Information
  monthlyRent: number;
  annualRent: number;
  occupancyRate: number; // percentage
  averageTenantLength: number; // months
  tenantScreening: boolean;
  leaseAgreement: boolean;
  securityDeposit: number;
  
  // Additional Features
  swimmingPool: boolean;
  trampoline: boolean;
  aggressiveDog: boolean;
  homeBusiness: boolean;
  vacantProperty: boolean;
  shortTermRental: boolean;
  furnishedRental: boolean;
  
  // Risk Management
  propertyManagement: boolean;
  regularInspections: boolean;
  maintenanceProgram: boolean;
  tenantInsurance: boolean;
  umbrellaPolicy: boolean;
}

export interface LandlordInsuranceOutputs {
  // Premium Calculations
  basePremium: number;
  dwellingPremium: number;
  personalPropertyPremium: number;
  liabilityPremium: number;
  medicalPaymentsPremium: number;
  lossOfRentsPremium: number;
  additionalLivingExpensesPremium: number;
  
  // Discounts & Credits
  multiPolicyDiscount: number;
  securitySystemDiscount: number;
  smokeDetectorDiscount: number;
  deadboltDiscount: number;
  newHomeDiscount: number;
  claimsFreeDiscount: number;
  loyaltyDiscount: number;
  paperlessDiscount: number;
  autopayDiscount: number;
  totalDiscounts: number;
  
  // Risk Adjustments
  locationRiskAdjustment: number;
  propertyRiskAdjustment: number;
  landlordRiskAdjustment: number;
  rentalRiskAdjustment: number;
  totalRiskAdjustments: number;
  
  // Final Premiums
  annualPremium: number;
  monthlyPremium: number;
  quarterlyPremium: number;
  semiannualPremium: number;
  
  // Coverage Analysis
  coverageAdequacy: 'inadequate' | 'adequate' | 'excessive';
  recommendedDwellingCoverage: number;
  recommendedPersonalPropertyCoverage: number;
  recommendedLiabilityCoverage: number;
  recommendedLossOfRentsCoverage: number;
  
  // Risk Assessment
  overallRiskScore: number; // 1-100 scale
  riskFactors: string[];
  riskMitigationRecommendations: string[];
  
  // Cost Analysis
  costPerThousand: number; // cost per $1000 of coverage
  premiumToValueRatio: number;
  premiumToRentRatio: number;
  deductibleImpact: {
    currentDeductible: number;
    currentPremium: number;
    higherDeductible: number;
    higherDeductiblePremium: number;
    savings: number;
  };
  
  // Rental Income Analysis
  rentalIncomeAnalysis: {
    monthlyRent: number;
    annualRent: number;
    insuranceCostPerMonth: number;
    insuranceCostPercentage: number;
    netRentalIncome: number;
    breakEvenOccupancy: number;
  };
  
  // Recommendations
  coverageRecommendations: string[];
  discountRecommendations: string[];
  riskReductionRecommendations: string[];
  policyOptimizationRecommendations: string[];
  
  // Comparison Data
  marketComparison: {
    averagePremium: number;
    premiumPercentile: number;
    savingsOpportunity: number;
  };
  
  // Summary
  summary: {
    totalAnnualCost: number;
    totalMonthlyCost: number;
    keyBenefits: string[];
    keyRisks: string[];
    nextSteps: string[];
  };
}