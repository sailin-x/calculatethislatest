import { HotelFeasibilityADRInputs, HotelFeasibilityADROutputs } from './types';

export function calculateHotelFeasibilityADR(inputs: HotelFeasibilityADRInputs): HotelFeasibilityADROutputs {
  // Calculate NOI (Net Operating Income)
  const noi = inputs.totalRevenue - inputs.totalOperatingExpenses;

  // Calculate debt service
  const annualDebtService = calculateAnnualDebtService(inputs);

  // Calculate cash flow
  const cashFlow = noi - annualDebtService;

  // Calculate cash-on-cash return
  const cashOnCashReturn = (cashFlow / inputs.totalInvestment) * 100;

  // Calculate IRR (simplified)
  const irr = calculateIRR(inputs, noi, annualDebtService);

  // Calculate optimized ADR
  const optimizedADR = calculateOptimizedADR(inputs);

  // Calculate projected occupancy
  const projectedOccupancy = calculateProjectedOccupancy(inputs);

  // Calculate RevPAR
  const revpar = optimizedADR * (projectedOccupancy / 100);

  // Determine feasibility rating
  const feasibilityRating = determineFeasibilityRating(cashOnCashReturn, irr, projectedOccupancy);

  // Create analysis object
  const analysis = {
    feasibilityRating: feasibilityRating as 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor',
    riskRating: calculateRiskRating(inputs) as 'Low' | 'Moderate' | 'High' | 'Very High',
    recommendation: getRecommendation(feasibilityRating) as 'Proceed' | 'Proceed with Conditions' | 'Reconsider' | 'Reject',
    keyStrengths: [
      'Strong market demand',
      'Competitive location',
      'Established brand presence'
    ],
    keyWeaknesses: [
      'High initial investment',
      'Market competition',
      'Economic sensitivity'
    ],
    riskFactors: [
      'Market demand fluctuations',
      'Interest rate changes',
      'Competitive pressures'
    ],
    opportunities: [
      'Market growth potential',
      'Revenue optimization',
      'Operational efficiencies'
    ],
    financialSummary: `Based on the provided inputs, the hotel shows a NOI of $${noi.toLocaleString()} with cash flow of $${cashFlow.toLocaleString()}.`,
    profitabilityAnalysis: `The investment shows a ${cashOnCashReturn.toFixed(1)}% cash-on-cash return with an estimated IRR of ${irr.toFixed(1)}%.`,
    cashFlowAnalysis: `Annual cash flow of $${cashFlow.toLocaleString()} provides strong liquidity for operations.`,
    marketSummary: `Market analysis indicates ${inputs.marketDemand} demand with ${inputs.marketGrowthRate}% growth potential.`,
    competitiveAnalysis: `Positioned in ${inputs.marketType} market with ${inputs.marketSupply} supply conditions.`,
    demandAnalysis: `Demand drivers include ${inputs.businessTravel}% business travel and ${inputs.leisureTravel}% leisure travel.`,
    operationalSummary: `Operations require ${inputs.fullTimeEmployees} full-time and ${inputs.partTimeEmployees} part-time employees.`,
    efficiencyAnalysis: `Labor costs represent ${(inputs.laborCosts / inputs.totalRevenue * 100).toFixed(1)}% of total revenue.`,
    staffingAnalysis: `Staffing plan includes ${inputs.fullTimeEmployees + inputs.partTimeEmployees} total employees at average wage of $${inputs.averageWage}/hour.`,
    adrAnalysis: `Optimized ADR of $${optimizedADR.toFixed(0)} based on market conditions and hotel class.`,
    pricingStrategy: `Pricing strategy focuses on ${inputs.hotelClass} positioning with competitive market rates.`,
    revenueOptimization: `Revenue optimization through dynamic pricing and ancillary services.`,
    riskAssessment: `Overall risk assessment considers market, operational, and financial factors.`,
    marketRisk: `${inputs.marketRisk} market risk due to ${inputs.marketDemand} demand and ${inputs.marketSupply} supply.`,
    operationalRisk: `${inputs.operationalRisk} operational risk based on property age and market conditions.`,
    financialRisk: `${inputs.financialRisk} financial risk with ${inputs.interestRate}% financing rate.`,
    investmentRecommendations: [
      'Conduct detailed market analysis',
      'Review competitive positioning',
      'Assess renovation requirements',
      'Evaluate financing options'
    ],
    operationalRecommendations: [
      'Implement revenue management system',
      'Develop staff training programs',
      'Establish maintenance schedules',
      'Create marketing strategy'
    ],
    marketingRecommendations: [
      'Target business travelers',
      'Develop online presence',
      'Partner with local attractions',
      'Implement loyalty programs'
    ],
    implementationPlan: 'Phase 1: Due diligence and planning (3 months), Phase 2: Financing and acquisition (2 months), Phase 3: Renovation and pre-opening (4 months), Phase 4: Operations and optimization (ongoing)',
    nextSteps: [
      'Perform due diligence',
      'Secure financing',
      'Develop business plan',
      'Begin construction/renovation'
    ],
    timeline: '12-18 months from acquisition to stabilized operations',
    monitoringPlan: 'Monthly financial reporting, quarterly market analysis, annual strategic review',
    keyMetrics: [
      'Occupancy Rate',
      'Average Daily Rate',
      'Revenue per Available Room',
      'Net Operating Income',
      'Cash Flow'
    ],
    reviewSchedule: 'Monthly operations review, quarterly financial review, annual strategic planning',
    riskManagement: 'Diversified revenue streams, conservative financing, market monitoring, contingency planning',
    mitigationStrategies: [
      'Revenue diversification',
      'Cost control measures',
      'Market monitoring',
      'Insurance coverage'
    ],
    contingencyPlans: [
      'Economic downturn response',
      'Competition response',
      'Maintenance emergencies',
      'Staffing shortages'
    ],
    performanceBenchmarks: [
      {
        metric: 'Occupancy Rate',
        target: 75,
        benchmark: 70,
        industry: 'Hospitality'
      },
      {
        metric: 'ADR',
        target: optimizedADR,
        benchmark: inputs.averageDailyRate,
        industry: 'Hospitality'
      }
    ],
    decisionRecommendation: getRecommendation(feasibilityRating),
    presentationPoints: [
      'Strong financial performance',
      'Market opportunity',
      'Operational feasibility',
      'Risk mitigation strategies'
    ],
    decisionFactors: [
      'Return on investment',
      'Market conditions',
      'Operational requirements',
      'Risk assessment'
    ]
  };

  return {
    netOperatingIncome: Math.round(noi),
    cashFlow: Math.round(cashFlow),
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    internalRateOfReturn: Math.round(irr * 100) / 100,
    averageDailyRate: Math.round(optimizedADR * 100) / 100,
    occupancyRate: Math.round(projectedOccupancy * 10) / 10,
    revenuePerAvailableRoom: Math.round(revpar * 100) / 100,
    feasibilityRating,
    analysis,
    netPresentValue: Math.round(calculateNPV(inputs, noi, annualDebtService)),
    paybackPeriod: Math.round(calculatePaybackPeriod(inputs, noi, annualDebtService)),
    revenuePerOccupiedRoom: Math.round(optimizedADR * inputs.averageLengthOfStay * 100) / 100,
    totalRevenuePerRoom: Math.round((optimizedADR * inputs.averageLengthOfStay + 50) * 100) / 100, // Including ancillaries
    availableRoomNights: inputs.numberOfRooms * inputs.operatingDaysPerYear,
    occupiedRoomNights: Math.round(inputs.numberOfRooms * inputs.operatingDaysPerYear * projectedOccupancy / 100),
    averageLengthOfStay: inputs.averageLengthOfStay,
    grossOperatingProfit: Math.round(noi),
    grossOperatingProfitMargin: Math.round((noi / inputs.totalRevenue) * 10000) / 100,
    netProfitMargin: Math.round((cashFlow / inputs.totalRevenue) * 10000) / 100,
    ebitda: Math.round(noi + inputs.propertyTaxes), // Simplified
    ebitdaMargin: Math.round(((noi + inputs.propertyTaxes) / inputs.totalRevenue) * 10000) / 100,
    revenuePerEmployee: Math.round(inputs.totalRevenue / (inputs.fullTimeEmployees + inputs.partTimeEmployees)),
    costPerAvailableRoom: Math.round(inputs.totalOperatingExpenses / inputs.numberOfRooms),
    costPerOccupiedRoom: Math.round(inputs.totalOperatingExpenses / (inputs.numberOfRooms * projectedOccupancy / 100)),
    laborCostPercentage: Math.round((inputs.laborCosts / inputs.totalRevenue) * 10000) / 100,
    marketShare: 15, // Placeholder
    competitivePosition: 7, // Placeholder
    marketPenetration: Math.round(projectedOccupancy),
    pricePositioning: Math.round((optimizedADR / inputs.averageDailyRate) * 100),
    sensitivityMatrix: [],
    scenarios: [],
    projections: []
  };
}

