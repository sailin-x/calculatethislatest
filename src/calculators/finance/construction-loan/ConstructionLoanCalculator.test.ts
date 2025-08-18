import { describe, it, expect } from 'vitest';
import { ConstructionLoanCalculator } from './ConstructionLoanCalculator';
import { calculateConstructionLoan } from './formulas';
import { validateConstructionLoanInputs } from './validation';
import { validateAllConstructionLoanInputs } from './quickValidation';

describe('Construction Loan Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(ConstructionLoanCalculator.id).toBe('construction-loan-calculator');
      expect(ConstructionLoanCalculator.name).toBe('Construction Loan Calculator');
      expect(ConstructionLoanCalculator.category).toBe('finance');
      expect(ConstructionLoanCalculator.subcategory).toBe('real-estate');
    });

    it('should have required inputs', () => {
      const inputIds = ConstructionLoanCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('projectType');
      expect(inputIds).toContain('loanAmount');
      expect(inputIds).toContain('interestRate');
      expect(inputIds).toContain('loanTerm');
      expect(inputIds).toContain('constructionPeriod');
      expect(inputIds).toContain('projectCost');
      expect(inputIds).toContain('landCost');
      expect(inputIds).toContain('constructionCost');
      expect(inputIds).toContain('softCosts');
      expect(inputIds).toContain('contingency');
      expect(inputIds).toContain('equityContribution');
      expect(inputIds).toContain('drawSchedule');
      expect(inputIds).toContain('interestReserve');
      expect(inputIds).toContain('originationFee');
      expect(inputIds).toContain('appraisalFee');
      expect(inputIds).toContain('legalFee');
      expect(inputIds).toContain('titleFee');
      expect(inputIds).toContain('inspectionFee');
      expect(inputIds).toContain('loanToCost');
      expect(inputIds).toContain('loanToValue');
      expect(inputIds).toContain('completionValue');
      expect(inputIds).toContain('exitStrategy');
      expect(inputIds).toContain('constructionStartDate');
      expect(inputIds).toContain('completionDate');
    });

    it('should have required outputs', () => {
      const outputIds = ConstructionLoanCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('monthlyInterest');
      expect(outputIds).toContain('totalInterest');
      expect(outputIds).toContain('interestReserveNeeded');
      expect(outputIds).toContain('totalLoanCost');
      expect(outputIds).toContain('loanFees');
      expect(outputIds).toContain('fundingGap');
      expect(outputIds).toContain('equityRequired');
      expect(outputIds).toContain('loanToCostRatio');
      expect(outputIds).toContain('loanToValueRatio');
      expect(outputIds).toContain('profitMargin');
      expect(outputIds).toContain('roi');
      expect(outputIds).toContain('breakEvenPoint');
      expect(outputIds).toContain('monthlyDraws');
      expect(outputIds).toContain('drawSchedule');
      expect(outputIds).toContain('cashFlow');
      expect(outputIds).toContain('riskAnalysis');
      expect(outputIds).toContain('constructionLoanAnalysis');
    });

    it('should have calculate function', () => {
      expect(typeof ConstructionLoanCalculator.calculate).toBe('function');
    });

    it('should have generateReport function', () => {
      expect(typeof ConstructionLoanCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    const validInputs = {
      projectType: 'residential',
      loanAmount: 2000000,
      interestRate: 8.5,
      loanTerm: 18,
      constructionPeriod: 12,
      projectCost: 2500000,
      landCost: 500000,
      constructionCost: 1800000,
      softCosts: 150000,
      contingency: 50000,
      equityContribution: 500000,
      drawSchedule: 'monthly',
      interestReserve: 150000,
      originationFee: 1.5,
      appraisalFee: 3000,
      legalFee: 8000,
      titleFee: 5000,
      inspectionFee: 6000,
      loanToCost: 80,
      loanToValue: 75,
      completionValue: 3200000,
      exitStrategy: 'sale',
      constructionStartDate: '2024-01-01',
      completionDate: '2024-12-31'
    };

    it('should validate correct inputs', () => {
      const result = validateConstructionLoanInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.loanAmount;
      
      const result = validateConstructionLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('loanAmount is required');
    });

    it('should reject invalid loan amount', () => {
      const invalidInputs = { ...validInputs, loanAmount: 50000 };
      const result = validateConstructionLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be at least $100,000');
    });

    it('should reject construction period exceeding loan term', () => {
      const invalidInputs = { ...validInputs, constructionPeriod: 24, loanTerm: 18 };
      const result = validateConstructionLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Construction period cannot exceed loan term');
    });

    it('should reject invalid project cost', () => {
      const invalidInputs = { ...validInputs, projectCost: 50000 };
      const result = validateConstructionLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Project cost must be at least $100,000');
    });

    it('should reject negative land cost', () => {
      const invalidInputs = { ...validInputs, landCost: -1000 };
      const result = validateConstructionLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Land cost cannot be negative');
    });

    it('should reject invalid project type', () => {
      const invalidInputs = { ...validInputs, projectType: 'invalid' };
      const result = validateConstructionLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please select a valid project type');
    });

    it('should reject invalid draw schedule', () => {
      const invalidInputs = { ...validInputs, drawSchedule: 'invalid' };
      const result = validateConstructionLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please select a valid draw schedule');
    });

    it('should reject invalid exit strategy', () => {
      const invalidInputs = { ...validInputs, exitStrategy: 'invalid' };
      const result = validateConstructionLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please select a valid exit strategy');
    });

    it('should reject invalid dates', () => {
      const invalidInputs = { ...validInputs, completionDate: '2023-12-31' };
      const result = validateConstructionLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Completion date must be after construction start date');
    });

    it('should reject loan amount exceeding project cost', () => {
      const invalidInputs = { ...validInputs, loanAmount: 3000000 };
      const result = validateConstructionLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount cannot exceed total project cost');
    });

    it('should reject insufficient funding', () => {
      const invalidInputs = { ...validInputs, equityContribution: 100000 };
      const result = validateConstructionLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount plus equity contribution must cover total project cost');
    });
  });

  describe('Calculation Logic', () => {
    const testInputs = {
      projectType: 'residential',
      loanAmount: 2000000,
      interestRate: 8.5,
      loanTerm: 18,
      constructionPeriod: 12,
      projectCost: 2500000,
      landCost: 500000,
      constructionCost: 1800000,
      softCosts: 150000,
      contingency: 50000,
      equityContribution: 500000,
      drawSchedule: 'monthly',
      interestReserve: 150000,
      originationFee: 1.5,
      appraisalFee: 3000,
      legalFee: 8000,
      titleFee: 5000,
      inspectionFee: 6000,
      loanToCost: 80,
      loanToValue: 75,
      completionValue: 3200000,
      exitStrategy: 'sale',
      constructionStartDate: '2024-01-01',
      completionDate: '2024-12-31'
    };

    it('should calculate monthly interest correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      // 2,000,000 * 0.085 / 12 = 14,167
      expect(outputs.monthlyInterest).toBe(14167);
    });

    it('should calculate total interest correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      // Total interest should be calculated based on draw schedule
      expect(outputs.totalInterest).toBeGreaterThan(0);
      expect(outputs.totalInterest).toBeLessThan(2000000 * 0.085); // Less than full loan amount for full year
    });

    it('should calculate interest reserve needed correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      const expectedReserveNeeded = Math.max(0, outputs.totalInterest - 150000);
      expect(outputs.interestReserveNeeded).toBe(expectedReserveNeeded);
    });

    it('should calculate loan fees correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      // 2,000,000 * 0.015 + 3,000 + 8,000 + 5,000 + 6,000 = 52,000
      expect(outputs.loanFees).toBe(52000);
    });

    it('should calculate total loan cost correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      // 2,000,000 + totalInterest + 52,000
      expect(outputs.totalLoanCost).toBe(2000000 + outputs.totalInterest + 52000);
    });

    it('should calculate funding gap correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      // 2,500,000 - 2,000,000 - 500,000 = 0
      expect(outputs.fundingGap).toBe(0);
    });

    it('should calculate equity required correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      // 2,500,000 - 2,000,000 = 500,000
      expect(outputs.equityRequired).toBe(500000);
    });

    it('should calculate loan-to-cost ratio correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      // (2,000,000 / 2,500,000) * 100 = 80%
      expect(outputs.loanToCostRatio).toBe(80);
    });

    it('should calculate loan-to-value ratio correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      // (2,000,000 / 3,200,000) * 100 = 62.5%
      expect(outputs.loanToValueRatio).toBe(62.5);
    });

    it('should calculate profit margin correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      // ((3,200,000 - 2,500,000) / 2,500,000) * 100 = 28%
      expect(outputs.profitMargin).toBe(28);
    });

    it('should calculate ROI correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      // ((3,200,000 - 2,500,000) / 500,000) * 100 = 140%
      expect(outputs.roi).toBe(140);
    });

    it('should calculate break-even point correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      // Should be less than construction period for profitable project
      expect(outputs.breakEvenPoint).toBeLessThan(12);
    });

    it('should calculate monthly draws correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      // 2,000,000 / 12 = 166,667
      expect(outputs.monthlyDraws).toBe(166667);
    });
  });

  describe('Draw Schedule Analysis', () => {
    const testInputs = {
      projectType: 'commercial',
      loanAmount: 8000000,
      interestRate: 7.25,
      loanTerm: 24,
      constructionPeriod: 18,
      projectCost: 10000000,
      landCost: 2000000,
      constructionCost: 7000000,
      softCosts: 800000,
      contingency: 200000,
      equityContribution: 2000000,
      drawSchedule: 'bi-monthly',
      interestReserve: 400000,
      originationFee: 1.0,
      appraisalFee: 5000,
      legalFee: 15000,
      titleFee: 8000,
      inspectionFee: 12000,
      loanToCost: 80,
      loanToValue: 70,
      completionValue: 14000000,
      exitStrategy: 'refinance',
      constructionStartDate: '2024-03-01',
      completionDate: '2025-08-31'
    };

    it('should generate draw schedule correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      expect(outputs.drawSchedule).toBeDefined();
      expect(Array.isArray(outputs.drawSchedule)).toBe(true);
      expect(outputs.drawSchedule.length).toBe(36); // 18 months * 2 draws per month
    });

    it('should calculate cumulative draw amounts correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      const lastDraw = outputs.drawSchedule[outputs.drawSchedule.length - 1];
      expect(lastDraw.cumulativeAmount).toBe(8000000);
    });

    it('should generate cash flow analysis correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      expect(outputs.cashFlow).toBeDefined();
      expect(Array.isArray(outputs.cashFlow)).toBe(true);
      expect(outputs.cashFlow.length).toBe(18); // 18 months
    });

    it('should calculate monthly interest payments correctly in cash flow', () => {
      const outputs = calculateConstructionLoan(testInputs);
      const firstMonth = outputs.cashFlow[0];
      expect(firstMonth.interestPayment).toBeGreaterThan(0);
      expect(firstMonth.cumulativeDraws).toBeGreaterThan(0);
    });
  });

  describe('Risk Analysis', () => {
    const testInputs = {
      projectType: 'mixed-use',
      loanAmount: 15000000,
      interestRate: 6.75,
      loanTerm: 30,
      constructionPeriod: 24,
      projectCost: 20000000,
      landCost: 5000000,
      constructionCost: 13000000,
      softCosts: 1500000,
      contingency: 500000,
      equityContribution: 5000000,
      drawSchedule: 'quarterly',
      interestReserve: 800000,
      originationFee: 0.75,
      appraisalFee: 8000,
      legalFee: 25000,
      titleFee: 12000,
      inspectionFee: 20000,
      loanToCost: 75,
      loanToValue: 65,
      completionValue: 28000000,
      exitStrategy: 'hold',
      constructionStartDate: '2024-06-01',
      completionDate: '2026-05-31'
    };

    it('should generate risk analysis correctly', () => {
      const outputs = calculateConstructionLoan(testInputs);
      expect(outputs.riskAnalysis).toBeDefined();
      expect(outputs.riskAnalysis.risks).toBeDefined();
      expect(outputs.riskAnalysis.riskScore).toBeDefined();
      expect(outputs.riskAnalysis.overallRisk).toBeDefined();
    });

    it('should identify funding gap risks', () => {
      const inputsWithGap = { ...testInputs, equityContribution: 1000000 };
      const outputs = calculateConstructionLoan(inputsWithGap);
      const fundingGapRisk = outputs.riskAnalysis.risks.find((risk: any) => risk.type === 'funding-gap');
      expect(fundingGapRisk).toBeDefined();
      expect(fundingGapRisk.severity).toBe('high');
    });

    it('should identify interest reserve risks', () => {
      const inputsWithLowReserve = { ...testInputs, interestReserve: 100000 };
      const outputs = calculateConstructionLoan(inputsWithLowReserve);
      const interestReserveRisk = outputs.riskAnalysis.risks.find((risk: any) => risk.type === 'interest-reserve');
      expect(interestReserveRisk).toBeDefined();
    });

    it('should identify LTC ratio risks', () => {
      const inputsWithHighLTC = { ...testInputs, loanToCost: 70 };
      const outputs = calculateConstructionLoan(inputsWithHighLTC);
      const ltcRisk = outputs.riskAnalysis.risks.find((risk: any) => risk.type === 'ltc-ratio');
      expect(ltcRisk).toBeDefined();
    });

    it('should identify LTV ratio risks', () => {
      const inputsWithHighLTV = { ...testInputs, loanToValue: 60 };
      const outputs = calculateConstructionLoan(inputsWithHighLTV);
      const ltvRisk = outputs.riskAnalysis.risks.find((risk: any) => risk.type === 'ltv-ratio');
      expect(ltvRisk).toBeDefined();
    });

    it('should identify profit margin risks', () => {
      const inputsWithLowProfit = { ...testInputs, completionValue: 21000000 };
      const outputs = calculateConstructionLoan(inputsWithLowProfit);
      const profitRisk = outputs.riskAnalysis.risks.find((risk: any) => risk.type === 'profit-margin');
      expect(profitRisk).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero interest reserve', () => {
      const inputs = {
        projectType: 'residential',
        loanAmount: 1000000,
        interestRate: 8.0,
        loanTerm: 12,
        constructionPeriod: 8,
        projectCost: 1200000,
        landCost: 200000,
        constructionCost: 900000,
        softCosts: 80000,
        contingency: 20000,
        equityContribution: 200000,
        drawSchedule: 'monthly',
        interestReserve: 0,
        originationFee: 1.0,
        appraisalFee: 2000,
        legalFee: 5000,
        titleFee: 3000,
        inspectionFee: 4000,
        loanToCost: 83.33,
        loanToValue: 80,
        completionValue: 1500000,
        exitStrategy: 'sale',
        constructionStartDate: '2024-01-01',
        completionDate: '2024-08-31'
      };

      const outputs = calculateConstructionLoan(inputs);
      expect(outputs.interestReserveNeeded).toBe(outputs.totalInterest);
    });

    it('should handle maximum loan amounts', () => {
      const inputs = {
        projectType: 'commercial',
        loanAmount: 100000000,
        interestRate: 5.0,
        loanTerm: 36,
        constructionPeriod: 24,
        projectCost: 125000000,
        landCost: 25000000,
        constructionCost: 90000000,
        softCosts: 8000000,
        contingency: 2000000,
        equityContribution: 25000000,
        drawSchedule: 'monthly',
        interestReserve: 5000000,
        originationFee: 0.5,
        appraisalFee: 10000,
        legalFee: 50000,
        titleFee: 15000,
        inspectionFee: 25000,
        loanToCost: 80,
        loanToValue: 70,
        completionValue: 180000000,
        exitStrategy: 'refinance',
        constructionStartDate: '2024-01-01',
        completionDate: '2025-12-31'
      };

      const outputs = calculateConstructionLoan(inputs);
      expect(outputs.loanToCostRatio).toBe(80);
      expect(outputs.loanToValueRatio).toBe(55.6);
    });

    it('should handle minimum project costs', () => {
      const inputs = {
        projectType: 'residential',
        loanAmount: 80000,
        interestRate: 10.0,
        loanTerm: 6,
        constructionPeriod: 4,
        projectCost: 100000,
        landCost: 20000,
        constructionCost: 70000,
        softCosts: 8000,
        contingency: 2000,
        equityContribution: 20000,
        drawSchedule: 'monthly',
        interestReserve: 5000,
        originationFee: 2.0,
        appraisalFee: 1000,
        legalFee: 2000,
        titleFee: 1000,
        inspectionFee: 1000,
        loanToCost: 80,
        loanToValue: 75,
        completionValue: 120000,
        exitStrategy: 'sale',
        constructionStartDate: '2024-01-01',
        completionDate: '2024-04-30'
      };

      const outputs = calculateConstructionLoan(inputs);
      expect(outputs.loanToCostRatio).toBe(80);
      expect(outputs.profitMargin).toBe(20);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const { validateLoanAmount } = require('./quickValidation');
      
      expect(validateLoanAmount(2000000).isValid).toBe(true);
      expect(validateLoanAmount(50000).isValid).toBe(false);
      expect(validateLoanAmount('invalid').isValid).toBe(false);
      expect(validateLoanAmount('').isValid).toBe(false);
    });

    it('should validate all inputs correctly', () => {
      const validInputs = {
        projectType: 'residential',
        loanAmount: 2000000,
        interestRate: 8.5,
        loanTerm: 18,
        constructionPeriod: 12,
        projectCost: 2500000,
        landCost: 500000,
        constructionCost: 1800000,
        softCosts: 150000,
        contingency: 50000,
        equityContribution: 500000,
        drawSchedule: 'monthly',
        interestReserve: 150000,
        originationFee: 1.5,
        appraisalFee: 3000,
        legalFee: 8000,
        titleFee: 5000,
        inspectionFee: 6000,
        loanToCost: 80,
        loanToValue: 75,
        completionValue: 3200000,
        exitStrategy: 'sale',
        constructionStartDate: '2024-01-01',
        completionDate: '2024-12-31'
      };

      const result = validateAllConstructionLoanInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch validation errors in quick validation', () => {
      const invalidInputs = {
        projectType: 'invalid',
        loanAmount: 50000, // Too low
        interestRate: 8.5,
        loanTerm: 18,
        constructionPeriod: 24, // Exceeds loan term
        projectCost: 2500000,
        landCost: 500000,
        constructionCost: 1800000,
        softCosts: 150000,
        contingency: 50000,
        equityContribution: 500000,
        drawSchedule: 'invalid',
        interestReserve: 150000,
        originationFee: 1.5,
        appraisalFee: 3000,
        legalFee: 8000,
        titleFee: 5000,
        inspectionFee: 6000,
        loanToCost: 80,
        loanToValue: 75,
        completionValue: 3200000,
        exitStrategy: 'invalid',
        constructionStartDate: '2024-01-01',
        completionDate: '2024-12-31'
      };

      const result = validateAllConstructionLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
