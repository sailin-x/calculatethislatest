import { ValidationRule } from '../../types/Calculator';

export const armMortgageValidationRules: ValidationRule[] = [
  {
    field: 'loanAmount',
    type: 'required',
    message: 'Loan amount is required'
  },
  {
    field: 'loanAmount',
    type: 'min',
    value: 1000,
    message: 'Loan amount must be at least $1,000'
  },
  {
    field: 'loanAmount',
    type: 'max',
    value: 10000000,
    message: 'Loan amount cannot exceed $10 million'
  },
  {
    field: 'initialRate',
    type: 'required',
    message: 'Initial interest rate is required'
  },
  {
    field: 'initialRate',
    type: 'min',
    value: 0.1,
    message: 'Initial rate must be at least 0.1%'
  },
  {
    field: 'initialRate',
    type: 'max',
    value: 20,
    message: 'Initial rate cannot exceed 20%'
  },
  {
    field: 'initialPeriod',
    type: 'required',
    message: 'Initial rate period is required'
  },
  {
    field: 'initialPeriod',
    type: 'min',
    value: 1,
    message: 'Initial period must be at least 1 year'
  },
  {
    field: 'initialPeriod',
    type: 'max',
    value: 10,
    message: 'Initial period cannot exceed 10 years'
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
    field: 'indexRate',
    type: 'required',
    message: 'Index rate is required'
  },
  {
    field: 'indexRate',
    type: 'min',
    value: 0,
    message: 'Index rate cannot be negative'
  },
  {
    field: 'indexRate',
    type: 'max',
    value: 15,
    message: 'Index rate cannot exceed 15%'
  },
  {
    field: 'margin',
    type: 'required',
    message: 'Margin is required'
  },
  {
    field: 'margin',
    type: 'min',
    value: 0.5,
    message: 'Margin must be at least 0.5%'
  },
  {
    field: 'margin',
    type: 'max',
    value: 10,
    message: 'Margin cannot exceed 10%'
  },
  {
    field: 'periodicCap',
    type: 'min',
    value: 0.25,
    message: 'Periodic cap must be at least 0.25%'
  },
  {
    field: 'periodicCap',
    type: 'max',
    value: 5,
    message: 'Periodic cap cannot exceed 5%'
  },
  {
    field: 'lifetimeCap',
    type: 'min',
    value: 1,
    message: 'Lifetime cap must be at least 1%'
  },
  {
    field: 'lifetimeCap',
    type: 'max',
    value: 10,
    message: 'Lifetime cap cannot exceed 10%'
  },
  {
    field: 'adjustmentFrequency',
    type: 'min',
    value: 1,
    message: 'Adjustment frequency must be at least 1 year'
  },
  {
    field: 'adjustmentFrequency',
    type: 'max',
    value: 5,
    message: 'Adjustment frequency cannot exceed 5 years'
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
  // Cross-field validations
  {
    field: 'initialPeriod',
    type: 'custom',
    validator: (value, allInputs) => {
      const initialPeriod = Number(value);
      const loanTerm = Number(allInputs.loanTerm) || 30;
      return initialPeriod < loanTerm;
    },
    message: 'Initial period must be less than loan term'
  },
  {
    field: 'periodicCap',
    type: 'custom',
    validator: (value, allInputs) => {
      const periodicCap = Number(value) || 0;
      const lifetimeCap = Number(allInputs?.lifetimeCap) || 0;
      return periodicCap <= lifetimeCap;
    },
    message: 'Periodic cap cannot exceed lifetime cap'
  },
  {
    field: 'margin',
    type: 'custom',
    validator: (value, allInputs) => {
      const margin = Number(value) || 0;
      const indexRate = Number(allInputs?.indexRate) || 0;
      const fullyIndexed = indexRate + margin;
      return fullyIndexed <= 0.25; // 25% max fully indexed rate
    },
    message: 'Index rate + margin cannot exceed 25%'
  },
  {
    field: 'initialRate',
    type: 'custom',
    validator: (value, allInputs) => {
      const initialRate = Number(value) || 0;
      const indexRate = Number(allInputs?.indexRate) || 0;
      const margin = Number(allInputs?.margin) || 0;
      const fullyIndexed = indexRate + margin;
      
      // Warn if initial rate is significantly below fully indexed (teaser rate)
      return initialRate >= fullyIndexed - 0.03; // Within 3% is reasonable
    },
    message: 'Initial rate is significantly below index + margin - this may be a teaser rate'
  }
];

export const armMortgageBusinessRules = {
  // Typical ARM structures
  commonARMTypes: [
    { name: '3/1 ARM', initialPeriod: 3, adjustmentFreq: 1 },
    { name: '5/1 ARM', initialPeriod: 5, adjustmentFreq: 1 },
    { name: '7/1 ARM', initialPeriod: 7, adjustmentFreq: 1 },
    { name: '10/1 ARM', initialPeriod: 10, adjustmentFreq: 1 },
    { name: '5/5 ARM', initialPeriod: 5, adjustmentFreq: 5 }
  ],
  
  // Typical rate caps
  typicalPeriodicCaps: [1, 2, 2.5], // 1%, 2%, 2.5%
  typicalLifetimeCaps: [5, 6], // 5%, 6%
  
  // Typical margins by index
  marginRanges: {
    'SOFR': { min: 2.0, max: 4.0 },
    'Treasury': { min: 2.25, max: 3.5 },
    'LIBOR': { min: 2.0, max: 4.0 }, // Legacy
    'Prime': { min: 0, max: 2.0 }
  },
  
  // Risk thresholds
  paymentShockThresholds: {
    low: 15, // <15% increase
    moderate: 30, // 15-30% increase
    high: 50, // 30-50% increase
    extreme: 50 // >50% increase
  },
  
  // Regulatory requirements
  minimumInitialPeriod: 2, // Years
  maximumLifetimeCap: 10, // Percent
  maximumPeriodicCap: 5, // Percent
  
  // QM (Qualified Mortgage) considerations
  qmRequirements: {
    maxPaymentShock: 50, // Percent
    minInitialPeriod: 5, // Years for QM ARMs
    requiresAbilityToRepay: true
  }
};

/**
 * Validate ARM structure for regulatory compliance and best practices
 */
export function validateARMCompliance(inputs: any): {
  isCompliant: boolean;
  isQualifiedMortgage: boolean;
  warnings: string[];
  violations: string[];
  recommendations: string[];
} {
  const warnings: string[] = [];
  const violations: string[] = [];
  const recommendations: string[] = [];
  
  const loanAmount = Number(inputs.loanAmount) || 0;
  const initialRate = Number(inputs.initialRate) || 0;
  const initialPeriod = Number(inputs.initialPeriod) || 0;
  const indexRate = Number(inputs.indexRate) || 0;
  const margin = Number(inputs.margin) || 0;
  const periodicCap = Number(inputs.periodicCap) || 0;
  const lifetimeCap = Number(inputs.lifetimeCap) || 0;
  
  // Check minimum initial period
  if (initialPeriod < armMortgageBusinessRules.minimumInitialPeriod) {
    violations.push(`Initial period (${initialPeriod} years) below regulatory minimum (${armMortgageBusinessRules.minimumInitialPeriod} years)`);
  }
  
  // Check rate caps
  if (periodicCap > armMortgageBusinessRules.maximumPeriodicCap) {
    violations.push(`Periodic cap (${periodicCap}%) exceeds maximum (${armMortgageBusinessRules.maximumPeriodicCap}%)`);
  }
  
  if (lifetimeCap > armMortgageBusinessRules.maximumLifetimeCap) {
    violations.push(`Lifetime cap (${lifetimeCap}%) exceeds maximum (${armMortgageBusinessRules.maximumLifetimeCap}%)`);
  }
  
  // Check for teaser rates
  const fullyIndexedRate = indexRate + margin;
  const teaserDifference = fullyIndexedRate - initialRate;
  if (teaserDifference > 2) {
    warnings.push(`Large teaser rate discount (${teaserDifference.toFixed(2)}%) - expect significant payment increase`);
  }
  
  // Check margin reasonableness
  if (margin < 2.0) {
    warnings.push('Margin below typical range (2-4%) - verify lender terms');
  } else if (margin > 4.0) {
    warnings.push('Margin above typical range (2-4%) - may indicate higher risk loan');
  }
  
  // Calculate payment shock
  const initialPayment = calculateARMPayment(loanAmount, initialRate, 30);
  const maxPayment = calculateARMPayment(loanAmount, initialRate + lifetimeCap, 30);
  const paymentShock = ((maxPayment - initialPayment) / initialPayment) * 100;
  
  if (paymentShock > armMortgageBusinessRules.qmRequirements.maxPaymentShock) {
    violations.push(`Payment shock (${paymentShock.toFixed(1)}%) exceeds QM limit (${armMortgageBusinessRules.qmRequirements.maxPaymentShock}%)`);
  } else if (paymentShock > armMortgageBusinessRules.paymentShockThresholds.high) {
    warnings.push(`High payment shock potential (${paymentShock.toFixed(1)}%)`);
  }
  
  // QM compliance check
  const isQualifiedMortgage = 
    initialPeriod >= armMortgageBusinessRules.qmRequirements.minInitialPeriod &&
    paymentShock <= armMortgageBusinessRules.qmRequirements.maxPaymentShock &&
    periodicCap <= 2 && // QM typically requires 2% or less
    lifetimeCap <= 6; // QM typically requires 6% or less
  
  // Generate recommendations
  if (!isQualifiedMortgage) {
    recommendations.push('Consider QM-compliant ARM structure for broader lender acceptance');
  }
  
  if (initialPeriod < 5) {
    recommendations.push('Consider longer initial period (5-7 years) for more payment stability');
  }
  
  if (paymentShock > 25) {
    recommendations.push('Ensure borrower can qualify at maximum payment amount');
  }
  
  recommendations.push('Compare with fixed-rate mortgage to evaluate trade-offs');
  recommendations.push('Consider interest rate environment and future trends');
  
  return {
    isCompliant: violations.length === 0,
    isQualifiedMortgage,
    warnings,
    violations,
    recommendations
  };
}

/**
 * Helper function to calculate ARM payment
 */
function calculateARMPayment(principal: number, annualRate: number, termYears: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = termYears * 12;
  
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  return principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
}