import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

export function validateMortgageInsuranceInputs(): ValidationRule[] {
  return [
    ValidationRuleFactory.createRule(
      'homeValue',
      'Home value is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 10000 && value <= 10000000
    ),
    ValidationRuleFactory.createRule(
      'loanAmount',
      'Loan amount is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000000
    ),
    ValidationRuleFactory.createRule(
      'currentLoanBalance',
      'Current loan balance is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000000
    ),
    ValidationRuleFactory.createRule(
      'downPayment',
      'Down payment is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000000
    ),
    ValidationRuleFactory.createRule(
      'creditScore',
      'Credit score is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 300 && value <= 850
    ),
    ValidationRuleFactory.createRule(
      'loanType',
      'Loan type is required',
      (value: any, allInputs?: Record<string, any>) => ['conventional', 'fha', 'va', 'usda'].includes(value)
    ),
    ValidationRuleFactory.createRule(
      'loanTerm',
      'Loan term is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 1 && value <= 50
    ),
    ValidationRuleFactory.createRule(
      'interestRate',
      'Interest rate is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 20
    ),
    ValidationRuleFactory.createRule(
      'monthlyPayment',
      'Monthly payment is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50000
    ),
    ValidationRuleFactory.createRule(
      'purchaseDate',
      'Purchase date is required',
      (value: any, allInputs?: Record<string, any>) => {
        if (!value) return false;
        const date = new Date(value);
        return !isNaN(date.getTime()) && date <= new Date();
      }
    ),
    ValidationRuleFactory.createRule(
      'propertyType',
      'Property type is required',
      (value: any, allInputs?: Record<string, any>) => ['single-family', 'condo', 'multi-family', 'investment'].includes(value)
    ),
    ValidationRuleFactory.createRule(
      'occupancyType',
      'Occupancy type is required',
      (value: any, allInputs?: Record<string, any>) => ['primary', 'secondary', 'investment'].includes(value)
    ),
    ValidationRuleFactory.createRule(
      'propertyTaxRate',
      'Property tax rate is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10
    ),
    ValidationRuleFactory.createRule(
      'homeownersInsuranceAnnual',
      'Annual homeowners insurance is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000
    ),
    ValidationRuleFactory.createRule(
      'monthlyPrincipalPayment',
      'Monthly principal payment is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50000
    ),
    ValidationRuleFactory.createRule(
      'additionalPrincipalPayments',
      'Additional principal payments are required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50000
    ),
    ValidationRuleFactory.createRule(
      'homeImprovements',
      'Home improvements amount is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 1000000
    ),
    ValidationRuleFactory.createRule(
      'marketAppreciationRate',
      'Market appreciation rate is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= -20 && value <= 20
    ),
    ValidationRuleFactory.createRule(
      'refinanceHistory',
      'Refinance history is required',
      (value: any, allInputs?: Record<string, any>) => ['none', 'one', 'multiple'].includes(value)
    ),
    ValidationRuleFactory.createRule(
      'paymentHistory',
      'Payment history is required',
      (value: any, allInputs?: Record<string, any>) => ['perfect', 'good', 'fair', 'poor'].includes(value)
    ),
    ValidationRuleFactory.createRule(
      'bankruptcyHistory',
      'Bankruptcy history is required',
      (value: any, allInputs?: Record<string, any>) => ['none', 'chapter7', 'chapter13', 'multiple'].includes(value)
    ),
    ValidationRuleFactory.createRule(
      'foreclosureHistory',
      'Foreclosure history is required',
      (value: any, allInputs?: Record<string, any>) => ['none', 'one', 'multiple'].includes(value)
    ),
    ValidationRuleFactory.createRule(
      'debtToIncomeRatio',
      'Debt-to-income ratio is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 100
    ),
    ValidationRuleFactory.createRule(
      'annualIncome',
      'Annual income is required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000000
    ),
    ValidationRuleFactory.createRule(
      'otherMonthlyDebts',
      'Other monthly debts are required',
      (value: any, allInputs?: Record<string, any>) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50000
    ),
    ValidationRuleFactory.createRule(
      'state',
      'State is required',
      (value: any, allInputs?: Record<string, any>) => {
        const validStates = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
        return validStates.includes(value);
      }
    ),
    ValidationRuleFactory.createRule(
      'county',
      'County type is required',
      (value: any, allInputs?: Record<string, any>) => ['urban', 'suburban', 'rural'].includes(value)
    ),
    // Cross-field validations
    ValidationRuleFactory.createRule(
      'downPayment',
      'Down payment cannot exceed home value',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.homeValue) return true;
        return value <= allInputs.homeValue;
      }
    ),
    ValidationRuleFactory.createRule(
      'loanAmount',
      'Loan amount cannot exceed home value',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.homeValue) return true;
        return value <= allInputs.homeValue;
      }
    ),
    ValidationRuleFactory.createRule(
      'currentLoanBalance',
      'Current loan balance cannot exceed original loan amount',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.loanAmount) return true;
        return value <= allInputs.loanAmount;
      }
    ),
    ValidationRuleFactory.createRule(
      'homeValue',
      'Home value should be reasonable compared to loan amount',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.loanAmount) return true;
        const loanAmount = allInputs.loanAmount;
        const minReasonable = loanAmount * 0.8; // Allow for 20% down payment
        const maxReasonable = loanAmount * 2; // Allow for 50% down payment
        return value >= minReasonable && value <= maxReasonable;
      }
    ),
    ValidationRuleFactory.createRule(
      'debtToIncomeRatio',
      'Debt-to-income ratio should be reasonable',
      (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.annualIncome || !allInputs?.monthlyPayment || !allInputs?.otherMonthlyDebts) return true;
        const monthlyIncome = allInputs.annualIncome / 12;
        const totalMonthlyDebt = allInputs.monthlyPayment + allInputs.otherMonthlyDebts;
        const calculatedDTI = (totalMonthlyDebt / monthlyIncome) * 100;
        return Math.abs(value - calculatedDTI) <= 10; // Allow 10% variance
      }
    )
  ];
}
