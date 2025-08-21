import { describe, it, expect } from 'vitest';
import { calculateRentVsBuy } from './formulas';
import { validateRentVsBuyInputs } from './validation';
import { RentVsBuyCalculator } from './RentVsBuyCalculator';

describe('RentVsBuyCalculator', () => {
  describe('Basic Functionality', () => {
    it('should calculate basic rent vs buy comparison', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        interestRate: 6.5,
        loanTerm: 30,
        analysisPeriod: 10
      };

      const result = calculateRentVsBuy(inputs);

      expect(result.monthlyMortgagePayment).toBeGreaterThan(0);
      expect(result.monthlyHomeownershipCost).toBeGreaterThan(0);
      expect(result.monthlyRentalCost).toBe(2700); // 2500 + 200 utilities
      expect(result.totalHomeownershipCost).toBeGreaterThan(0);
      expect(result.totalRentalCost).toBeGreaterThan(0);
      expect(result.homeEquity).toBeGreaterThan(0);
      expect(result.investmentValue).toBeGreaterThan(0);
      expect(result.breakEvenYears).toBeGreaterThan(0);
      expect(['Buy', 'Rent', 'Consider']).toContain(result.recommendation);
    });

    it('should handle minimum required inputs', () => {
      const inputs = {
        homePrice: 300000,
        downPayment: 60000,
        monthlyRent: 2000
      };

      const result = calculateRentVsBuy(inputs);

      expect(result.monthlyMortgagePayment).toBeGreaterThan(0);
      expect(result.monthlyHomeownershipCost).toBeGreaterThan(0);
      expect(result.monthlyRentalCost).toBe(2225); // 2000 + 25 renter insurance + 200 utilities
      expect(result.recommendation).toBeDefined();
    });

    it('should calculate different loan terms correctly', () => {
      const baseInputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        interestRate: 6.5,
        analysisPeriod: 10
      };

      const fifteenYearResult = calculateRentVsBuy({ ...baseInputs, loanTerm: 15 });
      const thirtyYearResult = calculateRentVsBuy({ ...baseInputs, loanTerm: 30 });

      expect(fifteenYearResult.monthlyMortgagePayment).toBeGreaterThan(thirtyYearResult.monthlyMortgagePayment);
      expect(fifteenYearResult.monthlyHomeownershipCost).toBeGreaterThan(thirtyYearResult.monthlyHomeownershipCost);
    });
  });

  describe('Cost Calculations', () => {
    it('should include all homeownership costs', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        interestRate: 6.5,
        propertyTaxRate: 1.2,
        homeInsuranceRate: 0.5,
        maintenanceRate: 1.0,
        hoaFees: 200,
        closingCosts: 12000,
        renovationCosts: 15000
      };

      const result = calculateRentVsBuy(inputs);

      const expectedMonthlyCosts = result.monthlyMortgagePayment + 
        (400000 * 1.2 / 100 / 12) + // Property tax
        (400000 * 0.5 / 100 / 12) + // Home insurance
        (400000 * 1.0 / 100 / 12) + // Maintenance
        200; // HOA fees

      expect(result.monthlyHomeownershipCost).toBeCloseTo(expectedMonthlyCosts, 0);
    });

    it('should include all rental costs', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        renterInsurance: 50,
        utilities: 300,
        movingCosts: 5000
      };

      const result = calculateRentVsBuy(inputs);

      expect(result.monthlyRentalCost).toBe(2850); // 2500 + 50 + 300
      expect(result.totalRentalCost).toBeGreaterThan(result.monthlyRentalCost * 12 * 10); // Should include moving costs
    });

    it('should calculate rent increases over time', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        rentIncreaseRate: 5.0,
        analysisPeriod: 5
      };

      const result = calculateRentVsBuy(inputs);

      // Rent should increase by 5% each year
      const expectedYear1Rent = 2500 * 12;
      const expectedYear5Rent = 2500 * Math.pow(1.05, 4) * 12;
      const totalExpectedRent = expectedYear1Rent + expectedYear1Rent * 1.05 + expectedYear1Rent * Math.pow(1.05, 2) + expectedYear1Rent * Math.pow(1.05, 3) + expectedYear5Rent;

      expect(result.totalRentalCost).toBeGreaterThan(totalExpectedRent);
    });
  });

  describe('Equity and Investment Calculations', () => {
    it('should calculate home equity correctly', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        interestRate: 6.5,
        homeAppreciationRate: 3.0,
        analysisPeriod: 10
      };

      const result = calculateRentVsBuy(inputs);

      const futureHomeValue = 400000 * Math.pow(1.03, 10);
      expect(result.homeEquity).toBeGreaterThan(0);
      expect(result.homeEquity).toBeLessThan(futureHomeValue);
    });

    it('should calculate investment value correctly', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        investmentReturnRate: 7.0,
        analysisPeriod: 10
      };

      const result = calculateRentVsBuy(inputs);

      const expectedInvestmentValue = 80000 * Math.pow(1.07, 10);
      expect(result.investmentValue).toBeCloseTo(expectedInvestmentValue, 0);
    });

    it('should calculate net values correctly', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        interestRate: 6.5,
        analysisPeriod: 10
      };

      const result = calculateRentVsBuy(inputs);

      expect(result.netHomeownershipValue).toBe(result.homeEquity - result.totalHomeownershipCost);
      expect(result.netRentalValue).toBe(result.investmentValue - result.totalRentalCost);
    });
  });

  describe('Break-Even Analysis', () => {
    it('should calculate break-even years when buying is cheaper', () => {
      const inputs = {
        homePrice: 300000,
        downPayment: 60000,
        monthlyRent: 3000, // High rent
        interestRate: 5.0, // Low interest rate
        analysisPeriod: 15
      };

      const result = calculateRentVsBuy(inputs);

      expect(result.breakEvenYears).toBeGreaterThan(0);
      expect(result.breakEvenYears).toBeLessThanOrEqual(result.analysisPeriod);
    });

    it('should handle cases where renting is always cheaper', () => {
      const inputs = {
        homePrice: 800000,
        downPayment: 160000,
        monthlyRent: 2000, // Low rent
        interestRate: 8.0, // High interest rate
        analysisPeriod: 10
      };

      const result = calculateRentVsBuy(inputs);

      expect(result.breakEvenYears).toBeGreaterThanOrEqual(result.analysisPeriod);
    });
  });

  describe('Recommendation Logic', () => {
    it('should recommend buying when net homeownership value is higher', () => {
      const inputs = {
        homePrice: 300000,
        downPayment: 60000,
        monthlyRent: 3000,
        interestRate: 5.0,
        homeAppreciationRate: 4.0,
        investmentReturnRate: 6.0,
        analysisPeriod: 10
      };

      const result = calculateRentVsBuy(inputs);

      if (result.netHomeownershipValue > result.netRentalValue) {
        expect(result.recommendation).toBe('Buy');
        expect(result.monthlySavings).toBeGreaterThan(0);
        expect(result.totalSavings).toBeGreaterThan(0);
      }
    });

    it('should recommend renting when net rental value is higher', () => {
      const inputs = {
        homePrice: 800000,
        downPayment: 160000,
        monthlyRent: 2000,
        interestRate: 8.0,
        homeAppreciationRate: 2.0,
        investmentReturnRate: 8.0,
        analysisPeriod: 10
      };

      const result = calculateRentVsBuy(inputs);

      if (result.netRentalValue > result.netHomeownershipValue) {
        expect(result.recommendation).toBe('Rent');
        expect(result.monthlySavings).toBeGreaterThan(0);
        expect(result.totalSavings).toBeGreaterThan(0);
      }
    });
  });

  describe('Tax Benefits', () => {
    it('should calculate tax benefits correctly', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        interestRate: 6.5,
        taxDeductionRate: 22.0,
        analysisPeriod: 10
      };

      const result = calculateRentVsBuy(inputs);

      const loanAmount = 400000 - 80000;
      const annualInterest = result.monthlyMortgagePayment * 12 - (loanAmount / 30);
      const expectedTaxBenefits = annualInterest * 0.22;

      expect(result.taxBenefits).toBeCloseTo(expectedTaxBenefits, 0);
    });
  });

  describe('ROI Comparison', () => {
    it('should calculate ROI comparison correctly', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        interestRate: 6.5,
        homeAppreciationRate: 3.0,
        investmentReturnRate: 7.0,
        analysisPeriod: 10
      };

      const result = calculateRentVsBuy(inputs);

      const homeownershipROI = ((result.homeEquity - 80000) / 80000) * 100;
      const investmentROI = ((result.investmentValue - 80000) / 80000) * 100;
      const expectedROIComparison = homeownershipROI - investmentROI;

      expect(result.roiComparison).toBeCloseTo(expectedROIComparison, 1);
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const emptyInputs = {};
      const errors = validateRentVsBuyInputs(emptyInputs);

      expect(errors).toContain('Home price is required');
      expect(errors).toContain('Down payment is required');
      expect(errors).toContain('Monthly rent is required');
    });

    it('should validate numeric ranges', () => {
      const invalidInputs = {
        homePrice: 1000, // Too low
        downPayment: 20000000, // Too high
        monthlyRent: 50, // Too low
        interestRate: 25, // Too high
        loanTerm: 100, // Too high
        analysisPeriod: 0 // Too low
      };

      const errors = validateRentVsBuyInputs(invalidInputs);

      expect(errors).toContain('Home price must be at least $50,000');
      expect(errors).toContain('Down payment cannot exceed $10,000,000');
      expect(errors).toContain('Monthly rent must be at least $100');
      expect(errors).toContain('Interest rate cannot exceed 20%');
      expect(errors).toContain('Loan term cannot exceed 50 years');
      expect(errors).toContain('Analysis period must be at least 1 year');
    });

    it('should validate enum values', () => {
      const invalidInputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        jobStability: 'invalid-stability',
        marketConditions: 'invalid-market',
        locationGrowth: 'invalid-growth'
      };

      const errors = validateRentVsBuyInputs(invalidInputs);

      expect(errors).toContain('Invalid job stability selected');
      expect(errors).toContain('Invalid market conditions selected');
      expect(errors).toContain('Invalid location growth selected');
    });

    it('should validate business logic rules', () => {
      const invalidInputs = {
        homePrice: 400000,
        downPayment: 500000, // More than home price
        monthlyRent: 10000, // Too high relative to home price
        interestRate: 6.5,
        loanTerm: 30
      };

      const errors = validateRentVsBuyInputs(invalidInputs);

      expect(errors).toContain('Down payment cannot exceed home price');
      expect(errors).toContain('Annual rent should not exceed 15% of home price');
    });

    it('should pass validation with valid inputs', () => {
      const validInputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        interestRate: 6.5,
        loanTerm: 30,
        analysisPeriod: 10
      };

      const errors = validateRentVsBuyInputs(validInputs);

      expect(errors).toHaveLength(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum values', () => {
      const maxInputs = {
        homePrice: 10000000,
        downPayment: 2000000,
        monthlyRent: 50000,
        interestRate: 20,
        loanTerm: 50,
        analysisPeriod: 50,
        propertyTaxRate: 10,
        homeInsuranceRate: 5,
        maintenanceRate: 10,
        hoaFees: 5000,
        closingCosts: 100000,
        renovationCosts: 500000
      };

      const result = calculateRentVsBuy(maxInputs);

      expect(result.monthlyMortgagePayment).toBeGreaterThan(0);
      expect(result.monthlyHomeownershipCost).toBeGreaterThan(0);
      expect(result.monthlyRentalCost).toBe(50225); // 50000 + 25 + 200
    });

    it('should handle minimum values', () => {
      const minInputs = {
        homePrice: 50000,
        downPayment: 1500,
        monthlyRent: 100,
        interestRate: 0.1,
        loanTerm: 5,
        analysisPeriod: 1,
        propertyTaxRate: 0,
        homeInsuranceRate: 0,
        maintenanceRate: 0,
        hoaFees: 0,
        closingCosts: 0,
        renovationCosts: 0
      };

      const result = calculateRentVsBuy(minInputs);

      expect(result.monthlyMortgagePayment).toBeGreaterThan(0);
      expect(result.monthlyHomeownershipCost).toBeGreaterThan(0);
      expect(result.monthlyRentalCost).toBe(325); // 100 + 25 + 200
    });

    it('should handle zero down payment', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 0,
        monthlyRent: 2500,
        interestRate: 6.5
      };

      const result = calculateRentVsBuy(inputs);

      expect(result.monthlyMortgagePayment).toBeGreaterThan(0);
      expect(result.investmentValue).toBe(0);
    });

    it('should handle zero interest rate', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        interestRate: 0,
        loanTerm: 30
      };

      const result = calculateRentVsBuy(inputs);

      const expectedMonthlyPayment = (400000 - 80000) / (30 * 12);
      expect(result.monthlyMortgagePayment).toBeCloseTo(expectedMonthlyPayment, 0);
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct calculator metadata', () => {
      expect(RentVsBuyCalculator.id).toBe('rent-vs-buy-calculator');
      expect(RentVsBuyCalculator.name).toBe('Rent vs. Buy Calculator');
      expect(RentVsBuyCalculator.category).toBe('finance');
      expect(RentVsBuyCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = RentVsBuyCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(3);
      expect(requiredInputs.some(input => input.id === 'homePrice')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'downPayment')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'monthlyRent')).toBe(true);
    });

    it('should have comprehensive outputs', () => {
      const outputIds = RentVsBuyCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('monthlyMortgagePayment');
      expect(outputIds).toContain('monthlyHomeownershipCost');
      expect(outputIds).toContain('monthlyRentalCost');
      expect(outputIds).toContain('totalHomeownershipCost');
      expect(outputIds).toContain('totalRentalCost');
      expect(outputIds).toContain('homeEquity');
      expect(outputIds).toContain('recommendation');
      expect(outputIds).toContain('breakEvenYears');
    });

    it('should have examples', () => {
      expect(RentVsBuyCalculator.examples).toHaveLength(3);
      expect(RentVsBuyCalculator.examples[0].name).toBe('First-Time Homebuyer');
      expect(RentVsBuyCalculator.examples[1].name).toBe('High-Cost Market');
      expect(RentVsBuyCalculator.examples[2].name).toBe('Investment Property');
    });

    it('should have formulas', () => {
      expect(RentVsBuyCalculator.formulas).toHaveLength(6);
      expect(RentVsBuyCalculator.formulas[0].name).toBe('Monthly Mortgage Payment');
      expect(RentVsBuyCalculator.formulas[1].name).toBe('Total Homeownership Cost');
    });
  });

  describe('Integration Tests', () => {
    it('should calculate and validate together', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        interestRate: 6.5,
        loanTerm: 30,
        analysisPeriod: 10
      };

      // Should pass validation
      const validationErrors = validateRentVsBuyInputs(inputs);
      expect(validationErrors).toHaveLength(0);

      // Should calculate successfully
      const result = calculateRentVsBuy(inputs);
      expect(result.monthlyMortgagePayment).toBeGreaterThan(0);
      expect(result.monthlyHomeownershipCost).toBeGreaterThan(result.monthlyMortgagePayment);
    });

    it('should handle calculator interface methods', () => {
      const inputs = {
        homePrice: 400000,
        downPayment: 80000,
        monthlyRent: 2500,
        interestRate: 6.5
      };

      const outputs = RentVsBuyCalculator.calculate(inputs);
      expect(outputs.monthlyMortgagePayment).toBeGreaterThan(0);

      const report = RentVsBuyCalculator.generateReport(inputs, outputs);
      expect(report).toContain('Rent vs. Buy Analysis Report');
    });
  });
});