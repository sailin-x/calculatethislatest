// Real Estate Development Pro-Forma Calculator Types
export interface RealEstateDevelopmentProFormaInputs {
  // Project Information
  projectName: string;
  projectType: 'residential' | 'commercial' | 'mixed-use' | 'industrial' | 'retail' | 'office' | 'hotel' | 'multifamily' | 'single-family' | 'land-development';
  projectPhase: 'concept' | 'feasibility' | 'design' | 'permitting' | 'construction' | 'marketing' | 'stabilization' | 'operation';
  projectLocation: string;
  projectSize: number; // Total square footage
  landSize: number; // Acres
  zoningType: string;
  density: number; // Units per acre
  buildingHeight: number; // Stories
  parkingRatio: number; // Spaces per unit/1000 sqft
  
  // Financial Assumptions
  landCost: number;
  acquisitionCosts: number;
  constructionCost: number; // Per square foot
  softCosts: number; // Percentage of construction cost
  contingency: number; // Percentage of total cost
  financingCosts: number;
  marketingCosts: number;
  legalCosts: number;
  insuranceCosts: number;
  propertyTaxes: number;
  utilities: number;
  maintenanceCosts: number;
  managementFees: number; // Percentage of gross revenue
  vacancyRate: number; // Percentage
  rentGrowthRate: number; // Annual percentage
  expenseGrowthRate: number; // Annual percentage
  inflationRate: number; // Annual percentage
  discountRate: number; // For NPV calculations
  exitCapRate: number; // For sale scenarios
  holdPeriod: number; // Years
  
  // Revenue Assumptions
  unitMix: UnitMix[];
  rentalRates: RentalRate[];
  salesPrices: SalesPrice[];
  otherIncome: OtherIncome[];
  leaseTerms: LeaseTerm[];
  tenantImprovements: TenantImprovement[];
  concessions: Concession[];
  
  // Construction Timeline
  constructionStartDate: string;
  constructionDuration: number; // Months
  leaseUpPeriod: number; // Months
  stabilizationPeriod: number; // Months
  constructionPhases: ConstructionPhase[];
  milestoneDates: MilestoneDate[];
  
  // Financing
  loanAmount: number;
  loanType: 'construction' | 'permanent' | 'bridge' | 'mezzanine' | 'equity' | 'preferred-equity';
  interestRate: number;
  loanTerm: number; // Years
  loanToCost: number; // Percentage
  loanToValue: number; // Percentage
  debtServiceCoverage: number;
  interestOnlyPeriod: number; // Months
  prepaymentPenalty: number; // Percentage
  originationFee: number; // Percentage
  equityContribution: number;
  equityReturn: number; // Target IRR
  
  // Market Analysis
  marketRent: number; // Per square foot
  marketVacancy: number; // Percentage
  marketCapRate: number;
  marketAppreciation: number; // Annual percentage
  comparableSales: ComparableSale[];
  marketTrends: MarketTrend[];
  
  // Risk Factors
  constructionRisk: number; // 1-10 scale
  marketRisk: number; // 1-10 scale
  financingRisk: number; // 1-10 scale
  regulatoryRisk: number; // 1-10 scale
  environmentalRisk: number; // 1-10 scale
  weatherRisk: number; // 1-10 scale
  laborRisk: number; // 1-10 scale
  materialRisk: number; // 1-10 scale
  
  // Tax Considerations
  depreciationMethod: 'straight-line' | 'accelerated' | 'bonus';
  taxRate: number;
  taxIncentives: TaxIncentive[];
  costSegregation: boolean;
  energyEfficiencyCredits: boolean;
  historicTaxCredits: boolean;
  
  // Exit Strategy
  exitStrategy: 'sale' | 'refinance' | 'hold' | 'partial-sale' | '1031-exchange';
  exitTiming: number; // Years from completion
  exitValue: number;
  exitCosts: number; // Percentage of sale price
  reinvestmentPlan: string;
  
  // Sensitivity Analysis
  sensitivityScenarios: SensitivityScenario[];
  stressTests: StressTest[];
  breakEvenAnalysis: boolean;
  scenarioAnalysis: boolean;
  
