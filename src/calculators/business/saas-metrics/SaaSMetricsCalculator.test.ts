import { SaaSMetricsCalculator } from './SaaSMetricsCalculator';

describe('SaaSMetricsCalculator', () => {
  let calculator: SaaSMetricsCalculator;

  beforeEach(() => {
    calculator = new SaaSMetricsCalculator();
  });

  describe('calculate', () => {
    it('should calculate SaaS metrics correctly', () => {
      const inputs = {
        monthlyRecurringRevenue: 100000,
        annualRecurringRevenue: 1200000,
        totalCustomers: 1000,
        newCustomers: 50,
        churnedCustomers: 10,
        customerAcquisitionCost: 500,
        customerLifetimeValue: 5000,
        monthlyChurnRate: 0.01,
        annualChurnRate: 0.12,
        grossRevenueRetention: 0.95,
        netRevenueRetention: 1.05,
        averageRevenuePerUser: 100,
        averageRevenuePerAccount: 1000,
        totalRevenue: 1200000,
        costOfRevenue: 300000,
        grossMargin: 0.75,
        operatingExpenses: 600000,
        netIncome: 300000,
        cashFlow: 250000,
        burnRate: 50000,
        runway: 18
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.customerLifetimeValue).toBeGreaterThan(0);
      expect(result.customerAcquisitionCost).toBeGreaterThan(0);
      expect(result.ltvToCacRatio).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.churnRate).toBeGreaterThanOrEqual(0);
      expect(result.retentionRate).toBeGreaterThan(0);
      expect(result.grossRevenueRetention).toBeGreaterThan(0);
      expect(result.netRevenueRetention).toBeGreaterThan(0);
      expect(result.averageRevenuePerUser).toBeGreaterThan(0);
      expect(result.averageRevenuePerAccount).toBeGreaterThan(0);
      expect(result.monthlyRecurringRevenue).toBeGreaterThan(0);
      expect(result.annualRecurringRevenue).toBeGreaterThan(0);
      expect(result.growthRate).toBeDefined();
      expect(result.burnRate).toBeGreaterThan(0);
      expect(result.runway).toBeGreaterThan(0);
      expect(result.grossMargin).toBeGreaterThan(0);
      expect(result.netMargin).toBeDefined();
      expect(result.cashFlow).toBeDefined();
      expect(result.analysis).toBeDefined();
    });

    it('should handle zero values', () => {
      const inputs = {
        monthlyRecurringRevenue: 0,
        annualRecurringRevenue: 0,
        totalCustomers: 0,
        newCustomers: 0,
        churnedCustomers: 0,
        customerAcquisitionCost: 0,
        customerLifetimeValue: 0,
        monthlyChurnRate: 0,
        annualChurnRate: 0,
        grossRevenueRetention: 0,
        netRevenueRetention: 0,
        averageRevenuePerUser: 0,
        averageRevenuePerAccount: 0,
        totalRevenue: 0,
        costOfRevenue: 0,
        grossMargin: 0,
        operatingExpenses: 0,
        netIncome: 0,
        cashFlow: 0,
        burnRate: 0,
        runway: 0
      };

      const result = calculator.calculate(inputs);

      expect(result.customerLifetimeValue).toBe(0);
      expect(result.customerAcquisitionCost).toBe(0);
      expect(result.ltvToCacRatio).toBe(0);
      expect(result.paybackPeriod).toBe(0);
      expect(result.churnRate).toBe(0);
      expect(result.retentionRate).toBe(1);
      expect(result.grossRevenueRetention).toBe(0);
      expect(result.netRevenueRetention).toBe(0);
      expect(result.averageRevenuePerUser).toBe(0);
      expect(result.averageRevenuePerAccount).toBe(0);
      expect(result.monthlyRecurringRevenue).toBe(0);
      expect(result.annualRecurringRevenue).toBe(0);
      expect(result.growthRate).toBe(0);
      expect(result.burnRate).toBe(0);
      expect(result.runway).toBe(0);
      expect(result.grossMargin).toBe(0);
      expect(result.netMargin).toBe(0);
      expect(result.cashFlow).toBe(0);
    });

    it('should handle high growth scenario', () => {
      const inputs = {
        monthlyRecurringRevenue: 500000,
        annualRecurringRevenue: 6000000,
        totalCustomers: 5000,
        newCustomers: 500,
        churnedCustomers: 25,
        customerAcquisitionCost: 200,
        customerLifetimeValue: 10000,
        monthlyChurnRate: 0.005,
        annualChurnRate: 0.06,
        grossRevenueRetention: 0.98,
        netRevenueRetention: 1.15,
        averageRevenuePerUser: 100,
        averageRevenuePerAccount: 1200,
        totalRevenue: 6000000,
        costOfRevenue: 1200000,
        grossMargin: 0.80,
        operatingExpenses: 2400000,
        netIncome: 2400000,
        cashFlow: 2000000,
        burnRate: 0,
        runway: 0
      };

      const result = calculator.calculate(inputs);

      expect(result.ltvToCacRatio).toBeGreaterThan(3);
      expect(result.churnRate).toBeLessThan(0.01);
      expect(result.retentionRate).toBeGreaterThan(0.99);
      expect(result.grossRevenueRetention).toBeGreaterThan(0.95);
      expect(result.netRevenueRetention).toBeGreaterThan(1);
      expect(result.growthRate).toBeGreaterThan(0.1);
      expect(result.analysis.isHealthy).toBe(true);
    });
  });

  describe('validateInputs', () => {
    it('should validate required inputs', () => {
      const inputs = {
        monthlyRecurringRevenue: 100000,
        annualRecurringRevenue: 1200000,
        totalCustomers: 1000,
        newCustomers: 50,
        churnedCustomers: 10,
        customerAcquisitionCost: 500,
        customerLifetimeValue: 5000,
        monthlyChurnRate: 0.01,
        annualChurnRate: 0.12,
        grossRevenueRetention: 0.95,
        netRevenueRetention: 1.05,
        averageRevenuePerUser: 100,
        averageRevenuePerAccount: 1000,
        totalRevenue: 1200000,
        costOfRevenue: 300000,
        grossMargin: 0.75,
        operatingExpenses: 600000,
        netIncome: 300000,
        cashFlow: 250000,
        burnRate: 50000,
        runway: 18
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(true);
    });

    it('should reject negative values', () => {
      const inputs = {
        monthlyRecurringRevenue: -100000,
        annualRecurringRevenue: 1200000,
        totalCustomers: 1000,
        newCustomers: 50,
        churnedCustomers: 10,
        customerAcquisitionCost: 500,
        customerLifetimeValue: 5000,
        monthlyChurnRate: 0.01,
        annualChurnRate: 0.12,
        grossRevenueRetention: 0.95,
        netRevenueRetention: 1.05,
        averageRevenuePerUser: 100,
        averageRevenuePerAccount: 1000,
        totalRevenue: 1200000,
        costOfRevenue: 300000,
        grossMargin: 0.75,
        operatingExpenses: 600000,
        netIncome: 300000,
        cashFlow: 250000,
        burnRate: 50000,
        runway: 18
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Monthly recurring revenue must be non-negative');
    });
  });
});
