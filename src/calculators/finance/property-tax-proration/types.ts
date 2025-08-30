// Property Tax Proration Calculator Types

export interface PropertyTaxProrationInputs {
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial' | 'industrial' | 'land' | 'agricultural';
  propertySize: number;
  propertyAge: number;
  propertyUse: 'primary_residence' | 'secondary_residence' | 'investment' | 'commercial' | 'vacant';
  propertyCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_repair';
  
  // Location Information
  state: string;
  county: string;
  city: string;
  zipCode: string;
  schoolDistrict: string;
  
  // Tax Rates and Assessments
  countyTaxRate: number;
  cityTaxRate: number;
  schoolTaxRate: number;
  specialDistrictTaxRate: number;
  assessmentRatio: number;
  
  // Exemptions
  homesteadExemption: boolean;
  homesteadExemptionAmount: number;
  seniorExemption: boolean;
  seniorExemptionAmount: number;
  veteranExemption: boolean;
  veteranExemptionAmount: number;
  disabilityExemption: boolean;
  disabilityExemptionAmount: number;
  
  // Assessment Information
  assessedValue: number;
  previousAssessedValue: number;
  assessmentDate: string;
  lastReassessmentDate: string;
  reassessmentCycle: number;
  
  // Proration Specific Information
  closingDate: string;
  taxYear: number;
  prorationMethod: '365_day' | '360_day' | 'actual_days' | 'banker_30_360';
  sellerOccupiedUntil: string;
  buyerOccupiedFrom: string;
  taxPaymentSchedule: 'annual' | 'semi_annual' | 'quarterly' | 'monthly';
  lastTaxPaymentDate: string;
  nextTaxPaymentDate: string;
  lastTaxPaymentAmount: number;
  nextTaxPaymentAmount: number;
  
  // Escrow Information
  escrowAccount: boolean;
  escrowMonthlyPayment: number;
  escrowBalance: number;
  escrowProrationMethod: 'seller_pays_all' | 'buyer_pays_all' | 'split_50_50' | 'custom_split';
  customEscrowSplit: number; // Percentage seller pays (0-100)
  
  // Additional Taxes and Fees
  specialAssessments: SpecialAssessment[];
  improvementAssessments: ImprovementAssessment[];
  bondAssessments: BondAssessment[];
  
  // Market and Economic Factors
  marketAppreciationRate: number;
  inflationRate: number;
  localEconomicGrowth: number;
  propertyTaxCap: number;
  
  // Historical Data
  previousYearTax: number;
  fiveYearAverageTax: number;
  tenYearAverageTax: number;
  taxHistory: TaxHistoryEntry[];
  
  // Proration Analysis Parameters
  includeInflation: boolean;
  includeAppreciation: boolean;
  includeExemptions: boolean;
  includeSpecialAssessments: boolean;
  prorationAccuracy: 'exact' | 'estimated' | 'approximate';
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
  includeComparisons: boolean;
  includeTimeline: boolean;
}

export interface SpecialAssessment {
  description: string;
  amount: number;
  duration: number;
  annualAmount: number;
  startDate: string;
  endDate: string;
  prorationIncluded: boolean;
}

export interface ImprovementAssessment {
  description: string;
  amount: number;
  duration: number;
  annualAmount: number;
  startDate: string;
  endDate: string;
  prorationIncluded: boolean;
}

export interface BondAssessment {
  description: string;
  amount: number;
  duration: number;
  annualAmount: number;
  startDate: string;
  endDate: string;
  prorationIncluded: boolean;
}

export interface TaxHistoryEntry {
  year: number;
  assessedValue: number;
  taxAmount: number;
  taxRate: number;
  paymentDate: string;
  prorationAmount?: number;
}

export interface PropertyTaxProrationMetrics {
  // Basic Proration Calculations
  totalDaysInYear: number;
  sellerDays: number;
  buyerDays: number;
  sellerPercentage: number;
  buyerPercentage: number;
  
  // Tax Calculations
  totalAnnualTax: number;
  sellerTaxResponsibility: number;
  buyerTaxResponsibility: number;
  sellerTaxCredit: number;
  buyerTaxDebit: number;
  
  // Tax Breakdown by Component
  countyTax: number;
  cityTax: number;
  schoolTax: number;
  specialDistrictTax: number;
  specialAssessmentsTotal: number;
  improvementAssessmentsTotal: number;
  bondAssessmentsTotal: number;
  
  // Exemptions
  totalExemptions: number;
  exemptionSavings: number;
  exemptionPercentage: number;
  
  // Payment Analysis
  lastPaymentDate: string;
  nextPaymentDate: string;
  daysSinceLastPayment: number;
  daysUntilNextPayment: number;
  sellerPaymentCredit: number;
  buyerPaymentDebit: number;
  
