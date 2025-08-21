import { describe, it, expect } from 'vitest';
import { ReverseMortgageCalculator } from './ReverseMortgageCalculator';
import { validateReverseMortgageInputs } from './validation';
import { validateAllReverseMortgageInputs } from './quickValidation';
import { calculateReverseMortgage, generateReverseMortgageAnalysis } from './formulas';
import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

describe('ReverseMortgageCalculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(ReverseMortgageCalculator.id).toBe('reverse-mortgage-calculator');
      expect(ReverseMortgageCalculator.name).toBe('Reverse Mortgage Calculator');
      expect(ReverseMortgageCalculator.category).toBe('finance');
      expect(ReverseMortgageCalculator.subcategory).toBe('mortgage');
    });

    it('should have required inputs', () => {
      const requiredInputs = ReverseMortgageCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'borrowerAge')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'propertyValue')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'loanType')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = ReverseMortgageCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('principalLimit');
      expect(outputIds).toContain('availableProceeds');
      expect(outputIds).toContain('monthlyPayment');
      expect(outputIds).toContain('lineOfCredit');
      expect(outputIds).toContain('totalCosts');
      expect(outputIds).toContain('loanBalance');
      expect(outputIds).toContain('homeEquity');
      expect(outputIds).toContain('debtToEquity');
      expect(outputIds).toContain('breakEvenYears');
      expect(outputIds).toContain('affordabilityScore');
      expect(outputIds).toContain('suitabilityScore');
      expect(outputIds).toContain('riskScore');
      expect(outputIds).toContain('valueScore');
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof ReverseMortgageCalculator.calculate).toBe('function');
      expect(typeof ReverseMortgageCalculator.generateReport).toBe('function');
    });
  });

  describe('Input Validation', () => {
    describe('Comprehensive Validation', () => {
      it('should validate required fields', () => {
        const inputs: CalculatorInputs = {};
        const result = validateReverseMortgageInputs(inputs);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Borrower age is required');
        expect(result.errors).toContain('Property value is required');
        expect(result.errors).toContain('Loan type is required');
      });

      it('should validate valid inputs', () => {
        const inputs: CalculatorInputs = {
          borrowerAge: 65,
          maritalStatus: 'single',
          occupancyType: 'primary',
          propertyValue: 500000,
          propertyType: 'single-family',
          location: 'urban',
          loanType: 'hecm',
          paymentOption: 'tenure',
          interestRate: 6.5,
          rateType: 'fixed'
        };
        const result = validateReverseMortgageInputs(inputs);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should validate borrower age requirements', () => {
        const inputs: CalculatorInputs = {
          borrowerAge: 60,
          maritalStatus: 'single',
          occupancyType: 'primary',
          propertyValue: 500000,
          propertyType: 'single-family',
          location: 'urban',
          loanType: 'hecm',
          paymentOption: 'tenure',
          interestRate: 6.5,
          rateType: 'fixed'
        };
        const result = validateReverseMortgageInputs(inputs);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Borrower must be at least 62 years old for a reverse mortgage');
      });

      it('should validate property value ranges', () => {
        const inputs: CalculatorInputs = {
          borrowerAge: 65,
          maritalStatus: 'single',
          occupancyType: 'primary',
          propertyValue: 50000,
          propertyType: 'single-family',
          location: 'urban',
          loanType: 'hecm',
          paymentOption: 'tenure',
          interestRate: 6.5,
          rateType: 'fixed'
        };
        const result = validateReverseMortgageInputs(inputs);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Property value must be at least $100,000');
      });

      it('should provide warnings for high-risk factors', () => {
        const inputs: CalculatorInputs = {
          borrowerAge: 65,
          maritalStatus: 'single',
          occupancyType: 'primary',
          propertyValue: 500000,
          propertyType: 'manufactured',
          location: 'rural',
          loanType: 'hecm',
          paymentOption: 'tenure',
          interestRate: 12,
          rateType: 'adjustable'
        };
        const result = validateReverseMortgageInputs(inputs);
        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Manufactured homes may have additional requirements and restrictions');
        expect(result.warnings).toContain('Rural properties may have limited lender options');
        expect(result.warnings).toContain('High interest rates will significantly reduce principal limits');
        expect(result.warnings).toContain('Adjustable rates can change over time, affecting loan costs');
      });
    });

    describe('Quick Validation', () => {
      it('should validate individual fields', () => {
        const { validateBorrowerAge, validatePropertyValue, validateLoanType } = require('./quickValidation');
        
        expect(validateBorrowerAge(65)).toBeNull();
        expect(validateBorrowerAge(60)).toContain('Borrower must be at least 62 years old');
        
        expect(validatePropertyValue(500000)).toBeNull();
        expect(validatePropertyValue(50000)).toContain('Property value must be at least $100,000');
        
        expect(validateLoanType('hecm')).toBeNull();
        expect(validateLoanType('invalid')).toContain('Loan type must be one of');
      });

      it('should validate all inputs together', () => {
        const inputs: CalculatorInputs = {
          borrowerAge: 65,
          maritalStatus: 'single',
          occupancyType: 'primary',
          propertyValue: 500000,
          propertyType: 'single-family',
          location: 'urban',
          loanType: 'hecm',
          paymentOption: 'tenure',
          interestRate: 6.5,
          rateType: 'fixed'
        };
        const result = validateAllReverseMortgageInputs(inputs);
        expect(result.isValid).toBe(true);
      });
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic reverse mortgage for tenure option', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.principalLimit).toBeGreaterThan(0);
      expect(outputs.availableProceeds).toBeGreaterThan(0);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.lineOfCredit).toBe(0);
      expect(outputs.totalCosts).toBeGreaterThan(0);
    });

    it('should calculate line of credit option', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'line-of-credit',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.principalLimit).toBeGreaterThan(0);
      expect(outputs.availableProceeds).toBeGreaterThan(0);
      expect(outputs.monthlyPayment).toBe(0);
      expect(outputs.lineOfCredit).toBeGreaterThan(0);
    });

    it('should calculate term option', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'term',
        termYears: 10,
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.principalLimit).toBeGreaterThan(0);
      expect(outputs.availableProceeds).toBeGreaterThan(0);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.lineOfCredit).toBe(0);
    });

    it('should handle existing mortgage', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed',
        existingMortgage: 200000
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.availableProceeds).toBeLessThan(outputs.principalLimit);
    });

    it('should calculate different property types', () => {
      const singleFamilyInputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const condoInputs: CalculatorInputs = {
        ...singleFamilyInputs,
        propertyType: 'condo'
      };
      
      const singleFamilyOutputs = calculateReverseMortgage(singleFamilyInputs);
      const condoOutputs = calculateReverseMortgage(condoInputs);
      
      expect(condoOutputs.principalLimit).toBeLessThan(singleFamilyOutputs.principalLimit);
    });

    it('should calculate different borrower ages', () => {
      const youngBorrowerInputs: CalculatorInputs = {
        borrowerAge: 62,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const olderBorrowerInputs: CalculatorInputs = {
        ...youngBorrowerInputs,
        borrowerAge: 80
      };
      
      const youngOutputs = calculateReverseMortgage(youngBorrowerInputs);
      const olderOutputs = calculateReverseMortgage(olderBorrowerInputs);
      
      expect(olderOutputs.principalLimit).toBeGreaterThan(youngOutputs.principalLimit);
    });

    it('should calculate different interest rates', () => {
      const lowRateInputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 3.5,
        rateType: 'fixed'
      };
      const highRateInputs: CalculatorInputs = {
        ...lowRateInputs,
        interestRate: 10.5
      };
      
      const lowRateOutputs = calculateReverseMortgage(lowRateInputs);
      const highRateOutputs = calculateReverseMortgage(highRateInputs);
      
      expect(lowRateOutputs.principalLimit).toBeGreaterThan(highRateOutputs.principalLimit);
    });

    it('should calculate scores', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.affordabilityScore).toBeGreaterThanOrEqual(0);
      expect(outputs.affordabilityScore).toBeLessThanOrEqual(100);
      expect(outputs.suitabilityScore).toBeGreaterThanOrEqual(0);
      expect(outputs.suitabilityScore).toBeLessThanOrEqual(100);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
      expect(outputs.valueScore).toBeGreaterThanOrEqual(0);
      expect(outputs.valueScore).toBeLessThanOrEqual(100);
    });

    it('should calculate financial projections', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed',
        analysisPeriod: 15
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.loanBalance).toBeGreaterThan(0);
      expect(outputs.homeEquity).toBeGreaterThanOrEqual(0);
      expect(outputs.debtToEquity).toBeGreaterThanOrEqual(0);
      expect(outputs.breakEvenYears).toBeGreaterThan(0);
      expect(outputs.totalPayments).toBeGreaterThan(0);
      expect(outputs.netBenefit).toBeDefined();
    });

    it('should generate payment schedule', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.paymentSchedule).toBeDefined();
      expect(outputs.paymentSchedule.length).toBeGreaterThan(0);
      expect(outputs.paymentSchedule[0]).toHaveProperty('month');
      expect(outputs.paymentSchedule[0]).toHaveProperty('payment');
    });

    it('should generate equity projection', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed',
        analysisPeriod: 15
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.equityProjection).toBeDefined();
      expect(outputs.equityProjection.length).toBe(15);
      expect(outputs.equityProjection[0]).toHaveProperty('year');
      expect(outputs.equityProjection[0]).toHaveProperty('equity');
    });

    it('should generate cost breakdown', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.costBreakdown).toBeDefined();
      expect(outputs.costBreakdown).toHaveProperty('totalCosts');
      expect(outputs.costBreakdown).toHaveProperty('costPercentage');
    });

    it('should generate benefit analysis', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.benefitAnalysis).toBeDefined();
      expect(outputs.benefitAnalysis).toHaveProperty('monthlyPayment');
      expect(outputs.benefitAnalysis).toHaveProperty('netBenefit');
    });

    it('should generate recommendations', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.recommendations).toBeDefined();
      expect(typeof outputs.recommendations).toBe('string');
      expect(outputs.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum borrower age', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 62,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.principalLimit).toBeGreaterThan(0);
    });

    it('should handle maximum borrower age', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 100,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.principalLimit).toBeGreaterThan(0);
    });

    it('should handle minimum property value', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 100000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.principalLimit).toBeGreaterThan(0);
    });

    it('should handle high property value', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 10000000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.principalLimit).toBeGreaterThan(0);
    });

    it('should handle zero existing mortgage', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed',
        existingMortgage: 0
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.availableProceeds).toBe(outputs.principalLimit);
    });

    it('should handle high existing mortgage', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed',
        existingMortgage: 400000
      };
      const outputs = calculateReverseMortgage(inputs);
      
      expect(outputs.availableProceeds).toBeLessThan(outputs.principalLimit);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      const report = generateReverseMortgageAnalysis(inputs, outputs);
      
      expect(report).toContain('Reverse Mortgage Analysis Report');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Loan Summary');
      expect(report).toContain('Financial Projections');
      expect(report).toContain('Assessment Scores');
      expect(report).toContain('Key Considerations');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Important Notes');
    });

    it('should include loan details in report', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      const report = generateReverseMortgageAnalysis(inputs, outputs);
      
      expect(report).toContain('Principal Limit');
      expect(report).toContain('Available Proceeds');
      expect(report).toContain('Monthly Payment');
    });

    it('should include scores in report', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      const outputs = calculateReverseMortgage(inputs);
      const report = generateReverseMortgageAnalysis(inputs, outputs);
      
      expect(report).toContain('Affordability Score');
      expect(report).toContain('Suitability Score');
      expect(report).toContain('Risk Score');
      expect(report).toContain('Value Score');
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator interface', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 65,
        maritalStatus: 'single',
        occupancyType: 'primary',
        propertyValue: 500000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      
      const outputs = ReverseMortgageCalculator.calculate(inputs);
      const report = ReverseMortgageCalculator.generateReport(inputs, outputs);
      
      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
    });

    it('should handle validation errors gracefully', () => {
      const inputs: CalculatorInputs = {
        borrowerAge: 60,
        maritalStatus: 'invalid',
        occupancyType: 'primary',
        propertyValue: 50000,
        propertyType: 'single-family',
        location: 'urban',
        loanType: 'hecm',
        paymentOption: 'tenure',
        interestRate: 6.5,
        rateType: 'fixed'
      };
      
      const result = validateReverseMortgageInputs(inputs);
      expect(result.isValid).toBe(false);
    });

    it('should handle different payment options', () => {
      const paymentOptions = ['tenure', 'term', 'line-of-credit', 'modified-tenure', 'modified-term'];
      
      paymentOptions.forEach(option => {
        const inputs: CalculatorInputs = {
          borrowerAge: 65,
          maritalStatus: 'single',
          occupancyType: 'primary',
          propertyValue: 500000,
          propertyType: 'single-family',
          location: 'urban',
          loanType: 'hecm',
          paymentOption: option,
          interestRate: 6.5,
          rateType: 'fixed',
          termYears: option === 'term' || option === 'modified-term' ? 10 : undefined
        };
        const outputs = calculateReverseMortgage(inputs);
        
        expect(outputs.principalLimit).toBeGreaterThan(0);
        expect(outputs.availableProceeds).toBeGreaterThan(0);
      });
    });

    it('should handle different loan types', () => {
      const loanTypes = ['hecm', 'proprietary', 'single-purpose'];
      
      loanTypes.forEach(type => {
        const inputs: CalculatorInputs = {
          borrowerAge: 65,
          maritalStatus: 'single',
          occupancyType: 'primary',
          propertyValue: 500000,
          propertyType: 'single-family',
          location: 'urban',
          loanType: type,
          paymentOption: 'tenure',
          interestRate: 6.5,
          rateType: 'fixed'
        };
        const outputs = calculateReverseMortgage(inputs);
        
        expect(outputs.principalLimit).toBeGreaterThan(0);
        expect(outputs.totalCosts).toBeGreaterThan(0);
      });
    });
  });
});
