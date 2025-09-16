export interface TenantImprovementAllowanceInputs {
  // Lease Information
  leaseTermYears: number;
  annualRent: number;
  tenantImprovementAllowance: number;
  landlordContributionPercentage: number;

  // Cost Information
  totalConstructionCost: number;
  constructionPeriodMonths: number;
  financingRate: number;
  holdingPeriodYears: number;

  // Financial Information
  discountRate: number;
  taxRate: number;
  depreciationYears: number;
  expectedAppreciation: number;

  // Analysis Options
  includeFinancing: boolean;
  includeDepreciation: boolean;
  includeTaxBenefits: boolean;
}

export interface TenantImprovementAllowanceResults {
  // Cost Analysis
  landlordTotalCost: number;
  tenantTotalCost: number;
  totalProjectCost: number;

  // Cash Flow Analysis
  monthlyFinancingCost: number;
  annualFinancingCost: number;
  annualDepreciation: number;
  annualTaxSavings: number;
  netAnnualCost: number;

  // ROI Analysis
  npvOfCosts: number;
  irrOfInvestment: number;
  paybackPeriodYears: number;
  roiPercentage: number;

  // Lease Impact
  effectiveRentIncrease: number;
  costPerSquareFoot: number;
  allowanceUtilizationRate: number;

  // Risk Analysis
  breakEvenOccupancy: number;
  sensitivityAnalysis: string;
  recommendation: string;
}