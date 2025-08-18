import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Market factor constants
const MARKET_TYPE_FACTORS = {
  hot: 1.2,
  stable: 1.0,
  declining: 0.8,
  emerging: 1.1
};

const LOCATION_FACTORS = {
  urban: 1.3,
  suburban: 1.0,
  rural: 0.7,
  coastal: 1.2,
  mountain: 0.9
};

const PROPERTY_TYPE_FACTORS = {
  residential: 1.0,
  commercial: 1.2,
  industrial: 0.9,
  'mixed-use': 1.1,
  agricultural: 0.6
};

const LEASE_TYPE_FACTORS = {
  net: 1.0,
  gross: 0.95,
  'triple-net': 1.1,
  percentage: 1.05
};

const TENANT_CREDIT_FACTORS = {
  AAA: 1.2,
  AA: 1.15,
  A: 1.1,
  BBB: 1.0,
  BB: 0.9,
  B: 0.8,
  CCC: 0.7,
  unknown: 0.85
};

const PAYMENT_FREQUENCY_FACTORS = {
  monthly: 1.0,
  quarterly: 0.98,
  'semi-annually': 0.95,
  annually: 0.9
};

const MARKET_LIQUIDITY_FACTORS = {
  high: 1.2,
  medium: 1.0,
  low: 0.8
};

function calculatePresentValue(annualRent: number, rentEscalation: number, discountRate: number, leaseTerm: number): number {
  let presentValue = 0;
  for (let year = 1; year <= leaseTerm; year++) {
    const futureRent = annualRent * Math.pow(1 + rentEscalation / 100, year - 1);
    const discountedRent = futureRent / Math.pow(1 + discountRate / 100, year);
    presentValue += discountedRent;
  }
  return presentValue;
}

function calculateIRR(cashFlows: number[]): number {
  // Simplified IRR calculation using Newton-Raphson method
  let guess = 0.1; // 10% initial guess
  const tolerance = 0.0001;
  const maxIterations = 100;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let derivative = 0;

    for (let j = 0; j < cashFlows.length; j++) {
      const factor = Math.pow(1 + guess, j);
      npv += cashFlows[j] / factor;
      if (j > 0) {
        derivative -= j * cashFlows[j] / (factor * (1 + guess));
      }
    }

    const newGuess = guess - npv / derivative;
    if (Math.abs(newGuess - guess) < tolerance) {
      return newGuess * 100; // Convert to percentage
    }
    guess = newGuess;
  }

  return guess * 100;
}

function calculateRiskScore(inputs: CalculatorInputs): number {
  let riskScore = 5; // Base risk score

  // Market type adjustment
  if (inputs.marketType) {
    const marketFactor = MARKET_TYPE_FACTORS[inputs.marketType as keyof typeof MARKET_TYPE_FACTORS] || 1.0;
    riskScore *= (2 - marketFactor); // Inverse relationship
  }

  // Location adjustment
  if (inputs.location) {
    const locationFactor = LOCATION_FACTORS[inputs.location as keyof typeof LOCATION_FACTORS] || 1.0;
    riskScore *= (2 - locationFactor);
  }

  // Tenant credit adjustment
  if (inputs.tenantCredit && inputs.tenantCredit !== 'unknown') {
    const creditFactor = TENANT_CREDIT_FACTORS[inputs.tenantCredit as keyof typeof TENANT_CREDIT_FACTORS] || 1.0;
    riskScore *= (2 - creditFactor);
  }

  // Property type adjustment
  if (inputs.propertyType) {
    const propertyFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
    riskScore *= (2 - propertyFactor);
  }

  // Lease term adjustment (longer terms = lower risk)
  if (inputs.leaseTerm) {
    const termFactor = Math.min(inputs.leaseTerm / 50, 1.5);
    riskScore /= termFactor;
  }

  // Cap rate adjustment
  const capRate = (inputs.annualRent || 0) / (inputs.landValue || 1);
  if (capRate > 0.08) riskScore *= 0.9; // Higher cap rate = lower risk
  if (capRate < 0.04) riskScore *= 1.2; // Lower cap rate = higher risk

  return Math.max(1, Math.min(10, riskScore));
}

function calculateLiquidityScore(inputs: CalculatorInputs): number {
  let liquidityScore = 5; // Base liquidity score

  // Market liquidity factor
  if (inputs.marketLiquidity) {
    const liquidityFactor = MARKET_LIQUIDITY_FACTORS[inputs.marketLiquidity as keyof typeof MARKET_LIQUIDITY_FACTORS] || 1.0;
    liquidityScore *= liquidityFactor;
  }

  // Property type factor
  if (inputs.propertyType) {
    const propertyFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
    liquidityScore *= propertyFactor;
  }

  // Location factor
  if (inputs.location) {
    const locationFactor = LOCATION_FACTORS[inputs.location as keyof typeof LOCATION_FACTORS] || 1.0;
    liquidityScore *= locationFactor;
  }

  // Lease term factor (shorter terms = higher liquidity)
  if (inputs.leaseTerm) {
    const termFactor = Math.max(0.5, 1 - (inputs.leaseTerm - 30) / 100);
    liquidityScore *= termFactor;
  }

  return Math.max(1, Math.min(10, liquidityScore));
}

