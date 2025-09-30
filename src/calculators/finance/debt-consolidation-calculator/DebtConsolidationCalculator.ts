import { Calculator } from '../../../types/calculator';
import { DebtConsolidationInputs, DebtConsolidationResults } from './types';
import { calculateDebtConsolidation, validateDebtConsolidationInputs } from './formulas';
import { getDebtConsolidationValidationRules } from './validation';

export const debtConsolidationCalculator: Calculator = {
  id: 'debt-consolidation-calculator',
  title: 'Debt Consolidation Calculator',
  category: 'finance',
  subcategory: 'Loans & Debt',
  description: 'Compare debt consolidation options, analyze interest savings, and determine the best payoff strategy. Evaluate consolidation loans vs. debt avalanche/snowball methods.',
  usageInstructions: [
    'Enter your current debts (credit cards, personal loans, other)',
    'Specify consolidation loan terms and rates',
    'Review savings analysis and payoff comparisons',
    'Compare consolidation vs. alternative payoff strategies',
    'Get personalized recommendations for your situation'
  ],

  inputs: [
    // Consolidation Loan Details
    {
      id: 'consolidationAmount',
      label: 'Consolidation Loan Amount',
      type: 'currency',
      required: true,
      placeholder: '15000',
      tooltip: 'Total amount to consolidate',
      defaultValue: 15000,
      min: 1000,
      max: 100000,
      step: 500
    },
    {
      id: 'consolidationRate',
      label: 'Consolidation Interest Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '12.99',
      tooltip: 'Interest rate on consolidation loan',
      defaultValue: 12.99,
      min: 0,
      max: 40,
      step: 0.01
    },
    {
      id: 'consolidationTerm',
      label: 'Consolidation Term (Months)',
      type: 'number',
      required: true,
      placeholder: '60',
      tooltip: 'Length of consolidation loan',
      defaultValue: 60,
      min: 6,
      max: 120,
      step: 6
    },
    {
      id: 'consolidationFees',
      label: 'Consolidation Fees',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Origination or other fees',
      defaultValue: 500,
      min: 0,
      max: 5000,
      step: 25
    },

    // Current Debts
    {
      id: 'creditCardBalance',
      label: 'Credit Card Balance',
      type: 'currency',
      required: false,
      placeholder: '8000',
      tooltip: 'Current credit card debt',
      defaultValue: 8000,
      min: 0,
      max: 50000,
      step: 100
    },
    {
      id: 'creditCardRate',
      label: 'Credit Card Interest Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '22.99',
      tooltip: 'APR on credit card',
      defaultValue: 22.99,
      min: 0,
      max: 50,
      step: 0.01
    },
    {
      id: 'personalLoanBalance',
      label: 'Personal Loan Balance',
      type: 'currency',
      required: false,
      placeholder: '5000',
      tooltip: 'Current personal loan debt',
      defaultValue: 5000,
      min: 0,
      max: 50000,
      step: 100
    },
    {
      id: 'personalLoanRate',
      label: 'Personal Loan Interest Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '15.99',
      tooltip: 'Interest rate on personal loan',
      defaultValue: 15.99,
      min: 0,
      max: 40,
      step: 0.01
    },

    // Financial Information
    {
      id: 'monthlyIncome',
      label: 'Monthly Gross Income',
      type: 'currency',
      required: false,
      placeholder: '5000',
      tooltip: 'Your monthly income before taxes',
      defaultValue: 5000,
      min: 0,
      step: 100
    },
    {
      id: 'monthlyExpenses',
      label: 'Monthly Expenses',
      type: 'currency',
      required: false,
      placeholder: '3500',
      tooltip: 'Monthly expenses excluding debt payments',
      defaultValue: 3500,
      min: 0,
      step: 50
    },

    // Strategy Preferences
    {
      id: 'payoffPriority',
      label: 'Payoff Strategy Priority',
      type: 'select',
      required: true,
      options: [
        { value: 'lowest_rate', label: 'Lowest Interest Rate First (Avalanche)' },
        { value: 'highest_balance', label: 'Highest Balance First (Custom)' },
        { value: 'lowest_payment', label: 'Lowest Payment First (Snowball)' }
      ],
      defaultValue: 'lowest_rate',
      tooltip: 'Strategy for paying off multiple debts'
    },
    {
      id: 'targetMonthlyPayment',
      label: 'Target Monthly Payment',
      type: 'currency',
      required: false,
      placeholder: '400',
      tooltip: 'Desired monthly payment amount',
      defaultValue: 400,
      min: 0,
      step: 25
    }
  ],

  outputs: [
    // Current Situation Summary
    {
      id: 'totalCurrentDebt',
      label: 'Total Current Debt',
      type: 'currency',
      explanation: 'Sum of all current debts'
    },
    {
      id: 'totalCurrentPayments',
      label: 'Current Monthly Payments',
      type: 'currency',
      explanation: 'Total monthly payments on current debts'
    },
    {
      id: 'weightedAverageRate',
      label: 'Average Interest Rate',
      type: 'percentage',
      explanation: 'Weighted average of all debt interest rates'
    },
    {
      id: 'totalCurrentInterest',
      label: 'Total Interest (Current Plan)',
      type: 'currency',
      explanation: 'Total interest you will pay with current debts'
    },

    // Consolidation Analysis
    {
      id: 'consolidationPayment',
      label: 'Consolidation Monthly Payment',
      type: 'currency',
      explanation: 'Monthly payment on consolidation loan'
    },
    {
      id: 'totalConsolidationCost',
      label: 'Total Consolidation Cost',
      type: 'currency',
      explanation: 'Total amount paid with consolidation loan'
    },
    {
      id: 'totalConsolidationInterest',
      label: 'Total Interest (Consolidated)',
      type: 'currency',
      explanation: 'Total interest paid with consolidation loan'
    },
    {
      id: 'interestSavings',
      label: 'Interest Savings',
      type: 'currency',
      explanation: 'Interest saved with consolidation vs. current plan'
    },
    {
      id: 'paymentSavings',
      label: 'Monthly Payment Savings',
      type: 'currency',
      explanation: 'Monthly payment reduction with consolidation'
    },

    // Payoff Timeline
    {
      id: 'payoffTimeCurrent',
      label: 'Current Payoff Time',
      type: 'number',
      explanation: 'Months to pay off current debts'
    },
    {
      id: 'payoffTimeConsolidated',
      label: 'Consolidated Payoff Time',
      type: 'number',
      explanation: 'Months to pay off consolidation loan'
    },
    {
      id: 'monthsSaved',
      label: 'Months Saved',
      type: 'number',
      explanation: 'Time saved with consolidation'
    },

    // Affordability Analysis
    {
      id: 'currentDTI',
      label: 'Current Debt-to-Income Ratio',
      type: 'percentage',
      explanation: 'Percentage of income used for debt payments'
    },
    {
      id: 'consolidatedDTI',
      label: 'Consolidated Debt-to-Income Ratio',
      type: 'percentage',
      explanation: 'Debt-to-income ratio with consolidation'
    },
    {
      id: 'affordabilityRating',
      label: 'Affordability Rating',
      type: 'text',
      explanation: 'How affordable the consolidation is'
    },

    // Break-even Analysis
    {
      id: 'breakEvenMonths',
      label: 'Break-even Period',
      type: 'number',
      explanation: 'Months to recover consolidation costs through savings'
    },
    {
      id: 'breakEvenSavings',
      label: 'Break-even Savings',
      type: 'currency',
      explanation: 'Savings needed to break even on consolidation'
    },

    // Alternative Strategy Savings
    {
      id: 'debtAvalancheSavings',
      label: 'Avalanche Strategy Savings',
      type: 'currency',
      explanation: 'Interest savings with debt avalanche method'
    },
    {
      id: 'debtSnowballSavings',
      label: 'Snowball Strategy Savings',
      type: 'currency',
      explanation: 'Interest savings with debt snowball method'
    },

    // Recommendations
    {
      id: 'recommendedStrategy',
      label: 'Recommended Strategy',
      type: 'text',
      explanation: 'Best payoff strategy for your situation'
    },
    {
      id: 'consolidationRating',
      label: 'Consolidation Rating',
      type: 'text',
      explanation: 'How beneficial consolidation is for you'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Potential risks and considerations'
    },
    {
      id: 'nextSteps',
      label: 'Recommended Next Steps',
      type: 'text',
      explanation: 'Action items based on your analysis'
    }
  ],

  formulas: [],

  validationRules: getDebtConsolidationValidationRules(),

  examples: [
    {
      title: 'High-Interest Credit Card Debt Consolidation',
      description: '35-year-old with $15,000 credit card debt at 22.99% APR',
      inputs: {
        consolidationAmount: 15000,
        consolidationRate: 12.99,
        consolidationTerm: 60,
        consolidationFees: 500,
        creditCardBalance: 15000,
        creditCardRate: 22.99,
        personalLoanBalance: 0,
        personalLoanRate: 0,
        monthlyIncome: 5500,
        monthlyExpenses: 3500,
        payoffPriority: 'lowest_rate',
        targetMonthlyPayment: 300
      },
      expectedOutputs: {
        totalCurrentDebt: 15000,
        totalCurrentPayments: 375,
        weightedAverageRate: 22.99,
        totalCurrentInterest: 7500,
        consolidationPayment: 346,
        totalConsolidationCost: 20800,
        totalConsolidationInterest: 5800,
        interestSavings: 1700,
        paymentSavings: 29,
        payoffTimeCurrent: 60,
        payoffTimeConsolidated: 60,
        monthsSaved: 0,
        currentDTI: 6.8,
        consolidatedDTI: 6.3,
        affordabilityRating: 'excellent',
        breakEvenMonths: 17,
        breakEvenSavings: 500,
        recommendedStrategy: 'Strong consolidation candidate - significant savings available',
        consolidationRating: 'excellent'
      }
    },
    {
      title: 'Multiple Debt Consolidation',
      description: '42-year-old with mixed debts totaling $25,000',
      inputs: {
        consolidationAmount: 25000,
        consolidationRate: 9.99,
        consolidationTerm: 72,
        consolidationFees: 750,
        creditCardBalance: 12000,
        creditCardRate: 19.99,
        personalLoanBalance: 8000,
        personalLoanRate: 14.99,
        monthlyIncome: 6500,
        monthlyExpenses: 4000,
        payoffPriority: 'lowest_rate',
        targetMonthlyPayment: 450
      },
      expectedOutputs: {
        totalCurrentDebt: 20000,
        totalCurrentPayments: 520,
        weightedAverageRate: 17.8,
        totalCurrentInterest: 12000,
        consolidationPayment: 428,
        totalConsolidationCost: 30800,
        totalConsolidationInterest: 5800,
        interestSavings: 6200,
        paymentSavings: 92,
        payoffTimeCurrent: 72,
        payoffTimeConsolidated: 72,
        monthsSaved: 0,
        currentDTI: 8.0,
        consolidatedDTI: 6.6,
        affordabilityRating: 'excellent',
        breakEvenMonths: 8,
        breakEvenSavings: 750,
        recommendedStrategy: 'Strong consolidation candidate - significant savings available',
        consolidationRating: 'excellent'
      }
    },
    {
      title: 'Small Balance - Consider Alternatives',
      description: '28-year-old with $5,000 credit card debt',
      inputs: {
        consolidationAmount: 5000,
        consolidationRate: 15.99,
        consolidationTerm: 36,
        consolidationFees: 200,
        creditCardBalance: 5000,
        creditCardRate: 24.99,
        personalLoanBalance: 0,
        personalLoanRate: 0,
        monthlyIncome: 4000,
        monthlyExpenses: 2800,
        payoffPriority: 'lowest_rate',
        targetMonthlyPayment: 175
      },
      expectedOutputs: {
        totalCurrentDebt: 5000,
        totalCurrentPayments: 125,
        weightedAverageRate: 24.99,
        totalCurrentInterest: 2500,
        consolidationPayment: 162,
        totalConsolidationCost: 5832,
        totalConsolidationInterest: 832,
        interestSavings: 1668,
        paymentSavings: -37,
        payoffTimeCurrent: 60,
        payoffTimeConsolidated: 36,
        monthsSaved: 24,
        currentDTI: 3.1,
        consolidatedDTI: 4.1,
        affordabilityRating: 'excellent',
        breakEvenMonths: 5,
        breakEvenSavings: 200,
        recommendedStrategy: 'Good consolidation opportunity with moderate savings',
        consolidationRating: 'good'
      }
    }
  ]
};