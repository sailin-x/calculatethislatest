import { Calculator, CalculationResult } from '../../types/calculator';
import { CommodityInputs, CommodityOutputs } from './types';
import { calculateCommodity } from './formulas';
import { validateCommodityInputs, validateCommodityBusinessRules } from './validation';

export const CommodityCalculator: Calculator = {
  id: 'CommodityCalculator',
  title: 'Commodity Calculator',
  category: 'finance',
  subcategory: 'Commodities & Futures',
  description: 'Calculate commodity investment performance, leverage, margin requirements, and risk metrics for various commodities including gold, oil, agricultural products, and more.',
  usageInstructions: [
    'Enter current market price and quantity held',
    'Input purchase price and commodity type',
    'Specify leverage ratio and margin requirements if applicable',
    'Include transaction, storage, and insurance costs',
    'Review performance metrics and risk analysis',
    'Analyze break-even points and return calculations'
  ],

  inputs: [
    {
      id: 'currentPrice',
      label: 'Current Price ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current market price per unit'
    },
    {
      id: 'quantity',
      label: 'Quantity',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Number of units held'
    },
    {
      id: 'purchasePrice',
      label: 'Purchase Price ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Average price paid per unit'
    },
    {
      id: 'commodityType',
      label: 'Commodity Type',
      type: 'select',
      required: true,
      options: [
        { value: 'gold', label: 'Gold' },
        { value: 'silver', label: 'Silver' },
        { value: 'oil', label: 'Crude Oil' },
        { value: 'copper', label: 'Copper' },
        { value: 'corn', label: 'Corn' },
        { value: 'wheat', label: 'Wheat' },
        { value: 'soybeans', label: 'Soybeans' },
        { value: 'coffee', label: 'Coffee' },
        { value: 'sugar', label: 'Sugar' },
        { value: 'cotton', label: 'Cotton' },
        { value: 'other', label: 'Other' }
      ],
      tooltip: 'Type of commodity being traded'
    },
    {
      id: 'leverageRatio',
      label: 'Leverage Ratio',
      type: 'number',
      required: false,
      min: 1,
      max: 100,
      step: 0.1,
      tooltip: 'Leverage multiplier (1 = no leverage)'
    },
    {
      id: 'marginRequirement',
      label: 'Margin Requirement ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Required margin for leveraged positions'
    },
    {
      id: 'contractSize',
      label: 'Contract Size',
      type: 'number',
      required: false,
      min: 0,
      tooltip: 'Standard contract size for futures'
    },
    {
      id: 'transactionCosts',
      label: 'Transaction Costs ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Commission and trading fees'
    },
    {
      id: 'storageCosts',
      label: 'Annual Storage Costs ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Cost of storing physical commodities'
    },
    {
      id: 'insuranceCosts',
      label: 'Annual Insurance Costs ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Insurance premiums for stored commodities'
    },
    {
      id: 'holdingPeriod',
      label: 'Holding Period (Years)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      tooltip: 'Time the position has been held'
    },
    {
      id: 'marketVolatility',
      label: 'Market Volatility (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      tooltip: 'Annual volatility of the commodity price'
    },
    {
      id: 'currencyExchangeRate',
      label: 'Currency Exchange Rate',
      type: 'number',
      required: false,
      min: 0,
      tooltip: 'Exchange rate if trading in different currency'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 1,
      step: 0.01,
      tooltip: 'Capital gains tax rate'
    }
  ],

  outputs: [
    {
      id: 'currentValue',
      label: 'Current Value',
      type: 'currency',
      explanation: 'Current market value of the commodity position'
    },
    {
      id: 'unrealizedGainLoss',
      label: 'Unrealized Gain/Loss',
      type: 'currency',
      explanation: 'Unrealized profit or loss on the position'
    },
    {
      id: 'unrealizedGainLossPercentage',
      label: 'Gain/Loss Percentage',
      type: 'percentage',
      explanation: 'Percentage gain or loss on the position'
    },
    {
      id: 'totalCosts',
      label: 'Total Costs',
      type: 'currency',
      explanation: 'Sum of all transaction, storage, and insurance costs'
    },
    {
      id: 'netGainLoss',
      label: 'Net Gain/Loss',
      type: 'currency',
      explanation: 'Net profit or loss after all costs'
    },
    {
      id: 'netGainLossPercentage',
      label: 'Net Gain/Loss Percentage',
      type: 'percentage',
      explanation: 'Net percentage return after costs'
    },
    {
      id: 'marginUsed',
      label: 'Margin Used',
      type: 'currency',
      explanation: 'Amount of margin currently utilized'
    },
    {
      id: 'marginAvailable',
      label: 'Margin Available',
      type: 'currency',
      explanation: 'Remaining available margin'
    },
    {
      id: 'leverageRatio',
      label: 'Effective Leverage Ratio',
      type: 'number',
      explanation: 'Actual leverage being applied to the position'
    },
    {
      id: 'breakEvenPrice',
      label: 'Break-Even Price',
      type: 'currency',
      explanation: 'Price needed to break even including all costs'
    },
    {
      id: 'riskRewardRatio',
      label: 'Risk/Reward Ratio',
      type: 'number',
      explanation: 'Ratio of potential risk to potential reward'
    },
    {
      id: 'volatilityAdjustedReturn',
      label: 'Volatility-Adjusted Return',
      type: 'number',
      explanation: 'Return adjusted for market volatility'
    },
    {
      id: 'afterTaxGainLoss',
      label: 'After-Tax Gain/Loss',
      type: 'currency',
      explanation: 'Net gain/loss after taxes'
    },
    {
      id: 'roi',
      label: 'ROI (Return on Investment)',
      type: 'percentage',
      explanation: 'Total return on investment percentage'
    },
    {
      id: 'annualizedReturn',
      label: 'Annualized Return',
      type: 'percentage',
      explanation: 'Annualized rate of return'
    }
  ],

  calculate: (inputs: Record<string, any>): CalculationResult => {
    const commodityInputs: CommodityInputs = {
      currentPrice: inputs.currentPrice,
      quantity: inputs.quantity,
      purchasePrice: inputs.purchasePrice,
      commodityType: inputs.commodityType,
      leverageRatio: inputs.leverageRatio,
      marginRequirement: inputs.marginRequirement,
      contractSize: inputs.contractSize,
      transactionCosts: inputs.transactionCosts,
      storageCosts: inputs.storageCosts,
      insuranceCosts: inputs.insuranceCosts,
      holdingPeriod: inputs.holdingPeriod,
      marketVolatility: inputs.marketVolatility,
      currencyExchangeRate: inputs.currencyExchangeRate,
      taxRate: inputs.taxRate
    };

    const outputs = calculateCommodity(commodityInputs);
    return { outputs };
  },

  validate: (inputs: Record<string, any>) => {
    const commodityInputs: CommodityInputs = {
      currentPrice: inputs.currentPrice,
      quantity: inputs.quantity,
      purchasePrice: inputs.purchasePrice,
      commodityType: inputs.commodityType,
      leverageRatio: inputs.leverageRatio,
      marginRequirement: inputs.marginRequirement,
      contractSize: inputs.contractSize,
      transactionCosts: inputs.transactionCosts,
      storageCosts: inputs.storageCosts,
      insuranceCosts: inputs.insuranceCosts,
      holdingPeriod: inputs.holdingPeriod,
      marketVolatility: inputs.marketVolatility,
      currencyExchangeRate: inputs.currencyExchangeRate,
      taxRate: inputs.taxRate
    };

    return validateCommodityInputs(commodityInputs);
  },

  validateBusinessRules: (inputs: Record<string, any>) => {
    const commodityInputs: CommodityInputs = {
      currentPrice: inputs.currentPrice,
      quantity: inputs.quantity,
      purchasePrice: inputs.purchasePrice,
      commodityType: inputs.commodityType,
      leverageRatio: inputs.leverageRatio,
      marginRequirement: inputs.marginRequirement,
      contractSize: inputs.contractSize,
      transactionCosts: inputs.transactionCosts,
      storageCosts: inputs.storageCosts,
      insuranceCosts: inputs.insuranceCosts,
      holdingPeriod: inputs.holdingPeriod,
      marketVolatility: inputs.marketVolatility,
      currencyExchangeRate: inputs.currencyExchangeRate,
      taxRate: inputs.taxRate
    };

    return validateCommodityBusinessRules(commodityInputs);
  },

  examples: [
    {
      title: 'Gold Investment',
      description: 'Long-term gold investment with moderate leverage',
      inputs: {
        currentPrice: 2000,
        quantity: 10,
        purchasePrice: 1800,
        commodityType: 'gold',
        leverageRatio: 2,
        marginRequirement: 18000,
        transactionCosts: 100,
        storageCosts: 50,
        insuranceCosts: 25,
        holdingPeriod: 2,
        marketVolatility: 0.15,
        taxRate: 0.15
      },
      expectedOutputs: {
        currentValue: 20000,
        unrealizedGainLoss: 2000,
        unrealizedGainLossPercentage: 11.11,
        totalCosts: 175,
        netGainLoss: 1825,
        netGainLossPercentage: 10.14,
        marginUsed: 10000,
        marginAvailable: 8000,
        leverageRatio: 2,
        breakEvenPrice: 1817.5,
        riskRewardRatio: 0.15,
        volatilityAdjustedReturn: 0.067,
        afterTaxGainLoss: 1556.25,
        roi: 10.14,
        annualizedReturn: 4.91
      }
    },
    {
      title: 'Crude Oil Futures',
      description: 'Short-term oil futures position with high leverage',
      inputs: {
        currentPrice: 80,
        quantity: 1000,
        purchasePrice: 75,
        commodityType: 'oil',
        leverageRatio: 10,
        marginRequirement: 60000,
        transactionCosts: 500,
        holdingPeriod: 0.25,
        marketVolatility: 0.30,
        taxRate: 0.20
      },
      expectedOutputs: {
        currentValue: 80000,
        unrealizedGainLoss: 5000,
        unrealizedGainLossPercentage: 6.67,
        totalCosts: 500,
        netGainLoss: 4500,
        netGainLossPercentage: 6.00,
        marginUsed: 8000,
        marginAvailable: 52000,
        leverageRatio: 10,
        breakEvenPrice: 75.5,
        riskRewardRatio: 0.30,
        volatilityAdjustedReturn: 0.020,
        afterTaxGainLoss: 3600,
        roi: 6.00,
        annualizedReturn: 24.00
      }
    }
  ]
};