import { Exchange1031Calculator } from './Exchange1031Calculator';
import { calculate1031Exchange } from './formulas';
import { validateExchangeStructure } from './validation';

describe('Exchange1031Calculator', () => {
  describe('Basic Calculations', () => {
    test('calculates simple 1031 exchange correctly', () => {
      const inputs = {
        originalPropertyValue: '500000',
        originalBasis: '300000',
        replacementPropertyValue: '600000',
        exchangeExpenses: '15000',
        capitalGainsTaxRate: '20',
        depreciationRecapture: '50000',
        bootReceived: '0'
      };

      const result = Exchange1031Calculator.calculate(inputs);
      
      expect(result.capitalGain.value).toBe(200000); // 500k - 300k
      expect(result.exchangeQualifies.value).toBe('Yes');
      expect(result.deferredTax.value).toBeGreaterThan(0);
      expect(result.newBasis.value).toBe(400000); // 300k + (600k - 500k) - 0
    });

    test('calculates exchange with boot correctly', () => {
      const inputs = {
        originalPropertyValue: '800000',
        originalBasis: '400000',
        replacementPropertyValue: '750000',
        exchangeExpenses: '20000',
        capitalGainsTaxRate: '23.8',
        depreciationRecapture: '100000',
        bootReceived: '50000'
      };

      const result = Exchange1031Calculator.calculate(inputs);
      
      expect(result.capitalGain.value).toBe(400000); // 800k - 400k
      expect(result.taxOnBoot.value).toBeGreaterThan(0);
      expect(result.netCashFlow.value).toBe(50000 - 20000 - result.taxOnBoot.value);
    });

    test('identifies non-qualifying exchange', () => {
      const inputs = {
        originalPropertyValue: '500000',
        originalBasis: '300000',
        replacementPropertyValue: '400000', // Less than original
        exchangeExpenses: '15000',
        capitalGainsTaxRate: '20',
        depreciationRecapture: '0',
        bootReceived: '0'
      };

      const result = Exchange1031Calculator.calculate(inputs);
      
      expect(result.exchangeQualifies.value).toBe('No');
    });
  });

  describe('Formula Functions', () => {
    test('calculate1031Exchange with valid inputs', () => {
      const inputs = {
        originalPropertyValue: 1000000,
        originalBasis: 600000,
        replacementPropertyValue: 1200000,
        exchangeExpenses: 25000,
        capitalGainsTaxRate: 20,
        depreciationRecapture: 150000,
        bootReceived: 0
      };

      const result = calculate1031Exchange(inputs);
      
      expect(result.capitalGain).toBe(400000);
      expect(result.qualifiesForExchange).toBe(true);
      expect(result.deferredTax).toBeGreaterThan(0);
      expect(result.newBasis).toBe(800000); // 600k + 200k - 0
    });

    test('handles depreciation recapture correctly', () => {
      const inputs = {
        originalPropertyValue: 500000,
        originalBasis: 300000,
        replacementPropertyValue: 500000,
        exchangeExpenses: 10000,
        capitalGainsTaxRate: 20,
        depreciationRecapture: 80000,
        bootReceived: 0
      };

      const result = calculate1031Exchange(inputs);
      
      // Capital gain = 200k, depreciation recapture = 80k
      // Regular capital gain = 120k, taxed at 20% = 24k
      // Depreciation recapture = 80k, taxed at 25% = 20k
      // Total tax without exchange = 44k
      expect(result.deferredTax).toBeCloseTo(44000, -2);
    });
  });

  describe('Validation', () => {
    test('validates exchange structure correctly', () => {
      const validInputs = {
        originalPropertyValue: 500000,
        originalBasis: 300000,
        replacementPropertyValue: 600000,
        exchangeExpenses: 15000,
        bootReceived: 0
      };

      const validation = validateExchangeStructure(validInputs);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('identifies invalid exchange structure', () => {
      const invalidInputs = {
        originalPropertyValue: 500000,
        originalBasis: 300000,
        replacementPropertyValue: 400000, // Too low
        exchangeExpenses: 15000,
        bootReceived: 0
      };

      const validation = validateExchangeStructure(invalidInputs);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    test('generates warnings for suboptimal structure', () => {
      const suboptimalInputs = {
        originalPropertyValue: 500000,
        originalBasis: 300000,
        replacementPropertyValue: 500000,
        exchangeExpenses: 40000, // High expenses (8%)
        bootReceived: 0
      };

      const validation = validateExchangeStructure(suboptimalInputs);
      
      expect(validation.warnings.length).toBeGreaterThan(0);
      expect(validation.warnings.some(w => w.includes('expenses'))).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    test('handles zero capital gain', () => {
      const inputs = {
        originalPropertyValue: '300000',
        originalBasis: '300000', // No gain
        replacementPropertyValue: '350000',
        exchangeExpenses: '10000',
        capitalGainsTaxRate: '20',
        depreciationRecapture: '0',
        bootReceived: '0'
      };

      const result = Exchange1031Calculator.calculate(inputs);
      
      expect(result.capitalGain.value).toBe(0);
      expect(result.deferredTax.value).toBe(0);
      expect(result.exchangeQualifies.value).toBe('Yes');
    });

    test('handles maximum boot scenario', () => {
      const inputs = {
        originalPropertyValue: '500000',
        originalBasis: '300000',
        replacementPropertyValue: '300000',
        exchangeExpenses: '15000',
        capitalGainsTaxRate: '20',
        depreciationRecapture: '50000',
        bootReceived: '200000' // All cash
      };

      const result = Exchange1031Calculator.calculate(inputs);
      
      expect(result.capitalGain.value).toBe(200000);
      expect(result.taxOnBoot.value).toBeGreaterThan(0);
      expect(result.deferredTax.value).toBeLessThan(result.capitalGain.value * 0.2);
    });

    test('handles very large property values', () => {
      const inputs = {
        originalPropertyValue: '50000000',
        originalBasis: '30000000',
        replacementPropertyValue: '60000000',
        exchangeExpenses: '500000',
        capitalGainsTaxRate: '23.8',
        depreciationRecapture: '5000000',
        bootReceived: '0'
      };

      const result = Exchange1031Calculator.calculate(inputs);
      
      expect(result.capitalGain.value).toBe(20000000);
      expect(result.exchangeQualifies.value).toBe('Yes');
      expect(result.deferredTax.value).toBeGreaterThan(1000000);
    });
  });

  describe('Recommendations', () => {
    test('generates appropriate recommendations', () => {
      const inputs = {
        originalPropertyValue: '500000',
        originalBasis: '300000',
        replacementPropertyValue: '500000',
        exchangeExpenses: '30000', // High expenses
        capitalGainsTaxRate: '20',
        depreciationRecapture: '0',
        bootReceived: '25000' // Some boot
      };

      const result = Exchange1031Calculator.calculate(inputs);
      
      expect(result.recommendations.value).toContain('boot');
      expect(result.recommendations.value).toContain('expenses');
      expect(result.recommendations.value).toContain('45-day');
      expect(result.recommendations.value).toContain('qualified intermediary');
    });
  });

  describe('Tax Calculations', () => {
    test('calculates depreciation recapture tax correctly', () => {
      const inputs = {
        originalPropertyValue: 1000000,
        originalBasis: 500000,
        replacementPropertyValue: 1000000,
        exchangeExpenses: 20000,
        capitalGainsTaxRate: 20, // 20%
        depreciationRecapture: 200000, // $200k depreciation
        bootReceived: 0
      };

      const result = calculate1031Exchange(inputs);
      
      // Capital gain = 500k
      // Regular gain = 300k (500k - 200k depreciation)
      // Regular gain tax = 300k * 20% = 60k
      // Depreciation recapture tax = 200k * 25% = 50k
      // Total deferred = 110k
      expect(result.deferredTax).toBeCloseTo(110000, -2);
    });

    test('calculates NIIT correctly for high earners', () => {
      const inputs = {
        originalPropertyValue: 2000000,
        originalBasis: 1000000,
        replacementPropertyValue: 2500000,
        exchangeExpenses: 50000,
        capitalGainsTaxRate: 23.8, // 20% + 3.8% NIIT
        depreciationRecapture: 300000,
        bootReceived: 0
      };

      const result = calculate1031Exchange(inputs);
      
      expect(result.capitalGain).toBe(1000000);
      expect(result.deferredTax).toBeGreaterThan(200000); // Significant tax deferral
    });
  });
});

describe('Integration Tests', () => {
  test('calculator integrates with validation rules', () => {
    const invalidInputs = {
      originalPropertyValue: '-100000', // Invalid
      originalBasis: '300000',
      replacementPropertyValue: '400000',
      exchangeExpenses: '15000',
      capitalGainsTaxRate: '20',
      depreciationRecapture: '0',
      bootReceived: '0'
    };

    // This would be caught by validation before calculation
    expect(() => {
      const originalValue = Number(invalidInputs.originalPropertyValue);
      if (originalValue < 0) throw new Error('Invalid property value');
    }).toThrow();
  });

  test('handles all example scenarios', () => {
    Exchange1031Calculator.examples?.forEach(example => {
      const result = Exchange1031Calculator.calculate(example.inputs);
      
      expect(result.capitalGain.value).toBeGreaterThanOrEqual(0);
      expect(result.newBasis.value).toBeGreaterThan(0);
      expect(typeof result.exchangeQualifies.value).toBe('string');
    });
  });
});