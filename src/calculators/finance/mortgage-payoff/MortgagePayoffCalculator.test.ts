import { describe, it, expect } from 'vitest';
import { calculateMortgagePayoff, generateMortgagePayoffAnalysis } from './formulas';
import { validateMortgagePayoffInputs } from './validation';
import { quickValidateMortgagePayoff } from './quickValidation';
import { MortgagePayoffInputs } from './validation';

describe('Mortgage Payoff Calculator', () => {
  const validInputs: MortgagePayoffInputs = {
    loanAmount: 250000,
    interestRate: 4.5,
    loanTerm: 30,
    remainingTerm: 25,
    monthlyPayment: 1267,
    additionalPayment: 200,
    lumpSumPayment: 10000,
    lumpSumDate: '2024-06-01',
    biweeklyPayment: false,
    refinanceOption: 'No Refinance',
    refinanceRate: 3.5,
    refinanceTerm: 15,
    refinanceClosingCosts: 5000,
    investmentReturn: 7,
    taxRate: 25,
    inflationRate: 2.5,
    extraPaymentFrequency: 'Monthly',
    paymentIncrease: 10,
    payoffGoal: 15,
    analysisPeriod: 10,
    scenarioComparison: true,
    includeTaxBenefits: true,
    includeOpportunityCost: true,
    propertyValue: 350000,
    propertyAppreciation: 3
  };

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgagePayoffInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.loanAmount;
      
      const result = validateMortgagePayoffInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount is required and must be greater than 0');
    });

    it('should reject invalid loan amount', () => {
      const invalidInputs = { ...validInputs, loanAmount: -1000 };
      
      const result = validateMortgagePayoffInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount is required and must be greater than 0');
    });

    it('should reject invalid interest rate', () => {
      const invalidInputs = { ...validInputs, interestRate: 30 };
      
      const result = validateMortgagePayoffInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0% and 25%');
    });

    it('should reject remaining term exceeding loan term', () => {
      const invalidInputs = { ...validInputs, remainingTerm: 35, loanTerm: 30 };
      
      const result = validateMortgagePayoffInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Remaining term cannot exceed original loan term');
    });

    it('should reject lump sum payment exceeding loan amount', () => {
      const invalidInputs = { ...validInputs, lumpSumPayment: 300000, loanAmount: 250000 };
      
      const result = validateMortgagePayoffInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Lump sum payment cannot exceed loan amount');
    });

    it('should reject invalid refinance option', () => {
      const invalidInputs = { ...validInputs, refinanceOption: 'Invalid Option' };
      
      const result = validateMortgagePayoffInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid refinance option selected');
    });

    it('should reject refinance rate not lower than current rate', () => {
      const invalidInputs = { ...validInputs, refinanceOption: 'Lower Rate', refinanceRate: 5.0, interestRate: 4.5 };
      
      const result = validateMortgagePayoffInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Refinance rate must be lower than current rate for "Lower Rate" option');
    });

    it('should reject payoff goal exceeding remaining term', () => {
      const invalidInputs = { ...validInputs, payoffGoal: 30, remainingTerm: 25 };
      
      const result = validateMortgagePayoffInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payoff goal cannot exceed remaining term');
    });

    it('should reject past lump sum date', () => {
      const invalidInputs = { ...validInputs, lumpSumDate: '2020-01-01' };
      
      const result = validateMortgagePayoffInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Lump sum date cannot be in the past');
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation for valid inputs', () => {
      expect(quickValidateMortgagePayoff(validInputs)).toBe(true);
    });

    it('should fail quick validation for missing loan amount', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.loanAmount;
      expect(quickValidateMortgagePayoff(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for invalid interest rate', () => {
      const invalidInputs = { ...validInputs, interestRate: 30 };
      expect(quickValidateMortgagePayoff(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for remaining term exceeding loan term', () => {
      const invalidInputs = { ...validInputs, remainingTerm: 35, loanTerm: 30 };
      expect(quickValidateMortgagePayoff(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for lump sum payment exceeding loan amount', () => {
      const invalidInputs = { ...validInputs, lumpSumPayment: 300000, loanAmount: 250000 };
      expect(quickValidateMortgagePayoff(invalidInputs)).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate current scenario correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.currentPayoffDate).toBeDefined();
      expect(result.payoffAnalysis.currentScenario.yearsToPayoff).toBe(25);
      expect(result.payoffAnalysis.currentScenario.totalInterest).toBeGreaterThan(0);
    });

    it('should calculate accelerated scenario correctly', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.acceleratedPayoffDate).toBeDefined();
      expect(result.yearsSaved).toBeGreaterThan(0);
      expect(result.interestSaved).toBeGreaterThan(0);
    });

    it('should calculate years saved correctly', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      
      const currentYears = result.payoffAnalysis.currentScenario.yearsToPayoff;
      const acceleratedYears = result.payoffAnalysis.acceleratedScenario.yearsToPayoff;
      const calculatedYearsSaved = currentYears - acceleratedYears;
      
      expect(result.yearsSaved).toBeCloseTo(calculatedYearsSaved, 1);
    });

    it('should calculate interest saved correctly', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      
      const currentInterest = result.payoffAnalysis.currentScenario.totalInterest;
      const acceleratedInterest = result.payoffAnalysis.acceleratedScenario.totalInterest;
      const calculatedInterestSaved = currentInterest - acceleratedInterest;
      
      expect(result.interestSaved).toBeCloseTo(calculatedInterestSaved, 0);
    });

    it('should calculate refinance scenario when applicable', () => {
      const inputs = { ...validInputs, refinanceOption: 'Lower Rate', refinanceRate: 3.5 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.payoffAnalysis.refinanceScenario).toBeDefined();
      expect(result.payoffAnalysis.refinanceScenario!.totalInterest).toBeLessThan(result.payoffAnalysis.currentScenario.totalInterest);
    });

    it('should calculate lump sum scenario when applicable', () => {
      const inputs = { ...validInputs, lumpSumPayment: 10000 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.payoffAnalysis.lumpSumScenario).toBeDefined();
      expect(result.payoffAnalysis.lumpSumScenario!.totalInterest).toBeLessThan(result.payoffAnalysis.currentScenario.totalInterest);
    });

    it('should calculate biweekly scenario when applicable', () => {
      const inputs = { ...validInputs, biweeklyPayment: true };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.payoffAnalysis.biweeklyScenario).toBeDefined();
      expect(result.payoffAnalysis.biweeklyScenario!.yearsToPayoff).toBeLessThan(result.payoffAnalysis.currentScenario.yearsToPayoff);
    });

    it('should calculate required payment for payoff goal', () => {
      const inputs = { ...validInputs, payoffGoal: 15 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.monthlyPaymentRequired).toBeGreaterThan(0);
      expect(result.monthlyPaymentRequired).toBeGreaterThan(inputs.monthlyPayment || 0);
    });
  });

  describe('Payoff Timeline Analysis', () => {
    it('should analyze payoff timeline correctly', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.payoffAnalysis.payoffTimeline.currentPayoff).toBe(25);
      expect(result.payoffAnalysis.payoffTimeline.acceleratedPayoff).toBeLessThan(25);
      expect(result.payoffAnalysis.payoffTimeline.yearsSaved).toBeGreaterThan(0);
      expect(result.payoffAnalysis.payoffTimeline.payoffAcceleration).toBeGreaterThan(0);
    });

    it('should calculate payoff acceleration percentage correctly', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      
      const currentPayoff = result.payoffAnalysis.payoffTimeline.currentPayoff;
      const acceleratedPayoff = result.payoffAnalysis.payoffTimeline.acceleratedPayoff;
      const calculatedAcceleration = ((currentPayoff - acceleratedPayoff) / currentPayoff) * 100;
      
      expect(result.payoffAnalysis.payoffTimeline.payoffAcceleration).toBeCloseTo(calculatedAcceleration, 1);
    });
  });

  describe('Savings Breakdown', () => {
    it('should calculate savings breakdown correctly', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.payoffAnalysis.savingsBreakdown.interestSavings).toBeGreaterThan(0);
      expect(result.payoffAnalysis.savingsBreakdown.netSavings).toBeDefined();
    });

    it('should include opportunity cost when specified', () => {
      const inputs = { ...validInputs, additionalPayment: 200, includeOpportunityCost: true, investmentReturn: 7 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.payoffAnalysis.savingsBreakdown.opportunityCost).toBeGreaterThan(0);
    });

    it('should include tax benefits when specified', () => {
      const inputs = { ...validInputs, additionalPayment: 200, includeTaxBenefits: true, taxRate: 25 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.payoffAnalysis.savingsBreakdown.taxBenefits).toBeGreaterThan(0);
    });

    it('should calculate net savings correctly', () => {
      const inputs = { ...validInputs, additionalPayment: 200, includeOpportunityCost: true, includeTaxBenefits: true };
      const result = calculateMortgagePayoff(inputs);
      
      const interestSavings = result.payoffAnalysis.savingsBreakdown.interestSavings;
      const opportunityCost = result.payoffAnalysis.savingsBreakdown.opportunityCost;
      const taxBenefits = result.payoffAnalysis.savingsBreakdown.taxBenefits;
      const calculatedNetSavings = interestSavings - opportunityCost + taxBenefits;
      
      expect(result.payoffAnalysis.savingsBreakdown.netSavings).toBeCloseTo(calculatedNetSavings, 0);
    });
  });

  describe('Scenario Comparison', () => {
    it('should compare scenarios correctly', () => {
      const inputs = { ...validInputs, scenarioComparison: true };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.scenarioComparison.scenarios.length).toBeGreaterThan(1);
      expect(result.scenarioComparison.bestScenario).toBeDefined();
      expect(result.scenarioComparison.costComparison).toBeDefined();
      expect(result.scenarioComparison.timelineComparison).toBeDefined();
    });

    it('should identify best scenario by total cost', () => {
      const inputs = { ...validInputs, refinanceOption: 'Lower Rate', refinanceRate: 3.5 };
      const result = calculateMortgagePayoff(inputs);
      
      const scenarios = result.scenarioComparison.scenarios;
      const bestScenario = scenarios.reduce((best, current) => 
        current.totalCost < best.totalCost ? current : best
      );
      
      expect(result.scenarioComparison.bestScenario).toBe(bestScenario.name);
    });

    it('should identify fastest payoff option', () => {
      const inputs = { ...validInputs, biweeklyPayment: true };
      const result = calculateMortgagePayoff(inputs);
      
      const scenarios = result.scenarioComparison.scenarios;
      const fastestScenario = scenarios.reduce((fastest, current) => 
        current.yearsToPayoff < fastest.yearsToPayoff ? current : fastest
      );
      
      expect(result.scenarioComparison.timelineComparison.fastestOption).toBe(fastestScenario.name);
    });
  });

  describe('Cost-Benefit Analysis', () => {
    it('should calculate cost-benefit analysis correctly', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.costBenefitAnalysis.totalInvestment).toBeGreaterThan(0);
      expect(result.costBenefitAnalysis.totalReturn).toBeGreaterThan(0);
      expect(result.costBenefitAnalysis.roi).toBeDefined();
      expect(result.costBenefitAnalysis.breakEvenYears).toBeGreaterThan(0);
    });

    it('should calculate ROI correctly', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      
      const totalInvestment = result.costBenefitAnalysis.totalInvestment;
      const netBenefit = result.costBenefitAnalysis.netBenefit;
      const calculatedROI = totalInvestment > 0 ? (netBenefit / totalInvestment) * 100 : 0;
      
      expect(result.costBenefitAnalysis.roi).toBeCloseTo(calculatedROI, 1);
    });

    it('should assess value correctly', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(['Excellent', 'Good', 'Fair', 'Poor']).toContain(result.costBenefitAnalysis.valueAssessment);
    });
  });

  describe('Key Metrics', () => {
    it('should calculate key metrics correctly', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.keyMetrics.payoffAcceleration).toBeGreaterThan(0);
      expect(result.keyMetrics.interestReduction).toBeGreaterThan(0);
      expect(['Excellent', 'Good', 'Fair', 'Poor']).toContain(result.keyMetrics.costEfficiency);
      expect(['Low', 'Moderate', 'High']).toContain(result.keyMetrics.riskLevel);
      expect(result.keyMetrics.flexibilityScore).toBeGreaterThanOrEqual(0);
    });

    it('should assess cost efficiency based on interest reduction', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      
      const interestReduction = result.keyMetrics.interestReduction;
      if (interestReduction > 30) {
        expect(result.keyMetrics.costEfficiency).toBe('Excellent');
      } else if (interestReduction > 15) {
        expect(result.keyMetrics.costEfficiency).toBe('Good');
      } else if (interestReduction > 5) {
        expect(result.keyMetrics.costEfficiency).toBe('Fair');
      } else {
        expect(result.keyMetrics.costEfficiency).toBe('Poor');
      }
    });

    it('should assess risk level based on payment increase', () => {
      const inputs = { ...validInputs, paymentIncrease: 30 };
      const result = calculateMortgagePayoff(inputs);
      
      const currentPayment = result.payoffAnalysis.currentScenario.monthlyPayment;
      const acceleratedPayment = result.payoffAnalysis.acceleratedScenario.monthlyPayment;
      const paymentRatio = acceleratedPayment / currentPayment;
      
      if (paymentRatio > 1.5) {
        expect(result.keyMetrics.riskLevel).toBe('High');
      } else if (paymentRatio > 1.2) {
        expect(result.keyMetrics.riskLevel).toBe('Moderate');
      } else {
        expect(result.keyMetrics.riskLevel).toBe('Low');
      }
    });
  });

  describe('Recommendations', () => {
    it('should generate appropriate recommendations', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.recommendations).toBeDefined();
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should recommend accelerated payments for high ROI', () => {
      const inputs = { ...validInputs, additionalPayment: 500 };
      const result = calculateMortgagePayoff(inputs);
      
      if (result.costBenefitAnalysis.roi > 20) {
        expect(result.recommendations).toContain('excellent return on investment');
      }
    });

    it('should recommend refinancing when applicable', () => {
      const inputs = { ...validInputs, refinanceOption: 'Lower Rate', refinanceRate: 3.0 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.recommendations).toContain('Refinancing may provide significant savings');
    });

    it('should recommend biweekly payments when applicable', () => {
      const inputs = { ...validInputs, biweeklyPayment: true };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.recommendations).toContain('Biweekly payments can accelerate payoff');
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      const report = generateMortgagePayoffAnalysis(inputs, result);
      
      expect(report).toContain('Mortgage Payoff Analysis Report');
      expect(report).toContain('Current Situation');
      expect(report).toContain('Accelerated Payoff Results');
      expect(report).toContain('Cost-Benefit Analysis');
      expect(report).toContain('Savings Breakdown');
      expect(report).toContain('Key Recommendations');
      expect(report).toContain('Next Steps');
    });

    it('should include specific amounts in report', () => {
      const inputs = { ...validInputs, additionalPayment: 200 };
      const result = calculateMortgagePayoff(inputs);
      const report = generateMortgagePayoffAnalysis(inputs, result);
      
      expect(report).toContain(inputs.loanAmount.toLocaleString());
      expect(report).toContain(result.interestSaved.toLocaleString());
      expect(report).toContain(result.yearsSaved.toFixed(1));
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero additional payment', () => {
      const inputs = { ...validInputs, additionalPayment: 0 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.yearsSaved).toBe(0);
      expect(result.interestSaved).toBe(0);
    });

    it('should handle very high additional payment', () => {
      const inputs = { ...validInputs, additionalPayment: 1000 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.yearsSaved).toBeGreaterThan(0);
      expect(result.acceleratedPayoffDate).toBeDefined();
    });

    it('should handle zero lump sum payment', () => {
      const inputs = { ...validInputs, lumpSumPayment: 0 };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.payoffAnalysis.lumpSumScenario).toBeUndefined();
    });

    it('should handle no refinance option', () => {
      const inputs = { ...validInputs, refinanceOption: 'No Refinance' };
      const result = calculateMortgagePayoff(inputs);
      
      expect(result.payoffAnalysis.refinanceScenario).toBeUndefined();
    });

    it('should handle different loan terms', () => {
      const inputs15 = { ...validInputs, loanTerm: 15, remainingTerm: 10 };
      const inputs30 = { ...validInputs, loanTerm: 30, remainingTerm: 25 };
      
      const result15 = calculateMortgagePayoff(inputs15);
      const result30 = calculateMortgagePayoff(inputs30);
      
      expect(result15.payoffAnalysis.currentScenario.yearsToPayoff).toBe(10);
      expect(result30.payoffAnalysis.currentScenario.yearsToPayoff).toBe(25);
    });

    it('should handle different interest rates', () => {
      const inputs3 = { ...validInputs, interestRate: 3.0 };
      const inputs6 = { ...validInputs, interestRate: 6.0 };
      
      const result3 = calculateMortgagePayoff(inputs3);
      const result6 = calculateMortgagePayoff(inputs6);
      
      expect(result3.payoffAnalysis.currentScenario.totalInterest).toBeLessThan(result6.payoffAnalysis.currentScenario.totalInterest);
    });

    it('should handle different loan amounts', () => {
      const inputs100k = { ...validInputs, loanAmount: 100000 };
      const inputs500k = { ...validInputs, loanAmount: 500000 };
      
      const result100k = calculateMortgagePayoff(inputs100k);
      const result500k = calculateMortgagePayoff(inputs500k);
      
      expect(result100k.payoffAnalysis.currentScenario.totalInterest).toBeLessThan(result500k.payoffAnalysis.currentScenario.totalInterest);
    });
  });
});