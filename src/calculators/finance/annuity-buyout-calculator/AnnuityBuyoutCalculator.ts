import { Calculator, Formula } from '../../types/calculator';
import { calculateAnnuityBuyout, validateAnnuityBuyoutInputs } from './formulas';
import { getAnnuityBuyoutValidationRules } from './validation';

/**
 * Annuity buyout formula implementation
 */
const annuityBuyoutFormula: Formula = {
  id: 'annuity-buyout',
  name: 'Annuity Buyout',
  description: 'Calculate annuity buyout analysis and compare with alternative investments',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateAnnuityBuyout(inputs as any);
    return {
      outputs: result,
      explanation: 'Annuity buyout analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading annuity buyout calculator with comprehensive features
 */
export const annuityBuyoutCalculator: Calculator = {
  id: 'annuity-buyout-calculator',
  title: 'Annuity Buyout Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Comprehensive annuity buyout analysis comparing lump-sum offers with continued annuity payments and alternative investment options, including tax implications and risk-adjusted returns.',

  usageInstructions: [
    'Enter your current annuity details and buyout offer',
    'Specify alternative investment options and time horizon',
    'Review present value analysis and break-even calculations',
    'Consider tax implications and risk factors'
  ],

  inputs: [
    {
      id: 'currentAnnuityValue',
      label: 'Current Annuity Value',
      type: 'currency',
      required: true,
      placeholder: '100000',
      tooltip: 'Current cash value of your annuity',
      defaultValue: 100000
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      required: true,
      placeholder: '1000',
      tooltip: 'Monthly payment amount from annuity',
      defaultValue: 1000
    },
    {
      id: 'remainingPayments',
      label: 'Remaining Payments',
      type: 'number',
      required: true,
      placeholder: '120',
      tooltip: 'Number of monthly payments remaining',
      defaultValue: 120,
      min: 1,
      max: 600
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '4.0',
      tooltip: 'Annual interest rate for present value calculations',
      defaultValue: 4.0,
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      id: 'buyoutOffer',
      label: 'Buyout Offer Amount',
      type: 'currency',
      required: true,
      placeholder: '95000',
      tooltip: 'Lump-sum buyout offer from annuity provider',
      defaultValue: 95000
    },
    {
      id: 'buyoutFees',
      label: 'Buyout Fees',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Fees associated with accepting buyout',
      defaultValue: 2000
    },
    {
      id: 'buyoutTaxes',
      label: 'Buyout Taxes',
      type: 'currency',
      required: false,
      placeholder: '15000',
      tooltip: 'Taxes due on buyout amount',
      defaultValue: 15000
    },
    {
      id: 'alternativeInvestmentRate',
      label: 'Alternative Investment Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '6.0',
      tooltip: 'Expected annual return on alternative investments',
      defaultValue: 6.0,
      min: 0,
      max: 30,
      step: 0.1
    },
    {
      id: 'alternativeInvestmentFees',
      label: 'Alternative Investment Fees',
      type: 'currency',
      required: false,
      placeholder: '1000',
      tooltip: 'Annual fees for alternative investments',
      defaultValue: 1000
    },
    {
      id: 'timeHorizon',
      label: 'Time Horizon (Years)',
      type: 'number',
      required: true,
      placeholder: '10',
      tooltip: 'Investment time horizon for analysis',
      defaultValue: 10,
      min: 1,
      max: 50
    },
    {
      id: 'age',
      label: 'Your Age',
      type: 'number',
      required: true,
      placeholder: '65',
      tooltip: 'Your current age',
      defaultValue: 65,
      min: 18,
      max: 120
    },
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'percentage',
      required: true,
      placeholder: '22',
      tooltip: 'Your marginal tax bracket',
      defaultValue: 22,
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'riskTolerance',
      label: 'Risk Tolerance',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low Risk' },
        { value: 'medium', label: 'Medium Risk' },
        { value: 'high', label: 'High Risk' }
      ],
      tooltip: 'Your risk tolerance for investments',
      defaultValue: 'medium'
    },
    {
      id: 'includeInflation',
      label: 'Include Inflation',
      type: 'boolean',
      required: false,
      tooltip: 'Adjust calculations for inflation',
      defaultValue: true
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '3.0',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 3.0,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '5.0',
      tooltip: 'Rate used to discount future values',
      defaultValue: 5.0,
      min: 0,
      max: 20,
      step: 0.1
    }
  ],

  outputs: [
    {
      id: 'presentValueOfRemainingPayments',
      label: 'Present Value of Remaining Payments',
      type: 'currency',
      explanation: 'Current value of all remaining annuity payments'
    },
    {
      id: 'totalValueReceived',
      label: 'Total Value if Continued',
      type: 'currency',
      explanation: 'Total value received if annuity payments continue'
    },
    {
      id: 'netBuyoutValue',
      label: 'Net Buyout Value',
      type: 'currency',
      explanation: 'Buyout amount after fees and taxes'
    },
    {
      id: 'buyoutVsPresentValue',
      label: 'Buyout vs Present Value',
      type: 'currency',
      explanation: 'Difference between buyout and present value'
    },
    {
      id: 'buyoutEfficiency',
      label: 'Buyout Efficiency (%)',
      type: 'percentage',
      explanation: 'Buyout amount as percentage of present value'
    },
    {
      id: 'breakEvenPeriod',
      label: 'Break-Even Period (Months)',
      type: 'number',
      explanation: 'Months to recover buyout costs through higher payments'
    },
    {
      id: 'alternativeInvestmentValue',
      label: 'Alternative Investment Value',
      type: 'currency',
      explanation: 'Projected value of alternative investments'
    },
    {
      id: 'alternativeVsBuyout',
      label: 'Alternative vs Buyout',
      type: 'currency',
      explanation: 'Comparison of alternative investment vs buyout'
    },
    {
      id: 'riskAdjustedReturn',
      label: 'Risk-Adjusted Return (%)',
      type: 'percentage',
      explanation: 'Return adjusted for risk tolerance'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from buyout vs continued payments'
    },
    {
      id: 'afterTaxBuyoutValue',
      label: 'After-Tax Buyout Value',
      type: 'currency',
      explanation: 'Buyout value after taxes'
    },
    {
      id: 'afterTaxAlternativeValue',
      label: 'After-Tax Alternative Value',
      type: 'currency',
      explanation: 'Alternative investment value after taxes'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Recommendation based on analysis'
    },
    {
      id: 'confidenceLevel',
      label: 'Confidence Level',
      type: 'text',
      explanation: 'Confidence level in the analysis'
    },
    {
      id: 'nextSteps',
      label: 'Next Steps',
      type: 'text',
      explanation: 'Recommended next steps'
    },
    {
      id: 'warnings',
      label: 'Warnings',
      type: 'text',
      explanation: 'Important warnings and considerations'
    }
  ],

  formulas: [annuityBuyoutFormula],

  validationRules: getAnnuityBuyoutValidationRules(),

  examples: [
    {
      title: 'Retirement Annuity Buyout Analysis',
      description: '65-year-old retiree evaluating annuity buyout offer',
      inputs: {
        currentAnnuityValue: 100000,
        monthlyPayment: 1000,
        remainingPayments: 120,
        interestRate: 4.0,
        buyoutOffer: 95000,
        buyoutFees: 2000,
        buyoutTaxes: 15000,
        alternativeInvestmentRate: 6.0,
        alternativeInvestmentFees: 1000,
        timeHorizon: 10,
        age: 65,
        taxBracket: 22,
        riskTolerance: 'medium',
        includeInflation: true,
        inflationRate: 3.0,
        discountRate: 5.0
      },
      expectedOutputs: {
        presentValueOfRemainingPayments: 104000,
        totalValueReceived: 220000,
        netBuyoutValue: 78000,
        buyoutVsPresentValue: -26000,
        buyoutEfficiency: 75,
        breakEvenPeriod: 22,
        alternativeInvestmentValue: 119000,
        alternativeVsBuyout: 41000,
        riskAdjustedReturn: 4.8,
        taxSavings: 3300,
        afterTaxBuyoutValue: 74700,
        afterTaxAlternativeValue: 92460,
        recommendation: 'Consider rejecting the buyout and pursuing alternative investments. The potential returns from alternative investments exceed the buyout offer.',
        confidenceLevel: 'Medium confidence - Moderate time horizon provides reasonable analysis reliability.',
        nextSteps: 'Research alternative investment options, Consult with financial advisor about investment strategy, Review annuity contract terms for any penalties, Consider negotiating better terms with annuity provider',
        warnings: 'Age consideration: At age 70+, consider required minimum distributions and tax implications.'
      }
    }
  ]
};