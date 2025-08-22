import { CryptoStakingProfitabilityInputs, CryptoStakingProfitabilityOutputs } from './types';
import { calculateCryptoStakingProfitability } from './formulas';
import { cryptoStakingValidationRules } from './validation';
import { validateCryptoStakingInputs } from './validation';
import { quickValidateStakingAmount, quickValidateAPY, quickValidateStakingPeriod } from './quickValidation';

export const cryptoStakingCalculator = {
  name: 'Crypto Staking Profitability Calculator',
  category: 'Finance',
  description: 'Calculate potential returns from cryptocurrency staking with compound interest, APY rates, and risk analysis',
  icon: '💰',
  
  inputs: {
    // Staking Configuration
    stakingAmount: {
      type: 'number',
      label: 'Staking Amount',
      unit: 'USD',
      description: 'Total amount to stake in USD',
      placeholder: '1000',
      required: true,
      min: 1,
      max: 10000000
    },
    cryptocurrency: {
      type: 'select',
      label: 'Cryptocurrency',
      description: 'Select the cryptocurrency to stake',
      options: [
        { value: 'ethereum', label: 'Ethereum (ETH)', defaultAPY: 5.2, price: 2000 },
        { value: 'cardano', label: 'Cardano (ADA)', defaultAPY: 4.8, price: 0.35 },
        { value: 'solana', label: 'Solana (SOL)', defaultAPY: 7.1, price: 60 },
        { value: 'polkadot', label: 'Polkadot (DOT)', defaultAPY: 12.5, price: 5.2 },
        { value: 'cosmos', label: 'Cosmos (ATOM)', defaultAPY: 18.7, price: 8.5 },
        { value: 'tezos', label: 'Tezos (XTZ)', defaultAPY: 6.0, price: 0.85 },
        { value: 'algorand', label: 'Algorand (ALGO)', defaultAPY: 5.8, price: 0.18 },
        { value: 'avalanche', label: 'Avalanche (AVAX)', defaultAPY: 9.2, price: 25 },
        { value: 'binance-coin', label: 'Binance Coin (BNB)', defaultAPY: 8.5, price: 300 },
        { value: 'chainlink', label: 'Chainlink (LINK)', defaultAPY: 6.8, price: 15 },
        { value: 'custom', label: 'Custom Token', defaultAPY: 5.0, price: 1 }
      ],
      required: true
    },
    stakingPeriod: {
      type: 'number',
      label: 'Staking Period',
      unit: 'days',
      description: 'Number of days to stake',
      placeholder: '365',
      required: true,
      min: 1,
      max: 3650
    },
    apyRate: {
      type: 'number',
      label: 'APY Rate',
      unit: '%',
      description: 'Annual Percentage Yield rate',
      placeholder: '5.2',
      required: true,
      min: 0.1,
      max: 100
    },
    
    // Compounding Configuration
    compounding: {
      type: 'select',
      label: 'Compounding Frequency',
      description: 'How often rewards are compounded',
      options: [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' }
      ],
      required: true
    },
    cryptoPrice: {
      type: 'number',
      label: 'Current Crypto Price',
      unit: 'USD',
      description: 'Current price of the cryptocurrency',
      placeholder: '2000',
      required: true,
      min: 0.000001,
      max: 100000
    },
    
    // Risk and Market Factors
    priceVolatility: {
      type: 'number',
      label: 'Price Volatility',
      unit: '%',
      description: 'Expected annual price volatility',
      placeholder: '50',
      required: false,
      min: 0,
      max: 200,
      default: 50
    },
    marketTrend: {
      type: 'select',
      label: 'Market Trend',
      description: 'Expected market direction',
      options: [
        { value: 'bullish', label: 'Bullish (Rising)' },
        { value: 'neutral', label: 'Neutral (Sideways)' },
        { value: 'bearish', label: 'Bearish (Falling)' }
      ],
      required: false,
      default: 'neutral'
    },
    
    // Fees and Costs
    stakingFee: {
      type: 'number',
      label: 'Staking Fee',
      unit: '%',
      description: 'Platform or validator fee',
      placeholder: '0.5',
      required: false,
      min: 0,
      max: 10,
      default: 0.5
    },
    withdrawalFee: {
      type: 'number',
      label: 'Withdrawal Fee',
      unit: 'USD',
      description: 'Fee to withdraw staked amount',
      placeholder: '0',
      required: false,
      min: 0,
      max: 1000,
      default: 0
    },
    
    // Advanced Options
    reinvestRewards: {
      type: 'boolean',
      label: 'Reinvest Rewards',
      description: 'Automatically reinvest earned rewards',
      required: false,
      default: true
    },
    lockPeriod: {
      type: 'number',
      label: 'Lock Period',
      unit: 'days',
      description: 'Minimum staking period before withdrawal',
      placeholder: '0',
      required: false,
      min: 0,
      max: 365,
      default: 0
    }
  },
  
  outputs: {
    // Basic Returns
    dailyRewards: {
      type: 'number',
      label: 'Daily Rewards',
      unit: 'USD',
      description: 'Average daily staking rewards'
    },
    monthlyRewards: {
      type: 'number',
      label: 'Monthly Rewards',
      unit: 'USD',
      description: 'Average monthly staking rewards'
    },
    yearlyRewards: {
      type: 'number',
      label: 'Yearly Rewards',
      unit: 'USD',
      description: 'Annual staking rewards'
    },
    
    // Portfolio Value
    totalValue: {
      type: 'number',
      label: 'Total Portfolio Value',
      unit: 'USD',
      description: 'Total value including staked amount and rewards'
    },
    compoundedValue: {
      type: 'number',
      label: 'Compounded Value',
      unit: 'USD',
      description: 'Value after compound interest'
    },
    
    // ROI Metrics
    roi: {
      type: 'number',
      label: 'ROI',
      unit: '%',
      description: 'Return on Investment percentage'
    },
    breakEvenDays: {
      type: 'number',
      label: 'Break-Even Days',
      unit: 'days',
      description: 'Days to break even on staking fees'
    },
    
    // Risk Analysis
    riskLevel: {
      type: 'string',
      label: 'Risk Level',
      description: 'Overall risk assessment'
    },
    volatilityImpact: {
      type: 'number',
      label: 'Volatility Impact',
      unit: 'USD',
      description: 'Potential loss from price volatility'
    },
    
    // Additional Metrics
    cryptoAmount: {
      type: 'number',
      label: 'Crypto Amount',
      unit: 'coins',
      description: 'Amount of cryptocurrency staked'
    },
    rewardCrypto: {
      type: 'number',
      label: 'Reward in Crypto',
      unit: 'coins',
      description: 'Rewards earned in cryptocurrency'
    },
    efficiencyRating: {
      type: 'string',
      label: 'Efficiency Rating',
      description: 'Staking efficiency assessment'
    },
    report: {
      type: 'string',
      label: 'Detailed Report',
      description: 'Comprehensive staking analysis'
    }
  },
  
  calculate: calculateCryptoStakingProfitability,
  validate: validateCryptoStakingInputs,
  validationRules: cryptoStakingValidationRules,
  quickValidation: {
    stakingAmount: quickValidateStakingAmount,
    apyRate: quickValidateAPY,
    stakingPeriod: quickValidateStakingPeriod
  }
};