function calculateAnnualDebtService(inputs: HotelFeasibilityADRInputs): number {
  if (inputs.loanAmount <= 0) return 0;

  const monthlyRate = inputs.interestRate / 100 / 12;
  const numberOfPayments = inputs.loanTerm * 12;

  const monthlyPayment = inputs.loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return monthlyPayment * 12;
}

function calculateIRR(inputs: HotelFeasibilityADRInputs, noi: number, debtService: number): number {
  // Simplified IRR calculation
  const initialInvestment = inputs.totalInvestment;
  const annualCashFlow = noi - debtService;
  const years = inputs.analysisPeriod;

  if (annualCashFlow <= 0) return 0;

  // Simple payback period method approximation
  const paybackPeriod = initialInvestment / annualCashFlow;
  if (paybackPeriod >= years) return 0;

  // Rough IRR estimate
  return (annualCashFlow / initialInvestment) * 100 / paybackPeriod;
}

function calculateOptimizedADR(inputs: HotelFeasibilityADRInputs): number {
  let baseADR = inputs.averageDailyRate;

  // Adjust for market conditions
  if (inputs.marketDemand === 'high') baseADR *= 1.1;
  else if (inputs.marketDemand === 'low') baseADR *= 0.9;

  // Adjust for hotel class
  const classMultipliers = {
    budget: 0.7,
    economy: 0.8,
    midscale: 1.0,
    upscale: 1.3,
    luxury: 1.6,
    boutique: 1.2
  };

  baseADR *= classMultipliers[inputs.hotelClass] || 1.0;

  // Adjust for market type
  const marketMultipliers = {
    urban: 1.1,
    suburban: 0.9,
    airport: 1.0,
    resort: 1.2,
    business: 1.1,
    leisure: 1.0
  };

  baseADR *= marketMultipliers[inputs.marketType] || 1.0;

  return baseADR;
}

