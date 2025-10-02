import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * Comprehensive validation rules for Mortgage Payoff Calculator
 */
export function validateMortgagePayoffInputs(): ValidationRule[] {
  return [
    // Required field validations
    ValidationRuleFactory.required('loanAmount', 'Loan amount is required'),
    ValidationRuleFactory.required('currentBalance', 'Current balance is required'),
    ValidationRuleFactory.required('interestRate', 'Interest rate is required'),
    ValidationRuleFactory.required('loanTerm', 'Loan term is required'),
    ValidationRuleFactory.required('yearsRemaining', 'Years remaining is required'),
    ValidationRuleFactory.required('monthlyPayment', 'Monthly payment is required'),
    ValidationRuleFactory.required('additionalMonthlyPayment', 'Additional monthly payment is required'),
    ValidationRuleFactory.required('lumpSumPayment', 'Lump sum payment is required'),
    ValidationRuleFactory.required('biweeklyPayment', 'Biweekly payment option is required'),
    ValidationRuleFactory.required('extraPaymentFrequency', 'Extra payment frequency is required'),
    ValidationRuleFactory.required('annualIncome', 'Annual income is required'),
    ValidationRuleFactory.required('emergencyFund', 'Emergency fund is required'),
    ValidationRuleFactory.required('otherDebts', 'Other debts amount is required'),
    ValidationRuleFactory.required('investmentReturn', 'Investment return rate is required'),
    ValidationRuleFactory.required('taxRate', 'Tax rate is required'),
    ValidationRuleFactory.required('inflationRate', 'Inflation rate is required'),
    ValidationRuleFactory.required('homeValue', 'Home value is required'),
    ValidationRuleFactory.required('refinanceRate', 'Refinance rate is required'),
    ValidationRuleFactory.required('refinanceCosts', 'Refinance costs are required'),
    ValidationRuleFactory.required('payoffGoal', 'Payoff goal is required'),
    ValidationRuleFactory.required('targetPayoffDate', 'Target payoff date is required'),
    ValidationRuleFactory.required('prepaymentPenalty', 'Prepayment penalty option is required'),
    ValidationRuleFactory.required('penaltyAmount', 'Penalty amount is required'),
    ValidationRuleFactory.required('state', 'State is required'),

    // Numeric range validations
    ValidationRuleFactory.range('loanAmount', 10000, 10000000, 'Loan amount must be between $10,000 and $10,000,000'),
    ValidationRuleFactory.range('currentBalance', 0, 10000000, 'Current balance must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('interestRate', 0.1, 20, 'Interest rate must be between 0.1% and 20%'),
    ValidationRuleFactory.range('loanTerm', 1, 50, 'Loan term must be between 1 and 50 years'),
    ValidationRuleFactory.range('yearsRemaining', 0, 50, 'Years remaining must be between 0 and 50 years'),
    ValidationRuleFactory.range('monthlyPayment', 0, 50000, 'Monthly payment must be between $0 and $50,000'),
    ValidationRuleFactory.range('additionalMonthlyPayment', 0, 10000, 'Additional monthly payment must be between $0 and $10,000'),
    ValidationRuleFactory.range('lumpSumPayment', 0, 1000000, 'Lump sum payment must be between $0 and $1,000,000'),
    ValidationRuleFactory.range('annualIncome', 0, 10000000, 'Annual income must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('emergencyFund', 0, 1000000, 'Emergency fund must be between $0 and $1,000,000'),
    ValidationRuleFactory.range('otherDebts', 0, 1000000, 'Other debts must be between $0 and $1,000,000'),
    ValidationRuleFactory.range('investmentReturn', 0, 20, 'Investment return must be between 0% and 20%'),
    ValidationRuleFactory.range('taxRate', 0, 50, 'Tax rate must be between 0% and 50%'),
    ValidationRuleFactory.range('inflationRate', 0, 10, 'Inflation rate must be between 0% and 10%'),
    ValidationRuleFactory.range('homeValue', 0, 10000000, 'Home value must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('refinanceRate', 0.1, 20, 'Refinance rate must be between 0.1% and 20%'),
    ValidationRuleFactory.range('refinanceCosts', 0, 100000, 'Refinance costs must be between $0 and $100,000'),
    ValidationRuleFactory.range('penaltyAmount', 0, 100000, 'Penalty amount must be between $0 and $100,000'),

    // Custom validations for select fields
    ValidationRuleFactory.createRule(
      'extraPaymentFrequency',
      'Please select a valid payment frequency',
      (value: any, allInputs?: Record<string, any>) => {
        const validFrequencies = ['monthly', 'quarterly', 'annually', 'one-time'];
        return validFrequencies.includes(value);
      }
    ),

    ValidationRuleFactory.createRule(
      'payoffGoal',
      'Please select a valid payoff goal',
      (value: any, allInputs?: Record<string, any>) => {
        const validGoals = ['minimum-time', 'minimum-cost', 'balanced', 'specific-date'];
        return validGoals.includes(value);
      }
    ),

    ValidationRuleFactory.createRule(
      'state',
      'Please select a valid state',
      (value: any, allInputs?: Record<string, any>) => {
        const validStates = [
          'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
          'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
          'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
          'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
          'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        ];
        return validStates.includes(value);
      }
    ),

    // Cross-field validations
    ValidationRuleFactory.createRule(
      'currentBalance',
      'Current balance cannot exceed original loan amount',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs) return true;
        const currentBalance = allInputs.currentBalance;
        const loanAmount = allInputs.loanAmount;
        if (currentBalance === undefined || loanAmount === undefined) return true;
        return currentBalance <= loanAmount;
      }
    ),

    ValidationRuleFactory.createRule(
      'yearsRemaining',
      'Years remaining cannot exceed original loan term',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs) return true;
        const yearsRemaining = allInputs.yearsRemaining;
        const loanTerm = allInputs.loanTerm;
        if (yearsRemaining === undefined || loanTerm === undefined) return true;
        return yearsRemaining <= loanTerm;
      }
    ),

    ValidationRuleFactory.createRule(
      'lumpSumPayment',
      'Lump sum payment cannot exceed current balance',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs) return true;
        const lumpSum = allInputs.lumpSumPayment;
        const currentBalance = allInputs.currentBalance;
        if (lumpSum === undefined || currentBalance === undefined) return true;
        return lumpSum <= currentBalance;
      }
    ),

    ValidationRuleFactory.createRule(
      'refinanceRate',
      'Refinance rate should be lower than current rate',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs) return true;
        const refinanceRate = allInputs.refinanceRate;
        const currentRate = allInputs.interestRate;
        if (refinanceRate === undefined || currentRate === undefined) return true;
        return refinanceRate < currentRate;
      }
    )
  ];
}
