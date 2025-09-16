import { Calculator, Formula } from '../../../types/calculator';
import { calculateRealEstateSyndication } from './formulas';
import { getRealEstateSyndicationValidationRules } from './validation';

/**
 * Real estate syndication formula implementation
 */
const realEstateSyndicationFormula: Formula = {
  id: 'real-estate-syndication',
  name: 'Real Estate Syndication',
  description: 'Calculate syndication structure, investor returns, and profit distribution',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateRealEstateSyndication(inputs);
    return {
      outputs: result,
      explanation: 'Real estate syndication analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading real estate syndication calculator with comprehensive features
 */
export const realEstateSyndicationCalculator: Calculator = {
  id: 'real-estate-syndication-calculator',
  title: 'Real Estate Syndication Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive real estate syndication analysis including capital structure, waterfall distribution, investor returns, syndication fees, and risk metrics with industry-standard accuracy.',

  usageInstructions: [
    'Enter project details including total cost, equity amounts, and loan terms',
    'Specify syndication structure including profit splits and preferred returns',
    'Input revenue assumptions and holding period',
    'Review comprehensive syndication analysis and investor returns'
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
      id: 'totalUnits',
      label: 'Total Units',
      type: 'number',
      required: true,
      placeholder: '100',
      tooltip: 'Total number of rental units in the property',
      defaultValue: 100,
      min: 1,
      max: 10000
    },
    {
      id: 'averageRentPerUnit',
      label: 'Average Rent per Unit',
      type: 'currency',
      required: true,
      placeholder: '1500',
      tooltip: 'Average monthly rent per unit',
      defaultValue: 1500,
      step: 50
    },
    {
      id: 'vacancyRate',
      label: 'Vacancy Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '5',
      tooltip: 'Expected vacancy rate',
      defaultValue: 5,
      min: 0,
      max: 100
    },
    {
      id: 'operatingExpensesRate',
      label: 'Operating Expenses Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '35',
      tooltip: 'Annual operating expenses as percentage of gross income',
      defaultValue: 35,
      min: 0,
      max: 100
    },
    {
      id: 'capRate',
      label: 'Exit Cap Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '6',
      tooltip: 'Capitalization rate at exit',
      defaultValue: 6,
      min: 1,
      max: 20
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
      id: 'promoteStructure',
      label: 'Promote Structure',
      type: 'select',
      required: true,
      options: [
        { value: 'straight', label: 'Straight Split' },
        { value: 'waterfall', label: 'Waterfall Distribution' }
      ],
      tooltip: 'How sponsor promote is structured',
      defaultValue: 'straight'
    },
    {
      id: 'promotePercentage',
      label: 'Promote Percentage (%)',
      type: 'percentage',
      required: false,
      placeholder: '20',
      tooltip: 'Additional sponsor share above profit split',
      defaultValue: 20,
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
      id: 'sponsorEquityPercentage',
      label: 'Sponsor Equity %',
      type: 'percentage',
      explanation: 'Sponsor equity as percentage of total equity'
    },
    {
      id: 'investorEquityPercentage',
      label: 'Investor Equity %',
      type: 'percentage',
      explanation: 'Investor equity as percentage of total equity'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio (%)',
      type: 'percentage',
      explanation: 'Debt as percentage of total project cost'
    },
    {
      id: 'grossAnnualRent',
      label: 'Gross Annual Rent',
      type: 'currency',
      explanation: 'Total gross annual rental income'
    },
    {
      id: 'effectiveGrossIncome',
      label: 'Effective Gross Income',
      type: 'currency',
      explanation: 'Rental income after vacancy allowance'
    },
    {
      id: 'netOperatingIncome',
      label: 'Net Operating Income',
      type: 'currency',
      explanation: 'Income after operating expenses'
    },
    {
      id: 'debtServiceCoverageRatio',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      explanation: 'NOI divided by annual debt service'
    },
    {
      id: 'exitValue',
      label: 'Exit Value',
      type: 'currency',
      explanation: 'Property value at exit based on cap rate'
    },
    {
      id: 'totalCashFlow',
      label: 'Total Cash Flow',
      type: 'currency',
      explanation: 'Total cash flow over holding period'
    },
    {
      id: 'sponsorCashFlow',
      label: 'Sponsor Cash Flow',
      type: 'currency',
      explanation: 'Total cash flow allocated to sponsor'
    },
    {
      id: 'investorCashFlow',
      label: 'Investor Cash Flow',
      type: 'currency',
      explanation: 'Total cash flow allocated to investors'
    },
    {
      id: 'internalRateOfReturn',
      label: 'Internal Rate of Return (%)',
      type: 'percentage',
      explanation: 'Overall IRR for the investment'
    },
    {
      id: 'equityMultiple',
      label: 'Equity Multiple',
      type: 'number',
      explanation: 'Total return as multiple of equity invested'
    },
    {
      id: 'cashOnCashReturn',
      label: 'Cash-on-Cash Return (%)',
      type: 'percentage',
      explanation: 'First year cash flow as percentage of equity'
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
    }
  ],

  formulas: [realEstateSyndicationFormula],

  validationRules: getRealEstateSyndicationValidationRules(),

  examples: [
    {
      title: 'Multifamily Syndication Deal',
      description: 'Complete syndication analysis for a 100-unit multifamily property',
      inputs: {
        totalProjectCost: 1000000,
        sponsorEquity: 100000,
        investorEquity: 900000,
        loanAmount: 0,
        totalUnits: 100,
        averageRentPerUnit: 1500,
        vacancyRate: 5,
        operatingExpensesRate: 35,
        capRate: 6,
        holdingPeriodYears: 5,
        sponsorProfitSplit: 20,
        investorProfitSplit: 80,
        preferredReturn: 8,
        promoteStructure: 'straight',
        promotePercentage: 20
      },
      expectedOutputs: {
        totalEquity: 1000000,
        sponsorEquityPercentage: 10,
        investorEquityPercentage: 90,
        loanToValueRatio: 0,
        grossAnnualRent: 1800000,
        effectiveGrossIncome: 1710000,
        netOperatingIncome: 1111500,
        debtServiceCoverageRatio: 0,
        exitValue: 18525000,
        totalCashFlow: 19522500,
        sponsorCashFlow: 1952250,
        investorCashFlow: 17570250,
        internalRateOfReturn: 25.5,
        equityMultiple: 20.52,
        cashOnCashReturn: 22.23,
        sponsorIRR: 28.5,
        investorIRR: 25.2,
        totalSponsorProfit: 1852250,
        totalInvestorProfit: 16670250
      }
    }
  ]
};