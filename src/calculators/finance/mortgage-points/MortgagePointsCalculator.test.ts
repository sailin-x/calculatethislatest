import { describe, it, expect } from 'vitest';
import { calculateMortgagePoints, generateMortgagePointsAnalysis } from './formulas';
import { validateMortgagePointsInputs } from './validation';
import { quickValidateMortgagePoints } from './quickValidation';
import { MortgagePointsInputs } from './validation';

describe('Mortgage Points Calculator', () => {
  const validInputs: MortgagePointsInputs = {
    loanAmount: 250000,
    originalRate: 4.5,
    reducedRate: 4.25,
    loanTerm: 30,
    pointsCost: 2500,
    pointsPercentage: 1,
    closingCosts: 8000,
    propertyTax: 3000,
    homeInsurance: 1200,
    pmi: 0.5,
    hoaFees: 200,
    taxRate: 25,
    investmentReturn: 7,
    inflationRate: 2.5,
    plannedOwnership: 10,
    refinanceLikelihood: 'medium',
    includeTaxBenefits: true,
    includeOpportunityCost: true,
    compareScenarios: true,
    analysisPeriod: 10,
    pointsOptions: ['0', '1', '2']
  };

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgagePointsInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.loanAmount;
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount is required and must be greater than 0');
    });

    it('should reject invalid loan amount', () => {
      const invalidInputs = { ...validInputs, loanAmount: -1000 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount is required and must be greater than 0');
    });

    it('should reject invalid original rate', () => {
      const invalidInputs = { ...validInputs, originalRate: 30 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Original interest rate must be between 0% and 25%');
    });

    it('should reject invalid reduced rate', () => {
      const invalidInputs = { ...validInputs, reducedRate: 30 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Reduced interest rate must be between 0% and 25%');
    });

    it('should reject reduced rate higher than original rate', () => {
      const invalidInputs = { ...validInputs, originalRate: 4.0, reducedRate: 4.5 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Reduced rate must be lower than original rate');
    });

    it('should reject invalid loan term', () => {
      const invalidInputs = { ...validInputs, loanTerm: 60 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be between 1 and 50 years');
    });

    it('should reject negative points cost', () => {
      const invalidInputs = { ...validInputs, pointsCost: -1000 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Points cost cannot be negative');
    });

    it('should reject invalid points percentage', () => {
      const invalidInputs = { ...validInputs, pointsPercentage: 15 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Points percentage must be between 0% and 10%');
    });

    it('should reject negative closing costs', () => {
      const invalidInputs = { ...validInputs, closingCosts: -1000 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Closing costs cannot be negative');
    });

    it('should reject negative property tax', () => {
      const invalidInputs = { ...validInputs, propertyTax: -100 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property tax cannot be negative');
    });

    it('should reject negative home insurance', () => {
      const invalidInputs = { ...validInputs, homeInsurance: -100 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Home insurance cannot be negative');
    });

    it('should reject invalid PMI rate', () => {
      const invalidInputs = { ...validInputs, pmi: 10 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('PMI rate must be between 0% and 5%');
    });

    it('should reject negative HOA fees', () => {
      const invalidInputs = { ...validInputs, hoaFees: -100 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('HOA fees cannot be negative');
    });

    it('should reject invalid tax rate', () => {
      const invalidInputs = { ...validInputs, taxRate: 60 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Tax rate must be between 0% and 50%');
    });

    it('should reject invalid investment return', () => {
      const invalidInputs = { ...validInputs, investmentReturn: 25 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Investment return rate must be between 0% and 20%');
    });

    it('should reject invalid inflation rate', () => {
      const invalidInputs = { ...validInputs, inflationRate: 15 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Inflation rate must be between 0% and 10%');
    });

    it('should reject invalid planned ownership', () => {
      const invalidInputs = { ...validInputs, plannedOwnership: 60 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Planned ownership period must be between 1 and 50 years');
    });

    it('should reject invalid refinance likelihood', () => {
      const invalidInputs = { ...validInputs, refinanceLikelihood: 'invalid' as any };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Refinance likelihood must be low, medium, or high');
    });

    it('should reject invalid analysis period', () => {
      const invalidInputs = { ...validInputs, analysisPeriod: 60 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Analysis period must be between 1 and 50 years');
    });

    it('should reject invalid points options', () => {
      const invalidInputs = { ...validInputs, pointsOptions: ['0', 'invalid', '2'] };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid points option: invalid');
    });

    it('should reject planned ownership exceeding loan term', () => {
      const invalidInputs = { ...validInputs, plannedOwnership: 35, loanTerm: 30 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Planned ownership period cannot exceed loan term');
    });

    it('should reject analysis period exceeding loan term', () => {
      const invalidInputs = { ...validInputs, analysisPeriod: 35, loanTerm: 30 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Analysis period cannot exceed loan term');
    });

    it('should reject excessive rate reduction', () => {
      const invalidInputs = { ...validInputs, originalRate: 5.0, reducedRate: 0.5 };
      
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Rate reduction cannot exceed 5 percentage points');
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation for valid inputs', () => {
      expect(quickValidateMortgagePoints(validInputs)).toBe(true);
    });

    it('should fail quick validation for missing loan amount', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.loanAmount;
      expect(quickValidateMortgagePoints(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for invalid original rate', () => {
      const invalidInputs = { ...validInputs, originalRate: 30 };
      expect(quickValidateMortgagePoints(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for invalid reduced rate', () => {
      const invalidInputs = { ...validInputs, reducedRate: 30 };
      expect(quickValidateMortgagePoints(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for reduced rate higher than original rate', () => {
      const invalidInputs = { ...validInputs, originalRate: 4.0, reducedRate: 4.5 };
      expect(quickValidateMortgagePoints(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for invalid loan term', () => {
      const invalidInputs = { ...validInputs, loanTerm: 60 };
      expect(quickValidateMortgagePoints(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for negative points cost', () => {
      const invalidInputs = { ...validInputs, pointsCost: -1000 };
      expect(quickValidateMortgagePoints(invalidInputs)).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate points cost correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.pointsCost).toBe(inputs.pointsCost);
    });

    it('should calculate rate reduction correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      const expectedReduction = inputs.originalRate - inputs.reducedRate;
      expect(result.rateReduction).toBe(expectedReduction);
    });

    it('should calculate monthly savings correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.monthlySavings).toBeGreaterThan(0);
    });

    it('should calculate annual savings correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      const expectedAnnualSavings = result.monthlySavings * 12;
      expect(result.annualSavings).toBe(expectedAnnualSavings);
    });

    it('should calculate break-even months correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      const expectedBreakEven = inputs.pointsCost! / result.monthlySavings;
      expect(result.breakEvenMonths).toBeCloseTo(expectedBreakEven, 1);
    });

    it('should calculate break-even years correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      const expectedBreakEvenYears = result.breakEvenMonths / 12;
      expect(result.breakEvenYears).toBeCloseTo(expectedBreakEvenYears, 2);
    });

    it('should calculate total savings correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      const plannedOwnership = inputs.plannedOwnership || inputs.loanTerm;
      const expectedTotalSavings = result.monthlySavings * plannedOwnership * 12;
      expect(result.totalSavings).toBeCloseTo(expectedTotalSavings, 0);
    });

    it('should calculate ROI correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      const expectedROI = ((result.totalSavings - inputs.pointsCost!) / inputs.pointsCost!) * 100;
      expect(result.roi).toBeCloseTo(expectedROI, 1);
    });

    it('should calculate points cost from percentage when not provided', () => {
      const inputs = { ...validInputs };
      delete inputs.pointsCost;
      const result = calculateMortgagePoints(inputs);
      
      const expectedCost = (inputs.loanAmount * inputs.pointsPercentage!) / 100;
      expect(result.pointsCost).toBe(expectedCost);
    });

    it('should calculate points cost from rate reduction when neither cost nor percentage provided', () => {
      const inputs = { ...validInputs };
      delete inputs.pointsCost;
      delete inputs.pointsPercentage;
      const result = calculateMortgagePoints(inputs);
      
      const rateReduction = inputs.originalRate - inputs.reducedRate;
      const estimatedPoints = rateReduction / 0.25;
      const expectedCost = (inputs.loanAmount * estimatedPoints) / 100;
      expect(result.pointsCost).toBe(expectedCost);
    });
  });

  describe('Break-Even Analysis', () => {
    it('should calculate break-even analysis correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.breakEvenAnalysis.breakEvenMonths).toBeGreaterThan(0);
      expect(result.breakEvenAnalysis.breakEvenYears).toBeGreaterThan(0);
      expect(result.breakEvenAnalysis.breakEvenDate).toBeDefined();
      expect(result.breakEvenAnalysis.riskAssessment).toBeDefined();
    });

    it('should assess risk correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      const risk = result.breakEvenAnalysis.riskAssessment;
      expect(['Low', 'Medium', 'High']).toContain(risk);
    });

    it('should calculate sensitivity analysis', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.breakEvenAnalysis.sensitivityAnalysis.optimistic).toBeGreaterThan(0);
      expect(result.breakEvenAnalysis.sensitivityAnalysis.realistic).toBeGreaterThan(0);
      expect(result.breakEvenAnalysis.sensitivityAnalysis.pessimistic).toBeGreaterThan(0);
    });

    it('should assess ownership period impact', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.breakEvenAnalysis.ownershipPeriodImpact.shortTerm).toBeDefined();
      expect(result.breakEvenAnalysis.ownershipPeriodImpact.mediumTerm).toBeDefined();
      expect(result.breakEvenAnalysis.ownershipPeriodImpact.longTerm).toBeDefined();
    });
  });

  describe('Scenario Comparison', () => {
    it('should generate scenario comparison when requested', () => {
      const inputs = { ...validInputs, compareScenarios: true };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.scenarioComparison.scenarios.length).toBeGreaterThan(0);
      expect(result.scenarioComparison.bestScenario).toBeDefined();
    });

    it('should not generate scenario comparison when not requested', () => {
      const inputs = { ...validInputs, compareScenarios: false };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.scenarioComparison.scenarios.length).toBe(0);
    });

    it('should include all requested points scenarios', () => {
      const inputs = { ...validInputs, compareScenarios: true, pointsOptions: ['0', '1', '2'] };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.scenarioComparison.scenarios.length).toBe(3);
      expect(result.scenarioComparison.scenarios.map(s => s.name)).toContain('0 Points');
      expect(result.scenarioComparison.scenarios.map(s => s.name)).toContain('1 Point');
      expect(result.scenarioComparison.scenarios.map(s => s.name)).toContain('2 Points');
    });

    it('should identify best scenario by NPV', () => {
      const inputs = { ...validInputs, compareScenarios: true };
      const result = calculateMortgagePoints(inputs);
      
      const scenarios = result.scenarioComparison.scenarios;
      const bestScenario = scenarios.reduce((best, current) => 
        current.npv > best.npv ? current : best
      );
      
      expect(result.scenarioComparison.bestScenario).toBe(bestScenario.name);
    });

    it('should calculate cost comparison correctly', () => {
      const inputs = { ...validInputs, compareScenarios: true };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.scenarioComparison.costComparison.lowestCost).toBeDefined();
      expect(result.scenarioComparison.costComparison.highestCost).toBeDefined();
      expect(result.scenarioComparison.costComparison.costRange).toBeGreaterThanOrEqual(0);
      expect(result.scenarioComparison.costComparison.averageCost).toBeGreaterThan(0);
    });

    it('should calculate savings comparison correctly', () => {
      const inputs = { ...validInputs, compareScenarios: true };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.scenarioComparison.savingsComparison.highestSavings).toBeDefined();
      expect(result.scenarioComparison.savingsComparison.lowestSavings).toBeDefined();
      expect(result.scenarioComparison.savingsComparison.savingsRange).toBeGreaterThanOrEqual(0);
      expect(result.scenarioComparison.savingsComparison.averageSavings).toBeGreaterThan(0);
    });
  });

  describe('Cost-Benefit Analysis', () => {
    it('should calculate cost-benefit analysis correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.costBenefitAnalysis.totalInvestment).toBe(inputs.pointsCost);
      expect(result.costBenefitAnalysis.totalReturn).toBe(result.totalSavings);
      expect(result.costBenefitAnalysis.netBenefit).toBeDefined();
      expect(result.costBenefitAnalysis.benefitCostRatio).toBeGreaterThan(0);
    });

    it('should calculate tax benefits when included', () => {
      const inputs = { ...validInputs, includeTaxBenefits: true };
      const result = calculateMortgagePoints(inputs);
      
      const expectedTaxBenefits = inputs.pointsCost! * (inputs.taxRate! / 100);
      expect(result.costBenefitAnalysis.taxBenefits).toBe(expectedTaxBenefits);
    });

    it('should calculate opportunity cost when included', () => {
      const inputs = { ...validInputs, includeOpportunityCost: true };
      const result = calculateMortgagePoints(inputs);
      
      const plannedOwnership = inputs.plannedOwnership || inputs.loanTerm;
      const expectedOpportunityCost = inputs.pointsCost! * (inputs.investmentReturn! / 100) * plannedOwnership;
      expect(result.costBenefitAnalysis.opportunityCost).toBe(expectedOpportunityCost);
    });

    it('should calculate benefit-cost ratio correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      const expectedRatio = result.totalSavings / inputs.pointsCost!;
      expect(result.costBenefitAnalysis.benefitCostRatio).toBeCloseTo(expectedRatio, 2);
    });

    it('should calculate risk-adjusted return correctly', () => {
      const inputs = { ...validInputs, includeOpportunityCost: true };
      const result = calculateMortgagePoints(inputs);
      
      const expectedRiskAdjustedReturn = ((result.totalSavings - result.costBenefitAnalysis.opportunityCost) / inputs.pointsCost!) * 100;
      expect(result.costBenefitAnalysis.riskAdjustedReturn).toBeCloseTo(expectedRiskAdjustedReturn, 1);
    });
  });

  describe('Recommendations', () => {
    it('should generate recommendations', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should recommend points for quick break-even', () => {
      const inputs = { ...validInputs, originalRate: 5.0, reducedRate: 4.0 };
      const result = calculateMortgagePoints(inputs);
      
      if (result.breakEvenYears <= 2) {
        expect(result.recommendations.some(rec => rec.includes('highly recommended'))).toBe(true);
      }
    });

    it('should consider refinancing likelihood in recommendations', () => {
      const inputs = { ...validInputs, refinanceLikelihood: 'high' };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('refinancing'))).toBe(true);
    });

    it('should consider tax benefits in recommendations', () => {
      const inputs = { ...validInputs, includeTaxBenefits: true, taxRate: 35 };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('tax'))).toBe(true);
    });

    it('should consider opportunity cost in recommendations', () => {
      const inputs = { ...validInputs, includeOpportunityCost: true, investmentReturn: 10 };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('investment'))).toBe(true);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      const report = generateMortgagePointsAnalysis(inputs, result);
      
      expect(report).toContain('Mortgage Points Analysis Report');
      expect(report).toContain('Summary');
      expect(report).toContain('Savings Analysis');
      expect(report).toContain('Break-Even Analysis');
      expect(report).toContain('Financial Analysis');
      expect(report).toContain('Scenario Comparison');
      expect(report).toContain('Cost-Benefit Analysis');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Key Considerations');
      expect(report).toContain('Next Steps');
    });

    it('should include specific amounts in report', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePoints(inputs);
      const report = generateMortgagePointsAnalysis(inputs, result);
      
      expect(report).toContain(inputs.loanAmount.toLocaleString());
      expect(report).toContain(inputs.originalRate.toString());
      expect(report).toContain(inputs.reducedRate.toString());
      expect(report).toContain(result.pointsCost.toLocaleString());
      expect(report).toContain(result.monthlySavings.toLocaleString());
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero points cost', () => {
      const inputs = { ...validInputs, pointsCost: 0 };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.pointsCost).toBe(0);
      expect(result.breakEvenMonths).toBe(0);
      expect(result.roi).toBe(0);
    });

    it('should handle very small rate reduction', () => {
      const inputs = { ...validInputs, originalRate: 4.5, reducedRate: 4.49 };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.rateReduction).toBe(0.01);
      expect(result.monthlySavings).toBeGreaterThan(0);
    });

    it('should handle very large rate reduction', () => {
      const inputs = { ...validInputs, originalRate: 5.0, reducedRate: 3.0 };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.rateReduction).toBe(2.0);
      expect(result.monthlySavings).toBeGreaterThan(0);
    });

    it('should handle short loan terms', () => {
      const inputs = { ...validInputs, loanTerm: 5 };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.totalSavings).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThan(0);
    });

    it('should handle long loan terms', () => {
      const inputs = { ...validInputs, loanTerm: 50 };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.totalSavings).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThan(0);
    });

    it('should handle different planned ownership periods', () => {
      const inputs = { ...validInputs, plannedOwnership: 5 };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.totalSavings).toBeGreaterThan(0);
      expect(result.totalSavings).toBeLessThan(result.monthlySavings * inputs.loanTerm * 12);
    });

    it('should handle no tax benefits', () => {
      const inputs = { ...validInputs, includeTaxBenefits: false };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.costBenefitAnalysis.taxBenefits).toBe(0);
    });

    it('should handle no opportunity cost', () => {
      const inputs = { ...validInputs, includeOpportunityCost: false };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.costBenefitAnalysis.opportunityCost).toBe(0);
    });

    it('should handle different refinancing likelihoods', () => {
      const inputsLow = { ...validInputs, refinanceLikelihood: 'low' };
      const inputsHigh = { ...validInputs, refinanceLikelihood: 'high' };
      
      const resultLow = calculateMortgagePoints(inputsLow);
      const resultHigh = calculateMortgagePoints(inputsHigh);
      
      expect(resultLow.recommendations.length).toBeGreaterThan(0);
      expect(resultHigh.recommendations.length).toBeGreaterThan(0);
    });
  });
});