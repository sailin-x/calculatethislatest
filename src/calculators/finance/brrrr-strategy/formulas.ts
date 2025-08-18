interface BRRRRMetrics {
  totalInvestment: number;
  monthlyPayment: number;
  monthlyCashFlow: number;
  cashOnCashReturn: number;
  capRate: number;
  totalROI: number;
  breakEvenTime: number;
  riskAssessment: string;
  netOperatingIncome: number;
  annualCashFlow: number;
  purchaseLoanAmount: number;
  purchaseMonthlyPayment: number;
}

interface RefinanceAnalysis {
  refinanceProceeds: number;
  equityExtracted: number;
  refinanceLoanAmount: number;
  refinanceMonthlyPayment: number;
  scalabilityAnalysis: string;
  remainingLoanBalance: number;
  equityPosition: number;
}

interface InvestmentTimeline {
  summary: string;
  phases: Array<{
    phase: string;
    duration: number;
    cost: number;
    description: string;
  }>;
}

/**
 * Calculate BRRRR strategy financial metrics
 */
export function calculateBRRRRStrategy(inputs: Record<string, any>): BRRRRMetrics {
  const {
    purchasePrice,
    downPayment,
    purchaseLoanRate,
    purchaseLoanTerm,
    rehabCost,
    afterRepairValue,
    monthlyRent,
    monthlyExpenses,
    refinanceRate,
    refinanceTerm,
    refinanceLTV,
    closingCosts = 0,
    vacancyRate = 5,
    propertyManagement = 8,
    appreciationRate = 3,
    inflationRate = 2.5
  } = inputs;

  // Calculate total investment
  const totalInvestment = downPayment + rehabCost + closingCosts;
  
  // Calculate purchase loan details
  const purchaseLoanAmount = purchasePrice - downPayment;
  const purchaseMonthlyRate = purchaseLoanRate / 100 / 12;
  const purchaseTotalPayments = purchaseLoanTerm * 12;
  const purchaseMonthlyPayment = calculateMonthlyPayment(purchaseLoanAmount, purchaseMonthlyRate, purchaseTotalPayments);
  
  // Calculate refinance loan details
  const refinanceLoanAmount = afterRepairValue * (refinanceLTV / 100);
  const refinanceMonthlyRate = refinanceRate / 100 / 12;
  const refinanceTotalPayments = refinanceTerm * 12;
  const refinanceMonthlyPayment = calculateMonthlyPayment(refinanceLoanAmount, refinanceMonthlyRate, refinanceTotalPayments);
  
  // Calculate net operating income
  const grossRent = monthlyRent * 12;
  const vacancyLoss = grossRent * (vacancyRate / 100);
  const propertyManagementFee = grossRent * (propertyManagement / 100);
  const totalExpenses = (monthlyExpenses * 12) + propertyManagementFee;
  const netOperatingIncome = grossRent - vacancyLoss - totalExpenses;
  
  // Calculate monthly cash flow
  const monthlyCashFlow = (netOperatingIncome / 12) - refinanceMonthlyPayment;
  const annualCashFlow = monthlyCashFlow * 12;
  
  // Calculate returns
  const cashOnCashReturn = (annualCashFlow / totalInvestment) * 100;
  const capRate = (netOperatingIncome / afterRepairValue) * 100;
  
  // Calculate total ROI including appreciation
  const annualAppreciation = afterRepairValue * (appreciationRate / 100);
  const totalROI = ((annualCashFlow + annualAppreciation) / totalInvestment) * 100;
  
  // Calculate break-even time
  const breakEvenTime = totalInvestment / monthlyCashFlow;
  
  // Generate risk assessment
  const riskAssessment = generateRiskAssessment(inputs, {
    totalInvestment,
    monthlyCashFlow,
    cashOnCashReturn,
    capRate,
    purchaseLoanAmount,
    refinanceLoanAmount
  });
  
  return {
    totalInvestment,
    monthlyPayment: refinanceMonthlyPayment,
    monthlyCashFlow,
    cashOnCashReturn,
    capRate,
    totalROI,
    breakEvenTime,
    riskAssessment,
    netOperatingIncome,
    annualCashFlow,
    purchaseLoanAmount,
    purchaseMonthlyPayment
  };
}

