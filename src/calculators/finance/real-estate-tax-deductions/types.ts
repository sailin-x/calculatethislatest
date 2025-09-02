// Real Estate Tax Deductions Calculator Types

export interface RealEstateTaxDeductionsInputs {
  // Property Information
  propertyType: 'residential' | 'commercial' | 'mixed-use' | 'industrial' | 'rental' | 'vacation-home' | 'investment';
  propertyValue: number;
  acquisitionDate: string;
  placedInServiceDate: string;
  propertyUse: 'personal' | 'rental' | 'business' | 'mixed';
  personalUsePercentage: number;
  
  // Income Information
  rentalIncome: number;
  otherIncome: number;
  totalIncome: number;
  filingStatus: 'single' | 'married-filing-jointly' | 'married-filing-separately' | 'head-of-household' | 'qualifying-widow';
  taxYear: number;
  
  // Property Expenses
  mortgageInterest: number;
  propertyTaxes: number;
  insurance: number;
  utilities: number;
  maintenance: number;
  repairs: number;
  propertyManagement: number;
  advertising: number;
  legalFees: number;
  accountingFees: number;
  travelExpenses: number;
  homeOfficeExpenses: number;
  otherExpenses: number;
  
  // Depreciation Information
  landValue: number;
  buildingValue: number;
  improvementsValue: number;
  depreciationMethod: 'straight-line' | 'declining-balance' | 'sum-of-years-digits';
  recoveryPeriod: number;
  bonusDepreciationEligible: boolean;
  bonusDepreciationPercentage: number;
  section179Eligible: boolean;
  section179Amount: number;
  
  // Passive Activity Information
  isPassiveActivity: boolean;
  materialParticipation: boolean;
  realEstateProfessional: boolean;
  activeParticipation: boolean;
  
  // Loss Limitations
  atRiskLimitation: boolean;
  passiveLossLimitation: boolean;
  excessBusinessLossLimitation: boolean;
  
  // Tax Credits
  energyEfficientImprovements: number;
  renewableEnergyCredits: number;
  lowIncomeHousingCredits: number;
  historicRehabilitationCredits: number;
  
  // State and Local Information
  stateTaxRate: number;
  localTaxRate: number;
  stateDeductions: number;
  localDeductions: number;
  
  // Additional Information
  casualtyLosses: number;
  theftLosses: number;
  casualtyGains: number;
  netOperatingLoss: number;
  alternativeMinimumTax: boolean;
  
  // Reporting Preferences
  includeDetailedBreakdown: boolean;
  includeScheduleE: boolean;
  includeForm4562: boolean;
  includeForm8582: boolean;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'currency' | 'percentage' | 'decimal';
}

export interface RealEstateTaxDeductionsMetrics {
  // Tax Savings
  taxSavings: number;
  totalDeductions: number;
  effectiveTaxRate: number;
  afterTaxCashFlow: number;
  
  // Tax Liability
  federalTaxLiability: number;
  stateTaxLiability: number;
  localTaxLiability: number;
  totalTaxLiability: number;
  
  // Income
  totalIncome: number;
  rentalIncome: number;
  taxableIncome: number;
  adjustedGrossIncome: number;
  
  // Deductions
  itemizedDeductions: number;
  standardDeduction: number;
  usedDeduction: 'itemized' | 'standard';
  mortgageInterestDeduction: number;
  propertyTaxDeduction: number;
  depreciationDeduction: number;
  operatingExpenseDeduction: number;
  
  // Passive Activity
  passiveLoss: number;
  suspendedLoss: number;
  activeLoss: number;
  
  // Credits
  totalCredits: number;
  refundableCredits: number;
  nonRefundableCredits: number;
}

export interface DeductionBreakdown {
  category: string;
  amount: number;
  percentage: number;
  form: string;
  line: string;
  description: string;
  isDeductible: boolean;
  limitation?: string;
}

export interface DepreciationSchedule {
  year: number;
  beginningBasis: number;
  depreciation: number;
  bonusDepreciation: number;
  section179: number;
  endingBasis: number;
  accumulatedDepreciation: number;
  remainingLife: number;
}

export interface TaxSchedule {
  schedule: string;
  form: string;
  description: string;
  amount: number;
  line: string;
  isRequired: boolean;
  instructions?: string;
}

export interface TaxAnalysis {
  auditRisk: 'low' | 'medium' | 'high';
  riskFactors: string[];
  keyDeductions: string[];
  taxSavingsOpportunities: string[];
  recommendations: string[];
  complianceNotes: string[];
  documentationRequirements: string[];
}

export interface RealEstateTaxDeductionsOutputs {
  metrics: RealEstateTaxDeductionsMetrics;
  deductionBreakdown: DeductionBreakdown[];
  depreciationSchedule: DepreciationSchedule[];
  taxSchedules: TaxSchedule[];
  analysis: TaxAnalysis;
}