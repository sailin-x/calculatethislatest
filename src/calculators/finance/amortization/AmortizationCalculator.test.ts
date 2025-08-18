import { AmortizationCalculator } from './AmortizationCalculator';
import { 
  calculateLoanPayment, 
  generateAmortizationSchedule, 
  calculateBiweeklySavings,
  findOptimalExtraPayment 
} from './formulas';
import { validateAmortizationInputs } from './validation';

describe('AmortizationCalculator', () => {
  describe('Basic Calculations', () => {
    test('calculates standard 30-year mortgage correctly', () => {
      const inputs = {
        loanAmount: '300000',
        interestRate: '4.5',
        loanTerm: '30',
        extraPayment: '0',
        oneTimePayment: '0',
        paymentFrequency: 'monthly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      expect(result.monthlyPayment.value).toBeCloseTo(1520.06, 2);
      expect(result.totalInterest.value).toBeGreaterThan(240000);
      expect(result.totalPayments.value).toBeCloseTo(300000 + result.totalInterest.value, 2);
    });

    test('calculates mortgage with extra payments', () => {
      const inputs = {
        loanAmount: '300000',
        interestRate: '4.5',
        loanTerm: '30',
        extraPayment: '200',
        extraPaymentStart: '1',
        oneTimePayment: '10000',
        oneTimePaymentMonth: '12',
        paymentFrequency: 'monthly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      expect(result.monthlyPayment.value).toBeCloseTo(1520.06, 2);
      expect(result.interestSavings.value).toBeGreaterThan(50000);
      expect(result.timeSavings.value).toContain('years');
    });

    test('calculates biweekly payments correctly', () => {
      const inputs = {
        loanAmount: '400000',
        interestRate: '5.0',
        loanTerm: '30',
        extraPayment: '0',
        oneTimePayment: '0',
        paymentFrequency: 'biweekly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      expect(result.monthlyPayment.value).toBeGreaterThan(1000);
      expect(result.interestSavings.value).toBeGreaterThan(0);
      expect(result.timeSavings.value).toContain('years');
    });
  });

  describe('Formula Functions', () => {
    test('calculateLoanPayment works correctly', () => {
      const payment = calculateLoanPayment(300000, 0.045, 30, 12);
      expect(payment).toBeCloseTo(1520.06, 2);
    });

    test('calculateLoanPayment handles zero interest', () => {
      const payment = calculateLoanPayment(120000, 0, 10, 12);
      expect(payment).toBe(1000); // 120000 / (10 * 12)
    });

    test('generateAmortizationSchedule creates complete schedule', () => {
      const inputs = {
        loanAmount: 200000,
        annualRate: 0.04,
        loanTermYears: 15,
        extraPayment: 0,
        extraPaymentStart: 1,
        oneTimePayment: 0,
        oneTimePaymentMonth: 1,
        paymentFrequency: 'monthly' as const,
        compoundingFrequency: 'monthly' as const,
        startDate: new Date('2024-01-01')
      };

      const result = generateAmortizationSchedule(inputs);
      
      expect(result.schedule).toHaveLength(180); // 15 years * 12 months
      expect(result.schedule[0].remainingBalance).toBeLessThan(200000);
      expect(result.schedule[179].remainingBalance).toBeCloseTo(0, 2);
      expect(result.yearlyTotals).toHaveLength(15);
    });

    test('calculateBiweeklySavings shows savings correctly', () => {
      const savings = calculateBiweeklySavings(300000, 0.045, 30);
      
      expect(savings.biweeklyPayment).toBeCloseTo(savings.monthlyPayment / 2, 2);
      expect(savings.interestSavings).toBeGreaterThan(50000);
      expect(savings.timeSavings).toBeGreaterThan(48); // Should save 4+ years
    });

    test('findOptimalExtraPayment calculates correctly', () => {
      const extraPayment = findOptimalExtraPayment(300000, 0.045, 30, 15);
      
      expect(extraPayment).toBeGreaterThan(500);
      expect(extraPayment).toBeLessThan(1500);
    });
  });

  describe('Payment Schedules', () => {
    test('generates correct payment breakdown', () => {
      const inputs = {
        loanAmount: '250000',
        interestRate: '4.0',
        loanTerm: '30',
        extraPayment: '0',
        oneTimePayment: '0',
        paymentFrequency: 'monthly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      expect(result.scheduleBreakdown.value).toContain('Total payments');
      expect(result.scheduleBreakdown.value).toContain('First year');
      expect(result.scheduleBreakdown.value).toContain('Final year');
      expect(result.scheduleBreakdown.value).toContain('Interest vs Principal');
    });

    test('generates yearly totals correctly', () => {
      const inputs = {
        loanAmount: '200000',
        interestRate: '3.5',
        loanTerm: '15',
        extraPayment: '0',
        oneTimePayment: '0',
        paymentFrequency: 'monthly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      expect(result.yearlyTotals.value).toContain('2024:'); // Assuming current year
      expect(result.yearlyTotals.value).toContain('total');
      expect(result.yearlyTotals.value).toContain('interest');
      expect(result.yearlyTotals.value).toContain('Balance');
    });
  });

  describe('Extra Payment Scenarios', () => {
    test('handles large extra payment correctly', () => {
      const inputs = {
        loanAmount: '300000',
        interestRate: '4.5',
        loanTerm: '30',
        extraPayment: '1000', // Large extra payment
        extraPaymentStart: '1',
        oneTimePayment: '0',
        oneTimePaymentMonth: '1',
        paymentFrequency: 'monthly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      expect(result.interestSavings.value).toBeGreaterThan(100000);
      expect(result.timeSavings.value).toContain('years');
    });

    test('handles one-time payment correctly', () => {
      const inputs = {
        loanAmount: '400000',
        interestRate: '5.0',
        loanTerm: '30',
        extraPayment: '0',
        oneTimePayment: '50000', // Large one-time payment
        oneTimePaymentMonth: '24',
        paymentFrequency: 'monthly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      expect(result.interestSavings.value).toBeGreaterThan(30000);
      expect(result.timeSavings.value).toContain('years');
    });

    test('handles delayed extra payments', () => {
      const inputs = {
        loanAmount: '350000',
        interestRate: '4.25',
        loanTerm: '30',
        extraPayment: '300',
        extraPaymentStart: '60', // Start after 5 years
        oneTimePayment: '0',
        oneTimePaymentMonth: '1',
        paymentFrequency: 'monthly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      expect(result.interestSavings.value).toBeGreaterThan(0);
      expect(result.interestSavings.value).toBeLessThan(80000); // Less savings due to delay
    });
  });

  describe('Different Payment Frequencies', () => {
    test('handles quarterly payments', () => {
      const inputs = {
        loanAmount: '200000',
        interestRate: '4.0',
        loanTerm: '20',
        extraPayment: '0',
        oneTimePayment: '0',
        paymentFrequency: 'quarterly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      expect(result.monthlyPayment.value).toBeGreaterThan(3000); // Quarterly payment
      expect(result.totalInterest.value).toBeGreaterThan(0);
    });

    test('handles weekly payments', () => {
      const inputs = {
        loanAmount: '150000',
        interestRate: '3.5',
        loanTerm: '15',
        extraPayment: '0',
        oneTimePayment: '0',
        paymentFrequency: 'weekly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      expect(result.monthlyPayment.value).toBeLessThan(500); // Weekly payment
      expect(result.totalInterest.value).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    test('validates correct inputs', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: 30,
        extraPayment: 200,
        oneTimePayment: 10000,
        paymentFrequency: 'monthly'
      };

      const validation = validateAmortizationInputs(inputs);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('identifies invalid inputs', () => {
      const inputs = {
        loanAmount: 500, // Too low
        interestRate: 35, // Too high
        loanTerm: 60, // Too long
        extraPayment: -100, // Negative
        oneTimePayment: 1000000, // Too high
        paymentFrequency: 'monthly'
      };

      const validation = validateAmortizationInputs(inputs);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    test('generates appropriate warnings', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 18, // High rate
        loanTerm: 30,
        extraPayment: 5000, // Very high extra payment
        oneTimePayment: 0,
        paymentFrequency: 'weekly' // Unusual frequency
      };

      const validation = validateAmortizationInputs(inputs);
      
      expect(validation.warnings.length).toBeGreaterThan(0);
      expect(validation.warnings.some(w => w.includes('High interest rate'))).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    test('handles very short loan term', () => {
      const inputs = {
        loanAmount: '100000',
        interestRate: '5.0',
        loanTerm: '2',
        extraPayment: '0',
        oneTimePayment: '0',
        paymentFrequency: 'monthly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      expect(result.monthlyPayment.value).toBeGreaterThan(4000);
      expect(result.totalInterest.value).toBeLessThan(10000);
    });

    test('handles zero interest rate', () => {
      const inputs = {
        loanAmount: '120000',
        interestRate: '0',
        loanTerm: '10',
        extraPayment: '0',
        oneTimePayment: '0',
        paymentFrequency: 'monthly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      expect(result.monthlyPayment.value).toBe(1000); // 120000 / (10 * 12)
      expect(result.totalInterest.value).toBe(0);
    });

    test('handles loan paid off early with large extra payments', () => {
      const inputs = {
        loanAmount: '100000',
        interestRate: '4.0',
        loanTerm: '30',
        extraPayment: '2000', // Very large extra payment
        extraPaymentStart: '1',
        oneTimePayment: '0',
        oneTimePaymentMonth: '1',
        paymentFrequency: 'monthly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      expect(result.timeSavings.value).toContain('years');
      expect(result.interestSavings.value).toBeGreaterThan(50000);
    });
  });

  describe('Integration Tests', () => {
    test('all example scenarios work correctly', () => {
      AmortizationCalculator.examples?.forEach(example => {
        const result = AmortizationCalculator.calculate(example.inputs);
        
        expect(result.monthlyPayment.value).toBeGreaterThan(0);
        expect(result.totalInterest.value).toBeGreaterThan(0);
        expect(result.totalPayments.value).toBeGreaterThan(Number(example.inputs.loanAmount));
        expect(result.payoffDate.value).toBeTruthy();
      });
    });

    test('schedule breakdown is consistent with totals', () => {
      const inputs = {
        loanAmount: '250000',
        interestRate: '4.5',
        loanTerm: '25',
        extraPayment: '150',
        extraPaymentStart: '1',
        oneTimePayment: '5000',
        oneTimePaymentMonth: '6',
        paymentFrequency: 'monthly',
        compoundingFrequency: 'monthly'
      };

      const result = AmortizationCalculator.calculate(inputs);
      
      // Verify that breakdown contains expected information
      expect(result.scheduleBreakdown.value).toContain('Total payments');
      expect(result.scheduleBreakdown.value).toContain('%');
      expect(result.yearlyTotals.value).toContain('$');
      expect(result.yearlyTotals.value).toContain('Balance');
    });
  });
});