export interface TimberlandInvestmentInputs {
  // Property Information
  acreage: number;
  timberType: 'hardwood' | 'softwood' | 'mixed';
  ageOfTimber: number;
  timberVolumePerAcre: number;

  // Financial Information
  landCostPerAcre: number;
  timberValuePerAcre: number;
  totalAcquisitionCost: number;
  financingAmount: number;
  interestRate: number;
  loanTerm: number;

  // Operating Costs
  annualManagementCost: number;
  annualInsuranceCost: number;
  annualPropertyTaxes: number;
  annualMaintenanceCost: number;
  harvestingCostPerAcre: number;

  // Revenue Information
  timberPricePerUnit: number;
  annualAppreciationRate: number;
  harvestCycleYears: number;
  expectedHarvestVolume: number;

  // Analysis Parameters
  analysisPeriod: number;
  discountRate: number;
  taxRate: number;
  inflationRate: number;
}

export interface TimberlandInvestmentResults {
  // Financial Metrics
  totalInvestment: number;
  annualRevenue: number;
  annualExpenses: number;
  netOperatingIncome: number;
  cashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  irr: number;
  npv: number;

  // Timber-Specific Metrics
  timberValuePerAcre: number;
  totalTimberValue: number;
  annualGrowthRate: number;
  harvestRevenue: number;
  harvestFrequency: number;

  // Investment Analysis
  paybackPeriod: number;
  totalReturn: number;
  roiPercentage: number;
  profitMargin: number;

  // Risk Analysis
  riskAssessment: string;
  recommendation: string;
  sensitivityAnalysis: string;
}