/**
 * Calculate monthly payment using standard loan formula
 */
function calculateMonthlyPayment(principal: number, monthlyRate: number, totalPayments: number): number {
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  const rateFactor = Math.pow(1 + monthlyRate, totalPayments);
  return principal * (monthlyRate * rateFactor) / (rateFactor - 1);
}

/**
 * Calculate refinance analysis
 */
export function calculateRefinanceAnalysis(inputs: Record<string, any>, brrrrMetrics: BRRRRMetrics): RefinanceAnalysis {
  const { afterRepairValue, refinanceLTV, rehabTime } = inputs;
  
  // Calculate refinance loan amount
  const refinanceLoanAmount = afterRepairValue * (refinanceLTV / 100);
  
  // Calculate remaining balance on original loan at refinance time
  const remainingLoanBalance = calculateRemainingBalance(
    brrrrMetrics.purchaseLoanAmount,
    inputs.purchaseLoanRate / 100 / 12,
    brrrrMetrics.purchaseMonthlyPayment,
    rehabTime
  );
  
  // Calculate refinance proceeds
  const refinanceProceeds = refinanceLoanAmount - remainingLoanBalance;
  
  // Calculate equity extraction percentage
  const equityExtracted = (refinanceProceeds / brrrrMetrics.totalInvestment) * 100;
  
  // Calculate equity position
  const equityPosition = afterRepairValue - refinanceLoanAmount;
  
  // Calculate refinance monthly payment
  const refinanceMonthlyRate = inputs.refinanceRate / 100 / 12;
  const refinanceTotalPayments = inputs.refinanceTerm * 12;
  const refinanceMonthlyPayment = calculateMonthlyPayment(refinanceLoanAmount, refinanceMonthlyRate, refinanceTotalPayments);
  
  // Generate scalability analysis
  const scalabilityAnalysis = generateScalabilityAnalysis(inputs, {
    refinanceProceeds,
    equityExtracted,
    monthlyCashFlow: brrrrMetrics.monthlyCashFlow,
    totalInvestment: brrrrMetrics.totalInvestment
  });
  
  return {
    refinanceProceeds,
    equityExtracted,
    refinanceLoanAmount,
    refinanceMonthlyPayment,
    scalabilityAnalysis,
    remainingLoanBalance,
    equityPosition
  };
}

/**
 * Calculate remaining balance after specified payments
 */
