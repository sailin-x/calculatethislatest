export interface FlexibleSpendingAccountInputs {
  // Account Information
  accountType: 'health' | 'dependent' | 'parking' | 'transit';
  annualContributionLimit: number;
  currentBalance: number;
  contributionFrequency: 'monthly' | 'bi-weekly' | 'weekly';

  // Personal Information
  filingStatus: 'single' | 'married-joint' | 'married-separate' | 'head-household';
  numberOfDependents: number;
  hasSpouse: boolean;
  spouseHasCoverage: boolean;

  // Health FSA Specific
  hasHealthInsurance: boolean;
  insuranceType: 'individual' | 'family' | 'none';
  expectedMedicalExpenses: number;
  preventiveCareExpenses: number;
  prescriptionExpenses: number;
  dentalExpenses: number;
  visionExpenses: number;

  // Dependent Care FSA Specific
  childcareExpenses: number;
  eldercareExpenses: number;
  dependentAges: number[];
  childcareProvider: 'licensed' | 'unlicensed' | 'relative';

  // Commuter Benefits
  monthlyParkingCost: number;
  monthlyTransitCost: number;
  workDaysPerMonth: number;
  distanceToWork: number;

  // Tax Information
  marginalTaxRate: number;
  stateTaxRate: number;
  employerMatch: number; // percentage

  // Plan Year Information
  planYearStart: string;
  planYearEnd: string;
  gracePeriodDays: number;
  carryoverAllowed: boolean;
  maxCarryoverAmount: number;

  // Usage Tracking
  usedToDate: number;
  projectedUsage: number;
  lastReimbursementDate: string;
}

export interface FlexibleSpendingAccountResults {
  // Contribution Analysis
  recommendedContribution: number;
  maximumContribution: number;
  taxSavings: number;
  netCost: number;

  // Expense Analysis
  totalExpectedExpenses: number;
  coveredExpenses: number;
  uncoveredExpenses: number;
  utilizationRate: number;

  // Savings Analysis
  annualSavings: number;
  lifetimeSavings: number;
  breakEvenPoint: number;

  // Risk Analysis
  underContributionRisk: number;
  overContributionRisk: number;
  forfeitureRisk: number;

  // Cash Flow Analysis
  monthlyContribution: number;
  reimbursementSchedule: Array<{
    month: string;
    contribution: number;
    expenses: number;
    reimbursement: number;
    balance: number;
  }>;

  // Tax Analysis
  federalTaxSavings: number;
  stateTaxSavings: number;
  ficaSavings: number;
  totalTaxAdvantage: number;

  // Employer Benefits
  employerContribution: number;
  totalEmployerCost: number;
  employeeSavings: number;

  // Recommendations
  optimalContribution: number;
  riskLevel: 'low' | 'medium' | 'high';
  strategyRecommendations: string[];
  alternativeOptions: string[];

  // Compliance
  gracePeriodUtilization: number;
  carryoverUtilization: number;
  complianceScore: number;
}