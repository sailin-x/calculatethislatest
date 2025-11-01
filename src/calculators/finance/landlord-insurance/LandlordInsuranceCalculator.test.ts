import { describe, it, expect } from 'vitest';
import { LandlordInsuranceCalculator } from './LandlordInsuranceCalculator';
import { calculateLandlordInsurance } from './formulas';
import { validateLandlordInsuranceInputs } from './validation';
import { validateAllLandlordInsuranceInputs } from './quickValidation';

describe('Landlord Insurance Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(LandlordInsuranceCalculator.id).toBe('LandlordInsuranceCalculator');
      expect(LandlordInsuranceCalculator.name).toBe('Landlord Insurance Calculator');
      expect(LandlordInsuranceCalculator.category).toBe('finance');
      expect(LandlordInsuranceCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = LandlordInsuranceCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'propertyValue')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = LandlordInsuranceCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('annualPremium');
      expect(outputIds).toContain('monthlyPremium');
      expect(outputIds).toContain('dwellingCoverage');
      expect(outputIds).toContain('liabilityCoverage');
      expect(outputIds).toContain('totalCoverage');
      expect(outputIds).toContain('riskScore');
      expect(outputIds).toContain('premiumScore');
      expect(outputIds).toContain('coverageScore');
      expect(outputIds).toContain('overallScore');
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof LandlordInsuranceCalculator.calculate).toBe('function');
      expect(typeof LandlordInsuranceCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateLandlordInsuranceInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value is required');
    });

    it('should validate property value range', () => {
      const result = validateLandlordInsuranceInputs({
        propertyValue: 25000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be between $50,000 and $10,000,000');
    });

    it('should validate replacement cost range', () => {
      const result = validateLandlordInsuranceInputs({
        propertyValue: 500000,
        replacementCost: 25000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Replacement cost must be between $50,000 and $15,000,000');
    });

    it('should validate annual rent range', () => {
      const result = validateLandlordInsuranceInputs({
        propertyValue: 500000,
        annualRent: 600000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Annual rent must be $500,000 or less');
    });

    it('should validate year built range', () => {
      const result = validateLandlordInsuranceInputs({
        propertyValue: 500000,
        yearBuilt: 1700
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Year built must be between 1800 and 2024');
    });

    it('should validate square footage range', () => {
      const result = validateLandlordInsuranceInputs({
        propertyValue: 500000,
        squareFootage: 300
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Square footage must be between 500 and 50,000 sqft');
    });

    it('should validate liability limit range', () => {
      const result = validateLandlordInsuranceInputs({
        propertyValue: 500000,
        liabilityLimit: 50000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Liability limit must be between $100,000 and $5,000,000');
    });

    it('should validate deductible range', () => {
      const result = validateLandlordInsuranceInputs({
        propertyValue: 500000,
        deductible: 100
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Deductible must be between $250 and $10,000');
    });

    it('should validate occupancy rate range', () => {
      const result = validateLandlordInsuranceInputs({
        propertyValue: 500000,
        occupancyRate: 150
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Occupancy rate must be 100% or less');
    });

    it('should validate credit score range', () => {
      const result = validateLandlordInsuranceInputs({
        propertyValue: 500000,
        creditScore: 200
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Credit score must be between 300 and 850');
    });

    it('should validate enum values', () => {
      const result = validateLandlordInsuranceInputs({
        propertyValue: 500000,
        propertyType: 'Invalid Type'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property type must be one of:');
    });

    it('should accept valid inputs', () => {
      const result = validateLandlordInsuranceInputs({
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate logical constraints', () => {
      const result = validateLandlordInsuranceInputs({
        propertyValue: 500000,
        replacementCost: 1000000,
        annualRent: 36000,
        lossOfRent: 50000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Replacement cost should not significantly exceed property value');
      expect(result.errors).toContain('Loss of rent coverage should not exceed annual rent');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic metrics correctly', () => {
      const inputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000
      };

      const outputs = calculateLandlordInsurance(inputs);

      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBeGreaterThan(0);
      expect(outputs.dwellingCoverage).toBe(450000);
      expect(outputs.liabilityCoverage).toBe(300000);
      expect(outputs.totalCoverage).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.premiumScore).toBeGreaterThan(0);
      expect(outputs.coverageScore).toBeGreaterThan(0);
      expect(outputs.overallScore).toBeGreaterThan(0);
    });

    it('should calculate premium correctly', () => {
      const inputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        state: 'California'
      };

      const outputs = calculateLandlordInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBe(outputs.annualPremium / 12);
    });

    it('should calculate coverage amounts correctly', () => {
      const inputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        liabilityLimit: 500000,
        medicalPayments: 10000,
        lossOfRent: 24000,
        personalProperty: 10000
      };

      const outputs = calculateLandlordInsurance(inputs);
      expect(outputs.dwellingCoverage).toBe(450000);
      expect(outputs.liabilityCoverage).toBe(500000);
      expect(outputs.medicalPaymentsCoverage).toBe(10000);
      expect(outputs.lossOfRentCoverage).toBe(24000);
      expect(outputs.personalPropertyCoverage).toBe(10000);
      expect(outputs.totalCoverage).toBe(450000 + 500000 + 10000 + 24000 + 10000);
    });

    it('should calculate ratios correctly', () => {
      const inputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000
      };

      const outputs = calculateLandlordInsurance(inputs);
      expect(outputs.coverageToValueRatio).toBeGreaterThan(0);
      expect(outputs.premiumToRentRatio).toBeGreaterThan(0);
    });

    it('should calculate scores correctly', () => {
      const inputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        creditScore: 750,
        insuranceScore: 'Good'
      };

      const outputs = calculateLandlordInsurance(inputs);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
      expect(outputs.premiumScore).toBeGreaterThan(0);
      expect(outputs.premiumScore).toBeLessThanOrEqual(100);
      expect(outputs.coverageScore).toBeGreaterThan(0);
      expect(outputs.coverageScore).toBeLessThanOrEqual(100);
      expect(outputs.overallScore).toBeGreaterThan(0);
      expect(outputs.overallScore).toBeLessThanOrEqual(100);
    });

    it('should apply risk factors correctly', () => {
      const lowRiskInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        location: 'Suburban',
        riskZone: 'Low',
        constructionType: 'Brick'
      };

      const highRiskInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        location: 'Coastal',
        riskZone: 'Very High',
        constructionType: 'Frame'
      };

      const lowRiskOutputs = calculateLandlordInsurance(lowRiskInputs);
      const highRiskOutputs = calculateLandlordInsurance(highRiskInputs);

      expect(highRiskOutputs.annualPremium).toBeGreaterThan(lowRiskOutputs.annualPremium);
      expect(highRiskOutputs.riskScore).toBeGreaterThan(lowRiskOutputs.riskScore);
    });

    it('should apply discounts correctly', () => {
      const noDiscountInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000
      };

      const discountInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        multiPolicyDiscount: 'Auto',
        loyaltyDiscount: 5,
        paymentMethod: 'Annual',
        paperlessDiscount: 'Yes',
        autoPayDiscount: 'Yes',
        newCustomerDiscount: 'Yes'
      };

      const noDiscountOutputs = calculateLandlordInsurance(noDiscountInputs);
      const discountOutputs = calculateLandlordInsurance(discountInputs);

      expect(discountOutputs.annualPremium).toBeLessThan(noDiscountOutputs.annualPremium);
    });

    it('should apply security feature discounts', () => {
      const noSecurityInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000
      };

      const securityInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        securityFeatures: ['Alarm System', 'Security Cameras', 'Fire Sprinklers']
      };

      const noSecurityOutputs = calculateLandlordInsurance(noSecurityInputs);
      const securityOutputs = calculateLandlordInsurance(securityInputs);

      expect(securityOutputs.annualPremium).toBeLessThan(noSecurityOutputs.annualPremium);
    });

    it('should calculate tenant type impact', () => {
      const residentialInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        tenantType: 'Residential'
      };

      const studentInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        tenantType: 'Student'
      };

      const residentialOutputs = calculateLandlordInsurance(residentialInputs);
      const studentOutputs = calculateLandlordInsurance(studentInputs);

      expect(studentOutputs.annualPremium).toBeGreaterThan(residentialOutputs.annualPremium);
      expect(studentOutputs.riskScore).toBeGreaterThan(residentialOutputs.riskScore);
    });

    it('should calculate claims history impact', () => {
      const noClaimsInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        claimsHistory: 'None'
      };

      const claimsInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        claimsHistory: '5+ Claims'
      };

      const noClaimsOutputs = calculateLandlordInsurance(noClaimsInputs);
      const claimsOutputs = calculateLandlordInsurance(claimsInputs);

      expect(claimsOutputs.annualPremium).toBeGreaterThan(noClaimsOutputs.annualPremium);
      expect(claimsOutputs.riskScore).toBeGreaterThan(noClaimsOutputs.riskScore);
    });
  });

  describe('Landlord Insurance Analysis', () => {
    it('should generate analysis report', () => {
      const inputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000
      };

      const outputs = calculateLandlordInsurance(inputs);
      const report = LandlordInsuranceCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Landlord Insurance Analysis');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Premium Overview');
      expect(report).toContain('Coverage Breakdown');
      expect(report).toContain('Key Metrics');
      expect(report).toContain('Risk Analysis');
      expect(report).toContain('Cost Analysis');
    });

    it('should include recommendation in report', () => {
      const inputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000
      };

      const outputs = calculateLandlordInsurance(inputs);
      const report = LandlordInsuranceCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Recommendation:');
      expect(outputs.recommendation).toBeTruthy();
    });

    it('should include coverage breakdown in report', () => {
      const inputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000
      };

      const outputs = calculateLandlordInsurance(inputs);
      const report = LandlordInsuranceCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Coverage Breakdown');
      expect(report).toContain('Discount Breakdown');
      expect(report).toContain('Comparison Analysis');
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum property value', () => {
      const inputs = {
        propertyValue: 50000,
        replacementCost: 45000,
        annualRent: 6000
      };

      const outputs = calculateLandlordInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
    });

    it('should handle maximum property value', () => {
      const inputs = {
        propertyValue: 10000000,
        replacementCost: 9000000,
        annualRent: 600000
      };

      const outputs = calculateLandlordInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
    });

    it('should handle zero annual rent', () => {
      const inputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 0
      };

      const outputs = calculateLandlordInsurance(inputs);
      expect(outputs.premiumToRentRatio).toBe(0);
    });

    it('should handle high liability limits', () => {
      const inputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        liabilityLimit: 5000000
      };

      const outputs = calculateLandlordInsurance(inputs);
      expect(outputs.liabilityCoverage).toBe(5000000);
      expect(outputs.annualPremium).toBeGreaterThan(0);
    });

    it('should handle multiple security features', () => {
      const inputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        securityFeatures: ['Alarm System', 'Security Cameras', 'Deadbolts', 'Fire Sprinklers', 'Smoke Detectors']
      };

      const outputs = calculateLandlordInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
    });

    it('should handle all discount types', () => {
      const inputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        multiPolicyDiscount: 'Multiple',
        loyaltyDiscount: 5,
        paymentMethod: 'Annual',
        paperlessDiscount: 'Yes',
        autoPayDiscount: 'Yes',
        newCustomerDiscount: 'Yes',
        bundlingDiscount: 'Multiple',
        safetyDiscount: 'Premium',
        claimsFreeDiscount: '5+ Years'
      };

      const outputs = calculateLandlordInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate property value quickly', () => {
      const result = validatePropertyValue(25000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between $50,000 and $10,000,000');

      const validResult = validatePropertyValue(500000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate replacement cost quickly', () => {
      const result = validateReplacementCost(25000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between $50,000 and $15,000,000');

      const validResult = validateReplacementCost(450000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate annual rent quickly', () => {
      const result = validateAnnualRent(600000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('$500,000 or less');

      const validResult = validateAnnualRent(36000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate liability limit quickly', () => {
      const result = validateLiabilityLimit(50000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between $100,000 and $5,000,000');

      const validResult = validateLiabilityLimit(300000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate deductible quickly', () => {
      const result = validateDeductible(100);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between $250 and $10,000');

      const validResult = validateDeductible(1000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate all inputs quickly', () => {
      const inputs = {
        propertyValue: 25000,
        replacementCost: 25000,
        annualRent: 600000,
        liabilityLimit: 50000,
        deductible: 100
      };

      const result = validateAllLandlordInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should pass validation for valid inputs', () => {
      const inputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        liabilityLimit: 300000,
        deductible: 1000
      };

      const result = validateAllLandlordInsuranceInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('State Rate Variations', () => {
    it('should apply different rates by state', () => {
      const californiaInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        state: 'California'
      };

      const floridaInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        state: 'Florida'
      };

      const californiaOutputs = calculateLandlordInsurance(californiaInputs);
      const floridaOutputs = calculateLandlordInsurance(floridaInputs);

      expect(floridaOutputs.annualPremium).toBeGreaterThan(californiaOutputs.annualPremium);
    });
  });

  describe('Property Type Impact', () => {
    it('should adjust rates based on property type', () => {
      const singleFamilyInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        propertyType: 'Single Family'
      };

      const multiFamilyInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        propertyType: 'Multi-Family'
      };

      const singleFamilyOutputs = calculateLandlordInsurance(singleFamilyInputs);
      const multiFamilyOutputs = calculateLandlordInsurance(multiFamilyInputs);

      expect(multiFamilyOutputs.annualPremium).toBeGreaterThan(singleFamilyOutputs.annualPremium);
      expect(multiFamilyOutputs.riskScore).toBeGreaterThan(singleFamilyOutputs.riskScore);
    });
  });

  describe('Construction Type Impact', () => {
    it('should adjust rates based on construction type', () => {
      const frameInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        constructionType: 'Frame'
      };

      const concreteInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        constructionType: 'Concrete'
      };

      const frameOutputs = calculateLandlordInsurance(frameInputs);
      const concreteOutputs = calculateLandlordInsurance(concreteInputs);

      expect(frameOutputs.annualPremium).toBeGreaterThan(concreteOutputs.annualPremium);
      expect(frameOutputs.riskScore).toBeGreaterThan(concreteOutputs.riskScore);
    });
  });

  describe('Coverage Level Impact', () => {
    it('should adjust rates based on coverage level', () => {
      const basicInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        coverageLevel: 'Basic'
      };

      const premiumInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        coverageLevel: 'Premium'
      };

      const basicOutputs = calculateLandlordInsurance(basicInputs);
      const premiumOutputs = calculateLandlordInsurance(premiumInputs);

      expect(premiumOutputs.annualPremium).toBeGreaterThan(basicOutputs.annualPremium);
      expect(premiumOutputs.coverageScore).toBeGreaterThan(basicOutputs.coverageScore);
    });
  });

  describe('Insurance Score Impact', () => {
    it('should adjust rates based on insurance score', () => {
      const excellentInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        insuranceScore: 'Excellent'
      };

      const poorInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        insuranceScore: 'Poor'
      };

      const excellentOutputs = calculateLandlordInsurance(excellentInputs);
      const poorOutputs = calculateLandlordInsurance(poorInputs);

      expect(poorOutputs.annualPremium).toBeGreaterThan(excellentOutputs.annualPremium);
      expect(poorOutputs.riskScore).toBeGreaterThan(excellentOutputs.riskScore);
    });
  });

  describe('Age Impact', () => {
    it('should adjust rates based on property age', () => {
      const newInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        yearBuilt: 2020
      };

      const oldInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        yearBuilt: 1950
      };

      const newOutputs = calculateLandlordInsurance(newInputs);
      const oldOutputs = calculateLandlordInsurance(oldInputs);

      expect(oldOutputs.riskScore).toBeGreaterThan(newOutputs.riskScore);
    });
  });

  describe('Location Impact', () => {
    it('should adjust rates based on location type', () => {
      const suburbanInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        location: 'Suburban'
      };

      const coastalInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        location: 'Coastal'
      };

      const suburbanOutputs = calculateLandlordInsurance(suburbanInputs);
      const coastalOutputs = calculateLandlordInsurance(coastalInputs);

      expect(coastalOutputs.annualPremium).toBeGreaterThan(suburbanOutputs.annualPremium);
      expect(coastalOutputs.riskScore).toBeGreaterThan(suburbanOutputs.riskScore);
    });
  });

  describe('Risk Zone Impact', () => {
    it('should adjust rates based on risk zone', () => {
      const lowRiskInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        riskZone: 'Low'
      };

      const veryHighRiskInputs = {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        riskZone: 'Very High'
      };

      const lowRiskOutputs = calculateLandlordInsurance(lowRiskInputs);
      const veryHighRiskOutputs = calculateLandlordInsurance(veryHighRiskInputs);

      expect(veryHighRiskOutputs.annualPremium).toBeGreaterThan(lowRiskOutputs.annualPremium);
      expect(veryHighRiskOutputs.riskScore).toBeGreaterThan(lowRiskOutputs.riskScore);
    });
  });
});
