import { Calculator } from '../../../types/Calculator';
import { calculateRealEstateSyndication } from './formulas';
import { validateRealEstateSyndicationInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const realEstateSyndicationCalculator: Calculator = {
  id: 'real-estate-syndication',
  name: 'Real Estate Syndication Calculator',
  description: 'Comprehensive calculator for real estate syndication investments including sponsor fees, investor returns, and waterfall structures.',
  category: 'Finance',
  tags: ['real estate', 'syndication', 'investment', 'sponsor', 'investor', 'waterfall', 'fees'],
  inputs: [
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'multifamily', label: 'Multifamily' },
        { value: 'office', label: 'Office' },
        { value: 'retail', label: 'Retail' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'hotel', label: 'Hotel' },
        { value: 'mixed_use', label: 'Mixed Use' },
        { value: 'land', label: 'Land Development' },
        { value: 'self_storage', label: 'Self Storage' }
      ],
      tooltip: 'Type of real estate property',
      defaultValue: 'multifamily'
    },
    {
      id: 'totalProjectCost',
      label: 'Total Project Cost ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Total cost to acquire and develop the property',
      defaultValue: 10000000
    },
    {
      id: 'sponsorEquity',
      label: 'Sponsor Equity ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Equity contribution from the sponsor/GP',
      defaultValue: 1000000
    },
    {
      id: 'investorEquity',
      label: 'Investor Equity ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Total equity from investors/LPs',
      defaultValue: 4000000
    },
    {
      id: 'debtAmount',
      label: 'Debt Amount ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Total debt financing',
      defaultValue: 5000000
    },
    {
      id: 'debtRate',
      label: 'Debt Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 20,
      tooltip: 'Annual interest rate on debt',
      defaultValue: 5.5
    },
    {
      id: 'debtTerm',
      label: 'Debt Term (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      tooltip: 'Term of the debt in years',
      defaultValue: 10
    },
    {
      id: 'holdingPeriod',
      label: 'Expected Holding Period (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 20,
      tooltip: 'Expected time to hold the investment',
      defaultValue: 5
    },
    {
      id: 'annualNOI',
      label: 'Annual NOI ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 100000000,
      tooltip: 'Annual Net Operating Income',
      defaultValue: 800000
    },
    {
      id: 'noiGrowthRate',
      label: 'NOI Growth Rate (%/year)',
      type: 'number',
      required: true,
      min: -10,
      max: 20,
      tooltip: 'Expected annual growth in NOI',
      defaultValue: 3
    },
    {
      id: 'exitCapRate',
      label: 'Exit Cap Rate (%)',
      type: 'number',
      required: true,
      min: 1,
      max: 15,
      tooltip: 'Expected cap rate at exit',
      defaultValue: 6.5
    },
    {
      id: 'sponsorPromote',
      label: 'Sponsor Promote (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Percentage of profits going to sponsor after investor return',
      defaultValue: 20
    },
    {
      id: 'investorPreferredReturn',
      label: 'Investor Preferred Return (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 20,
      tooltip: 'Preferred return rate for investors before sponsor promote',
      defaultValue: 8
    },
    {
      id: 'sponsorManagementFee',
      label: 'Sponsor Management Fee (%/year)',
      type: 'number',
      required: true,
      min: 0,
      max: 5,
      tooltip: 'Annual management fee as percentage of invested capital',
      defaultValue: 1.5
    },
    {
      id: 'acquisitionFee',
      label: 'Acquisition Fee (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 5,
      tooltip: 'One-time fee on acquisition as percentage of purchase price',
      defaultValue: 1
    },
    {
      id: 'dispositionFee',
      label: 'Disposition Fee (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 5,
      tooltip: 'One-time fee on sale as percentage of sale price',
      defaultValue: 1
    },
    {
      id: 'operatingExpenses',
      label: 'Operating Expenses (% of NOI)',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Operating expenses as percentage of NOI',
      defaultValue: 35
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Effective tax rate for investors',
      defaultValue: 25
    }
  ],
  outputs: [
    {
      id: 'totalEquity',
      label: 'Total Equity',
      type: 'currency',
      format: 'USD',
      explanation: 'Total equity investment (sponsor + investors)'
    },
    {
      id: 'leverageRatio',
      label: 'Leverage Ratio',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Debt to total project cost ratio'
    },
    {
      id: 'annualCashFlow',
      label: 'Annual Cash Flow',
      type: 'currency',
      format: 'USD',
      explanation: 'Annual cash flow to investors after debt service'
    },
    {
      id: 'cashOnCashReturn',
      label: 'Cash-on-Cash Return',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Annual cash flow as percentage of investor equity'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Total return including appreciation and cash flow'
    },
    {
      id: 'irr',
      label: 'Internal Rate of Return',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Internal rate of return for investors'
    },
    {
      id: 'sponsorIrr',
      label: 'Sponsor IRR',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Internal rate of return for sponsor'
    },
    {
      id: 'equityMultiple',
      label: 'Equity Multiple',
      type: 'number',
      format: 'decimal',
      explanation: 'Total return multiple on invested equity'
    },
    {
      id: 'exitValue',
      label: 'Exit Value',
      type: 'currency',
      format: 'USD',
      explanation: 'Expected property value at exit'
    },
    {
      id: 'totalProfit',
      label: 'Total Profit',
      type: 'currency',
      format: 'USD',
      explanation: 'Total profit from the investment'
    },
    {
      id: 'investorProfit',
      label: 'Investor Profit',
      type: 'currency',
      format: 'USD',
      explanation: 'Profit distributed to investors'
    },
    {
      id: 'sponsorProfit',
      label: 'Sponsor Profit',
      type: 'currency',
      format: 'USD',
      explanation: 'Profit distributed to sponsor'
    }
  ],
  formulas: calculateRealEstateSyndication,
  validate: validateRealEstateSyndicationInputs,
  quickValidate: quickValidateAllInputs,
  examples: [
    {
      name: 'Multifamily Syndication',
      description: 'Standard multifamily syndication with 20% sponsor promote',
      inputs: {
        propertyType: 'multifamily',
        totalProjectCost: 10000000,
        sponsorEquity: 1000000,
        investorEquity: 4000000,
        debtAmount: 5000000,
        debtRate: 5.5,
        debtTerm: 10,
        holdingPeriod: 5,
        annualNOI: 800000,
        noiGrowthRate: 3,
        exitCapRate: 6.5,
        sponsorPromote: 20,
        investorPreferredReturn: 8,
        sponsorManagementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 35,
        taxRate: 25
      },
      expectedOutputs: {
        totalEquity: 5000000,
        leverageRatio: 0.5,
        annualCashFlow: 225000,
        cashOnCashReturn: 0.05625,
        totalReturn: 0.1875,
        irr: 0.145,
        sponsorIrr: 0.225,
        equityMultiple: 1.9375,
        exitValue: 12307692,
        totalProfit: 4687500,
        investorProfit: 3750000,
        sponsorProfit: 937500
      }
    },
    {
      name: 'Office Syndication with High Promote',
      description: 'Office property with 30% sponsor promote and longer hold',
      inputs: {
        propertyType: 'office',
        totalProjectCost: 25000000,
        sponsorEquity: 2500000,
        investorEquity: 10000000,
        debtAmount: 12500000,
        debtRate: 6.0,
        debtTerm: 15,
        holdingPeriod: 7,
        annualNOI: 2000000,
        noiGrowthRate: 2.5,
        exitCapRate: 7.0,
        sponsorPromote: 30,
        investorPreferredReturn: 7,
        sponsorManagementFee: 2.0,
        acquisitionFee: 1.5,
        dispositionFee: 1.5,
        operatingExpenses: 40,
        taxRate: 30
      },
      expectedOutputs: {
        totalEquity: 12500000,
        leverageRatio: 0.5,
        annualCashFlow: 450000,
        cashOnCashReturn: 0.045,
        totalReturn: 0.165,
        irr: 0.125,
        sponsorIrr: 0.285,
        equityMultiple: 2.155,
        exitValue: 28571429,
        totalProfit: 20625000,
        investorProfit: 14437500,
        sponsorProfit: 6187500
      }
    },
    {
      name: 'Land Development Syndication',
      description: 'Land development project with shorter timeline',
      inputs: {
        propertyType: 'land',
        totalProjectCost: 5000000,
        sponsorEquity: 500000,
        investorEquity: 2000000,
        debtAmount: 2500000,
        debtRate: 7.0,
        debtTerm: 5,
        holdingPeriod: 3,
        annualNOI: 0,
        noiGrowthRate: 0,
        exitCapRate: 8.0,
        sponsorPromote: 25,
        investorPreferredReturn: 10,
        sponsorManagementFee: 3.0,
        acquisitionFee: 2.0,
        dispositionFee: 2.0,
        operatingExpenses: 0,
        taxRate: 25
      },
      expectedOutputs: {
        totalEquity: 2500000,
        leverageRatio: 0.5,
        annualCashFlow: -87500,
        cashOnCashReturn: -0.035,
        totalReturn: 0.225,
        irr: 0.185,
        sponsorIrr: 0.325,
        equityMultiple: 1.5625,
        exitValue: 6250000,
        totalProfit: 1250000,
        investorProfit: 937500,
        sponsorProfit: 312500
      }
    }
  ]
};