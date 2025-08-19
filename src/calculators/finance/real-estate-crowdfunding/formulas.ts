export interface RealEstateCrowdfundingInputs {
  investmentAmount: number;
  projectType: 'equity' | 'debt' | 'preferred_equity' | 'mezzanine' | 'reit';
  investmentTerm: number;
  expectedAnnualReturn: number;
  propertyValue: number;
  propertyType: 'residential' | 'commercial' | 'industrial' | 'retail' | 'office' | 'mixed_use' | 'land';
  location: 'primary_market' | 'secondary_market' | 'tertiary_market' | 'international';
  platformFees?: number;
  managementFees?: number;
  cashFlowFrequency: 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'exit_only';
  exitStrategy: 'sale' | 'refinance' | 'ipo' | 'merger' | 'hold';
  marketAppreciation?: number;
  riskLevel: 'low' | 'medium_low' | 'medium' | 'medium_high' | 'high';
  liquidity: 'high' | 'medium' | 'low' | 'illiquid';
  taxTreatment?: 'ordinary_income' | 'capital_gains' | 'qualified_dividend' | 'tax_deferred' | 'tax_free';
  inflationRate?: number;
  calculationType: 'basic' | 'detailed' | 'risk_adjusted' | 'comparison';
}

export interface RealEstateCrowdfundingOutputs {
  totalReturn: number;
  totalReturnPercentage: number;
  annualizedReturn: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  cashOnCashReturn: number;
  totalCashFlow: number;
  monthlyCashFlow: number;
  exitValue: number;
  riskAdjustedReturn: number;
  paybackPeriod: number;
  investmentAnalysis: string;
}

// Risk-free rate (approximation of 10-year Treasury yield)
const RISK_FREE_RATE = 0.04;

// Risk multipliers based on risk level
const RISK_MULTIPLIERS: Record<string, number> = {
  low: 0.8,
  medium_low: 0.9,
  medium: 1.0,
  medium_high: 1.2,
  high: 1.5
};

// Liquidity adjustments
const LIQUIDITY_ADJUSTMENTS: Record<string, number> = {
  high: 1.0,
  medium: 0.95,
  low: 0.9,
  illiquid: 0.8
};

// Location risk factors
const LOCATION_RISK_FACTORS: Record<string, number> = {
  primary_market: 1.0,
  secondary_market: 1.1,
  tertiary_market: 1.3,
  international: 1.5
};

// Property type risk factors
const PROPERTY_TYPE_RISK_FACTORS: Record<string, number> = {
  residential: 1.0,
  commercial: 1.1,
  industrial: 1.2,
  retail: 1.3,
  office: 1.2,
  mixed_use: 1.1,
  land: 1.5
};

/**
 * Calculate real estate crowdfunding investment returns and analysis
 */
