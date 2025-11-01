import { describe, it, expect } from 'vitest';
import { DownPaymentAssistanceCalculator } from './DownPaymentAssistanceCalculator';
import { calculateDownPaymentAssistance } from './formulas';
import { validateDownPaymentAssistanceInputs } from './validation';
import { validateAllDownPaymentAssistanceInputs } from './quickValidation';

describe('Down Payment Assistance Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(DownPaymentAssistanceCalculator.id).toBe('DownPaymentAssistance-calculator');
      expect(DownPaymentAssistanceCalculator.name).toBe('Down Payment Assistance Calculator');
      expect(DownPaymentAssistanceCalculator.category).toBe('finance');
      expect(DownPaymentAssistanceCalculator.subcategory).toBe('mortgage');
    });

    it('should have required inputs', () => {
      const requiredInputIds = [
        'homePrice', 'downPaymentPercentage', 'annualIncome', 'householdSize',
        'creditScore', 'location', 'propertyType', 'occupancyType', 'firstTimeBuyer',
        'veteranStatus', 'ruralArea', 'targetArea', 'existingDebt', 'savingsAmount',
        'loanType', 'interestRate', 'loanTerm'
      ];

      const inputIds = DownPaymentAssistanceCalculator.inputs.map(input => input.id);
      requiredInputIds.forEach(id => {
        expect(inputIds).toContain(id);
      });
    });

    it('should have required outputs', () => {
      const requiredOutputIds = [
        'downPaymentRequired', 'downPaymentGap', 'availablePrograms', 'totalAssistance',
        'grantsAvailable', 'forgivableLoans', 'deferredLoans', 'monthlyPayment',
        'debtToIncomeRatio', 'loanToValueRatio', 'eligibilityScore',
        'programRecommendations', 'applicationSteps', 'timeline', 'downPaymentAssistanceAnalysis'
      ];

      const outputIds = DownPaymentAssistanceCalculator.outputs.map(output => output.id);
      requiredOutputIds.forEach(id => {
        expect(outputIds).toContain(id);
      });
    });

    it('should have formulas defined', () => {
      expect(DownPaymentAssistanceCalculator.formulas).toBeDefined();
      expect(DownPaymentAssistanceCalculator.formulas.length).toBeGreaterThan(0);
    });

    it('should have examples defined', () => {
      expect(DownPaymentAssistanceCalculator.examples).toBeDefined();
      expect(DownPaymentAssistanceCalculator.examples.length).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateDownPaymentAssistanceInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate home price range', () => {
      const inputs = {
        homePrice: 25000,
        downPaymentPercentage: 3.5,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 720,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 10000,
        loanType: 'fha',
        interestRate: 6.5,
        loanTerm: 30
      };

      const result = validateDownPaymentAssistanceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Home price must be between $50,000 and $10,000,000');
    });

    it('should validate credit score for FHA loans', () => {
      const inputs = {
        homePrice: 300000,
        downPaymentPercentage: 3.5,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 550,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 10000,
        loanType: 'fha',
        interestRate: 6.5,
        loanTerm: 30
      };

      const result = validateDownPaymentAssistanceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('FHA loans typically require a minimum credit score of 580');
    });

    it('should validate VA loan eligibility', () => {
      const inputs = {
        homePrice: 300000,
        downPaymentPercentage: 0,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 720,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 10000,
        loanType: 'va',
        interestRate: 6.5,
        loanTerm: 30
      };

      const result = validateDownPaymentAssistanceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('VA loans are only available to eligible veterans and service members');
    });

    it('should validate valid inputs', () => {
      const inputs = {
        homePrice: 300000,
        downPaymentPercentage: 3.5,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 720,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 10000,
        loanType: 'fha',
        interestRate: 6.5,
        loanTerm: 30
      };

      const result = validateDownPaymentAssistanceInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate down payment required correctly', () => {
      const inputs = {
        homePrice: 300000,
        downPaymentPercentage: 3.5,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 720,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 10000,
        loanType: 'fha',
        interestRate: 6.5,
        loanTerm: 30
      };

      const outputs = calculateDownPaymentAssistance(inputs);
      expect(outputs.downPaymentRequired).toBe(10500); // 300000 * 0.035
    });

    it('should calculate down payment gap correctly', () => {
      const inputs = {
        homePrice: 300000,
        downPaymentPercentage: 3.5,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 720,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 5000,
        loanType: 'fha',
        interestRate: 6.5,
        loanTerm: 30
      };

      const outputs = calculateDownPaymentAssistance(inputs);
      expect(outputs.downPaymentGap).toBe(5500); // 10500 - 5000
    });

    it('should calculate monthly payment correctly', () => {
      const inputs = {
        homePrice: 300000,
        downPaymentPercentage: 3.5,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 720,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 10000,
        loanType: 'fha',
        interestRate: 6.5,
        loanTerm: 30
      };

      const outputs = calculateDownPaymentAssistance(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(1800);
      expect(outputs.monthlyPayment).toBeLessThan(1900);
    });

    it('should calculate DebtToIncome ratio correctly', () => {
      const inputs = {
        homePrice: 300000,
        downPaymentPercentage: 3.5,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 720,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 10000,
        loanType: 'fha',
        interestRate: 6.5,
        loanTerm: 30
      };

      const outputs = calculateDownPaymentAssistance(inputs);
      expect(outputs.debtToIncomeRatio).toBeGreaterThan(30);
      expect(outputs.debtToIncomeRatio).toBeLessThan(40);
    });

    it('should calculate LoanToValue ratio correctly', () => {
      const inputs = {
        homePrice: 300000,
        downPaymentPercentage: 3.5,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 720,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 10000,
        loanType: 'fha',
        interestRate: 6.5,
        loanTerm: 30
      };

      const outputs = calculateDownPaymentAssistance(inputs);
      expect(outputs.loanToValueRatio).toBe(96.5); // 96.5%
    });

    it('should calculate eligibility score correctly', () => {
      const inputs = {
        homePrice: 300000,
        downPaymentPercentage: 3.5,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 720,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 10000,
        loanType: 'fha',
        interestRate: 6.5,
        loanTerm: 30
      };

      const outputs = calculateDownPaymentAssistance(inputs);
      expect(outputs.eligibilityScore).toBeGreaterThan(0);
      expect(outputs.eligibilityScore).toBeLessThanOrEqual(100);
    });
  });

  describe('Down Payment Assistance Analysis', () => {
    it('should identify available programs for first-time buyer', () => {
      const inputs = {
        homePrice: 300000,
        downPaymentPercentage: 3.5,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 720,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 10000,
        loanType: 'fha',
        interestRate: 6.5,
        loanTerm: 30
      };

      const outputs = calculateDownPaymentAssistance(inputs);
      expect(outputs.availablePrograms).toContain('FHA Loan');
      expect(outputs.availablePrograms).toContain('CalHFA First-Time Homebuyer Program');
      expect(outputs.totalAssistance).toBeGreaterThan(0);
    });

    it('should identify VA programs for veterans', () => {
      const inputs = {
        homePrice: 300000,
        downPaymentPercentage: 0,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 720,
        location: 'TX',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'no',
        veteranStatus: 'veteran',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 10000,
        loanType: 'va',
        interestRate: 6.0,
        loanTerm: 30
      };

      const outputs = calculateDownPaymentAssistance(inputs);
      expect(outputs.availablePrograms).toContain('VA Loan');
      expect(outputs.grantsAvailable).toBeGreaterThan(0);
    });

    it('should identify USDA programs for rural areas', () => {
      const inputs = {
        homePrice: 250000,
        downPaymentPercentage: 0,
        annualIncome: 65000,
        householdSize: 4,
        creditScore: 650,
        location: 'NC',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'yes',
        targetArea: 'yes',
        existingDebt: 300,
        savingsAmount: 5000,
        loanType: 'usda',
        interestRate: 6.25,
        loanTerm: 30
      };

      const outputs = calculateDownPaymentAssistance(inputs);
      expect(outputs.availablePrograms).toContain('USDA Rural Development Loan');
      expect(outputs.deferredLoans).toBeGreaterThan(0);
    });

    it('should provide program recommendations', () => {
      const inputs = {
        homePrice: 300000,
        downPaymentPercentage: 3.5,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 720,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 10000,
        loanType: 'fha',
        interestRate: 6.5,
        loanTerm: 30
      };

      const outputs = calculateDownPaymentAssistance(inputs);
      expect(outputs.programRecommendations).toContain('recommended programs');
      expect(outputs.applicationSteps).toContain('Application Process');
      expect(outputs.timeline).toContain('Estimated Timeline');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero down payment', () => {
      const inputs = {
        homePrice: 300000,
        downPaymentPercentage: 0,
        annualIncome: 75000,
        householdSize: 2,
        creditScore: 720,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'veteran',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 500,
        savingsAmount: 0,
        loanType: 'va',
        interestRate: 6.5,
        loanTerm: 30
      };

      const outputs = calculateDownPaymentAssistance(inputs);
      expect(outputs.downPaymentRequired).toBe(0);
      expect(outputs.downPaymentGap).toBe(0);
      expect(outputs.loanToValueRatio).toBe(100);
    });

    it('should handle high income borrowers', () => {
      const inputs = {
        homePrice: 500000,
        downPaymentPercentage: 20,
        annualIncome: 200000,
        householdSize: 2,
        creditScore: 800,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'no',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 1000,
        savingsAmount: 150000,
        loanType: 'conventional',
        interestRate: 6.0,
        loanTerm: 30
      };

      const outputs = calculateDownPaymentAssistance(inputs);
      expect(outputs.downPaymentRequired).toBe(100000);
      expect(outputs.downPaymentGap).toBe(0);
      expect(outputs.eligibilityScore).toBeLessThan(50); // Lower score due to high income
    });

    it('should handle low credit score scenarios', () => {
      const inputs = {
        homePrice: 200000,
        downPaymentPercentage: 3.5,
        annualIncome: 60000,
        householdSize: 3,
        creditScore: 580,
        location: 'TX',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 800,
        savingsAmount: 5000,
        loanType: 'fha',
        interestRate: 7.0,
        loanTerm: 30
      };

      const outputs = calculateDownPaymentAssistance(inputs);
      expect(outputs.eligibilityScore).toBeLessThan(40);
      expect(outputs.availablePrograms).toContain('FHA Loan');
    });
  });

  describe('Quick Validation', () => {
    it('should validate home price in real-time', () => {
      const result = validateAllDownPaymentAssistanceInputs({ homePrice: 25000 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Home price must be at least $50,000');
    });

    it('should validate credit score in real-time', () => {
      const result = validateAllDownPaymentAssistanceInputs({ creditScore: 200 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Credit score must be at least 300');
    });

    it('should validate loan type compatibility', () => {
      const result = validateAllDownPaymentAssistanceInputs({
        veteranStatus: 'none',
        loanType: 'va'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('VA loans are only available to eligible veterans');
    });

    it('should validate rural area compatibility', () => {
      const result = validateAllDownPaymentAssistanceInputs({
        ruralArea: 'no',
        loanType: 'usda'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('USDA loans are only available for rural properties');
    });
  });
});