  // Reporting Preferences
  reportFormat: 'detailed' | 'summary' | 'executive' | 'investor';
  includeCharts: boolean;
  includeAssumptions: boolean;
  includeSensitivity: boolean;
  includeComparables: boolean;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
}

export interface UnitMix {
  unitType: string;
  squareFootage: number;
  numberOfUnits: number;
  percentageOfTotal: number;
  averageRent: number;
  averagePrice: number;
}

export interface RentalRate {
  unitType: string;
  baseRent: number;
  rentPerSqFt: number;
  escalations: number; // Annual percentage
  concessions: number; // Months free rent
  utilities: number; // Included in rent
  parking: number; // Additional monthly
}

export interface SalesPrice {
  unitType: string;
  basePrice: number;
  pricePerSqFt: number;
  upgrades: number; // Additional per unit
  closingCosts: number; // Percentage
  realtorCommission: number; // Percentage
}

export interface OtherIncome {
  incomeType: string;
  monthlyAmount: number;
  annualAmount: number;
  growthRate: number;
  description: string;
}

export interface LeaseTerm {
  unitType: string;
  averageTerm: number; // Months
  renewalRate: number; // Percentage
  terminationFee: number;
  securityDeposit: number;
}

export interface TenantImprovement {
  unitType: string;
  averageCost: number;
  landlordContribution: number;
  tenantContribution: number;
  amortizationPeriod: number; // Months
}

export interface Concession {
  concessionType: string;
  value: number;
  duration: number; // Months
  applicableUnits: string[];
  description: string;
}

export interface ConstructionPhase {
  phaseName: string;
  startDate: string;
  endDate: string;
  percentageComplete: number;
  cost: number;
  description: string;
}

export interface MilestoneDate {
  milestone: string;
  date: string;
  description: string;
  critical: boolean;
}

export interface ComparableSale {
  propertyName: string;
  address: string;
  saleDate: string;
  salePrice: number;
  pricePerSqFt: number;
  capRate: number;
  noi: number;
  description: string;
}

export interface MarketTrend {
  metric: string;
  currentValue: number;
  historicalValue: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  forecast: number;
  description: string;
}

export interface TaxIncentive {
  incentiveType: string;
  value: number;
  duration: number; // Years
  description: string;
}

export interface SensitivityScenario {
  scenarioName: string;
  constructionCostChange: number; // Percentage
  rentChange: number; // Percentage
  interestRateChange: number; // Percentage
  timelineChange: number; // Months
  description: string;
}

export interface StressTest {
  testName: string;
  constructionCostIncrease: number; // Percentage
  rentDecrease: number; // Percentage
  interestRateIncrease: number; // Percentage
  timelineExtension: number; // Months
  vacancyIncrease: number; // Percentage
  description: string;
}

export interface RealEstateDevelopmentProFormaMetrics {
  // Development Metrics
  totalProjectCost: number;
  totalRevenue: number;
  totalProfit: number;
  profitMargin: number;
  returnOnCost: number;
  returnOnEquity: number;
  internalRateOfReturn: number;
  netPresentValue: number;
  paybackPeriod: number;
  breakEvenOccupancy: number;
  breakEvenRent: number;
  
  // Construction Metrics
  constructionCostPerSqFt: number;
  totalConstructionCost: number;
  softCostsAmount: number;
  contingencyAmount: number;
  constructionTimeline: number; // Months
  
  // Revenue Metrics
  grossPotentialRent: number;
  effectiveGrossIncome: number;
  netOperatingIncome: number;
  cashFlow: number;
  cashOnCashReturn: number;
  equityMultiple: number;
  
  // Financing Metrics
  debtService: number;
  debtServiceCoverageRatio: number;
  loanToCostRatio: number;
  loanToValueRatio: number;
  equityContribution: number;
  equityReturn: number;
  
  // Market Metrics
  marketValue: number;
  marketCapRate: number;
  pricePerSqFt: number;
  rentPerSqFt: number;
  occupancyRate: number;
  
  // Risk Metrics
  riskAdjustedReturn: number;
  sensitivityScore: number;
  stressTestScore: number;
  riskRating: 'low' | 'medium' | 'high';
  
