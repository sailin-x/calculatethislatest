import { ValidationRule } from '../../../types/Calculator';

export const balloonMortgageValidationRules: ValidationRule[] = [
  {
    field: 'loanAmount',
    type: 'required',
    message: 'Loan amount is required'
  },
  {
    field: 'loanAmount',
    type: 'min',
    value: 50000,
    message: 'Loan amount must be at least $50,000'
  },
  {
    field: 'loanAmount',
    type: 'max',
    value: 10000000,
    message: 'Loan amount cannot exceed $10 million'
  },
  {
    field: 'interestRate',
    type: 'required',
    message: 'Interest rate is required'
  },
  {
    field: 'interestRate',
    type: 'min',
    value: 1,
    message: 'Interest rate must be at least 1%'
  },
  {
    field: 'interestRate',
    type: 'max',
    value: 15,
    message: 'Interest rate cannot exceed 15%'
  },
  {
    field: 'balloonTerm',
    type: 'required',
    message: 'Balloon term is required'
  },
  {
    field: 'balloonTerm',
    type: 'min',
    value: 1,
    message: 'Balloon term must be at least 1 year'
  },
  {
    field: 'balloonTerm',
    type: 'max',
    value: 10,
    message: 'Balloon term cannot exceed 10 years'
  },
  {
    field: 'amortizationPeriod',
    type: 'required',
    message: 'Amortization period is required'
  },
  {
    field: 'amortizationPeriod',
    type: 'min',
    value: 15,
    message: 'Amortization period must be at least 15 years'
  },
  {
    field: 'amortizationPeriod',
    type: 'max',
    value: 40,
    message: 'Amortization period cannot exceed 40 years'
  },
  {
    field: 'downPayment',
    type: 'min',
    value: 0,
    message: 'Down payment cannot be negative'
  },
  {
    field: 'partialAmortizationYears',
    type: 'min',
    value: 10,
    message: 'Partial amortization period must be at least 10 years'
  },
  {
    field: 'partialAmortizationYears',
    type: 'max',
    value: 25,
    message: 'Partial amortization period cannot exceed 25 years'
  },
  {
    field: 'expectedAppreciation',
    type: 'min',
    value: -5,
    message: 'Expected appreciation cannot be less than -5%'
  },
  {
    field: 'expectedAppreciation',
    type: 'max',
    value: 15,
    message: 'Expected appreciation cannot exceed 15%'
  },
  {
    field: 'refinanceRate',
    type: 'min',
    value: 1,
    message: 'Refinance rate must be at least 1%'
  },
  {
    field: 'refinanceRate',
    type: 'max',
    value: 15,
    message: 'Refinance rate cannot exceed 15%'
  },
  {
    field: 'closingCosts',
    type: 'min',
    value: 0,
    message: 'Closing costs cannot be negative'
  },
  // Cross-field validations
  {
    field: 'balloonTerm',
    type: 'custom',
    validator: (value, allInputs) => {
      const balloonTerm = Number(value);
      const amortizationPeriod = Number(allInputs.amortizationPeriod) || 30;
      return balloonTerm < amortizationPeriod;
    },
    message: 'Balloon term must be less than amortization period'
  },
  {
    field: 'downPayment',
    type: 'custom',
    validator: (value, allInputs) => {
      const downPayment = Number(value) || 0;
      const loanAmount = Number(allInputs.loanAmount) || 0;
      return downPayment < loanAmount;
    },
    message: 'Down payment must be less than loan amount'
  },
  {
    field: 'partialAmortizationYears',
    type: 'custom',
    validator: (value, allInputs) => {
      const partialYears = Number(value) || 15;
      const balloonTerm = Number(allInputs.balloonTerm) || 5;
      return partialYears > balloonTerm;
    },
    message: 'Partial amortization period must be greater than balloon term'
  },
  {
    field: 'downPayment',
    type: 'custom',
    validator: (value, allInputs) => {
      const downPayment = Number(value) || 0;
      const loanAmount = Number(allInputs.loanAmount) || 0;
      const downPaymentPercent = (downPayment / loanAmount) * 100;
      return downPaymentPercent >= 5; // Minimum 5% down
    },
    message: 'Down payment should be at least 5% of loan amount'
  }
];

