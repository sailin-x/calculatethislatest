import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Comprehensive validation rules for Mortgage Life Calculator
 */
export function validateMortgageLifeInputs(): ValidationRule[] {
  return [
    // Required field validations
    ValidationRuleFactory.required('loanAmount', 'Loan amount is required'),
    ValidationRuleFactory.required('currentLoanBalance', 'Current loan balance is required'),
    ValidationRuleFactory.required('borrowerAge', 'Borrower age is required'),
    ValidationRuleFactory.required('coBorrowerAge', 'Co-borrower age is required'),
    ValidationRuleFactory.required('loanTerm', 'Loan term is required'),
    ValidationRuleFactory.required('yearsRemaining', 'Years remaining is required'),
    ValidationRuleFactory.required('monthlyPayment', 'Monthly payment is required'),
    ValidationRuleFactory.required('annualIncome', 'Annual income is required'),
    ValidationRuleFactory.required('otherDebts', 'Other debts amount is required'),
    ValidationRuleFactory.required('savings', 'Savings amount is required'),
    ValidationRuleFactory.required('dependents', 'Number of dependents is required'),
    ValidationRuleFactory.required('healthStatus', 'Health status is required'),
    ValidationRuleFactory.required('smokingStatus', 'Smoking status is required'),
    ValidationRuleFactory.required('occupation', 'Occupation risk level is required'),
    ValidationRuleFactory.required('hobbies', 'Hobby risk level is required'),
    ValidationRuleFactory.required('existingLifeInsurance', 'Existing life insurance amount is required'),
    ValidationRuleFactory.required('mortgageLifePremium', 'Mortgage life premium is required'),
    ValidationRuleFactory.required('termLifePremium', 'Term life premium is required'),
    ValidationRuleFactory.required('inflationRate', 'Inflation rate is required'),
    ValidationRuleFactory.required('investmentReturn', 'Investment return rate is required'),
    ValidationRuleFactory.required('state', 'State is required'),
    ValidationRuleFactory.required('coverageType', 'Coverage type is required'),
    ValidationRuleFactory.required('beneficiaryType', 'Beneficiary type is required'),

    // Numeric range validations
    ValidationRuleFactory.range('loanAmount', 10000, 10000000, 'Loan amount must be between $10,000 and $10,000,000'),
    ValidationRuleFactory.range('currentLoanBalance', 0, 10000000, 'Current loan balance must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('borrowerAge', 18, 85, 'Borrower age must be between 18 and 85 years'),
    ValidationRuleFactory.range('coBorrowerAge', 18, 85, 'Co-borrower age must be between 18 and 85 years'),
    ValidationRuleFactory.range('loanTerm', 1, 50, 'Loan term must be between 1 and 50 years'),
    ValidationRuleFactory.range('yearsRemaining', 0, 50, 'Years remaining must be between 0 and 50 years'),
    ValidationRuleFactory.range('monthlyPayment', 0, 50000, 'Monthly payment must be between $0 and $50,000'),
    ValidationRuleFactory.range('annualIncome', 0, 10000000, 'Annual income must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('otherDebts', 0, 1000000, 'Other debts must be between $0 and $1,000,000'),
    ValidationRuleFactory.range('savings', 0, 10000000, 'Savings must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('dependents', 0, 10, 'Number of dependents must be between 0 and 10'),
    ValidationRuleFactory.range('existingLifeInsurance', 0, 10000000, 'Existing life insurance must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('mortgageLifePremium', 0, 1000, 'Monthly premium must be between $0 and $1,000'),
    ValidationRuleFactory.range('termLifePremium', 0, 1000, 'Monthly premium must be between $0 and $1,000'),
    ValidationRuleFactory.range('inflationRate', 0, 10, 'Inflation rate must be between 0% and 10%'),
    ValidationRuleFactory.range('investmentReturn', 0, 20, 'Investment return must be between 0% and 20%'),

    // Custom validations for select fields
    ValidationRuleFactory.createRule(
      'healthStatus',
      'Please select a valid health status',
      (value: any, allInputs?: Record<string, any>) => {
        const validStatuses = ['excellent', 'very-good', 'good', 'fair', 'poor'];
        return validStatuses.includes(value);
      }
    ),

    ValidationRuleFactory.createRule(
      'smokingStatus',
      'Please select a valid smoking status',
      (value: any, allInputs?: Record<string, any>) => {
        const validStatuses = ['non-smoker', 'former-smoker', 'smoker'];
        return validStatuses.includes(value);
      }
    ),

    ValidationRuleFactory.createRule(
      'occupation',
      'Please select a valid occupation risk level',
      (value: any, allInputs?: Record<string, any>) => {
        const validOccupations = ['low-risk', 'medium-risk', 'high-risk'];
        return validOccupations.includes(value);
      }
    ),

    ValidationRuleFactory.createRule(
      'hobbies',
      'Please select a valid hobby risk level',
      (value: any, allInputs?: Record<string, any>) => {
        const validHobbies = ['low-risk', 'medium-risk', 'high-risk'];
        return validHobbies.includes(value);
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

    ValidationRuleFactory.createRule(
      'coverageType',
      'Please select a valid coverage type',
      (value: any, allInputs?: Record<string, any>) => {
        const validTypes = ['decreasing', 'level', 'joint', 'survivorship'];
        return validTypes.includes(value);
      }
    ),

    ValidationRuleFactory.createRule(
      'beneficiaryType',
      'Please select a valid beneficiary type',
      (value: any, allInputs?: Record<string, any>) => {
        const validTypes = ['family', 'trust', 'estate', 'charity'];
        return validTypes.includes(value);
      }
    ),

    // Cross-field validations
    ValidationRuleFactory.createRule(
      'currentLoanBalance',
      'Current loan balance cannot exceed original loan amount',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs) return true;
        const currentBalance = allInputs.currentLoanBalance;
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
      'coBorrowerAge',
      'Co-borrower age difference seems unreasonable (max 30 years)',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs) return true;
        const borrowerAge = allInputs.borrowerAge;
        const coBorrowerAge = allInputs.coBorrowerAge;
        if (borrowerAge === undefined || coBorrowerAge === undefined) return true;
        const ageDifference = Math.abs(borrowerAge - coBorrowerAge);
        return ageDifference <= 30;
      }
    ),

    // Business logic validations
    ValidationRuleFactory.createRule(
      'annualIncome',
      'Annual income should be reasonable for your age and situation',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs) return true;
        const income = parseFloat(value);
        const age = allInputs.borrowerAge;
        if (isNaN(income) || age === undefined) return true;
        
        // Basic income reasonableness check
        if (age < 25 && income > 200000) return false;
        if (age < 30 && income > 500000) return false;
        if (age < 40 && income > 1000000) return false;
        if (age < 50 && income > 2000000) return false;
        if (age < 60 && income > 5000000) return false;
        if (age >= 60 && income > 10000000) return false;
        
        return true;
      }
    ),

    ValidationRuleFactory.createRule(
      'monthlyPayment',
      'Monthly payment should be reasonable for the loan amount',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs) return true;
        const payment = parseFloat(value);
        const loanAmount = allInputs.loanAmount;
        if (isNaN(payment) || loanAmount === undefined) return true;
        
        // Basic payment reasonableness check (assuming 30-year term, 5% rate)
        const maxReasonablePayment = loanAmount * 0.006; // Approximate max payment
        const minReasonablePayment = loanAmount * 0.003; // Approximate min payment
        
        return payment >= minReasonablePayment && payment <= maxReasonablePayment;
      }
    ),

    ValidationRuleFactory.createRule(
      'dependents',
      'Number of dependents should be reasonable',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs) return true;
        const dependents = parseFloat(value);
        const age = allInputs.borrowerAge;
        if (isNaN(dependents) || age === undefined) return true;
        
        // Basic dependents reasonableness check
        if (age < 18 && dependents > 0) return false;
        if (age < 25 && dependents > 3) return false;
        if (age < 35 && dependents > 5) return false;
        if (age < 50 && dependents > 8) return false;
        if (age >= 50 && dependents > 10) return false;
        
        return true;
      }
    ),

    ValidationRuleFactory.createRule(
      'mortgageLifePremium',
      'Mortgage life premium should be reasonable for the coverage amount',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs) return true;
        const premium = parseFloat(value);
        const coverage = allInputs.currentLoanBalance;
        if (isNaN(premium) || coverage === undefined) return true;
        
        // Basic premium reasonableness check (0.1% to 2% of coverage annually)
        const annualPremium = premium * 12;
        const minReasonablePremium = coverage * 0.001; // 0.1% annually
        const maxReasonablePremium = coverage * 0.02; // 2% annually
        
        return annualPremium >= minReasonablePremium && annualPremium <= maxReasonablePremium;
      }
    ),

    ValidationRuleFactory.createRule(
      'termLifePremium',
      'Term life premium should be reasonable for the coverage amount',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs) return true;
        const premium = parseFloat(value);
        const coverage = allInputs.currentLoanBalance;
        if (isNaN(premium) || coverage === undefined) return true;
        
        // Basic premium reasonableness check (0.05% to 1% of coverage annually)
        const annualPremium = premium * 12;
        const minReasonablePremium = coverage * 0.0005; // 0.05% annually
        const maxReasonablePremium = coverage * 0.01; // 1% annually
        
        return annualPremium >= minReasonablePremium && annualPremium <= maxReasonablePremium;
      }
    )
  ];
}
