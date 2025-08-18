import { ARMMortgageCalculator } from './ARMMortgageCalculator';
import { simulateARMSchedule, calculateMonthlyPayment, applyRateCaps } from './formulas';
import { validateARMCompliance } from './validation';

describe('ARMMortgageCalculator', () => {
  describe('Basic Calculations', () => {
    test('calculates 5/1 ARM correctly', () => {
      const inputs = {
        loanAmount: '400000',
        initialRate: '3.5',
        initialPeriod: '5',
        loanTerm: '30',
        indexRate: '2.5',
        margin: '2.25',
        periodicCap: '2',
        lifetimeCap: '5',
        adjustmentFrequency: '1',
        expectedIndexTrend: '0.5'
      };

      const result = ARMMortgageCalculator.calculate(inputs);
      
      expect(result.initialPayment.value).toBeGreaterThan(1500);
      expect(result.initialPayment.value).toBeLessThan(2000);
      expect(result.fullyIndexedRate.value).toBe(4.75); // 2.5% + 2.25%
      expect(result.maxPossibleRate.value).toBe(8.5); // 3.5% + 5%
    });

    test('calculates 7/1 ARM with higher caps', () => {
      const inputs = {
        loanAmount: '600000',
        initialRate: '3.25',
        initialPeriod: '7',
        loanTerm: '30',
        indexRate: '3.0',
        margin: '2.5',
        periodicCap: '2.5',
        lifetimeCap: '6',
        adjustmentFrequency: '1',
        expectedIndexTrend: '0.75'
      };

      const result = ARMMortgageCalculator.calculate(inputs);
      
      expect(result.initialPayment.value).toBeGreaterThan(2400);
      expect(result.fullyIndexedRate.value).toBe(5.5); // 3.0% + 2.5%
      expect(result.maxPossibleRate.value).toBe(9.25); // 3.25% + 6%
      expect(result.maxPossiblePayment.value).toBeGreaterThan(result.initialPayment.value);
    });

    test('handles zero index trend', () => {
      const inputs = {
        loanAmount: '500000',
        initialRate: '4.0',
        initialPeriod: '5',
        loanTerm: '30',
        indexRate: '3.0',
        margin: '2.0',
        periodicCap: '2',
        lifetimeCap: '5',
        adjustmentFrequency: '1',
        expectedIndexTrend: '0'
      };

      const result = ARMMortgageCalculator.calculate(inputs);
      
      expect(result.fullyIndexedRate.value).toBe(5.0); // 3.0% + 2.0%
      expect(result.totalInterestPaid.value).toBeGreaterThan(0);
    });
  });

  describe('Formula Functions', () => {
    test('calculateMonthlyPayment works correctly', () => {
      const payment = calculateMonthlyPayment(400000, 0.035, 30);
      expect(payment).toBeCloseTo(1796.18, 2);
    });

    test('calculateMonthlyPayment handles zero rate', () => {
      const payment = calculateMonthlyPayment(360000, 0, 30);
      expect(payment).toBe(1000); // 360000 / (30 * 12)
    });

    test('applyRateCaps applies periodic cap correctly', () => {
      const result = applyRateCaps(0.07, 0.04, 0.035, 0.02, 0.05);
      
      expect(result.adjustedRate).toBe(0.06); // 4% + 2% periodic cap
      expect(result.capApplied).toBe(true);
      expect(result.capType).toBe('periodic');
    });

    test('applyRateCaps applies lifetime cap correctly', () => {
      const result = applyRateCaps(0.10, 0.04, 0.035, 0.025, 0.05);
      
      expect(result.adjustedRate).toBe(0.085); // 3.5% + 5% lifetime cap
      expect(result.capApplied).toBe(true);
      expect(result.capType).toBe('lifetime');
    });

    test('applyRateCaps applies no cap when within limits', () => {
      const result = applyRateCaps(0.055, 0.04, 0.035, 0.02, 0.05);
      
      expect(result.adjustedRate).toBe(0.055);
      expect(result.capApplied).toBe(false);
      expect(result.capType).toBe('none');
    });
  });

  describe('ARM Simulation', () => {
    test('simulateARMSchedule generates complete schedule', () => {
      const inputs = {
        loanAmount: 400000,
        initialRate: 0.035,
        initialPeriod: 5,
        loanTerm: 30,
        indexRate: 0.025,
        margin: 0.0225,
        periodicCap: 0.02,
        lifetimeCap: 0.05,
        adjustmentFrequency: 1,
        expectedIndexTrend: 0.005
      };

      const result = simulateARMSchedule(inputs);
      
      expect(result.paymentSchedule).toHaveLength(30);
      expect(result.paymentSchedule[0].rate).toBe(0.035); // Initial rate
      expect(result.paymentSchedule[0].remainingBalance).toBeLessThan(400000);
      expect(result.totalInterestPaid).toBeGreaterThan(0);
    });

    test('simulateARMSchedule handles rate adjustments', () => {
      const inputs = {
        loanAmount: 300000,
        initialRate: 0.03,
        initialPeriod: 3,
        loanTerm: 15,
        indexRate: 0.04,
        margin: 0.025,
        periodicCap: 0.02,
        lifetimeCap: 0.06,
        adjustmentFrequency: 1,
        expectedIndexTrend: 0.01
      };

      const result = simulateARMSchedule(inputs);
      
      expect(result.rateAdjustments.length).toBeGreaterThan(0);
      expect(result.rateAdjustments[0].adjustmentDate).toBe(4); // Year 4
      expect(result.rateAdjustments[0].oldRate).toBe(0.03);
      expect(result.rateAdjustments[0].newRate).toBeGreaterThan(0.03);
    });
  });

  describe('Validation', () => {
    test('validates compliant ARM structure', () => {
      const inputs = {
        loanAmount: 400000,
        initialRate: 3.5,
        initialPeriod: 5,
        loanTerm: 30,
        indexRate: 2.5,
        margin: 2.25,
        periodicCap: 2,
        lifetimeCap: 5,
        adjustmentFrequency: 1
      };

      const validation = validateARMCompliance(inputs);
      
      expect(validation.isCompliant).toBe(true);
      expect(validation.violations).toHaveLength(0);
    });

    test('identifies non-compliant ARM structure', () => {
      const inputs = {
        loanAmount: 400000,
        initialRate: 2.0, // Very low teaser rate
        initialPeriod: 1, // Too short
        loanTerm: 30,
        indexRate: 4.0,
        margin: 3.0, // High margin
        periodicCap: 6, // Too high
        lifetimeCap: 12, // Too high
        adjustmentFrequency: 1
      };

      const validation = validateARMCompliance(inputs);
      
      expect(validation.isCompliant).toBe(false);
      expect(validation.violations.length).toBeGreaterThan(0);
      expect(validation.isQualifiedMortgage).toBe(false);
    });

    test('generates appropriate warnings', () => {
      const inputs = {
        loanAmount: 500000,
        initialRate: 2.5, // Below fully indexed
        initialPeriod: 5,
        loanTerm: 30,
        indexRate: 3.5,
        margin: 2.75, // High margin
        periodicCap: 2,
        lifetimeCap: 5,
        adjustmentFrequency: 1
      };

      const validation = validateARMCompliance(inputs);
      
      expect(validation.warnings.length).toBeGreaterThan(0);
      expect(validation.warnings.some(w => w.includes('teaser'))).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    test('handles very short loan term', () => {
      const inputs = {
        loanAmount: '200000',
        initialRate: '4.0',
        initialPeriod: '3',
        loanTerm: '15',
        indexRate: '3.0',
        margin: '2.0',
        periodicCap: '2',
        lifetimeCap: '5',
        adjustmentFrequency: '1',
        expectedIndexTrend: '0.5'
      };

      const result = ARMMortgageCalculator.calculate(inputs);
      
      expect(result.initialPayment.value).toBeGreaterThan(1400);
      expect(result.totalInterestPaid.value).toBeGreaterThan(0);
    });

    test('handles maximum rate scenario', () => {
      const inputs = {
        loanAmount: '400000',
        initialRate: '3.0',
        initialPeriod: '5',
        loanTerm: '30',
        indexRate: '6.0', // High index
        margin: '3.0', // High margin
        periodicCap: '2',
        lifetimeCap: '6',
        adjustmentFrequency: '1',
        expectedIndexTrend: '1.0' // Rising rates
      };

      const result = ARMMortgageCalculator.calculate(inputs);
      
      expect(result.maxPossibleRate.value).toBe(9.0); // 3% + 6%
      expect(result.maxPossiblePayment.value).toBeGreaterThan(result.initialPayment.value * 1.3);
    });

    test('handles declining rate environment', () => {
      const inputs = {
        loanAmount: '350000',
        initialRate: '4.5',
        initialPeriod: '5',
        loanTerm: '30',
        indexRate: '2.0', // Low index
        margin: '2.0',
        periodicCap: '2',
        lifetimeCap: '5',
        adjustmentFrequency: '1',
        expectedIndexTrend: '-0.5' // Declining rates
      };

      const result = ARMMortgageCalculator.calculate(inputs);
      
      expect(result.fullyIndexedRate.value).toBe(4.0); // 2% + 2%
      expect(result.fullyIndexedRate.value).toBeLessThan(Number(inputs.initialRate));
    });
  });

  describe('Risk Assessment', () => {
    test('identifies high-risk ARM structure', () => {
      const inputs = {
        loanAmount: '600000',
        initialRate: '2.5', // Low teaser
        initialPeriod: '3', // Short period
        loanTerm: '30',
        indexRate: '4.0',
        margin: '3.5', // High margin
        periodicCap: '2.5',
        lifetimeCap: '6',
        adjustmentFrequency: '1',
        expectedIndexTrend: '1.0'
      };

      const result = ARMMortgageCalculator.calculate(inputs);
      
      expect(result.riskAssessment.value).toContain('RISK');
      expect(result.maxPossiblePayment.value).toBeGreaterThan(result.initialPayment.value * 1.4);
    });

    test('identifies low-risk ARM structure', () => {
      const inputs = {
        loanAmount: '400000',
        initialRate: '4.0',
        initialPeriod: '7', // Long period
        loanTerm: '30',
        indexRate: '3.5',
        margin: '2.0', // Reasonable margin
        periodicCap: '1', // Low cap
        lifetimeCap: '3', // Low cap
        adjustmentFrequency: '1',
        expectedIndexTrend: '0.25'
      };

      const result = ARMMortgageCalculator.calculate(inputs);
      
      expect(result.riskAssessment.value).toContain('LOW RISK');
      expect(result.maxPossiblePayment.value).toBeLessThan(result.initialPayment.value * 1.25);
    });
  });

  describe('Integration Tests', () => {
    test('all example scenarios work correctly', () => {
      ARMMortgageCalculator.examples?.forEach(example => {
        const result = ARMMortgageCalculator.calculate(example.inputs);
        
        expect(result.initialPayment.value).toBeGreaterThan(0);
        expect(result.fullyIndexedRate.value).toBeGreaterThan(0);
        expect(result.maxPossibleRate.value).toBeGreaterThan(result.fullyIndexedRate.value);
        expect(result.totalInterestPaid.value).toBeGreaterThan(0);
      });
    });

    test('payment schedule is consistent', () => {
      const inputs = {
        loanAmount: '300000',
        initialRate: '3.5',
        initialPeriod: '5',
        loanTerm: '30',
        indexRate: '2.5',
        margin: '2.25',
        periodicCap: '2',
        lifetimeCap: '5',
        adjustmentFrequency: '1',
        expectedIndexTrend: '0.5'
      };

      const result = ARMMortgageCalculator.calculate(inputs);
      
      // Check that payment schedule makes sense
      expect(result.paymentSchedule.value).toContain('Years 1-5');
      expect(result.paymentSchedule.value).toContain('Year 6+');
      expect(result.paymentSchedule.value).toContain('Maximum payment');
    });
  });
});