function calculateRemainingBalance(principal: number, monthlyRate: number, monthlyPayment: number, paymentsMade: number): number {
  if (monthlyRate === 0) {
    return principal - (monthlyPayment * paymentsMade);
  }
  
  const rateFactor = Math.pow(1 + monthlyRate, paymentsMade);
  return principal * rateFactor - monthlyPayment * (rateFactor - 1) / monthlyRate;
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(inputs: Record<string, any>, metrics: any): string {
  const risks: string[] = [];
  let riskLevel = 'Low';
  
  // Cash flow risk
  if (metrics.monthlyCashFlow < 0) {
    riskLevel = 'High';
    risks.push('Negative monthly cash flow');
  } else if (metrics.monthlyCashFlow < 200) {
    riskLevel = 'Medium';
    risks.push('Low monthly cash flow');
  }
  
  // Cash-on-cash return risk
  if (metrics.cashOnCashReturn < 5) {
    risks.push('Low cash-on-cash return');
  } else if (metrics.cashOnCashReturn > 15) {
    risks.push('Very high returns may indicate unrealistic assumptions');
  }
  
  // Cap rate risk
  if (metrics.capRate < 5) {
    risks.push('Low cap rate may indicate overvaluation');
  } else if (metrics.capRate > 12) {
    risks.push('Very high cap rate may indicate high-risk area');
  }
  
  // Rehab risk
  if (inputs.rehabCost > inputs.purchasePrice * 0.3) {
    risks.push('High rehab costs relative to purchase price');
  }
  
  // ARV risk
  const arvRatio = inputs.afterRepairValue / inputs.purchasePrice;
  if (arvRatio < 1.1) {
    risks.push('Low ARV increase may not justify rehab costs');
  } else if (arvRatio > 2.0) {
    risks.push('Very high ARV increase may be unrealistic');
  }
  
  // Market risk
  if (inputs.appreciationRate > 5) {
    risks.push('High appreciation assumptions may not be sustainable');
  }
  
  if (risks.length === 0) {
    risks.push('Standard real estate investment risks apply');
  }
  
  return `${riskLevel} Risk: ${risks.join(', ')}. Consider market conditions, rehab accuracy, and financing terms.`;
}

/**
 * Generate scalability analysis
 */
function generateScalabilityAnalysis(inputs: Record<string, any>, metrics: any): string {
  let analysis = '';
  
  // Equity extraction analysis
  if (metrics.equityExtracted >= 80) {
    analysis += 'Excellent equity extraction allows for rapid portfolio growth. ';
  } else if (metrics.equityExtracted >= 60) {
    analysis += 'Good equity extraction supports portfolio expansion. ';
  } else if (metrics.equityExtracted >= 40) {
    analysis += 'Moderate equity extraction may limit growth pace. ';
  } else {
    analysis += 'Low equity extraction may require additional capital for growth. ';
  }
  
  // Cash flow analysis
  if (metrics.monthlyCashFlow > 500) {
    analysis += 'Strong cash flow provides buffer for portfolio expansion. ';
  } else if (metrics.monthlyCashFlow > 200) {
    analysis += 'Adequate cash flow supports moderate growth. ';
  } else {
    analysis += 'Limited cash flow may constrain portfolio growth. ';
  }
  
  // Repeatability analysis
  const totalInvestment = metrics.totalInvestment;
  if (totalInvestment < 50000) {
    analysis += 'Low investment requirement enables frequent acquisitions. ';
  } else if (totalInvestment < 100000) {
    analysis += 'Moderate investment requirement allows steady growth. ';
  } else {
    analysis += 'High investment requirement may limit acquisition frequency. ';
  }
  
  analysis += 'Consider market conditions and financing availability for repeatability.';
  
  return analysis;
}

/**
 * Generate investment timeline
 */
export function generateInvestmentTimeline(inputs: Record<string, any>, brrrrMetrics: BRRRRMetrics): InvestmentTimeline {
  const phases = [
    {
      phase: 'Purchase',
      duration: 1,
      cost: inputs.downPayment + (inputs.closingCosts * 0.5),
      description: 'Property purchase and initial closing costs'
    },
    {
      phase: 'Rehab',
      duration: inputs.rehabTime,
      cost: inputs.rehabCost,
      description: 'Property rehabilitation and improvements'
    },
    {
      phase: 'Rent',
      duration: 1,
      cost: 0,
      description: 'Property rental and income generation'
    },
    {
      phase: 'Refinance',
      duration: 1,
      cost: inputs.closingCosts * 0.5,
      description: 'Refinance to extract equity'
    }
  ];
  
  const totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);
  const totalCost = phases.reduce((sum, phase) => sum + phase.cost, 0);
  
  const summary = `BRRRR timeline: ${totalDuration} months total. Purchase → ${inputs.rehabTime} months rehab → Rent → Refinance. Total investment: $${totalCost.toLocaleString()}. Expected monthly cash flow: $${brrrrMetrics.monthlyCashFlow.toFixed(2)}.`;
  
  return {
    summary,
    phases
  };
}

/**
 * Calculate portfolio growth potential
 */
export function calculatePortfolioGrowth(
  refinanceProceeds: number,
  targetPropertyCost: number,
  targetDownPayment: number,
  monthsBetweenAcquisitions: number
): {
  propertiesPerYear: number;
  totalProperties: number;
  yearsToTarget: number;
  totalPortfolioValue: number;
} {
  const availableForDownPayment = refinanceProceeds * 0.8; // Assume 80% can be used for down payments
  const propertiesPerYear = Math.floor(availableForDownPayment / targetDownPayment);
  const yearsToTarget = 10; // 10-year projection
  const totalProperties = propertiesPerYear * yearsToTarget;
  const totalPortfolioValue = totalProperties * targetPropertyCost;
  
  return {
    propertiesPerYear,
    totalProperties,
    yearsToTarget,
    totalPortfolioValue
  };
}

