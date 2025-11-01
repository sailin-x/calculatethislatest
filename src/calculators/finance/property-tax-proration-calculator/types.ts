export interface PropertyTaxProrationInputs {
  // Transaction details
  salePrice: number;
  closingDate: string;
  taxYearStart: string;
  taxYearEnd: string;

  // Tax information
  annualPropertyTax: number;
  taxRate: number;
  assessedValue: number;

  // Proration details
  prorationMethod: '365-Day' | '366-Day' | '30-Day' | 'Actual Days' | 'Semi-Annual';
  buyerPaysProratedTax: boolean;
  sellerCreditsTax: boolean;

  // Transaction parties
  buyerName: string;
  sellerName: string;

  // Property details
  propertyAddress: string;
  propertyType: 'Residential' | 'Commercial' | 'Vacant Land';

  // Tax payment history
  lastTaxPaymentDate: string;
  lastTaxPaymentAmount: number;
  nextTaxPaymentDate: string;
  nextTaxPaymentAmount: number;

  // Special assessments or overrides
  specialAssessments: number;
  taxOverrides: number;

  // State-specific rules
  state: string;
  county: string;
  taxDistrict: string;

  // Additional fees
  escrowFees: number;
  titleFees: number;
  recordingFees: number;

  // Analysis options
  includeEscrowAnalysis: boolean;
  includeTitleAnalysis: boolean;
  includeSettlementAnalysis: boolean;

  // Historical data
  previousYearTax: number;
  taxIncreasePercentage: number;

  // Closing adjustments
  closingAdjustmentDays: number;
  adjustmentPeriodStart: string;
  adjustmentPeriodEnd: string;
}

export interface PropertyTaxProrationOutputs {
  // Proration calculations
  totalDaysInTaxYear: number;
  daysOwnedBySeller: number;
  daysOwnedByBuyer: number;
  sellerTaxProration: number;
  buyerTaxProration: number;

  // Tax amounts
  sellerPortionOfAnnualTax: number;
  buyerPortionOfAnnualTax: number;
  proratedTaxAmount: number;

  // Payment responsibilities
  sellerOwedToBuyer: number;
  buyerOwedToSeller: number;
  netTaxAdjustment: number;

  // Escrow calculations
  escrowTaxReserve: number;
  escrowShortage: number;
  escrowSurplus: number;

  // Settlement statement items
  sellerTaxCredit: number;
  buyerTaxDebit: number;
  adjustmentEntry: number;

  // Tax year analysis
  taxYearProgress: number; // Percentage of tax year completed
  remainingTaxYearDays: number;
  taxPeriodStatus: 'Prepaid' | 'Current' | 'Delinquent';

  // Comparative analysis
  vsStandardProration: number;
  prorationEfficiency: number;
  taxSavingsFromMethod: number;

  // State-specific calculations
  stateProrationRules: string[];
  localTaxRequirements: string[];
  complianceStatus: 'Compliant' | 'Non-Compliant' | 'Review Required';

  // Cost breakdown
  baseTaxAmount: number;
  specialAssessmentAmount: number;
  overrideAmount: number;
  totalTaxLiability: number;

  // Payment schedule
  taxPaymentSchedule: Array<{
    date: string;
    amount: number;
    responsibleParty: 'Seller' | 'Buyer' | 'Escrow';
  }>;

  // Risk assessment
  prorationRiskLevel: 'Low' | 'Medium' | 'High';
  riskFactors: string[];
  recommendedActions: string[];

  // Historical comparison
  previousTransactionComparison: {
    similarSalePrice: number;
    similarTaxProration: number;
    difference: number;
  };

  // Tax efficiency
  taxProrationEfficiency: number;
  optimalClosingDate: string;
  taxSavingsOpportunities: string[];

  // Legal considerations
  prorationAgreementRequired: boolean;
  contractLanguage: string[];
  disputeResolutionOptions: string[];

  // Financial impact
  impactOnClosingCosts: number;
  impactOnCashToClose: number;
  taxAdjustedSalePrice: number;

  // Projections
  projectedTaxForNextYear: number;
  projectedProrationChange: number;
  futureTaxLiability: number;

  // Educational content
  prorationFacts: string[];
  stateSpecificTips: string[];
  negotiationTips: string[];

  // Audit trail
  calculationMethodUsed: string;
  assumptionsMade: string[];
  dataSources: string[];

  // Alternative scenarios
  bestCaseScenario: {
    prorationAmount: number;
    savings: number;
  };

  worstCaseScenario: {
    prorationAmount: number;
    additionalCost: number;
  };

  // Market analysis
  localProrationAverages: number;
  marketComparison: 'Below Market' | 'At Market' | 'Above Market';
  competitiveAnalysis: string[];

  // Closing timeline
  optimalClosingWindow: {
    startDate: string;
    endDate: string;
    reason: string;
  };

  // Tax authority information
  taxAuthorityContact: string;
  paymentMethods: string[];
  onlinePaymentAvailable: boolean;

  // Compliance and reporting
  reportingRequirements: string[];
  documentationNeeded: string[];
  recordRetentionPeriod: number;
}