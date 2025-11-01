import { describe, it, expect } from 'vitest';
import { calculateRequiredMinimumDistribution } from './formulas';
import { validateRequiredMinimumDistributionRMDInputs } from './validation';

describe('Required Minimum Distribution (RMD) Calculator', () => {
  describe('RMD Calculations', () => {
    it('calculates RMD for 72-year-old with $500,000 balance', () => {
      const inputs = {
        accountBalance: 500000,
        birthYear: 1950,
        accountType: 'traditional_ira' as const,
        currentAge: 72
      };
      const result = calculateRequiredMinimumDistribution(inputs);
      expect(result.requiredMinimumDistribution).toBeGreaterThan(19000);
      expect(result.requiredMinimumDistribution).toBeLessThan(19500);
      expect(result.distributionPercentage).toBeCloseTo(0.0385, 4);
      expect(result.lifeExpectancyFactor).toBeCloseTo(26.0, 1);
    });

    it('returns zero RMD for Roth IRA', () => {
      const inputs = {
        accountBalance: 300000,
        birthYear: 1960,
        accountType: 'roth_ira' as const,
        currentAge: 72
      };
      const result = calculateRequiredMinimumDistribution(inputs);
      expect(result.requiredMinimumDistribution).toBe(0);
      expect(result.distributionPercentage).toBe(0);
      expect(result.remainingBalanceAfterRMD).toBe(300000);
    });

    it('returns zero RMD for person below RBD age', () => {
      const inputs = {
        accountBalance: 400000,
        birthYear: 1952,
        accountType: 'traditional_ira' as const,
        currentAge: 70
      };
      const result = calculateRequiredMinimumDistribution(inputs);
      expect(result.requiredMinimumDistribution).toBe(0);
      expect(result.rmdExplanation).toContain('Required Beginning Date');
    });

    it('calculates joint life expectancy when spouse is beneficial owner', () => {
      const inputs = {
        accountBalance: 600000,
        birthYear: 1950,
        accountType: 'traditional_ira' as const,
        currentAge: 72,
        spouseBirthYear: 1955,
        isSpouseBeneficialOwner: true
      };
      const result = calculateRequiredMinimumDistribution(inputs);
      expect(result.requiredMinimumDistribution).toBeGreaterThan(0);
      expect(result.lifeExpectancyFactor).toBeGreaterThan(25); // Joint life expectancy should be higher
    });

    it('handles very large account balances', () => {
      const inputs = {
        accountBalance: 10000000,
        birthYear: 1945,
        accountType: '401k' as const,
        currentAge: 75
      };
      const result = calculateRequiredMinimumDistribution(inputs);
      expect(result.requiredMinimumDistribution).toBeGreaterThan(400000);
      expect(result.remainingBalanceAfterRMD).toBe(10000000 - result.requiredMinimumDistribution);
    });
  });

  describe('Life Expectancy Calculations', () => {
    it('uses correct life expectancy factor for age 72', () => {
      const inputs = {
        accountBalance: 100000,
        birthYear: 1950,
        accountType: 'traditional_ira' as const,
        currentAge: 72
      };
      const result = calculateRequiredMinimumDistribution(inputs);
      expect(result.lifeExpectancyFactor).toBeCloseTo(25.6, 1);
      expect(result.requiredMinimumDistribution).toBeCloseTo(3906, 0);
    });

    it('uses correct life expectancy factor for age 80', () => {
      const inputs = {
        accountBalance: 100000,
        birthYear: 1940,
        accountType: 'traditional_ira' as const,
        currentAge: 80
      };
      const result = calculateRequiredMinimumDistribution(inputs);
      expect(result.lifeExpectancyFactor).toBeCloseTo(18.7, 1);
      expect(result.requiredMinimumDistribution).toBeCloseTo(5339, 0);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const inputs = {
        accountBalance: 500000,
        birthYear: 1950,
        accountType: 'traditional_ira' as const,
        currentAge: 72
      };
      const result = validateRequiredMinimumDistributionRMDInputs(inputs);
      expect(result.length).toBe(0);
    });

    it('validates account balance cannot be negative', () => {
      const inputs = {
        accountBalance: -1000,
        birthYear: 1950,
        accountType: 'traditional_ira' as const,
        currentAge: 72
      };
      const result = validateRequiredMinimumDistributionRMDInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('cannot be negative');
    });

    it('validates birth year range', () => {
      const inputs = {
        accountBalance: 500000,
        birthYear: 1800,
        accountType: 'traditional_ira' as const,
        currentAge: 72
      };
      const result = validateRequiredMinimumDistributionRMDInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('1900 or later');
    });

    it('validates account type', () => {
      const inputs = {
        accountBalance: 500000,
        birthYear: 1950,
        accountType: 'invalid_type' as any,
        currentAge: 72
      };
      const result = validateRequiredMinimumDistributionRMDInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('valid account type');
    });
  });

  describe('Edge Cases', () => {
    it('handles zero account balance', () => {
      const inputs = {
        accountBalance: 0,
        birthYear: 1950,
        accountType: 'traditional_ira' as const,
        currentAge: 72
      };
      const result = calculateRequiredMinimumDistribution(inputs);
      expect(result.requiredMinimumDistribution).toBe(0);
      expect(result.remainingBalanceAfterRMD).toBe(0);
    });

    it('handles very old age (beyond table)', () => {
      const inputs = {
        accountBalance: 100000,
        birthYear: 1900,
        accountType: 'traditional_ira' as const,
        currentAge: 110
      };
      const result = calculateRequiredMinimumDistribution(inputs);
      expect(result.requiredMinimumDistribution).toBeGreaterThan(0);
      expect(result.lifeExpectancyFactor).toBeGreaterThan(0);
    });

    it('calculates age from birth year when currentAge not provided', () => {
      const currentYear = new Date().getFullYear();
      const birthYear = currentYear - 73;
      const inputs = {
        accountBalance: 100000,
        birthYear: birthYear,
        accountType: 'traditional_ira' as const
      };
      const result = calculateRequiredMinimumDistribution(inputs);
      expect(result.requiredMinimumDistribution).toBeGreaterThan(0);
    });
  });
});