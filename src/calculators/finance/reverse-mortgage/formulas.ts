import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export interface ReverseMortgageInputs extends CalculatorInputs {
  homeValue?: number;
  existingMortgage?: number;
  borrowerAge?: number;
  coBorrowerAge?: number;
  interestRate?: number;
  paymentType?: string;
  loanTerm?: number;
  monthlyPayment?: number;
  lumpSumAmount?: number;
  propertyType?: string;
  occupancyType?: string;
  propertyLocation?: string;
  state?: string;
  zipCode?: string;
  homeAppreciationRate?: number;
  inflationRate?: number;
  lifeExpectancy?: number;
  closingCosts?: number;
  servicingFees?: number;
  mortgageInsurance?: number;
  propertyTaxRate?: number;
  homeInsuranceRate?: number;
  maintenanceRate?: number;
  hoaFees?: number;
  creditScore?: number;
  income?: number;
  expenses?: number;
  otherAssets?: number;
  otherDebts?: number;
  healthStatus?: string;
  familyHistory?: string;
  marketConditions?: string;
  loanPurpose?: string;
}

export interface ReverseMortgageOutputs extends CalculatorOutputs {
  principalLimit: number;
  availableEquity: number;
  initialDraw: number;
  monthlyPaymentAmount: number;
  lineOfCredit: number;
  totalLoanBalance: number;
  remainingEquity: number;
  loanToValueRatio: number;
  annualPercentageRate: number;
  totalInterest: number;
  totalCosts: number;
  breakEvenYears: number;
  recommendation: string;
  monthlyCashFlow: number;
  annualCashFlow: number;
  debtElimination: number;
  taxImplications: string;
  riskAssessment: string;
  alternatives: string;
  repaymentAnalysis: string;
  equityProjection: string;
  costBenefitAnalysis: string;
  eligibilityScore: number;
  suitabilityScore: number;
  reverseMortgageAnalysis: string;
}

// Principal Limit Factors by age (FHA HECM factors)
const PRINCIPAL_LIMIT_FACTORS = {
  62: 0.26, 63: 0.27, 64: 0.28, 65: 0.29, 66: 0.30, 67: 0.31, 68: 0.32, 69: 0.33, 70: 0.34,
  71: 0.35, 72: 0.36, 73: 0.37, 74: 0.38, 75: 0.39, 76: 0.40, 77: 0.41, 78: 0.42, 79: 0.43, 80: 0.44,
  81: 0.45, 82: 0.46, 83: 0.47, 84: 0.48, 85: 0.49, 86: 0.50, 87: 0.51, 88: 0.52, 89: 0.53, 90: 0.54,
  91: 0.55, 92: 0.56, 93: 0.57, 94: 0.58, 95: 0.59, 96: 0.60, 97: 0.61, 98: 0.62, 99: 0.63, 100: 0.64
};

// Property type factors
const PROPERTY_TYPE_FACTORS = {
  'single-family': 1.0,
  'condo': 0.95,
  'townhouse': 0.98,
  'duplex': 0.92,
  'multi-family': 0.88,
  'manufactured': 0.85
};

// Occupancy type factors
const OCCUPANCY_TYPE_FACTORS = {
  'primary-residence': 1.0,
  'second-home': 0.85,
  'investment': 0.0 // Not eligible
};

// State-specific factors
const STATE_FACTORS = {
  california: 1.05,
  florida: 1.02,
  texas: 0.98,
  'new-york': 1.08,
  illinois: 1.0,
  pennsylvania: 0.97,
  ohio: 0.95,
  georgia: 0.96,
  'north-carolina': 0.94,
  michigan: 0.93
};

// Interest rate adjustment factors
const INTEREST_RATE_FACTORS = {
  low: 1.05,    // 0-4%
  medium: 1.0,  // 4-8%
  high: 0.95    // 8%+
};

// Payment type factors
const PAYMENT_TYPE_FACTORS = {
  'line-of-credit': 1.0,
  'monthly-payment': 0.85,
  'lump-sum': 0.75,
  'tenure-payment': 0.80,
  'term-payment': 0.90
};

// Health status factors
const HEALTH_STATUS_FACTORS = {
  'excellent': 1.05,
  'good': 1.0,
  'fair': 0.95,
  'poor': 0.90
};

