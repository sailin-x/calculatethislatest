import { describe, it, expect } from 'vitest';
import { calculateMortgagePayment, generateMortgagePaymentAnalysis } from './formulas';
import { validateMortgagePaymentInputs } from './validation';
import { quickValidateMortgagePayment } from './quickValidation';
import { MortgagePaymentInputs } from './validation';

describe('Mortgage Payment Calculator', () => {
  const validInputs: MortgagePaymentInputs = {
    loanAmount: 250000,
    interestRate: 4.5,
    loanTerm: 30,
    loanType: 'conventional',
    downPayment: 50000,
    downPaymentPercent: 20,
    propertyValue: 300000,
    propertyTax: 3000,
    propertyTaxRate: 1.2,
    homeInsurance: 1200,
    pmi: 0.5,
    hoaFees: 200,
    closingCosts: 8000,
    armInitialRate: 3.5,
    armFixedPeriod: 5,
    armMargin: 2.5,
    armCap: 2,
    armLifetimeCap: 5,
    fhaUpfrontMIP: 1.75,
    fhaAnnualMIP: 0.85,
    vaFundingFee: 2.3,
    usdaGuaranteeFee: 1,
    includeTaxes: true,
    includeInsurance: true,
    includePMI: true,
    includeHOA: false,
    amortizationSchedule: true,
    schedulePeriods: 12,
    extraPayment: 100,
    lumpSumPayment: 10000,
    lumpSumMonth: 12,
    biweeklyPayment: false,
    compareScenarios: true
  };

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgagePaymentInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.loanAmount;
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount is required and must be greater than 0');
    });

    it('should reject invalid loan amount', () => {
      const invalidInputs = { ...validInputs, loanAmount: -1000 };
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount is required and must be greater than 0');
    });

    it('should reject invalid interest rate', () => {
      const invalidInputs = { ...validInputs, interestRate: 30 };
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0% and 25%');
    });

    it('should reject invalid loan term', () => {
      const invalidInputs = { ...validInputs, loanTerm: 60 };
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be between 1 and 50 years');
    });

    it('should reject invalid loan type', () => {
      const invalidInputs = { ...validInputs, loanType: 'invalid' as any };
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Valid loan type is required');
    });

    it('should reject loan amount exceeding property value', () => {
      const invalidInputs = { ...validInputs, loanAmount: 400000, propertyValue: 300000 };
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount cannot exceed property value');
    });

    it('should reject negative down payment', () => {
      const invalidInputs = { ...validInputs, downPayment: -1000 };
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment cannot be negative');
    });

    it('should reject invalid down payment percentage', () => {
      const invalidInputs = { ...validInputs, downPaymentPercent: 150 };
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment percentage must be between 0% and 100%');
    });

    it('should reject negative property tax', () => {
      const invalidInputs = { ...validInputs, propertyTax: -100 };
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property tax cannot be negative');
    });

    it('should reject invalid PMI rate', () => {
      const invalidInputs = { ...validInputs, pmi: 10 };
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('PMI rate must be between 0% and 5%');
    });

    it('should reject ARM with invalid initial rate', () => {
      const invalidInputs = { ...validInputs, loanType: 'arm', armInitialRate: 30 };
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('ARM initial rate must be between 0.1% and 25%');
    });

    it('should reject FHA with invalid upfront MIP', () => {
      const invalidInputs = { ...validInputs, loanType: 'fha', fhaUpfrontMIP: 10 };
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('FHA upfront MIP must be between 0% and 5%');
    });

    it('should reject negative extra payment', () => {
      const invalidInputs = { ...validInputs, extraPayment: -100 };
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Extra payment cannot be negative');
    });

    it('should reject negative lump sum payment', () => {
      const invalidInputs = { ...validInputs, lumpSumPayment: -1000 };
      
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Lump sum payment cannot be negative');
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation for valid inputs', () => {
      expect(quickValidateMortgagePayment(validInputs)).toBe(true);
    });

    it('should fail quick validation for missing loan amount', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.loanAmount;
      expect(quickValidateMortgagePayment(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for invalid interest rate', () => {
      const invalidInputs = { ...validInputs, interestRate: 30 };
      expect(quickValidateMortgagePayment(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for invalid loan term', () => {
      const invalidInputs = { ...validInputs, loanTerm: 60 };
      expect(quickValidateMortgagePayment(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for invalid loan type', () => {
      const invalidInputs = { ...validInputs, loanType: 'invalid' as any };
      expect(quickValidateMortgagePayment(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for loan amount exceeding property value', () => {
      const invalidInputs = { ...validInputs, loanAmount: 400000, propertyValue: 300000 };
      expect(quickValidateMortgagePayment(invalidInputs)).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate monthly payment correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.monthlyPayment).toBeLessThan(inputs.loanAmount);
    });

    it('should calculate total monthly payment correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.totalMonthlyPayment).toBeGreaterThan(result.monthlyPayment);
    });

    it('should calculate total interest correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.totalInterest).toBeGreaterThan(0);
      const calculatedTotalInterest = (result.monthlyPayment * inputs.loanTerm * 12) - inputs.loanAmount;
      expect(result.totalInterest).toBeCloseTo(calculatedTotalInterest, 0);
    });

    it('should calculate loan-to-value ratio correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      
      const expectedLTV = (inputs.loanAmount / inputs.propertyValue!) * 100;
      expect(result.loanToValue).toBeCloseTo(expectedLTV, 1);
    });

    it('should calculate down payment correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.downPaymentAmount).toBe(inputs.downPayment);
      expect(result.downPaymentPercentage).toBe(inputs.downPaymentPercent);
    });

    it('should handle FHA loan calculations', () => {
      const inputs = { ...validInputs, loanType: 'fha' };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalMonthlyPayment).toBeGreaterThan(result.monthlyPayment);
    });

    it('should handle VA loan calculations', () => {
      const inputs = { ...validInputs, loanType: 'va' };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalMonthlyPayment).toBeGreaterThan(result.monthlyPayment);
    });

    it('should handle ARM loan calculations', () => {
      const inputs = { ...validInputs, loanType: 'arm' };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalMonthlyPayment).toBeGreaterThan(result.monthlyPayment);
    });

    it('should handle jumbo loan calculations', () => {
      const inputs = { ...validInputs, loanType: 'jumbo', loanAmount: 800000, propertyValue: 1000000 };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalMonthlyPayment).toBeGreaterThan(result.monthlyPayment);
    });
  });

  describe('Payment Breakdown', () => {
    it('should calculate payment breakdown correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.paymentBreakdown.principalAndInterest).toBe(result.monthlyPayment);
      expect(result.paymentBreakdown.totalPayment).toBe(result.totalMonthlyPayment);
      expect(result.paymentBreakdown.breakdownPercentages.principalAndInterest).toBeGreaterThan(0);
    });

    it('should include property taxes when specified', () => {
      const inputs = { ...validInputs, includeTaxes: true };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.paymentBreakdown.propertyTax).toBeGreaterThan(0);
    });

    it('should exclude property taxes when not specified', () => {
      const inputs = { ...validInputs, includeTaxes: false };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.paymentBreakdown.propertyTax).toBe(0);
    });

    it('should include insurance when specified', () => {
      const inputs = { ...validInputs, includeInsurance: true };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.paymentBreakdown.homeInsurance).toBeGreaterThan(0);
    });

    it('should include PMI when LTV > 80%', () => {
      const inputs = { ...validInputs, downPayment: 20000, propertyValue: 300000, includePMI: true };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.paymentBreakdown.pmi).toBeGreaterThan(0);
    });

    it('should not include PMI when LTV <= 80%', () => {
      const inputs = { ...validInputs, downPayment: 100000, propertyValue: 300000, includePMI: true };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.paymentBreakdown.pmi).toBe(0);
    });
  });

  describe('Amortization Schedule', () => {
    it('should generate amortization schedule when requested', () => {
      const inputs = { ...validInputs, amortizationSchedule: true };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.amortizationSchedule.length).toBeGreaterThan(0);
      expect(result.amortizationSchedule.length).toBeLessThanOrEqual(inputs.schedulePeriods || 12);
    });

    it('should not generate amortization schedule when not requested', () => {
      const inputs = { ...validInputs, amortizationSchedule: false };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.amortizationSchedule.length).toBe(0);
    });

    it('should calculate amortization entries correctly', () => {
      const inputs = { ...validInputs, amortizationSchedule: true };
      const result = calculateMortgagePayment(inputs);
      
      const firstEntry = result.amortizationSchedule[0];
      expect(firstEntry.paymentNumber).toBe(1);
      expect(firstEntry.beginningBalance).toBe(inputs.loanAmount);
      expect(firstEntry.principalPayment).toBeGreaterThan(0);
      expect(firstEntry.interestPayment).toBeGreaterThan(0);
      expect(firstEntry.endingBalance).toBeLessThan(firstEntry.beginningBalance);
    });

    it('should handle extra payments in amortization', () => {
      const inputs = { ...validInputs, amortizationSchedule: true, extraPayment: 100 };
      const result = calculateMortgagePayment(inputs);
      
      const firstEntry = result.amortizationSchedule[0];
      expect(firstEntry.monthlyPayment).toBe(result.monthlyPayment + inputs.extraPayment);
      expect(firstEntry.principalPayment).toBeGreaterThan(result.monthlyPayment - firstEntry.interestPayment);
    });

    it('should handle lump sum payments in amortization', () => {
      const inputs = { ...validInputs, amortizationSchedule: true, lumpSumPayment: 10000, lumpSumMonth: 1 };
      const result = calculateMortgagePayment(inputs);
      
      const firstEntry = result.amortizationSchedule[0];
      expect(firstEntry.monthlyPayment).toBe(result.monthlyPayment + inputs.lumpSumPayment);
      expect(firstEntry.principalPayment).toBeGreaterThan(result.monthlyPayment - firstEntry.interestPayment);
    });
  });

  describe('Scenario Comparison', () => {
    it('should generate scenario comparison when requested', () => {
      const inputs = { ...validInputs, compareScenarios: true };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.scenarioComparison.scenarios.length).toBeGreaterThan(0);
      expect(result.scenarioComparison.bestScenario).toBeDefined();
    });

    it('should not generate scenario comparison when not requested', () => {
      const inputs = { ...validInputs, compareScenarios: false };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.scenarioComparison.scenarios.length).toBe(0);
    });

    it('should include current scenario in comparison', () => {
      const inputs = { ...validInputs, compareScenarios: true };
      const result = calculateMortgagePayment(inputs);
      
      const currentScenario = result.scenarioComparison.scenarios.find(s => s.name === 'Current Terms');
      expect(currentScenario).toBeDefined();
      expect(currentScenario!.monthlyPayment).toBe(result.monthlyPayment);
    });

    it('should include 15-year scenario when loan term > 15', () => {
      const inputs = { ...validInputs, compareScenarios: true, loanTerm: 30 };
      const result = calculateMortgagePayment(inputs);
      
      const scenario15 = result.scenarioComparison.scenarios.find(s => s.name === '15-Year Fixed');
      expect(scenario15).toBeDefined();
      expect(scenario15!.yearsToPayoff).toBe(15);
    });

    it('should include lower rate scenario', () => {
      const inputs = { ...validInputs, compareScenarios: true };
      const result = calculateMortgagePayment(inputs);
      
      const lowerRateScenario = result.scenarioComparison.scenarios.find(s => s.name === 'Lower Rate');
      expect(lowerRateScenario).toBeDefined();
      expect(lowerRateScenario!.monthlyPayment).toBeLessThan(result.monthlyPayment);
    });

    it('should identify best scenario by total cost', () => {
      const inputs = { ...validInputs, compareScenarios: true };
      const result = calculateMortgagePayment(inputs);
      
      const scenarios = result.scenarioComparison.scenarios;
      const bestScenario = scenarios.reduce((best, current) => 
        current.totalCost < best.totalCost ? current : best
      );
      
      expect(result.scenarioComparison.bestScenario).toBe(bestScenario.name);
    });
  });

  describe('Affordability Analysis', () => {
    it('should calculate affordability analysis correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.affordabilityAnalysis.frontEndRatio).toBeGreaterThan(0);
      expect(result.affordabilityAnalysis.backEndRatio).toBeGreaterThan(0);
      expect(result.affordabilityAnalysis.affordabilityStatus).toBeDefined();
      expect(result.affordabilityAnalysis.recommendedIncome).toBeGreaterThan(0);
    });

    it('should assess affordability status correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      
      const status = result.affordabilityAnalysis.affordabilityStatus;
      expect(['Affordable', 'Barely Affordable', 'Not Affordable']).toContain(status);
    });

    it('should calculate debt-to-income analysis', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.affordabilityAnalysis.debtToIncomeAnalysis.currentDTI).toBeGreaterThan(0);
      expect(result.affordabilityAnalysis.debtToIncomeAnalysis.recommendedDTI).toBe(36);
      expect(result.affordabilityAnalysis.debtToIncomeAnalysis.status).toBeDefined();
    });
  });

  describe('Cost Analysis', () => {
    it('should calculate cost analysis correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.costAnalysis.totalLoanCost).toBeGreaterThan(0);
      expect(result.costAnalysis.interestCost).toBeGreaterThan(0);
      expect(result.costAnalysis.costEfficiency).toBeDefined();
      expect(result.costAnalysis.savingsOpportunities.length).toBeGreaterThanOrEqual(0);
    });

    it('should assess cost efficiency correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      
      const efficiency = result.costAnalysis.costEfficiency;
      expect(['Excellent', 'Good', 'Fair', 'Poor']).toContain(efficiency);
    });

    it('should identify savings opportunities', () => {
      const inputs = { ...validInputs, pmi: 1.0, interestRate: 6.0, hoaFees: 500 };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.costAnalysis.savingsOpportunities.length).toBeGreaterThan(0);
    });

    it('should calculate cost breakdown correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.costAnalysis.costBreakdown.principal).toBe(inputs.loanAmount);
      expect(result.costAnalysis.costBreakdown.interest).toBe(result.totalInterest);
      expect(result.costAnalysis.costBreakdown.taxes).toBeGreaterThan(0);
      expect(result.costAnalysis.costBreakdown.insurance).toBeGreaterThan(0);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      const report = generateMortgagePaymentAnalysis(inputs, result);
      
      expect(report).toContain('Mortgage Payment Analysis Report');
      expect(report).toContain('Summary');
      expect(report).toContain('Payment Breakdown');
      expect(report).toContain('Cost Analysis');
      expect(report).toContain('Affordability Analysis');
      expect(report).toContain('Loan Details');
      expect(report).toContain('Scenario Comparison');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Next Steps');
    });

    it('should include specific amounts in report', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayment(inputs);
      const report = generateMortgagePaymentAnalysis(inputs, result);
      
      expect(report).toContain(inputs.loanAmount.toLocaleString());
      expect(report).toContain(inputs.interestRate.toString());
      expect(report).toContain(inputs.loanTerm.toString());
      expect(report).toContain(result.monthlyPayment.toLocaleString());
      expect(report).toContain(result.totalMonthlyPayment.toLocaleString());
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero interest rate', () => {
      const inputs = { ...validInputs, interestRate: 0 };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.monthlyPayment).toBe(inputs.loanAmount / (inputs.loanTerm * 12));
      expect(result.totalInterest).toBe(0);
    });

    it('should handle very high interest rate', () => {
      const inputs = { ...validInputs, interestRate: 20 };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalInterest).toBeGreaterThan(inputs.loanAmount);
    });

    it('should handle very short loan term', () => {
      const inputs = { ...validInputs, loanTerm: 1 };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalInterest).toBeLessThan(inputs.loanAmount);
    });

    it('should handle very long loan term', () => {
      const inputs = { ...validInputs, loanTerm: 50 };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalInterest).toBeGreaterThan(inputs.loanAmount);
    });

    it('should handle very small loan amount', () => {
      const inputs = { ...validInputs, loanAmount: 1000 };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalInterest).toBeGreaterThan(0);
    });

    it('should handle very large loan amount', () => {
      const inputs = { ...validInputs, loanAmount: 1000000, propertyValue: 1200000 };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalInterest).toBeGreaterThan(inputs.loanAmount);
    });

    it('should handle no down payment', () => {
      const inputs = { ...validInputs, downPayment: 0, downPaymentPercent: 0 };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.downPaymentAmount).toBe(0);
      expect(result.downPaymentPercentage).toBe(0);
      expect(result.loanToValue).toBe(100);
    });

    it('should handle 100% down payment', () => {
      const inputs = { ...validInputs, downPayment: 300000, downPaymentPercent: 100 };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.downPaymentAmount).toBe(300000);
      expect(result.downPaymentPercentage).toBe(100);
      expect(result.loanToValue).toBe(0);
    });

    it('should handle no property value', () => {
      const inputs = { ...validInputs };
      delete inputs.propertyValue;
      const result = calculateMortgagePayment(inputs);
      
      expect(result.loanToValue).toBe(0);
    });

    it('should handle no additional costs', () => {
      const inputs = { ...validInputs, includeTaxes: false, includeInsurance: false, includePMI: false, includeHOA: false };
      const result = calculateMortgagePayment(inputs);
      
      expect(result.totalMonthlyPayment).toBe(result.monthlyPayment);
      expect(result.paymentBreakdown.propertyTax).toBe(0);
      expect(result.paymentBreakdown.homeInsurance).toBe(0);
      expect(result.paymentBreakdown.pmi).toBe(0);
      expect(result.paymentBreakdown.hoaFees).toBe(0);
    });
  });
});