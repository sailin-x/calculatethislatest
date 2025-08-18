import { describe, it, expect } from 'vitest';
import { automotiveCalculatorFormula, AutomotiveFormulas } from './formulas';

describe('AutomotiveCalculator', () => {
  describe('Loan payment calculation', () => {
    it('should calculate monthly loan payment correctly', () => {
      const payment = AutomotiveFormulas.calculateLoanPayment(30000, 4.5, 60);
      expect(payment).toBeCloseTo(559.37, 1);
    });

    it('should handle zero interest rate', () => {
      const payment = AutomotiveFormulas.calculateLoanPayment(24000, 0, 48);
      expect(payment).toBe(500); // 24000 / 48
    });
  });

  describe('Vehicle depreciation', () => {
    it('should calculate depreciation correctly', () => {
      const depreciation = AutomotiveFormulas.calculateDepreciation(35000, 5);
      expect(depreciation.totalDepreciation).toBeGreaterThan(15000);
      expect(depreciation.depreciatedValue).toBeLessThan(20000);
    });
  });

  describe('Calculator formula integration', () => {
    it('should calculate lease vs buy analysis', () => {
      const inputs = {
        calculationType: 'lease_vs_buy',
        vehiclePrice: 35000,
        downPayment: 5000,
        loanTerm: 60,
        interestRate: 4.5,
        leaseMonthlyPayment: 399,
        leaseTerm: 36,
        leaseDownPayment: 2000,
        ownershipPeriod: 3
      };

      const result = automotiveCalculatorFormula.calculate(inputs);
      expect(result.outputs.recommendation).toBeDefined();
      expect(result.outputs.totalCostBuy).toBeGreaterThan(0);
      expect(result.outputs.totalCostLease).toBeGreaterThan(0);
    });
  });
});