import { describe, it, expect } from 'vitest';
import { LoanToCostRatioCalculator } from './LoanToCostRatioCalculator';
import { calculateLoanToCostRatio } from './formulas';
import { validateLoanToCostRatioInputs } from './validation';
import { validateAllLoanToCostRatioInputs } from './quickValidation';

describe('Loan to Cost (LTC) Ratio Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(LoanToCostRatioCalculator.id).toBe('loan-to-cost-ratio-calculator');
      expect(LoanToCostRatioCalculator.name).toBe('Loan to Cost (LTC) Ratio Calculator');
      expect(LoanToCostRatioCalculator.category).toBe('finance');
      expect(LoanToCostRatioCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = LoanToCostRatioCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'landCost')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'constructionCost')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'ltcRatio')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = LoanToCostRatioCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('totalProjectCost');
      expect(outputIds).toContain('maximumLoanAmount');
      expect(outputIds).toContain('requiredEquity');
      expect(outputIds).toContain('ltcRatioActual');
      expect(outputIds).toContain('costBreakdown');
      expect(outputIds).toContain('riskScore');
      expect(outputIds).toContain('feasibilityScore');
      expect(outputIds).toContain('lenderApprovalProbability');
      expect(outputIds).toContain('recommendation');
      expect(outputIds).toContain('keyMetrics');
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof LoanToCostRatioCalculator.calculate).toBe('function');
      expect(typeof LoanToCostRatioCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateLoanToCostRatioInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Land cost is required');
      expect(result.errors).toContain('Construction cost is required');
      expect(result.errors).toContain('LTC ratio is required');
    });

    it('should validate land cost range', () => {
      const result = validateLoanToCostRatioInputs({
        landCost: 5000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Land cost must be between $10,000 and $10,000,000');
    });

    it('should validate construction cost range', () => {
      const result = validateLoanToCostRatioInputs({
        landCost: 500000,
        constructionCost: 5000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Construction cost must be between $10,000 and $50,000,000');
    });

    it('should validate LTC ratio range', () => {
      const result = validateLoanToCostRatioInputs({
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 40
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('LTC ratio must be between 50% and 95%');
    });

    it('should validate soft costs range', () => {
      const result = validateLoanToCostRatioInputs({
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        softCosts: 15000000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Soft costs must be $10,000,000 or less');
    });

    it('should validate FF&E range', () => {
      const result = validateLoanToCostRatioInputs({
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        furnitureFixturesEquipment: 8000000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Furniture, fixtures & equipment must be $5,000,000 or less');
    });

    it('should validate contingency range', () => {
      const result = validateLoanToCostRatioInputs({
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        contingency: 8000000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Contingency must be $5,000,000 or less');
    });

    it('should validate borrower credit score range', () => {
      const result = validateLoanToCostRatioInputs({
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        borrowerCreditScore: 200
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower credit score must be between 300 and 850');
    });

    it('should validate project timeline range', () => {
      const result = validateLoanToCostRatioInputs({
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        projectTimeline: 2
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Project timeline must be between 3 and 60 months');
    });

    it('should validate pre-leasing percentage range', () => {
      const result = validateLoanToCostRatioInputs({
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        preLeasingPercentage: 150
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Pre-leasing percentage must be 100% or less');
    });

    it('should validate enum values', () => {
      const result = validateLoanToCostRatioInputs({
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        projectType: 'Invalid Type'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Project type must be one of:');
    });

    it('should accept valid inputs', () => {
      const result = validateLoanToCostRatioInputs({
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        softCosts: 300000
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate logical constraints', () => {
      const result = validateLoanToCostRatioInputs({
        landCost: 500000,
        constructionCost: 200000,
        ltcRatio: 75,
        softCosts: 800000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Construction cost should be at least 30% of total project cost');
      expect(result.errors).toContain('Soft costs should not exceed 25% of total project cost');
    });

    it('should validate pre-leasing consistency', () => {
      const result = validateLoanToCostRatioInputs({
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        preLeasing: 'Fully Leased',
        preLeasingPercentage: 80
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Pre-leasing percentage should be 100% when status is Fully Leased');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic metrics correctly', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75
      };

      const outputs = calculateLoanToCostRatio(inputs);

      expect(outputs.totalProjectCost).toBe(2500000);
      expect(outputs.maximumLoanAmount).toBe(1875000);
      expect(outputs.requiredEquity).toBe(625000);
      expect(outputs.ltcRatioActual).toBe(75);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.feasibilityScore).toBeGreaterThan(0);
      expect(outputs.lenderApprovalProbability).toBeGreaterThan(0);
    });

    it('should calculate with all cost components', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 2000000,
        softCosts: 300000,
        furnitureFixturesEquipment: 100000,
        contingency: 150000,
        ltcRatio: 75
      };

      const outputs = calculateLoanToCostRatio(inputs);
      expect(outputs.totalProjectCost).toBe(3050000);
      expect(outputs.maximumLoanAmount).toBe(2287500);
      expect(outputs.requiredEquity).toBe(762500);
      expect(outputs.ltcRatioActual).toBe(75);
    });

    it('should calculate cost breakdown correctly', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 2000000,
        softCosts: 300000,
        furnitureFixturesEquipment: 100000,
        contingency: 150000,
        ltcRatio: 75
      };

      const outputs = calculateLoanToCostRatio(inputs);
      expect(outputs.costBreakdown.landCost).toBe(500000);
      expect(outputs.costBreakdown.constructionCost).toBe(2000000);
      expect(outputs.costBreakdown.softCosts).toBe(300000);
      expect(outputs.costBreakdown.furnitureFixturesEquipment).toBe(100000);
      expect(outputs.costBreakdown.contingency).toBe(150000);
      expect(outputs.costBreakdown.totalProjectCost).toBe(3050000);
    });

    it('should calculate key metrics correctly', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75
      };

      const outputs = calculateLoanToCostRatio(inputs);
      expect(outputs.keyMetrics.equityPercentage).toBe(25);
      expect(outputs.keyMetrics.costPerSquareFoot).toBeGreaterThan(0);
      expect(outputs.keyMetrics.debtServiceCoverageRatio).toBe(1.25);
      expect(outputs.keyMetrics.returnOnEquity).toBe(15);
      expect(outputs.keyMetrics.projectIRR).toBe(18);
      expect(outputs.keyMetrics.paybackPeriod).toBe(7.5);
    });

    it('should apply risk factors correctly', () => {
      const lowRiskInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        projectType: 'Industrial',
        location: 'Industrial Zone',
        marketCondition: 'Strong',
        constructionRisk: 'Low',
        marketRisk: 'Low'
      };

      const highRiskInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        projectType: 'Hospitality',
        location: 'Rural',
        marketCondition: 'Volatile',
        constructionRisk: 'Very High',
        marketRisk: 'Very High'
      };

      const lowRiskOutputs = calculateLoanToCostRatio(lowRiskInputs);
      const highRiskOutputs = calculateLoanToCostRatio(highRiskInputs);

      expect(highRiskOutputs.riskScore).toBeGreaterThan(lowRiskOutputs.riskScore);
      expect(highRiskOutputs.feasibilityScore).toBeLessThan(lowRiskOutputs.feasibilityScore);
      expect(highRiskOutputs.lenderApprovalProbability).toBeLessThan(lowRiskOutputs.lenderApprovalProbability);
    });

    it('should calculate borrower experience impact', () => {
      const noviceInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        borrowerExperience: 'Novice'
      };

      const expertInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        borrowerExperience: 'Expert'
      };

      const noviceOutputs = calculateLoanToCostRatio(noviceInputs);
      const expertOutputs = calculateLoanToCostRatio(expertInputs);

      expect(noviceOutputs.riskScore).toBeGreaterThan(expertOutputs.riskScore);
      expect(noviceOutputs.lenderApprovalProbability).toBeLessThan(expertOutputs.lenderApprovalProbability);
    });

    it('should calculate pre-leasing impact', () => {
      const noPreLeasingInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        preLeasing: 'None',
        preLeasingPercentage: 0
      };

      const fullyLeasedInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        preLeasing: 'Fully Leased',
        preLeasingPercentage: 100
      };

      const noPreLeasingOutputs = calculateLoanToCostRatio(noPreLeasingInputs);
      const fullyLeasedOutputs = calculateLoanToCostRatio(fullyLeasedInputs);

      expect(noPreLeasingOutputs.riskScore).toBeGreaterThan(fullyLeasedOutputs.riskScore);
      expect(noPreLeasingOutputs.feasibilityScore).toBeLessThan(fullyLeasedOutputs.feasibilityScore);
      expect(noPreLeasingOutputs.lenderApprovalProbability).toBeLessThan(fullyLeasedOutputs.lenderApprovalProbability);
    });

    it('should calculate credit score impact', () => {
      const lowCreditInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        borrowerCreditScore: 600
      };

      const highCreditInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        borrowerCreditScore: 800
      };

      const lowCreditOutputs = calculateLoanToCostRatio(lowCreditInputs);
      const highCreditOutputs = calculateLoanToCostRatio(highCreditInputs);

      expect(lowCreditOutputs.riskScore).toBeGreaterThan(highCreditOutputs.riskScore);
      expect(lowCreditOutputs.lenderApprovalProbability).toBeLessThan(highCreditOutputs.lenderApprovalProbability);
    });

    it('should calculate project timeline impact', () => {
      const shortTimelineInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        projectTimeline: 12
      };

      const longTimelineInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        projectTimeline: 36
      };

      const shortTimelineOutputs = calculateLoanToCostRatio(shortTimelineInputs);
      const longTimelineOutputs = calculateLoanToCostRatio(longTimelineInputs);

      expect(shortTimelineOutputs.riskScore).toBeLessThan(longTimelineOutputs.riskScore);
      expect(shortTimelineOutputs.lenderApprovalProbability).toBeGreaterThan(longTimelineOutputs.lenderApprovalProbability);
    });

    it('should calculate LTC ratio impact', () => {
      const lowLtcInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 60
      };

      const highLtcInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 90
      };

      const lowLtcOutputs = calculateLoanToCostRatio(lowLtcInputs);
      const highLtcOutputs = calculateLoanToCostRatio(highLtcInputs);

      expect(lowLtcOutputs.maximumLoanAmount).toBeLessThan(highLtcOutputs.maximumLoanAmount);
      expect(lowLtcOutputs.requiredEquity).toBeGreaterThan(highLtcOutputs.requiredEquity);
      expect(lowLtcOutputs.lenderApprovalProbability).toBeGreaterThan(highLtcOutputs.lenderApprovalProbability);
    });
  });

  describe('LTC Ratio Analysis', () => {
    it('should generate analysis report', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75
      };

      const outputs = calculateLoanToCostRatio(inputs);
      const report = LoanToCostRatioCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Loan to Cost (LTC) Ratio Analysis');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Project Cost Breakdown');
      expect(report).toContain('Financing Structure');
      expect(report).toContain('Key Metrics');
      expect(report).toContain('Risk Analysis');
      expect(report).toContain('Lender Considerations');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Next Steps');
    });

    it('should include recommendation in report', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75
      };

      const outputs = calculateLoanToCostRatio(inputs);
      const report = LoanToCostRatioCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Recommendation:');
      expect(outputs.recommendation).toBeTruthy();
    });

    it('should include cost breakdown in report', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 2000000,
        softCosts: 300000,
        furnitureFixturesEquipment: 100000,
        contingency: 150000,
        ltcRatio: 75
      };

      const outputs = calculateLoanToCostRatio(inputs);
      const report = LoanToCostRatioCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Project Cost Breakdown');
      expect(report).toContain('Financing Structure');
      expect(report).toContain('Key Metrics');
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum land cost', () => {
      const inputs = {
        landCost: 10000,
        constructionCost: 2000000,
        ltcRatio: 75
      };

      const outputs = calculateLoanToCostRatio(inputs);
      expect(outputs.totalProjectCost).toBe(2010000);
      expect(outputs.maximumLoanAmount).toBe(1507500);
      expect(outputs.requiredEquity).toBe(502500);
    });

    it('should handle maximum land cost', () => {
      const inputs = {
        landCost: 10000000,
        constructionCost: 2000000,
        ltcRatio: 75
      };

      const outputs = calculateLoanToCostRatio(inputs);
      expect(outputs.totalProjectCost).toBe(12000000);
      expect(outputs.maximumLoanAmount).toBe(9000000);
      expect(outputs.requiredEquity).toBe(3000000);
    });

    it('should handle minimum construction cost', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 10000,
        ltcRatio: 75
      };

      const outputs = calculateLoanToCostRatio(inputs);
      expect(outputs.totalProjectCost).toBe(510000);
      expect(outputs.maximumLoanAmount).toBe(382500);
      expect(outputs.requiredEquity).toBe(127500);
    });

    it('should handle maximum construction cost', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 50000000,
        ltcRatio: 75
      };

      const outputs = calculateLoanToCostRatio(inputs);
      expect(outputs.totalProjectCost).toBe(50500000);
      expect(outputs.maximumLoanAmount).toBe(37875000);
      expect(outputs.requiredEquity).toBe(12625000);
    });

    it('should handle minimum LTC ratio', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 50
      };

      const outputs = calculateLoanToCostRatio(inputs);
      expect(outputs.maximumLoanAmount).toBe(1250000);
      expect(outputs.requiredEquity).toBe(1250000);
      expect(outputs.ltcRatioActual).toBe(50);
    });

    it('should handle maximum LTC ratio', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 95
      };

      const outputs = calculateLoanToCostRatio(inputs);
      expect(outputs.maximumLoanAmount).toBe(2375000);
      expect(outputs.requiredEquity).toBe(125000);
      expect(outputs.ltcRatioActual).toBe(95);
    });

    it('should handle zero optional costs', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75
      };

      const outputs = calculateLoanToCostRatio(inputs);
      expect(outputs.totalProjectCost).toBe(2500000);
      expect(outputs.costBreakdown.softCosts).toBe(0);
      expect(outputs.costBreakdown.furnitureFixturesEquipment).toBe(0);
      expect(outputs.costBreakdown.contingency).toBe(0);
    });

    it('should handle all optional costs', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 2000000,
        softCosts: 300000,
        furnitureFixturesEquipment: 100000,
        contingency: 150000,
        ltcRatio: 75
      };

      const outputs = calculateLoanToCostRatio(inputs);
      expect(outputs.totalProjectCost).toBe(3050000);
      expect(outputs.costBreakdown.softCosts).toBe(300000);
      expect(outputs.costBreakdown.furnitureFixturesEquipment).toBe(100000);
      expect(outputs.costBreakdown.contingency).toBe(150000);
    });
  });

  describe('Quick Validation', () => {
    it('should validate land cost quickly', () => {
      const result = validateLandCost(5000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between $10,000 and $10,000,000');

      const validResult = validateLandCost(500000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate construction cost quickly', () => {
      const result = validateConstructionCost(5000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between $10,000 and $50,000,000');

      const validResult = validateConstructionCost(2000000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate soft costs quickly', () => {
      const result = validateSoftCosts(15000000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('$10,000,000 or less');

      const validResult = validateSoftCosts(300000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate LTC ratio quickly', () => {
      const result = validateLtcRatio(40);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between 50% and 95%');

      const validResult = validateLtcRatio(75);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate borrower credit score quickly', () => {
      const result = validateBorrowerCreditScore(200);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between 300 and 850');

      const validResult = validateBorrowerCreditScore(750);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate project timeline quickly', () => {
      const result = validateProjectTimeline(2);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between 3 and 60 months');

      const validResult = validateProjectTimeline(18);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate pre-leasing percentage quickly', () => {
      const result = validatePreLeasingPercentage(150);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('100% or less');

      const validResult = validatePreLeasingPercentage(60);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate all inputs quickly', () => {
      const inputs = {
        landCost: 5000,
        constructionCost: 5000,
        ltcRatio: 40,
        borrowerCreditScore: 200,
        projectTimeline: 2,
        preLeasingPercentage: 150
      };

      const result = validateAllLoanToCostRatioInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should pass validation for valid inputs', () => {
      const inputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        borrowerCreditScore: 750,
        projectTimeline: 18,
        preLeasingPercentage: 60
      };

      const result = validateAllLoanToCostRatioInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Project Type Impact', () => {
    it('should adjust risk based on project type', () => {
      const industrialInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        projectType: 'Industrial'
      };

      const hospitalityInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        projectType: 'Hospitality'
      };

      const industrialOutputs = calculateLoanToCostRatio(industrialInputs);
      const hospitalityOutputs = calculateLoanToCostRatio(hospitalityInputs);

      expect(industrialOutputs.riskScore).toBeLessThan(hospitalityOutputs.riskScore);
      expect(industrialOutputs.lenderApprovalProbability).toBeGreaterThan(hospitalityOutputs.lenderApprovalProbability);
    });
  });

  describe('Location Impact', () => {
    it('should adjust risk based on location', () => {
      const suburbanInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        location: 'Suburban'
      };

      const ruralInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        location: 'Rural'
      };

      const suburbanOutputs = calculateLoanToCostRatio(suburbanInputs);
      const ruralOutputs = calculateLoanToCostRatio(ruralInputs);

      expect(suburbanOutputs.riskScore).toBeLessThan(ruralOutputs.riskScore);
      expect(suburbanOutputs.lenderApprovalProbability).toBeGreaterThan(ruralOutputs.lenderApprovalProbability);
    });
  });

  describe('Market Condition Impact', () => {
    it('should adjust risk based on market condition', () => {
      const strongInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        marketCondition: 'Strong'
      };

      const volatileInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        marketCondition: 'Volatile'
      };

      const strongOutputs = calculateLoanToCostRatio(strongInputs);
      const volatileOutputs = calculateLoanToCostRatio(volatileInputs);

      expect(strongOutputs.riskScore).toBeLessThan(volatileOutputs.riskScore);
      expect(strongOutputs.feasibilityScore).toBeGreaterThan(volatileOutputs.feasibilityScore);
    });
  });

  describe('Lender Type Impact', () => {
    it('should adjust risk based on lender type', () => {
      const governmentInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        lenderType: 'Government Agency'
      };

      const hardMoneyInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        lenderType: 'Hard Money Lender'
      };

      const governmentOutputs = calculateLoanToCostRatio(governmentInputs);
      const hardMoneyOutputs = calculateLoanToCostRatio(hardMoneyInputs);

      expect(governmentOutputs.riskScore).toBeLessThan(hardMoneyOutputs.riskScore);
      expect(governmentOutputs.lenderApprovalProbability).toBeGreaterThan(hardMoneyOutputs.lenderApprovalProbability);
    });
  });

  describe('Environmental and Zoning Impact', () => {
    it('should adjust risk based on environmental issues', () => {
      const noneInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        environmentalIssues: 'None'
      };

      const significantInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        environmentalIssues: 'Significant'
      };

      const noneOutputs = calculateLoanToCostRatio(noneInputs);
      const significantOutputs = calculateLoanToCostRatio(significantInputs);

      expect(noneOutputs.riskScore).toBeLessThan(significantOutputs.riskScore);
      expect(noneOutputs.lenderApprovalProbability).toBeGreaterThan(significantOutputs.lenderApprovalProbability);
    });

    it('should adjust risk based on zoning issues', () => {
      const noneInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        zoningIssues: 'None'
      };

      const significantInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        zoningIssues: 'Significant'
      };

      const noneOutputs = calculateLoanToCostRatio(noneInputs);
      const significantOutputs = calculateLoanToCostRatio(significantInputs);

      expect(noneOutputs.riskScore).toBeLessThan(significantOutputs.riskScore);
      expect(noneOutputs.lenderApprovalProbability).toBeGreaterThan(significantOutputs.lenderApprovalProbability);
    });
  });

  describe('Construction and Market Risk Impact', () => {
    it('should adjust risk based on construction risk', () => {
      const lowInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        constructionRisk: 'Low'
      };

      const veryHighInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        constructionRisk: 'Very High'
      };

      const lowOutputs = calculateLoanToCostRatio(lowInputs);
      const veryHighOutputs = calculateLoanToCostRatio(veryHighInputs);

      expect(lowOutputs.riskScore).toBeLessThan(veryHighOutputs.riskScore);
      expect(lowOutputs.lenderApprovalProbability).toBeGreaterThan(veryHighOutputs.lenderApprovalProbability);
    });

    it('should adjust risk based on market risk', () => {
      const lowInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        marketRisk: 'Low'
      };

      const veryHighInputs = {
        landCost: 500000,
        constructionCost: 2000000,
        ltcRatio: 75,
        marketRisk: 'Very High'
      };

      const lowOutputs = calculateLoanToCostRatio(lowInputs);
      const veryHighOutputs = calculateLoanToCostRatio(veryHighInputs);

      expect(lowOutputs.riskScore).toBeLessThan(veryHighOutputs.riskScore);
      expect(lowOutputs.lenderApprovalProbability).toBeGreaterThan(veryHighOutputs.lenderApprovalProbability);
    });
  });
});
