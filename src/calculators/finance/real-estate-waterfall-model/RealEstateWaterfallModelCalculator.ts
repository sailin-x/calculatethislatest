import { Calculator } from '../../../types/Calculator';
import { calculateRealEstateWaterfallModel } from './formulas';
import { validateRealEstateWaterfallModelInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const realEstateWaterfallModelCalculator: Calculator = {
  id: 'real-estate-waterfall-model',
  name: 'Real Estate Waterfall Model Calculator',
  description: 'Comprehensive calculator for real estate waterfall distributions including preferred returns, catch-up, and promote structures.',
  category: 'Finance',
  tags: ['real estate', 'waterfall', 'distribution', 'preferred return', 'promote', 'catch-up', 'investment'],
  inputs: [
    {
      id: 'totalEquity',
      label: 'Total Equity ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Total equity investment from all parties',
      defaultValue: 10000000
    },
    {
      id: 'investorEquity',
      label: 'Investor Equity ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Total equity from investors/LPs',
      defaultValue: 8000000
    },
    {
      id: 'sponsorEquity',
      label: 'Sponsor Equity ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Equity contribution from sponsor/GP',
      defaultValue: 2000000
    },
    {
      id: 'totalCashFlow',
      label: 'Total Cash Flow ($)',
      type: 'number',
      required: true,
      min: -1000000000,
      max: 1000000000,
      tooltip: 'Total cash flow available for distribution',
      defaultValue: 15000000
    },
    {
      id: 'preferredReturn',
      label: 'Preferred Return (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 25,
      tooltip: 'Annual preferred return rate for investors',
      defaultValue: 8
    },
    {
      id: 'holdingPeriod',
      label: 'Holding Period (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      tooltip: 'Total holding period in years',
      defaultValue: 5
    },
    {
      id: 'catchUpPercentage',
      label: 'Catch-Up Percentage (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Percentage of excess profits going to sponsor during catch-up',
      defaultValue: 80
    },
    {
      id: 'promotePercentage',
      label: 'Promote Percentage (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Percentage of profits going to sponsor after catch-up',
      defaultValue: 20
    },
    {
      id: 'hurdleRate',
      label: 'Hurdle Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Return threshold before promote kicks in',
      defaultValue: 12
    },
    {
      id: 'waterfallType',
      label: 'Waterfall Type',
      type: 'select',
      required: true,
      options: [
        { value: 'american', label: 'American (Deal-by-Deal)' },
        { value: 'european', label: 'European (Fund Level)' },
        { value: 'hybrid', label: 'Hybrid' }
      ],
      tooltip: 'Type of waterfall structure',
      defaultValue: 'american'
    },
    {
      id: 'clawbackProvision',
      label: 'Clawback Provision',
      type: 'select',
      required: true,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ],
      tooltip: 'Whether clawback provision exists',
      defaultValue: 'no'
    },
    {
      id: 'clawbackPercentage',
      label: 'Clawback Percentage (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Percentage of promote subject to clawback',
      defaultValue: 0
    },
    {
      id: 'managementFee',
      label: 'Management Fee (%)',
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
      tooltip: 'One-time acquisition fee as percentage of purchase price',
      defaultValue: 1
    },
    {
      id: 'dispositionFee',
      label: 'Disposition Fee (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 5,
      tooltip: 'One-time disposition fee as percentage of sale price',
      defaultValue: 1
    },
    {
      id: 'operatingExpenses',
      label: 'Operating Expenses ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 100000000,
      tooltip: 'Total operating expenses during holding period',
      defaultValue: 2000000
    },
    {
      id: 'debtService',
      label: 'Debt Service ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 100000000,
      tooltip: 'Total debt service payments during holding period',
      defaultValue: 5000000
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
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'number',
      required: true,
      min: -5,
      max: 15,
      tooltip: 'Expected annual inflation rate',
      defaultValue: 2.5
    },
    {
      id: 'exitValue',
      label: 'Exit Value ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Expected property value at exit',
      defaultValue: 20000000
    },
    {
      id: 'remainingDebt',
      label: 'Remaining Debt ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Remaining debt balance at exit',
      defaultValue: 8000000
    }
  ],
  outputs: [
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Total return on investment'
    },
    {
      id: 'investorReturn',
      label: 'Investor Return',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Return to investors after waterfall'
    },
    {
      id: 'sponsorReturn',
      label: 'Sponsor Return',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Return to sponsor after waterfall'
    },
    {
      id: 'preferredReturnAmount',
      label: 'Preferred Return Amount',
      type: 'currency',
      format: 'USD',
      explanation: 'Total preferred return paid to investors'
    },
    {
      id: 'catchUpAmount',
      label: 'Catch-Up Amount',
      type: 'currency',
      format: 'USD',
      explanation: 'Amount distributed during catch-up phase'
    },
    {
      id: 'promoteAmount',
      label: 'Promote Amount',
      type: 'currency',
      format: 'USD',
      explanation: 'Total promote amount to sponsor'
    },
    {
      id: 'investorProfit',
      label: 'Investor Profit',
      type: 'currency',
      format: 'USD',
      explanation: 'Total profit distributed to investors'
    },
    {
      id: 'sponsorProfit',
      label: 'Sponsor Profit',
      type: 'currency',
      format: 'USD',
      explanation: 'Total profit distributed to sponsor'
    },
    {
      id: 'investorIrr',
      label: 'Investor IRR',
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
      id: 'netPresentValue',
      label: 'Net Present Value',
      type: 'currency',
      format: 'USD',
      explanation: 'Net present value of the investment'
    }
  ],
  formulas: calculateRealEstateWaterfallModel,
  validate: validateRealEstateWaterfallModelInputs,
  quickValidate: quickValidateAllInputs,
  examples: [
    {
      name: 'Standard Waterfall with 8% Preferred Return',
      description: 'Typical waterfall structure with 8% preferred return and 20% promote',
      inputs: {
        totalEquity: 10000000,
        investorEquity: 8000000,
        sponsorEquity: 2000000,
        totalCashFlow: 15000000,
        preferredReturn: 8,
        holdingPeriod: 5,
        catchUpPercentage: 80,
        promotePercentage: 20,
        hurdleRate: 12,
        waterfallType: 'american',
        clawbackProvision: 'no',
        clawbackPercentage: 0,
        managementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 2000000,
        debtService: 5000000,
        taxRate: 25,
        inflationRate: 2.5,
        exitValue: 20000000,
        remainingDebt: 8000000
      },
      expectedOutputs: {
        totalReturn: 0.5,
        investorReturn: 0.425,
        sponsorReturn: 0.75,
        preferredReturnAmount: 3200000,
        catchUpAmount: 1200000,
        promoteAmount: 1000000,
        investorProfit: 6800000,
        sponsorProfit: 3200000,
        investorIrr: 0.085,
        sponsorIrr: 0.15,
        equityMultiple: 1.5,
        netPresentValue: 2500000
      }
    },
    {
      name: 'High Promote Waterfall',
      description: 'Waterfall with 30% promote and 10% preferred return',
      inputs: {
        totalEquity: 15000000,
        investorEquity: 12000000,
        sponsorEquity: 3000000,
        totalCashFlow: 25000000,
        preferredReturn: 10,
        holdingPeriod: 7,
        catchUpPercentage: 70,
        promotePercentage: 30,
        hurdleRate: 15,
        waterfallType: 'american',
        clawbackProvision: 'yes',
        clawbackPercentage: 20,
        managementFee: 2.0,
        acquisitionFee: 1.5,
        dispositionFee: 1.5,
        operatingExpenses: 3500000,
        debtService: 8000000,
        taxRate: 30,
        inflationRate: 3.0,
        exitValue: 35000000,
        remainingDebt: 12000000
      },
      expectedOutputs: {
        totalReturn: 0.667,
        investorReturn: 0.533,
        sponsorReturn: 1.167,
        preferredReturnAmount: 8400000,
        catchUpAmount: 2100000,
        promoteAmount: 3000000,
        investorProfit: 16000000,
        sponsorProfit: 9000000,
        investorIrr: 0.076,
        sponsorIrr: 0.167,
        equityMultiple: 1.667,
        netPresentValue: 5000000
      }
    },
    {
      name: 'European Waterfall',
      description: 'Fund-level waterfall with clawback provision',
      inputs: {
        totalEquity: 50000000,
        investorEquity: 40000000,
        sponsorEquity: 10000000,
        totalCashFlow: 75000000,
        preferredReturn: 8,
        holdingPeriod: 10,
        catchUpPercentage: 80,
        promotePercentage: 20,
        hurdleRate: 12,
        waterfallType: 'european',
        clawbackProvision: 'yes',
        clawbackPercentage: 25,
        managementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 10000000,
        debtService: 20000000,
        taxRate: 25,
        inflationRate: 2.5,
        exitValue: 100000000,
        remainingDebt: 30000000
      },
      expectedOutputs: {
        totalReturn: 0.5,
        investorReturn: 0.425,
        sponsorReturn: 0.75,
        preferredReturnAmount: 32000000,
        catchUpAmount: 8000000,
        promoteAmount: 5000000,
        investorProfit: 60000000,
        sponsorProfit: 15000000,
        investorIrr: 0.085,
        sponsorIrr: 0.15,
        equityMultiple: 1.5,
        netPresentValue: 12500000
      }
    }
  ]
};