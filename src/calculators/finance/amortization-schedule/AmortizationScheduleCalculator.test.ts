import { AmortizationScheduleCalculator } from './AmortizationScheduleCalculator';
import {
  calculateMonthlyPayment,
  generateAmortizationSchedule,
  calculateAmortizationMetrics
} from './formulas';
import { validateAmortizationScheduleInputs } from './validation';

describe('AmortizationScheduleCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(AmortizationScheduleCalculator.id).toBe('amortization-schedule-calculator');
      expect(AmortizationScheduleCalculator.title).toBe('Amortization Schedule Calculator');
      expect(AmortizationScheduleCalculator.category).toBe('finance');
      expect(AmortizationScheduleCalculator.subcategory).toBe('Loan Analysis');
    });

    it('should have required inputs', () => {
      const requiredInputs = AmortizationScheduleCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(3);
      expect(requiredInputs.map(i => i.id)).toEqual(['loanAmount', 'annualInterestRate', 'loanTermYears']);
    });

    it('should have correct outputs', () => {
      expect(AmortizationScheduleCalculator.outputs).toHaveLength(5);
      expect(AmortizationScheduleCalculator.outputs.map(o => o.id)).toEqual([
        'monthlyPayment',
        'totalPayments',
        'totalInterest',
        'numberOfPayments',
        'loanPayoffDate'
      ]);
    });
  });

  describe('Formulas', () => {
    describe('calculateMonthlyPayment', () => {
      it('should calculate monthly payment correctly', () => {
        const result = calculateMonthlyPayment(100000, 6, 30);
        expect(result).toBeCloseTo(600.00, 2);
      });

      it('should handle zero interest rate', () => {
        const result = calculateMonthlyPayment(100000, 0, 30);
        expect(result).toBeCloseTo(277.78, 2); // 100000 / (30 * 12)
      });
    });

    describe('generateAmortizationSchedule', () => {
      it('should generate correct schedule', () => {
        const inputs = {
          loanAmount: 100000,
          annualInterestRate: 6,
          loanTermYears: 1,
          startDate: '2024-01-01',
          extraPayment: 0
        };
        const schedule = generateAmortizationSchedule(inputs);
        expect(schedule).toHaveLength(12);
        expect(schedule[0].beginningBalance).toBe(100000);
        expect(schedule[11].endingBalance).toBeCloseTo(0, 2);
      });

      it('should handle extra payments', () => {
        const inputs = {
          loanAmount: 100000,
          annualInterestRate: 6,
          loanTermYears: 1,
          startDate: '2024-01-01',
          extraPayment: 100
        };
        const schedule = generateAmortizationSchedule(inputs);
        expect(schedule.length).toBeLessThan(12); // Should pay off early
      });
    });

    describe('calculateAmortizationMetrics', () => {
      it('should calculate metrics correctly', () => {
        const mockSchedule = [
          {
            period: 1,
            paymentDate: '2024-01-01',
            beginningBalance: 100000,
            scheduledPayment: 600,
            extraPayment: 0,
            totalPayment: 600,
            principalPayment: 500,
            interestPayment: 100,
            endingBalance: 99500,
            cumulativeInterest: 100,
            cumulativePrincipal: 500
          }
        ];
        const metrics = calculateAmortizationMetrics(mockSchedule, {} as any);
        expect(metrics.totalPayments).toBe(600);
        expect(metrics.totalInterest).toBe(100);
        expect(metrics.numberOfPayments).toBe(1);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs = {
        loanAmount: 100000,
        annualInterestRate: 6,
        loanTermYears: 30,
        startDate: '2024-01-01',
        extraPayment: 100
      };
      const errors = validateAmortizationScheduleInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should reject negative loan amount', () => {
      const inputs = {
        loanAmount: -1000,
        annualInterestRate: 6,
        loanTermYears: 30
      };
      const errors = validateAmortizationScheduleInputs(inputs);
      expect(errors).toContainEqual({
        field: 'loanAmount',
        message: 'Loan amount must be greater than 0'
      });
    });

    it('should reject invalid loan term', () => {
      const inputs = {
        loanAmount: 100000,
        annualInterestRate: 6,
        loanTermYears: 0
      };
      const errors = validateAmortizationScheduleInputs(inputs);
      expect(errors).toContainEqual({
        field: 'loanTermYears',
        message: 'Loan term must be greater than 0 years'
      });
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(AmortizationScheduleCalculator.examples).toHaveLength(2);

      const mortgage = AmortizationScheduleCalculator.examples[0];
      expect(mortgage.title).toBe('30-Year Mortgage');
      expect(mortgage.inputs.loanAmount).toBe(300000);
      expect(mortgage.inputs.annualInterestRate).toBe(4);
      expect(mortgage.inputs.loanTermYears).toBe(30);
    });
  });
});