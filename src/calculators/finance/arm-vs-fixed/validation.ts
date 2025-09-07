import { ValidationRule } from '../../../types/calculator';

export const armVsFixedValidationRules: ValidationRule[] = [
  {
    field: 'loanAmount',
    type: 'required',
    message: 'Loan amount is required'
  },
  {
    field: 'loanAmount',
    type: 'min',
    value: 10000,
    message: 'Loan amount must be at least $10,000'
  },
  {
    field: 'loanAmount',
    type: 'max',
    value: 10000000,
    message: 'Loan amount cannot exceed $10 million'
  },
  {
    field: 'fixedRate',
    type: 'required',
    message: 'Fixed rate is required'
  },
  {
    field: 'fixedRate',
    type: 'min',
    value: 1,
    message: 'Fixed rate must be at least 1%'
  },
  {
    field: 'fixedRate',
    type: 'max',
    value: 15,
    message: 'Fixed rate cannot exceed 15%'
  },
  {
    field: 'armInitialRate',
    type: 'required',
    message: 'ARM initial rate is required'
  },
  {
    field: 'armInitialRate',
    type: 'min',
    value: 1,
    message: 'ARM initial rate must be at least 1%'
  },
  {
    field: 'armInitialRate',
    type: 'max',
    value: 15,
    message: 'ARM initial rate cannot exceed 15%'
  },
  {
    field: 'armInitialPeriod',
    type: 'required',
    message: 'ARM initial period is required'
  },
  {
    field: 'armInitialPeriod',
    type: 'min',
    value: 1,
    message: 'ARM initial period must be at least 1 year'
  },
  {
    field: 'armInitialPeriod',
    type: 'max',
    value: 10,
    message: 'ARM initial period cannot exceed 10 years'
  },
  {
    field: 'loanTerm',
    type: 'required',
    message: 'Loan term is required'
  },
  {
    field: 'loanTerm',
    type: 'min',
    value: 15,
    message: 'Loan term must be at least 15 years'
  },
  {
    field: 'loanTerm',
    type: 'max',
    value: 40,
    message: 'Loan term cannot exceed 40 years'
  },
  {
    field: 'armMargin',
    type: 'required',
    message: 'ARM margin is required'
  },
  {
    field: 'armMargin',
    type: 'min',
    value: 1,
    message: 'ARM margin must be at least 1%'
  },
  {
    field: 'armMargin',
    type: 'max',
    value: 6,
    message: 'ARM margin cannot exceed 6%'
  },
  {
    field: 'currentIndex',
    type: 'required',
    message: 'Current index rate is required'
  },
  {
    field: 'currentIndex',
    type: 'min',
    value: 0,
    message: 'Current index rate cannot be negative'
  },
  {
    field: 'currentIndex',
    type: 'max',
    value: 10,
    message: 'Current index rate cannot exceed 10%'
  },
  {
    field: 'armLifetimeCap',
    type: 'min',
    value: 2,
    message: 'ARM lifetime cap must be at least 2%'
  },
  {
    field: 'armLifetimeCap',
    type: 'max',
    value: 10,
    message: 'ARM lifetime cap cannot exceed 10%'
  },
  {
    field: 'armPeriodicCap',
    type: 'min',
    value: 1,
    message: 'ARM periodic cap must be at least 1%'
  },
  {
    field: 'armPeriodicCap',
    type: 'max',
    value: 5,
    message: 'ARM periodic cap cannot exceed 5%'
  },
  {
    field: 'expectedIndexTrend',
    type: 'min',
    value: -2,
    message: 'Expected index trend cannot be less than -2%'
  },
  {
    field: 'expectedIndexTrend',
    type: 'max',
    value: 3,
    message: 'Expected index trend cannot exceed 3%'
  },
  {
    field: 'planToStay',
    type: 'min',
    value: 1,
    message: 'Plan to stay must be at least 1 year'
  },
  {
    field: 'planToStay',
    type: 'max',
    value: 40,
    message: 'Plan to stay cannot exceed 40 years'
  },
  // Cross-field validations
  {
    field: 'armInitialPeriod',
    type: 'custom',
    validator: (value, allInputs) => {
      const initialPeriod = Number(value);
      const loanTerm = Number(allInputs.loanTerm) || 30;
      return initialPeriod < loanTerm;
    },
    message: 'ARM initial period must be less than loan term'
  },
  {
    field: 'armPeriodicCap',
    type: 'custom',
    validator: (value, allInputs) => {
      const periodicCap = Number(value) || 0;
      const lifetimeCap = Number(allInputs.armLifetimeCap) || 0;
      return periodicCap <= lifetimeCap;
    },
    message: 'ARM periodic cap cannot exceed lifetime cap'
  },
  {
    field: 'planToStay',
    type: 'custom',
    validator: (value, allInputs) => {
      const planToStay = Number(value) || 0;
      const loanTerm = Number(allInputs.loanTerm) || 30;
      return planToStay <= loanTerm;
    },
    message: 'Plan to stay cannot exceed loan term'
  },
  {
    field: 'armInitialRate',
    type: 'custom',
    validator: (value, allInputs) => {
      const armRate = Number(value) || 0;
      const fixedRate = Number(allInputs.fixedRate) || 0;
      
      // ARM should typically be lower initially, but allow some flexibility
      return armRate <= fixedRate + 1; // Allow ARM to be up to 1% higher
    },
    message: 'ARM initial rate is unusually high compared to fixed rate'
  },
  {
    field: 'currentIndex',
    type: 'custom',
    validator: (value, allInputs) => {
      const currentIndex = Number(value) || 0;
      const armMargin = Number(allInputs.armMargin) || 0;
      const armInitialRate = Number(allInputs.armInitialRate) || 0;
      
      const fullyIndexedRate = currentIndex + armMargin;
      
      // Warn if fully indexed rate is much higher than initial rate (teaser rate)
      return fullyIndexedRate <= armInitialRate + 2; // Allow up to 2% teaser discount
    },
    message: 'Current index + margin significantly exceeds ARM initial rate - this may be a teaser rate'
  }
];

