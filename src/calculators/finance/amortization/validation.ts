import { ValidationRule } from '../../types/Calculator';

export const amortizationValidationRules: ValidationRule[] = [
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
    value: 50000000,
    message: 'Loan amount cannot exceed $50 million'
  },
  {
    field: 'interestRate',
    type: 'required',
    message: 'Interest rate is required'
  },
  {
    field: 'interestRate',
    type: 'min',
    value: 0.1,
    message: 'Interest rate must be at least 0.1%'
  },
  {
    field: 'interestRate',
    type: 'max',
    value: 30,
    message: 'Interest rate cannot exceed 30%'
  },
  {
    field: 'loanTerm',
    type: 'required',
    message: 'Loan term is required'
  },
  {
    field: 'loanTerm',
    type: 'min',
    value: 1,
    message: 'Loan term must be at least 1 year'
  },
  {
    field: 'loanTerm',
    type: 'max',
    value: 50,
    message: 'Loan term cannot exceed 50 years'
  },
  {
    field: 'extraPayment',
    type: 'min',
    value: 0,
    message: 'Extra payment cannot be negative'
  },
  {
    field: 'extraPayment',
    type: 'custom',
    validator: (value, allInputs) => {
      const extraPayment = Number(value) || 0;
      const loanAmount = Number(allInputs.loanAmount) || 0;
      return extraPayment <= loanAmount;
    },
    message: 'Extra payment cannot exceed loan amount'
  },
  {
    field: 'extraPaymentStart',
    type: 'min',
    value: 1,
    message: 'Extra payment start month must be at least 1'
  },
  {
    field: 'extraPaymentStart',
    type: 'custom',
    validator: (value, allInputs) => {
      const startMonth = Number(value) || 1;
      const loanTerm = Number(allInputs.loanTerm) || 30;
      const paymentFreq = allInputs.paymentFrequency || 'monthly';
      
      const frequencyMap = {
        'monthly': 12,
        'biweekly': 26,
        'weekly': 52,
        'quarterly': 4
      };
      
      const totalPayments = loanTerm * (frequencyMap[paymentFreq] || 12);
      return startMonth <= totalPayments;
    },
    message: 'Extra payment start month cannot exceed total loan payments'
  },
  {
    field: 'oneTimePayment',
    type: 'min',
    value: 0,
    message: 'One-time payment cannot be negative'
  },
  {
    field: 'oneTimePayment',
    type: 'custom',
    validator: (value, allInputs) => {
      const oneTimePayment = Number(value) || 0;
      const loanAmount = Number(allInputs.loanAmount) || 0;
      return oneTimePayment <= loanAmount;
    },
    message: 'One-time payment cannot exceed loan amount'
  },
  {
    field: 'oneTimePaymentMonth',
    type: 'min',
    value: 1,
    message: 'One-time payment month must be at least 1'
  },
  {
    field: 'oneTimePaymentMonth',
    type: 'custom',
    validator: (value, allInputs) => {
      const paymentMonth = Number(value) || 1;
      const loanTerm = Number(allInputs.loanTerm) || 30;
      const paymentFreq = allInputs.paymentFrequency || 'monthly';
      
      const frequencyMap = {
        'monthly': 12,
        'biweekly': 26,
        'weekly': 52,
        'quarterly': 4
      };
      
      const totalPayments = loanTerm * (frequencyMap[paymentFreq] || 12);
      return paymentMonth <= totalPayments;
    },
    message: 'One-time payment month cannot exceed total loan payments'
  },
  // Cross-field validations
  {
    field: 'extraPayment',
    type: 'custom',
    validator: (value, allInputs) => {
      const extraPayment = Number(value) || 0;
      const loanAmount = Number(allInputs.loanAmount) || 0;
      const interestRate = Number(allInputs.interestRate) || 0;
      const loanTerm = Number(allInputs.loanTerm) || 30;
      
      if (extraPayment === 0) return true;
      
      // Calculate standard monthly payment
      const monthlyRate = (interestRate / 100) / 12;
      const totalPayments = loanTerm * 12;
      const monthlyPayment = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
      
      // Extra payment shouldn't exceed 5x the regular payment
      return extraPayment <= monthlyPayment * 5;
    },
    message: 'Extra payment seems unusually high compared to regular payment'
  },
  {
    field: 'startDate',
    type: 'custom',
    validator: (value, allInputs) => {
      if (!value) return true; // Optional field
      const date = new Date(value);
      const now = new Date();
      const maxFutureDate = new Date();
      maxFutureDate.setFullYear(now.getFullYear() + 1);
      
      return date >= new Date('19000101') && date <= maxFutureDate;
    },
    message: 'Start date must be between 1900 and one year from now'
  }
];

