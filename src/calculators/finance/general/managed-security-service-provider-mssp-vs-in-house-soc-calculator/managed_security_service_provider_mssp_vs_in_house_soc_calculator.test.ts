import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatemanaged_security_service_provider_mssp_vs_in_house_soc_calculatorInputs } from './validation';

describe('Managed Security Service Provider (MSSP) vs. In House SOC Calculator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatemanaged_security_service_provider_mssp_vs_in_house_soc_calculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatemanaged_security_service_provider_mssp_vs_in_house_soc_calculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
