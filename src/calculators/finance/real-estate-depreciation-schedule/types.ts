// Real Estate Depreciation Schedule Calculator Types
export interface RealEstateDepreciationScheduleInputs {
  // Property Information
  propertyName: string;
  propertyType: 'residential' | 'commercial' | 'mixed-use' | 'industrial' | 'retail' | 'office' | 'hotel' | 'multifamily' | 'single-family' | 'land-development';
  propertyAddress: string;
  acquisitionDate: string;
  placedInServiceDate: string;
  totalCost: number;
  landValue: number;
  buildingValue: number;
  improvementsValue: number;
  personalPropertyValue: number;
  
  // Depreciation Method
  depreciationMethod: 'straight-line' | 'accelerated' | 'bonus' | 'cost-segregation' | 'section-179' | 'bonus-depreciation';
  recoveryPeriod: number; // Years
  convention: 'mid-month' | 'mid-quarter' | 'half-year' | 'full-year';
  salvageValue: number;
  salvageValuePercentage: number; // Percentage of total cost
  
  // Cost Segregation Details
  costSegregationStudy: boolean;
  costSegregationStudyDate: string;
  costSegregationStudyCost: number;
  segregatedComponents: SegregatedComponent[];
  
  // Bonus Depreciation
  bonusDepreciationEligible: boolean;
  bonusDepreciationPercentage: number; // Percentage (e.g., 100 for 100%)
  bonusDepreciationYear: number;
  
  // Section 179
  section179Eligible: boolean;
  section179Deduction: number;
  section179Year: number;
  
  // Property Improvements
  improvements: PropertyImprovement[];
  renovations: Renovation[];
  additions: Addition[];
  
  // Disposition Information
  dispositionDate: string;
  dispositionType: 'sale' | 'exchange' | 'abandonment' | 'casualty' | 'theft' | 'condemnation';
  dispositionAmount: number;
  adjustedBasis: number;
  
  // Tax Information
  taxYear: number;
  taxRate: number;
  stateTaxRate: number;
  localTaxRate: number;
  
  // Alternative Minimum Tax
  amtEligible: boolean;
  amtAdjustments: number;
  
  // Passive Activity
  passiveActivity: boolean;
  materialParticipation: boolean;
  realEstateProfessional: boolean;
  
  // Reporting Preferences
  reportFormat: 'detailed' | 'summary' | 'schedule' | 'tax-form';
  includeCharts: boolean;
  includeCalculations: boolean;
  includeTaxImpact: boolean;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
}

export interface SegregatedComponent {
  componentName: string;
  componentType: '5-year' | '7-year' | '15-year' | '27.5-year' | '39-year';
  originalCost: number;
  recoveryPeriod: number;
  depreciationMethod: 'straight-line' | 'accelerated' | 'bonus';
  placedInServiceDate: string;
  description: string;
}

export interface PropertyImprovement {
  improvementName: string;
  improvementType: 'roof' | 'hvac' | 'electrical' | 'plumbing' | 'structural' | 'cosmetic' | 'landscaping' | 'paving' | 'other';
  improvementDate: string;
  improvementCost: number;
  recoveryPeriod: number;
  depreciationMethod: 'straight-line' | 'accelerated' | 'bonus';
  description: string;
}

export interface Renovation {
  renovationName: string;
  renovationType: 'major' | 'minor' | 'repair' | 'maintenance';
  renovationDate: string;
  renovationCost: number;
  recoveryPeriod: number;
  depreciationMethod: 'straight-line' | 'accelerated' | 'bonus';
  description: string;
}

export interface Addition {
  additionName: string;
  additionType: 'building' | 'structure' | 'improvement' | 'fixture';
  additionDate: string;
  additionCost: number;
  recoveryPeriod: number;
  depreciationMethod: 'straight-line' | 'accelerated' | 'bonus';
  description: string;
}

export interface RealEstateDepreciationScheduleMetrics {
  // Basic Depreciation Metrics
  totalDepreciableBasis: number;
  totalDepreciationTaken: number;
  remainingBasis: number;
  currentYearDepreciation: number;
  accumulatedDepreciation: number;
  
  // Cost Segregation Metrics
  costSegregationSavings: number;
  acceleratedDepreciation: number;
  bonusDepreciationTaken: number;
  section179DeductionTaken: number;
  
