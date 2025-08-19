/**
 * Balloon Mortgage Calculation Formulas
 * Based on mortgage industry standards and balloon loan structures
 */

export interface BalloonMortgageInputs {
  loanAmount: number;
  interestRate: number;
  balloonTerm: number;
  amortizationPeriod: number;
  downPayment: number;
  balloonType: 'interest-principal' | 'interest-only' | 'partial-amortization';
  partialAmortizationYears: number;
  expectedAppreciation: number;
  refinanceRate: number;
  closingCosts: number;
  exitStrategy: 'refinance' | 'sell' | 'cash' | 'extend';
}

export interface BalloonMortgageResults {
  monthlyPayment: number;
  balloonPayment: number;
  totalInterestPaid: number;
  principalPaid: number;
  totalCost: number;
  cashFlowSavings: number;
  riskAssessment: RiskAssessment;
  exitStrategyAnalysis: ExitStrategyAnalysis;
  comparisonAnalysis: ComparisonAnalysis;
}

export interface RiskAssessment {
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
  interestRateRisk: string;
  marketRisk: string;
  refinancingRisk: string;
  liquidityRisk: string;
}

export interface ExitStrategyAnalysis {
  strategy: string;
  feasibility: 'HIGH' | 'MODERATE' | 'LOW';
  requirements: string[];
  risks: string[];
  costs: number;
}

export interface ComparisonAnalysis {
  traditionalMortgage: {
    monthlyPayment: number;
    totalCost: number;
  };
  balloonMortgage: {
    monthlyPayment: number;
    totalCost: number;
  };
  monthlySavings: number;
  totalSavings: number;
  breakEvenAppreciation: number;
}

/**
 * Calculate standard mortgage payment using PMT formula
 */
export function calculateMortgagePayment(
  principal: number,
  annualRate: number,
  termYears: number
): number {
  if (annualRate === 0) {
    return principal / (termYears * 12);
  }
  
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = termYears * 12;
  
  return principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

/**
 * Calculate interest-only payment
 */
export function calculateInterestOnlyPayment(
  principal: number,
  annualRate: number
): number {
  return (principal * annualRate / 100) / 12;
}

/**
 * Calculate remaining balance after specified payments
 */
export function calculateRemainingBalance(
  originalPrincipal: number,
  monthlyPayment: number,
  annualRate: number,
  paymentsMade: number
): number {
  if (annualRate === 0) {
    return Math.max(0, originalPrincipal - (monthlyPayment * paymentsMade));
  }
  
  const monthlyRate = annualRate / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, paymentsMade);
  
  const remaining = originalPrincipal * factor - monthlyPayment * (factor - 1) / monthlyRate;
  return Math.max(0, remaining);
}

/**
 * Calculate balloon mortgage payment structure
 */
