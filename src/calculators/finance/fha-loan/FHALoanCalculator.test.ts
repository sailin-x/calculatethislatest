import { describe, it, expect } from 'vitest';
import { FHALoanCalculator } from './FHALoanCalculator';
import { calculateFHALoan } from './formulas';
import { validateFHALoanInputs } from './validation';
import { validateAllFHALoanInputs } from './quickValidation';

describe('FHA Loan Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(FHALoanCalculator.id).toBe('FhaLoanCalculator');
      expect(FHALoanCalculator.name).toBe('FHA Loan Calculator');
      expect(FHALoanCalculator.category).toBe('finance');
      expect(FHALoanCalculator.subcategory).toBe('mortgage');
      expect(FHALoanCalculator.description).toContain('FHA loan');
    });

    it('should have required inputs', () => {
      const requiredInputIds = [
        'homePrice', 'downPayment', 'interestRate', 'loanTerm', 'annualIncome',
        'monthlyDebt', 'creditScore', 'propertyType', 'occupancyType', 'state',
        'propertyTaxes', 'homeInsurance', 'loanType'
      ];

      requiredInputIds.forEach(id => {
        const input = FHALoanCalculator.inputs.find(i => i.id === id);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have expected outputs', () => {
      const expectedOutputIds = [
        'loanAmount', 'monthlyPayment', 'totalMonthlyPayment', 'dtiRatio',
        'ltvRatio', 'upfrontMIP', 'annualMIP', 'totalLoanCost', 'eligibilityScore',
        'qualificationStatus', 'conventionalComparison', 'amortizationSummary',
        'fhaLoanAnalysis'
      ];

      expectedOutputIds.forEach(id => {
        const output = FHALoanCalculator.outputs.find(o => o.id === id);
        expect(output).toBeDefined();
      });
    });

    it('should have formulas section', () => {
      expect(FHALoanCalculator.formulas).toBeDefined();
      expect(Array.isArray(FHALoanCalculator.formulas)).toBe(true);
      expect(FHALoanCalculator.formulas.length).toBeGreaterThan(0);
    });

    it('should have examples section', () => {
      expect(FHALoanCalculator.examples).toBeDefined();
      expect(Array.isArray(FHALoanCalculator.examples)).toBe(true);
      expect(FHALoanCalculator.examples.length).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateFHALoanInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some(e => e.includes('required'))).toBe(true);
    });

    it('should validate home price range', () => {
      const inputs = {
        homePrice: '25000',
        downPayment: '5000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const result = validateFHALoanInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Home price must be between'))).toBe(true);
    });

    it('should validate down payment percentage', () => {
      const inputs = {
        homePrice: '300000',
        downPayment: '5000', // 1.67% - below FHA minimum
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const result = validateFHALoanInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('3.5% down payment'))).toBe(true);
    });

    it('should validate credit score minimum', () => {
      const inputs = {
        homePrice: '300000',
        downPayment: '15000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '550', // Below 580
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const result = validateFHALoanInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Credit score below 580'))).toBe(true);
    });

    it('should validate investment property restrictions', () => {
      const inputs = {
        homePrice: '300000',
        downPayment: '15000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'investment',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const result = validateFHALoanInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('not available for investment properties'))).toBe(true);
    });

    it('should pass validation with valid inputs', () => {
      const inputs = {
        homePrice: '300000',
        downPayment: '15000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const result = validateFHALoanInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic FHA loan correctly', () => {
      const inputs = {
        homePrice: '300000',
        downPayment: '15000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const outputs = calculateFHALoan(inputs);

      expect(outputs.loanAmount).toBe(285000);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.totalMonthlyPayment).toBeGreaterThan(outputs.monthlyPayment);
      expect(outputs.dtiRatio).toBeGreaterThan(0);
      expect(outputs.ltvRatio).toBe(95);
      expect(outputs.upfrontMIP).toBeGreaterThan(0);
      expect(outputs.annualMIP).toBeGreaterThan(0);
      expect(outputs.eligibilityScore).toBeGreaterThan(0);
      expect(outputs.qualificationStatus).toBeDefined();
    });

    it('should calculate MIP rates correctly for different down payments', () => {
      const inputs1 = {
        homePrice: '300000',
        downPayment: '15000', // 5% down
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const inputs2 = {
        ...inputs1,
        downPayment: '30000' // 10% down
      };

      const outputs1 = calculateFHALoan(inputs1);
      const outputs2 = calculateFHALoan(inputs2);

      // Higher down payment should result in lower MIP
      expect(outputs2.annualMIP).toBeLessThan(outputs1.annualMIP);
    });

    it('should calculate eligibility score based on credit score', () => {
      const inputs1 = {
        homePrice: '300000',
        downPayment: '15000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '750',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const inputs2 = {
        ...inputs1,
        creditScore: '650'
      };

      const outputs1 = calculateFHALoan(inputs1);
      const outputs2 = calculateFHALoan(inputs2);

      // Higher credit score should result in higher eligibility score
      expect(outputs1.eligibilityScore).toBeGreaterThan(outputs2.eligibilityScore);
    });

    it('should calculate DTI ratio correctly', () => {
      const inputs = {
        homePrice: '300000',
        downPayment: '15000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '1000',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const outputs = calculateFHALoan(inputs);
      const expectedDTI = ((outputs.totalMonthlyPayment + 1000) / (60000 / 12)) * 100;

      expect(outputs.dtiRatio).toBeCloseTo(expectedDTI, 1);
    });

    it('should handle streamline refinance correctly', () => {
      const inputs = {
        homePrice: '300000',
        downPayment: '0', // No additional down payment for streamline
        interestRate: '4.5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'streamline-refinance'
      };

      const outputs = calculateFHALoan(inputs);
      expect(outputs.loanAmount).toBe(300000);
      expect(outputs.ltvRatio).toBe(100);
    });

    it('should calculate conventional loan comparison', () => {
      const inputs = {
        homePrice: '300000',
        downPayment: '15000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const outputs = calculateFHALoan(inputs);
      expect(outputs.conventionalComparison).toBeDefined();
      expect(outputs.conventionalComparison).toContain('monthly');
    });
  });

  describe('FHA Loan Analysis', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = {
        homePrice: '300000',
        downPayment: '15000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const outputs = calculateFHALoan(inputs);
      const analysis = FHALoanCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('FHA Loan Analysis');
      expect(analysis).toContain('Loan Amount');
      expect(analysis).toContain('Monthly Payment');
      expect(analysis).toContain('DTI Ratio');
      expect(analysis).toContain('LTV Ratio');
      expect(analysis).toContain('MIP');
      expect(analysis).toContain('Eligibility');
    });

    it('should include qualification status in analysis', () => {
      const inputs = {
        homePrice: '300000',
        downPayment: '15000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const outputs = calculateFHALoan(inputs);
      const analysis = FHALoanCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain(outputs.qualificationStatus);
    });

    it('should include amortization summary', () => {
      const inputs = {
        homePrice: '300000',
        downPayment: '15000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const outputs = calculateFHALoan(inputs);
      const analysis = FHALoanCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Amortization');
      expect(analysis).toContain('Total Interest');
      expect(analysis).toContain('Total Payment');
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum loan amounts', () => {
      const inputs = {
        homePrice: '10000000',
        downPayment: '500000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '500000',
        monthlyDebt: '5000',
        creditScore: '800',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '50000',
        homeInsurance: '10000',
        loanType: 'standard'
      };

      const outputs = calculateFHALoan(inputs);
      expect(outputs.loanAmount).toBe(9500000);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
    });

    it('should handle minimum down payment scenarios', () => {
      const inputs = {
        homePrice: '100000',
        downPayment: '3500', // Exactly 3.5%
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '30000',
        monthlyDebt: '200',
        creditScore: '580',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '1000',
        homeInsurance: '500',
        loanType: 'standard'
      };

      const outputs = calculateFHALoan(inputs);
      expect(outputs.loanAmount).toBe(96500);
      expect(outputs.ltvRatio).toBe(96.5);
    });

    it('should handle high DTI scenarios', () => {
      const inputs = {
        homePrice: '300000',
        downPayment: '15000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '40000',
        monthlyDebt: '2000',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      };

      const outputs = calculateFHALoan(inputs);
      expect(outputs.dtiRatio).toBeGreaterThan(50);
      expect(outputs.qualificationStatus).toContain('High');
    });

    it('should handle different property types', () => {
      const propertyTypes = ['single-family', 'duplex', 'condo', 'townhouse'];
      
      propertyTypes.forEach(propertyType => {
        const inputs = {
          homePrice: '300000',
          downPayment: '15000',
          interestRate: '5',
          loanTerm: '30',
          annualIncome: '60000',
          monthlyDebt: '500',
          creditScore: '700',
          propertyType,
          occupancyType: 'primary-residence',
          state: 'CA',
          propertyTaxes: '3000',
          homeInsurance: '1200',
          loanType: 'standard'
        };

        const outputs = calculateFHALoan(inputs);
        expect(outputs.loanAmount).toBe(285000);
        expect(outputs.eligibilityScore).toBeGreaterThan(0);
      });
    });

    it('should handle different loan types', () => {
      const loanTypes = ['standard', 'streamline-refinance', '203k-rehab', 'energy-efficient'];
      
      loanTypes.forEach(loanType => {
        const inputs = {
          homePrice: '300000',
          downPayment: '15000',
          interestRate: '5',
          loanTerm: '30',
          annualIncome: '60000',
          monthlyDebt: '500',
          creditScore: '700',
          propertyType: 'single-family',
          occupancyType: 'primary-residence',
          state: 'CA',
          propertyTaxes: '3000',
          homeInsurance: '1200',
          loanType
        };

        const outputs = calculateFHALoan(inputs);
        expect(outputs.loanAmount).toBeDefined();
        expect(outputs.qualificationStatus).toBeDefined();
      });
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const result1 = validateAllFHALoanInputs({ homePrice: 'invalid' });
      expect(result1.isValid).toBe(false);
      expect(result1.errors.some(e => e.includes('Home price must be a number'))).toBe(true);

      const result2 = validateAllFHALoanInputs({ creditScore: '400' });
      expect(result2.isValid).toBe(false);
      expect(result2.errors.some(e => e.includes('Credit score must be at least 500'))).toBe(true);

      const result3 = validateAllFHALoanInputs({ propertyType: 'invalid' });
      expect(result3.isValid).toBe(false);
      expect(result3.errors.some(e => e.includes('valid property type'))).toBe(true);
    });

    it('should handle optional fields correctly', () => {
      const result = validateAllFHALoanInputs({
        homePrice: '300000',
        downPayment: '15000',
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard',
        hoaFees: '200',
        floodInsurance: '500'
      });

      expect(result.isValid).toBe(true);
    });

    it('should validate cross-field relationships', () => {
      const result = validateAllFHALoanInputs({
        homePrice: '300000',
        downPayment: '5000', // Too low
        interestRate: '5',
        loanTerm: '30',
        annualIncome: '60000',
        monthlyDebt: '500',
        creditScore: '700',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        loanType: 'standard'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('3.5% down payment'))).toBe(true);
    });
  });
});