export const balloonMortgageBusinessRules = {
  // Common balloon mortgage structures
  commonBalloonTypes: [
    { name: '5/25 Balloon', balloonTerm: 5, amortization: 25, description: '5 years with 25-year amortization' },
    { name: '7/23 Balloon', balloonTerm: 7, amortization: 23, description: '7 years with 23-year amortization' },
    { name: '5-Year Interest-Only', balloonTerm: 5, type: 'interest-only', description: '5 years interest-only payments' },
    { name: '10-Year Partial', balloonTerm: 10, type: 'partial-amortization', description: '10 years with partial amortization' }
  ],
  
  // Risk assessment thresholds
  riskThresholds: {
    lowRisk: {
      maxBalloonTerm: 5,
      minDownPayment: 20, // %
      maxLTV: 70, // %
      stableRateEnvironment: true
    },
    moderateRisk: {
      maxBalloonTerm: 7,
      minDownPayment: 15, // %
      maxLTV: 80, // %
      rateIncreaseExpected: true
    },
    highRisk: {
      maxBalloonTerm: 10,
      minDownPayment: 10, // %
      maxLTV: 90, // %
      volatileMarket: true
    }
  },
  
  // Exit strategy considerations
  exitStrategies: {
    refinance: {
      requirements: ['Good credit', 'Stable income', 'Property value maintained', 'LTV ≤ 80%'],
      risks: ['Interest rate increases', 'Tightened lending standards', 'Property depreciation'],
      suitability: 'Best for borrowers planning to stay long-term'
    },
    sell: {
      requirements: ['Market conditions', 'Property marketability', 'Sufficient equity'],
      risks: ['Market downturn', 'Extended selling time', 'Transaction costs'],
      suitability: 'Good for short-term ownership or investment properties'
    },
    cash: {
      requirements: ['Sufficient liquidity', 'No impact on other goals'],
      risks: ['Opportunity cost', 'Reduced emergency funds'],
      suitability: 'Best for high-net-worth borrowers with excess liquidity'
    },
    extend: {
      requirements: ['Lender cooperation', 'Good payment history'],
      risks: ['Lender refusal', 'Rate adjustment', 'Extension fees'],
      suitability: 'Backup option, not primary strategy'
    }
  },
  
  // Market conditions impact
  marketConditions: {
    risingRates: {
      balloonRisk: 'HIGH',
      recommendation: 'Consider shorter balloon terms or fixed-rate alternatives',
      exitStrategy: 'Plan for higher refinance rates'
    },
    fallingRates: {
      balloonRisk: 'LOW',
      recommendation: 'Balloon mortgages may be advantageous',
      exitStrategy: 'Refinancing likely to be favorable'
    },
    stableRates: {
      balloonRisk: 'MODERATE',
      recommendation: 'Focus on property appreciation and exit strategy',
      exitStrategy: 'Multiple options remain viable'
    },
    volatileMarket: {
      balloonRisk: 'HIGH',
      recommendation: 'Avoid balloon mortgages or use conservative terms',
      exitStrategy: 'Ensure multiple backup plans'
    }
  }
};

/**
 * Validate balloon mortgage inputs for business logic and reasonableness
 */