export const armVsFixedBusinessRules = {
  // Common ARM types
  commonARMTypes: [
    { name: '3/1 ARM', initialPeriod: 3, description: '3 years fixed, then annual adjustments' },
    { name: '5/1 ARM', initialPeriod: 5, description: '5 years fixed, then annual adjustments' },
    { name: '7/1 ARM', initialPeriod: 7, description: '7 years fixed, then annual adjustments' },
    { name: '10/1 ARM', initialPeriod: 10, description: '10 years fixed, then annual adjustments' }
  ],
  
  // Typical rate relationships
  rateRelationships: {
    armDiscountRange: { min: 0.25, max: 1.5 }, // ARM typically 0.25-1.5% below fixed
    maxTeaserDiscount: 2.0, // Maximum reasonable teaser rate discount
    typicalMarginRange: { min: 2.0, max: 4.0 }, // Typical ARM margins
    typicalIndexRange: { min: 1.0, max: 6.0 } // Typical index rates
  },
  
  // Risk thresholds
  riskThresholds: {
    lowPaymentShock: 15, // <15% payment increase
    moderatePaymentShock: 30, // 15-30% payment increase
    highPaymentShock: 50, // 30-50% payment increase
    extremePaymentShock: 50, // >50% payment increase
    
    goodBreakEvenCushion: 100, // >100 basis points
    moderateBreakEvenCushion: 50, // 50-100 basis points
    poorBreakEvenCushion: 0 // <50 basis points
  },
  
  // Decision factors
  decisionFactors: {
    shortTermThreshold: 7, // Years - favor ARM if staying less than this
    longTermThreshold: 15, // Years - favor fixed if staying more than this
    minMonthlySavings: 50, // Minimum monthly savings to consider ARM
    maxAcceptableRisk: {
      low: 20, // Max payment shock for low risk tolerance
      moderate: 35, // Max payment shock for moderate risk tolerance
      high: 60 // Max payment shock for high risk tolerance
    }
  },
  
  // Market conditions
  marketConditions: {
    risingRateEnvironment: {
      indexTrendThreshold: 0.5, // >0.5% annual increase
      recommendation: 'Consider fixed rate in rising rate environment'
    },
    fallingRateEnvironment: {
      indexTrendThreshold: -0.25, // <-0.25% annual decrease
      recommendation: 'ARM may benefit from falling rates'
    }
  }
};