export const amortizationBusinessRules = {
  // Common loan terms (years)
  commonLoanTerms: [15, 20, 25, 30, 40],
  
  // Typical interest rate ranges by loan type
  interestRateRanges: {
    mortgage: { min: 2.0, max: 8.0 },
    auto: { min: 3.0, max: 15.0 },
    personal: { min: 5.0, max: 25.0 },
    student: { min: 3.0, max: 12.0 }
  },
  
  // Payment frequency options
  paymentFrequencies: [
    { value: 'monthly', label: 'Monthly (12/year)', multiplier: 12 },
    { value: 'biweekly', label: 'Bi-weekly (26/year)', multiplier: 26 },
    { value: 'weekly', label: 'Weekly (52/year)', multiplier: 52 },
    { value: 'quarterly', label: 'Quarterly (4/year)', multiplier: 4 }
  ],
  
  // Compounding frequency options
  compoundingFrequencies: [
    { value: 'daily', label: 'Daily (365/year)' },
    { value: 'monthly', label: 'Monthly (12/year)' },
    { value: 'annually', label: 'Annually (1/year)' }
  ],
  
  // Validation thresholds
  maxExtraPaymentRatio: 5.0, // 5x regular payment
  maxLoanAmount: 50000000, // $50M
  minLoanAmount: 1000, // $1K
  maxInterestRate: 30, // 30%
  minInterestRate: 0.1, // 0.1%
  maxLoanTerm: 50, // 50 years
  minLoanTerm: 1, // 1 year
  
  // Performance thresholds
  maxScheduleLength: 3000, // Maximum payments to calculate
  maxYearsToCalculate: 100 // Maximum years for any calculation
};

/**
 * Validate amortization inputs for reasonableness and performance
 */
export function validateAmortizationInputs(inputs: any): {
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
  const loanTerm = Number(inputs.loanTerm) || 0;
  const extraPayment = Number(inputs.extraPayment) || 0;
  const oneTimePayment = Number(inputs.oneTimePayment) || 0;
  const paymentFreq = inputs.paymentFrequency || 'monthly';

  // Validate loan amount
  if (loanAmount < amortizationBusinessRules.minLoanAmount) {
    errors.push(`Loan amount below minimum ($${amortizationBusinessRules.minLoanAmount.toLocaleString()})`);
  }
  
  if (loanAmount > amortizationBusinessRules.maxLoanAmount) {
    errors.push(`Loan amount exceeds maximum ($${amortizationBusinessRules.maxLoanAmount.toLocaleString()})`);
  }

  // Validate interest rate
  if (interestRate < amortizationBusinessRules.minInterestRate) {
    errors.push(`Interest rate below minimum (${amortizationBusinessRules.minInterestRate}%)`);
  }
  
  if (interestRate > amortizationBusinessRules.maxInterestRate) {
    errors.push(`Interest rate exceeds maximum (${amortizationBusinessRules.maxInterestRate}%)`);
  }

  // Check for reasonable interest rates
  if (interestRate > 15 && interestRate <= 30) {
    warnings.push('High interest rate - verify this is correct');
  }
  
  if (interestRate < 1) {
    warnings.push('Very low interest rate - verify this is correct');
  }

  // Validate loan term
  if (loanTerm < amortizationBusinessRules.minLoanTerm) {
    errors.push(`Loan term below minimum (${amortizationBusinessRules.minLoanTerm} year)`);
  }
  
  if (loanTerm > amortizationBusinessRules.maxLoanTerm) {
    errors.push(`Loan term exceeds maximum (${amortizationBusinessRules.maxLoanTerm} years)`);
  }

  // Check for common loan terms
  if (!amortizationBusinessRules.commonLoanTerms.includes(loanTerm) && loanTerm <= 40) {
    recommendations.push(`Consider common loan terms: ${amortizationBusinessRules.commonLoanTerms.join(', ')} years`);
  }

  // Validate extra payments
  if (extraPayment > 0 || oneTimePayment > 0) {
    // Calculate standard monthly payment for comparison
    const monthlyRate = (interestRate / 100) / 12;
    const totalPayments = loanTerm * 12;
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    if (extraPayment > monthlyPayment * amortizationBusinessRules.maxExtraPaymentRatio) {
      warnings.push(`Extra payment (${extraPayment.toLocaleString()}) is very high compared to regular payment (${monthlyPayment.toLocaleString()})`);
    }

    if (oneTimePayment > loanAmount * 0.5) {
      warnings.push('One-time payment exceeds 50% of loan amount');
    }

    // Recommendations for extra payments
    if (extraPayment > 0) {
      recommendations.push('Extra payments reduce total interest and loan term');
    }
    
    if (paymentFreq === 'monthly' && extraPayment === 0) {
      recommendations.push('Consider biweekly payments or extra monthly payments to save interest');
    }
  }

  // Payment frequency recommendations
  if (paymentFreq === 'biweekly') {
    recommendations.push('Biweekly payments typically save significant interest over loan life');
  }
  
  if (paymentFreq === 'weekly') {
    warnings.push('Weekly payments may be difficult to manage - ensure this fits your budget cycle');
  }

  // Performance warnings
  const frequencyMultiplier = amortizationBusinessRules.paymentFrequencies.find(f => f.value === paymentFreq)?.multiplier || 12;
  const estimatedPayments = loanTerm * frequencyMultiplier;
  
  if (estimatedPayments > amortizationBusinessRules.maxScheduleLength) {
    warnings.push('Large number of payments may affect calculation performance');
  }

  // Date validation
  if (inputs.startDate) {
    const startDate = new Date(inputs.startDate);
    const currentYear = new Date().getFullYear();
    
    if (startDate.getFullYear() < currentYear - 1) {
      warnings.push('Start date is in the past - results may not reflect current situation');
    }
    
    if (startDate.getFullYear() > currentYear + 1) {
      warnings.push('Start date is far in the future');
    }
  }

  // Generate additional recommendations
  if (loanTerm === 30 && interestRate > 5) {
    recommendations.push('Consider 15-year term to save significant interest despite higher payments');
  }
  
  if (extraPayment === 0 && oneTimePayment === 0) {
    recommendations.push('Even small extra payments can significantly reduce total interest');
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
    recommendations
  };
}

