import { describe, it, expect } from 'vitest';
import { calculateMortgageRefinance, calculateRefinanceScenarios, analyzeRefinanceTiming } from './formulas';
import { validateMortgageRefinanceInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';
import { mortgageRefinanceCalculator } from './MortgageRefinanceCalculator';

describe('Mortgage Refinance Calculator', () => {
  describe('calculateMortgageRefinance', () => {
    it('should calculate refinance analysis for rate reduction', () => {
      const inputs = {
        currentLoanAmount: 250000,
        currentInterestRate: 5.5,
        currentLoanTerm: '30',
        remainingYears: 25,
        newLoanAmount: 250000,
        newInterestRate: 4.0,
        newLoanTerm: '30',
        closingCosts: 5000,
        prepaymentPenalty: 0,
        propertyValue: 300000,
        refinancePurpose: 'lower_rate',
        cashOutAmount: 0,
        taxRate: 22,
        planToMove: 'never'
      };

      const result = calculateMortgageRefinance(inputs);

      expect(result.monthlySavings).toBeGreaterThan(0);
      expect(result.totalSavings).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.breakEvenYears).toBeGreaterThan(0);
      expect(result.totalCost).toBe(5000);
      expect(result.netBenefit).toBeGreaterThan(0);
      expect(result.recommendation).toBeTruthy();
      expect(result.analysis).toBeTruthy();
    });

    it('should calculate refinance analysis for cash-out', () => {
      const inputs = {
        currentLoanAmount: 200000,
        currentInterestRate: 4.5,
        currentLoanTerm: '30',
        remainingYears: 20,
        newLoanAmount: 250000,
        newInterestRate: 4.25,
        newLoanTerm: '30',
        closingCosts: 6000,
        prepaymentPenalty: 0,
        propertyValue: 350000,
        refinancePurpose: 'cash_out',
        cashOutAmount: 50000,
        taxRate: 24,
        planToMove: '5'
      };

      const result = calculateMortgageRefinance(inputs);

      expect(result.monthlySavings).toBeGreaterThanOrEqual(0);
      expect(result.totalSavings).toBeGreaterThanOrEqual(0); // May be 0 for cash-out refinances
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.totalCost).toBe(6000);
      expect(result.recommendation).toBeTruthy();
    });

    it('should handle term reduction refinance', () => {
      const inputs = {
        currentLoanAmount: 300000,
        currentInterestRate: 4.5,
        currentLoanTerm: '30',
        remainingYears: 28,
        newLoanAmount: 300000,
        newInterestRate: 4.0,
        newLoanTerm: '15',
        closingCosts: 4000,
        prepaymentPenalty: 0,
        propertyValue: 350000,
        refinancePurpose: 'shorter_term',
        cashOutAmount: 0,
        taxRate: 22,
        planToMove: 'never'
      };

      const result = calculateMortgageRefinance(inputs);

      expect(result.monthlySavings).toBeLessThan(0); // Higher payment for shorter term
      expect(result.totalSavings).toBeGreaterThan(0);
      expect(result.recommendation).toBeTruthy();
    });

    it('should handle minimum required inputs', () => {
      const inputs = {
        currentLoanAmount: 200000,
        currentInterestRate: 5.0,
        currentLoanTerm: '30',
        remainingYears: 25,
        newLoanAmount: 200000,
        newInterestRate: 4.5,
        newLoanTerm: '30',
        closingCosts: 3000,
        refinancePurpose: 'lower_rate'
      };

      const result = calculateMortgageRefinance(inputs);

      expect(result.monthlySavings).toBeGreaterThan(0);
      expect(result.totalSavings).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.totalCost).toBe(3000);
    });
  });

  describe('calculateRefinanceScenarios', () => {
    it('should calculate different refinance scenarios', () => {
      const inputs = {
        currentLoanAmount: 250000,
        currentInterestRate: 5.5,
        currentLoanTerm: '30',
        remainingYears: 25,
        newLoanAmount: 250000,
        newInterestRate: 4.0,
        newLoanTerm: '30',
        closingCosts: 5000,
        refinancePurpose: 'lower_rate'
      };

      const scenarios = calculateRefinanceScenarios(inputs);

      expect(scenarios).toHaveLength(2);
      expect(scenarios[0].scenario).toBe('Keep Current Loan');
      expect(scenarios[1].scenario).toBe('Refinance');
      
      scenarios.forEach(scenario => {
        expect(scenario.monthlyPayment).toBeGreaterThan(0);
        expect(scenario.totalInterest).toBeGreaterThan(0);
        expect(scenario.totalCost).toBeGreaterThanOrEqual(0);
        expect(scenario.breakEvenMonths).toBeGreaterThanOrEqual(0);
        expect(scenario.recommendation).toBeTruthy();
      });
    });
  });

  describe('analyzeRefinanceTiming', () => {
    it('should analyze refinance timing', () => {
      const result = analyzeRefinanceTiming(5.5, 4.0, 250000, 5000, 'never');

      expect(result.optimalTiming).toBeTruthy();
      expect(result.rateThreshold).toBeGreaterThan(0);
      expect(result.analysis).toBeTruthy();
    });

    it('should recommend waiting for better rates', () => {
      const result = analyzeRefinanceTiming(4.5, 4.4, 250000, 5000, '5');

      expect(result.optimalTiming).toBe('Wait for better rates');
    });
  });

  describe('validateMortgageRefinanceInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        currentLoanAmount: 250000,
        currentInterestRate: 5.5,
        currentLoanTerm: '30',
        remainingYears: 25,
        newLoanAmount: 250000,
        newInterestRate: 4.0,
        newLoanTerm: '30',
        closingCosts: 5000,
        refinancePurpose: 'lower_rate'
      };

      const errors = validateMortgageRefinanceInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
      const inputs = {
        currentLoanAmount: 250000,
        currentInterestRate: 5.5,
        currentLoanTerm: '30',
        remainingYears: 25,
        newLoanAmount: 250000,
        newInterestRate: 4.0,
        newLoanTerm: '30',
        closingCosts: 5000
        // Missing refinancePurpose
      };

      const errors = validateMortgageRefinanceInputs(inputs as any);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'refinancePurpose')).toBe(true);
    });

    it('should detect invalid loan amounts', () => {
      const inputs = {
        currentLoanAmount: -1000, // Invalid
        currentInterestRate: 5.5,
        currentLoanTerm: '30',
        remainingYears: 25,
        newLoanAmount: 250000,
        newInterestRate: 4.0,
        newLoanTerm: '30',
        closingCosts: 5000,
        refinancePurpose: 'lower_rate'
      };

      const errors = validateMortgageRefinanceInputs(inputs);
      expect(errors.some(e => e.field === 'currentLoanAmount')).toBe(true);
    });

    it('should detect invalid interest rates', () => {
      const inputs = {
        currentLoanAmount: 250000,
        currentInterestRate: 25, // Too high
        currentLoanTerm: '30',
        remainingYears: 25,
        newLoanAmount: 250000,
        newInterestRate: 4.0,
        newLoanTerm: '30',
        closingCosts: 5000,
        refinancePurpose: 'lower_rate'
      };

      const errors = validateMortgageRefinanceInputs(inputs);
      expect(errors.some(e => e.field === 'currentInterestRate')).toBe(true);
    });

    it('should detect invalid loan terms', () => {
      const inputs = {
        currentLoanAmount: 250000,
        currentInterestRate: 5.5,
        currentLoanTerm: '25', // Invalid term
        remainingYears: 25,
        newLoanAmount: 250000,
        newInterestRate: 4.0,
        newLoanTerm: '30',
        closingCosts: 5000,
        refinancePurpose: 'lower_rate'
      };

      const errors = validateMortgageRefinanceInputs(inputs);
      expect(errors.some(e => e.field === 'currentLoanTerm')).toBe(true);
    });

    it('should detect business logic violations', () => {
      const inputs = {
        currentLoanAmount: 250000,
        currentInterestRate: 5.5,
        currentLoanTerm: '30',
        remainingYears: 35, // More than loan term
        newLoanAmount: 250000,
        newInterestRate: 4.0,
        newLoanTerm: '30',
        closingCosts: 5000,
        refinancePurpose: 'lower_rate'
      };

      const errors = validateMortgageRefinanceInputs(inputs);
      expect(errors.some(e => e.field === 'remainingYears')).toBe(true);
    });

    it('should validate cash-out refinance logic', () => {
      const inputs = {
        currentLoanAmount: 200000,
        currentInterestRate: 4.5,
        currentLoanTerm: '30',
        remainingYears: 20,
        newLoanAmount: 250000,
        newInterestRate: 4.25,
        newLoanTerm: '30',
        closingCosts: 6000,
        refinancePurpose: 'cash_out',
        cashOutAmount: 60000 // More than difference
      };

      const errors = validateMortgageRefinanceInputs(inputs);
      expect(errors.some(e => e.field === 'cashOutAmount')).toBe(true);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs correctly', () => {
      const inputs = {
        currentLoanAmount: 250000,
        currentInterestRate: 5.5,
        currentLoanTerm: '30',
        remainingYears: 25,
        newLoanAmount: 250000,
        newInterestRate: 4.0,
        newLoanTerm: '30',
        closingCosts: 5000,
        refinancePurpose: 'lower_rate'
      };

      const results = quickValidateAllInputs(inputs);
      const errorResults = results.filter(r => !r.isValid && r.severity === 'error');
      expect(errorResults).toHaveLength(0);
    });

    it('should detect validation errors', () => {
      const inputs = {
        currentLoanAmount: -1000, // Invalid
        currentInterestRate: 5.5,
        currentLoanTerm: '30',
        remainingYears: 25,
        newLoanAmount: 250000,
        newInterestRate: 4.0,
        newLoanTerm: '30',
        closingCosts: 5000,
        refinancePurpose: 'lower_rate'
      };

      const results = quickValidateAllInputs(inputs);
      const errorResults = results.filter(r => !r.isValid && r.severity === 'error');
      expect(errorResults.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct calculator structure', () => {
      expect(mortgageRefinanceCalculator.id).toBe('mortgage-refinance');
      expect(mortgageRefinanceCalculator.title).toBe('Mortgage Refinance Calculator');
      expect(mortgageRefinanceCalculator.category).toBe('finance');
      expect(mortgageRefinanceCalculator.subcategory).toBe('mortgage');
    });

    it('should have required inputs', () => {
      const requiredInputs = mortgageRefinanceCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      
      const inputIds = requiredInputs.map(input => input.id);
      expect(inputIds).toContain('currentLoanAmount');
      expect(inputIds).toContain('currentInterestRate');
      expect(inputIds).toContain('currentLoanTerm');
      expect(inputIds).toContain('remainingYears');
      expect(inputIds).toContain('newLoanAmount');
      expect(inputIds).toContain('newInterestRate');
      expect(inputIds).toContain('newLoanTerm');
      expect(inputIds).toContain('closingCosts');
      expect(inputIds).toContain('refinancePurpose');
    });

    it('should have required outputs', () => {
      const outputIds = mortgageRefinanceCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('monthlySavings');
      expect(outputIds).toContain('totalSavings');
      expect(outputIds).toContain('breakEvenMonths');
      expect(outputIds).toContain('breakEvenYears');
      expect(outputIds).toContain('totalCost');
      expect(outputIds).toContain('netBenefit');
      expect(outputIds).toContain('recommendation');
      expect(outputIds).toContain('analysis');
    });

    it('should have formulas', () => {
      expect(mortgageRefinanceCalculator.formulas).toHaveLength(1);
      expect(mortgageRefinanceCalculator.formulas[0].id).toBe('mortgage-refinance-analysis');
    });

    it('should have validation rules', () => {
      expect(mortgageRefinanceCalculator.validationRules).toHaveLength(1);
      expect(mortgageRefinanceCalculator.validationRules[0].id).toBe('required-fields');
    });

    it('should have examples', () => {
      expect(mortgageRefinanceCalculator.examples).toHaveLength(3);
      expect(mortgageRefinanceCalculator.examples[0].title).toBe('Rate Reduction Refinance');
      expect(mortgageRefinanceCalculator.examples[1].title).toBe('Cash-Out Refinance');
      expect(mortgageRefinanceCalculator.examples[2].title).toBe('Short-Term Move Scenario');
    });

    it('should have quick validation function', () => {
      expect(typeof mortgageRefinanceCalculator.quickValidation).toBe('function');
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator examples', () => {
      mortgageRefinanceCalculator.examples.forEach(example => {
        const result = calculateMortgageRefinance(example.inputs);
        
        expect(result.monthlySavings).toBeGreaterThanOrEqual(0);
        expect(result.totalSavings).toBeGreaterThanOrEqual(0); // May be 0 for cash-out refinances
        expect(result.breakEvenMonths).toBeGreaterThan(0);
        expect(result.totalCost).toBeGreaterThanOrEqual(0);
        expect(result.recommendation).toBeTruthy();
        expect(result.analysis).toBeTruthy();
      });
    });

    it('should validate calculator examples', () => {
      mortgageRefinanceCalculator.examples.forEach(example => {
        const errors = validateMortgageRefinanceInputs(example.inputs);
        expect(errors).toHaveLength(0);
      });
    });

    it('should pass quick validation for calculator examples', () => {
      mortgageRefinanceCalculator.examples.forEach(example => {
        const results = quickValidateAllInputs(example.inputs);
        const errorResults = results.filter(r => !r.isValid && r.severity === 'error');
        expect(errorResults).toHaveLength(0);
      });
    });
  });
});