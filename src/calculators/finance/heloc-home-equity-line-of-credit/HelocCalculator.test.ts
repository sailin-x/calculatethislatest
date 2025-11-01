import { HelocCalculator } from './HelocCalculator';
import {
  calculateHomeEquity,
  calculateMaximumCreditLimit,
  calculateMonthlyPaymentDuringDraw,
  calculateMonthlyPaymentDuringRepayment,
  calculateTotalInterestPaid,
  calculateTotalPayments
} from './formulas';
import { validateHelocInputs } from './validation';

describe('HelocCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(HelocCalculator.id).toBe('heloc-calculator');
      expect(HelocCalculator.title).toBe('HELOC (Home Equity Line of Credit) Calculator');
      expect(HelocCalculator.category).toBe('finance');
      expect(HelocCalculator.subcategory).toBe('Home Equity');
    });

    it('should have required inputs', () => {
      const requiredInputs = HelocCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(6);
      expect(requiredInputs.map(i => i.id)).toEqual([
        'homeValue',
        'outstandingMortgageBalance',
        'creditLimitPercentage',
        'interestRate',
        'drawPeriodYears',
        'repaymentPeriodYears'
      ]);
    });

    it('should have correct outputs', () => {
      expect(HelocCalculator.outputs).toHaveLength(7);
      expect(HelocCalculator.outputs.map(o => o.id)).toEqual([
        'availableCredit',
        'maximumCreditLimit',
        'monthlyPaymentDuringDraw',
        'monthlyPaymentDuringRepayment',
        'totalInterestPaid',
        'totalPayments',
        'payoffDate'
      ]);
    });
  });

  describe('Formulas', () => {
    describe('calculateHomeEquity', () => {
      it('should calculate home equity correctly', () => {
        const result = calculateHomeEquity(400000, 200000);
        expect(result).toBe(200000);
      });

      it('should return 0 for negative equity', () => {
        const result = calculateHomeEquity(300000, 350000);
        expect(result).toBe(0);
      });
    });

    describe('calculateMaximumCreditLimit', () => {
      it('should calculate credit limit correctly', () => {
        const result = calculateMaximumCreditLimit(200000, 80);
        expect(result).toBe(160000);
      });
    });

    describe('calculateMonthlyPaymentDuringDraw', () => {
      it('should calculate interest-only payment correctly', () => {
        const result = calculateMonthlyPaymentDuringDraw(100000, 7.5);
        expect(result).toBeCloseTo(625, 0);
      });
    });

    describe('calculateMonthlyPaymentDuringRepayment', () => {
      it('should calculate amortizing payment correctly', () => {
        const result = calculateMonthlyPaymentDuringRepayment(100000, 7.5, 20);
        expect(result).toBeCloseTo(850, 0);
      });
    });

    describe('calculateTotalInterestPaid', () => {
      it('should calculate total interest correctly', () => {
        const result = calculateTotalInterestPaid(100000, 625, 850, 10, 20);
        expect(result).toBeGreaterThan(0);
      });
    });

    describe('calculateTotalPayments', () => {
      it('should calculate total payments correctly', () => {
        const result = calculateTotalPayments(625, 850, 10, 20);
        expect(result).toBeCloseTo(265000, 0);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs = {
        homeValue: 400000,
        outstandingMortgageBalance: 200000,
        creditLimitPercentage: 80,
        interestRate: 7.5,
        drawPeriodYears: 10,
        repaymentPeriodYears: 20
      };
      const errors = validateHelocInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should reject negative home value', () => {
      const inputs = {
        homeValue: -1000,
        outstandingMortgageBalance: 200000,
        creditLimitPercentage: 80,
        interestRate: 7.5,
        drawPeriodYears: 10,
        repaymentPeriodYears: 20
      };
      const errors = validateHelocInputs(inputs);
      expect(errors).toContainEqual({
        field: 'homeValue',
        message: 'Home value must be greater than 0'
      });
    });

    it('should reject mortgage balance exceeding home value', () => {
      const inputs = {
        homeValue: 300000,
        outstandingMortgageBalance: 350000,
        creditLimitPercentage: 80,
        interestRate: 7.5,
        drawPeriodYears: 10,
        repaymentPeriodYears: 20
      };
      const errors = validateHelocInputs(inputs);
      expect(errors).toContainEqual({
        field: 'outstandingMortgageBalance',
        message: 'Outstanding mortgage balance cannot exceed home value'
      });
    });

    it('should reject invalid credit limit percentage', () => {
      const inputs = {
        homeValue: 400000,
        outstandingMortgageBalance: 200000,
        creditLimitPercentage: 120,
        interestRate: 7.5,
        drawPeriodYears: 10,
        repaymentPeriodYears: 20
      };
      const errors = validateHelocInputs(inputs);
      expect(errors).toContainEqual({
        field: 'creditLimitPercentage',
        message: 'Credit limit percentage cannot exceed 100%'
      });
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(HelocCalculator.examples).toHaveLength(2);

      const standardHeloc = HelocCalculator.examples[0];
      expect(standardHeloc.title).toBe('Standard HELOC');
      expect(standardHeloc.inputs.homeValue).toBe(400000);
      expect(standardHeloc.inputs.outstandingMortgageBalance).toBe(200000);
      expect(standardHeloc.inputs.creditLimitPercentage).toBe(80);
    });
  });
});