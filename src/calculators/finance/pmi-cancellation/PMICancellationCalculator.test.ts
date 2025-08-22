import { describe, it, expect } from 'vitest';
import { calculatePMICancellation, generatePMICancellationAnalysis } from './formulas';
import { validatePMICancellationInputs } from './validation';
import { quickValidatePMICancellation } from './quickValidation';
import { PMICancellationInputs } from './validation';

describe('PMI Cancellation Calculator', () => {
  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = validatePMICancellationInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const inputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000
        // Missing other required fields
      };

      const result = validatePMICancellationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject negative original loan amount', () => {
      const inputs: Partial<PMICancellationInputs> = {
        originalLoanAmount: -100000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = validatePMICancellationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Original loan amount is required and must be greater than 0');
    });

    it('should reject current balance exceeding original loan', () => {
      const inputs: Partial<PMICancellationInputs> = {
        originalLoanAmount: 300000,
        currentLoanBalance: 350000, // Exceeds original loan
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = validatePMICancellationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current loan balance cannot exceed original loan amount');
    });

    it('should reject invalid loan start date', () => {
      const inputs: Partial<PMICancellationInputs> = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2025-01-15' // Future date
      };

      const result = validatePMICancellationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan start date cannot be in the future');
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation with valid inputs', () => {
      const inputs: Partial<PMICancellationInputs> = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      expect(quickValidatePMICancellation(inputs)).toBe(true);
    });

    it('should fail quick validation with missing fields', () => {
      const inputs: Partial<PMICancellationInputs> = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000
        // Missing other required fields
      };

      expect(quickValidatePMICancellation(inputs)).toBe(false);
    });

    it('should fail quick validation with invalid LTV', () => {
      const inputs: Partial<PMICancellationInputs> = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15',
        currentPropertyValue: 250000 // Creates LTV > 100%
      };

      expect(quickValidatePMICancellation(inputs)).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate current LTV correctly', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        currentPropertyValue: 400000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.currentLTV).toBe(70); // 280000 / 400000 * 100
    });

    it('should determine cancellation LTV based on loan type', () => {
      const conventionalInputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const fhaInputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'fha',
        loanStartDate: '2020-01-15'
      };

      const conventionalResult = calculatePMICancellation(conventionalInputs);
      const fhaResult = calculatePMICancellation(fhaInputs);
      
      expect(conventionalResult.cancellationLTV).toBe(78); // Automatic cancellation
      expect(fhaResult.cancellationLTV).toBe(78); // FHA requirement
    });

    it('should calculate PMI savings correctly', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = calculatePMICancellation(inputs);
      
      const expectedMonthlyPMI = 280000 * 0.005 / 12; // 116.67
      expect(result.monthlySavings).toBeCloseTo(expectedMonthlyPMI, 2);
      expect(result.annualSavings).toBeCloseTo(expectedMonthlyPMI * 12, 2);
    });

    it('should calculate equity analysis correctly', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        currentPropertyValue: 400000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.equityAnalysis.currentEquity).toBe(120000); // 400000 - 280000
      expect(result.equityAnalysis.currentEquityPercentage).toBe(30); // 120000 / 400000 * 100
      expect(result.equityAnalysis.equityNeeded).toBe(312000); // 400000 * 0.78
      expect(result.equityAnalysis.equityGap).toBe(-32000); // 280000 - 312000 (negative means already below threshold)
    });

    it('should calculate months to cancellation correctly', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        currentPropertyValue: 350000, // Lower value to require more payments
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15',
        interestRate: 4.5,
        loanTerm: 30
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.monthsToCancellation).toBeGreaterThan(0);
      expect(result.cancellationDate).toBeDefined();
    });

    it('should calculate break-even analysis correctly', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15',
        appraisalCost: 500
      };

      const result = calculatePMICancellation(inputs);
      
      const expectedBreakEven = Math.ceil(500 / result.monthlySavings);
      expect(result.breakEvenMonths).toBe(expectedBreakEven);
    });
  });

  describe('Payment Analysis', () => {
    it('should calculate payment reduction correctly', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15',
        monthlyPayment: 1500
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.paymentAnalysis.currentPayment).toBe(1500 + result.monthlySavings);
      expect(result.paymentAnalysis.paymentAfterCancellation).toBe(1500);
      expect(result.paymentAnalysis.paymentReduction).toBe(result.monthlySavings);
    });

    it('should calculate payment reduction percentage correctly', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15',
        monthlyPayment: 1500
      };

      const result = calculatePMICancellation(inputs);
      
      const expectedPercentage = (result.monthlySavings / result.paymentAnalysis.currentPayment) * 100;
      expect(result.paymentAnalysis.paymentReductionPercentage).toBeCloseTo(expectedPercentage, 1);
    });
  });

  describe('Refinance Analysis', () => {
    it('should calculate refinance savings correctly', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15',
        monthlyPayment: 1500,
        includeRefinance: true,
        newInterestRate: 4.0,
        refinanceCosts: 3000
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.refinanceAnalysis.refinanceSavings).toBeGreaterThan(0);
      expect(result.refinanceAnalysis.refinanceBreakEven).toBeGreaterThan(0);
      expect(result.refinanceAnalysis.newPayment).toBeGreaterThan(0);
    });

    it('should provide refinance recommendations', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15',
        includeRefinance: true,
        newInterestRate: 3.5, // Much lower rate
        refinanceCosts: 3000
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.refinanceAnalysis.refinanceRecommendation).toContain('recommended');
    });
  });

  describe('Cancellation Options', () => {
    it('should identify available cancellation options', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        currentPropertyValue: 400000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.cancellationOptions.length).toBeGreaterThan(0);
      expect(result.cancellationOptions.some(option => option.includes('80%'))).toBe(true);
    });

    it('should include lump sum payment option when applicable', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        currentPropertyValue: 350000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15',
        lumpSumPayment: 5000
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.cancellationOptions.some(option => option.includes('Lump sum'))).toBe(true);
    });
  });

  describe('Recommendations', () => {
    it('should provide immediate cancellation recommendation when LTV is low enough', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        currentPropertyValue: 400000, // Creates LTV of 70%
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('immediately'))).toBe(true);
    });

    it('should provide timeline-based recommendations', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        currentPropertyValue: 350000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('Timeline Analysis', () => {
    it('should calculate key dates correctly', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.timelineAnalysis.keyMilestones.length).toBeGreaterThan(0);
      expect(result.timelineAnalysis.keyMilestones.some(milestone => milestone.includes('Current LTV'))).toBe(true);
      expect(result.timelineAnalysis.keyMilestones.some(milestone => milestone.includes('Target LTV'))).toBe(true);
    });
  });

  describe('Cost-Benefit Analysis', () => {
    it('should calculate benefit-cost ratio correctly', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15',
        appraisalCost: 500
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.costBenefitAnalysis.benefitCostRatio).toBeGreaterThan(0);
      expect(result.costBenefitAnalysis.netBenefit).toBeGreaterThan(0);
      expect(result.costBenefitAnalysis.recommendation).toBeDefined();
    });

    it('should provide cost-benefit recommendations', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15',
        appraisalCost: 100 // Low cost
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.costBenefitAnalysis.recommendation).toContain('recommended');
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = calculatePMICancellation(inputs);
      const analysis = generatePMICancellationAnalysis(inputs, result);
      
      expect(analysis).toContain('PMI Cancellation Analysis');
      expect(analysis).toContain('Summary');
      expect(analysis).toContain('Key Metrics');
      expect(analysis).toContain('Equity Analysis');
      expect(analysis).toContain('PMI Savings');
      expect(analysis).toContain('Payment Analysis');
      expect(analysis).toContain('Break-Even Analysis');
      expect(analysis).toContain('Refinance Analysis');
      expect(analysis).toContain('Available Cancellation Options');
      expect(analysis).toContain('Recommendations');
      expect(analysis).toContain('Timeline Analysis');
      expect(analysis).toContain('Cost-Benefit Analysis');
    });

    it('should include correct values in report', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = calculatePMICancellation(inputs);
      const analysis = generatePMICancellationAnalysis(inputs, result);
      
      expect(analysis).toContain('$300,000'); // Original Loan Amount
      expect(analysis).toContain('$280,000'); // Current Loan Balance
      expect(analysis).toContain('$375,000'); // Original Property Value
      expect(analysis).toContain('0.5%'); // PMI Rate
      expect(analysis).toContain('conventional'); // Loan Type
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero PMI rate', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.monthlySavings).toBe(0);
      expect(result.annualSavings).toBe(0);
    });

    it('should handle very high property appreciation', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        currentPropertyValue: 500000, // High appreciation
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.currentLTV).toBe(56); // 280000 / 500000 * 100
      expect(result.equityAnalysis.currentEquity).toBe(220000);
    });

    it('should handle very low property value', () => {
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        currentPropertyValue: 300000, // Low value
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: '2020-01-15'
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.currentLTV).toBe(93.33); // 280000 / 300000 * 100
      expect(result.monthsToCancellation).toBeGreaterThan(0);
    });

    it('should handle recent loan start date', () => {
      const recentDate = new Date();
      recentDate.setMonth(recentDate.getMonth() - 1); // 1 month ago
      
      const inputs: PMICancellationInputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        originalPropertyValue: 375000,
        pmiRate: 0.5,
        loanType: 'conventional',
        loanStartDate: recentDate.toISOString().split('T')[0]
      };

      const result = calculatePMICancellation(inputs);
      
      expect(result.monthsToCancellation).toBeGreaterThan(0);
    });
  });
});