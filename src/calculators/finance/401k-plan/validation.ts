import { CalculatorInputs } from '../../../types/calculator';
import { ValidationRule } from '../../../types/calculator';

export function validateFourZeroOneKPlanInputs(inputs: CalculatorInputs): ValidationRule[] {
  return [
    {
      field: 'currentAge',
      type: 'required',
      message: 'Current age is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 18 && numValue <= 100;
      }
    },
    {
      field: 'retirementAge',
      type: 'required',
      message: 'Retirement age is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 50 && numValue <= 85;
      }
    },
    {
      field: 'currentSalary',
      type: 'required',
      message: 'Current salary is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 10000 && numValue <= 10000000;
      }
    },
    {
      field: 'current401kBalance',
      type: 'required',
      message: 'Current 401(k) balance is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 10000000;
      }
    },
    {
      field: 'employeeContribution',
      type: 'required',
      message: 'Employee contribution percentage is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
      }
    },
    {
      field: 'employerMatch',
      type: 'required',
      message: 'Employer match percentage is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
      }
    },
    {
      field: 'employerMatchLimit',
      type: 'required',
      message: 'Employer match limit is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
      }
    },
    {
      field: 'planFees',
      type: 'required',
      message: 'Plan fees are required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 5;
      }
    },
    {
      field: 'investmentFees',
      type: 'required',
      message: 'Investment fees are required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 5;
      }
    },
    {
      field: 'salaryGrowthRate',
      type: 'required',
      message: 'Salary growth rate is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 20;
      }
    },
    {
      field: 'investmentReturn',
      type: 'required',
      message: 'Investment return rate is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 20;
      }
    },
    {
      field: 'inflationRate',
      type: 'required',
      message: 'Inflation rate is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 15;
      }
    },
    {
      field: 'contributionIncrease',
      type: 'required',
      message: 'Contribution increase rate is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 10;
      }
    },
    {
      field: 'taxRate',
      type: 'required',
      message: 'Tax rate is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 50;
      }
    },
    {
      field: 'retirementTaxRate',
      type: 'required',
      message: 'Retirement tax rate is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 50;
      }
    },
    {
      field: 'lifeExpectancy',
      type: 'required',
      message: 'Life expectancy is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 65 && numValue <= 120;
      }
    },
    {
      field: 'socialSecurityIncome',
      type: 'required',
      message: 'Social Security income is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 1000000;
      }
    },
    {
      field: 'otherRetirementIncome',
      type: 'required',
      message: 'Other retirement income is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 1000000;
      }
    },
    {
      field: 'planType',
      type: 'required',
      message: 'Plan type is required',
      validator: (value, allInputs) => {
        return value && ['traditional', 'roth', 'both'].includes(value);
      }
    },
    {
      field: 'rothPercentage',
      type: 'required',
      message: 'Roth percentage is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
      }
    },
    {
      field: 'loanBalance',
      type: 'required',
      message: 'Loan balance is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 1000000;
      }
    },
    {
      field: 'hardshipWithdrawals',
      type: 'required',
      message: 'Hardship withdrawals amount is required',
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 1000000;
      }
    },
    {
      field: 'investmentAllocation',
      type: 'required',
      message: 'Investment allocation is required',
      validator: (value, allInputs) => {
        return value && ['conservative', 'moderate', 'aggressive', 'custom'].includes(value);
      }
    },
    {
      field: 'rebalanceFrequency',
      type: 'required',
      message: 'Rebalance frequency is required',
      validator: (value, allInputs) => {
        return value && ['never', 'annually', 'quarterly', 'monthly'].includes(value);
      }
    },
    {
      field: 'retirementAge',
      type: 'custom',
      message: 'Retirement age must be greater than current age',
      validator: (value, allInputs) => {
        const currentAge = allInputs?.currentAge;
        if (currentAge === null || currentAge === undefined) return true;
        const retirementAge = Number(value);
        const currentAgeNum = Number(currentAge);
        return !isNaN(retirementAge) && !isNaN(currentAgeNum) && retirementAge > currentAgeNum;
      }
    },
    {
      field: 'lifeExpectancy',
      type: 'custom',
      message: 'Life expectancy must be greater than retirement age',
      validator: (value, allInputs) => {
        const retirementAge = allInputs?.retirementAge;
        if (retirementAge === null || retirementAge === undefined) return true;
        const lifeExpectancy = Number(value);
        const retirementAgeNum = Number(retirementAge);
        return !isNaN(lifeExpectancy) && !isNaN(retirementAgeNum) && lifeExpectancy > retirementAgeNum;
      }
    },
    {
      field: 'rothPercentage',
      type: 'custom',
      message: 'Roth percentage must be 0 for traditional-only plans',
      validator: (value, allInputs) => {
        const planType = allInputs?.planType;
        const rothPercentage = Number(value);
        if (planType === 'traditional') {
          return rothPercentage === 0;
        }
        return true;
      }
    },
    {
      field: 'rothPercentage',
      type: 'custom',
      message: 'Roth percentage must be 100 for Roth-only plans',
      validator: (value, allInputs) => {
        const planType = allInputs?.planType;
        const rothPercentage = Number(value);
        if (planType === 'roth') {
          return rothPercentage === 100;
        }
        return true;
      }
    }
  ];
}
