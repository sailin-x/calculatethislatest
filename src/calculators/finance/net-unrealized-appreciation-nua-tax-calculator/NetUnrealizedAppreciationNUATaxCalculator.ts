import { Calculator } from '../../../types/calculator';
import { calculateNUA } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const netUnrealizedAppreciationNUATaxCalculator: Calculator = {
  id: 'net-unrealized-appreciation-nua-tax-calculator',
  title: 'Net Unrealized Appreciation (NUA) Tax Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate Net Unrealized Appreciation (NUA) tax benefits for qualified retirement plan distributions, including capital gains treatment vs. ordinary income, tax savings analysis, and optimal distribution strategies.',

  usageInstructions: [
    'Enter current and original share prices',
    'Specify holding period and tax information',
    'Review NUA tax savings and optimal strategies',
    'Compare lump-sum vs. periodic distribution options'
  ],

  inputs: [
    {
      id: 'currentSharePrice',
      label: 'Current Share Price',
      type: 'currency',
      required: true,
      placeholder: '150',
      tooltip: 'Current market price per share',
      defaultValue: 150,
      min: 0,
      max: 10000
    },
    {
      id: 'originalPurchasePrice',
      label: 'Original Purchase Price',
      type: 'currency',
      required: true,
      placeholder: '50',
      tooltip: 'Original cost per share',
      defaultValue: 50,
      min: 0,
      max: 10000
    },
    {
      id: 'numberOfShares',
      label: 'Number of Shares',
      type: 'number',
      required: true,
      placeholder: '1000',
      tooltip: 'Total shares to be distributed',
      defaultValue: 1000,
      min: 1,
      max: 1000000
    },
    {
      id: 'yearsHeld',
      label: 'Years Held',
      type: 'number',
      required: true,
      placeholder: '10',
      tooltip: 'Years shares have been held',
      defaultValue: 10,
      min: 0,
      max: 50
    },
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'percentage',
      required: true,
      placeholder: '32',
      tooltip: 'Your federal marginal tax rate',
      defaultValue: 32,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '8',
      tooltip: 'State income tax rate',
      defaultValue: 8,
      min: 0,
      max: 20,
      step: 0.5
    },
    {
      id: 'expectedGrowthRate',
      label: 'Expected Growth Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '7',
      tooltip: 'Expected annual growth rate',
      defaultValue: 7,
      min: -20,
      max: 50,
      step: 0.5
    },
    {
      id: 'yearsToSale',
      label: 'Years to Sale',
      type: 'number',
      required: true,
      placeholder: '1',
      tooltip: 'Years until shares will be sold',
      defaultValue: 1,
      min: 0,
      max: 30
    },
    {
      id: 'lumpSumDistribution',
      label: 'Lump Sum Distribution',
      type: 'boolean',
      required: false,
      tooltip: 'Plan to take lump sum distribution',
      defaultValue: true
    },
    {
      id: 'includeStateTax',
      label: 'Include State Tax',
      type: 'boolean',
      required: false,
      tooltip: 'Include state tax calculations',
      defaultValue: true
    },
    {
      id: 'employerStock',
      label: 'Employer Stock',
      type: 'boolean',
      required: false,
      tooltip: 'Shares are from employer stock plan',
      defaultValue: true
    }
  ],

  outputs: [
    {
      id: 'netUnrealizedAppreciation',
      label: 'Net Unrealized Appreciation',
      type: 'currency',
      explanation: 'Total appreciation subject to capital gains tax'
    },
    {
      id: 'capitalGainsTax',
      label: 'Capital Gains Tax',
      type: 'currency',
      explanation: 'Tax on appreciation at 20% federal rate'
    },
    {
      id: 'ordinaryIncomeTax',
      label: 'Ordinary Income Tax',
      type: 'currency',
      explanation: 'Tax on cost basis at ordinary rates'
    },
    {
      id: 'totalTaxLiability',
      label: 'Total Tax Liability',
      type: 'currency',
      explanation: 'Combined federal and state taxes'
    },
    {
      id: 'afterTaxValue',
      label: 'After-Tax Value',
      type: 'currency',
      explanation: 'Value after all taxes'
    },
    {
      id: 'taxSavingsVsOrdinary',
      label: 'Tax Savings vs. Ordinary Income',
      type: 'currency',
      explanation: 'Tax savings from NUA treatment'
    },
    {
      id: 'breakEvenSharePrice',
      label: 'Break-Even Share Price',
      type: 'currency',
      explanation: 'Price where NUA and ordinary tax are equal'
    },
    {
      id: 'optimalHoldingPeriod',
      label: 'Optimal Holding Period (Years)',
      type: 'number',
      explanation: 'Best time to hold shares for tax benefits'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('currentSharePrice', 'Current share price is required'),
    ValidationRuleFactory.required('originalPurchasePrice', 'Original purchase price is required'),
    ValidationRuleFactory.required('numberOfShares', 'Number of shares is required'),
    ValidationRuleFactory.required('yearsHeld', 'Years held is required'),
    ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
    ValidationRuleFactory.required('expectedGrowthRate', 'Expected growth rate is required'),
    ValidationRuleFactory.required('yearsToSale', 'Years to sale is required'),
    ValidationRuleFactory.range('currentSharePrice', 0, 10000, 'Current share price must be between $0 and $10,000'),
    ValidationRuleFactory.range('originalPurchasePrice', 0, 10000, 'Original purchase price must be between $0 and $10,000'),
    ValidationRuleFactory.range('numberOfShares', 1, 1000000, 'Number of shares must be between 1 and 1,000,000'),
    ValidationRuleFactory.range('yearsHeld', 0, 50, 'Years held must be between 0 and 50'),
    ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
    ValidationRuleFactory.range('expectedGrowthRate', -20, 50, 'Expected growth rate must be between -20% and 50%'),
    ValidationRuleFactory.range('yearsToSale', 0, 30, 'Years to sale must be between 0 and 30'),
    ValidationRuleFactory.businessRule(
      'currentSharePrice',
      (currentSharePrice, allInputs) => {
        if (!allInputs?.originalPurchasePrice) return true;
        return currentSharePrice >= allInputs.originalPurchasePrice;
      },
      'Current share price should be at least equal to original purchase price'
    ),
    ValidationRuleFactory.businessRule(
      'yearsHeld',
      (yearsHeld) => {
        if (yearsHeld < 5) {
          return true; // Allow but may reduce NUA benefits
        }
        return true;
      },
      'NUA benefits are optimized with longer holding periods'
    )
  ],

  examples: [
    {
      title: 'Employer Stock NUA Strategy',
      description: 'NUA calculation for employer stock with significant appreciation',
      inputs: {
        currentSharePrice: 200,
        originalPurchasePrice: 50,
        numberOfShares: 1000,
        yearsHeld: 15,
        taxBracket: 35,
        stateTaxRate: 8,
        expectedGrowthRate: 8,
        yearsToSale: 2,
        lumpSumDistribution: true,
        includeStateTax: true,
        employerStock: true
      },
      expectedOutputs: {
        netUnrealizedAppreciation: 150000,
        capitalGainsTax: 30000,
        ordinaryIncomeTax: 17500,
        totalTaxLiability: 51500,
        afterTaxValue: 198500,
        taxSavingsVsOrdinary: 98500,
        breakEvenSharePrice: 67.5,
        optimalHoldingPeriod: 8
      }
    },
    {
      title: 'Short-term Holding NUA',
      description: 'NUA analysis for shares held less than 5 years',
      inputs: {
        currentSharePrice: 120,
        originalPurchasePrice: 80,
        numberOfShares: 500,
        yearsHeld: 3,
        taxBracket: 28,
        stateTaxRate: 6,
        expectedGrowthRate: 6,
        yearsToSale: 1,
        lumpSumDistribution: false,
        includeStateTax: true,
        employerStock: true
      },
      expectedOutputs: {
        netUnrealizedAppreciation: 20000,
        capitalGainsTax: 4000,
        ordinaryIncomeTax: 11200,
        totalTaxLiability: 16800,
        afterTaxValue: 33200,
        taxSavingsVsOrdinary: 22400,
        breakEvenSharePrice: 92.8,
        optimalHoldingPeriod: 5
      }
    }
  ]
};