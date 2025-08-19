import { Calculator } from '../../types/Calculator';
import { calculateMortgageRefinance } from './formulas';
import { validateMortgageRefinanceInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const mortgageRefinanceCalculator: Calculator = {
  id: 'mortgage-refinance',
  title: 'Mortgage Refinance Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate the financial impact of refinancing your mortgage, including break-even analysis, monthly savings, and total cost comparison.',
  usageInstructions: 'Enter your current mortgage details and the new loan terms to analyze whether refinancing makes financial sense.',
  inputs: [
    {
      id: 'currentLoanAmount',
      label: 'Current Loan Balance',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      tooltip: 'The remaining balance on your current mortgage',
      placeholder: '250000',
      defaultValue: 250000
    },
    {
      id: 'currentInterestRate',
      label: 'Current Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.125,
      tooltip: 'Your current mortgage interest rate',
      placeholder: '5.5',
      defaultValue: 5.5
    },
    {
      id: 'currentLoanTerm',
      label: 'Current Loan Term (Years)',
      type: 'select',
      required: true,
      options: [
        { value: '10', label: '10 years' },
        { value: '15', label: '15 years' },
        { value: '20', label: '20 years' },
        { value: '30', label: '30 years' }
      ],
      tooltip: 'The remaining term of your current mortgage',
      defaultValue: '30'
    },
    {
      id: 'remainingYears',
      label: 'Remaining Years on Current Loan',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      tooltip: 'How many years are left on your current mortgage',
      placeholder: '25',
      defaultValue: 25
    },
    {
      id: 'newLoanAmount',
      label: 'New Loan Amount',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      tooltip: 'The amount of the new refinanced loan',
      placeholder: '250000',
      defaultValue: 250000
    },
    {
      id: 'newInterestRate',
      label: 'New Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.125,
      tooltip: 'The interest rate on the new refinanced loan',
      placeholder: '4.0',
      defaultValue: 4.0
    },
    {
      id: 'newLoanTerm',
      label: 'New Loan Term (Years)',
      type: 'select',
      required: true,
      options: [
        { value: '10', label: '10 years' },
        { value: '15', label: '15 years' },
        { value: '20', label: '20 years' },
        { value: '30', label: '30 years' }
      ],
      tooltip: 'The term of the new refinanced loan',
      defaultValue: '30'
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'number',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Total closing costs for the refinance',
      placeholder: '5000',
      defaultValue: 5000
    },
    {
      id: 'prepaymentPenalty',
      label: 'Prepayment Penalty',
      type: 'number',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Penalty for paying off current loan early (if any)',
      placeholder: '0',
      defaultValue: 0
    },
    {
      id: 'propertyValue',
      label: 'Current Property Value',
      type: 'number',
      required: false,
      min: 1000,
      max: 10000000,
      step: 1000,
      tooltip: 'Current market value of your property',
      placeholder: '300000',
      defaultValue: 300000
    },
    {
      id: 'refinancePurpose',
      label: 'Refinance Purpose',
      type: 'select',
      required: true,
      options: [
        { value: 'lower_rate', label: 'Lower Interest Rate' },
        { value: 'shorter_term', label: 'Shorter Loan Term' },
        { value: 'cash_out', label: 'Cash Out' },
        { value: 'debt_consolidation', label: 'Debt Consolidation' },
        { value: 'remove_pmi', label: 'Remove PMI' }
      ],
      tooltip: 'Primary reason for refinancing',
      defaultValue: 'lower_rate'
    },
    {
      id: 'cashOutAmount',
      label: 'Cash Out Amount',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Amount of cash you want to take out (if applicable)',
      placeholder: '0',
      defaultValue: 0
    },
    {
      id: 'taxRate',
      label: 'Marginal Tax Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 50,
      step: 1,
      tooltip: 'Your marginal federal tax rate for tax deduction calculations',
      placeholder: '22',
      defaultValue: 22
    },
    {
      id: 'planToMove',
      label: 'Plan to Move Within',
      type: 'select',
      required: false,
      options: [
        { value: '1', label: '1 year' },
        { value: '3', label: '3 years' },
        { value: '5', label: '5 years' },
        { value: '7', label: '7 years' },
        { value: '10', label: '10 years' },
        { value: 'never', label: 'Never/Unknown' }
      ],
      tooltip: 'How long you plan to stay in the home',
      defaultValue: 'never'
    }
  ],
  outputs: [
    {
      id: 'monthlySavings',
      label: 'Monthly Payment Savings',
      type: 'currency',
      format: 'USD',
      explanation: 'Difference between current and new monthly payments'
    },
    {
      id: 'totalSavings',
      label: 'Total Interest Savings',
      type: 'currency',
      format: 'USD',
      explanation: 'Total interest saved over the life of the new loan'
    },
    {
      id: 'breakEvenMonths',
      label: 'Break-Even Months',
      type: 'number',
      format: 'months',
      explanation: 'Number of months to recoup closing costs through monthly savings'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Years',
      type: 'number',
      format: 'years',
      explanation: 'Number of years to recoup closing costs through monthly savings'
    },
    {
      id: 'totalCost',
      label: 'Total Refinance Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Total cost including closing costs and prepayment penalty'
    },
    {
      id: 'netBenefit',
      label: 'Net Financial Benefit',
      type: 'currency',
      format: 'USD',
      explanation: 'Total savings minus total refinance costs'
    },
    {
      id: 'recommendation',
      label: 'Refinance Recommendation',
      type: 'text',
      format: 'recommendation',
      explanation: 'Whether refinancing is recommended based on the analysis'
    },
    {
      id: 'analysis',
      label: 'Detailed Analysis',
      type: 'text',
      format: 'markdown',
      explanation: 'Comprehensive analysis of the refinance decision'
    }
  ],
  formulas: [
    {
      id: 'mortgage-refinance-analysis',
      name: 'Mortgage Refinance Analysis',
      description: 'Calculate the financial impact of refinancing a mortgage',
      calculate: calculateMortgageRefinance
    }
  ],
  validationRules: [
    {
      id: 'required-fields',
      name: 'Required Fields',
      description: 'Ensure all required fields are provided',
      validate: validateMortgageRefinanceInputs
    }
  ],
  examples: [
    {
      title: 'Rate Reduction Refinance',
      description: 'Refinancing to get a lower interest rate and reduce monthly payments',
      inputs: {
        currentLoanAmount: 250000,
        currentInterestRate: 5.5,
        currentLoanTerm: '30',
        remainingYears: 25,
        newLoanAmount: 250000,
        newInterestRate: 4.0,
        newLoanTerm: '30',
        closingCosts: 5000,
        prepaymentPenalty: 0,
        propertyValue: 300000,
        refinancePurpose: 'lower_rate',
        cashOutAmount: 0,
        taxRate: 22,
        planToMove: 'never'
      },
      expectedOutputs: {
        monthlySavings: 200,
        totalSavings: 45000,
        breakEvenMonths: 25,
        breakEvenYears: 2.1,
        totalCost: 5000,
        netBenefit: 40000,
        recommendation: 'Recommended',
        analysis: 'Refinancing shows significant savings'
      }
    },
    {
      title: 'Cash-Out Refinance',
      description: 'Refinancing to take cash out for home improvements',
      inputs: {
        currentLoanAmount: 200000,
        currentInterestRate: 4.5,
        currentLoanTerm: '30',
        remainingYears: 20,
        newLoanAmount: 250000,
        newInterestRate: 4.25,
        newLoanTerm: '30',
        closingCosts: 6000,
        prepaymentPenalty: 0,
        propertyValue: 350000,
        refinancePurpose: 'cash_out',
        cashOutAmount: 50000,
        taxRate: 24,
        planToMove: '5'
      },
      expectedOutputs: {
        monthlySavings: 50,
        totalSavings: 15000,
        breakEvenMonths: 120,
        breakEvenYears: 10,
        totalCost: 6000,
        netBenefit: 9000,
        recommendation: 'Consider carefully',
        analysis: 'Cash-out provides funds but longer break-even period'
      }
    },
    {
      title: 'Short-Term Move Scenario',
      description: 'Refinancing when planning to move within 3 years',
      inputs: {
        currentLoanAmount: 300000,
        currentInterestRate: 5.0,
        currentLoanTerm: '30',
        remainingYears: 28,
        newLoanAmount: 300000,
        newInterestRate: 4.5,
        newLoanTerm: '30',
        closingCosts: 4000,
        prepaymentPenalty: 0,
        propertyValue: 350000,
        refinancePurpose: 'lower_rate',
        cashOutAmount: 0,
        taxRate: 22,
        planToMove: '3'
      },
      expectedOutputs: {
        monthlySavings: 150,
        totalSavings: 25000,
        breakEvenMonths: 27,
        breakEvenYears: 2.25,
        totalCost: 4000,
        netBenefit: 1400,
        recommendation: 'Not recommended',
        analysis: 'Break-even period too close to planned move date'
      }
    }
  ],
  quickValidation: quickValidateAllInputs
};