  // Timeline Metrics
  totalTimeline: number; // Months
  constructionPeriod: number; // Months
  leaseUpPeriod: number; // Months
  stabilizationPeriod: number; // Months
  timeToBreakEven: number; // Months
}

export interface RealEstateDevelopmentProFormaAnalysis {
  // Project Viability
  projectViability: 'highly-viable' | 'viable' | 'marginal' | 'not-viable';
  viabilityScore: number; // 1-100
  keyStrengths: string[];
  keyRisks: string[];
  recommendations: string[];
  
  // Financial Analysis
  financialSummary: string;
  cashFlowAnalysis: string;
  returnAnalysis: string;
  riskAnalysis: string;
  marketAnalysis: string;
  
  // Sensitivity Analysis
  sensitivityResults: SensitivityResult[];
  stressTestResults: StressTestResult[];
  breakEvenAnalysis: BreakEvenAnalysis;
  
  // Market Analysis
  marketPositioning: string;
  competitiveAnalysis: string;
  demandAnalysis: string;
  supplyAnalysis: string;
  
  // Risk Assessment
  riskAssessment: RiskAssessment;
  mitigationStrategies: string[];
  contingencyPlans: string[];
  
  // Investment Summary
  investmentSummary: InvestmentSummary;
  exitStrategy: ExitStrategy;
  timelineSummary: TimelineSummary;
}

export interface SensitivityResult {
  scenario: string;
  npv: number;
  irr: number;
  profitMargin: number;
  breakEvenOccupancy: number;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface StressTestResult {
  test: string;
  npv: number;
  irr: number;
  cashFlow: number;
  survivability: 'high' | 'medium' | 'low';
  description: string;
}

export interface BreakEvenAnalysis {
  breakEvenOccupancy: number;
  breakEvenRent: number;
  breakEvenTimeline: number; // Months
  marginOfSafety: number; // Percentage
  sensitivityToRent: number;
  sensitivityToCosts: number;
}

export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high';
  constructionRisk: RiskDetail;
  marketRisk: RiskDetail;
  financingRisk: RiskDetail;
  regulatoryRisk: RiskDetail;
  environmentalRisk: RiskDetail;
}

export interface RiskDetail {
  level: 'low' | 'medium' | 'high';
  probability: number; // 0-1
  impact: number; // 1-10
  mitigation: string;
}

export interface InvestmentSummary {
  totalInvestment: number;
  expectedReturn: number;
  timeline: number; // Years
  riskLevel: 'low' | 'medium' | 'high';
  keyMetrics: Record<string, number>;
  summary: string;
}

export interface ExitStrategy {
  primaryStrategy: string;
  timing: number; // Years
  expectedValue: number;
  expectedReturn: number;
  alternatives: string[];
}

export interface TimelineSummary {
  totalDuration: number; // Months
  keyMilestones: MilestoneSummary[];
  criticalPath: string[];
  riskFactors: string[];
}

export interface MilestoneSummary {
  milestone: string;
  date: string;
  cost: number;
  revenue: number;
  description: string;
}

export interface CashFlowProjection {
  period: string;
  date: string;
  constructionCosts: number;
  revenue: number;
  operatingExpenses: number;
  debtService: number;
  cashFlow: number;
  cumulativeCashFlow: number;
  occupancy: number;
  noi: number;
}

export interface ScenarioAnalysis {
  scenario: string;
  npv: number;
  irr: number;
  profitMargin: number;
  paybackPeriod: number;
  breakEvenOccupancy: number;
  cashFlowProjections: CashFlowProjection[];
  keyAssumptions: Record<string, any>;
}

export interface RealEstateDevelopmentProFormaOutputs {
  metrics: RealEstateDevelopmentProFormaMetrics;
  analysis: RealEstateDevelopmentProFormaAnalysis;
  cashFlowProjections: CashFlowProjection[];
  scenarioAnalysis: ScenarioAnalysis[];
  investmentSummary: InvestmentSummary;
  timelineSummary: TimelineSummary;
  riskAssessment: RiskAssessment;
  breakEvenAnalysis: BreakEvenAnalysis;
  sensitivityResults: SensitivityResult[];
  stressTestResults: StressTestResult[];
  projectViability: string;
  recommendations: string[];
  keyMetrics: Record<string, number>;
  assumptions: Record<string, any>;
}