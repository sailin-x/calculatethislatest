import { Calculator } from '../../../types/calculator';
import { GPUMiningProfitabilityInputs, GPUMiningProfitabilityOutputs } from './types';
import { validateGPUMiningProfitabilityInputs } from './validation';
import { 
  calculateGPUMiningMetrics,
  generateGPUMiningReport
} from './formulas';

export class GPUMiningProfitabilityCalculator implements Calculator<GPUMiningProfitabilityInputs, GPUMiningProfitabilityOutputs> {
  readonly id = 'gpu-mining-profitability';
  readonly name = 'GPU Mining Profitability Calculator';
  readonly description = 'Calculate cryptocurrency mining profitability, ROI, and break-even analysis for GPU mining operations';
  readonly category = 'technology';
  readonly tags = ['mining', 'cryptocurrency', 'gpu', 'profitability', 'roi', 'blockchain'];

  readonly inputs = {
    // Hardware Configuration
    gpuModel: {
      type: 'select' as const,
      label: 'GPU Model',
      description: 'Select your GPU model for preset specifications',
      options: [
        { value: 'rtx-4090', label: 'RTX 4090 (83 MH/s, 450W)' },
        { value: 'rtx-4080', label: 'RTX 4080 (65 MH/s, 320W)' },
        { value: 'rtx-4070-ti', label: 'RTX 4070 Ti (50 MH/s, 285W)' },
        { value: 'rtx-3090', label: 'RTX 3090 (120 MH/s, 350W)' },
        { value: 'rtx-3080', label: 'RTX 3080 (100 MH/s, 320W)' },
        { value: 'rtx-3070', label: 'RTX 3070 (62 MH/s, 220W)' },
        { value: 'rx-7900-xtx', label: 'RX 7900 XTX (85 MH/s, 355W)' },
        { value: 'rx-6900-xt', label: 'RX 6900 XT (64 MH/s, 300W)' },
        { value: 'custom', label: 'Custom GPU Configuration' }
      ],
      defaultValue: 'rtx-3080',
      category: 'Hardware Configuration'
    },

    numberOfGPUs: {
      type: 'number' as const,
      label: 'Number of GPUs',
      description: 'Total number of GPUs in your mining rig',
      min: 1,
      max: 20,
      step: 1,
      placeholder: 'e.g., 6',
      unit: 'GPUs',
      category: 'Hardware Configuration'
    },

    hashrate: {
      type: 'number' as const,
      label: 'Hashrate per GPU',
      description: 'Mining hashrate per GPU (will auto-fill for selected models)',
      min: 1,
      max: 200,
      step: 0.1,
      placeholder: 'e.g., 100',
      unit: 'MH/s',
      category: 'Hardware Configuration'
    },

    powerConsumption: {
      type: 'number' as const,
      label: 'Power Consumption per GPU',
      description: 'Power draw per GPU while mining',
      min: 50,
      max: 600,
      step: 5,
      placeholder: 'e.g., 320',
      unit: 'Watts',
      category: 'Hardware Configuration'
    },

    hardwareCost: {
      type: 'number' as const,
      label: 'Total Hardware Cost',
      description: 'Total cost of GPUs and mining rig setup',
      min: 500,
      max: 100000,
      step: 100,
      placeholder: 'e.g., 12000',
      unit: '$',
      category: 'Hardware Configuration'
    },

    // Mining Configuration
    cryptocurrency: {
      type: 'select' as const,
      label: 'Cryptocurrency',
      description: 'Select the cryptocurrency to mine',
      options: [
        { value: 'ethereum-classic', label: 'Ethereum Classic (ETC)' },
        { value: 'ravencoin', label: 'Ravencoin (RVN)' },
        { value: 'ergo', label: 'Ergo (ERG)' },
        { value: 'conflux', label: 'Conflux (CFX)' },
        { value: 'kaspa', label: 'Kaspa (KAS)' },
        { value: 'flux', label: 'Flux (FLUX)' },
        { value: 'custom', label: 'Custom Coin' }
      ],
      defaultValue: 'ethereum-classic',
      category: 'Mining Configuration'
    },

    coinPrice: {
      type: 'number' as const,
      label: 'Coin Price',
      description: 'Current price of the cryptocurrency in USD',
      min: 0.001,
      max: 10000,
      step: 0.01,
      placeholder: 'e.g., 25.50',
      unit: '$',
      category: 'Mining Configuration'
    },

    networkHashrate: {
      type: 'number' as const,
      label: 'Network Hashrate',
      description: 'Total network hashrate for difficulty calculation',
      min: 1,
      max: 1000000,
      step: 1,
      placeholder: 'e.g., 45000',
      unit: 'GH/s',
      category: 'Mining Configuration'
    },

    blockReward: {
      type: 'number' as const,
      label: 'Block Reward',
      description: 'Reward per block in coins',
      min: 0.1,
      max: 100,
      step: 0.1,
      placeholder: 'e.g., 3.2',
      unit: 'coins',
      category: 'Mining Configuration'
    },

    blockTime: {
      type: 'number' as const,
      label: 'Block Time',
      description: 'Average time between blocks',
      min: 1,
      max: 600,
      step: 1,
      placeholder: 'e.g., 13',
      unit: 'seconds',
      category: 'Mining Configuration'
    },

    // Pool and Fees
    miningPool: {
      type: 'select' as const,
      label: 'Mining Pool',
      description: 'Select your mining pool',
      options: [
        { value: 'ethermine', label: 'Ethermine (1% fee)' },
        { value: 'f2pool', label: 'F2Pool (2.5% fee)' },
        { value: 'hiveon', label: 'Hiveon Pool (0% fee)' },
        { value: 'flexpool', label: 'Flexpool (0.5% fee)' },
        { value: '2miners', label: '2Miners (1% fee)' },
        { value: 'nicehash', label: 'NiceHash (2% fee)' },
        { value: 'solo', label: 'Solo Mining (0% fee)' },
        { value: 'custom', label: 'Custom Pool' }
      ],
      defaultValue: 'ethermine',
      category: 'Pool and Fees'
    },

    poolFee: {
      type: 'number' as const,
      label: 'Pool Fee',
      description: 'Mining pool fee percentage',
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: 'e.g., 1.0',
      unit: '%',
      category: 'Pool and Fees'
    },

    // Operating Costs
    electricityCost: {
      type: 'number' as const,
      label: 'Electricity Cost',
      description: 'Cost per kilowatt-hour of electricity',
      min: 0.01,
      max: 1,
      step: 0.001,
      placeholder: 'e.g., 0.12',
      unit: '$/kWh',
      category: 'Operating Costs'
    },

    coolingCosts: {
      type: 'number' as const,
      label: 'Additional Cooling Costs',
      description: 'Monthly cost for additional cooling/ventilation',
      min: 0,
      max: 500,
      step: 5,
      placeholder: 'e.g., 50',
      unit: '$/month',
      category: 'Operating Costs'
    },

    internetCosts: {
      type: 'number' as const,
      label: 'Internet Costs',
      description: 'Monthly internet costs allocated to mining',
      min: 0,
      max: 200,
      step: 5,
      placeholder: 'e.g., 25',
      unit: '$/month',
      category: 'Operating Costs'
    },

    maintenanceCosts: {
      type: 'number' as const,
      label: 'Maintenance Costs',
      description: 'Monthly maintenance and replacement costs',
      min: 0,
      max: 1000,
      step: 10,
      placeholder: 'e.g., 100',
      unit: '$/month',
      category: 'Operating Costs'
    },

    // Market Factors
    priceVolatility: {
      type: 'number' as const,
      label: 'Price Volatility',
      description: 'Expected price volatility for risk assessment',
      min: 5,
      max: 100,
      step: 5,
      placeholder: 'e.g., 30',
      unit: '%',
      category: 'Market Factors'
    },

    difficultyIncrease: {
      type: 'number' as const,
      label: 'Monthly Difficulty Increase',
      description: 'Expected monthly network difficulty increase',
      min: 0,
      max: 20,
      step: 0.5,
      placeholder: 'e.g., 3',
      unit: '%',
      category: 'Market Factors'
    }
  };