export function calculateRealEstateCrowdfunding(inputs: RealEstateCrowdfundingInputs): RealEstateCrowdfundingOutputs {
  const {
    investmentAmount,
    projectType,
    investmentTerm,
    expectedAnnualReturn,
    propertyValue,
    propertyType,
    location,
    platformFees = 0,
    managementFees = 0,
    cashFlowFrequency,
    exitStrategy,
    marketAppreciation = 0,
    riskLevel,
    liquidity,
    taxTreatment = 'ordinary_income',
    inflationRate = 2.5,
    calculationType
  } = inputs;

  // Calculate net investment amount after platform fees
  const netInvestmentAmount = investmentAmount * (1 - platformFees / 100);

  // Calculate annual cash flow based on frequency
  const annualCashFlow = calculateAnnualCashFlow(
    netInvestmentAmount,
    expectedAnnualReturn,
    managementFees,
    cashFlowFrequency
  );

  // Calculate total cash flow over investment term
  const totalCashFlow = annualCashFlow * investmentTerm;

  // Calculate exit value with market appreciation
  const exitValue = calculateExitValue(
    netInvestmentAmount,
    expectedAnnualReturn,
    marketAppreciation,
    investmentTerm,
    exitStrategy
  );

  // Calculate total return
  const totalReturn = totalCashFlow + exitValue - investmentAmount;
  const totalReturnPercentage = (totalReturn / investmentAmount) * 100;

  // Calculate annualized return
  const annualizedReturn = calculateAnnualizedReturn(
    investmentAmount,
    totalCashFlow,
    exitValue,
    investmentTerm
  );

  // Calculate net present value
  const netPresentValue = calculateNetPresentValue(
    investmentAmount,
    annualCashFlow,
    exitValue,
    investmentTerm,
    inflationRate
  );

  // Calculate internal rate of return
  const internalRateOfReturn = calculateInternalRateOfReturn(
    investmentAmount,
    annualCashFlow,
    exitValue,
    investmentTerm
  );

  // Calculate cash-on-cash return
  const cashOnCashReturn = (annualCashFlow / investmentAmount) * 100;

  // Calculate monthly cash flow
  const monthlyCashFlow = annualCashFlow / 12;

  // Calculate risk-adjusted return
  const riskAdjustedReturn = calculateRiskAdjustedReturn(
    annualizedReturn,
    riskLevel,
    location,
    propertyType,
    liquidity
  );

  // Calculate payback period
  const paybackPeriod = calculatePaybackPeriod(investmentAmount, annualCashFlow);

  // Generate investment analysis
  const investmentAnalysis = generateInvestmentAnalysis(
    inputs,
    {
      totalReturn,
      totalReturnPercentage,
      annualizedReturn,
      cashOnCashReturn,
      riskAdjustedReturn,
      paybackPeriod,
      monthlyCashFlow,
      totalCashFlow
    }
  );

  return {
    totalReturn,
    totalReturnPercentage,
    annualizedReturn,
    netPresentValue,
    internalRateOfReturn,
    cashOnCashReturn,
    totalCashFlow,
    monthlyCashFlow,
    exitValue,
    riskAdjustedReturn,
    paybackPeriod,
    investmentAnalysis
  };
}

/**
 * Calculate annual cash flow based on frequency and fees
 */
function calculateAnnualCashFlow(
  investmentAmount: number,
  expectedAnnualReturn: number,
  managementFees: number,
  cashFlowFrequency: string
): number {
  if (cashFlowFrequency === 'exit_only') {
    return 0;
  }

  const grossAnnualReturn = investmentAmount * (expectedAnnualReturn / 100);
  const netAnnualReturn = grossAnnualReturn * (1 - managementFees / 100);

  // Adjust for cash flow frequency
  switch (cashFlowFrequency) {
    case 'monthly':
      return netAnnualReturn;
    case 'quarterly':
      return netAnnualReturn;
    case 'semi_annual':
      return netAnnualReturn;
    case 'annual':
      return netAnnualReturn;
    default:
      return netAnnualReturn;
  }
}

/**
 * Calculate exit value
 */
function calculateExitValue(
  investmentAmount: number,
  expectedAnnualReturn: number,
  marketAppreciation: number,
  investmentTerm: number,
  exitStrategy: string
): number {
  const baseReturn = investmentAmount * (expectedAnnualReturn / 100) * investmentTerm;
  const appreciationReturn = investmentAmount * (marketAppreciation / 100) * investmentTerm;
  
  let exitMultiplier = 1.0;
  
  // Adjust exit value based on strategy
  switch (exitStrategy) {
    case 'sale':
      exitMultiplier = 1.0;
      break;
    case 'refinance':
      exitMultiplier = 0.9;
      break;
    case 'ipo':
      exitMultiplier = 1.2;
      break;
    case 'merger':
      exitMultiplier = 1.1;
      break;
    case 'hold':
      exitMultiplier = 0.8;
      break;
  }

  return (investmentAmount + baseReturn + appreciationReturn) * exitMultiplier;
}

/**
 * Calculate annualized return
 */
function calculateAnnualizedReturn(
  investmentAmount: number,
  totalCashFlow: number,
  exitValue: number,
  investmentTerm: number
): number {
  const totalReturn = totalCashFlow + exitValue - investmentAmount;
  const totalReturnRate = totalReturn / investmentAmount;
  
  return (Math.pow(1 + totalReturnRate, 1 / investmentTerm) - 1) * 100;
}

/**
 * Calculate net present value
 */
function calculateNetPresentValue(
  investmentAmount: number,
  annualCashFlow: number,
  exitValue: number,
  investmentTerm: number,
  inflationRate: number
): number {
  const discountRate = inflationRate / 100;
  let npv = -investmentAmount;

  // Add discounted cash flows
  for (let year = 1; year <= investmentTerm; year++) {
    npv += annualCashFlow / Math.pow(1 + discountRate, year);
  }

  // Add discounted exit value
  npv += exitValue / Math.pow(1 + discountRate, investmentTerm);

  return npv;
}