export function calculateReverseMortgage(inputs: ReverseMortgageInputs): ReverseMortgageOutputs {
  const {
    homeValue = 500000,
    existingMortgage = 0,
    borrowerAge = 70,
    coBorrowerAge,
    interestRate = 6.5,
    paymentType = 'line-of-credit',
    loanTerm = 10,
    monthlyPayment = 0,
    lumpSumAmount = 0,
    propertyType = 'single-family',
    occupancyType = 'primary-residence',
    propertyLocation = 'urban',
    state = 'california',
    homeAppreciationRate = 3.0,
    inflationRate = 2.5,
    lifeExpectancy = 85,
    closingCosts = 8000,
    servicingFees = 35,
    mortgageInsurance = 0.5,
    propertyTaxRate = 1.2,
    homeInsuranceRate = 0.5,
    maintenanceRate = 1.0,
    hoaFees = 0,
    creditScore = 750,
    income = 3000,
    expenses = 2500,
    otherAssets = 100000,
    otherDebts = 50000,
    healthStatus = 'good',
    familyHistory = 'average',
    marketConditions = 'normal',
    loanPurpose = 'supplement-income'
  } = inputs;

  // Calculate effective borrower age (youngest if co-borrower)
  const effectiveAge = coBorrowerAge ? Math.min(borrowerAge, coBorrowerAge) : borrowerAge;
  const effectiveAgeClamped = Math.max(62, Math.min(100, effectiveAge));

  // Get base principal limit factor
  const basePLF = PRINCIPAL_LIMIT_FACTORS[effectiveAgeClamped as keyof typeof PRINCIPAL_LIMIT_FACTORS] || 0.34;

  // Apply adjustment factors
  const propertyTypeFactor = PROPERTY_TYPE_FACTORS[propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
  const occupancyTypeFactor = OCCUPANCY_TYPE_FACTORS[occupancyType as keyof typeof OCCUPANCY_TYPE_FACTORS] || 0.0;
  const stateFactor = STATE_FACTORS[state as keyof typeof STATE_FACTORS] || 1.0;
  const paymentTypeFactor = PAYMENT_TYPE_FACTORS[paymentType as keyof typeof PAYMENT_TYPE_FACTORS] || 1.0;
  const healthFactor = HEALTH_STATUS_FACTORS[healthStatus as keyof typeof HEALTH_STATUS_FACTORS] || 1.0;

  // Interest rate adjustment
  let interestRateFactor = INTEREST_RATE_FACTORS.medium;
  if (interestRate < 4) interestRateFactor = INTEREST_RATE_FACTORS.low;
  else if (interestRate > 8) interestRateFactor = INTEREST_RATE_FACTORS.high;

  // Calculate final principal limit factor
  const finalPLF = basePLF * propertyTypeFactor * occupancyTypeFactor * stateFactor * 
    paymentTypeFactor * healthFactor * interestRateFactor;

  // Calculate principal limit
  const principalLimit = Math.max(0, (homeValue * finalPLF) - existingMortgage - closingCosts);

  // Calculate available equity
  const availableEquity = homeValue - existingMortgage - closingCosts;

  // Calculate initial draw based on payment type
  let initialDraw = 0;
  let monthlyPaymentAmount = 0;
  let lineOfCredit = 0;

  switch (paymentType) {
    case 'lump-sum':
      initialDraw = Math.min(lumpSumAmount, principalLimit);
      break;
    case 'monthly-payment':
      initialDraw = 0;
      monthlyPaymentAmount = Math.min(monthlyPayment, principalLimit / (loanTerm * 12));
      break;
    case 'tenure-payment':
      initialDraw = 0;
      const tenureYears = lifeExpectancy - effectiveAgeClamped;
      monthlyPaymentAmount = Math.min(monthlyPayment, principalLimit / (tenureYears * 12));
      break;
    case 'term-payment':
      initialDraw = 0;
      monthlyPaymentAmount = Math.min(monthlyPayment, principalLimit / (loanTerm * 12));
      break;
    case 'line-of-credit':
    default:
      initialDraw = 0;
      lineOfCredit = principalLimit;
      break;
  }

  // Calculate total loan balance over time
  const analysisPeriod = Math.min(loanTerm, lifeExpectancy - effectiveAgeClamped);
  let totalLoanBalance = initialDraw;
  let totalInterest = 0;
  let totalServicingFees = 0;
  let totalMortgageInsurance = 0;

  for (let year = 1; year <= analysisPeriod; year++) {
    const yearlyInterest = totalLoanBalance * (interestRate / 100);
    const yearlyServicingFees = servicingFees * 12;
    const yearlyMortgageInsurance = totalLoanBalance * (mortgageInsurance / 100);

    totalInterest += yearlyInterest;
    totalServicingFees += yearlyServicingFees;
    totalMortgageInsurance += yearlyMortgageInsurance;

    totalLoanBalance += yearlyInterest + yearlyServicingFees + yearlyMortgageInsurance;

    // Add monthly payments if applicable
    if (monthlyPaymentAmount > 0) {
      totalLoanBalance += monthlyPaymentAmount * 12;
    }
  }

  // Calculate future home value
  const futureHomeValue = homeValue * Math.pow(1 + homeAppreciationRate / 100, analysisPeriod);

  // Calculate remaining equity
  const remainingEquity = Math.max(0, futureHomeValue - totalLoanBalance);

  // Calculate loan-to-value ratio
  const loanToValueRatio = (totalLoanBalance / futureHomeValue) * 100;

  // Calculate total costs
  const totalCosts = closingCosts + totalInterest + totalServicingFees + totalMortgageInsurance;

  // Calculate break-even years
  const annualBenefit = monthlyPaymentAmount * 12 + (initialDraw / analysisPeriod);
  const breakEvenYears = annualBenefit > 0 ? totalCosts / annualBenefit : analysisPeriod;

  // Calculate cash flow improvements
  const monthlyCashFlow = monthlyPaymentAmount - servicingFees;
  const annualCashFlow = monthlyCashFlow * 12;

  // Calculate debt elimination
  const debtElimination = existingMortgage;

  // Calculate eligibility score (0-100)
  let eligibilityScore = 100;
  if (effectiveAgeClamped < 62) eligibilityScore -= 50;
  if (occupancyType !== 'primary-residence') eligibilityScore -= 100;
  if (homeValue < 100000) eligibilityScore -= 20;
  if (creditScore < 600) eligibilityScore -= 15;
  if (otherDebts > homeValue * 0.5) eligibilityScore -= 10;
  eligibilityScore = Math.max(0, Math.min(100, eligibilityScore));

  // Calculate suitability score (0-100)
  let suitabilityScore = 50;
  if (monthlyCashFlow > 0) suitabilityScore += 20;
  if (debtElimination > 0) suitabilityScore += 15;
  if (otherAssets < 50000) suitabilityScore += 10;
  if (income < expenses) suitabilityScore += 10;
  if (healthStatus === 'excellent' || healthStatus === 'good') suitabilityScore += 5;
  if (loanPurpose === 'supplement-income') suitabilityScore += 5;
  suitabilityScore = Math.max(0, Math.min(100, suitabilityScore));

  // Determine recommendation
  let recommendation = 'Consider';
  if (eligibilityScore < 50) {
    recommendation = 'Not Eligible';
  } else if (suitabilityScore >= 80) {
    recommendation = 'Highly Suitable';
  } else if (suitabilityScore >= 60) {
    recommendation = 'Suitable';
  } else if (suitabilityScore < 40) {
    recommendation = 'Not Recommended';
  }

  // Calculate APR
  const annualPercentageRate = interestRate + mortgageInsurance + (servicingFees * 12 / principalLimit) * 100;

  // Generate analysis reports
  const taxImplications = generateTaxImplications(monthlyPaymentAmount, initialDraw);
  const riskAssessment = generateRiskAssessment(inputs, totalLoanBalance, futureHomeValue);
  const alternatives = generateAlternatives(inputs, monthlyCashFlow);
  const repaymentAnalysis = generateRepaymentAnalysis(inputs, totalLoanBalance, remainingEquity);
  const equityProjection = generateEquityProjection(inputs, homeValue, totalLoanBalance, analysisPeriod);
  const costBenefitAnalysis = generateCostBenefitAnalysis(inputs, totalCosts, annualCashFlow, breakEvenYears);

  return {
    principalLimit,
    availableEquity,
    initialDraw,
    monthlyPaymentAmount,
    lineOfCredit,
    totalLoanBalance,
    remainingEquity,
    loanToValueRatio,
    annualPercentageRate,
    totalInterest,
    totalCosts,
    breakEvenYears,
    recommendation,
    monthlyCashFlow,
    annualCashFlow,
    debtElimination,
    taxImplications,
    riskAssessment,
    alternatives,
    repaymentAnalysis,
    equityProjection,
    costBenefitAnalysis,
    eligibilityScore,
    suitabilityScore,
    reverseMortgageAnalysis: generateReverseMortgageAnalysis(inputs, {
      principalLimit,
      availableEquity,
      initialDraw,
      monthlyPaymentAmount,
      lineOfCredit,
      totalLoanBalance,
      remainingEquity,
      loanToValueRatio,
      annualPercentageRate,
      totalInterest,
      totalCosts,
      breakEvenYears,
      recommendation,
      monthlyCashFlow,
      annualCashFlow,
      debtElimination,
      taxImplications,
      riskAssessment,
      alternatives,
      repaymentAnalysis,
      equityProjection,
      costBenefitAnalysis,
      eligibilityScore,
      suitabilityScore,
      reverseMortgageAnalysis: ''
    })
  };
}

function generateTaxImplications(monthlyPayment: number, initialDraw: number): string {
  const annualPayment = monthlyPayment * 12;
  
  if (annualPayment > 0 || initialDraw > 0) {
    return 'Reverse mortgage proceeds are generally not taxable as income. However, consult a tax advisor for your specific situation.';
  } else {
    return 'No immediate tax implications for line of credit option.';
  }
}

function generateRiskAssessment(inputs: ReverseMortgageInputs, totalLoanBalance: number, futureHomeValue: number): string {
  const risks = [];
  
  if (totalLoanBalance > futureHomeValue * 0.8) {
    risks.push('High risk of negative equity');
  }
  
  if (inputs.homeAppreciationRate && inputs.homeAppreciationRate < 2) {
    risks.push('Low home appreciation may reduce equity');
  }
  
  if (inputs.healthStatus === 'poor') {
    risks.push('Health issues may affect ability to maintain property');
  }
  
  if (inputs.otherAssets && inputs.otherAssets < 25000) {
    risks.push('Limited other assets for emergencies');
  }
  
  if (inputs.expenses && inputs.income && inputs.expenses > inputs.income * 0.8) {
    risks.push('High expense ratio may strain finances');
  }
  
  return risks.length > 0 ? risks.join('. ') : 'Risk factors are manageable.';
}

function generateAlternatives(inputs: ReverseMortgageInputs, monthlyCashFlow: number): string {
  const alternatives = [];
  
  if (inputs.otherAssets && inputs.otherAssets > 100000) {
    alternatives.push('Consider using other assets first');
  }
  
  if (inputs.income && inputs.expenses && inputs.income > inputs.expenses * 1.2) {
    alternatives.push('Current income may be sufficient');
  }
  
  if (inputs.otherDebts && inputs.otherDebts < 50000) {
    alternatives.push('Consider traditional debt consolidation');
  }
  
  alternatives.push('Downsize to smaller home');
  alternatives.push('Rent out part of home');
  alternatives.push('Part-time work or consulting');
  
  return alternatives.join('. ');
}

function generateRepaymentAnalysis(inputs: ReverseMortgageInputs, totalLoanBalance: number, remainingEquity: number): string {
  const repaymentScenarios = [];
  
  if (remainingEquity > 0) {
    repaymentScenarios.push(`Remaining equity: $${remainingEquity.toLocaleString()}`);
  } else {
    repaymentScenarios.push('No remaining equity - FHA insurance covers shortfall');
  }
  
  repaymentScenarios.push(`Total loan balance: $${totalLoanBalance.toLocaleString()}`);
  repaymentScenarios.push('Repayment required when: Last borrower moves out permanently, sells home, or passes away');
  
  return repaymentScenarios.join('. ');
}

function generateEquityProjection(inputs: ReverseMortgageInputs, homeValue: number, totalLoanBalance: number, years: number): string {
  const projections = [];
  
  for (let year = 1; year <= Math.min(years, 5); year++) {
    const futureValue = homeValue * Math.pow(1 + (inputs.homeAppreciationRate || 3) / 100, year);
    const projectedBalance = totalLoanBalance * Math.pow(1 + (inputs.interestRate || 6.5) / 100, year);
    const projectedEquity = Math.max(0, futureValue - projectedBalance);
    projections.push(`Year ${year}: $${projectedEquity.toLocaleString()}`);
  }
  
  return projections.join(' | ');
}

function generateCostBenefitAnalysis(inputs: ReverseMortgageInputs, totalCosts: number, annualCashFlow: number, breakEvenYears: number): string {
  const analysis = [];
  
  analysis.push(`Total costs: $${totalCosts.toLocaleString()}`);
  analysis.push(`Annual benefit: $${annualCashFlow.toLocaleString()}`);
  
  if (breakEvenYears < 5) {
    analysis.push('Quick break-even period');
  } else if (breakEvenYears < 10) {
    analysis.push('Moderate break-even period');
  } else {
    analysis.push('Long break-even period - consider alternatives');
  }
  
  if (inputs.existingMortgage && inputs.existingMortgage > 0) {
    analysis.push(`Debt elimination benefit: $${inputs.existingMortgage.toLocaleString()}`);
  }
  
  return analysis.join('. ');
}

export function generateReverseMortgageAnalysis(inputs: ReverseMortgageInputs, outputs: ReverseMortgageOutputs): string {
  const {
    homeValue,
    borrowerAge,
    interestRate,
    paymentType,
    loanPurpose
  } = inputs;

  const {
    principalLimit,
    availableEquity,
    initialDraw,
    monthlyPaymentAmount,
    lineOfCredit,
    totalLoanBalance,
    remainingEquity,
    loanToValueRatio,
    annualPercentageRate,
    totalCosts,
    breakEvenYears,
    recommendation,
    monthlyCashFlow,
    annualCashFlow,
    debtElimination,
    eligibilityScore,
    suitabilityScore
  } = outputs;

  return `
# Reverse Mortgage Analysis Report

## Loan Summary
- **Recommendation**: ${recommendation}
- **Eligibility Score**: ${eligibilityScore}/100
- **Suitability Score**: ${suitabilityScore}/100
- **Principal Limit**: $${principalLimit.toLocaleString()}
- **Available Equity**: $${availableEquity.toLocaleString()}

## Payment Details
- **Payment Type**: ${paymentType}
- **Initial Draw**: $${initialDraw.toLocaleString()}
- **Monthly Payment**: $${monthlyPaymentAmount.toFixed(0)}/month
- **Line of Credit**: $${lineOfCredit.toLocaleString()}
- **Annual Cash Flow**: $${annualCashFlow.toLocaleString()}

## Financial Projections
- **Total Loan Balance**: $${totalLoanBalance.toLocaleString()}
- **Remaining Equity**: $${remainingEquity.toLocaleString()}
- **Loan-to-Value Ratio**: ${loanToValueRatio.toFixed(1)}%
- **Annual Percentage Rate**: ${annualPercentageRate.toFixed(2)}%

## Cost Analysis
- **Total Costs**: $${totalCosts.toLocaleString()}
- **Break-Even Years**: ${breakEvenYears.toFixed(1)} years
- **Monthly Cash Flow**: $${monthlyCashFlow.toFixed(0)}/month
- **Debt Elimination**: $${debtElimination.toLocaleString()}

## Key Factors
- **Home Value**: $${homeValue?.toLocaleString()}
- **Borrower Age**: ${borrowerAge} years
- **Interest Rate**: ${interestRate}%
- **Loan Purpose**: ${loanPurpose}

## Key Insights
- ${recommendation === 'Highly Suitable' ? 'Reverse mortgage appears highly suitable for your situation' : recommendation === 'Suitable' ? 'Reverse mortgage may be suitable with careful consideration' : recommendation === 'Not Recommended' ? 'Consider alternatives before proceeding' : 'Evaluate carefully before proceeding'}
- ${eligibilityScore >= 80 ? 'You meet all eligibility requirements' : eligibilityScore >= 60 ? 'You meet most eligibility requirements' : 'You may not meet all eligibility requirements'}
- ${suitabilityScore >= 80 ? 'This option appears well-suited to your financial needs' : suitabilityScore >= 60 ? 'This option may be suitable for your situation' : 'Consider whether this option truly meets your needs'}
- ${breakEvenYears < 5 ? 'Quick break-even period makes this financially attractive' : breakEvenYears < 10 ? 'Moderate break-even period - evaluate long-term benefits' : 'Long break-even period - consider alternatives'}

## Recommendations
1. ${recommendation === 'Not Eligible' ? 'Consider alternative financing options' : 'Consult with a reverse mortgage counselor'}
2. ${monthlyCashFlow > 0 ? `Use $${monthlyCashFlow.toFixed(0)}/month for essential expenses` : 'Consider other income sources'}
3. ${debtElimination > 0 ? `Use debt elimination to improve cash flow` : 'Maintain emergency fund'}
4. ${loanToValueRatio > 80 ? 'Monitor equity closely' : 'Equity position appears stable'}
5. ${suitabilityScore < 60 ? 'Consider alternatives before proceeding' : 'Proceed with reverse mortgage if it meets your needs'}
`;
}