/**
 * Calculate sensitivity analysis
 */
export function calculateSensitivityAnalysis(
  inputs: Record<string, any>,
  baseMetrics: BRRRRMetrics
): {
  rentSensitivity: { change: number; cashFlow: number; cocReturn: number }[];
  arvSensitivity: { change: number; equityExtracted: number; refinanceProceeds: number }[];
  rehabSensitivity: { change: number; totalInvestment: number; cocReturn: number }[];
} {
  const rentSensitivity = [];
  const arvSensitivity = [];
  const rehabSensitivity = [];
  
  // Rent sensitivity (-20% to +20%)
  for (let change = -20; change <= 20; change += 5) {
    const adjustedRent = inputs.monthlyRent * (1 + change / 100);
    const adjustedCashFlow = calculateAdjustedCashFlow(inputs, adjustedRent);
    const adjustedCocReturn = (adjustedCashFlow * 12 / baseMetrics.totalInvestment) * 100;
    
    rentSensitivity.push({
      change,
      cashFlow: adjustedCashFlow,
      cocReturn: adjustedCocReturn
    });
  }
  
  // ARV sensitivity (-15% to +15%)
  for (let change = -15; change <= 15; change += 5) {
    const adjustedARV = inputs.afterRepairValue * (1 + change / 100);
    const adjustedRefinanceAmount = adjustedARV * (inputs.refinanceLTV / 100);
    const remainingBalance = calculateRemainingBalance(
      baseMetrics.purchaseLoanAmount,
      inputs.purchaseLoanRate / 100 / 12,
      baseMetrics.purchaseMonthlyPayment,
      inputs.rehabTime
    );
    const adjustedProceeds = adjustedRefinanceAmount - remainingBalance;
    const adjustedEquityExtracted = (adjustedProceeds / baseMetrics.totalInvestment) * 100;
    
    arvSensitivity.push({
      change,
      equityExtracted: adjustedEquityExtracted,
      refinanceProceeds: adjustedProceeds
    });
  }
  
  // Rehab cost sensitivity (-30% to +30%)
  for (let change = -30; change <= 30; change += 10) {
    const adjustedRehabCost = inputs.rehabCost * (1 + change / 100);
    const adjustedTotalInvestment = inputs.downPayment + adjustedRehabCost + inputs.closingCosts;
    const adjustedCocReturn = (baseMetrics.annualCashFlow / adjustedTotalInvestment) * 100;
    
    rehabSensitivity.push({
      change,
      totalInvestment: adjustedTotalInvestment,
      cocReturn: adjustedCocReturn
    });
  }
  
  return {
    rentSensitivity,
    arvSensitivity,
    rehabSensitivity
  };
}

/**
 * Calculate adjusted cash flow for sensitivity analysis
 */
function calculateAdjustedCashFlow(inputs: Record<string, any>, adjustedRent: number): number {
  const grossRent = adjustedRent * 12;
  const vacancyLoss = grossRent * (inputs.vacancyRate / 100);
  const propertyManagementFee = grossRent * (inputs.propertyManagement / 100);
  const totalExpenses = (inputs.monthlyExpenses * 12) + propertyManagementFee;
  const netOperatingIncome = grossRent - vacancyLoss - totalExpenses;
  
  const refinanceLoanAmount = inputs.afterRepairValue * (inputs.refinanceLTV / 100);
  const refinanceMonthlyRate = inputs.refinanceRate / 100 / 12;
  const refinanceTotalPayments = inputs.refinanceTerm * 12;
  const refinanceMonthlyPayment = calculateMonthlyPayment(refinanceLoanAmount, refinanceMonthlyRate, refinanceTotalPayments);
  
  return (netOperatingIncome / 12) - refinanceMonthlyPayment;
}