/**
 * Calculate internal rate of return (simplified)
 */
function calculateInternalRateOfReturn(
  investmentAmount: number,
  annualCashFlow: number,
  exitValue: number,
  investmentTerm: number
): number {
  // Simplified IRR calculation
  const totalReturn = annualCashFlow * investmentTerm + exitValue - investmentAmount;
  const totalReturnRate = totalReturn / investmentAmount;
  
  return (Math.pow(1 + totalReturnRate, 1 / investmentTerm) - 1) * 100;
}

/**
 * Calculate risk-adjusted return using Sharpe ratio concept
 */
function calculateRiskAdjustedReturn(
  annualizedReturn: number,
  riskLevel: string,
  location: string,
  propertyType: string,
  liquidity: string
): number {
  const riskMultiplier = RISK_MULTIPLIERS[riskLevel];
  const locationRisk = LOCATION_RISK_FACTORS[location];
  const propertyRisk = PROPERTY_TYPE_RISK_FACTORS[propertyType];
  const liquidityAdjustment = LIQUIDITY_ADJUSTMENTS[liquidity];

  const totalRiskFactor = riskMultiplier * locationRisk * propertyRisk * liquidityAdjustment;
  const riskAdjustedReturn = (annualizedReturn - RISK_FREE_RATE) / totalRiskFactor + RISK_FREE_RATE;

  return Math.max(0, riskAdjustedReturn);
}

/**
 * Calculate payback period
 */
function calculatePaybackPeriod(investmentAmount: number, annualCashFlow: number): number {
  if (annualCashFlow <= 0) {
    return investmentAmount > 0 ? Infinity : 0;
  }
  
  return investmentAmount / annualCashFlow;
}

/**
 * Generate comprehensive investment analysis
 */
function generateInvestmentAnalysis(
  inputs: RealEstateCrowdfundingInputs,
  outputs: {
    totalReturnPercentage: number;
    annualizedReturn: number;
    cashOnCashReturn: number;
    riskAdjustedReturn: number;
    paybackPeriod: number;
    monthlyCashFlow: number;
    totalCashFlow: number;
  }
): string {
  const {
    projectType,
    propertyType,
    location,
    riskLevel,
    liquidity,
    investmentTerm,
    cashFlowFrequency
  } = inputs;

  const {
    totalReturnPercentage,
    annualizedReturn,
    cashOnCashReturn,
    riskAdjustedReturn,
    paybackPeriod,
    monthlyCashFlow,
    totalCashFlow
  } = outputs;

  let analysis = `**Investment Analysis:**\n`;

  // Return analysis
  if (totalReturnPercentage > 100) {
    analysis += `- Exceptional total return of ${totalReturnPercentage.toFixed(1)}%\n`;
  } else if (totalReturnPercentage > 50) {
    analysis += `- Strong total return of ${totalReturnPercentage.toFixed(1)}%\n`;
  } else if (totalReturnPercentage > 20) {
    analysis += `- Good total return of ${totalReturnPercentage.toFixed(1)}%\n`;
  } else {
    analysis += `- Moderate total return of ${totalReturnPercentage.toFixed(1)}%\n`;
  }

  // Cash flow analysis
  if (cashFlowFrequency === 'exit_only') {
    analysis += `- No cash flow during holding period\n`;
  } else {
    if (monthlyCashFlow > 1000) {
      analysis += `- Strong monthly cash flow of $${monthlyCashFlow.toFixed(0)}\n`;
    } else if (monthlyCashFlow > 500) {
      analysis += `- Good monthly cash flow of $${monthlyCashFlow.toFixed(0)}\n`;
    } else {
      analysis += `- Moderate monthly cash flow of $${monthlyCashFlow.toFixed(0)}\n`;
    }
  }

  // Risk analysis
  if (riskAdjustedReturn > 10) {
    analysis += `- Excellent risk-adjusted return of ${riskAdjustedReturn.toFixed(1)}%\n`;
  } else if (riskAdjustedReturn > 7) {
    analysis += `- Good risk-adjusted return of ${riskAdjustedReturn.toFixed(1)}%\n`;
  } else if (riskAdjustedReturn > 5) {
    analysis += `- Fair risk-adjusted return of ${riskAdjustedReturn.toFixed(1)}%\n`;
  } else {
    analysis += `- Low risk-adjusted return of ${riskAdjustedReturn.toFixed(1)}%\n`;
  }

  // Location analysis
  if (location === 'primary_market') {
    analysis += `- Primary market location reduces risk\n`;
  } else if (location === 'secondary_market') {
    analysis += `- Secondary market with moderate risk\n`;
  } else {
    analysis += `- Higher risk location (${location.replace('_', ' ')})\n`;
  }

  // Liquidity analysis
  if (liquidity === 'high') {
    analysis += `- High liquidity provides flexibility\n`;
  } else if (liquidity === 'medium') {
    analysis += `- Moderate liquidity\n`;
  } else {
    analysis += `- Low liquidity - long-term commitment required\n`;
  }

  // Term analysis
  if (investmentTerm <= 3) {
    analysis += `- Short-term investment (${investmentTerm} years)\n`;
  } else if (investmentTerm <= 7) {
    analysis += `- Medium-term investment (${investmentTerm} years)\n`;
  } else {
    analysis += `- Long-term investment (${investmentTerm} years)\n`;
  }

  // Payback period analysis
  if (paybackPeriod < investmentTerm) {
    analysis += `- Investment recovers in ${paybackPeriod.toFixed(1)} years\n`;
  } else {
    analysis += `- Payback period exceeds investment term\n`;
  }

  return analysis;
}