export function calculateBalloonMortgage(inputs: BalloonMortgageInputs): BalloonMortgageResults {
  const netLoanAmount = inputs.loanAmount - inputs.downPayment;
  const monthlyRate = inputs.interestRate / 100 / 12;
  const balloonMonths = inputs.balloonTerm * 12;
  
  let monthlyPayment: number;
  let balloonPayment: number;
  let principalPaid: number;
  let totalInterestPaid: number;
  
  switch (inputs.balloonType) {
    case 'interest-only':
      monthlyPayment = calculateInterestOnlyPayment(netLoanAmount, inputs.interestRate);
      balloonPayment = netLoanAmount;
      principalPaid = 0;
      totalInterestPaid = monthlyPayment * balloonMonths;
      break;
      
    case 'partial-amortization':
      monthlyPayment = calculateMortgagePayment(
        netLoanAmount, 
        inputs.interestRate, 
        inputs.partialAmortizationYears
      );
      balloonPayment = calculateRemainingBalance(
        netLoanAmount, 
        monthlyPayment, 
        inputs.interestRate, 
        balloonMonths
      );
      principalPaid = netLoanAmount - balloonPayment;
      totalInterestPaid = (monthlyPayment * balloonMonths) - principalPaid;
      break;
      
    default: // 'interest-principal'
      monthlyPayment = calculateMortgagePayment(
        netLoanAmount, 
        inputs.interestRate, 
        inputs.amortizationPeriod
      );
      balloonPayment = calculateRemainingBalance(
        netLoanAmount, 
        monthlyPayment, 
        inputs.interestRate, 
        balloonMonths
      );
      principalPaid = netLoanAmount - balloonPayment;
      totalInterestPaid = (monthlyPayment * balloonMonths) - principalPaid;
      break;
  }
  
  const totalCost = (monthlyPayment * balloonMonths) + balloonPayment;
  
  // Traditional mortgage comparison
  const traditionalPayment = calculateMortgagePayment(netLoanAmount, inputs.interestRate, 30);
  const traditionalCost = traditionalPayment * balloonMonths;
  const monthlySavings = traditionalPayment - monthlyPayment;
  const cashFlowSavings = monthlySavings * balloonMonths;
  
  // Risk assessment
  const riskAssessment = assessBalloonRisks(inputs, balloonPayment, monthlyPayment);
  
  // Exit strategy analysis
  const exitStrategyAnalysis = analyzeExitStrategy(inputs, balloonPayment);
  
  // Comparison analysis
  const comparisonAnalysis: ComparisonAnalysis = {
    traditionalMortgage: {
      monthlyPayment: traditionalPayment,
      totalCost: traditionalCost
    },
    balloonMortgage: {
      monthlyPayment,
      totalCost
    },
    monthlySavings,
    totalSavings: cashFlowSavings,
    breakEvenAppreciation: calculateBreakEvenAppreciation(
      inputs.loanAmount + inputs.downPayment,
      balloonPayment,
      cashFlowSavings,
      inputs.balloonTerm
    )
  };
  
  return {
    monthlyPayment,
    balloonPayment,
    totalInterestPaid,
    principalPaid,
    totalCost,
    cashFlowSavings,
    riskAssessment,
    exitStrategyAnalysis,
    comparisonAnalysis
  };
}

/**
 * Assess risks associated with balloon mortgage
 */
export function assessBalloonRisks(
  inputs: BalloonMortgageInputs,
  balloonPayment: number,
  monthlyPayment: number
): RiskAssessment {
  let riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME' = 'MODERATE';
  
  // Interest rate risk
  const rateIncrease = inputs.refinanceRate - inputs.interestRate;
  let interestRateRisk: string;
  if (rateIncrease > 2) {
    interestRateRisk = 'HIGH - Rates expected to rise significantly';
    riskLevel = 'HIGH';
  } else if (rateIncrease > 0.5) {
    interestRateRisk = 'MODERATE - Some rate increase expected';
  } else {
    interestRateRisk = 'LOW - Stable or declining rate environment';
  }
  
  // Market risk based on balloon term
  let marketRisk: string;
  if (inputs.balloonTerm <= 3) {
    marketRisk = 'LOW - Short term reduces market timing risk';
  } else if (inputs.balloonTerm <= 5) {
    marketRisk = 'MODERATE - Medium term market exposure';
  } else {
    marketRisk = 'HIGH - Long term increases market uncertainty';
    riskLevel = riskLevel === 'LOW' ? 'MODERATE' : 'HIGH';
  }
  
  // Refinancing risk based on expected LTV
  const propertyValue = inputs.loanAmount + inputs.downPayment;
  const futureValue = propertyValue * Math.pow(1 + inputs.expectedAppreciation / 100, inputs.balloonTerm);
  const ltvAtBalloon = (balloonPayment / futureValue) * 100;
  
  let refinancingRisk: string;
  if (ltvAtBalloon > 90) {
    refinancingRisk = 'EXTREME - Very high LTV may prevent refinancing';
    riskLevel = 'EXTREME';
  } else if (ltvAtBalloon > 80) {
    refinancingRisk = 'HIGH - High LTV may limit refinancing options';
    riskLevel = riskLevel === 'LOW' ? 'MODERATE' : 'HIGH';
  } else if (ltvAtBalloon > 70) {
    refinancingRisk = 'MODERATE - Reasonable LTV for refinancing';
  } else {
    refinancingRisk = 'LOW - Low LTV provides refinancing flexibility';
  }
  
  // Liquidity risk based on balloon type and exit strategy
  let liquidityRisk: string;
  if (inputs.balloonType === 'interest-only') {
    liquidityRisk = 'HIGH - No principal paydown increases cash needs';
    riskLevel = riskLevel === 'LOW' ? 'MODERATE' : 'HIGH';
  } else if (inputs.exitStrategy === 'cash') {
    liquidityRisk = 'HIGH - Requires significant cash reserves';
  } else if (inputs.exitStrategy === 'sell') {
    liquidityRisk = 'MODERATE - Depends on market conditions';
  } else {
    liquidityRisk = 'MODERATE - Refinancing dependent';
  }
  
  return {
    riskLevel,
    interestRateRisk,
    marketRisk,
    refinancingRisk,
    liquidityRisk
  };
}

