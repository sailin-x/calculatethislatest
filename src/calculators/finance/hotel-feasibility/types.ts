export interface HotelFeasibilityInputs {
  // Property Information
  propertyAddress: string;
  city: string;
  state: string;
  zipCode: string;
  totalRooms: number;
  roomTypes: {
    standard: number;
    deluxe: number;
    suite: number;
    presidential: number;
  };
  totalSquareFootage: number;
  landArea: number; // acres
  buildingAge: number;
  lastRenovationYear: number;
  
  // Market Information
  marketType: 'urban' | 'suburban' | 'airport' | 'resort' | 'business' | 'leisure' | 'mixed';
  competitionLevel: 'low' | 'moderate' | 'high' | 'very_high';
  marketDemand: 'low' | 'moderate' | 'high' | 'very_high';
  seasonality: 'low' | 'moderate' | 'high' | 'extreme';
  averageMarketADR: number; // Average Daily Rate
  averageMarketOccupancy: number; // percentage
  
  // Financial Projections
  projectedADR: {
    standard: number;
    deluxe: number;
    suite: number;
    presidential: number;
  };
  projectedOccupancy: number; // percentage
  averageLengthOfStay: number; // days
  revenuePerAvailableRoom: number; // RevPAR
  
  // Operating Costs
  laborCosts: {
    management: number; // annual
    frontDesk: number; // annual
    housekeeping: number; // annual
    maintenance: number; // annual
    foodBeverage: number; // annual
    other: number; // annual
  };
  utilityCosts: {
    electricity: number; // annual
    gas: number; // annual
    water: number; // annual
    internet: number; // annual
    other: number; // annual
  };
  maintenanceCosts: {
    routine: number; // annual
    capital: number; // annual
    emergency: number; // annual
  };
  insuranceCosts: {
    property: number; // annual
    liability: number; // annual
    business: number; // annual
  };
  marketingCosts: {
    advertising: number; // annual
    online: number; // annual
    promotions: number; // annual
  };
  otherOperatingCosts: {
    supplies: number; // annual
    professional: number; // annual
    taxes: number; // annual
    other: number; // annual
  };
  
  // Capital Investment
  acquisitionCost: number;
  renovationCost: number;
  furnitureFixturesEquipment: number;
  workingCapital: number;
  totalInvestment: number;
  
  // Financing
  loanAmount: number;
  interestRate: number;
  loanTerm: number; // years
  downPayment: number;
  equityContribution: number;
  
  // Revenue Streams
  roomRevenue: number; // annual
  foodBeverageRevenue: number; // annual
  meetingSpaceRevenue: number; // annual
  otherRevenue: number; // annual
  
  // Market Analysis
  targetMarket: string[];
  competitiveAdvantages: string[];
  marketChallenges: string[];
  growthPotential: 'low' | 'moderate' | 'high' | 'very_high';
  
  // Risk Factors
  marketRisk: 'low' | 'moderate' | 'high' | 'very_high';
  operationalRisk: 'low' | 'moderate' | 'high' | 'very_high';
  financialRisk: 'low' | 'moderate' | 'high' | 'very_high';
  regulatoryRisk: 'low' | 'moderate' | 'high' | 'very_high';
}

export interface HotelFeasibilityOutputs {
  // Financial Performance
  totalRevenue: number;
  totalOperatingExpenses: number;
  netOperatingIncome: number;
  debtService: number;
  cashFlow: number;
  profitMargin: number;
  
  // Key Performance Indicators
  averageDailyRate: number;
  occupancyRate: number;
  revenuePerAvailableRoom: number;
  averageRevenuePerUser: number;
  costPerOccupiedRoom: number;
  grossOperatingProfit: number;
  grossOperatingProfitMargin: number;
  
  // Investment Analysis
  totalInvestment: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  paybackPeriod: number;
  returnOnInvestment: number;
  returnOnEquity: number;
  
  // Market Analysis
  marketPosition: 'below_market' | 'at_market' | 'above_market';
  competitivePosition: 'weak' | 'average' | 'strong' | 'dominant';
  marketShare: number;
  priceElasticity: number;
  
  // Risk Assessment
  overallRiskScore: number; // 1-100 scale
  riskFactors: string[];
  riskMitigationStrategies: string[];
  
  // Sensitivity Analysis
  breakevenOccupancy: number;
  breakevenADR: number;
  sensitivityAnalysis: {
    occupancyImpact: number;
    adrImpact: number;
    costImpact: number;
  };
  
  // Recommendations
  feasibilityRecommendation: 'not_feasible' | 'marginal' | 'feasible' | 'highly_feasible';
  keyRecommendations: string[];
  operationalRecommendations: string[];
  financialRecommendations: string[];
  marketingRecommendations: string[];
  
  // Projections
  fiveYearProjections: {
    year1: FinancialProjection;
    year2: FinancialProjection;
    year3: FinancialProjection;
    year4: FinancialProjection;
    year5: FinancialProjection;
  };
  
  // Summary
  summary: {
    totalAnnualRevenue: number;
    totalAnnualExpenses: number;
    netAnnualIncome: number;
    keyStrengths: string[];
    keyChallenges: string[];
    nextSteps: string[];
  };
}

export interface FinancialProjection {
  revenue: number;
  expenses: number;
  netIncome: number;
  occupancy: number;
  adr: number;
  revpar: number;
}