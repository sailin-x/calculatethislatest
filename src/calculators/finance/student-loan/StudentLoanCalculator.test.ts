import { describe, it, expect } from 'vitest';
import { StudentLoanCalculator } from './StudentLoanCalculator';
import { validateStudentLoanInputs } from './validation';
import { validateAllStudentLoanInputs } from './quickValidation';
import { calculateStudentLoan, generateStudentLoanAnalysis } from './formulas';
import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

describe('StudentLoanCalculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(StudentLoanCalculator.id).toBe('student-loan-calculator');
      expect(StudentLoanCalculator.name).toBe('Student Loan Calculator');
      expect(StudentLoanCalculator.category).toBe('finance');
      expect(StudentLoanCalculator.subcategory).toBe('education');
    });

    it('should have required inputs', () => {
      const requiredInputs = [
        'loanAmount', 'interestRate', 'loanTerm'
      ];
      
      requiredInputs.forEach(inputId => {
        const input = StudentLoanCalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have required outputs', () => {
      const requiredOutputs = [
        'monthlyPayment', 'totalInterest', 'totalPayments', 'payoffDate',
        'debtToIncomeRatio', 'affordabilityScore', 'recommendedStrategy'
      ];
      
      requiredOutputs.forEach(outputId => {
        const output = StudentLoanCalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });

    it('should have calculation and report generation functions', () => {
      expect(typeof StudentLoanCalculator.calculate).toBe('function');
      expect(typeof StudentLoanCalculator.generateReport).toBe('function');
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const inputs: CalculatorInputs = {};
      const result = validateStudentLoanInputs(inputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount is required and must be greater than 0');
      expect(result.errors).toContain('Interest rate is required and cannot be negative');
      expect(result.errors).toContain('Loan term is required and must be at least 1 year');
    });

    it('should validate loan amount ranges', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 2000000 // Invalid: too high
      };
      
      const result = validateStudentLoanInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be between $0 and $1,000,000');
    });

    it('should validate enum values', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 6.8,
        loanTerm: 10,
        loanType: 'invalid-type', // Invalid enum
        repaymentPlan: 'invalid-plan', // Invalid enum
        filingStatus: 'invalid-status', // Invalid enum
        stateOfResidence: 'invalid-state', // Invalid enum
        repaymentStrategy: 'invalid-strategy' // Invalid enum
      };
      
      const result = validateStudentLoanInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan type must be one of: federal-subsidized, federal-unsubsidized, federal-plus, private, consolidated');
      expect(result.errors).toContain('Repayment plan must be one of: standard, extended, graduated, income-based, pay-as-you-earn, revised-pay-as-you-earn, income-contingent, income-sensitive');
      expect(result.errors).toContain('Filing status must be one of: single, married-filing-jointly, married-filing-separately, head-of-household');
      expect(result.errors).toContain('Invalid state selection');
      expect(result.errors).toContain('Repayment strategy must be one of: minimum-payments, debt-snowball, debt-avalanche, aggressive-payoff, income-based');
    });

    it('should provide warnings for logical issues', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 12, // High interest rate
        loanTerm: 10,
        annualIncome: 25000, // Low income
        emergencyFund: 1000, // Low emergency fund
        lumpSumPayment: 60000 // Exceeds loan amount
      };
      
      const result = validateStudentLoanInputs(inputs);
      expect(result.warnings).toContain('High interest rate - consider refinancing or income-based repayment');
      expect(result.warnings).toContain('Low income - income-based repayment may be beneficial');
      expect(result.warnings).toContain('Emergency fund is low - prioritize building emergency savings');
      expect(result.warnings).toContain('Lump sum payment cannot exceed loan amount');
    });

    it('should accept valid inputs', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 6.8,
        loanTerm: 10,
        loanType: 'federal-unsubsidized',
        repaymentPlan: 'standard',
        filingStatus: 'single',
        stateOfResidence: 'ca',
        repaymentStrategy: 'minimum-payments'
      };
      
      const result = validateStudentLoanInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields', () => {
      const { validateLoanAmount, validateInterestRate } = require('./quickValidation');
      
      expect(validateLoanAmount(0)).toBe('Loan amount must be greater than 0');
      expect(validateLoanAmount(50000)).toBeNull();
      
      expect(validateInterestRate(-1)).toBe('Interest rate must be greater than or equal to 0');
      expect(validateInterestRate(6.8)).toBeNull();
    });

    it('should validate all inputs', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 6.8,
        loanTerm: 10
      };
      
      const result = validateAllStudentLoanInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic student loan metrics', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 6.8,
        loanTerm: 10
      };
      
      const outputs = calculateStudentLoan(inputs);
      
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.totalInterest).toBeGreaterThan(0);
      expect(outputs.totalPayments).toBe(outputs.monthlyPayment * 10 * 12);
      expect(outputs.payoffDate).toBeDefined();
      expect(outputs.amortizationSchedule).toHaveLength(10);
      expect(outputs.interestToPrincipalRatio).toBeGreaterThan(0);
      expect(outputs.debtToIncomeRatio).toBeGreaterThan(0);
      expect(outputs.affordabilityScore).toBeGreaterThanOrEqual(0);
      expect(outputs.affordabilityScore).toBeLessThanOrEqual(100);
      expect(outputs.repaymentEfficiency).toBeGreaterThanOrEqual(0);
      expect(outputs.repaymentEfficiency).toBeLessThanOrEqual(100);
      expect(outputs.savingsImpact).toBeDefined();
      expect(outputs.emergencyFundImpact).toBeDefined();
      expect(outputs.incomeBasedPayment).toBeGreaterThan(0);
      expect(outputs.forgivenessAmount).toBeGreaterThanOrEqual(0);
      expect(outputs.repaymentPlanComparison).toHaveLength(3);
      expect(outputs.recommendedStrategy).toBeDefined();
      expect(outputs.keyBenefits).toBeDefined();
      expect(outputs.keyRisks).toBeDefined();
    });

    it('should handle income-based repayment', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 6.8,
        loanTerm: 10,
        repaymentPlan: 'income-based',
        annualIncome: 45000,
        familySize: 1,
        filingStatus: 'single'
      };
      
      const outputs = calculateStudentLoan(inputs);
      
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.incomeBasedPayment).toBeGreaterThan(0);
      expect(outputs.forgivenessAmount).toBeGreaterThan(0);
    });

    it('should calculate refinance savings', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 8.5,
        loanTerm: 10,
        refinanceRate: 4.5,
        refinanceTerm: 7,
        refinanceFees: 2000
      };
      
      const outputs = calculateStudentLoan(inputs);
      
      expect(outputs.refinanceSavings).toBeGreaterThan(0);
      expect(outputs.refinancePayoffDate).toBeDefined();
    });

    it('should handle extra payments', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 6.8,
        loanTerm: 10,
        extraPayment: 100,
        lumpSumPayment: 5000
      };
      
      const outputs = calculateStudentLoan(inputs);
      
      expect(outputs.monthlyPayment).toBeGreaterThan(575); // Base payment + extra
      expect(outputs.totalInterest).toBeLessThan(20000); // Should be less due to extra payments
    });

    it('should generate appropriate recommendations', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 6.8,
        loanTerm: 10
      };
      
      const outputs = calculateStudentLoan(inputs);
      
      expect(outputs.recommendedStrategy).toBeDefined();
      expect(typeof outputs.recommendedStrategy).toBe('string');
      expect(outputs.recommendedStrategy.length).toBeGreaterThan(0);
      expect(outputs.keyBenefits).toBeDefined();
      expect(outputs.keyRisks).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero interest rate', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 0,
        loanTerm: 10
      };
      
      const outputs = calculateStudentLoan(inputs);
      expect(outputs.totalInterest).toBe(0);
      expect(outputs.monthlyPayment).toBe(50000 / (10 * 12));
    });

    it('should handle very high interest rates', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 15,
        loanTerm: 10
      };
      
      const outputs = calculateStudentLoan(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(800);
      expect(outputs.totalInterest).toBeGreaterThan(50000);
      expect(outputs.affordabilityScore).toBeLessThan(50);
    });

    it('should handle very large loan amounts', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 200000,
        interestRate: 6.8,
        loanTerm: 20
      };
      
      const outputs = calculateStudentLoan(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(1500);
      expect(outputs.debtToIncomeRatio).toBeGreaterThan(50);
    });

    it('should handle very short loan terms', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 6.8,
        loanTerm: 1
      };
      
      const outputs = calculateStudentLoan(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(4000);
      expect(outputs.totalInterest).toBeLessThan(5000);
    });

    it('should handle very long loan terms', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 6.8,
        loanTerm: 30
      };
      
      const outputs = calculateStudentLoan(inputs);
      expect(outputs.monthlyPayment).toBeLessThan(400);
      expect(outputs.totalInterest).toBeGreaterThan(80000);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 6.8,
        loanTerm: 10
      };
      
      const outputs = calculateStudentLoan(inputs);
      const report = generateStudentLoanAnalysis(inputs, outputs);
      
      expect(report).toContain('Student Loan Analysis Report');
      expect(report).toContain('Summary');
      expect(report).toContain('Loan Overview');
      expect(report).toContain('Basic Information');
      expect(report).toContain('Payment Analysis');
      expect(report).toContain('Financial Impact');
      expect(report).toContain('Debt-to-Income Analysis');
      expect(report).toContain('Savings Impact');
      expect(report).toContain('Repayment Plan Comparison');
      expect(report).toContain('Income-Based Repayment Analysis');
      expect(report).toContain('Refinancing Analysis');
      expect(report).toContain('Amortization Schedule');
      expect(report).toContain('Key Benefits');
      expect(report).toContain('Key Risks');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Next Steps');
      expect(report).toContain('Important Considerations');
    });

    it('should include all calculated values in report', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 6.8,
        loanTerm: 10
      };
      
      const outputs = calculateStudentLoan(inputs);
      const report = generateStudentLoanAnalysis(inputs, outputs);
      
      expect(report).toContain(outputs.recommendedStrategy);
      expect(report).toContain(outputs.affordabilityScore.toFixed(1));
      expect(report).toContain(outputs.repaymentEfficiency.toFixed(1));
      expect(report).toContain(outputs.monthlyPayment.toLocaleString());
      expect(report).toContain(outputs.totalInterest.toLocaleString());
      expect(report).toContain(outputs.totalPayments.toLocaleString());
      expect(report).toContain(outputs.debtToIncomeRatio.toFixed(1));
    });
  });

  describe('Integration', () => {
    it('should work with calculator interface', () => {
      const inputs: CalculatorInputs = {
        loanAmount: 50000,
        interestRate: 6.8,
        loanTerm: 10
      };
      
      const outputs = StudentLoanCalculator.calculate(inputs);
      const report = StudentLoanCalculator.generateReport(inputs, outputs);
      
      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
    });
  });
});
