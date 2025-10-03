import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

export const validateFourZeroOneKRolloverInputs = (inputs: Record<string, any>): ValidationRule[] => {
  const rules: ValidationRule[] = [];

  // Current 401(k) Balance validation
  rules.push(
    ValidationRuleFactory.createRule(
      'current401kBalance',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0,
      'Current 401(k) balance must be a valid positive number',
      inputs
    )
  );

  // Current Age validation
  rules.push(
    ValidationRuleFactory.createRule(
      'currentAge',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 18 && value <= 100,
      'Current age must be between 18 and 100',
      inputs
    )
  );

  // Retirement Age validation
  rules.push(
    ValidationRuleFactory.createRule(
      'retirementAge',
      (value: any) => {
        if (typeof value !== 'number' || isNaN(value) || value < 50 || value > 85) {
          return false;
        }
        return inputs.currentAge ? value > inputs.currentAge : true;
      },
      'Retirement age must be between 50 and 85, and greater than current age',
      inputs
    )
  );

  // Tax Rate validations
  rules.push(
    ValidationRuleFactory.createRule(
      'currentTaxRate',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50,
      'Current tax rate must be between 0% and 50%',
      inputs
    )
  );

  rules.push(
    ValidationRuleFactory.createRule(
      'retirementTaxRate',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50,
      'Retirement tax rate must be between 0% and 50%',
      inputs
    )
  );

  // Rollover Type validation
  rules.push(
    ValidationRuleFactory.createRule(
      'rolloverType',
      (value: any) => ['traditional-ira', 'roth-ira', 'new-401k', 'roth-401k'].includes(value),
      'Rollover type must be one of: Traditional IRA, Roth IRA, New 401(k), Roth 401(k)',
      inputs
    )
  );

  // Fee validations
  rules.push(
    ValidationRuleFactory.createRule(
      'currentPlanFees',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 5,
      'Current plan fees must be between 0% and 5%',
      inputs
    )
  );

  rules.push(
    ValidationRuleFactory.createRule(
      'newPlanFees',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 5,
      'New plan fees must be between 0% and 5%',
      inputs
    )
  );

  // Investment Options validations
  rules.push(
    ValidationRuleFactory.createRule(
      'currentInvestmentOptions',
      (value: any) => ['excellent', 'good', 'fair', 'poor'].includes(value),
      'Current investment options must be one of: Excellent, Good, Fair, Poor',
      inputs
    )
  );

  rules.push(
    ValidationRuleFactory.createRule(
      'newInvestmentOptions',
      (value: any) => ['excellent', 'good', 'fair', 'poor'].includes(value),
      'New investment options must be one of: Excellent, Good, Fair, Poor',
      inputs
    )
  );

  // Expected Return validation
  rules.push(
    ValidationRuleFactory.createRule(
      'expectedReturn',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= -20 && value <= 20,
      'Expected return must be between -20% and 20%',
      inputs
    )
  );

  // Years to Retirement validation
  rules.push(
    ValidationRuleFactory.createRule(
      'yearsToRetirement',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 50,
      'Years to retirement must be between 0 and 50',
      inputs
    )
  );

  // Rollover Fees validation
  rules.push(
    ValidationRuleFactory.createRule(
      'rolloverFees',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10000,
      'Rollover fees must be between $0 and $10,000',
      inputs
    )
  );

  // Early Withdrawal Penalty validation
  rules.push(
    ValidationRuleFactory.createRule(
      'earlyWithdrawalPenalty',
      (value: any) => typeof value === 'boolean',
      'Early withdrawal penalty must be true or false',
      inputs
    )
  );

  // Employer Match validations
  rules.push(
    ValidationRuleFactory.createRule(
      'employerMatch',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 100,
      'Employer match must be between 0% and 100%',
      inputs
    )
  );

  rules.push(
    ValidationRuleFactory.createRule(
      'employerMatchLimit',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 100,
      'Employer match limit must be between 0% and 100%',
      inputs
    )
  );

  // Annual Contribution validation
  rules.push(
    ValidationRuleFactory.createRule(
      'annualContribution',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 100000,
      'Annual contribution must be between $0 and $100,000',
      inputs
    )
  );

  // State Tax Rate validation
  rules.push(
    ValidationRuleFactory.createRule(
      'stateTaxRate',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 15,
      'State tax rate must be between 0% and 15%',
      inputs
    )
  );

  // Net Unrealized Appreciation validation
  rules.push(
    ValidationRuleFactory.createRule(
      'netUnrealizedAppreciation',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 1000000,
      'Net unrealized appreciation must be between $0 and $1,000,000',
      inputs
    )
  );

  // After-tax contribution validations
  rules.push(
    ValidationRuleFactory.createRule(
      'hasAfterTaxContributions',
      (value: any) => typeof value === 'boolean',
      'Has after-tax contributions must be true or false',
      inputs
    )
  );

  rules.push(
    ValidationRuleFactory.createRule(
      'afterTaxAmount',
      (value: any) => {
        if (typeof value !== 'number' || isNaN(value) || value < 0) {
          return false;
        }
        return inputs.current401kBalance ? value <= inputs.current401kBalance : true;
      },
      'After-tax amount must be a valid number and cannot exceed current 401(k) balance',
      inputs
    )
  );

  // Roth 401(k) validations
  rules.push(
    ValidationRuleFactory.createRule(
      'hasRoth401k',
      (value: any) => typeof value === 'boolean',
      'Has Roth 401(k) must be true or false',
      inputs
    )
  );

  rules.push(
    ValidationRuleFactory.createRule(
      'roth401kAmount',
      (value: any) => {
        if (typeof value !== 'number' || isNaN(value) || value < 0) {
          return false;
        }
        return inputs.current401kBalance ? value <= inputs.current401kBalance : true;
      },
      'Roth 401(k) amount must be a valid number and cannot exceed current 401(k) balance',
      inputs
    )
  );

  // Loan validations
  rules.push(
    ValidationRuleFactory.createRule(
      'hasOutstandingLoan',
      (value: any) => typeof value === 'boolean',
      'Has outstanding loan must be true or false',
      inputs
    )
  );

  rules.push(
    ValidationRuleFactory.createRule(
      'loanBalance',
      (value: any) => {
        if (typeof value !== 'number' || isNaN(value) || value < 0) {
          return false;
        }
        return inputs.current401kBalance ? value <= inputs.current401kBalance * 0.5 : true;
      },
      'Loan balance must be a valid number and cannot exceed 50% of current 401(k) balance',
      inputs
    )
  );

  rules.push(
    ValidationRuleFactory.createRule(
      'loanRepaymentPeriod',
      (value: any) => typeof value === 'number' && !isNaN(value) && value >= 1 && value <= 60,
      'Loan repayment period must be between 1 and 60 months',
      inputs
    )
  );

  // Cross-field validations
  rules.push(
    ValidationRuleFactory.createRule(
      'crossFieldValidation',
      () => {
        // Validate that retirement age is greater than current age
        if (inputs.currentAge && inputs.retirementAge && inputs.retirementAge <= inputs.currentAge) {
          return false;
        }

        // Validate that after-tax amount doesn't exceed balance
        if (inputs.hasAfterTaxContributions && inputs.afterTaxAmount && inputs.current401kBalance) {
          if (inputs.afterTaxAmount > inputs.current401kBalance) {
            return false;
          }
        }

        // Validate that Roth 401(k) amount doesn't exceed balance
        if (inputs.hasRoth401k && inputs.roth401kAmount && inputs.current401kBalance) {
          if (inputs.roth401kAmount > inputs.current401kBalance) {
            return false;
          }
        }

        // Validate that loan balance doesn't exceed 50% of balance
        if (inputs.hasOutstandingLoan && inputs.loanBalance && inputs.current401kBalance) {
          if (inputs.loanBalance > inputs.current401kBalance * 0.5) {
            return false;
          }
        }

        return true;
      },
      'Cross-field validation failed. Please check retirement age, contribution amounts, and loan balance.',
      inputs
    )
  );

  return rules;
};
