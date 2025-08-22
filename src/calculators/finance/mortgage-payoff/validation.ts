import { CalculatorInputs } from '../../../types/calculator';

export interface MortgagePayoffInputs extends CalculatorInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  remainingTerm?: number;
  monthlyPayment?: number;
  additionalPayment?: number;
  lumpSumPayment?: number;
  lumpSumDate?: string;
  biweeklyPayment?: boolean;
  refinanceOption?: string;
  refinanceRate?: number;
  refinanceTerm?: number;
  refinanceClosingCosts?: number;
  investmentReturn?: number;
  taxRate?: number;
  inflationRate?: number;
  extraPaymentFrequency?: string;
  paymentIncrease?: number;
  payoffGoal?: number;
  analysisPeriod?: number;
  scenarioComparison?: boolean;
  includeTaxBenefits?: boolean;
  includeOpportunityCost?: boolean;
  propertyValue?: number;
  propertyAppreciation?: number;
}

export const validateMortgagePayoffInputs = (inputs: Partial<MortgagePayoffInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount is required and must be greater than 0');
  }

  if (!inputs.interestRate || inputs.interestRate <= 0) {
    errors.push('Interest rate is required and must be greater than 0');
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.push('Loan term is required and must be greater than 0');
  }

  // Range validation
  if (inputs.loanAmount && (inputs.loanAmount < 10000 || inputs.loanAmount > 5000000)) {
    errors.push('Loan amount must be between $10,000 and $5,000,000');
  }

  if (inputs.interestRate && (inputs.interestRate < 0 || inputs.interestRate > 25)) {
    errors.push('Interest rate must be between 0% and 25%');
  }

  if (inputs.loanTerm && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  if (inputs.remainingTerm && (inputs.remainingTerm < 1 || inputs.remainingTerm > 50)) {
    errors.push('Remaining term must be between 1 and 50 years');
  }

  if (inputs.monthlyPayment && (inputs.monthlyPayment < 100 || inputs.monthlyPayment > 50000)) {
    errors.push('Monthly payment must be between $100 and $50,000');
  }

  if (inputs.additionalPayment && (inputs.additionalPayment < 0 || inputs.additionalPayment > 10000)) {
    errors.push('Additional payment must be between $0 and $10,000 per month');
  }

  if (inputs.lumpSumPayment && (inputs.lumpSumPayment < 0 || inputs.lumpSumPayment > 1000000)) {
    errors.push('Lump sum payment must be between $0 and $1,000,000');
  }

  if (inputs.refinanceRate && (inputs.refinanceRate < 0 || inputs.refinanceRate > 25)) {
    errors.push('Refinance rate must be between 0% and 25%');
  }

  if (inputs.refinanceTerm && (inputs.refinanceTerm < 1 || inputs.refinanceTerm > 50)) {
    errors.push('Refinance term must be between 1 and 50 years');
  }

  if (inputs.refinanceClosingCosts && (inputs.refinanceClosingCosts < 0 || inputs.refinanceClosingCosts > 50000)) {
    errors.push('Refinance closing costs must be between $0 and $50,000');
  }

  if (inputs.investmentReturn && (inputs.investmentReturn < 0 || inputs.investmentReturn > 15)) {
    errors.push('Investment return must be between 0% and 15%');
  }

  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  if (inputs.inflationRate && (inputs.inflationRate < 0 || inputs.inflationRate > 10)) {
    errors.push('Inflation rate must be between 0% and 10%');
  }

  if (inputs.paymentIncrease && (inputs.paymentIncrease < 0 || inputs.paymentIncrease > 100)) {
    errors.push('Payment increase must be between 0% and 100%');
  }

  if (inputs.payoffGoal && (inputs.payoffGoal < 1 || inputs.payoffGoal > 50)) {
    errors.push('Payoff goal must be between 1 and 50 years');
  }

  if (inputs.analysisPeriod && (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50)) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  if (inputs.propertyValue && (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000)) {
    errors.push('Property value must be between $10,000 and $10,000,000');
  }

  if (inputs.propertyAppreciation && (inputs.propertyAppreciation < -10 || inputs.propertyAppreciation > 20)) {
    errors.push('Property appreciation must be between -10% and 20%');
  }

  // Logical validation
  if (inputs.remainingTerm && inputs.loanTerm && inputs.remainingTerm > inputs.loanTerm) {
    errors.push('Remaining term cannot exceed original loan term');
  }

  if (inputs.lumpSumPayment && inputs.loanAmount && inputs.lumpSumPayment > inputs.loanAmount) {
    errors.push('Lump sum payment cannot exceed loan amount');
  }

  if (inputs.payoffGoal && inputs.remainingTerm && inputs.payoffGoal > inputs.remainingTerm) {
    errors.push('Payoff goal cannot exceed remaining term');
  }

  if (inputs.refinanceTerm && inputs.remainingTerm && inputs.refinanceTerm > inputs.remainingTerm) {
    errors.push('Refinance term cannot exceed remaining term');
  }

  // Monthly payment validation
  if (inputs.monthlyPayment && inputs.loanAmount && inputs.interestRate && inputs.loanTerm) {
    const monthlyRate = inputs.interestRate / 100 / 12;
    const totalPayments = inputs.loanTerm * 12;
    const calculatedPayment = (inputs.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                              (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const difference = Math.abs(inputs.monthlyPayment - calculatedPayment);
    if (difference > calculatedPayment * 0.1) {
      errors.push('Monthly payment seems inconsistent with loan amount, interest rate, and term');
    }
  }

  // Refinance option validation
  if (inputs.refinanceOption) {
    const validOptions = ['No Refinance', 'Lower Rate', 'Shorter Term', 'Both'];
    if (!validOptions.includes(inputs.refinanceOption)) {
      errors.push('Invalid refinance option selected');
    }
  }

  // Extra payment frequency validation
  if (inputs.extraPaymentFrequency) {
    const validFrequencies = ['Monthly', 'Quarterly', 'Annually', 'One-time'];
    if (!validFrequencies.includes(inputs.extraPaymentFrequency)) {
      errors.push('Invalid extra payment frequency selected');
    }
  }

  // Date validation
  if (inputs.lumpSumDate) {
    const lumpSumDate = new Date(inputs.lumpSumDate);
    const today = new Date();
    if (lumpSumDate < today) {
      errors.push('Lump sum date cannot be in the past');
    }
  }

  // Refinance logic validation
  if (inputs.refinanceOption && inputs.refinanceOption !== 'No Refinance') {
    if (inputs.refinanceOption === 'Lower Rate' && (!inputs.refinanceRate || inputs.refinanceRate >= inputs.interestRate)) {
      errors.push('Refinance rate must be lower than current rate for "Lower Rate" option');
    }
    
    if (inputs.refinanceOption === 'Shorter Term' && (!inputs.refinanceTerm || inputs.refinanceTerm >= inputs.remainingTerm)) {
      errors.push('Refinance term must be shorter than remaining term for "Shorter Term" option');
    }
    
    if (inputs.refinanceOption === 'Both') {
      if (!inputs.refinanceRate || inputs.refinanceRate >= inputs.interestRate) {
        errors.push('Refinance rate must be lower than current rate for "Both" option');
      }
      if (!inputs.refinanceTerm || inputs.refinanceTerm >= inputs.remainingTerm) {
        errors.push('Refinance term must be shorter than remaining term for "Both" option');
      }
    }
  }

  // Payment increase validation
  if (inputs.paymentIncrease && inputs.paymentIncrease > 50) {
    errors.push('Payment increase of more than 50% may not be sustainable');
  }

  // Opportunity cost validation
  if (inputs.includeOpportunityCost && !inputs.investmentReturn) {
    errors.push('Investment return rate is required when including opportunity cost');
  }

  // Tax benefits validation
  if (inputs.includeTaxBenefits && !inputs.taxRate) {
    errors.push('Tax rate is required when including tax benefits');
  }

  // Property value validation
  if (inputs.propertyValue && inputs.loanAmount && inputs.propertyValue < inputs.loanAmount) {
    errors.push('Property value cannot be less than loan amount');
  }

  // Analysis period validation
  if (inputs.analysisPeriod && inputs.remainingTerm && inputs.analysisPeriod > inputs.remainingTerm) {
    errors.push('Analysis period cannot exceed remaining term');
  }

  // Biweekly payment validation
  if (inputs.biweeklyPayment && inputs.monthlyPayment) {
    const biweeklyEquivalent = inputs.monthlyPayment * 12 / 26;
    if (biweeklyEquivalent > inputs.monthlyPayment * 0.6) {
      errors.push('Biweekly payment amount seems unusually high');
    }
  }

  // Lump sum payment validation
  if (inputs.lumpSumPayment && inputs.loanAmount) {
    const lumpSumPercentage = (inputs.lumpSumPayment / inputs.loanAmount) * 100;
    if (lumpSumPercentage > 50) {
      errors.push('Lump sum payment of more than 50% of loan amount may trigger prepayment penalties');
    }
  }

  // Refinance closing costs validation
  if (inputs.refinanceClosingCosts && inputs.loanAmount) {
    const closingCostPercentage = (inputs.refinanceClosingCosts / inputs.loanAmount) * 100;
    if (closingCostPercentage > 5) {
      errors.push('Refinance closing costs seem unusually high (more than 5% of loan amount)');
    }
  }

  return { isValid: errors.length === 0, errors };
};