  // Escrow Analysis
  escrowProrationAmount: number;
  sellerEscrowCredit: number;
  buyerEscrowDebit: number;
  escrowDeficit: number;
  escrowSurplus: number;
  
  // Proration Summary
  netSellerCredit: number;
  netBuyerDebit: number;
  prorationBalance: number;
  prorationAccuracy: string;
  
  // Timeline Analysis
  prorationTimeline: ProrationTimelineEntry[];
  paymentSchedule: PaymentScheduleEntry[];
  
  // Comparative Analysis
  prorationEfficiency: 'low' | 'medium' | 'high';
  prorationComplexity: 'simple' | 'moderate' | 'complex';
  prorationRisk: 'low' | 'medium' | 'high';
}

export interface ProrationTimelineEntry {
  date: string;
  event: string;
  sellerAmount: number;
  buyerAmount: number;
  runningBalance: number;
  description: string;
}

export interface PaymentScheduleEntry {
  date: string;
  amount: number;
  responsibleParty: 'seller' | 'buyer' | 'split';
  sellerShare: number;
  buyerShare: number;
  status: 'paid' | 'pending' | 'future';
}

export interface PropertyTaxProrationAnalysis {
  // Proration Rating
  prorationRating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  accuracyRating: 'High' | 'Medium' | 'Low';
  fairnessRating: 'Very Fair' | 'Fair' | 'Unfair' | 'Very Unfair';
  
  // Recommendations
  recommendation: string;
  keyStrengths: string[];
  keyWeaknesses: string[];
  optimizationSuggestions: string[];
  
  // Risk Assessment
  prorationRisks: string[];
  mitigationStrategies: string[];
  contingencyPlans: string[];
  
  // Cost Analysis
  costFactors: string[];
  potentialSavings: number;
  optimizationOpportunities: string[];
  
  // Legal Considerations
  legalRequirements: string[];
  complianceIssues: string[];
  documentationNeeds: string[];
  
  // Market Analysis
  marketFactors: string[];
  economicImpact: string[];
  futureProjections: string[];
  
  // Action Items
  nextSteps: string[];
  timeline: string[];
  priorityActions: string[];
  
  // Performance Benchmarks
  performanceBenchmarks: PerformanceBenchmark[];
  
  // Presentation Data
  presentationPoints: string[];
  decisionFactors: string[];
  summaryPoints: string[];
}

export interface PerformanceBenchmark {
  metric: string;
  target: number;
  benchmark: number;
  industry: string;
  status: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface PropertyTaxProrationOutputs {
  // Basic Information
  propertyValue: number;
  assessedValue: number;
  taxableValue: number;
  closingDate: string;
  taxYear: number;
  
  // Proration Calculations
  totalDaysInYear: number;
  sellerDays: number;
  buyerDays: number;
  sellerPercentage: number;
  buyerPercentage: number;
  
  // Tax Responsibilities
  totalAnnualTax: number;
  sellerTaxResponsibility: number;
  buyerTaxResponsibility: number;
  sellerTaxCredit: number;
  buyerTaxDebit: number;
  
  // Tax Breakdown
  countyTax: number;
  cityTax: number;
  schoolTax: number;
  specialDistrictTax: number;
  specialAssessmentsTotal: number;
  improvementAssessmentsTotal: number;
  bondAssessmentsTotal: number;
  
  // Exemptions
  totalExemptions: number;
  exemptionSavings: number;
  exemptionPercentage: number;
  
  // Payment Analysis
  lastPaymentDate: string;
  nextPaymentDate: string;
  daysSinceLastPayment: number;
  daysUntilNextPayment: number;
  sellerPaymentCredit: number;
  buyerPaymentDebit: number;
  
  // Escrow Analysis
  escrowProrationAmount: number;
  sellerEscrowCredit: number;
  buyerEscrowDebit: number;
  escrowDeficit: number;
  escrowSurplus: number;
  
  // Proration Summary
  netSellerCredit: number;
  netBuyerDebit: number;
  prorationBalance: number;
  prorationAccuracy: string;
  
  // Analysis Arrays
  prorationTimeline: ProrationTimelineEntry[];
  paymentSchedule: PaymentScheduleEntry[];
  
  // Analysis Object
  analysis: PropertyTaxProrationAnalysis;
  
  // Additional Metrics
  prorationEfficiency: 'low' | 'medium' | 'high';
  prorationComplexity: 'simple' | 'moderate' | 'complex';
  prorationRisk: 'low' | 'medium' | 'high';
  
  // Proration Details
  prorationMethod: string;
  prorationFormula: string;
  prorationNotes: string[];
  
  // Settlement Summary
  settlementSummary: {
    totalCredits: number;
    totalDebits: number;
    netAmount: number;
    responsibleParty: string;
    dueDate: string;
  };
}