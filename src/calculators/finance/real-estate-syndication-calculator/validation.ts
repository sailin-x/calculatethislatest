import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Real estate syndication validation rules
 */
export const realEstateSyndicationValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('totalProjectCost', 'Total project cost is required'),
  ValidationRuleFactory.required('sponsorEquity', 'Sponsor equity is required'),
  ValidationRuleFactory.required('investorEquity', 'Investor equity is required'),

  // Positive value validations
  ValidationRuleFactory.range('totalProjectCost', 0, 1000000000, 'Total project cost must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('sponsorEquity', 0, 100000000, 'Sponsor equity must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('investorEquity', 0, 100000000, 'Investor equity must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('loanAmount', 0, 1000000000, 'Loan amount must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('totalUnits', 1, 10000, 'Total units must be between 1 and 10,000'),
  ValidationRuleFactory.range('averageRentPerUnit', 0, 100000, 'Average rent per unit must be between $0 and $100,000'),
  ValidationRuleFactory.range('holdingPeriodYears', 1, 30, 'Holding period must be between 1 and 30 years'),

  // Percentage validations
  ValidationRuleFactory.range('vacancyRate', 0, 100, 'Vacancy rate must be between 0% and 100%'),
  ValidationRuleFactory.range('operatingExpensesRate', 0, 100, 'Operating expenses rate must be between 0% and 100%'),
  ValidationRuleFactory.range('capRate', 0, 50, 'Cap rate must be between 0% and 50%'),
  ValidationRuleFactory.range('sponsorProfitSplit', 0, 100, 'Sponsor profit split must be between 0% and 100%'),
  ValidationRuleFactory.range('investorProfitSplit', 0, 100, 'Investor profit split must be between 0% and 100%'),
  ValidationRuleFactory.range('preferredReturn', 0, 20, 'Preferred return must be between 0% and 20%'),
  ValidationRuleFactory.range('promotePercentage', 0, 50, 'Promote percentage must be between 0% and 50%'),

  // Business rule validations
  ValidationRuleFactory.businessRule(
    'investorProfitSplit',
    (investorProfitSplit, allInputs) => {
      if (!allInputs?.sponsorProfitSplit) return true;
      return (investorProfitSplit + allInputs.sponsorProfitSplit) === 100;
    },
    'Sponsor and investor profit splits must total 100%'
  ),

  ValidationRuleFactory.businessRule(
    'loanAmount',
    (loanAmount, allInputs) => {
      if (!allInputs?.totalProjectCost) return true;
      const totalEquity = (allInputs.sponsorEquity || 0) + (allInputs.investorEquity || 0);
      return (loanAmount + totalEquity) <= allInputs.totalProjectCost * 1.1; // Allow 10% over for fees
    },
    'Total financing cannot exceed 110% of project cost'
  ),

  ValidationRuleFactory.businessRule(
    'sponsorEquity',
    (sponsorEquity, allInputs) => {
      if (!allInputs?.investorEquity) return true;
      const totalEquity = sponsorEquity + allInputs.investorEquity;
      return totalEquity > 0;
    },
    'Total equity must be greater than 0'
  ),

  ValidationRuleFactory.businessRule(
    'capRate',
    (capRate, allInputs) => {
      if (!allInputs?.averageRentPerUnit || !allInputs?.totalUnits || !allInputs?.operatingExpensesRate) return true;
      const grossIncome = allInputs.averageRentPerUnit * allInputs.totalUnits * 12;
      const noi = grossIncome * (1 - allInputs.operatingExpensesRate / 100);
      const impliedValue = noi / (capRate / 100);
      return impliedValue > 0;
    },
    'Cap rate would result in invalid property value'
  ),

  ValidationRuleFactory.businessRule(
    'preferredReturn',
    (preferredReturn, allInputs) => {
      if (!allInputs?.capRate) return true;
      return preferredReturn <= allInputs.capRate * 0.8; // Preferred return should be reasonable vs cap rate
    },
    'Preferred return seems high relative to cap rate'
  )
];

/**
 * Get validation rules for real estate syndication calculator
 */
export function getRealEstateSyndicationValidationRules(): ValidationRule[] {
  return realEstateSyndicationValidationRules;
}