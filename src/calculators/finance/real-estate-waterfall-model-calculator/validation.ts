import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Real estate waterfall model validation rules
 */
export const realEstateWaterfallModelValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('totalProjectCost', 'Total project cost is required'),
  ValidationRuleFactory.required('sponsorEquity', 'Sponsor equity is required'),
  ValidationRuleFactory.required('investorEquity', 'Investor equity is required'),
  ValidationRuleFactory.required('preferredReturn', 'Preferred return is required'),
  ValidationRuleFactory.required('holdingPeriodYears', 'Holding period is required'),

  // Positive value validations
  ValidationRuleFactory.range('totalProjectCost', 0, 1000000000, 'Total project cost must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('sponsorEquity', 0, 100000000, 'Sponsor equity must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('investorEquity', 0, 100000000, 'Investor equity must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('loanAmount', 0, 1000000000, 'Loan amount must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('totalCashFlow', 0, 100000000, 'Total cash flow must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('totalAppreciation', 0, 1000000000, 'Total appreciation must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('totalPrincipalPaydown', 0, 100000000, 'Total principal paydown must be between $0 and $100,000,000'),

  // Percentage validations
  ValidationRuleFactory.range('preferredReturn', 0, 20, 'Preferred return must be between 0% and 20%'),
  ValidationRuleFactory.range('sponsorProfitSplit', 0, 100, 'Sponsor profit split must be between 0% and 100%'),
  ValidationRuleFactory.range('investorProfitSplit', 0, 100, 'Investor profit split must be between 0% and 100%'),
  ValidationRuleFactory.range('irrTarget', 0, 50, 'IRR target must be between 0% and 50%'),

  // Year validations
  ValidationRuleFactory.range('holdingPeriodYears', 1, 30, 'Holding period must be between 1 and 30 years'),

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
    'sponsorEquity',
    (sponsorEquity, allInputs) => {
      if (!allInputs?.investorEquity) return true;
      const totalEquity = sponsorEquity + allInputs.investorEquity;
      return totalEquity > 0;
    },
    'Total equity must be greater than 0'
  ),

  ValidationRuleFactory.businessRule(
    'loanAmount',
    (loanAmount, allInputs) => {
      if (!allInputs?.totalProjectCost) return true;
      return loanAmount <= allInputs.totalProjectCost;
    },
    'Loan amount cannot exceed total project cost'
  ),

  ValidationRuleFactory.businessRule(
    'preferredReturn',
    (preferredReturn, allInputs) => {
      if (!allInputs?.irrTarget) return true;
      return preferredReturn <= allInputs.irrTarget * 0.8; // Preferred return should be reasonable vs IRR target
    },
    'Preferred return seems high relative to IRR target'
  ),

  ValidationRuleFactory.businessRule(
    'totalCashFlow',
    (totalCashFlow, allInputs) => {
      if (!allInputs?.totalProjectCost) return true;
      // Cash flow should be reasonable relative to project cost
      const cashFlowRatio = totalCashFlow / allInputs.totalProjectCost;
      return cashFlowRatio <= 0.5; // Cash flow shouldn't exceed 50% of project cost
    },
    'Total cash flow seems unusually high relative to project cost'
  )
];

/**
 * Get validation rules for real estate waterfall model calculator
 */
export function getRealEstateWaterfallModelValidationRules(): ValidationRule[] {
  return realEstateWaterfallModelValidationRules;
}