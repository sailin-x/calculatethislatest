import { Calculator } from '../../types/calculator';
import { DynastyTrustGrowthEstimatorInputs, DynastyTrustGrowthEstimatorOutputs } from './types';
import { calculateDynastyTrustGrowthEstimator } from './formulas';
import { validateDynastyTrustGrowthEstimatorInputs } from './validation';

export const DynastyTrustGrowthEstimatorCalculator: Calculator = {
  id: 'DynastyTrustGrowth-estimator',
  title: 'Dynasty Trust Growth Estimator',
  category: 'finance',
  subcategory: 'Retirement',
  description: 'Calculate multi-generational wealth transfer through dynasty trusts, analyzing GST tax optimization, estate planning strategies, and long-term family wealth preservation with comprehensive risk assessment.',

  inputs: [
    // Trust Information
    {
      id: 'initialTrustValue',
      label: 'Initial Trust Value ($)',
      type: 'currency',
      required: true,
      min: 10000,
      max: 100000000,
      step: 10000,
      placeholder: '1000000',
      tooltip: 'Initial value of the dynasty trust'
    },
    {
      id: 'trustType',
      label: 'Trust Type',
      type: 'select',
      required: true,
      options: [
        { value: 'grantor', label: 'Grantor Trust' },
        { value: 'non_grantor', label: 'Non-Grantor Trust' },
        { value: 'perpetual', label: 'Perpetual Trust' },
        { value: 'rule_against_perpetuities', label: 'Rule Against Perpetuities' }
      ],
      placeholder: 'non_grantor',
      tooltip: 'Type of dynasty trust structure'
    },
    {
      id: 'trustDuration',
      label: 'Trust Duration (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 360,
      step: 1,
      placeholder: '100',
      tooltip: 'Duration the trust is designed to last'
    },

    // Growth Parameters
    {
      id: 'expectedAnnualReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.5,
      placeholder: '6',
      tooltip: 'Expected annual investment return'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '2.5',
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'annualContributions',
      label: 'Annual Contributions ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '0',
      tooltip: 'Annual contributions to the trust'
    },
    {
      id: 'contributionGrowthRate',
      label: 'Contribution Growth Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '3',
      tooltip: 'Expected growth rate of contributions'
    },

    // Tax Information
    {
      id: 'generationSkippingTaxRate',
      label: 'GST Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 40,
      step: 1,
      placeholder: '40',
      tooltip: 'Generation-skipping transfer tax rate'
    },
    {
      id: 'estateTaxRate',
      label: 'Estate Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 40,
      step: 1,
      placeholder: '40',
      tooltip: 'Federal estate tax rate'
    },
    {
      id: 'incomeTaxRate',
      label: 'Income Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 40,
      step: 1,
      placeholder: '37',
      tooltip: 'Trust income tax rate'
    },
    {
      id: 'gstExemptionAmount',
      label: 'GST Exemption Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 15000000,
      step: 100000,
      placeholder: '12900000',
      tooltip: 'GST tax exemption amount'
    },

    // Beneficiary Information
    {
      id: 'numberOfGenerations',
      label: 'Number of Generations',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: '4',
      tooltip: 'Number of generations to analyze'
    },
    {
      id: 'generationInterval',
      label: 'Generation Interval (years)',
      type: 'number',
      required: true,
      min: 20,
      max: 50,
      step: 1,
      placeholder: '25',
      tooltip: 'Years between generations'
    },
    {
      id: 'beneficiaryLifeExpectancy',
      label: 'Beneficiary Life Expectancy',
      type: 'number',
      required: true,
      min: 70,
      max: 120,
      step: 1,
      placeholder: '85',
      tooltip: 'Average life expectancy of beneficiaries'
    },

    // Trust Administration
    {
      id: 'annualAdministrativeFees',
      label: 'Annual Administrative Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '5000',
      tooltip: 'Annual trust administration costs'
    },
    {
      id: 'investmentManagementFees',
      label: 'Investment Management Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '15000',
      tooltip: 'Annual investment management fees'
    },
    {
      id: 'trusteeFees',
      label: 'Trustee Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '8000',
      tooltip: 'Annual trustee compensation'
    },

    // Distribution Strategy
    {
      id: 'distributionStrategy',
      label: 'Distribution Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'equal', label: 'Equal Distribution' },
        { value: 'needs_based', label: 'Needs-Based' },
        { value: 'percentage', label: 'Percentage of Value' },
        { value: 'discretionary', label: 'Discretionary' }
      ],
      placeholder: 'discretionary',
      tooltip: 'Strategy for trust distributions'
    },
    {
      id: 'annualDistributionRate',
      label: 'Annual Distribution Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '3',
      tooltip: 'Annual distribution as percentage of trust value'
    },
    {
      id: 'minimumDistributionAmount',
      label: 'Minimum Distribution Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '10000',
      tooltip: 'Minimum annual distribution amount'
    },

    // Risk Factors
    {
      id: 'marketVolatility',
      label: 'Market Volatility (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '15',
      tooltip: 'Expected market volatility'
    },
    {
      id: 'longevityRisk',
      label: 'Longevity Risk (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '10',
      tooltip: 'Risk of beneficiaries living longer than expected'
    },
    {
      id: 'regulatoryRisk',
      label: 'Regulatory Risk (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '5',
      tooltip: 'Risk of regulatory changes affecting trust'
    },

    // Analysis Parameters
    {
      id: 'analysisHorizon',
      label: 'Analysis Horizon (years)',
      type: 'number',
      required: true,
      min: 10,
      max: 200,
      step: 5,
      placeholder: '100',
      tooltip: 'Time period for analysis'
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.5,
      placeholder: '4',
      tooltip: 'Rate used to discount future values'
    },

    // Currency
    {
      id: 'currency',
      label: 'Currency',
      type: 'select',
      required: true,
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'CAD', label: 'CAD' },
        { value: 'AUD', label: 'AUD' }
      ],
      placeholder: 'USD',
      tooltip: 'Currency for calculations'
    }
  ],

  outputs: [
    { id: 'finalTrustValue', label: 'Final Trust Value', type: 'currency', explanation: 'Projected trust value at end of analysis period' },
    { id: 'totalTaxesPaid', label: 'Total Taxes Paid', type: 'currency', explanation: 'Total GST and estate taxes paid over analysis period' },
    { id: 'netGenerationalWealth', label: 'Net Generational Wealth', type: 'currency', explanation: 'Net wealth transferred to future generations' },
    { id: 'trustEfficiency', label: 'Trust Efficiency', type: 'percentage', explanation: 'Efficiency of wealth transfer after taxes and fees' },
    { id: 'metrics', label: 'Growth Metrics', type: 'text', explanation: 'Detailed growth and performance metrics' },
    { id: 'analysis', label: 'Comprehensive Analysis', type: 'text', explanation: 'Detailed trust analysis and recommendations' }
  ],


  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Multi-Generational Wealth Preservation',
      description: 'Analysis of a dynasty trust for preserving wealth across 4 generations',
      inputs: {
        initialTrustValue: 10000000,
        trustType: 'non_grantor',
        stateOfCreation: 'Delaware',
        trustDuration: 100,
        expectedAnnualReturn: 0.06,
        inflationRate: 0.025,
        annualContributions: 50000,
        contributionGrowthRate: 0.03,
        generationSkippingTaxRate: 0.4,
        estateTaxRate: 0.4,
        incomeTaxRate: 0.37,
        gstExemptionAmount: 12900000,
        numberOfGenerations: 4,
        generationInterval: 25,
        beneficiaryLifeExpectancy: 85,
        annualAdministrativeFees: 5000,
        investmentManagementFees: 15000,
        trusteeFees: 8000,
        distributionStrategy: 'discretionary',
        annualDistributionRate: 0.03,
        minimumDistributionAmount: 10000,
        marketVolatility: 0.15,
        longevityRisk: 0.1,
        regulatoryRisk: 0.05,
        analysisHorizon: 100,
        discountRate: 0.04,
        currency: 'USD'
      },
      expectedOutputs: {
        finalTrustValue: 85000000,
        totalTaxesPaid: 12000000,
        netGenerationalWealth: 73000000,
        trustEfficiency: 0.86,
        metrics: 'Comprehensive growth metrics calculated',
        analysis: 'Detailed dynasty trust analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter initial trust value and structure details',
    'Specify growth parameters and expected returns',
    'Input tax rates and exemption amounts',
    'Define beneficiary generations and intervals',
    'Set distribution strategy and risk parameters',
    'Review multi-generational wealth transfer analysis',
    'Consider tax optimization and regulatory compliance',
    'Evaluate trust efficiency and long-term preservation'
  ]
};