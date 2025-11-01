export interface OpportunityZoneInvestmentRoiInputs {
  // Investment details
  initialInvestment: number;
  investmentDate: string; // ISO date string
  holdingPeriod: number; // years

  // Property details
  propertyValue: number;
  propertyType: 'Residential' | 'Commercial' | 'Mixed-Use' | 'Industrial';
  zoneDesignationDate: string; // When the zone was designated

  // Tax benefits
  stepUpInBasis: number; // percentage (10% or 15%)
  capitalGainsTaxDeferral: boolean;
  capitalGainsTaxReduction: number; // percentage reduction after 5/7 years

  // Financial projections
  expectedAppreciation: number; // annual percentage
  expectedRentalIncome: number; // annual amount
  operatingExpenses: number; // annual amount
  vacancyRate: number; // percentage

  // Financing
  leverageRatio: number; // percentage of investment financed
  interestRate: number; // annual percentage
  loanTerm: number; // years

  // Exit strategy
  exitStrategy: 'Sale' | 'Refinancing' | 'Hold';
  exitCapRate: number; // for valuation at exit
  exitYear: number;

  // Tax situation
  capitalGainsTaxRate: number; // current tax rate
  ordinaryIncomeTaxRate: number; // for depreciation recapture
  stateTaxRate: number; // additional state taxes

  // Additional costs
  acquisitionCosts: number; // percentage of property value
  annualManagementFees: number; // percentage of rental income
  propertyInsurance: number; // annual amount
  propertyTaxes: number; // annual amount
  maintenanceReserves: number; // percentage of rental income

  // Market conditions
  marketGrowthRate: number; // annual percentage
  inflationRate: number; // annual percentage
}

export interface OpportunityZoneInvestmentRoiOutputs {
  // Tax benefits
  taxDeferralAmount: number;
  stepUpInBasisValue: number;
  capitalGainsTaxSavings: number;
  totalTaxBenefits: number;

  // Cash flow analysis
  annualCashFlow: number[];
  cumulativeCashFlow: number[];
  irr: number; // internal rate of return
  npv: number; // net present value
  cashOnCashReturn: number[]; // annual

  // ROI calculations
  totalReturn: number;
  annualizedReturn: number;
  roiPercentage: number;

  // Tax-advantaged ROI
  afterTaxRoi: number;
  taxEquivalentYield: number;

  // Risk metrics
  riskAdjustedReturn: number;
  sharpeRatio: number;
  maximumDrawdown: number;

  // Break-even analysis
  breakEvenYears: number;
  breakEvenInvestment: number;

  // Sensitivity analysis
  sensitivityToAppreciation: number; // ROI change per 1% appreciation change
  sensitivityToRent: number; // ROI change per 1% rent change
  sensitivityToExpenses: number; // ROI change per 1% expense change

  // Scenario analysis
  conservativeScenario: {
    roi: number;
    irr: number;
    riskLevel: 'Low' | 'Medium' | 'High';
  };
  baseCaseScenario: {
    roi: number;
    irr: number;
    riskLevel: 'Low' | 'Medium' | 'High';
  };
  optimisticScenario: {
    roi: number;
    irr: number;
    riskLevel: 'Low' | 'Medium' | 'High';
  };

  // Compliance tracking
  investmentDeadline5Years: string; // ISO date
  investmentDeadline7Years: string; // ISO date
  complianceStatus: 'On Track' | 'At Risk' | 'Non-Compliant';

  // Performance vs benchmarks
  vsSP500: number; // percentage difference
  vsRealEstateIndex: number; // percentage difference
  vsOpportunityZoneAverage: number; // percentage difference

  // Recommendations
  investmentRecommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  riskAssessment: 'Low' | 'Medium' | 'High' | 'Very High';
  keyStrengths: string[];
  keyRisks: string[];
  actionItems: string[];

  // Detailed projections
  yearlyProjections: {
    year: number;
    propertyValue: number;
    rentalIncome: number;
    operatingExpenses: number;
    noi: number;
    cashFlow: number;
    cumulativeCashFlow: number;
    equityBuild: number;
    taxBenefits: number;
  }[];

  // Exit analysis
  exitValuation: number;
  exitCashFlow: number;
  capitalGainsTax: number;
  afterTaxProceeds: number;
}