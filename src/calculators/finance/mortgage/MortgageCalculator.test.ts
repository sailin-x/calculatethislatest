import { describe, it, expect } from 'vitest';
import { MortgageFormulas } from './formulas';
import { mortgageCalculatorFormula } from './formulas';
import { getMortgageValidationRules } from './validation';

describe('MortgageCalculator', () => {
  describe('MortgageFormulas', () => {
    describe('calculateMonthlyPayment', () => {
      it('should calculate correct payment for standard 30-year mortgage', () => {
        const payment = MortgageFormulas.calculateMonthlyPayment(400000, 7.0, 30);
        expect(payment).toBeCloseTo(2661.21, 2);
      });

      it('should calculate correct payment for 15-year mortgage', () => {
        const payment = MortgageFormulas.calculateMonthlyPayment(400000, 7.0, 15);
        expect(payment).toBeCloseTo(3595.55, 2);
      });

      it('should handle zero interest rate', () => {
        const payment = MortgageFormulas.calculateMonthlyPayment(360000, 0, 30);
        expect(payment).toBeCloseTo(1000, 2);
      });

      it('should calculate payment for high interest rate', () => {
        const payment = MortgageFormulas.calculateMonthlyPayment(300000, 12.0, 30);
        expect(payment).toBeCloseTo(3085.67, 2);
      });
    });

    describe('calculatePMI', () => {
      it('should calculate conventional PMI correctly', () => {
        const pmi = MortgageFormulas.calculatePMI(380000, 400000, 'conventional');
        expect(pmi.monthlyPMI).toBeCloseTo(221.67, 2); // 0.7% annual rate
        expect(pmi.removesAt).toBe(0.78);
      });

      it('should calculate FHA MIP correctly', () => {
        const pmi = MortgageFormulas.calculatePMI(380000, 400000, 'fha');
        expect(pmi.monthlyPMI).toBeCloseTo(253.33, 2); // 0.8% annual rate
      });

      it('should return zero PMI for VA loans', () => {
        const pmi = MortgageFormulas.calculatePMI(400000, 400000, 'va');
        expect(pmi.monthlyPMI).toBe(0);
      });

      it('should return zero PMI when LTV <= 80%', () => {
        const pmi = MortgageFormulas.calculatePMI(320000, 400000, 'conventional');
        expect(pmi.monthlyPMI).toBe(0);
      });

      it('should use custom PMI rate when provided', () => {
        const pmi = MortgageFormulas.calculatePMI(380000, 400000, 'conventional', 1.0);
        expect(pmi.monthlyPMI).toBeCloseTo(316.67, 2);
      });
    });

    describe('calculateLTV', () => {
      it('should calculate LTV correctly', () => {
        const ltv = MortgageFormulas.calculateLTV(400000, 500000);
        expect(ltv).toBe(0.8);
      });

      it('should handle 100% financing', () => {
        const ltv = MortgageFormulas.calculateLTV(400000, 400000);
        expect(ltv).toBe(1.0);
      });
    });

    describe('calculateTotalMonthlyPayment', () => {
      it('should calculate complete PITI payment', () => {
        const inputs = {
          homePrice: 500000,
          downPayment: 100000,
          loanTerm: 30,
          interestRate: 7.0,
          loanType: 'conventional' as const,
          propertyTax: 8000,
          homeInsurance: 2000,
          hoaFees: 250
        };

        const payment = MortgageFormulas.calculateTotalMonthlyPayment(inputs);
        
        expect(payment.principalAndInterest).toBeCloseTo(2661.21, 2);
        expect(payment.propertyTax).toBeCloseTo(666.67, 2);
        expect(payment.homeInsurance).toBeCloseTo(166.67, 2);
        expect(payment.pmi).toBe(0); // 20% down, no PMI
        expect(payment.hoa).toBe(250);
        expect(payment.total).toBeCloseTo(3744.55, 2);
      });

      it('should include PMI for low down payment', () => {
        const inputs = {
          homePrice: 400000,
          downPayment: 20000, // 5% down
          loanTerm: 30,
          interestRate: 7.0,
          loanType: 'conventional' as const,
          propertyTax: 6000,
          homeInsurance: 1800
        };

        const payment = MortgageFormulas.calculateTotalMonthlyPayment(inputs);
        
        expect(payment.pmi).toBeGreaterThan(0);
        expect(payment.total).toBeGreaterThan(payment.principalAndInterest + payment.propertyTax + payment.homeInsurance);
      });
    });

    describe('generateAmortizationSchedule', () => {
      it('should generate correct amortization schedule', () => {
        const inputs = {
          homePrice: 400000,
          downPayment: 80000,
          loanTerm: 30,
          interestRate: 7.0,
          loanType: 'conventional' as const,
          propertyTax: 6000,
          homeInsurance: 1800
        };

        const schedule = MortgageFormulas.generateAmortizationSchedule(inputs);
        
        expect(schedule.length).toBe(360); // 30 years * 12 months
        expect(schedule[0].month).toBe(1);
        expect(schedule[0].balance).toBeLessThan(320000);
        expect(schedule[0].interest).toBeCloseTo(1866.67, 2); // First month interest
        expect(schedule[359].balance).toBeCloseTo(0, 2); // Final balance
      });

      it('should handle extra payments correctly', () => {
        const inputs = {
          homePrice: 400000,
          downPayment: 80000,
          loanTerm: 30,
          interestRate: 7.0,
          loanType: 'conventional' as const,
          propertyTax: 6000,
          homeInsurance: 1800,
          extraPayment: 200
        };

        const schedule = MortgageFormulas.generateAmortizationSchedule(inputs);
        const scheduleWithoutExtra = MortgageFormulas.generateAmortizationSchedule({
          ...inputs,
          extraPayment: 0
        });
        
        expect(schedule.length).toBeLessThan(scheduleWithoutExtra.length);
        expect(schedule[0].principal).toBeGreaterThan(scheduleWithoutExtra[0].principal);
      });

      it('should remove PMI when LTV reaches threshold', () => {
        const inputs = {
          homePrice: 400000,
          downPayment: 20000, // 5% down, 95% LTV
          loanTerm: 30,
          interestRate: 7.0,
          loanType: 'conventional' as const,
          propertyTax: 6000,
          homeInsurance: 1800
        };

        const schedule = MortgageFormulas.generateAmortizationSchedule(inputs);
        
        // Find when PMI is removed (when LTV drops to 78%)
        const pmiRemovalPoint = schedule.find(entry => entry.pmi === 0);
        expect(pmiRemovalPoint).toBeDefined();
        
        // PMI should be present in early payments
        expect(schedule[0].pmi).toBeGreaterThan(0);
      });
    });

    describe('calculateRefinanceBreakEven', () => {
      it('should calculate refinance break-even correctly', () => {
        const result = MortgageFormulas.calculateRefinanceBreakEven(
          350000, // current balance
          7.5,    // current rate
          6.0,    // new rate
          25,     // remaining term
          5000    // closing costs
        );

        expect(result.currentPayment).toBeGreaterThan(result.newPayment);
        expect(result.monthlySavings).toBeGreaterThan(0);
        expect(result.breakEvenMonths).toBeGreaterThan(0);
        expect(result.breakEvenMonths).toBeLessThan(60); // Should break even within 5 years
      });

      it('should handle cases where refinancing is not beneficial', () => {
        const result = MortgageFormulas.calculateRefinanceBreakEven(
          350000,
          6.0,    // current rate lower than new rate
          7.5,    // new rate
          25,
          5000
        );

        expect(result.monthlySavings).toBeLessThan(0);
        expect(result.breakEvenMonths).toBe(Infinity);
        expect(result.totalSavings).toBeLessThan(0);
      });
    });

    describe('calculateAffordability', () => {
      it('should calculate affordability correctly', () => {
        const result = MortgageFormulas.calculateAffordability(
          8000,  // monthly income
          1500,  // monthly debts
          0.43   // max DTI
        );

        expect(result.maxMonthlyPayment).toBe(1940); // 8000 * 0.43 - 1500
        expect(result.maxLoanAmount).toBeGreaterThan(0);
        expect(result.recommendedDownPayment).toBeGreaterThan(0);
      });

      it('should handle high debt scenarios', () => {
        const result = MortgageFormulas.calculateAffordability(
          5000,  // monthly income
          4000,  // high monthly debts
          0.43
        );

        expect(result.maxMonthlyPayment).toBe(150); // Very low available payment
        expect(result.maxLoanAmount).toBeGreaterThan(0);
      });
    });
  });

  describe('mortgageCalculatorFormula', () => {
    it('should calculate complete mortgage scenario', () => {
      const inputs = {
        homePrice: 500000,
        downPayment: 100000,
        loanTerm: 30,
        interestRate: 7.0,
        loanType: 'conventional',
        propertyTax: 8000,
        homeInsurance: 2000,
        hoaFees: 250
      };

      const result = mortgageCalculatorFormula.calculate(inputs);

      expect(result.outputs.loanAmount).toBe(400000);
      expect(result.outputs.monthlyPayment).toBeCloseTo(3744.55, 2);
      expect(result.outputs.principalAndInterest).toBeCloseTo(2661.21, 2);
      expect(result.outputs.loanToValue).toBe(80);
      expect(result.outputs.totalInterest).toBeGreaterThan(0);
      expect(result.explanation).toContain('Monthly payment');
      expect(result.intermediateSteps).toBeDefined();
    });

    it('should handle FHA loan with PMI', () => {
      const inputs = {
        homePrice: 350000,
        downPayment: 12250,
        loanTerm: 30,
        interestRate: 6.5,
        loanType: 'fha',
        propertyTax: 5250,
        homeInsurance: 1800
      };

      const result = mortgageCalculatorFormula.calculate(inputs);

      expect(result.outputs.loanAmount).toBe(337750);
      expect(result.outputs.pmi).toBeGreaterThan(0);
      expect(result.outputs.loanToValue).toBeCloseTo(96.5, 1);
    });

    it('should handle VA loan without PMI', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 0,
        loanTerm: 30,
        interestRate: 6.25,
        loanType: 'va',
        propertyTax: 6000,
        homeInsurance: 1600
      };

      const result = mortgageCalculatorFormula.calculate(inputs);

      expect(result.outputs.loanAmount).toBe(400000);
      expect(result.outputs.pmi).toBe(0);
      expect(result.outputs.loanToValue).toBe(100);
    });

    it('should throw error for invalid inputs', () => {
      const inputs = {
        homePrice: -100000, // Invalid negative price
        downPayment: 50000,
        loanTerm: 30,
        interestRate: 7.0,
        loanType: 'conventional',
        propertyTax: 8000,
        homeInsurance: 2000
      };

      expect(() => mortgageCalculatorFormula.calculate(inputs)).toThrow();
    });
  });

  describe('Validation Rules', () => {
    const validationRules = getMortgageValidationRules();

    it('should validate required fields', () => {
      const requiredFields = ['homePrice', 'downPayment', 'loanTerm', 'interestRate', 'loanType'];
      const requiredRules = validationRules.filter(rule => rule.type === 'required');
      
      expect(requiredRules.length).toBeGreaterThanOrEqual(requiredFields.length);
    });

    it('should validate home price range', () => {
      const homePriceRules = validationRules.filter(rule => rule.field === 'homePrice');
      expect(homePriceRules.length).toBeGreaterThan(0);
    });

    it('should validate LoanToValue ratios by loan type', () => {
      const ltvRules = validationRules.filter(rule => 
        rule.field === 'downPayment' && rule.type === 'business'
      );
      expect(ltvRules.length).toBeGreaterThan(0);
    });

    it('should validate interest rate reasonableness', () => {
      const rateRules = validationRules.filter(rule => rule.field === 'interestRate');
      expect(rateRules.length).toBeGreaterThan(0);
    });
  });

  describe('Industry Benchmark Validation', () => {
    it('should match Bankrate calculator results', () => {
      // Test against known Bankrate calculation
      const payment = MortgageFormulas.calculateMonthlyPayment(400000, 7.0, 30);
      expect(payment).toBeCloseTo(2661.21, 1); // Within $1 of Bankrate
    });

    it('should match Quicken Loans calculator results', () => {
      // Test against known Quicken calculation
      const inputs = {
        homePrice: 500000,
        downPayment: 100000,
        loanTerm: 30,
        interestRate: 6.75,
        loanType: 'conventional' as const,
        propertyTax: 7500,
        homeInsurance: 2000
      };

      const payment = MortgageFormulas.calculateTotalMonthlyPayment(inputs);
      expect(payment.principalAndInterest).toBeCloseTo(2594.73, 1);
    });

    it('should match FHA PMI calculations', () => {
      // Test against HUD FHA calculator
      const pmi = MortgageFormulas.calculatePMI(337750, 350000, 'fha');
      expect(pmi.pmiRate).toBe(0.8); // Current FHA MIP rate for >90% LTV
    });
  });
});