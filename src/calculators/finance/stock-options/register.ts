import { CalculatorRegistration } from '../../types/calculator';
import { calculateStockOptions } from './formulas';
import { validateStockOptionsInputs } from './validation';
import { StockOptionsInputs } from './types';

const stockOptionsCalculator: CalculatorRegistration = {
  id: 'stock-options',
  name: 'Stock Options Calculator',
  description: 'Comprehensive stock options analysis with Greeks, risk metrics, and strategy comparison',
  category: 'finance',
  tags: ['options', 'stocks', 'greeks', 'derivatives', 'trading', 'risk-management', 'volatility', 'delta', 'gamma'],
  
  inputs: {
    optionType: {
      type: 'select',
      label: 'Option Type',
      required: true,
      options: [
        { value: 'call', label: 'Call Option' },
        { value: 'put', label: 'Put Option' }
      ]
    },
    strikePrice: {
      type: 'number',
      label: 'Strike Price',
      required: true,
      min: 0.01,
      max: 10000,
      step: 0.01,
      placeholder: '100'
    },
    currentStockPrice: {
      type: 'number',
      label: 'Current Stock Price',
      required: true,
      min: 0.01,
      max: 10000,
      step: 0.01,
      placeholder: '110'
    },
    optionPrice: {
      type: 'number',
      label: 'Option Price',
      required: true,
      min: 0,
      max: 1000,
      step: 0.01,
      placeholder: '15'
    },
    expirationDate: {
      type: 'date',
      label: 'Expiration Date',
      required: true
    },
    numberOfContracts: {
      type: 'number',
      label: 'Number of Contracts',
      required: true,
      min: 1,
      max: 10000,
      step: 1,
      placeholder: '1'
    },
    contractsPerOption: {
      type: 'number',
      label: 'Contracts per Option',
      required: true,
      min: 1,
      max: 1000000,
      step: 1,
      placeholder: '100'
    },
    volatility: {
      type: 'number',
      label: 'Volatility (%)',
      required: true,
      min: 0.1,
      max: 500,
      step: 0.1,
      placeholder: '30'
    },
    riskFreeRate: {
      type: 'number',
      label: 'Risk-Free Rate (%)',
      required: true,
      min: -10,
      max: 50,
      step: 0.01,
      placeholder: '2.5'
    },
    dividendYield: {
      type: 'number',
      label: 'Dividend Yield (%)',
      required: true,
      min: 0,
      max: 50,
      step: 0.01,
      placeholder: '1.5'
    },
    strategy: {
      type: 'select',
      label: 'Strategy',
      required: true,
      options: [
        { value: 'long-call', label: 'Long Call' },
        { value: 'long-put', label: 'Long Put' },
        { value: 'short-call', label: 'Short Call' },
        { value: 'short-put', label: 'Short Put' },
        { value: 'covered-call', label: 'Covered Call' },
        { value: 'protective-put', label: 'Protective Put' },
        { value: 'bull-spread', label: 'Bull Spread' },
        { value: 'bear-spread', label: 'Bear Spread' },
        { value: 'iron-condor', label: 'Iron Condor' },
        { value: 'butterfly', label: 'Butterfly' }
      ]
    },
    maxLoss: {
      type: 'number',
      label: 'Maximum Loss',
      required: true,
      min: -1000000,
      max: 0,
      step: 1,
      placeholder: '-1500'
    },
    maxProfit: {
      type: 'number',
      label: 'Maximum Profit',
      required: true,
      min: 0,
      max: 1000000,
      step: 1,
      placeholder: '5000'
    },
    breakEvenPrice: {
      type: 'number',
      label: 'Break-Even Price',
      required: true,
      min: 0,
      max: 10000,
      step: 0.01,
      placeholder: '115'
    },
    daysToExpiration: {
      type: 'number',
      label: 'Days to Expiration',
      required: true,
      min: 0,
      max: 3650,
      step: 1,
      placeholder: '45'
    },
    timeValue: {
      type: 'number',
      label: 'Time Value',
      required: true,
      min: 0,
      max: 1000,
      step: 0.01,
      placeholder: '5'
    },
    intrinsicValue: {
      type: 'number',
      label: 'Intrinsic Value',
      required: true,
      min: 0,
      max: 10000,
      step: 0.01,
      placeholder: '10'
    },
    delta: {
      type: 'number',
      label: 'Delta',
      required: false,
      min: -1,
      max: 1,
      step: 0.001,
      placeholder: '0.7'
    },
    gamma: {
      type: 'number',
      label: 'Gamma',
      required: false,
      min: 0,
      max: 1,
      step: 0.0001,
      placeholder: '0.02'
    },
    theta: {
      type: 'number',
      label: 'Theta',
      required: false,
      min: -1000,
      max: 1000,
      step: 0.01,
      placeholder: '-0.5'
    },
    vega: {
      type: 'number',
      label: 'Vega',
      required: false,
      min: -1000,
      max: 1000,
      step: 0.01,
      placeholder: '0.3'
    },
    rho: {
      type: 'number',
      label: 'Rho',
      required: false,
      min: -1000,
      max: 1000,
      step: 0.01,
      placeholder: '0.1'
    },
    secondStrikePrice: {
      type: 'number',
      label: 'Second Strike Price',
      required: false,
      min: 0.01,
      max: 10000,
      step: 0.01,
      placeholder: '120'
    },
    secondOptionPrice: {
      type: 'number',
      label: 'Second Option Price',
      required: false,
      min: 0,
      max: 1000,
      step: 0.01,
      placeholder: '5'
    },
    secondExpirationDate: {
      type: 'date',
      label: 'Second Expiration Date',
      required: false
    },
    impliedVolatility: {
      type: 'number',
      label: 'Implied Volatility (%)',
      required: false,
      min: 0.1,
      max: 500,
      step: 0.1,
      placeholder: '35'
    },
    historicalVolatility: {
      type: 'number',
      label: 'Historical Volatility (%)',
      required: false,
      min: 0.1,
      max: 500,
      step: 0.1,
      placeholder: '25'
    },
    beta: {
      type: 'number',
      label: 'Beta',
      required: false,
      min: -10,
      max: 10,
      step: 0.01,
      placeholder: '1.2'
    },
    correlation: {
      type: 'number',
      label: 'Correlation',
      required: false,
      min: -1,
      max: 1,
      step: 0.01,
      placeholder: '0.8'
    },
    portfolioValue: {
      type: 'number',
      label: 'Portfolio Value',
      required: false,
      min: 0,
      max: 100000000,
      step: 1000,
      placeholder: '100000'
    },
    positionSize: {
      type: 'number',
      label: 'Position Size',
      required: false,
      min: 0,
      max: 10000000,
      step: 100,
      placeholder: '1500'
    },
    marginRequirement: {
      type: 'number',
      label: 'Margin Requirement',
      required: false,
      min: 0,
      max: 10000000,
      step: 100,
      placeholder: '0'
    }
  },
  
  calculate: (inputs: StockOptionsInputs, allInputs?: Record<string, any>) => {
    return calculateStockOptions(inputs, allInputs);
  },
  
  validate: (inputs: StockOptionsInputs, allInputs?: Record<string, any>) => {
    return validateStockOptionsInputs(inputs, allInputs);
  },
  
  examples: [
    {
      name: 'Long Call Option',
      inputs: {
        optionType: 'call',
        strikePrice: 100,
        currentStockPrice: 110,
        optionPrice: 15,
        expirationDate: '20241220',
        numberOfContracts: 1,
        contractsPerOption: 100,
        volatility: 30,
        riskFreeRate: 2.5,
        dividendYield: 1.5,
        strategy: 'long-call',
        maxLoss: -1500,
        maxProfit: 5000,
        breakEvenPrice: 115,
        daysToExpiration: 45,
        timeValue: 5,
        intrinsicValue: 10,
        delta: 0.7,
        gamma: 0.02,
        theta: -0.5,
        vega: 0.3,
        rho: 0.1,
        portfolioValue: 100000,
        positionSize: 1500,
        marginRequirement: 0,
        priceScenarios: []
      }
    },
    {
      name: 'Covered Call Strategy',
      inputs: {
        optionType: 'call',
        strikePrice: 120,
        currentStockPrice: 110,
        optionPrice: 8,
        expirationDate: '20241220',
        numberOfContracts: 1,
        contractsPerOption: 100,
        volatility: 25,
        riskFreeRate: 2.5,
        dividendYield: 2.0,
        strategy: 'covered-call',
        maxLoss: -11000,
        maxProfit: 800,
        breakEvenPrice: 102,
        daysToExpiration: 60,
        timeValue: 8,
        intrinsicValue: 0,
        delta: 0.6,
        gamma: 0.03,
        theta: -0.4,
        vega: 0.4,
        rho: 0.08,
        portfolioValue: 100000,
        positionSize: 800,
        marginRequirement: 0,
        priceScenarios: []
      }
    },
    {
      name: 'Protective Put Strategy',
      inputs: {
        optionType: 'put',
        strikePrice: 100,
        currentStockPrice: 110,
        optionPrice: 3,
        expirationDate: '20241220',
        numberOfContracts: 1,
        contractsPerOption: 100,
        volatility: 35,
        riskFreeRate: 2.5,
        dividendYield: 1.5,
        strategy: 'protective-put',
        maxLoss: -300,
        maxProfit: 10000,
        breakEvenPrice: 113,
        daysToExpiration: 90,
        timeValue: 3,
        intrinsicValue: 0,
        delta: -0.3,
        gamma: 0.025,
        theta: -0.2,
        vega: 0.35,
        rho: -0.05,
        portfolioValue: 100000,
        positionSize: 300,
        marginRequirement: 0,
        priceScenarios: []
      }
    }
  ],
  
  relatedCalculators: [
    'RealEstateInvestment',
    'mortgage-calculator',
    'CapRateCalculator',
    'CashFlowCalculator',
    'developer-salary'
  ]
};

export default stockOptionsCalculator;