/**
 * Suggest optimal payment strategies
 */
export function suggestPaymentStrategies(inputs: any): {
  strategies: Array<{
    name: string;
    description: string;
    estimatedSavings: string;
    recommendation: string;
  }>;
} {
  const loanAmount = Number(inputs.loanAmount) || 0;
  const interestRate = Number(inputs.interestRate) || 0;
  const loanTerm = Number(inputs.loanTerm) || 0;
  
  const strategies = [];

  // Calculate standard monthly payment
  const monthlyRate = (interestRate / 100) / 12;
  const totalPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);

  // Strategy 1: Extra $100/month
  const extra100 = Math.min(100, monthlyPayment * 0.1);
  strategies.push({
    name: `Extra $${extra100}/month`,
    description: `Add $${extra100} to each monthly payment`,
    estimatedSavings: 'Save 2-4 years and $15,000-$40,000 in interest',
    recommendation: 'Good starting point for extra payments'
  });

  // Strategy 2: Biweekly payments
  strategies.push({
    name: 'Biweekly Payments',
    description: 'Pay half the monthly amount every two weeks',
    estimatedSavings: 'Save 4-6 years and $30,000-$80,000 in interest',
    recommendation: 'Excellent strategy if you get paid biweekly'
  });

  // Strategy 3: Round up payments
  const roundedPayment = Math.ceil(monthlyPayment / 100) * 100;
  const roundUpAmount = roundedPayment - monthlyPayment;
  strategies.push({
    name: 'Round Up Payments',
    description: `Round payment to $${roundedPayment} (extra $${roundUpAmount.toFixed(2)})`,
    estimatedSavings: 'Save 1-2 years and $8,000-$20,000 in interest',
    recommendation: 'Simple way to make consistent extra payments'
  });

  // Strategy 4: Annual bonus payment
  const bonusPayment = Math.min(5000, monthlyPayment * 3);
  strategies.push({
    name: 'Annual Bonus Payment',
    description: `Make one extra payment of $${bonusPayment} per year`,
    estimatedSavings: 'Save 3-5 years and $20,000-$50,000 in interest',
    recommendation: 'Great use of tax refunds or bonuses'
  });

  return { strategies };
}