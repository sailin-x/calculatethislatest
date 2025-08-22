import { describe, it, expect } from 'vitest';
import { calculateMortgageRefinance, generateMortgageRefinanceAnalysis } from './formulas';
import { validateMortgageRefinanceInputs } from './validation';
import { quickValidateMortgageRefinance } from './quickValidation';
import { MortgageRefinanceInputs } from './validation';

describe('Mortgage Refinance Calculator', () => {
  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      const result = validateMortgageRefinanceInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const inputs = {
        currentLoanAmount: 250000,
        currentRate: 5.5
        // Missing other required fields
      };

      const result = validateMortgageRefinanceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject invalid rates', () => {
      const inputs: Partial<MortgageRefinanceInputs> = {
        currentLoanAmount: 250000,
        currentRate: 30, // Invalid
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      const result = validateMortgageRefinanceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current rate must be between 0% and 25%');
    });

    it('should reject loan amount exceeding property value', () => {
      const inputs: Partial<MortgageRefinanceInputs> = {
        currentLoanAmount: 400000, // Exceeds property value
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      const result = validateMortgageRefinanceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current loan amount cannot exceed property value');
    });

    it('should validate cash-out refinance', () => {
      const inputs: Partial<MortgageRefinanceInputs> = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        cashOutAmount: 50000,
        propertyValue: 350000,
        refinanceType: 'cash-out',
        loanType: 'conventional'
      };

      const result = validateMortgageRefinanceInputs(inputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation with valid inputs', () => {
      const inputs: Partial<MortgageRefinanceInputs> = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      expect(quickValidateMortgageRefinance(inputs)).toBe(true);
    });

    it('should fail quick validation with missing fields', () => {
      const inputs: Partial<MortgageRefinanceInputs> = {
        currentLoanAmount: 250000,
        currentRate: 5.5
        // Missing other required fields
      };

      expect(quickValidateMortgageRefinance(inputs)).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate favorable refinance scenario', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      const result = calculateMortgageRefinance(inputs);
      
      expect(result.refinanceDecision).toBe('REFINANCE');
      expect(result.monthlySavings).toBeGreaterThan(0);
      expect(result.totalInterestSavings).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeLessThan(60);
      expect(result.loanToValueRatio).toBeLessThan(80);
    });

    it('should calculate unfavorable refinance scenario', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 4.0,
        currentTerm: 30,
        currentMonthlyPayment: 1193,
        newRate: 5.5,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      const result = calculateMortgageRefinance(inputs);
      
      expect(result.refinanceDecision).toBe('DO NOT REFINANCE - No monthly savings');
      expect(result.monthlySavings).toBeLessThan(0);
      expect(result.breakEvenMonths).toBe(Infinity);
    });

    it('should handle cash-out refinance', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        cashOutAmount: 50000,
        propertyValue: 350000,
        refinanceType: 'cash-out',
        loanType: 'conventional'
      };

      const result = calculateMortgageRefinance(inputs);
      
      expect(result.newLoanAmount).toBe(300000);
      expect(result.loanToValueRatio).toBeGreaterThan(80);
      expect(result.recommendations.some(rec => rec.includes('Cash-out'))).toBe(true);
    });

    it('should handle long break-even period', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 5.0,
        newTerm: 30,
        refinanceCosts: 10000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      const result = calculateMortgageRefinance(inputs);
      
      expect(result.breakEvenMonths).toBeGreaterThan(60);
      expect(result.refinanceDecision).toBe('DO NOT REFINANCE - Long break-even period');
    });

    it('should handle tax savings analysis', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional',
        taxRate: 24
      };

      const result = calculateMortgageRefinance(inputs);
      
      expect(result.taxAnalysis.taxSavings).toBeGreaterThan(0);
      expect(result.taxAnalysis.effectiveRate).toBeLessThan(inputs.newRate);
      expect(result.costBreakdown.taxSavings).toBeGreaterThan(0);
    });

    it('should handle investment comparison', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional',
        investmentReturn: 7
      };

      const result = calculateMortgageRefinance(inputs);
      
      expect(result.investmentAnalysis.totalInvestmentValue).toBeGreaterThan(0);
      expect(result.investmentAnalysis.opportunityCost).toBeDefined();
      expect(result.costBreakdown.investmentOpportunity).toBeGreaterThan(0);
    });
  });

  describe('Risk Assessment', () => {
    it('should assess low risk scenario', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 200000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1136,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional',
        creditScore: 750
      };

      const result = calculateMortgageRefinance(inputs);
      
      expect(result.riskAssessment.overallRisk).toBe('low');
      expect(result.riskAssessment.rateRisk).toContain('Low');
      expect(result.riskAssessment.creditRisk).toContain('Low');
    });

    it('should assess high risk scenario', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 300000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1704,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 320000,
        refinanceType: 'rate-term',
        loanType: 'conventional',
        creditScore: 600
      };

      const result = calculateMortgageRefinance(inputs);
      
      expect(result.riskAssessment.overallRisk).toBe('high');
      expect(result.riskAssessment.propertyValueRisk).toContain('High');
      expect(result.riskAssessment.creditRisk).toContain('Medium');
    });

    it('should identify risk considerations', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 280000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1590,
        newRate: 4.0,
        newTerm: 35, // Extended term
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      const result = calculateMortgageRefinance(inputs);
      
      expect(result.riskAssessment.considerations).toContain('Extended loan term increases total interest');
      expect(result.recommendations.some(rec => rec.includes('Extending loan term'))).toBe(true);
    });
  });

  describe('Amortization Analysis', () => {
    it('should calculate amortization comparison', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional',
        remainingPayments: 300
      };

      const result = calculateMortgageRefinance(inputs);
      
      expect(result.amortizationComparison.currentLoan.remainingBalance).toBe(250000);
      expect(result.amortizationComparison.currentLoan.remainingPayments).toBe(300);
      expect(result.amortizationComparison.newLoan.monthlyPayment).toBeGreaterThan(0);
      expect(result.amortizationComparison.savings.monthly).toBeGreaterThan(0);
    });
  });

  describe('Cost Breakdown', () => {
    it('should calculate comprehensive cost breakdown', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional',
        taxRate: 24,
        investmentReturn: 7
      };

      const result = calculateMortgageRefinance(inputs);
      
      expect(result.costBreakdown.refinanceCosts).toBe(5000);
      expect(result.costBreakdown.monthlySavings).toBeGreaterThan(0);
      expect(result.costBreakdown.totalSavings).toBeGreaterThan(0);
      expect(result.costBreakdown.netValue).toBeDefined();
    });
  });

  describe('Recommendations', () => {
    it('should provide recommendations for favorable refinance', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      const result = calculateMortgageRefinance(inputs);
      
      expect(result.recommendations.length).toBeGreaterThan(0);
      expect(result.recommendations.some(rec => rec.includes('favorable'))).toBe(true);
    });

    it('should provide recommendations for high LTV', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 280000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1590,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 320000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      const result = calculateMortgageRefinance(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('PMI'))).toBe(true);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional',
        taxRate: 24
      };

      const result = calculateMortgageRefinance(inputs);
      const analysis = generateMortgageRefinanceAnalysis(inputs, result);
      
      expect(analysis).toContain('Mortgage Refinance Analysis');
      expect(analysis).toContain('Refinance Decision');
      expect(analysis).toContain('Rate Comparison');
      expect(analysis).toContain('Financial Impact');
      expect(analysis).toContain('Loan Details');
      expect(analysis).toContain('Risk Assessment');
      expect(analysis).toContain('Tax Analysis');
      expect(analysis).toContain('✅ REFINANCE');
    });

    it('should generate analysis for unfavorable refinance', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 4.0,
        currentTerm: 30,
        currentMonthlyPayment: 1193,
        newRate: 5.5,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      const result = calculateMortgageRefinance(inputs);
      const analysis = generateMortgageRefinanceAnalysis(inputs, result);
      
      expect(analysis).toContain('❌ DO NOT REFINANCE');
      expect(analysis).toContain('Recommendations');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero refinance costs', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 0,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      const result = calculateMortgageRefinance(inputs);
      expect(result.breakEvenMonths).toBe(0);
    });

    it('should handle no monthly savings', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 250000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1420,
        newRate: 5.5, // Same rate
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 350000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      const result = calculateMortgageRefinance(inputs);
      expect(result.monthlySavings).toBe(0);
      expect(result.breakEvenMonths).toBe(Infinity);
    });

    it('should handle very high LTV', () => {
      const inputs: MortgageRefinanceInputs = {
        currentLoanAmount: 300000,
        currentRate: 5.5,
        currentTerm: 30,
        currentMonthlyPayment: 1704,
        newRate: 4.0,
        newTerm: 30,
        refinanceCosts: 5000,
        propertyValue: 320000,
        refinanceType: 'rate-term',
        loanType: 'conventional'
      };

      const result = calculateMortgageRefinance(inputs);
      expect(result.loanToValueRatio).toBeGreaterThan(90);
      expect(result.riskAssessment.overallRisk).toBe('high');
    });
  });
});