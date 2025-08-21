import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export interface RentVsBuyInputs extends CalculatorInputs {
  homePrice?: number;
  downPayment?: number;
  loanTerm?: number;
  interestRate?: number;
  monthlyRent?: number;
  rentIncreaseRate?: number;
  propertyTaxRate?: number;
  homeInsuranceRate?: number;
  maintenanceRate?: number;
  hoaFees?: number;
  closingCosts?: number;
  renterInsurance?: number;
  utilities?: number;
  homeAppreciationRate?: number;
  investmentReturnRate?: number;
  taxDeductionRate?: number;
  analysisPeriod?: number;
  inflationRate?: number;
  opportunityCost?: number;
  movingCosts?: number;
  renovationCosts?: number;
  propertyManagementFees?: number;
  vacancyRate?: number;
  rentalIncome?: number;
  creditScore?: number;
  debtToIncomeRatio?: number;
  emergencyFund?: number;
  jobStability?: string;
  marketConditions?: string;
  locationGrowth?: string;
}

export interface RentVsBuyOutputs extends CalculatorOutputs {
  monthlyMortgagePayment: number;
  monthlyHomeownershipCost: number;
  monthlyRentalCost: number;
  totalHomeownershipCost: number;
  totalRentalCost: number;
  homeEquity: number;
  investmentValue: number;
  netHomeownershipValue: number;
  netRentalValue: number;
  breakEvenYears: number;
  recommendation: string;
  monthlySavings: number;
  totalSavings: number;
  roiComparison: number;
  cashFlowAnalysis: string;
  riskAssessment: string;
  taxBenefits: number;
  opportunityCostAnalysis: string;
  marketTiming: string;
  liquidityComparison: string;
  yearlyComparison: string;
  sensitivityAnalysis: string;
  decisionMatrix: string;
  rentVsBuyAnalysis: string;
}

// Market condition factors
const MARKET_CONDITION_FACTORS = {
  'buyers-market': 0.95,
  'normal': 1.0,
  'sellers-market': 1.05,
  'hot-market': 1.15
};

// Location growth factors
const LOCATION_GROWTH_FACTORS = {
  'declining': 0.8,
  'slow': 0.9,
  'moderate': 1.0,
  'strong': 1.2,
  'explosive': 1.5
};

// Job stability factors
const JOB_STABILITY_FACTORS = {
  'very-stable': 1.1,
  'stable': 1.0,
  'moderate': 0.95,
  'unstable': 0.85,
  'very-unstable': 0.7
};

