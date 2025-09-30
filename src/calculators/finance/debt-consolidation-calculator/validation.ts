import { ValidationRule } from '../../../types/calculator';
import { DebtConsolidationInputs } from './types';

export function getDebtConsolidationValidationRules(): ValidationRule[] {
  return [
    // Consolidation Amount Validation
    {
      field: 'consolidationAmount',
      type: 'required',
      message: 'Consolidation amount is required',
      validator: (value: any) => value !== undefined && value !== null && value > 0
    },
    {
      field: 'consolidationAmount',
      type: 'range',
      message: 'Consolidation amount must be between $1,000 and $100,000',
      validator: (value: any) => value >= 1000 && value <= 100000
    },

    // Consolidation Rate Validation
    {
      field: 'consolidationRate',
      type: 'required',
      message: 'Consolidation interest rate is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'consolidationRate',
      type: 'range',
      message: 'Consolidation rate must be between 0% and 40%',
      validator: (value: any) => value >= 0 && value <= 40
    },

    // Consolidation Term Validation
    {
      field: 'consolidationTerm',
      type: 'required',
      message: 'Consolidation term is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'consolidationTerm',
      type: 'range',
      message: 'Consolidation term must be between 6 and 120 months',
      validator: (value: any) => value >= 6 && value <= 120
    },

    // Current Debt Validations
    {
      field: 'creditCardBalance',
      type: 'range',
      message: 'Credit card balance cannot be negative',
      validator: (value: any) => !value || value >= 0
    },
    {
      field: 'creditCardRate',
      type: 'range',
      message: 'Credit card rate must be between 0% and 50%',
      validator: (value: any) => !value || (value >= 0 && value <= 50)
    },
    {
      field: 'personalLoanBalance',
      type: 'range',
      message: 'Personal loan balance cannot be negative',
      validator: (value: any) => !value || value >= 0
    },
    {
      field: 'personalLoanRate',
      type: 'range',
      message: 'Personal loan rate must be between 0% and 40%',
      validator: (value: any) => !value || (value >= 0 && value <= 40)
    },

    // Financial Information Validations
    {
      field: 'monthlyIncome',
      type: 'range',
      message: 'Monthly income must be greater than zero if provided',
      validator: (value: any) => !value || value > 0
    },
    {
      field: 'monthlyExpenses',
      type: 'range',
      message: 'Monthly expenses cannot be negative',
      validator: (value: any) => !value || value >= 0
    },

    // Business Logic Validations
    {
      field: 'consolidationAmount',
      type: 'business',
      message: 'Consolidation amount should match total current debt',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs) return true;
        const totalCurrentDebt = (allInputs.creditCardBalance || 0) +
                                (allInputs.personalLoanBalance || 0) +
                                (allInputs.otherDebts?.reduce((sum: number, debt: any) => sum + debt.balance, 0) || 0);
        return Math.abs(value - totalCurrentDebt) / totalCurrentDebt <= 0.1; // Within 10%
      }
    },

    {
      field: 'consolidationRate',
      type: 'business',
      message: 'Consolidation rate should be lower than current average rate',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs) return true;
        const totalDebt = (allInputs.creditCardBalance || 0) +
                         (allInputs.personalLoanBalance || 0) +
                         (allInputs.otherDebts?.reduce((sum: number, debt: any) => sum + debt.balance, 0) || 0);
        const weightedRate = totalDebt > 0 ?
          ((allInputs.creditCardRate || 0) * (allInputs.creditCardBalance || 0) +
           (allInputs.personalLoanRate || 0) * (allInputs.personalLoanBalance || 0) +
           (allInputs.otherDebts?.reduce((sum: number, debt: any) => sum + debt.rate * debt.balance, 0) || 0)) / totalDebt
          : 0;
        return value <= weightedRate;
      }
    },

    {
      field: 'monthlyIncome',
      type: 'business',
      message: 'Income information helps provide accurate affordability analysis',
      validator: (value: any) => true // This is informational
    },

    {
      field: 'targetMonthlyPayment',
      type: 'range',
      message: 'Target monthly payment must be greater than zero if specified',
      validator: (value: any) => !value || value > 0
    },

    // Other Debts Validation
    {
      field: 'otherDebts',
      type: 'business',
      message: 'Please include all debts for accurate consolidation analysis',
      validator: (value: any) => true // This is informational
    }
  ];
}

/**
 * Comprehensive validation function for all debt consolidation inputs
 */
export function validateAllDebtConsolidationInputs(inputs: DebtConsolidationInputs): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const rules = getDebtConsolidationValidationRules();

  // Apply all validation rules
  rules.forEach(rule => {
    const value = inputs[rule.field as keyof DebtConsolidationInputs];
    if (!rule.validator(value, inputs)) {
      errors[rule.field] = rule.message;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}