/**
 * Validate ARM vs Fixed comparison inputs for reasonableness
 */
export function validateComparisonInputs(inputs: any): {
  isValid: boolean;
  warnings: string[];
  errors: string[];
  recommendations: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];
  const recommendations: string[] = [];

  const loanAmount = Number(inputs.loanAmount) || 0;
  const fixedRate = Number(inputs.fixedRate) || 0;
  const armInitialRate = Number(inputs.armInitialRate) || 0;
  const armInitialPeriod = Number(inputs.armInitialPeriod) || 0;
  const loanTerm = Number(inputs.loanTerm) || 0;
  const armMargin = Number(inputs.armMargin) || 0;
  const currentIndexRate = Number(inputs.currentIndexRate) || 0;
  const armPeriodicCap = Number(inputs.armPeriodicCap) || 0;
  const armLifetimeCap = Number(inputs.armLifetimeCap) || 0;
  const planToStayYears = Number(inputs.planToStayYears) || 0;

  // Rate reasonableness checks
  const fullyIndexedRate = currentIndexRate + armMargin;
  const rateDifference = Math.abs(armInitialRate - fullyIndexedRate);
  
  if (rateDifference > 2) {
    warnings.push('ARM initial rate significantly differs from index + margin - verify this is a teaser rate');
  }

  if (armInitialRate > fixedRate + 1) {
    warnings.push('ARM initial rate is higher than fixed rate - unusual market condition');
  }

  if (fixedRate < 2 || fixedRate > 10) {
    warnings.push('Fixed rate seems unusual for current market conditions');
  }

  // Time horizon analysis
  if (planToStayYears <= armInitialPeriod) {
    recommendations.push('Consider ARM since you plan to stay within the initial fixed period');
  } else {
    recommendations.push('Carefully consider rate risk since you plan to stay beyond the initial ARM period');
  }

  // Risk assessment
  const maxPossibleRate = armInitialRate + armLifetimeCap;
  const maxPaymentIncrease = ((maxPossibleRate / armInitialRate) - 1) * 100;
  
  if (maxPaymentIncrease > 50) {
    warnings.push(`ARM payment could increase by up to ${maxPaymentIncrease.toFixed(0)}% - high risk`);
  }

  // Cap structure validation
  if (armPeriodicCap > armLifetimeCap) {
    errors.push('Periodic cap cannot exceed lifetime cap');
  }

  if (armLifetimeCap < 2) {
    warnings.push('Lifetime cap seems low - verify ARM terms');
  }

  // Loan structure validation
  if (armInitialPeriod >= loanTerm) {
    errors.push('ARM initial period must be less than loan term');
  }

  if (planToStayYears > loanTerm) {
    errors.push('Plan to stay cannot exceed loan term');
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
    recommendations
  };
}
  const recommendations: string[] = [];
  
  const loanAmount = Number(inputs.loanAmount) || 0;
  const fixedRate = Number(inputs.fixedRate) || 0;
  const armInitialRate = Number(inputs.armInitialRate) || 0;
  const armInitialPeriod = Number(inputs.armInitialPeriod) || 0;
  const armMargin = Number(inputs.armMargin) || 0;
  const currentIndex = Number(inputs.currentIndex) || 0;
  const armLifetimeCap = Number(inputs.armLifetimeCap) || 0;
  const planToStay = Number(inputs.planToStay) || 0;
  const riskTolerance = inputs.riskTolerance || 'moderate';

  // Validate rate relationships
  const armDiscount = fixedRate - armInitialRate;
  if (armDiscount < 0) {
    warnings.push('ARM initial rate is higher than fixed rate - unusual market condition');
  } else if (armDiscount > armVsFixedBusinessRules.rateRelationships.maxTeaserDiscount) {
    warnings.push(`Large ARM discount (${armDiscount.toFixed(2)}%) may indicate teaser rate`);
  }

  // Validate margin reasonableness
  if (armMargin < armVsFixedBusinessRules.rateRelationships.typicalMarginRange.min) {
    warnings.push('ARM margin below typical range (2-4%) - verify terms');
  } else if (armMargin > armVsFixedBusinessRules.rateRelationships.typicalMarginRange.max) {
    warnings.push('ARM margin above typical range (2-4%) - may indicate higher risk');
  }

  // Check for teaser rate situation
  const fullyIndexedRate = currentIndex + armMargin;
  const teaserDiscount = fullyIndexedRate - armInitialRate;
  if (teaserDiscount > armVsFixedBusinessRules.rateRelationships.maxTeaserDiscount) {
    warnings.push(`Significant teaser rate: ARM will adjust from ${armInitialRate.toFixed(2)}% to ${fullyIndexedRate.toFixed(2)}%`);
  }

  // Validate time horizon vs ARM structure
  if (planToStay <= armInitialPeriod) {
    recommendations.push(`Short stay (${planToStay} years) within ARM initial period (${armInitialPeriod} years) favors ARM`);
  } else if (planToStay > armVsFixedBusinessRules.decisionFactors.longTermThreshold) {
    recommendations.push('Long-term ownership typically favors fixed-rate stability');
  }

  // Risk tolerance validation
  const maxPossibleRate = armInitialRate + armLifetimeCap;
  const estimatedPaymentShock = ((maxPossibleRate / armInitialRate) - 1) * 100;
  const maxAcceptableRisk = armVsFixedBusinessRules.decisionFactors.maxAcceptableRisk[riskTolerance];
  
  if (estimatedPaymentShock > maxAcceptableRisk) {
    warnings.push(`Potential payment shock (${estimatedPaymentShock.toFixed(1)}%) exceeds comfort level for ${riskTolerance} risk tolerance`);
  }

  // Market condition analysis
  const expectedTrend = Number(inputs.expectedIndexTrend) || 0;
  if (expectedTrend > armVsFixedBusinessRules.marketConditions.risingRateEnvironment.indexTrendThreshold) {
    recommendations.push(armVsFixedBusinessRules.marketConditions.risingRateEnvironment.recommendation);
  } else if (expectedTrend < armVsFixedBusinessRules.marketConditions.fallingRateEnvironment.indexTrendThreshold) {
    recommendations.push(armVsFixedBusinessRules.marketConditions.fallingRateEnvironment.recommendation);
  }

  // Loan amount considerations
  if (loanAmount > 1000000) {
    recommendations.push('Large loan amounts may benefit from ARM initial savings');
  }

  // Rate environment analysis
  if (fixedRate > 6) {
    recommendations.push('High fixed rates may make ARM more attractive initially');
  } else if (fixedRate < 4) {
    recommendations.push('Low fixed rates reduce ARM advantage');
  }

  // ARM structure recommendations
  const commonARM = armVsFixedBusinessRules.commonARMTypes.find(arm => arm.initialPeriod === armInitialPeriod);
  if (commonARM) {
    recommendations.push(`${commonARM.name}: ${commonARM.description}`);
  }

  // Generate additional recommendations
  if (armDiscount > 0.5 && planToStay <= armInitialPeriod + 2) {
    recommendations.push('ARM offers good savings for your time horizon');
  }
  
  if (riskTolerance === 'low' && estimatedPaymentShock > 25) {
    recommendations.push('Consider fixed rate given low risk tolerance and high payment shock potential');
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
    recommendations
  };
}

