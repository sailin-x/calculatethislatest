import { describe, it, expect } from 'vitest';
import { gpuMiningProfitabilityCalculator } from './GPUMiningProfitabilityCalculator';
import { calculateGPUMiningMetrics, generateGPUMiningReport } from './formulas';
import { validateGPUMiningProfitabilityInputs } from './validation';
import { GPUMiningProfitabilityInputs } from './types';

describe('GPU Mining Profitability Calculator', () => {
  const validInputs: GPUMiningProfitabilityInputs = {
    // Hardware Configuration
    gpuModel: 'rtx-3080',
    numberOfGPUs: 6,
    hashrate: 100,
    powerConsumption: 320,
    hardwareCost: 4200,
    
    // Mining Configuration
    cryptocurrency: 'ethereum-classic',
    coinPrice: 25,
    networkHashrate: 150000000,
    blockReward: 3.2,
    blockTime: 13,
    
    // Pool and Fees
    miningPool: 'ethermine',
    poolFee: 1,
    
    // Operating Costs
    electricityCost: 0.12,
    coolingCosts: 50,
    internetCosts: 30,
    maintenanceCosts: 20,
    
    // Market Factors
    priceVolatility: 15,
    difficultyIncrease: 5
  };

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(gpuMiningProfitabilityCalculator.id).toBe('gpu-mining-profitability');
      expect(gpuMiningProfitabilityCalculator.name).toBe('GPU Mining Profitability Calculator');
      expect(gpuMiningProfitabilityCalculator.category).toBe('technology');
      expect(gpuMiningProfitabilityCalculator.tags).toContain('mining');
      expect(gpuMiningProfitabilityCalculator.tags).toContain('cryptocurrency');
    });

    it('should have all required input fields', () => {
      const inputs = gpuMiningProfitabilityCalculator.inputs;
      expect(inputs.gpuModel).toBeDefined();
      expect(inputs.numberOfGPUs).toBeDefined();
      expect(inputs.hashrate).toBeDefined();
      expect(inputs.powerConsumption).toBeDefined();
      expect(inputs.hardwareCost).toBeDefined();
      expect(inputs.cryptocurrency).toBeDefined();
      expect(inputs.coinPrice).toBeDefined();
      expect(inputs.networkHashrate).toBeDefined();
      expect(inputs.blockReward).toBeDefined();
      expect(inputs.blockTime).toBeDefined();
      expect(inputs.miningPool).toBeDefined();
      expect(inputs.poolFee).toBeDefined();
      expect(inputs.electricityCost).toBeDefined();
      expect(inputs.coolingCosts).toBeDefined();
      expect(inputs.internetCosts).toBeDefined();
      expect(inputs.maintenanceCosts).toBeDefined();
      expect(inputs.priceVolatility).toBeDefined();
      expect(inputs.difficultyIncrease).toBeDefined();
    });

    it('should have all required output fields', () => {
      const outputs = gpuMiningProfitabilityCalculator.outputs;
      expect(outputs.dailyRevenue).toBeDefined();
      expect(outputs.dailyProfit).toBeDefined();
      expect(outputs.monthlyProfit).toBeDefined();
      expect(outputs.yearlyProfit).toBeDefined();
      expect(outputs.breakEvenDays).toBeDefined();
      expect(outputs.roi12Months).toBeDefined();
      expect(outputs.dailyPowerCost).toBeDefined();
      expect(outputs.powerEfficiency).toBeDefined();
      expect(outputs.totalPowerConsumption).toBeDefined();
      expect(outputs.dailyCoinsEarned).toBeDefined();
      expect(outputs.networkSharePercentage).toBeDefined();
      expect(outputs.profitabilityRating).toBeDefined();
      expect(outputs.riskLevel).toBeDefined();
      expect(outputs.report).toBeDefined();
    });
  });

  describe('Formulas', () => {
    it('should calculate mining metrics correctly', () => {
      const metrics = calculateGPUMiningMetrics(validInputs);
      
      // Basic calculations
      expect(metrics.totalHashrate).toBe(600); // 100 * 6 GPUs
      expect(metrics.totalPowerConsumption).toBe(1920); // 320 * 6 GPUs
      expect(metrics.dailyPowerCost).toBeCloseTo(5.53, 2); // (1920/1000) * 0.12 * 24
      
      // Profitability calculations
      expect(metrics.dailyRevenue).toBeGreaterThan(0);
      expect(metrics.dailyProfit).toBeDefined();
      expect(metrics.monthlyProfit).toBe(metrics.dailyProfit * 30);
      expect(metrics.yearlyProfit).toBe(metrics.dailyProfit * 365);
      
      // ROI calculations
      expect(metrics.breakEvenDays).toBeDefined();
      expect(metrics.roi12Months).toBeDefined();
      
      // Efficiency calculations
      expect(metrics.powerEfficiency).toBeCloseTo(0.3125, 3); // 600/1920
      expect(metrics.networkSharePercentage).toBeCloseTo(0.0004, 6); // (600/150000000) * 100
      
      // Risk assessment
      expect(metrics.profitabilityRating).toBeDefined();
      expect(metrics.riskLevel).toBeDefined();
      expect(metrics.efficiencyRating).toBeDefined();
    });

    it('should handle different GPU models correctly', () => {
      const rtx4090Inputs = { ...validInputs, gpuModel: 'rtx-4090' };
      const metrics = calculateGPUMiningMetrics(rtx4090Inputs);
      
      expect(metrics.totalHashrate).toBe(498); // 83 * 6 GPUs
      expect(metrics.totalPowerConsumption).toBe(2700); // 450 * 6 GPUs
    });

    it('should calculate daily coins earned correctly', () => {
      const metrics = calculateGPUMiningMetrics(validInputs);
      
      // Daily coins earned should be positive
      expect(metrics.dailyCoinsEarned).toBeGreaterThan(0);
      
      // Should be proportional to hashrate
      const highHashrateInputs = { ...validInputs, hashrate: 200 };
      const highMetrics = calculateGPUMiningMetrics(highHashrateInputs);
      expect(highMetrics.dailyCoinsEarned).toBeGreaterThan(metrics.dailyCoinsEarned);
    });

    it('should generate mining report', () => {
      const metrics = calculateGPUMiningMetrics(validInputs);
      const report = generateGPUMiningReport(validInputs, metrics);
      
      expect(report).toContain('GPU Mining Profitability Analysis');
      expect(report).toContain('Ethereum Classic');
      expect(report).toContain('RTX-3080');
      expect(report).toContain('6');
      expect(report).toContain('$4,200');
      expect(report).toContain('RECOMMENDATIONS');
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateGPUMiningProfitabilityInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid GPU model', () => {
      const invalidInputs = { ...validInputs, gpuModel: 'invalid-gpu' };
      const validation = validateGPUMiningProfitabilityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('GPU model is required');
    });

    it('should reject invalid number of GPUs', () => {
      const invalidInputs = { ...validInputs, numberOfGPUs: 25 };
      const validation = validateGPUMiningProfitabilityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Number of GPUs must be between 1 and 20');
    });

    it('should reject invalid hashrate', () => {
      const invalidInputs = { ...validInputs, hashrate: 0 };
      const validation = validateGPUMiningProfitabilityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Hashrate must be between 0.1 and 200 MH/s');
    });

    it('should reject invalid power consumption', () => {
      const invalidInputs = { ...validInputs, powerConsumption: 700 };
      const validation = validateGPUMiningProfitabilityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Power consumption must be between 50 and 600 watts');
    });

    it('should reject invalid hardware cost', () => {
      const invalidInputs = { ...validInputs, hardwareCost: 100 };
      const validation = validateGPUMiningProfitabilityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Hardware cost must be between $500 and $100,000');
    });

    it('should reject invalid coin price', () => {
      const invalidInputs = { ...validInputs, coinPrice: 0 };
      const validation = validateGPUMiningProfitabilityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Coin price must be greater than 0');
    });

    it('should reject invalid pool fee', () => {
      const invalidInputs = { ...validInputs, poolFee: 15 };
      const validation = validateGPUMiningProfitabilityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Pool fee must be between 0% and 10%');
    });

    it('should reject invalid electricity cost', () => {
      const invalidInputs = { ...validInputs, electricityCost: 2 };
      const validation = validateGPUMiningProfitabilityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Electricity cost must be between $0 and $1 per kWh');
    });

    it('should reject excessive total power consumption', () => {
      const invalidInputs = { ...validInputs, numberOfGPUs: 15, powerConsumption: 600 };
      const validation = validateGPUMiningProfitabilityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Total power consumption exceeds 10kW limit');
    });
  });

  describe('Calculator Integration', () => {
    it('should calculate results with valid inputs', () => {
      const results = gpuMiningProfitabilityCalculator.calculate(validInputs);
      
      expect(results.dailyRevenue).toBeGreaterThan(0);
      expect(results.dailyProfit).toBeDefined();
      expect(results.monthlyProfit).toBeDefined();
      expect(results.yearlyProfit).toBeDefined();
      expect(results.breakEvenDays).toBeDefined();
      expect(results.roi12Months).toBeDefined();
      expect(results.dailyPowerCost).toBeDefined();
      expect(results.powerEfficiency).toBeDefined();
      expect(results.totalPowerConsumption).toBeDefined();
      expect(results.dailyCoinsEarned).toBeDefined();
      expect(results.networkSharePercentage).toBeDefined();
      expect(results.profitabilityRating).toBeDefined();
      expect(results.riskLevel).toBeDefined();
      expect(results.report).toBeDefined();
    });

    it('should throw error with invalid inputs', () => {
      const invalidInputs = { ...validInputs, numberOfGPUs: 0 };
      
      expect(() => {
        gpuMiningProfitabilityCalculator.calculate(invalidInputs);
      }).toThrow('Invalid inputs');
    });

    it('should handle edge cases', () => {
      // Test with minimum values
      const minInputs = {
        ...validInputs,
        numberOfGPUs: 1,
        hashrate: 0.1,
        powerConsumption: 50,
        hardwareCost: 500,
        coinPrice: 0.01,
        networkHashrate: 1000,
        blockReward: 0.1,
        blockTime: 1,
        poolFee: 0,
        electricityCost: 0.01,
        coolingCosts: 0,
        internetCosts: 0,
        maintenanceCosts: 0,
        priceVolatility: 0,
        difficultyIncrease: 0
      };
      
      const results = gpuMiningProfitabilityCalculator.calculate(minInputs);
      expect(results.dailyRevenue).toBeGreaterThanOrEqual(0);
      expect(results.dailyProfit).toBeDefined();
    });
  });

  describe('Business Logic', () => {
    it('should calculate break-even period correctly', () => {
      const results = gpuMiningProfitabilityCalculator.calculate(validInputs);
      
      if (results.dailyProfit > 0) {
        expect(results.breakEvenDays).toBeGreaterThan(0);
        expect(results.breakEvenDays).toBeCloseTo(validInputs.hardwareCost / results.dailyProfit, 0);
      }
    });

    it('should calculate ROI correctly', () => {
      const results = gpuMiningProfitabilityCalculator.calculate(validInputs);
      
      const expectedROI = ((results.yearlyProfit - validInputs.hardwareCost) / validInputs.hardwareCost) * 100;
      expect(results.roi12Months).toBeCloseTo(expectedROI, 1);
    });

    it('should provide meaningful profitability ratings', () => {
      const results = gpuMiningProfitabilityCalculator.calculate(validInputs);
      
      const validRatings = ['Unprofitable', 'High Risk', 'Low Profit', 'Moderate Profit', 'Good Profit', 'Excellent Profit'];
      expect(validRatings).toContain(results.profitabilityRating);
    });

    it('should provide meaningful risk levels', () => {
      const results = gpuMiningProfitabilityCalculator.calculate(validInputs);
      
      const validRiskLevels = ['Very Low Risk', 'Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk'];
      expect(validRiskLevels).toContain(results.riskLevel);
    });
  });
});
