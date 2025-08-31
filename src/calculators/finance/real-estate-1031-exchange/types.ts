// Real Estate 1031 Exchange Calculator Types

export interface RealEstate1031ExchangeInputs {
  // Relinquished Property Information
  relinquishedPropertyValue: number;
  relinquishedPropertyBasis: number;
  relinquishedPropertyDebt: number;
  relinquishedPropertyAcquisitionDate: string;
  relinquishedPropertySaleDate: string;
  relinquishedPropertySalePrice: number;
  relinquishedPropertySellingCosts: number;
  
  // Replacement Property Information
  replacementPropertyValue: number;
  replacementPropertyBasis: number;
  replacementPropertyDebt: number;
  replacementPropertyAcquisitionDate: string;
  replacementPropertyAcquisitionCosts: number;
  
  // Exchange Information
  exchangeType: 'simultaneous' | 'delayed' | 'reverse' | 'build-to-suit';
  identificationPeriod: number; // days
  exchangePeriod: number; // days
  qualifiedIntermediary: boolean;
  exchangeFees: number;
  
  // Boot Information
  cashBoot: number;
  mortgageBoot: number;
  personalPropertyBoot: number;
  otherBoot: number;
  
  // Tax Information
  taxRate: number;
  stateTaxRate: number;
  depreciationRecaptureRate: number;
  
  // Additional Information
  likeKindRequirement: boolean;
  investmentIntent: boolean;
  holdingPeriod: number; // years
  relatedPartyTransaction: boolean;
  
  // Reporting Preferences
  includeDetailedAnalysis: boolean;
  includeTimeline: boolean;
  includeTaxForms: boolean;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'currency' | 'percentage' | 'decimal';
}

export interface RealEstate1031ExchangeMetrics {
  // Exchange Results
  realizedGain: number;
  recognizedGain: number;
  deferredGain: number;
  bootReceived: number;
  bootGiven: number;
  netBoot: number;
  
  // Tax Impact
  taxLiability: number;
  taxSavings: number;
  effectiveTaxRate: number;
  
  // Property Analysis
  equityReplacement: number;
  debtReplacement: number;
  totalReplacement: number;
  exchangeRatio: number;
  
  // Timing Analysis
  identificationDeadline: string;
  exchangeDeadline: string;
  daysRemaining: number;
  
  // Compliance
  isQualified: boolean;
  complianceIssues: string[];
  qualificationPercentage: number;
}

export interface ExchangeTimeline {
  event: string;
  date: string;
  deadline: string;
  status: 'completed' | 'pending' | 'overdue';
  description: string;
  requirements: string[];
}

export interface BootAnalysis {
  type: string;
  amount: number;
  taxable: boolean;
  taxRate: number;
  taxLiability: number;
  description: string;
}

export interface TaxForm {
  form: string;
  schedule: string;
  line: string;
  amount: number;
  description: string;
  instructions: string;
}

export interface ComplianceCheck {
  requirement: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  impact: string;
  recommendation: string;
}

export interface RealEstate1031ExchangeAnalysis {
  // Key Benefits
  keyBenefits: string[];
  taxSavingsOpportunities: string[];
  risks: string[];
  recommendations: string[];
  
  // Compliance Analysis
  complianceScore: number;
  complianceIssues: string[];
  qualificationRequirements: string[];
  
  // Risk Assessment
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: string[];
  mitigationStrategies: string[];
}

export interface RealEstate1031ExchangeOutputs {
  metrics: RealEstate1031ExchangeMetrics;
  timeline: ExchangeTimeline[];
  bootAnalysis: BootAnalysis[];
  taxForms: TaxForm[];
  complianceChecks: ComplianceCheck[];
  analysis: RealEstate1031ExchangeAnalysis;
}