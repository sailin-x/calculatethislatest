import { describe, it, expect } from 'vitest';
import { calculateMortgageLifeInsurance, generateMortgageLifeAnalysis } from './formulas';
import { validateMortgageLifeInputs } from './validation';
import { quickValidateMortgageLife } from './quickValidation';
import { MortgageLifeInputs } from './validation';

describe('Mortgage Life Calculator', () => {
  const validInputs: MortgageLifeInputs = {
    mortgageBalance: 250000,
    propertyValue: 350000,
    monthlyPayment: 1200,
    interestRate: 4.5,
    loanTerm: 30,
    borrowerAge: 35,
    coBorrowerAge: 32,
    healthStatus: 'Good',
    smokingStatus: 'Non-Smoker',
    occupation: 'Professional',
    annualIncome: 75000,
    otherDebts: 25000,
    savings: 50000,
    dependents: 2,
    dependentsAge: 8,
    yearsToRetirement: 30,
    inflationRate: 2.5,
    investmentReturn: 6,
    lifeExpectancy: 85,
    existingLifeInsurance: 100000,
    policyType: 'Term Life',
    policyTerm: 30,
    coverageAmount: 300000,
    premiumFrequency: 'Monthly',
    riders: ['Accidental Death', 'Disability Waiver'],
    underwritingClass: 'Preferred',
    familyHistory: 'Low Risk',
    lifestyleFactors: ['Regular Exercise', 'Healthy Diet'],
    analysisPeriod: 20
  };

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgageLifeInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.mortgageBalance;
      
      const result = validateMortgageLifeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mortgage balance is required and must be greater than 0');
    });

    it('should reject invalid mortgage balance', () => {
      const invalidInputs = { ...validInputs, mortgageBalance: -1000 };
      
      const result = validateMortgageLifeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mortgage balance is required and must be greater than 0');
    });

    it('should reject mortgage balance exceeding property value', () => {
      const invalidInputs = { ...validInputs, mortgageBalance: 400000, propertyValue: 350000 };
      
      const result = validateMortgageLifeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mortgage balance cannot exceed property value');
    });

    it('should reject invalid borrower age', () => {
      const invalidInputs = { ...validInputs, borrowerAge: 15 };
      
      const result = validateMortgageLifeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower age must be between 18 and 85 years');
    });

    it('should reject invalid policy type', () => {
      const invalidInputs = { ...validInputs, policyType: 'Invalid Policy' };
      
      const result = validateMortgageLifeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid policy type selected');
    });

    it('should reject invalid riders', () => {
      const invalidInputs = { ...validInputs, riders: ['Invalid Rider'] };
      
      const result = validateMortgageLifeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid riders selected: Invalid Rider');
    });

    it('should reject excessive debt-to-income ratio', () => {
      const invalidInputs = { ...validInputs, annualIncome: 50000, otherDebts: 500000 };
      
      const result = validateMortgageLifeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total debt-to-income ratio seems unusually high');
    });

    it('should reject insufficient coverage amount', () => {
      const invalidInputs = { ...validInputs, coverageAmount: 100000, mortgageBalance: 250000 };
      
      const result = validateMortgageLifeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Coverage amount seems low relative to mortgage balance');
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation for valid inputs', () => {
      expect(quickValidateMortgageLife(validInputs)).toBe(true);
    });

    it('should fail quick validation for missing mortgage balance', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.mortgageBalance;
      expect(quickValidateMortgageLife(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for invalid property value', () => {
      const invalidInputs = { ...validInputs, propertyValue: -1000 };
      expect(quickValidateMortgageLife(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for mortgage balance exceeding property value', () => {
      const invalidInputs = { ...validInputs, mortgageBalance: 400000, propertyValue: 350000 };
      expect(quickValidateMortgageLife(invalidInputs)).toBe(false);
    });

    it('should fail quick validation for excessive monthly payment', () => {
      const invalidInputs = { ...validInputs, monthlyPayment: 10000, mortgageBalance: 250000 };
      expect(quickValidateMortgageLife(invalidInputs)).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate mortgage protection needs correctly', () => {
      const inputs = { ...validInputs, mortgageBalance: 250000, monthlyPayment: 1200, policyTerm: 30 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.mortgageProtectionNeeded).toBeGreaterThan(250000);
      expect(result.mortgageProtectionNeeded).toBeLessThan(1000000);
    });

    it('should calculate total life insurance needs correctly', () => {
      const inputs = { ...validInputs, annualIncome: 75000, dependents: 2 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.totalLifeInsuranceNeeded).toBeGreaterThan(result.mortgageProtectionNeeded);
      expect(result.totalLifeInsuranceNeeded).toBeGreaterThan(500000);
    });

    it('should calculate additional coverage needed correctly', () => {
      const inputs = { ...validInputs, existingLifeInsurance: 100000 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.additionalCoverageNeeded).toBe(result.totalLifeInsuranceNeeded - 100000);
    });

    it('should calculate premiums correctly for term life', () => {
      const inputs = { ...validInputs, policyType: 'Term Life', coverageAmount: 300000 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.monthlyPremium).toBeGreaterThan(0);
      expect(result.annualPremium).toBe(result.monthlyPremium * 12);
      expect(result.totalPremiumCost).toBe(result.annualPremium * (inputs.policyTerm || 30));
    });

    it('should calculate premiums correctly for whole life', () => {
      const inputs = { ...validInputs, policyType: 'Whole Life', coverageAmount: 300000 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.monthlyPremium).toBeGreaterThan(0);
      expect(result.annualPremium).toBeGreaterThan(result.monthlyPremium * 12 * 0.9); // Account for rounding
    });

    it('should adjust premiums for health status', () => {
      const healthyInputs = { ...validInputs, healthStatus: 'Excellent' };
      const poorHealthInputs = { ...validInputs, healthStatus: 'Poor' };
      
      const healthyResult = calculateMortgageLifeInsurance(healthyInputs);
      const poorHealthResult = calculateMortgageLifeInsurance(poorHealthInputs);
      
      expect(healthyResult.monthlyPremium).toBeLessThan(poorHealthResult.monthlyPremium);
    });

    it('should adjust premiums for smoking status', () => {
      const nonSmokerInputs = { ...validInputs, smokingStatus: 'Non-Smoker' };
      const smokerInputs = { ...validInputs, smokingStatus: 'Regular Smoker' };
      
      const nonSmokerResult = calculateMortgageLifeInsurance(nonSmokerInputs);
      const smokerResult = calculateMortgageLifeInsurance(smokerInputs);
      
      expect(nonSmokerResult.monthlyPremium).toBeLessThan(smokerResult.monthlyPremium);
    });

    it('should adjust premiums for age', () => {
      const youngInputs = { ...validInputs, borrowerAge: 25 };
      const olderInputs = { ...validInputs, borrowerAge: 55 };
      
      const youngResult = calculateMortgageLifeInsurance(youngInputs);
      const olderResult = calculateMortgageLifeInsurance(olderInputs);
      
      expect(youngResult.monthlyPremium).toBeLessThan(olderResult.monthlyPremium);
    });
  });

  describe('Coverage Analysis', () => {
    it('should analyze coverage adequacy correctly', () => {
      const inputs = { ...validInputs, existingLifeInsurance: 100000 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.coverageAnalysis.adequacyScore).toBeGreaterThan(0);
      expect(result.coverageAnalysis.adequacyScore).toBeLessThanOrEqual(100);
      expect(result.coverageAnalysis.coverageGap).toBeGreaterThanOrEqual(0);
    });

    it('should calculate coverage breakdown correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.coverageAnalysis.coverageBreakdown.immediateNeeds).toBeGreaterThan(0);
      expect(result.coverageAnalysis.coverageBreakdown.shortTermNeeds).toBeGreaterThan(0);
      expect(result.coverageAnalysis.coverageBreakdown.longTermNeeds).toBeGreaterThan(0);
    });

    it('should handle no existing coverage', () => {
      const inputs = { ...validInputs, existingLifeInsurance: 0 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.coverageAnalysis.adequacyScore).toBe(0);
      expect(result.coverageAnalysis.coverageGap).toBe(result.totalLifeInsuranceNeeded);
    });

    it('should handle sufficient existing coverage', () => {
      const inputs = { ...validInputs, existingLifeInsurance: 1000000 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.coverageAnalysis.adequacyScore).toBe(100);
      expect(result.coverageAnalysis.coverageGap).toBe(0);
    });
  });

  describe('Policy Comparison', () => {
    it('should compare different policy types', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.policyComparison.policyTypes.length).toBeGreaterThan(1);
      expect(result.policyComparison.recommendedPolicy).toBeDefined();
      expect(result.policyComparison.costComparison).toBeDefined();
    });

    it('should identify term life as best value for young borrowers', () => {
      const inputs = { ...validInputs, borrowerAge: 30, policyType: 'Term Life' };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.policyComparison.recommendedPolicy).toBe('Term Life');
    });

    it('should provide policy features comparison', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.policyComparison.featureComparison.termLife).toBeDefined();
      expect(result.policyComparison.featureComparison.wholeLife).toBeDefined();
      expect(result.policyComparison.featureComparison.universalLife).toBeDefined();
    });
  });

  describe('Cost-Benefit Analysis', () => {
    it('should calculate cost-benefit ratio correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.costBenefitAnalysis.costBenefitRatio).toBeGreaterThan(0);
      expect(result.costBenefitAnalysis.costBenefitRatio).toBeLessThan(1);
      expect(result.costBenefitAnalysis.roi).toBeGreaterThan(0);
    });

    it('should calculate break-even years correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.costBenefitAnalysis.breakEvenYears).toBeGreaterThan(0);
      expect(result.costBenefitAnalysis.breakEvenYears).toBeLessThanOrEqual(inputs.policyTerm || 30);
    });

    it('should assess value correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(['Excellent', 'Good', 'Fair', 'Poor']).toContain(result.costBenefitAnalysis.valueAssessment);
    });
  });

  describe('Risk Assessment', () => {
    it('should assess overall risk correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(['Low', 'Moderate', 'High']).toContain(result.riskAssessment.overallRisk);
      expect(result.riskAssessment.premiumMultiplier).toBeGreaterThan(0);
    });

    it('should assess health risk correctly', () => {
      const healthyInputs = { ...validInputs, healthStatus: 'Excellent', smokingStatus: 'Non-Smoker' };
      const unhealthyInputs = { ...validInputs, healthStatus: 'Poor', smokingStatus: 'Regular Smoker' };
      
      const healthyResult = calculateMortgageLifeInsurance(healthyInputs);
      const unhealthyResult = calculateMortgageLifeInsurance(unhealthyInputs);
      
      expect(healthyResult.riskAssessment.healthRisk).toBe('Low');
      expect(unhealthyResult.riskAssessment.healthRisk).toBe('High');
    });

    it('should assess occupation risk correctly', () => {
      const professionalInputs = { ...validInputs, occupation: 'Professional' };
      const militaryInputs = { ...validInputs, occupation: 'Military' };
      
      const professionalResult = calculateMortgageLifeInsurance(professionalInputs);
      const militaryResult = calculateMortgageLifeInsurance(militaryInputs);
      
      expect(professionalResult.riskAssessment.occupationRisk).toBe('Low');
      expect(militaryResult.riskAssessment.occupationRisk).toBe('High');
    });

    it('should determine underwriting class correctly', () => {
      const lowRiskInputs = { ...validInputs, healthStatus: 'Excellent', smokingStatus: 'Non-Smoker' };
      const highRiskInputs = { ...validInputs, healthStatus: 'Poor', smokingStatus: 'Regular Smoker' };
      
      const lowRiskResult = calculateMortgageLifeInsurance(lowRiskInputs);
      const highRiskResult = calculateMortgageLifeInsurance(highRiskInputs);
      
      expect(lowRiskResult.riskAssessment.underwritingClass).toBe('Preferred Plus');
      expect(highRiskResult.riskAssessment.underwritingClass).toBe('Standard');
    });
  });

  describe('Key Metrics', () => {
    it('should calculate key metrics correctly', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.keyMetrics.coverageRatio).toBeGreaterThanOrEqual(0);
      expect(result.keyMetrics.coverageRatio).toBeLessThanOrEqual(1);
      expect(result.keyMetrics.premiumBurden).toBeGreaterThan(0);
      expect(['Excellent', 'Good', 'Fair', 'Poor']).toContain(result.keyMetrics.protectionAdequacy);
      expect(['Excellent', 'Good', 'Fair', 'Poor']).toContain(result.keyMetrics.costEfficiency);
      expect(['Low', 'Moderate', 'High']).toContain(result.keyMetrics.riskLevel);
    });

    it('should assess protection adequacy based on coverage', () => {
      const lowCoverageInputs = { ...validInputs, existingLifeInsurance: 50000 };
      const highCoverageInputs = { ...validInputs, existingLifeInsurance: 500000 };
      
      const lowCoverageResult = calculateMortgageLifeInsurance(lowCoverageInputs);
      const highCoverageResult = calculateMortgageLifeInsurance(highCoverageInputs);
      
      expect(lowCoverageResult.keyMetrics.protectionAdequacy).toBe('Poor');
      expect(highCoverageResult.keyMetrics.protectionAdequacy).toBe('Excellent');
    });
  });

  describe('Recommendations', () => {
    it('should generate appropriate recommendations', () => {
      const inputs = { ...validInputs, existingLifeInsurance: 50000 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.recommendations).toBeDefined();
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should recommend additional coverage when needed', () => {
      const inputs = { ...validInputs, existingLifeInsurance: 50000 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.recommendations).toContain('additional');
    });

    it('should recommend policy type', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.recommendations).toContain(result.policyComparison.recommendedPolicy);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgageLifeInsurance(inputs);
      const report = generateMortgageLifeAnalysis(inputs, result);
      
      expect(report).toContain('Mortgage Life Insurance Analysis Report');
      expect(report).toContain('Coverage Analysis');
      expect(report).toContain('Policy Recommendations');
      expect(report).toContain('Risk Assessment');
      expect(report).toContain('Cost-Benefit Analysis');
      expect(report).toContain('Key Recommendations');
      expect(report).toContain('Next Steps');
    });

    it('should include specific coverage amounts in report', () => {
      const inputs = { ...validInputs };
      const result = calculateMortgageLifeInsurance(inputs);
      const report = generateMortgageLifeAnalysis(inputs, result);
      
      expect(report).toContain(result.totalLifeInsuranceNeeded.toLocaleString());
      expect(report).toContain(result.coverageAnalysis.coverageGap.toLocaleString());
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero existing coverage', () => {
      const inputs = { ...validInputs, existingLifeInsurance: 0 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.additionalCoverageNeeded).toBe(result.totalLifeInsuranceNeeded);
      expect(result.coverageAnalysis.adequacyScore).toBe(0);
    });

    it('should handle no dependents', () => {
      const inputs = { ...validInputs, dependents: 0 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.coverageAnalysis.educationFunding).toBe(0);
    });

    it('should handle no annual income', () => {
      const inputs = { ...validInputs, annualIncome: 0 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.coverageAnalysis.incomeReplacement).toBe(0);
      expect(result.coverageAnalysis.emergencyFund).toBe(0);
    });

    it('should handle maximum ages', () => {
      const inputs = { ...validInputs, borrowerAge: 85 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.monthlyPremium).toBeGreaterThan(0);
    });

    it('should handle minimum ages', () => {
      const inputs = { ...validInputs, borrowerAge: 18 };
      const result = calculateMortgageLifeInsurance(inputs);
      
      expect(result.monthlyPremium).toBeGreaterThan(0);
    });

    it('should handle different policy terms', () => {
      const inputs10 = { ...validInputs, policyTerm: 10 };
      const inputs30 = { ...validInputs, policyTerm: 30 };
      
      const result10 = calculateMortgageLifeInsurance(inputs10);
      const result30 = calculateMortgageLifeInsurance(inputs30);
      
      expect(result10.totalPremiumCost).toBeLessThan(result30.totalPremiumCost);
    });

    it('should handle different coverage amounts', () => {
      const inputs100k = { ...validInputs, coverageAmount: 100000 };
      const inputs500k = { ...validInputs, coverageAmount: 500000 };
      
      const result100k = calculateMortgageLifeInsurance(inputs100k);
      const result500k = calculateMortgageLifeInsurance(inputs500k);
      
      expect(result100k.monthlyPremium).toBeLessThan(result500k.monthlyPremium);
    });
  });
});