import { Calculator } from '../../../types/calculator';
import { CapitalGainsInputs, CapitalGainsOutputs } from './types';
import {
  calculateCapitalGain,
  calculateNetCapitalGain,
  calculateTaxableGain,
  calculateTaxOwed,
  calculateAfterTaxGain,
  calculateTotalReturn,
  calculateAnnualizedReturn,
  calculateRealReturn,
  calculateHoldingPeriodDays,
  calculateHoldingPeriodYears
} from './formulas';
import { validateCapitalGainsInputs, validateCapitalGainsBusinessRules } from './validation';

export const CapitalGainsCalculator: Calculator = {
  id: 'CapitalGainsCalculator',
  title: 'Capital Gains Calculator',
  category: 'finance',
  subcategory: 'Tax Planning',
  description: 'Calculate capital gains tax, after-tax returns, and tax efficiency for investment transactions. Includes holding period analysis and inflation adjustments.',
  usageInstructions: [
    'Enter the acquisition price and date',
    'Input the sale price and date',
    'Specify the quantity of shares/units',
    'Include any acquisition and sale costs',
    'Enter your applicable tax rate',
    'Specify inflation rate for real return calculation',
    'Review tax implications and after-tax returns'
  ],

  inputs: [
    {
      id: 'acquisitionPrice',
      label: 'Acquisition Price ($)',
      type: 'currency',
      required: true,
      min: 0.01,
      max: 10000000,
      step: 0.01,
      defaultValue: 100,
      tooltip: 'Price paid for the asset'
    },
    {
      id: 'salePrice',
      label: 'Sale Price ($)',
      type: 'currency',
      required: true,
      min: 0.01,
      max: 10000000,
      step: 0.01,
      defaultValue: 120,
      tooltip: 'Price received from the sale'
    },
    {
      id: 'quantity',
      label: 'Quantity',
      type: 'number',
      required: true,
      min: 1,
      max: 1000000,
      step: 1,
      defaultValue: 100,
      tooltip: 'Number of shares or units'
    },
    {
      id: 'acquisitionDate',
      label: 'Acquisition Date',
      type: 'date',
      required: true,
      tooltip: 'Date when the asset was acquired'
    },
    {
      id: 'saleDate',
      label: 'Sale Date',
      type: 'date',
      required: true,
      tooltip: 'Date when the asset was sold'
    },
    {
      id: 'acquisitionCosts',
      label: 'Acquisition Costs ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      step: 0.01,
      defaultValue: 10,
      tooltip: 'Additional costs paid at acquisition (commissions, fees, etc.)'
    },
    {
      id: 'saleCosts',
      label: 'Sale Costs ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      step: 0.01,
      defaultValue: 10,
      tooltip: 'Costs incurred at sale (commissions, fees, etc.)'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.01,
      defaultValue: 15,
      tooltip: 'Applicable capital gains tax rate'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 20,
      step: 0.01,
      defaultValue: 2.5,
      tooltip: 'Annual inflation rate for real return calculation'
    }
  ],

  outputs: [
    {
      id: 'capitalGain',
      label: 'Capital Gain ($)',
      type: 'currency',
      explanation: 'Gross gain before costs and taxes'
    },
    {
      id: 'netCapitalGain',
      label: 'Net Capital Gain ($)',
      type: 'currency',
      explanation: 'Gain after acquisition and sale costs'
    },
    {
      id: 'taxableGain',
      label: 'Taxable Gain ($)',
      type: 'currency',
      explanation: 'Portion of gain subject to taxation'
    },
    {
      id: 'taxOwed',
      label: 'Tax Owed ($)',
      type: 'currency',
      explanation: 'Capital gains tax amount'
    },
    {
      id: 'afterTaxGain',
      label: 'After-Tax Gain ($)',
      type: 'currency',
      explanation: 'Net gain after taxes'
    },
    {
      id: 'totalReturn',
      label: 'Total Return (%)',
      type: 'percentage',
      explanation: 'Total percentage return on investment'
    },
    {
      id: 'annualizedReturn',
      label: 'Annualized Return (%)',
      type: 'percentage',
      explanation: 'Compound annual growth rate'
    },
    {
      id: 'realReturn',
      label: 'Real Return (%)',
      type: 'percentage',
      explanation: 'Return adjusted for inflation'
    },
    {
      id: 'holdingPeriodDays',
      label: 'Holding Period (Days)',
      type: 'number',
      explanation: 'Number of days asset was held'
    },
    {
      id: 'holdingPeriodYears',
      label: 'Holding Period (Years)',
      type: 'number',
      explanation: 'Number of years asset was held'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Long-Term Stock Sale',
      description: 'Tax-efficient long-term capital gain from stock investment',
      inputs: {
        acquisitionPrice: 50,
        salePrice: 75,
        quantity: 200,
        acquisitionDate: '2020-01-15',
        saleDate: '2023-01-15',
        acquisitionCosts: 20,
        saleCosts: 25,
        taxRate: 15,
        inflationRate: 2.5
      },
      expectedOutputs: {
        capitalGain: 5000,
        netCapitalGain: 4955,
        taxableGain: 2477.5,
        taxOwed: 371.625,
        afterTaxGain: 4583.375,
        totalReturn: 45.83,
        annualizedReturn: 13.2,
        realReturn: 10.4,
        holdingPeriodDays: 1096,
        holdingPeriodYears: 3.0
      }
    },
    {
      title: 'Short-Term Loss',
      description: 'Capital loss with tax implications',
      inputs: {
        acquisitionPrice: 100,
        salePrice: 80,
        quantity: 100,
        acquisitionDate: '2023-06-01',
        saleDate: '2023-09-01',
        acquisitionCosts: 15,
        saleCosts: 12,
        taxRate: 25,
        inflationRate: 3.0
      },
      expectedOutputs: {
        capitalGain: -2000,
        netCapitalGain: -2027,
        taxableGain: 0,
        taxOwed: 0,
        afterTaxGain: -2027,
        totalReturn: -20.27,
        annualizedReturn: -27.8,
        realReturn: -30.0,
        holdingPeriodDays: 92,
        holdingPeriodYears: 0.25
      }
    }
  ]
};