function calculateInflationHedgeScore(inputs: CalculatorInputs): number {
  const rentEscalation = inputs.rentEscalation || 0;
  const inflationRate = inputs.inflationRate || 2.0;
  const hedgeScore = Math.max(1, Math.min(10, (rentEscalation - inflationRate) / 2 + 5));
  return hedgeScore;
}

function calculateDiversificationScore(inputs: CalculatorInputs): number {
  let diversificationScore = 5; // Base score

  // Property type diversification
  if (inputs.propertyType) {
    const propertyTypes = ['residential', 'commercial', 'industrial', 'mixed-use', 'agricultural'];
    const typeIndex = propertyTypes.indexOf(inputs.propertyType);
    diversificationScore += (typeIndex + 1) * 0.5;
  }

  // Location diversification
  if (inputs.location) {
    const locations = ['urban', 'suburban', 'rural', 'coastal', 'mountain'];
    const locationIndex = locations.indexOf(inputs.location);
    diversificationScore += (locationIndex + 1) * 0.3;
  }

  return Math.max(1, Math.min(10, diversificationScore));
}

function generateGroundLeaseAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  let analysis = `# Ground Lease Valuation Analysis\n\n`;

  // Executive Summary
  analysis += `## Executive Summary\n`;
  analysis += `**Present Value:** $${outputs.presentValue?.toLocaleString()}\n`;
  analysis += `**Net Present Value:** $${outputs.netPresentValue?.toLocaleString()}\n`;
  analysis += `**Internal Rate of Return:** ${outputs.internalRateOfReturn?.toFixed(2)}%\n`;
  analysis += `**Cash-on-Cash Return:** ${outputs.cashOnCashReturn?.toFixed(2)}%\n`;
  analysis += `**Investment Grade:** ${outputs.investmentGrade}\n\n`;

  // Investment Analysis
  analysis += `## Investment Analysis\n`;
  analysis += `**Land Value:** $${inputs.landValue?.toLocaleString()}\n`;
  analysis += `**Lease Term:** ${inputs.leaseTerm} years\n`;
  analysis += `**Annual Rent:** $${inputs.annualRent?.toLocaleString()}\n`;
  analysis += `**Rent Escalation:** ${inputs.rentEscalation}% annually\n`;
  analysis += `**Discount Rate:** ${inputs.discountRate}%\n`;
  analysis += `**Land Appreciation:** ${inputs.landAppreciation}% annually\n\n`;

  // Cash Flow Analysis
  analysis += `## Cash Flow Analysis\n`;
  analysis += `**Monthly Cash Flow:** $${outputs.monthlyCashFlow?.toLocaleString()}\n`;
  analysis += `**Yearly Cash Flow:** $${outputs.yearlyCashFlow?.toLocaleString()}\n`;
  analysis += `**Cash Flow Growth:** ${outputs.cashFlowGrowth?.toFixed(2)}% annually\n`;
  analysis += `**Total Income:** $${outputs.totalIncome?.toLocaleString()}\n`;
  analysis += `**Total Expenses:** $${outputs.totalExpenses?.toLocaleString()}\n`;
  analysis += `**Net Income:** $${outputs.netIncome?.toLocaleString()}\n\n`;

  // Return Analysis
  analysis += `## Return Analysis\n`;
  analysis += `**Cap Rate:** ${outputs.capRate?.toFixed(2)}%\n`;
  analysis += `**Total Return:** ${outputs.totalReturn?.toFixed(2)}%\n`;
  analysis += `**Annualized Return:** ${outputs.annualizedReturn?.toFixed(2)}%\n`;
  analysis += `**Risk-Adjusted Return:** ${outputs.riskAdjustedReturn?.toFixed(2)}%\n`;
  analysis += `**Profitability Index:** ${outputs.profitabilityIndex?.toFixed(2)}\n\n`;

  // Risk Assessment
  analysis += `## Risk Assessment\n`;
  analysis += `**Risk Score:** ${outputs.riskAdjustedReturn ? (outputs.riskAdjustedReturn / outputs.totalReturn! * 10).toFixed(1) : 'N/A'}/10\n`;
  analysis += `**Sensitivity Score:** ${outputs.sensitivityScore?.toFixed(1)}/10\n`;
  analysis += `**Liquidity Score:** ${outputs.liquidityScore?.toFixed(1)}/10\n`;
  analysis += `**Inflation Hedge Score:** ${outputs.inflationHedge?.toFixed(1)}/10\n`;
  analysis += `**Diversification Score:** ${outputs.diversificationScore?.toFixed(1)}/10\n\n`;

  // Market Analysis
  analysis += `## Market Analysis\n`;
  analysis += `**Property Type:** ${inputs.propertyType}\n`;
  analysis += `**Location:** ${inputs.location}\n`;
  analysis += `**Market Type:** ${inputs.marketType}\n`;
  analysis += `**Lease Type:** ${inputs.leaseType}\n`;
  analysis += `**Tenant Credit:** ${inputs.tenantCredit || 'Not specified'}\n`;
  analysis += `**Market Value:** $${outputs.marketValue?.toLocaleString()}\n\n`;

  // Break-Even Analysis
  analysis += `## Break-Even Analysis\n`;
  analysis += `**Break-Even Years:** ${outputs.breakEvenYears?.toFixed(1)} years\n`;
  analysis += `**Payback Period:** ${outputs.paybackPeriod?.toFixed(1)} years\n`;
  analysis += `**Reversionary Value:** $${outputs.reversionaryValue?.toLocaleString()}\n\n`;

  // Tax and Benefits Analysis
  analysis += `## Tax and Benefits Analysis\n`;
  analysis += `**Tax Benefits:** $${outputs.taxBenefits?.toLocaleString()}/year\n`;
  analysis += `**Equity Build-Up:** $${outputs.equityBuildUp?.toLocaleString()}\n`;
  analysis += `**Tax Rate:** ${inputs.taxRate || 0}%\n\n`;

  // Recommendations
  analysis += `## Recommendations\n`;
  analysis += `**Recommended Action:** ${outputs.recommendedAction}\n\n`;

  if (outputs.netPresentValue && outputs.netPresentValue > 0) {
    analysis += `✅ **POSITIVE NPV:** This ground lease investment shows positive net present value, indicating it may be a good investment opportunity.\n\n`;
  } else {
    analysis += `⚠️ **NEGATIVE NPV:** This ground lease investment shows negative net present value, indicating it may not meet your required return threshold.\n\n`;
  }

  if (outputs.internalRateOfReturn && outputs.internalRateOfReturn > (inputs.discountRate || 0)) {
    analysis += `✅ **IRR EXCEEDS DISCOUNT RATE:** The internal rate of return exceeds your required rate of return.\n\n`;
  } else {
    analysis += `⚠️ **IRR BELOW DISCOUNT RATE:** The internal rate of return is below your required rate of return.\n\n`;
  }

  if (outputs.cashOnCashReturn && outputs.cashOnCashReturn > 6) {
    analysis += `✅ **STRONG CASH FLOW:** The cash-on-cash return indicates strong annual cash flow generation.\n\n`;
  } else {
    analysis += `⚠️ **MODEST CASH FLOW:** The cash-on-cash return indicates modest annual cash flow generation.\n\n`;
  }

  return analysis;
}

