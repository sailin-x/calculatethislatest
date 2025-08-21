import { describe, it, expect } from 'vitest';
import { calculateMortgageInsurance, generateMortgageInsuranceAnalysis } from './formulas';
import { validateMortgageInsuranceInputs } from './validation';
import { quickValidateMortgageInsurance } from './quickValidation';
import { MortgageInsuranceInputs } from './validation';

describe('Mortgage Insurance Calculator', () => {
  const validInputs: MortgageInsuranceInputs = {
    loanAmount: 300000,
    propertyValue: 375000,
    downPayment: 75000,
    downPaymentPercentage: 20,
    loanType: 'Conventional',
    creditScore: 750,
    debtToIncomeRatio: 35,
    propertyType: 'Primary Residence',
    occupancyType: 'Owner Occupied',
    loanTerm: 30,
    interestRate: 4.5,
    monthlyPayment: 1520,
    pmiRate: 0.5,
    pmiCancellationThreshold: 78,
    propertyAppreciationRate: 3,
    additionalPrincipalPayment: 100,
    refinanceOption: 'No Refinance',
    timeHorizon: 5
  };

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgageInsuranceInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.loanAmount;
      
      const result = validateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount is required and must be greater than 0');
    });

    it('should reject invalid loan amount', () => {
      const invalidInputs = { ...validInputs, loanAmount: -1000 };
      
      const result = validateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount is required and must be greater than 0');
    });

    it('should reject loan amount exceeding property value', () => {
      const invalidInputs = { ...validInputs, loanAmount: 400000, propertyValue: 350000 };
      
      const result = validateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount cannot exceed property value');
    });

    it('should reject invalid credit score', () => {
      const invalidInputs = { ...validInputs, creditScore: 200 };
      
      const result = validateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Credit score must be between 300 and 850');
    });

    it('should reject invalid PMI rate', () => {
      const invalidInputs = { ...validInputs, pmiRate: 3 };
      
      const result = validateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('PMI rate must be between 0% and 2%');
    });

    it('should reject incompatible loan type and property type', () => {
      const invalidInputs = { ...validInputs, loanType: 'VA', propertyType: 'Investment Property' };
      
      const result = validateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('VA loans are not available for Investment Property');
    });

    it('should reject invalid refinance option for loan type', () => {
      const invalidInputs = { ...validInputs, loanType: 'Conventional', refinanceOption: 'FHA Streamline' };
      
      const result = validateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('FHA Streamline refinancing is only available for existing FHA loans');
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation for valid inputs', () => {
      expect(quickValidateMortgageInsurance(validInputs)).toBe(true);
    });

    it('should fail quick validation for missing loan amount', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.loanAmount;
      expect(quickValidateMortgageInsurance(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for invalid property value', () => {
      const invalidInputs = { ...validInputs, propertyValue: -1000 };
      expect(quickValidateMortgageInsurance(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for loan amount exceeding property value', () => {
      const invalidInputs = { ...validInputs, loanAmount: 400000, propertyValue: 350000 };
      expect(quickValidateMortgageInsurance(invalidInputs)).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate conventional loan PMI correctly', () => {
      const inputs = { ...validInputs, loanAmount: 320000, propertyValue: 400000 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.loanToValueRatio).toBe(80);
      expect(result.insuranceRequired).toBe(false);
      expect(result.insuranceType).toBe('Private Mortgage Insurance (PMI)');
      expect(result.annualInsuranceCost).toBe(0);
      expect(result.monthlyInsuranceCost).toBe(0);
    });

    it('should calculate FHA loan MIP correctly', () => {
      const inputs = { ...validInputs, loanType: 'FHA', loanAmount: 300000, propertyValue: 375000 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.loanToValueRatio).toBe(80);
      expect(result.insuranceRequired).toBe(true);
      expect(result.insuranceType).toBe('FHA Mortgage Insurance Premium (MIP)');
      expect(result.annualInsuranceCost).toBe(2550); // 300000 * 0.0085
      expect(result.monthlyInsuranceCost).toBe(212.5); // 2550 / 12
      expect(result.upfrontInsuranceCost).toBe(5250); // 300000 * 0.0175
    });

    it('should calculate VA loan funding fee correctly', () => {
      const inputs = { ...validInputs, loanType: 'VA', loanAmount: 300000, propertyValue: 375000 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.loanToValueRatio).toBe(80);
      expect(result.insuranceRequired).toBe(false);
      expect(result.insuranceType).toBe('VA Funding Fee');
      expect(result.annualInsuranceCost).toBe(0);
      expect(result.monthlyInsuranceCost).toBe(0);
      expect(result.upfrontInsuranceCost).toBe(6900); // 300000 * 0.023
    });

    it('should calculate USDA loan guarantee fee correctly', () => {
      const inputs = { ...validInputs, loanType: 'USDA', loanAmount: 300000, propertyValue: 375000 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.loanToValueRatio).toBe(80);
      expect(result.insuranceRequired).toBe(true);
      expect(result.insuranceType).toBe('USDA Guarantee Fee');
      expect(result.annualInsuranceCost).toBe(3000); // 300000 * 0.01
      expect(result.monthlyInsuranceCost).toBe(250); // 3000 / 12
      expect(result.upfrontInsuranceCost).toBe(0);
    });

    it('should calculate high LTV conventional loan PMI correctly', () => {
      const inputs = { ...validInputs, loanAmount: 360000, propertyValue: 400000 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.loanToValueRatio).toBe(90);
      expect(result.insuranceRequired).toBe(true);
      expect(result.insuranceType).toBe('Private Mortgage Insurance (PMI)');
      expect(result.annualInsuranceCost).toBe(2160); // 360000 * 0.006 (adjusted for credit score)
      expect(result.monthlyInsuranceCost).toBe(180); // 2160 / 12
    });

    it('should calculate jumbo loan PMI correctly', () => {
      const inputs = { ...validInputs, loanType: 'Jumbo', loanAmount: 800000, propertyValue: 1000000 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.loanToValueRatio).toBe(80);
      expect(result.insuranceRequired).toBe(true);
      expect(result.insuranceType).toBe('Private Mortgage Insurance (PMI)');
      expect(result.annualInsuranceCost).toBe(6000); // 800000 * 0.0075 (1.5x base rate)
      expect(result.monthlyInsuranceCost).toBe(500); // 6000 / 12
    });
  });

  describe('Cancellation Analysis', () => {
    it('should allow immediate cancellation for LTV <= 78%', () => {
      const inputs = { ...validInputs, loanAmount: 300000, propertyValue: 400000 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.cancellationAnalysis.canCancelNow).toBe(true);
      expect(result.cancellationAnalysis.savingsFromCancellation).toBeGreaterThan(0);
      expect(result.cancellationAnalysis.cancellationStrategy).toContain('immediately');
    });

    it('should calculate cancellation timeline for high LTV', () => {
      const inputs = { ...validInputs, loanAmount: 360000, propertyValue: 400000 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.cancellationAnalysis.canCancelNow).toBe(false);
      expect(result.cancellationAnalysis.yearsToAutomaticCancellation).toBeGreaterThan(0);
      expect(result.cancellationAnalysis.remainingInsuranceCost).toBeGreaterThan(0);
    });

    it('should calculate additional payment impact on cancellation', () => {
      const inputs = { ...validInputs, loanAmount: 360000, propertyValue: 400000, additionalPrincipalPayment: 200 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.cancellationAnalysis.yearsToAutomaticCancellation).toBeLessThan(
        calculateMortgageInsurance({ ...validInputs, loanAmount: 360000, propertyValue: 400000 }).cancellationAnalysis.yearsToAutomaticCancellation!
      );
    });
  });

  describe('Refinance Analysis', () => {
    it('should not recommend refinancing when not viable', () => {
      const inputs = { ...validInputs, refinanceOption: 'No Refinance' };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.refinanceAnalysis.refinanceViable).toBe(false);
      expect(result.refinanceAnalysis.totalSavings).toBe(0);
    });

    it('should calculate refinancing benefits correctly', () => {
      const inputs = { 
        ...validInputs, 
        refinanceOption: 'Conventional Refinance',
        refinanceRate: 3.5,
        refinanceClosingCosts: 5000
      };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.refinanceAnalysis.refinanceViable).toBe(true);
      expect(result.refinanceAnalysis.monthlySavings).toBeGreaterThan(0);
      expect(result.refinanceAnalysis.breakEvenMonths).toBeGreaterThan(0);
    });
  });

  describe('Cost Comparison', () => {
    it('should provide alternative insurance options', () => {
      const inputs = { ...validInputs, loanType: 'FHA' };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.costComparison.alternativeOptions.length).toBeGreaterThan(0);
      expect(result.costComparison.bestOption).toBeDefined();
      expect(result.costComparison.potentialSavings).toBeGreaterThanOrEqual(0);
    });

    it('should identify best option correctly', () => {
      const inputs = { ...validInputs, loanType: 'Conventional', loanAmount: 360000, propertyValue: 400000 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.costComparison.currentInsuranceCost).toBeGreaterThan(0);
      expect(result.costComparison.bestOption).toBeDefined();
    });
  });

  describe('Savings Analysis', () => {
    it('should calculate total potential savings', () => {
      const inputs = { ...validInputs, loanAmount: 360000, propertyValue: 400000 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.savingsAnalysis.totalInsuranceCost).toBeGreaterThan(0);
      expect(result.savingsAnalysis.potentialSavings).toBeGreaterThanOrEqual(0);
      expect(result.savingsAnalysis.savingsBreakdown).toBeDefined();
      expect(result.savingsAnalysis.roiAnalysis).toBeDefined();
    });

    it('should calculate ROI for additional payments', () => {
      const inputs = { ...validInputs, loanAmount: 360000, propertyValue: 400000, additionalPrincipalPayment: 200 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.savingsAnalysis.roiAnalysis.investmentAmount).toBe(12000); // 200 * 12 * 5
      expect(result.savingsAnalysis.roiAnalysis.roi).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Key Metrics', () => {
    it('should calculate key metrics correctly', () => {
      const inputs = { ...validInputs, loanAmount: 360000, propertyValue: 400000 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.keyMetrics.ltvRatio).toBe(90);
      expect(result.keyMetrics.insuranceBurden).toBeGreaterThan(0);
      expect(result.keyMetrics.cancellationTimeline).toBeDefined();
      expect(result.keyMetrics.costEfficiency).toBeDefined();
      expect(result.keyMetrics.riskAssessment).toBeDefined();
    });

    it('should assess risk based on LTV', () => {
      const highLTVInputs = { ...validInputs, loanAmount: 380000, propertyValue: 400000 };
      const highLTVResult = calculateMortgageInsurance(highLTVInputs);
      expect(highLTVResult.keyMetrics.riskAssessment).toBe('High');

      const lowLTVInputs = { ...validInputs, loanAmount: 300000, propertyValue: 400000 };
      const lowLTVResult = calculateMortgageInsurance(lowLTVInputs);
      expect(lowLTVResult.keyMetrics.riskAssessment).toBe('Low');
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = { ...validInputs, loanAmount: 360000, propertyValue: 400000 };
      const result = calculateMortgageInsurance(inputs);
      const report = generateMortgageInsuranceAnalysis(inputs, result);
      
      expect(report).toContain('Mortgage Insurance Analysis Report');
      expect(report).toContain('Current Situation');
      expect(report).toContain('Cancellation Analysis');
      expect(report).toContain('Cost Analysis');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Key Takeaways');
    });

    it('should include specific recommendations', () => {
      const inputs = { ...validInputs, loanAmount: 360000, propertyValue: 400000 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.recommendations).toBeDefined();
      expect(result.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero property appreciation', () => {
      const inputs = { ...validInputs, propertyAppreciationRate: 0 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.savingsAnalysis.savingsBreakdown.fromPropertyAppreciation).toBe(0);
    });

    it('should handle negative property appreciation', () => {
      const inputs = { ...validInputs, propertyAppreciationRate: -2 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.savingsAnalysis.savingsBreakdown.fromPropertyAppreciation).toBe(0);
    });

    it('should handle maximum loan amounts', () => {
      const inputs = { ...validInputs, loanAmount: 5000000, propertyValue: 6000000 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.loanToValueRatio).toBe(83.33);
      expect(result.insuranceRequired).toBe(true);
    });

    it('should handle minimum loan amounts', () => {
      const inputs = { ...validInputs, loanAmount: 10000, propertyValue: 12500 };
      const result = calculateMortgageInsurance(inputs);
      
      expect(result.loanToValueRatio).toBe(80);
      expect(result.insuranceRequired).toBe(false);
    });

    it('should handle different loan terms', () => {
      const inputs15 = { ...validInputs, loanTerm: 15 };
      const inputs30 = { ...validInputs, loanTerm: 30 };
      
      const result15 = calculateMortgageInsurance(inputs15);
      const result30 = calculateMortgageInsurance(inputs30);
      
      expect(result15.totalInsuranceCost).toBeLessThan(result30.totalInsuranceCost);
    });
  });
});