/**
 * Analyze feasibility of chosen exit strategy
 */
export function analyzeExitStrategy(
  inputs: BalloonMortgageInputs,
  balloonPayment: number
): ExitStrategyAnalysis {
  const propertyValue = inputs.loanAmount + inputs.downPayment;
  const futureValue = propertyValue * Math.pow(1 + inputs.expectedAppreciation / 100, inputs.balloonTerm);
  const equity = futureValue - balloonPayment;
  
  let feasibility: 'HIGH' | 'MODERATE' | 'LOW';
  let requirements: string[];
  let risks: string[];
  let costs: number;
  
  switch (inputs.exitStrategy) {
    case 'refinance':
      const ltvForRefinance = ((balloonPayment + inputs.closingCosts) / futureValue) * 100;
      feasibility = ltvForRefinance <= 80 ? 'HIGH' : ltvForRefinance <= 90 ? 'MODERATE' : 'LOW';
      requirements = [
        'Qualifying income and credit',
        `Property appraisal at $${futureValue.toLocaleString()}`,
        `LTV of ${ltvForRefinance.toFixed(1)}%`
      ];
      risks = [
        'Interest rate increases',
        'Tightened lending standards',
        'Property value decline'
      ];
      costs = inputs.closingCosts;
      break;
      
    case 'sell':
      const sellingCosts = futureValue * 0.06; // 6% selling costs
      const netProceeds = futureValue - balloonPayment - sellingCosts;
      feasibility = netProceeds > 0 ? 'HIGH' : netProceeds > -20000 ? 'MODERATE' : 'LOW';
      requirements = [
        'Market conditions favorable for sale',
        `Property value at least $${(balloonPayment + sellingCosts).toLocaleString()}`,
        'Ability to relocate'
      ];
      risks = [
        'Market downturn',
        'Extended time to sell',
        'Selling costs higher than expected'
      ];
      costs = sellingCosts;
      break;
      
    case 'cash':
      feasibility = 'HIGH'; // Assumes sufficient liquidity
      requirements = [
        `$${balloonPayment.toLocaleString()} in liquid assets`,
        'No impact on other financial goals'
      ];
      risks = [
        'Opportunity cost of cash',
        'Reduced liquidity for emergencies'
      ];
      costs = 0; // No transaction costs
      break;
      
    case 'extend':
      feasibility = 'MODERATE'; // Depends on lender
      requirements = [
        'Lender willingness to extend',
        'Good payment history',
        'Reasonable property value'
      ];
      risks = [
        'Lender may refuse extension',
        'Higher interest rate',
        'Extension fees'
      ];
      costs = 2500; // Estimated extension fees
      break;
      
    default:
      feasibility = 'LOW';
      requirements = [];
      risks = [];
      costs = 0;
  }
  
  return {
    strategy: inputs.exitStrategy,
    feasibility,
    requirements,
    risks,
    costs
  };
}

/**
 * Calculate required property appreciation to break even
 */
export function calculateBreakEvenAppreciation(
  initialPropertyValue: number,
  balloonPayment: number,
  cashFlowSavings: number,
  years: number
): number {
  // Property value needed to break even after accounting for cash flow savings
  const neededValue = balloonPayment - cashFlowSavings;
  
  if (neededValue <= initialPropertyValue) {
    return 0; // Already break even or better
  }
  
  const requiredGrowthFactor = neededValue / initialPropertyValue;
  return (Math.pow(requiredGrowthFactor, 1 / years) - 1) * 100;
}