  readonly outputs = {
    // Profitability Metrics
    dailyRevenue: {
      type: 'number' as const,
      label: 'Daily Revenue',
      description: 'Gross daily mining revenue before costs',
      unit: '$',
      precision: 2
    },

    dailyProfit: {
      type: 'number' as const,
      label: 'Daily Profit',
      description: 'Net daily profit after all costs',
      unit: '$',
      precision: 2
    },

    monthlyProfit: {
      type: 'number' as const,
      label: 'Monthly Profit',
      description: 'Net monthly profit projection',
      unit: '$',
      precision: 2
    },

    yearlyProfit: {
      type: 'number' as const,
      label: 'Yearly Profit',
      description: 'Net yearly profit projection',
      unit: '$',
      precision: 2
    },

    // ROI Analysis
    breakEvenDays: {
      type: 'number' as const,
      label: 'Break-even Period',
      description: 'Days to recover initial hardware investment',
      unit: 'days',
      precision: 0
    },

    roi12Months: {
      type: 'number' as const,
      label: '12-Month ROI',
      description: 'Return on investment over 12 months',
      unit: '%',
      precision: 1
    },

    // Power and Efficiency
    dailyPowerCost: {
      type: 'number' as const,
      label: 'Daily Power Cost',
      description: 'Daily electricity cost for mining operation',
      unit: '$',
      precision: 2
    },

    powerEfficiency: {
      type: 'number' as const,
      label: 'Power Efficiency',
      description: 'Hashrate per watt of power consumption',
      unit: 'MH/W',
      precision: 3
    },

    totalPowerConsumption: {
      type: 'number' as const,
      label: 'Total Power Draw',
      description: 'Total power consumption of mining rig',
      unit: 'Watts',
      precision: 0
    },

    // Mining Statistics
    dailyCoinsEarned: {
      type: 'number' as const,
      label: 'Daily Coins Earned',
      description: 'Estimated coins earned per day',
      unit: 'coins',
      precision: 6
    },

    networkSharePercentage: {
      type: 'number' as const,
      label: 'Network Share',
      description: 'Your percentage of total network hashrate',
      unit: '%',
      precision: 8
    },

    // Risk Assessment
    profitabilityRating: {
      type: 'text' as const,
      label: 'Profitability Rating',
      description: 'Overall profitability assessment'
    },

    riskLevel: {
      type: 'text' as const,
      label: 'Risk Level',
      description: 'Investment risk assessment'
    },

    report: {
      type: 'text' as const,
      label: 'Mining Analysis Report',
      description: 'Comprehensive GPU mining profitability analysis'
    }
  };

  calculate(inputs: GPUMiningProfitabilityInputs): GPUMiningProfitabilityOutputs {
    const validation = validateGPUMiningProfitabilityInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Invalid inputs: ${validation.errors.join(', ')}`);
    }

    const metrics = calculateGPUMiningMetrics(inputs);
    const report = generateGPUMiningReport(inputs, metrics);

    return {
      ...metrics,
      report
    };
  }
}

export const gpuMiningProfitabilityCalculator = new GPUMiningProfitabilityCalculator();
