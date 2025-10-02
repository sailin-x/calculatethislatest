import { Calculator, Formula } from '../../types/calculator';
import { calculateRealEstateWaterfallModel } from './formulas';
import { getRealEstateWaterfallModelValidationRules } from './validation';

/**
 * Real estate waterfall model formula implementation
 */
const realEstateWaterfallModelFormula: Formula = {
  id: 'real-estate-waterfall-model',
  name: 'Real Estate Waterfall Model',
  description: 'Calculate waterfall distribution model for real estate syndications',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateRealEstateWaterfallModel(inputs as any);
    return {
      outputs: result,
      explanation: 'Real estate waterfall model calculated',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading real estate waterfall model calculator with comprehensive features
 */
export const realEstateWaterfallModelCalculator: Calculator = {
  id: 'real-estate-waterfall-model-calculator',
  title: 'Real Estate Waterfall Model Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive real estate waterfall distribution model calculator for syndications, including preferred returns, profit splits, promote structures, and IRR calculations with industry-standard accuracy.',

  usageInstructions: [
    'Enter project costs, equity amounts, and loan terms',
    'Set preferred return and profit split percentages',
    'Input total cash flow, appreciation, and principal paydown',
    'Choose waterfall type and promote structure',
    'Review detailed distribution waterfall and returns'
  ],

  inputs: [
    {
      id: 'totalProjectCost',
      label: 'Total Project Cost',
      type: 'currency',
      required: true,
      placeholder: '1000000',
      tooltip: 'Total cost of the real estate project',
      defaultValue: 1000000
    },
    {
      id: 'sponsorEquity',
      label: 'Sponsor Equity',
      type: 'currency',
      required: true,
      placeholder: '100000',
      tooltip: 'Amount of equity contributed by the sponsor',
      defaultValue: 100000
    },
    {
      id: 'investorEquity',
      label: 'Investor Equity',
      type: 'currency',
      required: true,
      placeholder: '900000',
      tooltip: 'Amount of equity contributed by investors',
      defaultValue: 900000
    },
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Amount of debt financing',
      defaultValue: 0
    },
    {
      id: 'preferredReturn',
      label: 'Preferred Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '8',
      tooltip: 'Annual preferred return to investors',
      defaultValue: 8,
      min: 0,
      max: 20,
      step: 0.5
    },
    {
      id: 'sponsorProfitSplit',
      label: 'Sponsor Profit Split (%)',
      type: 'percentage',
      required: true,
      placeholder: '20',
      tooltip: 'Sponsor share of profits after preferred return',
      defaultValue: 20,
      min: 0,
      max: 100
    },
    {
      id: 'investorProfitSplit',
      label: 'Investor Profit Split (%)',
      type: 'percentage',
      required: true,
      placeholder: '80',
      tooltip: 'Investor share of profits after preferred return',
      defaultValue: 80,
      min: 0,
      max: 100
    },
    {
      id: 'totalCashFlow',
      label: 'Total Cash Flow',
      type: 'currency',
      required: false,
      placeholder: '200000',
      tooltip: 'Total cash flow over holding period',
      defaultValue: 200000
    },
    {
      id: 'totalAppreciation',
      label: 'Total Appreciation',
      type: 'currency',
      required: false,
      placeholder: '300000',
      tooltip: 'Total property appreciation over holding period',
      defaultValue: 300000
    },
    {
      id: 'totalPrincipalPaydown',
      label: 'Total Principal Paydown',
      type: 'currency',
      required: false,
      placeholder: '50000',
      tooltip: 'Total loan principal paydown over holding period',
      defaultValue: 50000
    },
    {
      id: 'holdingPeriodYears',
      label: 'Holding Period (Years)',
      type: 'number',
      required: true,
      placeholder: '5',
      tooltip: 'Number of years to hold the investment',
      defaultValue: 5,
      min: 1,
      max: 30
    },
    {
      id: 'waterfallType',
      label: 'Waterfall Type',
      type: 'select',
      required: true,
      options: [
        { value: 'american', label: 'American Waterfall' },
        { value: 'european', label: 'European Waterfall' },
        { value: 'tiered', label: 'Tiered Waterfall' }
      ],
      tooltip: 'Type of waterfall distribution structure',
      defaultValue: 'american'
    },
    {
      id: 'promoteStructure',
      label: 'Promote Structure',
      type: 'select',
      required: true,
      options: [
        { value: 'straight', label: 'Straight Split' },
        { value: 'catch_up', label: 'Catch-up Structure' }
      ],
      tooltip: 'How sponsor promote is structured',
      defaultValue: 'straight'
    },
    {
      id: 'irrTarget',
      label: 'Target IRR (%)',
      type: 'percentage',
      required: false,
      placeholder: '15',
      tooltip: 'Target internal rate of return',
      defaultValue: 15,
      min: 0,
      max: 50
    }
  ],

  outputs: [
    {
      id: 'totalEquity',
      label: 'Total Equity',
      type: 'currency',
      explanation: 'Total equity contributed to the project'
    },
    {
      id: 'sponsorOwnershipPercentage',
      label: 'Sponsor Ownership %',
      type: 'percentage',
      explanation: 'Sponsor equity as percentage of total equity'
    },
    {
      id: 'investorOwnershipPercentage',
      label: 'Investor Ownership %',
      type: 'percentage',
      explanation: 'Investor equity as percentage of total equity'
    },
    {
      id: 'totalDistributions',
      label: 'Total Distributions',
      type: 'currency',
      explanation: 'Total cash distributions to all parties'
    },
    {
      id: 'sponsorDistributions',
      label: 'Sponsor Distributions',
      type: 'currency',
      explanation: 'Total distributions to sponsor'
    },
    {
      id: 'investorDistributions',
      label: 'Investor Distributions',
      type: 'currency',
      explanation: 'Total distributions to investors'
    },
    {
      id: 'sponsorPromote',
      label: 'Sponsor Promote',
      type: 'currency',
      explanation: 'Additional sponsor share above profit split'
    },
    {
      id: 'investorPreferredReturn',
      label: 'Investor Preferred Return',
      type: 'currency',
      explanation: 'Preferred return paid to investors'
    },
    {
      id: 'sponsorPreferredReturn',
      label: 'Sponsor Preferred Return',
      type: 'currency',
      explanation: 'Preferred return paid to sponsor'
    },
    {
      id: 'totalSponsorProfit',
      label: 'Total Sponsor Profit',
      type: 'currency',
      explanation: 'Total profit allocated to sponsor'
    },
    {
      id: 'totalInvestorProfit',
      label: 'Total Investor Profit',
      type: 'currency',
      explanation: 'Total profit allocated to investors'
    },
    {
      id: 'sponsorIRR',
      label: 'Sponsor IRR (%)',
      type: 'percentage',
      explanation: 'Internal rate of return for sponsor equity'
    },
    {
      id: 'investorIRR',
      label: 'Investor IRR (%)',
      type: 'percentage',
      explanation: 'Internal rate of return for investor equity'
    },
    {
      id: 'equityMultiple',
      label: 'Equity Multiple',
      type: 'number',
      explanation: 'Total return as multiple of equity invested'
    }
  ],

  formulas: [realEstateWaterfallModelFormula],

  validationRules: getRealEstateWaterfallModelValidationRules(),

  examples: [
    {
      title: 'Successful Real Estate Syndication',
      description: 'Complete waterfall analysis for a profitable real estate syndication deal',
      inputs: {
        totalProjectCost: 1000000,
        sponsorEquity: 100000,
        investorEquity: 900000,
        loanAmount: 0,
        preferredReturn: 8,
        sponsorProfitSplit: 20,
        investorProfitSplit: 80,
        totalCashFlow: 200000,
        totalAppreciation: 300000,
        totalPrincipalPaydown: 50000,
        holdingPeriodYears: 5,
        waterfallType: 'american',
        promoteStructure: 'straight',
        irrTarget: 15
      },
      expectedOutputs: {
        totalEquity: 1000000,
        sponsorOwnershipPercentage: 10,
        investorOwnershipPercentage: 90,
        totalDistributions: 550000,
        sponsorDistributions: 100000,
        investorDistributions: 450000,
        sponsorPromote: 0,
        investorPreferredReturn: 360000,
        sponsorPreferredReturn: 40000,
        totalSponsorProfit: 0,
        totalInvestorProfit: 90000,
        sponsorIRR: 8.0,
        investorIRR: 10.5,
        equityMultiple: 1.55
      }
    }
  ]
};