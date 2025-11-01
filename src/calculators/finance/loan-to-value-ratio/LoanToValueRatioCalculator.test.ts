import { describe, it, expect } from 'vitest';
import { LoanToValueRatioCalculator } from './LoanToValueRatioCalculator';
import { calculateLoanToValueRatio } from './formulas';
import { validateLoanToValueRatioInputs } from './validation';
import { validateAllLoanToValueRatioInputs } from './quickValidation';

describe('LoanToValue (LTV) Ratio Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(LoanToValueRatioCalculator.id).toBe('LoanToValue-ratio-calculator');
      expect(LoanToValueRatioCalculator.name).toBe('LoanToValue (LTV) Ratio Calculator');
      expect(LoanToValueRatioCalculator.category).toBe('finance');
      expect(LoanToValueRatioCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = LoanToValueRatioCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'propertyValue')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'loanAmount')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = LoanToValueRatioCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('ltvRatio');
      expect(outputIds).toContain('maxLoanAmount');
      expect(outputIds).toContain('requiredDownPayment');
      expect(outputIds).toContain('loanApprovalStatus');
      expect(outputIds).toContain('riskAssessment');
      expect(outputIds).toContain('pmiRequired');
      expect(outputIds).toContain('pmiCost');
      expect(outputIds).toContain('riskScore');
      expect(outputIds).toContain('approvalProbability');
      expect(outputIds).toContain('recommendation');
      expect(outputIds).toContain('keyMetrics');
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof LoanToValueRatioCalculator.calculate).toBe('function');
      expect(typeof LoanToValueRatioCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateLoanToValueRatioInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value is required');
      expect(result.errors).toContain('Loan amount is required');
    });

    it('should validate property value range', () => {
      const result = validateLoanToValueRatioInputs({
        propertyValue: 5000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be between $10,000 and $10,000,000');
    });

    it('should validate loan amount range', () => {
      const result = validateLoanToValueRatioInputs({
        propertyValue: 500000,
        loanAmount: 500
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be between $1,000 and $10,000,000');
    });

    it('should validate down payment range', () => {
      const result = validateLoanToValueRatioInputs({
        propertyValue: 500000,
        loanAmount: 400000,
        downPayment: 8000000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment must be $5,000,000 or less');
    });

    it('should validate maximum LTV ratio range', () => {
      const result = validateLoanToValueRatioInputs({
        propertyValue: 500000,
        loanAmount: 400000,
        maxLtvRatio: 40
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Maximum LTV ratio must be between 50% and 100%');
    });

    it('should validate credit score range', () => {
      const result = validateLoanToValueRatioInputs({
        propertyValue: 500000,
        loanAmount: 400000,
        creditScore: 200
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Credit score must be between 300 and 850');
    });

    it('should validate DTI ratio range', () => {
      const result = validateLoanToValueRatioInputs({
        propertyValue: 500000,
        loanAmount: 400000,
        debtToIncomeRatio: 150
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('DebtToIncome ratio must be 100% or less');
    });

    it('should validate property age range', () => {
      const result = validateLoanToValueRatioInputs({
        propertyValue: 500000,
        loanAmount: 400000,
        propertyAge: 300
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property age must be 200 years or less');
    });

    it('should validate enum values', () => {
      const result = validateLoanToValueRatioInputs({
        propertyValue: 500000,
        loanAmount: 400000,
        propertyType: 'Invalid Type'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property type must be one of:');
    });

    it('should accept valid inputs', () => {
      const result = validateLoanToValueRatioInputs({
        propertyValue: 500000,
        loanAmount: 400000,
        downPayment: 100000
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate logical constraints', () => {
      const result = validateLoanToValueRatioInputs({
        propertyValue: 500000,
        loanAmount: 600000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount cannot exceed property value');
    });

    it('should validate total financing constraint', () => {
      const result = validateLoanToValueRatioInputs({
        propertyValue: 500000,
        loanAmount: 400000,
        downPayment: 150000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total financing (loan amount + down payment) cannot exceed property value');
    });

    it('should validate loan type specific constraints', () => {
      const result = validateLoanToValueRatioInputs({
        propertyValue: 500000,
        loanAmount: 400000,
        loanType: 'FHA',
        maxLtvRatio: 98
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('FHA loans cannot exceed 96.5% LTV ratio');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic metrics correctly', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000
      };

      const outputs = calculateLoanToValueRatio(inputs);

      expect(outputs.ltvRatio).toBe(80);
      expect(outputs.maxLoanAmount).toBe(400000);
      expect(outputs.requiredDownPayment).toBe(100000);
      expect(outputs.loanApprovalStatus).toBe('Approved');
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.approvalProbability).toBeGreaterThan(0);
    });

    it('should calculate with down payment', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        downPayment: 100000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.ltvRatio).toBe(80);
      expect(outputs.keyMetrics.equityPercentage).toBe(20);
      expect(outputs.keyMetrics.downPaymentPercentage).toBe(20);
    });

    it('should calculate with custom max LTV ratio', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        maxLtvRatio: 75
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.maxLoanAmount).toBe(375000);
      expect(outputs.requiredDownPayment).toBe(125000);
      expect(outputs.loanApprovalStatus).toBe('Denied - LTV ratio exceeds maximum');
    });

    it('should calculate PMI correctly', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 450000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.ltvRatio).toBe(90);
      expect(outputs.pmiRequired).toBe(true);
      expect(outputs.pmiCost).toBeGreaterThan(0);
    });

    it('should not require PMI for low LTV', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 350000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.ltvRatio).toBe(70);
      expect(outputs.pmiRequired).toBe(false);
      expect(outputs.pmiCost).toBe(0);
    });

    it('should calculate risk assessment correctly', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        creditScore: 750,
        debtToIncomeRatio: 35
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.riskAssessment).toBeTruthy();
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should apply risk factors correctly', () => {
      const lowRiskInputs = {
        propertyValue: 500000,
        loanAmount: 350000,
        propertyType: 'Single Family',
        occupancyType: 'Primary Residence',
        loanType: 'Conventional',
        creditScore: 800,
        debtToIncomeRatio: 28
      };

      const highRiskInputs = {
        propertyValue: 500000,
        loanAmount: 450000,
        propertyType: 'Investment',
        occupancyType: 'Investment Property',
        loanType: 'Hard Money',
        creditScore: 600,
        debtToIncomeRatio: 50
      };

      const lowRiskOutputs = calculateLoanToValueRatio(lowRiskInputs);
      const highRiskOutputs = calculateLoanToValueRatio(highRiskInputs);

      expect(highRiskOutputs.riskScore).toBeGreaterThan(lowRiskOutputs.riskScore);
      expect(highRiskOutputs.approvalProbability).toBeLessThan(lowRiskOutputs.approvalProbability);
    });

    it('should calculate approval probability correctly', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        creditScore: 750,
        downPayment: 100000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.approvalProbability).toBeGreaterThan(0);
      expect(outputs.approvalProbability).toBeLessThanOrEqual(100);
    });

    it('should generate recommendation correctly', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        creditScore: 750
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.recommendation).toBeTruthy();
      expect(outputs.recommendation.length).toBeGreaterThan(0);
    });

    it('should calculate key metrics correctly', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        downPayment: 100000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.keyMetrics.equityPercentage).toBe(20);
      expect(outputs.keyMetrics.downPaymentPercentage).toBe(20);
      expect(outputs.keyMetrics.debtServiceCoverageRatio).toBe(1.25);
    });
  });

  describe('LTV Ratio Analysis', () => {
    it('should generate analysis report', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      const report = LoanToValueRatioCalculator.generateReport(inputs, outputs);

      expect(report).toContain('LoanToValue (LTV) Ratio Analysis');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Loan Analysis');
      expect(report).toContain('Financing Structure');
      expect(report).toContain('Risk Assessment');
      expect(report).toContain('PMI Analysis');
      expect(report).toContain('Key Metrics');
      expect(report).toContain('Property Details');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Next Steps');
    });

    it('should include recommendation in report', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      const report = LoanToValueRatioCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Recommendation:');
      expect(outputs.recommendation).toBeTruthy();
    });

    it('should include PMI information in report', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 450000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      const report = LoanToValueRatioCalculator.generateReport(inputs, outputs);

      expect(report).toContain('PMI Analysis');
      expect(report).toContain('PMI Required:');
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum property value', () => {
      const inputs = {
        propertyValue: 10000,
        loanAmount: 8000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.ltvRatio).toBe(80);
      expect(outputs.maxLoanAmount).toBe(8000);
      expect(outputs.requiredDownPayment).toBe(2000);
    });

    it('should handle maximum property value', () => {
      const inputs = {
        propertyValue: 10000000,
        loanAmount: 8000000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.ltvRatio).toBe(80);
      expect(outputs.maxLoanAmount).toBe(8000000);
      expect(outputs.requiredDownPayment).toBe(2000000);
    });

    it('should handle minimum loan amount', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 1000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.ltvRatio).toBe(0.2);
      expect(outputs.maxLoanAmount).toBe(400000);
      expect(outputs.requiredDownPayment).toBe(100000);
    });

    it('should handle maximum loan amount', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 10000000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.ltvRatio).toBe(2000);
      expect(outputs.loanApprovalStatus).toBe('Denied - LTV ratio exceeds maximum');
    });

    it('should handle zero property value', () => {
      const inputs = {
        propertyValue: 0,
        loanAmount: 400000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.ltvRatio).toBe(0);
      expect(outputs.maxLoanAmount).toBe(0);
      expect(outputs.requiredDownPayment).toBe(0);
    });

    it('should handle zero loan amount', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 0
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.ltvRatio).toBe(0);
      expect(outputs.pmiRequired).toBe(false);
      expect(outputs.pmiCost).toBe(0);
    });

    it('should handle 100% LTV ratio', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 500000,
        maxLtvRatio: 100
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.ltvRatio).toBe(100);
      expect(outputs.maxLoanAmount).toBe(500000);
      expect(outputs.requiredDownPayment).toBe(0);
    });

    it('should handle high LTV ratios requiring PMI', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 475000
      };

      const outputs = calculateLoanToValueRatio(inputs);
      expect(outputs.ltvRatio).toBe(95);
      expect(outputs.pmiRequired).toBe(true);
      expect(outputs.pmiCost).toBeGreaterThan(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate property value quickly', () => {
      const result = validatePropertyValue(5000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between $10,000 and $10,000,000');

      const validResult = validatePropertyValue(500000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate loan amount quickly', () => {
      const result = validateLoanAmount(500);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between $1,000 and $10,000,000');

      const validResult = validateLoanAmount(400000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate down payment quickly', () => {
      const result = validateDownPayment(8000000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('$5,000,000 or less');

      const validResult = validateDownPayment(100000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate max LTV ratio quickly', () => {
      const result = validateMaxLtvRatio(40);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between 50% and 100%');

      const validResult = validateMaxLtvRatio(80);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate credit score quickly', () => {
      const result = validateCreditScore(200);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between 300 and 850');

      const validResult = validateCreditScore(750);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate DTI ratio quickly', () => {
      const result = validateDebtToIncomeRatio(150);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('100% or less');

      const validResult = validateDebtToIncomeRatio(35);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate property age quickly', () => {
      const result = validatePropertyAge(300);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('200 years or less');

      const validResult = validatePropertyAge(15);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate all inputs quickly', () => {
      const inputs = {
        propertyValue: 5000,
        loanAmount: 500,
        downPayment: 8000000,
        maxLtvRatio: 40,
        creditScore: 200,
        debtToIncomeRatio: 150,
        propertyAge: 300
      };

      const result = validateAllLoanToValueRatioInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should pass validation for valid inputs', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        downPayment: 100000,
        maxLtvRatio: 80,
        creditScore: 750,
        debtToIncomeRatio: 35,
        propertyAge: 15
      };

      const result = validateAllLoanToValueRatioInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Property Type Impact', () => {
    it('should adjust risk based on property type', () => {
      const singleFamilyInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        propertyType: 'Single Family'
      };

      const investmentInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        propertyType: 'Investment'
      };

      const singleFamilyOutputs = calculateLoanToValueRatio(singleFamilyInputs);
      const investmentOutputs = calculateLoanToValueRatio(investmentInputs);

      expect(investmentOutputs.riskScore).toBeGreaterThan(singleFamilyOutputs.riskScore);
      expect(investmentOutputs.approvalProbability).toBeLessThan(singleFamilyOutputs.approvalProbability);
    });
  });

  describe('Occupancy Type Impact', () => {
    it('should adjust risk based on occupancy type', () => {
      const primaryResidenceInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        occupancyType: 'Primary Residence'
      };

      const investmentPropertyInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        occupancyType: 'Investment Property'
      };

      const primaryResidenceOutputs = calculateLoanToValueRatio(primaryResidenceInputs);
      const investmentPropertyOutputs = calculateLoanToValueRatio(investmentPropertyInputs);

      expect(investmentPropertyOutputs.riskScore).toBeGreaterThan(primaryResidenceOutputs.riskScore);
      expect(investmentPropertyOutputs.approvalProbability).toBeLessThan(primaryResidenceOutputs.approvalProbability);
    });
  });

  describe('Loan Type Impact', () => {
    it('should adjust risk based on loan type', () => {
      const conventionalInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        loanType: 'Conventional'
      };

      const hardMoneyInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        loanType: 'Hard Money'
      };

      const conventionalOutputs = calculateLoanToValueRatio(conventionalInputs);
      const hardMoneyOutputs = calculateLoanToValueRatio(hardMoneyInputs);

      expect(hardMoneyOutputs.riskScore).toBeGreaterThan(conventionalOutputs.riskScore);
      expect(hardMoneyOutputs.approvalProbability).toBeLessThan(conventionalOutputs.approvalProbability);
    });
  });

  describe('Credit Score Impact', () => {
    it('should adjust risk based on credit score', () => {
      const highCreditInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        creditScore: 800
      };

      const lowCreditInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        creditScore: 600
      };

      const highCreditOutputs = calculateLoanToValueRatio(highCreditInputs);
      const lowCreditOutputs = calculateLoanToValueRatio(lowCreditInputs);

      expect(lowCreditOutputs.riskScore).toBeGreaterThan(highCreditOutputs.riskScore);
      expect(lowCreditOutputs.approvalProbability).toBeLessThan(highCreditOutputs.approvalProbability);
    });
  });

  describe('DTI Ratio Impact', () => {
    it('should adjust risk based on DTI ratio', () => {
      const lowDtiInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        debtToIncomeRatio: 28
      };

      const highDtiInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        debtToIncomeRatio: 50
      };

      const lowDtiOutputs = calculateLoanToValueRatio(lowDtiInputs);
      const highDtiOutputs = calculateLoanToValueRatio(highDtiInputs);

      expect(highDtiOutputs.riskScore).toBeGreaterThan(lowDtiOutputs.riskScore);
      expect(highDtiOutputs.approvalProbability).toBeLessThan(lowDtiOutputs.approvalProbability);
    });
  });

  describe('Property Condition Impact', () => {
    it('should adjust risk based on property condition', () => {
      const excellentInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        propertyCondition: 'Excellent'
      };

      const poorInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        propertyCondition: 'Poor'
      };

      const excellentOutputs = calculateLoanToValueRatio(excellentInputs);
      const poorOutputs = calculateLoanToValueRatio(poorInputs);

      expect(poorOutputs.riskScore).toBeGreaterThan(excellentOutputs.riskScore);
      expect(poorOutputs.approvalProbability).toBeLessThan(excellentOutputs.approvalProbability);
    });
  });

  describe('Property Age Impact', () => {
    it('should adjust risk based on property age', () => {
      const newPropertyInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        propertyAge: 5
      };

      const oldPropertyInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        propertyAge: 50
      };

      const newPropertyOutputs = calculateLoanToValueRatio(newPropertyInputs);
      const oldPropertyOutputs = calculateLoanToValueRatio(oldPropertyInputs);

      expect(oldPropertyOutputs.riskScore).toBeGreaterThan(newPropertyOutputs.riskScore);
      expect(oldPropertyOutputs.approvalProbability).toBeLessThan(newPropertyOutputs.approvalProbability);
    });
  });

  describe('Environmental and Title Issues Impact', () => {
    it('should adjust risk based on environmental issues', () => {
      const noneInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        environmentalIssues: 'None'
      };

      const significantInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        environmentalIssues: 'Significant'
      };

      const noneOutputs = calculateLoanToValueRatio(noneInputs);
      const significantOutputs = calculateLoanToValueRatio(significantInputs);

      expect(significantOutputs.riskScore).toBeGreaterThan(noneOutputs.riskScore);
      expect(significantOutputs.approvalProbability).toBeLessThan(noneOutputs.approvalProbability);
    });

    it('should adjust risk based on title issues', () => {
      const clearTitleInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        titleIssues: 'Clear Title'
      };

      const cloudedTitleInputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        titleIssues: 'Clouded Title'
      };

      const clearTitleOutputs = calculateLoanToValueRatio(clearTitleInputs);
      const cloudedTitleOutputs = calculateLoanToValueRatio(cloudedTitleInputs);

      expect(cloudedTitleOutputs.riskScore).toBeGreaterThan(clearTitleOutputs.riskScore);
      expect(cloudedTitleOutputs.approvalProbability).toBeLessThan(clearTitleOutputs.approvalProbability);
    });
  });
});