/**
 * Generate comparison decision matrix
 */
export function generateDecisionMatrix(inputs: any): {
  factors: Array<{
    factor: string;
    armScore: number;
    fixedScore: number;
    weight: number;
    explanation: string;
  }>;
  totalScores: {
    armScore: number;
    fixedScore: number;
  };
  recommendation: string;
} {
  const factors = [];
  
  const loanAmount = Number(inputs.loanAmount) || 0;
  const fixedRate = Number(inputs.fixedRate) || 0;
  const armInitialRate = Number(inputs.armInitialRate) || 0;
  const armInitialPeriod = Number(inputs.armInitialPeriod) || 0;
  const planToStay = Number(inputs.planToStay) || 0;
  const riskTolerance = inputs.riskTolerance || 'moderate';
  
  // Factor 1: Initial Payment Savings
  const initialSavings = fixedRate - armInitialRate;
  const savingsScore = Math.min(10, Math.max(0, initialSavings * 10));
  factors.push({
    factor: 'Initial Payment Savings',
    armScore: savingsScore,
    fixedScore: 10 - savingsScore,
    weight: 0.25,
    explanation: `ARM saves ${initialSavings.toFixed(2)}% in initial rate`
  });
  
  // Factor 2: Time Horizon
  let timeHorizonArmScore = 0;
  if (planToStay <= armInitialPeriod) {
    timeHorizonArmScore = 10;
  } else if (planToStay <= armInitialPeriod + 3) {
    timeHorizonArmScore = 7;
  } else if (planToStay <= armInitialPeriod + 7) {
    timeHorizonArmScore = 4;
  } else {
    timeHorizonArmScore = 1;
  }
  
  factors.push({
    factor: 'Time Horizon',
    armScore: timeHorizonArmScore,
    fixedScore: 10 - timeHorizonArmScore,
    weight: 0.3,
    explanation: `Planning to stay ${planToStay} years vs ${armInitialPeriod}-year ARM initial period`
  });
  
  // Factor 3: Risk Tolerance
  const riskScores = {
    low: { arm: 2, fixed: 8 },
    moderate: { arm: 5, fixed: 5 },
    high: { arm: 8, fixed: 2 }
  };
  
  const riskScore = riskScores[riskTolerance] || riskScores.moderate;
  factors.push({
    factor: 'Risk Tolerance',
    armScore: riskScore.arm,
    fixedScore: riskScore.fixed,
    weight: 0.2,
    explanation: `${riskTolerance} risk tolerance alignment`
  });
  
  // Factor 4: Rate Environment
  const expectedTrend = Number(inputs.expectedIndexTrend) || 0;
  let rateEnvArmScore = 5;
  if (expectedTrend < -0.25) {
    rateEnvArmScore = 8; // Falling rates favor ARM
  } else if (expectedTrend > 0.75) {
    rateEnvArmScore = 2; // Rising rates favor fixed
  }
  
  factors.push({
    factor: 'Rate Environment',
    armScore: rateEnvArmScore,
    fixedScore: 10 - rateEnvArmScore,
    weight: 0.15,
    explanation: `Expected ${expectedTrend > 0 ? 'rising' : 'falling'} rate environment`
  });
  
  // Factor 5: Payment Stability Preference
  const stabilityScore = riskTolerance === 'low' ? 2 : riskTolerance === 'moderate' ? 5 : 8;
  factors.push({
    factor: 'Payment Stability',
    armScore: stabilityScore,
    fixedScore: 10 - stabilityScore,
    weight: 0.1,
    explanation: 'Preference for payment predictability'
  });
  
  // Calculate weighted scores
  let armTotalScore = 0;
  let fixedTotalScore = 0;
  
  factors.forEach(factor => {
    armTotalScore += factor.armScore * factor.weight;
    fixedTotalScore += factor.fixedScore * factor.weight;
  });
  
  const recommendation = armTotalScore > fixedTotalScore ? 'ARM' : 'Fixed';
  
  return {
    factors,
    totalScores: {
      armScore: armTotalScore,
      fixedScore: fixedTotalScore
    },
    recommendation
  };
}