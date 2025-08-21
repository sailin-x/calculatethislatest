import { describe, it, expect } from 'vitest';
import { calculateReverseMortgage } from './formulas';
import { validateReverseMortgageInputs } from './validation';
import { ReverseMortgageCalculator } from './ReverseMortgageCalculator';

describe('ReverseMortgageCalculator', () => {
  describe('Basic Functionality', () => {
    it('should calculate basic reverse mortgage', () => {
      const inputs = {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        paymentType: 'line-of-credit',
        existingMortgage: 100000
      };

      const result = calculateReverseMortgage(inputs);

      expect(result.principalLimit).toBeGreaterThan(0);
      expect(result.availableEquity).toBe(400000); // 500000 - 100000
      expect(result.initialDraw).toBe(0);
      expect(result.lineOfCredit).toBeGreaterThan(0);
      expect(result.totalLoanBalance).toBeGreaterThan(0);
      expect(result.remainingEquity).toBeGreaterThan(0);
      expect(result.loanToValueRatio).toBeGreaterThan(0);
      expect(result.eligibilityScore).toBeGreaterThan(0);
      expect(result.suitabilityScore).toBeGreaterThan(0);
    });

    it('should handle minimum required inputs', () => {
      const inputs = {
        homeValue: 300000,
        borrowerAge: 65
      };

      const result = calculateReverseMortgage(inputs);

      expect(result.principalLimit).toBeGreaterThan(0);
      expect(result.availableEquity).toBe(300000);
      expect(result.eligibilityScore).toBe(100);
      expect(result.recommendation).toBeDefined();
    });

    it('should calculate different payment types correctly', () => {
      const baseInputs = {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        existingMortgage: 0
      };

      const lineOfCreditResult = calculateReverseMortgage({ ...baseInputs, paymentType: 'line-of-credit' });
      const lumpSumResult = calculateReverseMortgage({ ...baseInputs, paymentType: 'lump-sum', lumpSumAmount: 100000 });
      const monthlyResult = calculateReverseMortgage({ ...baseInputs, paymentType: 'monthly-payment', monthlyPayment: 2000 });

      expect(lineOfCreditResult.lineOfCredit).toBeGreaterThan(0);
      expect(lumpSumResult.initialDraw).toBe(100000);
      expect(monthlyResult.monthlyPaymentAmount).toBeGreaterThan(0);
    });
  });

  describe('Principal Limit Calculations', () => {
    it('should calculate principal limit based on age', () => {
      const baseInputs = {
        homeValue: 500000,
        interestRate: 6.5,
        paymentType: 'line-of-credit',
        existingMortgage: 0
      };

      const age65Result = calculateReverseMortgage({ ...baseInputs, borrowerAge: 65 });
      const age75Result = calculateReverseMortgage({ ...baseInputs, borrowerAge: 75 });
      const age85Result = calculateReverseMortgage({ ...baseInputs, borrowerAge: 85 });

      expect(age75Result.principalLimit).toBeGreaterThan(age65Result.principalLimit);
      expect(age85Result.principalLimit).toBeGreaterThan(age75Result.principalLimit);
    });

    it('should apply property type factors correctly', () => {
      const baseInputs = {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        paymentType: 'line-of-credit',
        existingMortgage: 0
      };

      const singleFamilyResult = calculateReverseMortgage({ ...baseInputs, propertyType: 'single-family' });
      const condoResult = calculateReverseMortgage({ ...baseInputs, propertyType: 'condo' });
      const manufacturedResult = calculateReverseMortgage({ ...baseInputs, propertyType: 'manufactured' });

      expect(singleFamilyResult.principalLimit).toBeGreaterThan(condoResult.principalLimit);
      expect(condoResult.principalLimit).toBeGreaterThan(manufacturedResult.principalLimit);
    });

    it('should handle co-borrower age correctly', () => {
      const inputs = {
        homeValue: 500000,
        borrowerAge: 75,
        coBorrowerAge: 65,
        interestRate: 6.5,
        paymentType: 'line-of-credit'
      };

      const result = calculateReverseMortgage(inputs);

      // Should use the younger co-borrower age (65) for calculations
      expect(result.principalLimit).toBeGreaterThan(0);
    });
  });

  describe('Payment Calculations', () => {
    it('should calculate lump sum payments correctly', () => {
      const inputs = {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        paymentType: 'lump-sum',
        lumpSumAmount: 150000,
        existingMortgage: 0
      };

      const result = calculateReverseMortgage(inputs);

      expect(result.initialDraw).toBe(150000);
      expect(result.totalLoanBalance).toBeGreaterThan(150000); // Should include interest
    });

    it('should calculate monthly payments correctly', () => {
      const inputs = {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        paymentType: 'monthly-payment',
        monthlyPayment: 2500,
        loanTerm: 10,
        existingMortgage: 0
      };

      const result = calculateReverseMortgage(inputs);

      expect(result.monthlyPaymentAmount).toBeGreaterThan(0);
      expect(result.monthlyPaymentAmount).toBeLessThanOrEqual(2500);
      expect(result.totalLoanBalance).toBeGreaterThan(result.monthlyPaymentAmount * 12 * 10);
    });

    it('should calculate tenure payments correctly', () => {
      const inputs = {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        paymentType: 'tenure-payment',
        monthlyPayment: 2000,
        lifeExpectancy: 85,
        existingMortgage: 0
      };

      const result = calculateReverseMortgage(inputs);

      expect(result.monthlyPaymentAmount).toBeGreaterThan(0);
      expect(result.monthlyPaymentAmount).toBeLessThanOrEqual(2000);
    });
  });

  describe('Loan Balance and Equity', () => {
    it('should calculate total loan balance over time', () => {
      const inputs = {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        paymentType: 'lump-sum',
        lumpSumAmount: 100000,
        loanTerm: 5,
        existingMortgage: 0
      };

      const result = calculateReverseMortgage(inputs);

      expect(result.totalLoanBalance).toBeGreaterThan(100000);
      expect(result.totalInterest).toBeGreaterThan(0);
      expect(result.remainingEquity).toBeGreaterThan(0);
    });

    it('should calculate remaining equity correctly', () => {
      const inputs = {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        paymentType: 'line-of-credit',
        homeAppreciationRate: 3.0,
        loanTerm: 10,
        existingMortgage: 0
      };

      const result = calculateReverseMortgage(inputs);

      const futureHomeValue = 500000 * Math.pow(1.03, 10);
      expect(result.remainingEquity).toBeLessThan(futureHomeValue);
      expect(result.remainingEquity).toBeGreaterThan(0);
    });

    it('should handle negative equity scenarios', () => {
      const inputs = {
        homeValue: 300000,
        borrowerAge: 85,
        interestRate: 8.0,
        paymentType: 'lump-sum',
        lumpSumAmount: 200000,
        homeAppreciationRate: 1.0,
        loanTerm: 15,
        existingMortgage: 0
      };

      const result = calculateReverseMortgage(inputs);

      // Should handle negative equity gracefully
      expect(result.remainingEquity).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Eligibility and Suitability', () => {
    it('should calculate eligibility score correctly', () => {
      const validInputs = {
        homeValue: 500000,
        borrowerAge: 70,
        occupancyType: 'primary-residence',
        creditScore: 750,
        otherDebts: 50000
      };

      const invalidInputs = {
        homeValue: 50000, // Too low
        borrowerAge: 60, // Too young
        occupancyType: 'investment', // Not eligible
        creditScore: 500, // Low credit
        otherDebts: 300000 // High debt
      };

      const validResult = calculateReverseMortgage(validInputs);
      const invalidResult = calculateReverseMortgage(invalidInputs);

      expect(validResult.eligibilityScore).toBeGreaterThan(invalidResult.eligibilityScore);
    });

    it('should calculate suitability score correctly', () => {
      const suitableInputs = {
        homeValue: 500000,
        borrowerAge: 70,
        income: 2000,
        expenses: 3000,
        otherAssets: 25000,
        healthStatus: 'good',
        loanPurpose: 'supplement-income'
      };

      const lessSuitableInputs = {
        homeValue: 500000,
        borrowerAge: 70,
        income: 5000,
        expenses: 2000,
        otherAssets: 200000,
        healthStatus: 'poor',
        loanPurpose: 'travel'
      };

      const suitableResult = calculateReverseMortgage(suitableInputs);
      const lessSuitableResult = calculateReverseMortgage(lessSuitableInputs);

      expect(suitableResult.suitabilityScore).toBeGreaterThan(lessSuitableResult.suitabilityScore);
    });
  });

  describe('Cost Analysis', () => {
    it('should calculate total costs correctly', () => {
      const inputs = {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        paymentType: 'lump-sum',
        lumpSumAmount: 100000,
        closingCosts: 8000,
        servicingFees: 35,
        mortgageInsurance: 0.5,
        loanTerm: 5,
        existingMortgage: 0
      };

      const result = calculateReverseMortgage(inputs);

      expect(result.totalCosts).toBeGreaterThan(8000); // Should include closing costs
      expect(result.totalCosts).toBeGreaterThan(result.totalInterest);
      expect(result.breakEvenYears).toBeGreaterThan(0);
    });

    it('should calculate break-even analysis correctly', () => {
      const inputs = {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        paymentType: 'monthly-payment',
        monthlyPayment: 2000,
        loanTerm: 10,
        existingMortgage: 0
      };

      const result = calculateReverseMortgage(inputs);

      expect(result.breakEvenYears).toBeGreaterThan(0);
      expect(result.breakEvenYears).toBeLessThanOrEqual(10);
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const emptyInputs = {};
      const errors = validateReverseMortgageInputs(emptyInputs);

      expect(errors).toContain('Home value is required');
      expect(errors).toContain('Borrower age is required');
    });

    it('should validate age requirements', () => {
      const invalidInputs = {
        homeValue: 500000,
        borrowerAge: 60, // Too young
        coBorrowerAge: 55 // Too young
      };

      const errors = validateReverseMortgageInputs(invalidInputs);

      expect(errors).toContain('Borrower must be at least 62 years old');
    });

    it('should validate home value requirements', () => {
      const invalidInputs = {
        homeValue: 50000, // Too low
        borrowerAge: 70
      };

      const errors = validateReverseMortgageInputs(invalidInputs);

      expect(errors).toContain('Home value must be at least $100,000');
      expect(errors).toContain('Home value must be at least $100,000 for reverse mortgage eligibility');
    });

    it('should validate occupancy requirements', () => {
      const invalidInputs = {
        homeValue: 500000,
        borrowerAge: 70,
        occupancyType: 'investment'
      };

      const errors = validateReverseMortgageInputs(invalidInputs);

      expect(errors).toContain('Investment properties are not eligible for reverse mortgages');
    });

    it('should validate payment type requirements', () => {
      const invalidInputs = {
        homeValue: 500000,
        borrowerAge: 70,
        paymentType: 'invalid-type'
      };

      const errors = validateReverseMortgageInputs(invalidInputs);

      expect(errors).toContain('Invalid payment type selected');
    });

    it('should validate business logic rules', () => {
      const invalidInputs = {
        homeValue: 500000,
        borrowerAge: 70,
        existingMortgage: 450000, // More than 80% of home value
        lumpSumAmount: 400000, // More than 60% of home value
        income: 1000,
        expenses: 3000 // Income less than 50% of expenses
      };

      const errors = validateReverseMortgageInputs(invalidInputs);

      expect(errors).toContain('Existing mortgage should not exceed 80% of home value');
      expect(errors).toContain('Lump sum amount should not exceed 60% of home value');
      expect(errors).toContain('Income appears insufficient to maintain property and living expenses');
    });

    it('should pass validation with valid inputs', () => {
      const validInputs = {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        paymentType: 'line-of-credit',
        occupancyType: 'primary-residence'
      };

      const errors = validateReverseMortgageInputs(validInputs);

      expect(errors).toHaveLength(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum values', () => {
      const maxInputs = {
        homeValue: 10000000,
        borrowerAge: 100,
        interestRate: 15,
        paymentType: 'lump-sum',
        lumpSumAmount: 1000000,
        loanTerm: 30,
        closingCosts: 50000,
        servicingFees: 1000,
        mortgageInsurance: 5,
        propertyTaxRate: 10,
        homeInsuranceRate: 5,
        maintenanceRate: 10,
        hoaFees: 5000
      };

      const result = calculateReverseMortgage(maxInputs);

      expect(result.principalLimit).toBeGreaterThan(0);
      expect(result.totalLoanBalance).toBeGreaterThan(0);
    });

    it('should handle minimum values', () => {
      const minInputs = {
        homeValue: 100000,
        borrowerAge: 62,
        interestRate: 0.1,
        paymentType: 'line-of-credit',
        loanTerm: 1,
        closingCosts: 0,
        servicingFees: 0,
        mortgageInsurance: 0,
        propertyTaxRate: 0,
        homeInsuranceRate: 0,
        maintenanceRate: 0,
        hoaFees: 0
      };

      const result = calculateReverseMortgage(minInputs);

      expect(result.principalLimit).toBeGreaterThan(0);
      expect(result.availableEquity).toBe(100000);
    });

    it('should handle zero existing mortgage', () => {
      const inputs = {
        homeValue: 500000,
        borrowerAge: 70,
        existingMortgage: 0,
        paymentType: 'line-of-credit'
      };

      const result = calculateReverseMortgage(inputs);

      expect(result.availableEquity).toBe(500000);
      expect(result.debtElimination).toBe(0);
    });

    it('should handle high existing mortgage', () => {
      const inputs = {
        homeValue: 500000,
        borrowerAge: 70,
        existingMortgage: 400000,
        paymentType: 'line-of-credit'
      };

      const result = calculateReverseMortgage(inputs);

      expect(result.availableEquity).toBe(100000);
      expect(result.principalLimit).toBeLessThan(result.availableEquity);
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct calculator metadata', () => {
      expect(ReverseMortgageCalculator.id).toBe('reverse-mortgage-calculator');
      expect(ReverseMortgageCalculator.name).toBe('Reverse Mortgage Calculator');
      expect(ReverseMortgageCalculator.category).toBe('finance');
      expect(ReverseMortgageCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = ReverseMortgageCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(2);
      expect(requiredInputs.some(input => input.id === 'homeValue')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'borrowerAge')).toBe(true);
    });

    it('should have comprehensive outputs', () => {
      const outputIds = ReverseMortgageCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('principalLimit');
      expect(outputIds).toContain('availableEquity');
      expect(outputIds).toContain('totalLoanBalance');
      expect(outputIds).toContain('remainingEquity');
      expect(outputIds).toContain('recommendation');
      expect(outputIds).toContain('eligibilityScore');
      expect(outputIds).toContain('suitabilityScore');
    });

    it('should have examples', () => {
      expect(ReverseMortgageCalculator.examples).toHaveLength(3);
      expect(ReverseMortgageCalculator.examples[0].name).toBe('Basic Reverse Mortgage');
      expect(ReverseMortgageCalculator.examples[1].name).toBe('Monthly Payment Option');
      expect(ReverseMortgageCalculator.examples[2].name).toBe('Lump Sum Payment');
    });

    it('should have formulas', () => {
      expect(ReverseMortgageCalculator.formulas).toHaveLength(6);
      expect(ReverseMortgageCalculator.formulas[0].name).toBe('Principal Limit Factor');
      expect(ReverseMortgageCalculator.formulas[1].name).toBe('Principal Limit');
    });
  });

  describe('Integration Tests', () => {
    it('should calculate and validate together', () => {
      const inputs = {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        paymentType: 'line-of-credit',
        occupancyType: 'primary-residence'
      };

      // Should pass validation
      const validationErrors = validateReverseMortgageInputs(inputs);
      expect(validationErrors).toHaveLength(0);

      // Should calculate successfully
      const result = calculateReverseMortgage(inputs);
      expect(result.principalLimit).toBeGreaterThan(0);
      expect(result.eligibilityScore).toBeGreaterThan(0);
    });

    it('should handle calculator interface methods', () => {
      const inputs = {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        paymentType: 'line-of-credit'
      };

      const outputs = ReverseMortgageCalculator.calculate(inputs);
      expect(outputs.principalLimit).toBeGreaterThan(0);

      const report = ReverseMortgageCalculator.generateReport(inputs, outputs);
      expect(report).toContain('Reverse Mortgage Analysis Report');
    });
  });
});