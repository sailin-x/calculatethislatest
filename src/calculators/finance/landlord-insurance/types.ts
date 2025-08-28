export interface LandlordInsuranceInputs {
  propertyValue: number;
  dwellingCoverage: number;
  personalPropertyCoverage: number;
  liabilityCoverage: number;
  lossOfRentCoverage: number;
  additionalLivingExpenses: number;
  deductible: number;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'manufactured' | 'apartment';
  constructionType: 'frame' | 'brick' | 'stone' | 'stucco' | 'siding' | 'log' | 'steel';
  yearBuilt: number;
  squareFootage: number;
  propertyLocation: string;
  claimsHistory: number;
  creditScore: number;
  coverageOptions: {
    earthquake: boolean;
    flood: boolean;
    hurricane: boolean;
    windstorm: boolean;
    hail: boolean;
    waterBackup: boolean;
    equipmentBreakdown: boolean;
    ordinanceOrLaw: boolean;
    buildingCodeUpgrade: boolean;
    rentalIncome: boolean;
    tenantImprovements: boolean;
    landlordFurnishings: boolean;
    appliances: boolean;
    landscaping: boolean;
    swimmingPool: boolean;
    trampoline: boolean;
    woodStove: boolean;
    businessEquipment: boolean;
    identityTheft: boolean;
    cyberLiability: boolean;
  };
  safetyFeatures: {
    alarm: boolean;
    deadbolt: boolean;
    smokeDetector: boolean;
    sprinkler: boolean;
    gated: boolean;
    securityCamera: boolean;
    fireExtinguisher: boolean;
    carbonMonoxideDetector: boolean;
  };
  occupancyType: 'owner-occupied' | 'rental' | 'vacation' | 'vacant';
  tenantType: 'residential' | 'commercial' | 'mixed';
  tenantScreening: boolean;
  leaseTerms: Array<{
    tenant: string;
    rent: number;
    term: number;
    startDate: string;
    endDate: string;
    creditRating: string;
    securityDeposit: number;
  }>;
  propertyManagement: boolean;
  propertyManager: string;
  managementFees: number;
  maintenanceObligation: 'tenant' | 'landlord' | 'shared';
  utilityObligation: 'tenant' | 'landlord' | 'shared';
  taxObligation: 'tenant' | 'landlord' | 'shared';
  insuranceObligation: 'tenant' | 'landlord' | 'shared';
  permitCosts: number;
  inspectionCosts: number;
  architecturalFees: number;
  engineeringFees: number;
  legalFees: number;
  projectManagementFees: number;
  otherFees: number;
  totalFees: number;
  constructionTimeline: number;
  completionDate: string;
  occupancyDate: string;
  rentCommencementDate: string;
  baseRent: number;
  percentageRent: number;
  operatingExpenses: number;
  utilities: number;
  janitorial: number;
  maintenance: number;
  insurance: number;
  propertyTaxes: number;
  managementFees: number;
  otherExpenses: number;
  totalExpenses: number;
  netOperatingIncome: number;
  capitalizationRate: number;
  propertyValueIncrease: number;
  rentIncrease: number;
  occupancyIncrease: number;
  marketValueIncrease: number;
  investmentReturn: number;
  paybackPeriod: number;
  internalRateOfReturn: number;
  netPresentValue: number;
  profitabilityIndex: number;
  modifiedInternalRateOfReturn: number;
  discountedPaybackPeriod: number;
  averageAccountingReturn: number;
  breakEvenAnalysis: {
    breakEvenRent: number;
    breakEvenOccupancy: number;
    breakEvenTimeline: number;
  };
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
  riskAssessment: {
    constructionRisk: number;
    tenantRisk: number;
    marketRisk: number;
    financialRisk: number;
    regulatoryRisk: number;
    environmentalRisk: number;
    timelineRisk: number;
    budgetRisk: number;
    totalRisk: number;
  };
}

export interface LandlordInsuranceMetrics {
  basePremium: number;
  dwellingPremium: number;
  personalPropertyPremium: number;
  liabilityPremium: number;
  lossOfRentPremium: number;
  additionalCoveragePremium: number;
  discounts: number;
  surcharges: number;
  totalAnnualPremium: number;
  monthlyPremium: number;
  premiumPerThousand: number;
  coverageRatio: number;
  riskScore: number;
  recommendedCoverage: number;
  coverageGap: number;
  savingsOpportunities: number;
  marketComparison: number;
  deductibleImpact: number;
  safetyFeaturesImpact: number;
  occupancyTypeImpact: number;
  tenantTypeImpact: number;
  propertyTypeImpact: number;
  constructionTypeImpact: number;
  claimsHistoryImpact: number;
  creditScoreImpact: number;
  coverageOptionsImpact: number;
  propertyManagementImpact: number;
  totalImpact: number;
  cashFlowProjection: Array<{
    year: number;
    income: number;
    expenses: number;
    insurance: number;
    netCashFlow: number;
    cumulativeCashFlow: number;
  }>;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
  riskScore: number;
  approvalProbability: number;
  recommendedAction: string;
  alternativeScenarios: Array<{
    scenario: string;
    cost: number;
    coverage: number;
    risk: number;
    recommendation: string;
  }>;
}

export interface LandlordInsuranceAnalysis {
  insuranceGrade: string;
  riskAssessment: string;
  recommendations: string;
  marketAnalysis: string;
  financialAnalysis: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface LandlordInsuranceOutputs extends LandlordInsuranceMetrics {
  analysis: LandlordInsuranceAnalysis;
}
