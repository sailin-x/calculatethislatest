import { describe, it, expect } from 'vitest';
import { calculateMortgageVsRent, calculateYearlyComparison } from './formulas';
import { validateMortgageVsRentInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';
import { mortgageVsRentCalculator } from './MortgageVsRentCalculator';

describe('Mortgage vs. Rent Calculator', () => {
  describe('calculateMortgageVsRent', () => {
    it('should calculate standard comparison', () => {
      const inputs = {
        currentRent: 2000,
        rentIncreaseRate: 3.0,
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        pmiRate: 0.5,
        maintenanceCost: 2400,
        utilities: 150,
        utilitiesHome: 200,
        closingCosts: 8000,
        homeAppreciation: 3.0,
        investmentReturn: 7.0,
        analysisPeriod: 10,
        taxRate: 22,
        rentersInsurance: 20,
        hoaFees: 0
      };

      const result = calculateMortgageVsRent(inputs);

      expect(result.monthlyRentCost).toBeGreaterThan(0);
      expect(result.monthlyMortgageCost).toBeGreaterThan(0);
      expect(result.totalRentCost).toBeGreaterThan(0);
      expect(result.totalMortgageCost).toBeGreaterThan(0);
      expect(result.homeEquity).toBeGreaterThan(0);
      expect(result.opportunityCost).toBeGreaterThan(0);
      expect(result.netHomeCost).toBeGreaterThanOrEqual(0); // Can be negative if buying is cheaper
      expect(result.breakEvenYears).toBeGreaterThan(0);
      expect(result.recommendation).toBeTruthy();
      expect(result.analysis).toBeTruthy();
    });

    it('should calculate high-cost market scenario', () => {
      const inputs = {
        currentRent: 3500,
        rentIncreaseRate: 2.5,
        homePrice: 800000,
        downPayment: 160000,
        interestRate: 4.0,
        loanTerm: '30',
        propertyTaxRate: 1.5,
        homeownersInsurance: 2400,
        pmiRate: 0,
        maintenanceCost: 4800,
        utilities: 200,
        utilitiesHome: 300,
        closingCosts: 16000,
        homeAppreciation: 2.5,
        investmentReturn: 8.0,
        analysisPeriod: 15,
        taxRate: 32,
        rentersInsurance: 30,
        hoaFees: 200
      };

      const result = calculateMortgageVsRent(inputs);

      expect(result.monthlyRentCost).toBeGreaterThan(0);
      expect(result.monthlyMortgageCost).toBeGreaterThan(0);
      expect(result.totalRentCost).toBeGreaterThan(0);
      expect(result.totalMortgageCost).toBeGreaterThan(0);
      expect(result.homeEquity).toBeGreaterThan(0);
      expect(result.opportunityCost).toBeGreaterThan(0);
      expect(result.netHomeCost).toBeGreaterThanOrEqual(0); // Can be negative if buying is cheaper
      expect(result.breakEvenYears).toBeGreaterThan(0);
      expect(result.recommendation).toBeTruthy();
    });

    it('should calculate short-term analysis', () => {
      const inputs = {
        currentRent: 1800,
        rentIncreaseRate: 4.0,
        homePrice: 300000,
        downPayment: 60000,
        interestRate: 5.0,
        loanTerm: '30',
        propertyTaxRate: 1.0,
        homeownersInsurance: 900,
        pmiRate: 0.75,
        maintenanceCost: 1800,
        utilities: 120,
        utilitiesHome: 180,
        closingCosts: 6000,
        homeAppreciation: 2.0,
        investmentReturn: 6.0,
        analysisPeriod: 3,
        taxRate: 24,
        rentersInsurance: 15,
        hoaFees: 0
      };

      const result = calculateMortgageVsRent(inputs);

      expect(result.monthlyRentCost).toBeGreaterThan(0);
      expect(result.monthlyMortgageCost).toBeGreaterThan(0);
      expect(result.totalRentCost).toBeGreaterThan(0);
      expect(result.totalMortgageCost).toBeGreaterThan(0);
      expect(result.homeEquity).toBeGreaterThan(0);
      expect(result.opportunityCost).toBeGreaterThan(0);
      expect(result.netHomeCost).toBeDefined(); // Can be negative if buying is cheaper
      expect(result.breakEvenYears).toBeGreaterThan(0);
      expect(result.recommendation).toBeTruthy();
    });

    it('should handle minimum required inputs', () => {
      const inputs = {
        currentRent: 1500,
        rentIncreaseRate: 2.0,
        homePrice: 250000,
        downPayment: 50000,
        interestRate: 4.0,
        loanTerm: '30',
        propertyTaxRate: 1.0,
        homeownersInsurance: 1000,
        maintenanceCost: 2000,
        utilities: 100,
        utilitiesHome: 150,
        closingCosts: 5000,
        homeAppreciation: 2.5,
        investmentReturn: 6.0,
        analysisPeriod: 5
      };

      const result = calculateMortgageVsRent(inputs);

      expect(result.monthlyRentCost).toBeGreaterThan(0);
      expect(result.monthlyMortgageCost).toBeGreaterThan(0);
      expect(result.totalRentCost).toBeGreaterThan(0);
      expect(result.totalMortgageCost).toBeGreaterThan(0);
      expect(result.homeEquity).toBeGreaterThan(0);
      expect(result.opportunityCost).toBeGreaterThan(0);
      expect(result.netHomeCost).toBeDefined(); // Can be negative if buying is cheaper
      expect(result.breakEvenYears).toBeGreaterThan(0);
    });
  });

  describe('calculateYearlyComparison', () => {
    it('should calculate year-by-year comparison', () => {
      const inputs = {
        currentRent: 2000,
        rentIncreaseRate: 3.0,
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        pmiRate: 0.5,
        maintenanceCost: 2400,
        utilities: 150,
        utilitiesHome: 200,
        closingCosts: 8000,
        homeAppreciation: 3.0,
        investmentReturn: 7.0,
        analysisPeriod: 5,
        rentersInsurance: 20,
        hoaFees: 0
      };

      const scenarios = calculateYearlyComparison(inputs);

      expect(scenarios).toHaveLength(5);
      
      scenarios.forEach((scenario, index) => {
        expect(scenario.year).toBe(index + 1);
        expect(scenario.rentCost).toBeGreaterThan(0);
        expect(scenario.mortgageCost).toBeGreaterThan(0);
        expect(scenario.rentCumulative).toBeGreaterThan(0);
        expect(scenario.mortgageCumulative).toBeGreaterThan(0);
        expect(scenario.homeValue).toBeGreaterThan(0);
        expect(scenario.homeEquity).toBeGreaterThanOrEqual(0);
        expect(scenario.opportunityCost).toBeGreaterThan(0);
      });
    });
  });

  describe('validateMortgageVsRentInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        currentRent: 2000,
        rentIncreaseRate: 3.0,
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        maintenanceCost: 2400,
        utilities: 150,
        utilitiesHome: 200,
        closingCosts: 8000,
        homeAppreciation: 3.0,
        investmentReturn: 7.0,
        analysisPeriod: 10
      };

      const errors = validateMortgageVsRentInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
      const inputs = {
        currentRent: 2000,
        rentIncreaseRate: 3.0,
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        maintenanceCost: 2400,
        utilities: 150,
        utilitiesHome: 200,
        closingCosts: 8000,
        homeAppreciation: 3.0,
        investmentReturn: 7.0
        // Missing analysisPeriod
      };

      const errors = validateMortgageVsRentInputs(inputs as any);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'analysisPeriod')).toBe(true);
    });

    it('should detect invalid rent amounts', () => {
      const inputs = {
        currentRent: -100, // Invalid
        rentIncreaseRate: 3.0,
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        maintenanceCost: 2400,
        utilities: 150,
        utilitiesHome: 200,
        closingCosts: 8000,
        homeAppreciation: 3.0,
        investmentReturn: 7.0,
        analysisPeriod: 10
      };

      const errors = validateMortgageVsRentInputs(inputs);
      expect(errors.some(e => e.field === 'currentRent')).toBe(true);
    });

    it('should detect invalid home prices', () => {
      const inputs = {
        currentRent: 2000,
        rentIncreaseRate: 3.0,
        homePrice: 10000, // Too low
        downPayment: 80000,
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        maintenanceCost: 2400,
        utilities: 150,
        utilitiesHome: 200,
        closingCosts: 8000,
        homeAppreciation: 3.0,
        investmentReturn: 7.0,
        analysisPeriod: 10
      };

      const errors = validateMortgageVsRentInputs(inputs);
      expect(errors.some(e => e.field === 'homePrice')).toBe(true);
    });

    it('should detect invalid loan terms', () => {
      const inputs = {
        currentRent: 2000,
        rentIncreaseRate: 3.0,
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 4.5,
        loanTerm: '25', // Invalid term
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        maintenanceCost: 2400,
        utilities: 150,
        utilitiesHome: 200,
        closingCosts: 8000,
        homeAppreciation: 3.0,
        investmentReturn: 7.0,
        analysisPeriod: 10
      };

      const errors = validateMortgageVsRentInputs(inputs);
      expect(errors.some(e => e.field === 'loanTerm')).toBe(true);
    });

    it('should detect business logic violations', () => {
      const inputs = {
        currentRent: 2000,
        rentIncreaseRate: 3.0,
        homePrice: 400000,
        downPayment: 500000, // More than home price
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        maintenanceCost: 2400,
        utilities: 150,
        utilitiesHome: 200,
        closingCosts: 8000,
        homeAppreciation: 3.0,
        investmentReturn: 7.0,
        analysisPeriod: 10
      };

      const errors = validateMortgageVsRentInputs(inputs);
      expect(errors.some(e => e.field === 'downPayment')).toBe(true);
    });

    it('should validate PMI logic', () => {
      const inputs = {
        currentRent: 2000,
        rentIncreaseRate: 3.0,
        homePrice: 400000,
        downPayment: 100000, // 25% down payment
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        pmiRate: 0.5, // PMI with 25% down payment
        maintenanceCost: 2400,
        utilities: 150,
        utilitiesHome: 200,
        closingCosts: 8000,
        homeAppreciation: 3.0,
        investmentReturn: 7.0,
        analysisPeriod: 10
      };

      const errors = validateMortgageVsRentInputs(inputs);
      expect(errors.some(e => e.field === 'pmiRate')).toBe(true);
    });

    it('should validate analysis period vs loan term', () => {
      const inputs = {
        currentRent: 2000,
        rentIncreaseRate: 3.0,
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 4.5,
        loanTerm: '15',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        maintenanceCost: 2400,
        utilities: 150,
        utilitiesHome: 200,
        closingCosts: 8000,
        homeAppreciation: 3.0,
        investmentReturn: 7.0,
        analysisPeriod: 20 // Longer than loan term
      };

      const errors = validateMortgageVsRentInputs(inputs);
      expect(errors.some(e => e.field === 'analysisPeriod')).toBe(true);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs correctly', () => {
      const inputs = {
        currentRent: 2000,
        rentIncreaseRate: 3.0,
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        maintenanceCost: 2400,
        utilities: 150,
        utilitiesHome: 200,
        closingCosts: 8000,
        homeAppreciation: 3.0,
        investmentReturn: 7.0,
        analysisPeriod: 10
      };

      const results = quickValidateAllInputs(inputs);
      const errorResults = results.filter(r => !r.isValid && r.severity === 'error');
      expect(errorResults).toHaveLength(0);
    });

    it('should detect validation errors', () => {
      const inputs = {
        currentRent: -100, // Invalid
        rentIncreaseRate: 3.0,
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        maintenanceCost: 2400,
        utilities: 150,
        utilitiesHome: 200,
        closingCosts: 8000,
        homeAppreciation: 3.0,
        investmentReturn: 7.0,
        analysisPeriod: 10
      };

      const results = quickValidateAllInputs(inputs);
      const errorResults = results.filter(r => !r.isValid && r.severity === 'error');
      expect(errorResults.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct calculator structure', () => {
      expect(mortgageVsRentCalculator.id).toBe('mortgage-vs-rent');
      expect(mortgageVsRentCalculator.title).toBe('Mortgage vs. Rent Calculator');
      expect(mortgageVsRentCalculator.category).toBe('finance');
      expect(mortgageVsRentCalculator.subcategory).toBe('mortgage');
    });

    it('should have required inputs', () => {
      const requiredInputs = mortgageVsRentCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      
      const inputIds = requiredInputs.map(input => input.id);
      expect(inputIds).toContain('currentRent');
      expect(inputIds).toContain('rentIncreaseRate');
      expect(inputIds).toContain('homePrice');
      expect(inputIds).toContain('downPayment');
      expect(inputIds).toContain('interestRate');
      expect(inputIds).toContain('loanTerm');
      expect(inputIds).toContain('propertyTaxRate');
      expect(inputIds).toContain('homeownersInsurance');
      expect(inputIds).toContain('maintenanceCost');
      expect(inputIds).toContain('utilities');
      expect(inputIds).toContain('utilitiesHome');
      expect(inputIds).toContain('closingCosts');
      expect(inputIds).toContain('homeAppreciation');
      expect(inputIds).toContain('investmentReturn');
      expect(inputIds).toContain('analysisPeriod');
    });

    it('should have required outputs', () => {
      const outputIds = mortgageVsRentCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('monthlyRentCost');
      expect(outputIds).toContain('monthlyMortgageCost');
      expect(outputIds).toContain('totalRentCost');
      expect(outputIds).toContain('totalMortgageCost');
      expect(outputIds).toContain('homeEquity');
      expect(outputIds).toContain('opportunityCost');
      expect(outputIds).toContain('netHomeCost');
      expect(outputIds).toContain('breakEvenYears');
      expect(outputIds).toContain('recommendation');
      expect(outputIds).toContain('analysis');
    });

    it('should have formulas', () => {
      expect(mortgageVsRentCalculator.formulas).toHaveLength(1);
      expect(mortgageVsRentCalculator.formulas[0].id).toBe('mortgage-vs-rent-analysis');
    });

    it('should have validation rules', () => {
      expect(mortgageVsRentCalculator.validationRules).toHaveLength(1);
      expect(mortgageVsRentCalculator.validationRules[0].id).toBe('required-fields');
    });

    it('should have examples', () => {
      expect(mortgageVsRentCalculator.examples).toHaveLength(3);
      expect(mortgageVsRentCalculator.examples[0].title).toBe('Standard Comparison');
      expect(mortgageVsRentCalculator.examples[1].title).toBe('High-Cost Market');
      expect(mortgageVsRentCalculator.examples[2].title).toBe('Short-Term Analysis');
    });

    it('should have quick validation function', () => {
      expect(typeof mortgageVsRentCalculator.quickValidation).toBe('function');
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator examples', () => {
      mortgageVsRentCalculator.examples.forEach(example => {
        const result = calculateMortgageVsRent(example.inputs);
        
        expect(result.monthlyRentCost).toBeGreaterThan(0);
        expect(result.monthlyMortgageCost).toBeGreaterThan(0);
        expect(result.totalRentCost).toBeGreaterThan(0);
        expect(result.totalMortgageCost).toBeGreaterThan(0);
        expect(result.homeEquity).toBeGreaterThan(0);
        expect(result.opportunityCost).toBeGreaterThan(0);
        expect(result.netHomeCost).toBeDefined(); // Can be negative if buying is cheaper
        expect(result.breakEvenYears).toBeGreaterThan(0);
        expect(result.recommendation).toBeTruthy();
        expect(result.analysis).toBeTruthy();
      });
    });

    it('should validate calculator examples', () => {
      mortgageVsRentCalculator.examples.forEach(example => {
        const errors = validateMortgageVsRentInputs(example.inputs);
        expect(errors).toHaveLength(0);
      });
    });

    it('should pass quick validation for calculator examples', () => {
      mortgageVsRentCalculator.examples.forEach(example => {
        const results = quickValidateAllInputs(example.inputs);
        const errorResults = results.filter(r => !r.isValid && r.severity === 'error');
        expect(errorResults).toHaveLength(0);
      });
    });
  });
});