export interface TenantImprovementInputs {
  propertyValue: number;
  leaseTerm: number;
  tenantType: 'office' | 'retail' | 'industrial' | 'medical' | 'restaurant' | 'warehouse' | 'mixed-use';
  spaceSize: number;
  improvementType: 'build-out' | 'renovation' | 'expansion' | 'conversion' | 'upgrade';
  constructionCost: number;
  softCosts: number;
  hardCosts: number;
  contingency: number;
  totalProjectCost: number;
  tenantContribution: number;
  landlordContribution: number;
  amortizationPeriod: number;
  interestRate: number;
  propertyLocation: string;
  marketConditions: 'strong' | 'moderate' | 'weak';
  tenantCreditScore: number;
  tenantFinancialStrength: 'excellent' | 'good' | 'fair' | 'poor';
  tenantBusinessType: string;
  tenantIndustry: string;
  tenantExperience: number;
  tenantGuarantee: boolean;
  personalGuarantee: boolean;
  corporateGuarantee: boolean;
  securityDeposit: number;
  letterOfCredit: number;
  performanceBond: number;
  completionBond: number;
  warrantyPeriod: number;
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

export interface TenantImprovementMetrics {
  totalProjectCost: number;
  tenantContribution: number;
  landlordContribution: number;
  amortizedCost: number;
  monthlyAmortization: number;
  annualAmortization: number;
  totalAmortization: number;
  netInvestment: number;
  propertyValueIncrease: number;
  rentIncrease: number;
  occupancyIncrease: number;
  marketValueIncrease: number;
  netOperatingIncome: number;
  netOperatingIncomeIncrease: number;
  capitalizationRate: number;
  effectiveCapRate: number;
  investmentReturn: number;
  returnOnInvestment: number;
  returnOnEquity: number;
  returnOnAssets: number;
  returnOnCapital: number;
  paybackPeriod: number;
  internalRateOfReturn: number;
  netPresentValue: number;
  profitabilityIndex: number;
  modifiedInternalRateOfReturn: number;
  discountedPaybackPeriod: number;
  averageAccountingReturn: number;
  breakEvenRent: number;
  breakEvenOccupancy: number;
  breakEvenTimeline: number;
  cashFlowProjection: Array<{
    year: number;
    income: number;
    expenses: number;
    amortization: number;
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
    return: number;
    risk: number;
    recommendation: string;
  }>;
}

export interface TenantImprovementAnalysis {
  improvementGrade: string;
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

export interface TenantImprovementOutputs extends TenantImprovementMetrics {
  analysis: TenantImprovementAnalysis;
}