export function validateBalloonMortgageInputs(inputs: any): {
  isValid: boolean;
  warnings: string[];
  errors: string[];
  recommendations: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];
  const recommendations: string[] = [];

  const loanAmount = Number(inputs.loanAmount) || 0;
  const interestRate = Number(inputs.interestRate) || 0;
  const balloonTerm = Number(inputs.balloonTerm) || 0;
  const amortizationPeriod = Number(inputs.amortizationPeriod) || 0;
  const downPayment = Number(inputs.downPayment) || 0;
  const balloonType = inputs.balloonType || 'interest-principal';
  const expectedAppreciation = Number(inputs.expectedAppreciation) || 0;
  const refinanceRate = Number(inputs.refinanceRate) || 0;
  const exitStrategy = inputs.exitStrategy || 'refinance';

  // Down payment analysis
  const downPaymentPercent = (downPayment / loanAmount) * 100;
  if (downPaymentPercent < 10) {
    warnings.push('Low down payment increases balloon mortgage risk');
  } else if (downPaymentPercent >= 20) {
    recommendations.push('Good down payment provides flexibility for balloon payment');
  }

  // Balloon term analysis
  if (balloonTerm <= 3) {
    warnings.push('Short balloon term requires quick exit strategy execution');
  } else if (balloonTerm >= 8) {
    warnings.push('Long balloon term increases market uncertainty');
  }

  // Interest rate environment
  const rateIncrease = refinanceRate - interestRate;
  if (rateIncrease > 2) {
    warnings.push('Significant rate increase expected - high refinancing risk');
  } else if (rateIncrease > 1) {
    warnings.push('Moderate rate increase expected - plan for higher payments');
  }

  // Property appreciation expectations
  if (expectedAppreciation < 0) {
    warnings.push('Negative appreciation expected - increases balloon payment risk');
  } else if (expectedAppreciation > 6) {
    warnings.push('High appreciation expectations may be optimistic');
  }

  // Balloon type analysis
  if (balloonType === 'interest-only') {
    warnings.push('Interest-only structure provides no principal paydown - higher risk');
    recommendations.push('Ensure strong exit strategy for interest-only balloon');
  }

  // Exit strategy validation
  if (exitStrategy === 'extend') {
    warnings.push('Loan extension is not guaranteed - have backup plan');
  } else if (exitStrategy === 'cash') {
    recommendations.push('Ensure sufficient liquidity will be available at balloon date');
  }

  // LTV projection
  const propertyValue = loanAmount + downPayment;
  const futureValue = propertyValue * Math.pow(1 + expectedAppreciation / 100, balloonTerm);
  const netLoanAmount = loanAmount - downPayment;
  
  // Estimate balloon payment (simplified)
  let estimatedBalloon: number;
  if (balloonType === 'interest-only') {
    estimatedBalloon = netLoanAmount;
  } else {
    // Rough estimate for amortizing balloon
    const monthlyPayment = netLoanAmount * (interestRate / 100 / 12) * Math.pow(1 + interestRate / 100 / 12, amortizationPeriod * 12) / (Math.pow(1 + interestRate / 100 / 12, amortizationPeriod * 12) - 1);
    const paymentsToMake = balloonTerm * 12;
    estimatedBalloon = netLoanAmount * Math.pow(1 + interestRate / 100 / 12, paymentsToMake) - monthlyPayment * (Math.pow(1 + interestRate / 100 / 12, paymentsToMake) - 1) / (interestRate / 100 / 12);
  }

  const projectedLTV = (estimatedBalloon / futureValue) * 100;
  if (projectedLTV > 90) {
    warnings.push(`Projected LTV at balloon (${projectedLTV.toFixed(1)}%) may prevent refinancing`);
  } else if (projectedLTV > 80) {
    warnings.push(`Projected LTV at balloon (${projectedLTV.toFixed(1)}%) may require PMI for refinancing`);
  }

  // Risk level assessment
  let riskFactors = 0;
  if (balloonTerm >= 7) riskFactors++;
  if (downPaymentPercent < 15) riskFactors++;
  if (rateIncrease > 1) riskFactors++;
  if (balloonType === 'interest-only') riskFactors++;
  if (expectedAppreciation < 2) riskFactors++;

  if (riskFactors >= 3) {
    warnings.push('High-risk balloon mortgage - consider alternatives');
  } else if (riskFactors >= 2) {
    warnings.push('Moderate-risk balloon mortgage - ensure solid exit strategy');
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
    recommendations
  };
}