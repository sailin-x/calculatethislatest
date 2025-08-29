export interface HotelFeasibilityADRInputs {
  // Property Information
  propertyAddress: string;
  propertySize: number;
  numberOfRooms: number;
  roomTypes: Array<{
    type: string;
    count: number;
    size: number;
    baseRate: number;
  }>;
  hotelClass: 'budget' | 'economy' | 'midscale' | 'upscale' | 'luxury' | 'boutique';
  hotelBrand: string;
  propertyAge: number;
  lastRenovation: number;
  
  // Market Information
  marketLocation: string;
  marketType: 'urban' | 'suburban' | 'airport' | 'resort' | 'business' | 'leisure';
  marketDemand: 'low' | 'medium' | 'high' | 'very_high';
  marketSupply: 'low' | 'medium' | 'high' | 'very_high';
  marketGrowthRate: number;
  seasonalityFactor: number;
  
  // Financial Information
  purchasePrice: number;
  acquisitionCosts: number;
  renovationCosts: number;
  workingCapital: number;
  totalInvestment: number;
  
  // Operating Information
  averageDailyRate: number;
  occupancyRate: number;
  revenuePerAvailableRoom: number;
  averageLengthOfStay: number;
  operatingDaysPerYear: number;
  
  // Revenue Streams
  roomRevenue: number;
  foodAndBeverageRevenue: number;
  ancillaryRevenue: number;
  otherRevenue: number;
  totalRevenue: number;
  
  // Operating Expenses
  laborCosts: number;
  utilities: number;
  maintenance: number;
  insurance: number;
  propertyTaxes: number;
  managementFees: number;
  marketing: number;
  administrative: number;
  otherExpenses: number;
  totalOperatingExpenses: number;
  
  // Staffing
  fullTimeEmployees: number;
  partTimeEmployees: number;
  averageWage: number;
  benefitsPercentage: number;
  
  // Market Analysis
  competitors: Array<{
    name: string;
    distance: number;
    roomCount: number;
    averageRate: number;
    occupancyRate: number;
    class: string;
  }>;
  
  // Demand Drivers
  businessTravel: number;
  leisureTravel: number;
  groupTravel: number;
  localAttractions: number;
  transportationAccess: number;
  
  // Risk Factors
  marketRisk: 'low' | 'medium' | 'high';
  operationalRisk: 'low' | 'medium' | 'high';
  financialRisk: 'low' | 'medium' | 'high';
  regulatoryRisk: 'low' | 'medium' | 'high';
  
  // Financing
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  downPayment: number;
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  discountRate: number;
  taxRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface HotelFeasibilityADRMetrics {
  // Financial Metrics
  netOperatingIncome: number;
  cashFlow: number;
  cashOnCashReturn: number;
  internalRateOfReturn: number;
  netPresentValue: number;
  paybackPeriod: number;
  
  // ADR Analysis
  averageDailyRate: number;
  revenuePerAvailableRoom: number;
  revenuePerOccupiedRoom: number;
  totalRevenuePerRoom: number;
  
  // Occupancy Analysis
  occupancyRate: number;
  availableRoomNights: number;
  occupiedRoomNights: number;
  averageLengthOfStay: number;
  
  // Profitability Metrics
  grossOperatingProfit: number;
  grossOperatingProfitMargin: number;
  netProfitMargin: number;
  ebitda: number;
  ebitdaMargin: number;
  
  // Efficiency Metrics
  revenuePerEmployee: number;
  costPerAvailableRoom: number;
  costPerOccupiedRoom: number;
  laborCostPercentage: number;
  
  // Market Metrics
  marketShare: number;
  competitivePosition: number;
  marketPenetration: number;
  pricePositioning: number;
  
  // Sensitivity Analysis
  sensitivityMatrix: Array<{
    variable: string;
    values: number[];
    impacts: number[];
  }>;
  
  // Scenario Analysis
  scenarios: Array<{
    scenario: string;
    probability: number;
    adr: number;
    occupancy: number;
    revenue: number;
    profit: number;
  }>;
  
  // Financial Projections
  projections: Array<{
    year: number;
    revenue: number;
    expenses: number;
    noi: number;
    cashFlow: number;
    occupancy: number;
    adr: number;
  }>;
}

export interface HotelFeasibilityADRAnalysis {
  // Executive Summary
  feasibilityRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Proceed' | 'Proceed with Conditions' | 'Reconsider' | 'Reject';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Financial Analysis
  financialSummary: string;
  profitabilityAnalysis: string;
  cashFlowAnalysis: string;
  
  // Market Analysis
  marketSummary: string;
  competitiveAnalysis: string;
  demandAnalysis: string;
  
  // Operational Analysis
  operationalSummary: string;
  efficiencyAnalysis: string;
  staffingAnalysis: string;
  
  // ADR Analysis
  adrAnalysis: string;
  pricingStrategy: string;
  revenueOptimization: string;
  
  // Risk Assessment
  riskAssessment: string;
  marketRisk: string;
  operationalRisk: string;
  financialRisk: string;
  
  // Recommendations
  investmentRecommendations: string[];
  operationalRecommendations: string[];
  marketingRecommendations: string[];
  
  // Implementation
  implementationPlan: string;
  nextSteps: string[];
  timeline: string;
  
  // Monitoring
  monitoringPlan: string;
  keyMetrics: string[];
  reviewSchedule: string;
  
  // Risk Management
  riskManagement: string;
  mitigationStrategies: string[];
  contingencyPlans: string[];
  
  // Performance Benchmarks
  performanceBenchmarks: Array<{
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }>;
  
  // Decision Support
  decisionRecommendation: string;
  presentationPoints: string[];
  decisionFactors: string[];
}

export interface HotelFeasibilityADROutputs {
  // Core Metrics
  netOperatingIncome: number;
  cashFlow: number;
  cashOnCashReturn: number;
  internalRateOfReturn: number;
  averageDailyRate: number;
  occupancyRate: number;
  revenuePerAvailableRoom: number;
  feasibilityRating: string;
  
  // Analysis
  analysis: HotelFeasibilityADRAnalysis;
  
  // Additional Metrics
  netPresentValue: number;
  paybackPeriod: number;
  revenuePerOccupiedRoom: number;
  totalRevenuePerRoom: number;
  availableRoomNights: number;
  occupiedRoomNights: number;
  averageLengthOfStay: number;
  grossOperatingProfit: number;
  grossOperatingProfitMargin: number;
  netProfitMargin: number;
  ebitda: number;
  ebitdaMargin: number;
  revenuePerEmployee: number;
  costPerAvailableRoom: number;
  costPerOccupiedRoom: number;
  laborCostPercentage: number;
  marketShare: number;
  competitivePosition: number;
  marketPenetration: number;
  pricePositioning: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  projections: any[];
}