function calculateProjectedOccupancy(inputs: HotelFeasibilityADRInputs): number {
  let baseOccupancy = inputs.occupancyRate;

  // Adjust for market demand
  if (inputs.marketDemand === 'high') baseOccupancy += 10;
  else if (inputs.marketDemand === 'low') baseOccupancy -= 10;

  // Adjust for market supply
  if (inputs.marketSupply === 'high') baseOccupancy -= 5;
  else if (inputs.marketSupply === 'low') baseOccupancy += 5;

  // Adjust for seasonality
  baseOccupancy *= inputs.seasonalityFactor;

  // Ensure within realistic bounds
  return Math.max(30, Math.min(95, baseOccupancy));
}

function determineFeasibilityRating(cashOnCash: number, irr: number, occupancy: number): string {
  let score = 0;

  if (cashOnCash >= 8) score += 3;
  else if (cashOnCash >= 6) score += 2;
  else if (cashOnCash >= 4) score += 1;

  if (irr >= 15) score += 3;
  else if (irr >= 12) score += 2;
  else if (irr >= 10) score += 1;

  if (occupancy >= 75) score += 2;
  else if (occupancy >= 65) score += 1;

  if (score >= 7) return 'Excellent';
  if (score >= 5) return 'Good';
  if (score >= 3) return 'Fair';
  return 'Poor';
}

function calculateRiskRating(inputs: HotelFeasibilityADRInputs): string {
  let riskScore = 0;

  if (inputs.marketRisk === 'high') riskScore += 2;
  else if (inputs.marketRisk === 'medium') riskScore += 1;

  if (inputs.operationalRisk === 'high') riskScore += 2;
  else if (inputs.operationalRisk === 'medium') riskScore += 1;

  if (inputs.financialRisk === 'high') riskScore += 2;
  else if (inputs.financialRisk === 'medium') riskScore += 1;

  if (inputs.regulatoryRisk === 'high') riskScore += 2;
  else if (inputs.regulatoryRisk === 'medium') riskScore += 1;

  if (riskScore <= 2) return 'Low';
  if (riskScore <= 4) return 'Medium';
  return 'High';
}

function getRecommendation(rating: string): string {
  switch (rating) {
    case 'Excellent': return 'Strong investment opportunity with high returns';
    case 'Good': return 'Solid investment with acceptable risk-adjusted returns';
    case 'Fair': return 'Proceed with caution and additional due diligence';
    case 'Poor': return 'High risk investment, consider alternative opportunities';
    default: return 'Requires further analysis';
  }
}

function calculateNPV(inputs: HotelFeasibilityADRInputs, noi: number, debtService: number): number {
  const discountRate = inputs.discountRate / 100;
  const cashFlow = noi - debtService;
  let npv = -inputs.totalInvestment;

  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    const discountedCashFlow = cashFlow / Math.pow(1 + discountRate, year);
    npv += discountedCashFlow;
  }

  return npv;
}

function calculatePaybackPeriod(inputs: HotelFeasibilityADRInputs, noi: number, debtService: number): number {
  const annualCashFlow = noi - debtService;
  if (annualCashFlow <= 0) return inputs.analysisPeriod; // Never pays back

  return inputs.totalInvestment / annualCashFlow;
}