export function calculateGroundLeaseValuation(inputs: CalculatorInputs): CalculatorOutputs {
  const landValue = inputs.landValue || 0;
  const leaseTerm = inputs.leaseTerm || 0;
  const annualRent = inputs.annualRent || 0;
  const rentEscalation = inputs.rentEscalation || 0;
  const discountRate = inputs.discountRate || 0;
  const landAppreciation = inputs.landAppreciation || 0;
  const reversionaryValue = inputs.reversionaryValue || landValue * Math.pow(1 + landAppreciation / 100, leaseTerm);

  // Calculate present value of rent stream
  const presentValue = calculatePresentValue(annualRent, rentEscalation, discountRate, leaseTerm);

  // Calculate net present value
  const netPresentValue = presentValue - landValue;

  // Calculate basic metrics
  const capRate = (annualRent / landValue) * 100;
  const totalIncome = presentValue;
  const totalExpenses = (inputs.operatingExpenses || 0) + (inputs.propertyTaxes || 0) + (inputs.insurance || 0) + 
                       (inputs.maintenance || 0) + (inputs.managementFees || 0);
  const netIncome = totalIncome - totalExpenses;
  const yearlyCashFlow = annualRent - totalExpenses;
  const monthlyCashFlow = yearlyCashFlow / 12;

  // Calculate cash-on-cash return
  const cashOnCashReturn = (yearlyCashFlow / landValue) * 100;

  // Calculate total return
  const totalReturn = ((totalIncome + reversionaryValue - landValue) / landValue) * 100;

  // Calculate IRR using cash flow array
  const cashFlows = [-landValue];
  for (let year = 1; year <= leaseTerm; year++) {
    const rent = annualRent * Math.pow(1 + rentEscalation / 100, year - 1);
    const expenses = totalExpenses * Math.pow(1 + (inputs.inflationRate || 2) / 100, year - 1);
    cashFlows.push(rent - expenses);
  }
  cashFlows.push(reversionaryValue);
  const internalRateOfReturn = calculateIRR(cashFlows);

  // Calculate profitability index
  const profitabilityIndex = presentValue / landValue;

  // Calculate break-even and payback
  let cumulativeCashFlow = -landValue;
  let breakEvenYears = 0;
  let paybackPeriod = 0;

  for (let year = 1; year <= leaseTerm; year++) {
    const rent = annualRent * Math.pow(1 + rentEscalation / 100, year - 1);
    const expenses = totalExpenses * Math.pow(1 + (inputs.inflationRate || 2) / 100, year - 1);
    cumulativeCashFlow += (rent - expenses);

    if (breakEvenYears === 0 && cumulativeCashFlow >= 0) {
      breakEvenYears = year;
    }

    if (paybackPeriod === 0 && cumulativeCashFlow >= landValue) {
      paybackPeriod = year;
    }
  }

  // Calculate annualized return
  const annualizedReturn = Math.pow(1 + totalReturn / 100, 1 / leaseTerm) - 1;

  // Calculate risk-adjusted return
  const riskScore = calculateRiskScore(inputs);
  const riskAdjustedReturn = totalReturn / riskScore;

  // Calculate sensitivity score
  const sensitivityScore = Math.max(1, Math.min(10, 10 - Math.abs(discountRate - internalRateOfReturn) / 2));

  // Calculate market value
  const marketValue = presentValue * (MARKET_TYPE_FACTORS[inputs.marketType as keyof typeof MARKET_TYPE_FACTORS] || 1.0) *
                     (LOCATION_FACTORS[inputs.location as keyof typeof LOCATION_FACTORS] || 1.0) *
                     (PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0);

  // Determine investment grade
  let investmentGrade = 'C';
  if (internalRateOfReturn > discountRate + 2 && cashOnCashReturn > 8) investmentGrade = 'A';
  else if (internalRateOfReturn > discountRate && cashOnCashReturn > 6) investmentGrade = 'B';
  else if (internalRateOfReturn > discountRate - 2 && cashOnCashReturn > 4) investmentGrade = 'C';
  else investmentGrade = 'D';

  // Determine recommended action
  let recommendedAction = 'Consider alternative investments';
  if (netPresentValue > 0 && internalRateOfReturn > discountRate) {
    if (investmentGrade === 'A') recommendedAction = 'Strong buy recommendation';
    else if (investmentGrade === 'B') recommendedAction = 'Buy recommendation';
    else recommendedAction = 'Consider with caution';
  }

  // Calculate additional metrics
  const cashFlowGrowth = rentEscalation;
  const equityBuildUp = reversionaryValue - landValue;
  const taxBenefits = (yearlyCashFlow * (inputs.taxRate || 0)) / 100;
  const inflationHedge = calculateInflationHedgeScore(inputs);
  const liquidityScore = calculateLiquidityScore(inputs);
  const diversificationScore = calculateDiversificationScore(inputs);

  return {
    presentValue: Math.round(presentValue),
    netPresentValue: Math.round(netPresentValue),
    internalRateOfReturn: Math.round(internalRateOfReturn * 100) / 100,
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    capRate: Math.round(capRate * 100) / 100,
    totalIncome: Math.round(totalIncome),
    totalExpenses: Math.round(totalExpenses),
    netIncome: Math.round(netIncome),
    reversionaryValue: Math.round(reversionaryValue),
    totalReturn: Math.round(totalReturn * 100) / 100,
    breakEvenYears: Math.round(breakEvenYears * 10) / 10,
    paybackPeriod: Math.round(paybackPeriod * 10) / 10,
    profitabilityIndex: Math.round(profitabilityIndex * 100) / 100,
    annualizedReturn: Math.round(annualizedReturn * 10000) / 100,
    riskAdjustedReturn: Math.round(riskAdjustedReturn * 100) / 100,
    sensitivityScore: Math.round(sensitivityScore * 10) / 10,
    marketValue: Math.round(marketValue),
    investmentGrade,
    recommendedAction,
    monthlyCashFlow: Math.round(monthlyCashFlow),
    yearlyCashFlow: Math.round(yearlyCashFlow),
    cashFlowGrowth: Math.round(cashFlowGrowth * 100) / 100,
    equityBuildUp: Math.round(equityBuildUp),
    taxBenefits: Math.round(taxBenefits),
    inflationHedge: Math.round(inflationHedge * 10) / 10,
    liquidityScore: Math.round(liquidityScore * 10) / 10,
    diversificationScore: Math.round(diversificationScore * 10) / 10,
    groundLeaseAnalysis: 'Comprehensive ground lease analysis completed'
  };
}

export { generateGroundLeaseAnalysis };