export function calculateRentVsBuy(inputs: RentVsBuyInputs): RentVsBuyOutputs {
  const {
    homePrice = 400000,
    downPayment = 80000,
    loanTerm = 30,
    interestRate = 6.5,
    monthlyRent = 2500,
    rentIncreaseRate = 3.0,
    propertyTaxRate = 1.2,
    homeInsuranceRate = 0.5,
    maintenanceRate = 1.0,
    hoaFees = 0,
    closingCosts = 12000,
    renterInsurance = 25,
    utilities = 200,
    homeAppreciationRate = 3.0,
    investmentReturnRate = 7.0,
    taxDeductionRate = 22.0,
    analysisPeriod = 10,
    inflationRate = 2.5,
    opportunityCost = 0,
    movingCosts = 3000,
    renovationCosts = 0,
    propertyManagementFees = 0,
    vacancyRate = 0,
    rentalIncome = 0,
    creditScore = 750,
    debtToIncomeRatio = 35,
    emergencyFund = 25000,
    jobStability = 'stable',
    marketConditions = 'normal',
    locationGrowth = 'moderate'
  } = inputs;

  // Calculate loan amount
  const loanAmount = homePrice - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;

  // Calculate monthly mortgage payment using amortization formula
  const monthlyMortgagePayment = loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / 
    (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

  // Calculate monthly homeownership costs
  const monthlyPropertyTax = (homePrice * propertyTaxRate / 100) / 12;
  const monthlyHomeInsurance = (homePrice * homeInsuranceRate / 100) / 12;
  const monthlyMaintenance = (homePrice * maintenanceRate / 100) / 12;
  const monthlyHomeownershipCost = monthlyMortgagePayment + monthlyPropertyTax + 
    monthlyHomeInsurance + monthlyMaintenance + hoaFees;

  // Calculate monthly rental costs
  const monthlyRentalCost = monthlyRent + renterInsurance + utilities;

  // Calculate total costs over analysis period
  let totalHomeownershipCost = 0;
  let totalRentalCost = 0;
  let currentRent = monthlyRent;
  let remainingLoanBalance = loanAmount;

  for (let year = 1; year <= analysisPeriod; year++) {
    // Homeownership costs for this year
    const yearlyHomeownershipCost = monthlyHomeownershipCost * 12;
    totalHomeownershipCost += yearlyHomeownershipCost;

    // Add one-time costs in first year
    if (year === 1) {
      totalHomeownershipCost += closingCosts + renovationCosts + movingCosts;
    }

    // Rental costs for this year (with rent increases)
    const yearlyRentalCost = currentRent * 12 + (renterInsurance + utilities) * 12;
    totalRentalCost += yearlyRentalCost;
    currentRent *= (1 + rentIncreaseRate / 100);

    // Calculate remaining loan balance
    if (year <= loanTerm) {
      const yearlyInterest = remainingLoanBalance * (interestRate / 100);
      const yearlyPrincipal = monthlyMortgagePayment * 12 - yearlyInterest;
      remainingLoanBalance -= yearlyPrincipal;
    }
  }

  // Calculate home equity at end of period
  const futureHomeValue = homePrice * Math.pow(1 + homeAppreciationRate / 100, analysisPeriod);
  const homeEquity = Math.max(0, futureHomeValue - remainingLoanBalance);

  // Calculate investment value if down payment was invested instead
  const investmentValue = downPayment * Math.pow(1 + investmentReturnRate / 100, analysisPeriod);

  // Calculate net values
  const netHomeownershipValue = homeEquity - totalHomeownershipCost;
  const netRentalValue = investmentValue - totalRentalCost;

  // Calculate break-even years
  let breakEvenYears = analysisPeriod;
  if (monthlyRentalCost > monthlyHomeownershipCost) {
    breakEvenYears = (totalHomeownershipCost - totalRentalCost) / 
      ((monthlyRentalCost - monthlyHomeownershipCost) * 12);
  }

  // Determine recommendation
  let recommendation = 'Consider';
  let monthlySavings = 0;
  let totalSavings = 0;

  if (netHomeownershipValue > netRentalValue) {
    recommendation = 'Buy';
    monthlySavings = monthlyRentalCost - monthlyHomeownershipCost;
    totalSavings = netHomeownershipValue - netRentalValue;
  } else if (netRentalValue > netHomeownershipValue) {
    recommendation = 'Rent';
    monthlySavings = monthlyHomeownershipCost - monthlyRentalCost;
    totalSavings = netRentalValue - netHomeownershipValue;
  }

  // Calculate ROI comparison
  const homeownershipROI = ((homeEquity - downPayment) / downPayment) * 100;
  const investmentROI = ((investmentValue - downPayment) / downPayment) * 100;
  const roiComparison = homeownershipROI - investmentROI;

  // Calculate tax benefits
  const annualMortgageInterest = monthlyMortgagePayment * 12 - (loanAmount / loanTerm);
  const taxBenefits = annualMortgageInterest * (taxDeductionRate / 100);

  // Generate analysis reports
  const cashFlowAnalysis = generateCashFlowAnalysis(monthlyHomeownershipCost, monthlyRentalCost, recommendation);
  const riskAssessment = generateRiskAssessment(inputs, recommendation);
  const opportunityCostAnalysis = generateOpportunityCostAnalysis(downPayment, investmentReturnRate, analysisPeriod);
  const marketTiming = generateMarketTiming(marketConditions, locationGrowth, homeAppreciationRate);
  const liquidityComparison = generateLiquidityComparison(homeEquity, investmentValue, emergencyFund);
  const yearlyComparison = generateYearlyComparison(inputs, analysisPeriod);
  const sensitivityAnalysis = generateSensitivityAnalysis(inputs, netHomeownershipValue, netRentalValue);
  const decisionMatrix = generateDecisionMatrix(inputs, netHomeownershipValue, netRentalValue);

  return {
    monthlyMortgagePayment,
    monthlyHomeownershipCost,
    monthlyRentalCost,
    totalHomeownershipCost,
    totalRentalCost,
    homeEquity,
    investmentValue,
    netHomeownershipValue,
    netRentalValue,
    breakEvenYears,
    recommendation,
    monthlySavings,
    totalSavings,
    roiComparison,
    cashFlowAnalysis,
    riskAssessment,
    taxBenefits,
    opportunityCostAnalysis,
    marketTiming,
    liquidityComparison,
    yearlyComparison,
    sensitivityAnalysis,
    decisionMatrix,
    rentVsBuyAnalysis: generateRentVsBuyAnalysis(inputs, {
      monthlyMortgagePayment,
      monthlyHomeownershipCost,
      monthlyRentalCost,
      totalHomeownershipCost,
      totalRentalCost,
      homeEquity,
      investmentValue,
      netHomeownershipValue,
      netRentalValue,
      breakEvenYears,
      recommendation,
      monthlySavings,
      totalSavings,
      roiComparison,
      cashFlowAnalysis,
      riskAssessment,
      taxBenefits,
      opportunityCostAnalysis,
      marketTiming,
      liquidityComparison,
      yearlyComparison,
      sensitivityAnalysis,
      decisionMatrix,
      rentVsBuyAnalysis: ''
    })
  };
}

function generateCashFlowAnalysis(monthlyHomeownershipCost: number, monthlyRentalCost: number, recommendation: string): string {
  const difference = Math.abs(monthlyHomeownershipCost - monthlyRentalCost);
  
  if (monthlyHomeownershipCost < monthlyRentalCost) {
    return `Buying saves $${difference.toFixed(0)}/month in cash flow. This provides immediate monthly savings.`;
  } else if (monthlyRentalCost < monthlyHomeownershipCost) {
    return `Renting saves $${difference.toFixed(0)}/month in cash flow. This provides immediate monthly savings.`;
  } else {
    return 'Monthly cash flows are approximately equal between renting and buying.';
  }
}

function generateRiskAssessment(inputs: RentVsBuyInputs, recommendation: string): string {
  const risks = [];
  
  if (inputs.jobStability && ['unstable', 'very-unstable'].includes(inputs.jobStability)) {
    risks.push('Job instability increases risk of default');
  }
  
  if (inputs.debtToIncomeRatio && inputs.debtToIncomeRatio > 43) {
    risks.push('High debt-to-income ratio may limit mortgage options');
  }
  
  if (inputs.emergencyFund && inputs.emergencyFund < 10000) {
    risks.push('Limited emergency fund increases financial risk');
  }
  
  if (inputs.marketConditions === 'hot-market') {
    risks.push('Hot market conditions may lead to overpaying');
  }
  
  if (inputs.locationGrowth === 'declining') {
    risks.push('Declining location may reduce property value');
  }
  
  return risks.length > 0 ? risks.join('. ') : 'Risk factors are manageable for both options.';
}

function generateOpportunityCostAnalysis(downPayment: number, investmentReturnRate: number, analysisPeriod: number): string {
  const opportunityCost = downPayment * Math.pow(1 + investmentReturnRate / 100, analysisPeriod) - downPayment;
  return `The opportunity cost of using $${downPayment.toLocaleString()} as a down payment instead of investing it is $${opportunityCost.toLocaleString()} over ${analysisPeriod} years (assuming ${investmentReturnRate}% annual return).`;
}

function generateMarketTiming(marketConditions: string, locationGrowth: string, homeAppreciationRate: number): string {
  const marketFactor = MARKET_CONDITION_FACTORS[marketConditions as keyof typeof MARKET_CONDITION_FACTORS] || 1.0;
  const growthFactor = LOCATION_GROWTH_FACTORS[locationGrowth as keyof typeof LOCATION_GROWTH_FACTORS] || 1.0;
  
  if (marketFactor < 1.0 && growthFactor > 1.0) {
    return 'Good timing: Market conditions favor buyers with strong location growth potential.';
  } else if (marketFactor > 1.0 && growthFactor < 1.0) {
    return 'Poor timing: High market prices with limited growth potential.';
  } else {
    return 'Neutral timing: Market conditions and growth potential are balanced.';
  }
}

function generateLiquidityComparison(homeEquity: number, investmentValue: number, emergencyFund: number): string {
  const liquidityDifference = investmentValue - homeEquity;
  
  if (liquidityDifference > 50000) {
    return `Renting provides $${liquidityDifference.toLocaleString()} more liquidity than homeownership.`;
  } else if (liquidityDifference < -50000) {
    return `Homeownership provides $${Math.abs(liquidityDifference).toLocaleString()} more equity than renting.`;
  } else {
    return 'Liquidity differences between options are minimal.';
  }
}

function generateYearlyComparison(inputs: RentVsBuyInputs, analysisPeriod: number): string {
  const yearlyData = [];
  
  for (let year = 1; year <= Math.min(analysisPeriod, 5); year++) {
    const rentCost = inputs.monthlyRent! * 12 * Math.pow(1 + (inputs.rentIncreaseRate || 0) / 100, year - 1);
    const buyCost = (inputs.monthlyRent! * 12) + (inputs.propertyTaxRate || 0) * (inputs.homePrice || 0) / 100;
    yearlyData.push(`Year ${year}: Rent $${rentCost.toFixed(0)} vs Buy $${buyCost.toFixed(0)}`);
  }
  
  return yearlyData.join(' | ');
}

function generateSensitivityAnalysis(inputs: RentVsBuyInputs, netHomeownershipValue: number, netRentalValue: number): string {
  const scenarios = [];
  
  // Interest rate sensitivity
  if (inputs.interestRate) {
    const highRateScenario = netHomeownershipValue * 0.8;
    if (highRateScenario < netRentalValue) {
      scenarios.push('Sensitive to interest rate increases');
    }
  }
  
  // Appreciation sensitivity
  if (inputs.homeAppreciationRate) {
    const lowAppreciationScenario = netHomeownershipValue * 0.7;
    if (lowAppreciationScenario < netRentalValue) {
      scenarios.push('Sensitive to lower home appreciation');
    }
  }
  
  // Investment return sensitivity
  if (inputs.investmentReturnRate) {
    const highReturnScenario = netRentalValue * 1.3;
    if (highReturnScenario > netHomeownershipValue) {
      scenarios.push('Sensitive to higher investment returns');
    }
  }
  
  return scenarios.length > 0 ? scenarios.join('. ') : 'Analysis is relatively stable across different scenarios.';
}

function generateDecisionMatrix(inputs: RentVsBuyInputs, netHomeownershipValue: number, netRentalValue: number): string {
  const factors = [];
  let buyScore = 0;
  let rentScore = 0;
  
  // Financial factor
  if (netHomeownershipValue > netRentalValue) {
    buyScore += 3;
    factors.push('Financial: Buy (+3)');
  } else {
    rentScore += 3;
    factors.push('Financial: Rent (+3)');
  }
  
  // Market conditions
  if (inputs.marketConditions === 'buyers-market') {
    buyScore += 2;
    factors.push('Market: Buy (+2)');
  } else if (inputs.marketConditions === 'sellers-market') {
    rentScore += 1;
    factors.push('Market: Rent (+1)');
  }
  
  // Job stability
  if (inputs.jobStability === 'stable' || inputs.jobStability === 'very-stable') {
    buyScore += 1;
    factors.push('Stability: Buy (+1)');
  } else {
    rentScore += 1;
    factors.push('Stability: Rent (+1)');
  }
  
  // Location growth
  if (inputs.locationGrowth === 'strong' || inputs.locationGrowth === 'explosive') {
    buyScore += 2;
    factors.push('Growth: Buy (+2)');
  } else if (inputs.locationGrowth === 'declining') {
    rentScore += 2;
    factors.push('Growth: Rent (+2)');
  }
  
  const recommendation = buyScore > rentScore ? 'Buy' : buyScore < rentScore ? 'Rent' : 'Consider';
  return `Decision Matrix: Buy (${buyScore}) vs Rent (${rentScore}) - ${recommendation}. Factors: ${factors.join(', ')}`;
}

export function generateRentVsBuyAnalysis(inputs: RentVsBuyInputs, outputs: RentVsBuyOutputs): string {
  const {
    homePrice,
    downPayment,
    monthlyRent,
    interestRate,
    analysisPeriod
  } = inputs;

  const {
    monthlyMortgagePayment,
    monthlyHomeownershipCost,
    monthlyRentalCost,
    totalHomeownershipCost,
    totalRentalCost,
    homeEquity,
    investmentValue,
    netHomeownershipValue,
    netRentalValue,
    breakEvenYears,
    recommendation,
    monthlySavings,
    totalSavings,
    roiComparison,
    taxBenefits,
    riskAssessment,
    marketTiming
  } = outputs;

  return `
# Rent vs. Buy Analysis Report

## Financial Summary
- **Recommendation**: ${recommendation}
- **Monthly Savings**: $${monthlySavings.toFixed(0)}/month
- **Total Savings**: $${totalSavings.toLocaleString()} over ${analysisPeriod} years
- **Break-Even**: ${breakEvenYears.toFixed(1)} years

## Cost Comparison
### Monthly Costs
- **Homeownership**: $${monthlyHomeownershipCost.toFixed(0)}/month
- **Renting**: $${monthlyRentalCost.toFixed(0)}/month
- **Difference**: $${Math.abs(monthlyHomeownershipCost - monthlyRentalCost).toFixed(0)}/month

### Total Costs (${analysisPeriod} years)
- **Homeownership**: $${totalHomeownershipCost.toLocaleString()}
- **Renting**: $${totalRentalCost.toLocaleString()}
- **Difference**: $${Math.abs(totalHomeownershipCost - totalRentalCost).toLocaleString()}

## Investment Analysis
- **Home Equity**: $${homeEquity.toLocaleString()}
- **Investment Value**: $${investmentValue.toLocaleString()}
- **Net Homeownership Value**: $${netHomeownershipValue.toLocaleString()}
- **Net Rental Value**: $${netRentalValue.toLocaleString()}
- **ROI Comparison**: ${roiComparison.toFixed(1)}%

## Key Factors
- **Home Price**: $${homePrice?.toLocaleString()}
- **Down Payment**: $${downPayment?.toLocaleString()} (${((downPayment! / homePrice!) * 100).toFixed(1)}%)
- **Interest Rate**: ${interestRate}%
- **Monthly Rent**: $${monthlyRent?.toLocaleString()}
- **Analysis Period**: ${analysisPeriod} years

## Tax Benefits
- **Annual Tax Savings**: $${taxBenefits.toFixed(0)}
- **Total Tax Benefits**: $${(taxBenefits * analysisPeriod).toFixed(0)}

## Risk Assessment
${riskAssessment}

## Market Timing
${marketTiming}

## Monthly Mortgage Details
- **Principal & Interest**: $${monthlyMortgagePayment.toFixed(0)}
- **Property Tax**: $${((homePrice! * (inputs.propertyTaxRate || 0) / 100) / 12).toFixed(0)}
- **Insurance**: $${((homePrice! * (inputs.homeInsuranceRate || 0) / 100) / 12).toFixed(0)}
- **Maintenance**: $${((homePrice! * (inputs.maintenanceRate || 0) / 100) / 12).toFixed(0)}
- **HOA Fees**: $${inputs.hoaFees || 0}

## Key Insights
- ${recommendation === 'Buy' ? 'Homeownership provides better long-term value' : recommendation === 'Rent' ? 'Renting provides better financial flexibility' : 'Both options have similar financial outcomes'}
- ${breakEvenYears < analysisPeriod ? `Homeownership becomes cheaper after ${breakEvenYears.toFixed(1)} years` : 'Renting remains cheaper throughout the analysis period'}
- ${roiComparison > 0 ? 'Homeownership provides better return on investment' : 'Renting provides better return on investment'}

## Recommendations
1. ${recommendation === 'Buy' ? 'Consider proceeding with home purchase' : recommendation === 'Rent' ? 'Continue renting for now' : 'Evaluate non-financial factors'}
2. ${monthlySavings > 0 ? `Save $${monthlySavings.toFixed(0)}/month for future goals` : 'Consider ways to reduce monthly costs'}
3. ${breakEvenYears > 5 ? 'Consider shorter-term analysis if planning to move soon' : 'Long-term commitment aligns with financial benefits'}
4. ${riskAssessment.includes('risk') ? 'Address risk factors before proceeding' : 'Risk factors are manageable'}
`;
}