/**
 * Calculate years between two dates
 */
export function calculateYearsBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
}

/**
 * Calculate months between two dates
 */
export function calculateMonthsBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

/**
 * Generate analysis of real estate crowdfunding calculation
 */
export function generateAnalysis(
  inputs: RealEstateCrowdfundingInputs,
  outputs: RealEstateCrowdfundingOutputs
): string {
  const {
    investmentAmount,
    projectType,
    investmentTerm,
    expectedAnnualReturn,
    propertyType,
    location,
    riskLevel,
    liquidity
  } = inputs;

  const {
    totalReturn,
    totalReturnPercentage,
    annualizedReturn,
    cashOnCashReturn,
    riskAdjustedReturn,
    paybackPeriod
  } = outputs;

  let analysis = `## Real Estate Crowdfunding Analysis\n\n`;
  
  analysis += `**Investment Amount:** $${investmentAmount.toLocaleString()}\n`;
  analysis += `**Project Type:** ${projectType.replace('_', ' ')}\n`;
  analysis += `**Investment Term:** ${investmentTerm} years\n`;
  analysis += `**Expected Annual Return:** ${expectedAnnualReturn}%\n`;
  analysis += `**Property Type:** ${propertyType.replace('_', ' ')}\n`;
  analysis += `**Location:** ${location.replace('_', ' ')}\n`;
  analysis += `**Risk Level:** ${riskLevel.replace('_', ' ')}\n`;
  analysis += `**Liquidity:** ${liquidity.replace('_', ' ')}\n\n`;

  analysis += `**Total Return:** $${totalReturn.toLocaleString()}\n`;
  analysis += `**Total Return %:** ${totalReturnPercentage.toFixed(1)}%\n`;
  analysis += `**Annualized Return:** ${annualizedReturn.toFixed(1)}%\n`;
  analysis += `**Cash-on-Cash Return:** ${cashOnCashReturn.toFixed(1)}%\n`;
  analysis += `**Risk-Adjusted Return:** ${riskAdjustedReturn.toFixed(1)}%\n`;
  analysis += `**Payback Period:** ${paybackPeriod.toFixed(1)} years\n\n`;

  analysis += `## Recommendations\n\n`;
  
  if (riskAdjustedReturn > 8) {
    analysis += `- Strong risk-adjusted returns recommend this investment\n`;
  } else if (riskAdjustedReturn > 5) {
    analysis += `- Moderate risk-adjusted returns - consider portfolio allocation\n`;
  } else {
    analysis += `- Low risk-adjusted returns - consider alternatives\n`;
  }
  
  if (cashOnCashReturn > 8) {
    analysis += `- Good cash flow generation for income investors\n`;
  }
  
  if (liquidity === 'low' || liquidity === 'illiquid') {
    analysis += `- Limited liquidity - ensure long-term investment horizon\n`;
  }

  return analysis;
}