import { describe, it, expect } from 'vitest';
import { HardMoneyLoanCalculator } from './HardMoneyLoanCalculator';
import { calculateHardMoneyLoan } from './formulas';
import { validateHardMoneyLoanInputs } from './validation';
import { validateAllHardMoneyLoanInputs } from './quickValidation';

describe('Hard Money Loan Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(HardMoneyLoanCalculator.id).toBe('hard-money-loan-calculator');
      expect(HardMoneyLoanCalculator.name).toBe('Hard Money Loan Calculator');
      expect(HardMoneyLoanCalculator.category).toBe('finance');
      expect(HardMoneyLoanCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = ['loanAmount', 'propertyValue', 'interestRate', 'loanTerm', 'points', 'propertyType', 'loanPurpose', 'propertyCondition', 'location', 'marketType', 'exitStrategy'];
      requiredInputs.forEach(inputId => {
        const input = HardMoneyLoanCalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have expected outputs', () => {
      const expectedOutputs = ['monthlyPayment', 'totalInterest', 'totalCost', 'loanToValue', 'annualPercentageRate', 'cashOnCashReturn', 'riskScore', 'feasibilityScore'];
      expectedOutputs.forEach(outputId => {
        const output = HardMoneyLoanCalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateHardMoneyLoanInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount is required');
      expect(result.errors).toContain('Property value is required');
      expect(result.errors).toContain('Interest rate is required');
      expect(result.errors).toContain('Loan term is required');
      expect(result.errors).toContain('Points are required');
      expect(result.errors).toContain('Property type is required');
      expect(result.errors).toContain('Loan purpose is required');
      expect(result.errors).toContain('Property condition is required');
      expect(result.errors).toContain('Location is required');
      expect(result.errors).toContain('Market type is required');
      expect(result.errors).toContain('Exit strategy is required');
    });

    it('should validate data types', () => {
      const result = validateHardMoneyLoanInputs({
        loanAmount: 'invalid' as any,
        propertyValue: 'invalid' as any,
        interestRate: 'invalid' as any,
        loanTerm: 'invalid' as any,
        points: 'invalid' as any,
        propertyType: 'single-family',
        loanPurpose: 'purchase',
        propertyCondition: 'good',
        location: 'urban',
        marketType: 'stable',
        exitStrategy: 'sell'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be a number');
      expect(result.errors).toContain('Property value must be a number');
      expect(result.errors).toContain('Interest rate must be a number');
      expect(result.errors).toContain('Loan term must be a number');
      expect(result.errors).toContain('Points must be a number');
    });

    it('should validate ranges', () => {
      const result = validateHardMoneyLoanInputs({
        loanAmount: 5000, // Too low
        propertyValue: 5000, // Too low
        interestRate: 3, // Too low
        loanTerm: 2, // Too low
        points: 15, // Too high
        propertyType: 'single-family',
        loanPurpose: 'purchase',
        propertyCondition: 'good',
        location: 'urban',
        marketType: 'stable',
        exitStrategy: 'sell'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be between $10,000 and $10,000,000');
      expect(result.errors).toContain('Property value must be between $10,000 and $10,000,000');
      expect(result.errors).toContain('Interest rate must be between 5% and 25%');
      expect(result.errors).toContain('Loan term must be between 3 and 36 months');
      expect(result.errors).toContain('Points must be between 0 and 10');
    });

    it('should validate logical relationships', () => {
      const result = validateHardMoneyLoanInputs({
        loanAmount: 500000,
        propertyValue: 300000, // Less than loan amount
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'purchase',
        propertyCondition: 'good',
        location: 'urban',
        marketType: 'stable',
        exitStrategy: 'sell'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount cannot exceed property value');
    });

    it('should validate enum values', () => {
      const result = validateHardMoneyLoanInputs({
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'INVALID',
        loanPurpose: 'INVALID',
        propertyCondition: 'INVALID',
        location: 'INVALID',
        marketType: 'INVALID',
        exitStrategy: 'INVALID'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid property type');
      expect(result.errors).toContain('Invalid loan purpose');
      expect(result.errors).toContain('Invalid property condition');
      expect(result.errors).toContain('Invalid location');
      expect(result.errors).toContain('Invalid market type');
      expect(result.errors).toContain('Invalid exit strategy');
    });

    it('should pass validation with valid inputs', () => {
      const result = validateHardMoneyLoanInputs({
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip',
        timeline: 6,
        renovationBudget: 50000,
        afterRepairValue: 450000
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic loan metrics correctly', () => {
      const inputs = {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip'
      };

      const outputs = calculateHardMoneyLoan(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.totalInterest).toBeGreaterThan(0);
      expect(outputs.loanToValue).toBe(75); // 300000 / 400000 * 100
      expect(outputs.pointsCost).toBe(9000); // 3% of 300000
    });

    it('should calculate LTV and LTC correctly', () => {
      const inputs = {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip',
        renovationBudget: 50000,
        closingCosts: 5000
      };

      const outputs = calculateHardMoneyLoan(inputs);
      expect(outputs.loanToValue).toBe(75); // 300000 / 400000 * 100
      expect(outputs.loanToCost).toBeCloseTo(66.67, 1); // 300000 / (400000 + 50000 + 5000) * 100
    });

    it('should calculate APR correctly', () => {
      const inputs = {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip'
      };

      const outputs = calculateHardMoneyLoan(inputs);
      expect(outputs.annualPercentageRate).toBeGreaterThan(12); // Should be higher than base rate due to fees
      expect(outputs.effectiveRate).toBeGreaterThan(12);
    });

    it('should calculate cash flow correctly', () => {
      const inputs = {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip',
        monthlyExpenses: 2000
      };

      const outputs = calculateHardMoneyLoan(inputs);
      expect(outputs.monthlyCashFlow).toBeLessThan(0); // Should be negative due to payments and expenses
      expect(outputs.totalCashFlow).toBeLessThan(0);
    });

    it('should calculate investment metrics correctly', () => {
      const inputs = {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip',
        downPayment: 50000,
        renovationBudget: 50000,
        afterRepairValue: 450000
      };

      const outputs = calculateHardMoneyLoan(inputs);
      expect(outputs.cashOnCashReturn).toBeDefined();
      expect(outputs.internalRateOfReturn).toBeDefined();
      expect(outputs.netPresentValue).toBeDefined();
      expect(outputs.profitMargin).toBeDefined();
    });

    it('should calculate break-even analysis correctly', () => {
      const inputs = {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip',
        downPayment: 50000,
        renovationBudget: 50000
      };

      const outputs = calculateHardMoneyLoan(inputs);
      expect(outputs.breakEvenMonths).toBeGreaterThan(0);
    });

    it('should calculate maximum loan amounts correctly', () => {
      const inputs = {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip',
        renovationBudget: 50000
      };

      const outputs = calculateHardMoneyLoan(inputs);
      expect(outputs.maxLoanAmount).toBeGreaterThan(0);
      expect(outputs.minDownPayment).toBeGreaterThan(0);
      expect(outputs.maxPropertyValue).toBeGreaterThan(0);
    });
  });

  describe('Hard Money Loan Analysis', () => {
    it('should generate comprehensive analysis', () => {
      const inputs = {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip',
        timeline: 6,
        renovationBudget: 50000,
        afterRepairValue: 450000
      };

      const outputs = calculateHardMoneyLoan(inputs);
      const analysis = HardMoneyLoanCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Hard Money Loan Analysis');
      expect(analysis).toContain('Executive Summary');
      expect(analysis).toContain('Financial Analysis');
      expect(analysis).toContain('Risk Assessment');
      expect(analysis).toContain('Investment Grade');
      expect(analysis).toContain('Recommended Action');
      expect(analysis).toContain('Exit Strategy Analysis');
      expect(analysis).toContain('Timeline Analysis');
      expect(analysis).toContain('Market Analysis');
      expect(analysis).toContain('Optimization Opportunities');
      expect(analysis).toContain('Comparison Analysis');
      expect(analysis).toContain('Sensitivity Analysis');
      expect(analysis).toContain('Risk Factors');
    });

    it('should include investment grade assessment', () => {
      const inputs = {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip'
      };

      const outputs = calculateHardMoneyLoan(inputs);
      const analysis = HardMoneyLoanCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Investment Grade:');
      expect(['A', 'B', 'C', 'D']).toContain(outputs.investmentGrade);
    });

    it('should include recommended action', () => {
      const inputs = {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip'
      };

      const outputs = calculateHardMoneyLoan(inputs);
      const analysis = HardMoneyLoanCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Recommended Action:');
      expect(outputs.recommendedAction).toBeDefined();
    });

    it('should include risk and feasibility scores', () => {
      const inputs = {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip'
      };

      const outputs = calculateHardMoneyLoan(inputs);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(1);
      expect(outputs.riskScore).toBeLessThanOrEqual(10);
      expect(outputs.feasibilityScore).toBeGreaterThanOrEqual(1);
      expect(outputs.feasibilityScore).toBeLessThanOrEqual(10);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum values', () => {
      const inputs = {
        loanAmount: 10000,
        propertyValue: 10000,
        interestRate: 5,
        loanTerm: 3,
        points: 0,
        propertyType: 'single-family',
        loanPurpose: 'purchase',
        propertyCondition: 'excellent',
        location: 'rural',
        marketType: 'declining',
        exitStrategy: 'sell'
      };

      const outputs = calculateHardMoneyLoan(inputs);
      expect(outputs.loanToValue).toBe(100); // 10000 / 10000 * 100
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
    });

    it('should handle maximum values', () => {
      const inputs = {
        loanAmount: 10000000,
        propertyValue: 10000000,
        interestRate: 25,
        loanTerm: 36,
        points: 10,
        propertyType: 'commercial',
        loanPurpose: 'construction',
        propertyCondition: 'needs-repair',
        location: 'urban',
        marketType: 'hot',
        exitStrategy: 'refinance'
      };

      const outputs = calculateHardMoneyLoan(inputs);
      expect(outputs.loanToValue).toBe(100); // 10000000 / 10000000 * 100
      expect(outputs.pointsCost).toBe(1000000); // 10% of 10000000
    });

    it('should handle zero optional values', () => {
      const inputs = {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip',
        downPayment: 0,
        closingCosts: 0,
        renovationBudget: 0,
        monthlyExpenses: 0
      };

      const outputs = calculateHardMoneyLoan(inputs);
      expect(outputs.totalFees).toBeGreaterThan(0); // Should still include points cost
      expect(outputs.monthlyCashFlow).toBeLessThan(0); // Should be negative due to loan payment
    });

    it('should handle different exit strategies', () => {
      const baseInputs = {
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable'
      };

      const sellOutputs = calculateHardMoneyLoan({ ...baseInputs, exitStrategy: 'sell' });
      const refinanceOutputs = calculateHardMoneyLoan({ ...baseInputs, exitStrategy: 'refinance' });
      const holdOutputs = calculateHardMoneyLoan({ ...baseInputs, exitStrategy: 'hold' });
      const flipOutputs = calculateHardMoneyLoan({ ...baseInputs, exitStrategy: 'flip' });

      expect(sellOutputs.investmentGrade).toBeDefined();
      expect(refinanceOutputs.investmentGrade).toBeDefined();
      expect(holdOutputs.investmentGrade).toBeDefined();
      expect(flipOutputs.investmentGrade).toBeDefined();
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const result = validateAllHardMoneyLoanInputs({
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip'
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch individual field errors', () => {
      const result = validateAllHardMoneyLoanInputs({
        loanAmount: 5000, // Too low
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'INVALID',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be between $10,000 and $10,000,000');
      expect(result.errors).toContain('Invalid property type');
    });

    it('should validate logical relationships', () => {
      const result = validateAllHardMoneyLoanInputs({
        loanAmount: 500000,
        propertyValue: 300000, // Less than loan amount
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount cannot exceed property value');
    });

    it('should validate timeline vs loan term', () => {
      const result = validateAllHardMoneyLoanInputs({
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 6,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip',
        timeline: 12 // Longer than loan term
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Project timeline should not exceed loan term');
    });

    it('should validate ARV vs property value', () => {
      const result = validateAllHardMoneyLoanInputs({
        loanAmount: 300000,
        propertyValue: 400000,
        interestRate: 12,
        loanTerm: 12,
        points: 3,
        propertyType: 'single-family',
        loanPurpose: 'fix-and-flip',
        propertyCondition: 'needs-repair',
        location: 'suburban',
        marketType: 'stable',
        exitStrategy: 'flip',
        afterRepairValue: 300000 // Less than current value
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('After repair value should typically be higher than current property value');
    });
  });
});