  // Tax Impact Metrics
  taxSavings: number;
  effectiveTaxRate: number;
  netTaxBenefit: number;
  cashFlowImpact: number;
  
  // Recovery Metrics
  recoveryPercentage: number;
  yearsRemaining: number;
  annualDepreciation: number;
  monthlyDepreciation: number;
  
  // Disposition Metrics
  gainOrLoss: number;
  recapturedDepreciation: number;
  capitalGain: number;
  taxLiability: number;
  
  // Performance Metrics
  depreciationEfficiency: number;
  taxBenefitRatio: number;
  cashFlowEnhancement: number;
  roiOnDepreciation: number;
}

export interface RealEstateDepreciationScheduleAnalysis {
  // Depreciation Strategy Analysis
  depreciationStrategy: 'optimal' | 'conservative' | 'aggressive' | 'balanced';
  strategyScore: number; // 1-100
  keyBenefits: string[];
  keyRisks: string[];
  recommendations: string[];
  
  // Tax Analysis
  taxAnalysis: string;
  cashFlowAnalysis: string;
  roiAnalysis: string;
  riskAnalysis: string;
  
  // Cost Segregation Analysis
  costSegregationAnalysis: CostSegregationAnalysis;
  bonusDepreciationAnalysis: BonusDepreciationAnalysis;
  section179Analysis: Section179Analysis;
  
  // Disposition Analysis
  dispositionAnalysis: DispositionAnalysis;
  taxLiabilityAnalysis: TaxLiabilityAnalysis;
  
  // Compliance Analysis
  complianceStatus: 'compliant' | 'review-required' | 'non-compliant';
  complianceIssues: string[];
  complianceRecommendations: string[];
}

export interface CostSegregationAnalysis {
  eligible: boolean;
  potentialSavings: number;
  studyCost: number;
  netBenefit: number;
  paybackPeriod: number;
  recommended: boolean;
  analysis: string;
}

export interface BonusDepreciationAnalysis {
  eligible: boolean;
  maximumDeduction: number;
  recommendedDeduction: number;
  taxSavings: number;
  analysis: string;
}

export interface Section179Analysis {
  eligible: boolean;
  maximumDeduction: number;
  recommendedDeduction: number;
  taxSavings: number;
  analysis: string;
}

export interface DispositionAnalysis {
  dispositionType: string;
  taxConsequences: string;
  recaptureAmount: number;
  capitalGainAmount: number;
  totalTaxLiability: number;
  recommendations: string[];
}

export interface TaxLiabilityAnalysis {
  currentYearTax: number;
  projectedTaxSavings: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  analysis: string;
}

export interface DepreciationYear {
  year: number;
  beginningBasis: number;
  depreciationRate: number;
  depreciationAmount: number;
  endingBasis: number;
  accumulatedDepreciation: number;
  taxSavings: number;
  cashFlowImpact: number;
}

export interface DepreciationSchedule {
  propertyName: string;
  propertyType: string;
  acquisitionDate: string;
  totalCost: number;
  landValue: number;
  depreciableBasis: number;
  recoveryPeriod: number;
  depreciationMethod: string;
  convention: string;
  years: DepreciationYear[];
  totalDepreciation: number;
  remainingBasis: number;
}

export interface ComponentSchedule {
  componentName: string;
  componentType: string;
  originalCost: number;
  recoveryPeriod: number;
  depreciationMethod: string;
  years: DepreciationYear[];
  totalDepreciation: number;
  remainingBasis: number;
}

export interface TaxImpact {
  year: number;
  depreciationDeduction: number;
  taxSavings: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  netTaxBenefit: number;
  cashFlowImpact: number;
}

export interface RealEstateDepreciationScheduleOutputs {
  metrics: RealEstateDepreciationScheduleMetrics;
  analysis: RealEstateDepreciationScheduleAnalysis;
  depreciationSchedule: DepreciationSchedule;
  componentSchedules: ComponentSchedule[];
  taxImpacts: TaxImpact[];
  costSegregationAnalysis: CostSegregationAnalysis;
  bonusDepreciationAnalysis: BonusDepreciationAnalysis;
  section179Analysis: Section179Analysis;
  dispositionAnalysis: DispositionAnalysis;
  taxLiabilityAnalysis: TaxLiabilityAnalysis;
  depreciationSummary: string;
  recommendations: string[];
  keyMetrics: Record<string, number>;
  assumptions: Record<string, any>;
}