/**
 * Calculate total return on investment for balloon mortgage strategy
 */
export function calculateBalloonROI(
  inputs: BalloonMortgageInputs,
  results: BalloonMortgageResults
): {
  totalReturn: number;
  annualizedReturn: number;
  cashOnCashReturn: number;
  leveragedReturn: number;
} {
  const propertyValue = inputs.loanAmount + inputs.downPayment;
  const futureValue = propertyValue * Math.pow(1 + inputs.expectedAppreciation / 100, inputs.balloonTerm);
  const totalAppreciation = futureValue - propertyValue;
  const netCashFlow = results.cashFlowSavings;
  const totalReturn = totalAppreciation + netCashFlow;
  
  const annualizedReturn = (Math.pow((futureValue + netCashFlow) / propertyValue, 1 / inputs.balloonTerm) - 1) * 100;
  const cashOnCashReturn = ((netCashFlow + totalAppreciation) / inputs.downPayment) * 100;
  const leveragedReturn = (totalReturn / inputs.downPayment) * 100;
  
  return {
    totalReturn,
    annualizedReturn,
    cashOnCashReturn,
    leveragedReturn
  };
}

/**
 * Perform sensitivity analysis on key variables
 */
export function performSensitivityAnalysis(
  baseInputs: BalloonMortgageInputs
): {
  interestRateSensitivity: Array<{ rate: number; payment: number; balloon: number }>;
  appreciationSensitivity: Array<{ appreciation: number; equity: number; breakEven: boolean }>;
  balloonTermSensitivity: Array<{ term: number; payment: number; balloon: number; risk: string }>;
} {
  const interestRates = [3, 4, 5, 6, 7, 8];
  const appreciationRates = [-2, 0, 2, 3, 5, 7];
  const balloonTerms = [3, 5, 7, 10];
  
  const interestRateSensitivity = interestRates.map(rate => {
    const testInputs = { ...baseInputs, interestRate: rate };
    const results = calculateBalloonMortgage(testInputs);
    return {
      rate,
      payment: results.monthlyPayment,
      balloon: results.balloonPayment
    };
  });
  
  const appreciationSensitivity = appreciationRates.map(appreciation => {
    const testInputs = { ...baseInputs, expectedAppreciation: appreciation };
    const results = calculateBalloonMortgage(testInputs);
    const propertyValue = baseInputs.loanAmount + baseInputs.downPayment;
    const futureValue = propertyValue * Math.pow(1 + appreciation / 100, baseInputs.balloonTerm);
    const equity = futureValue - results.balloonPayment;
    
    return {
      appreciation,
      equity,
      breakEven: equity >= results.cashFlowSavings
    };
  });
  
  const balloonTermSensitivity = balloonTerms.map(term => {
    const testInputs = { ...baseInputs, balloonTerm: term };
    const results = calculateBalloonMortgage(testInputs);
    
    return {
      term,
      payment: results.monthlyPayment,
      balloon: results.balloonPayment,
      risk: results.riskAssessment.riskLevel
    };
  });
  
  return {
    interestRateSensitivity,
    appreciationSensitivity,
    balloonTermSensitivity
  };
}

/**
 * Calculate amortization schedule for balloon mortgage
 */
export function generateBalloonAmortizationSchedule(
  inputs: BalloonMortgageInputs
): Array<{
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}> {
  const results = calculateBalloonMortgage(inputs);
  const schedule = [];
  const netLoanAmount = inputs.loanAmount - inputs.downPayment;
  const monthlyRate = inputs.interestRate / 100 / 12;
  
  let balance = netLoanAmount;
  
  for (let month = 1; month <= inputs.balloonTerm * 12; month++) {
    const interestPayment = balance * monthlyRate;
    let principalPayment: number;
    
    if (inputs.balloonType === 'interest-only') {
      principalPayment = 0;
    } else {
      principalPayment = results.monthlyPayment - interestPayment;
    }
    
    balance = Math.max(0, balance - principalPayment);
    
    schedule.push({
      month,
      payment: results.monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance
    });
  }
  
  return schedule;
}
