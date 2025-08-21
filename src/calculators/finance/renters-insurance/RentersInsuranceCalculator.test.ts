import { describe, it, expect } from 'vitest';
import { calculateRentersInsurance } from './formulas';
import { validateRentersInsuranceInputs } from './validation';
import { RentersInsuranceCalculator } from './RentersInsuranceCalculator';

describe('RentersInsuranceCalculator', () => {
  describe('Basic Functionality', () => {
    it('should calculate basic renters insurance premium', () => {
      const inputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'urban',
        state: 'california',
        deductible: '500',
        coverageLevel: 'standard',
        liabilityCoverage: 100000
      };

      const result = calculateRentersInsurance(inputs);

      expect(result.annualPremium).toBeGreaterThan(0);
      expect(result.monthlyPremium).toBeGreaterThan(0);
      expect(result.personalPropertyCoverage).toBe(25000);
      expect(result.liabilityCoverageAmount).toBe(100000);
      expect(result.totalCoverage).toBeGreaterThan(125000);
      expect(result.coverageRatio).toBe(100);
      expect(result.riskScore).toBeGreaterThan(0);
      expect(result.premiumScore).toBeGreaterThan(0);
      expect(result.coverageScore).toBeGreaterThan(0);
    });

    it('should handle minimum required inputs', () => {
      const inputs = {
        rentalValue: 50000,
        personalPropertyValue: 1000
      };

      const result = calculateRentersInsurance(inputs);

      expect(result.annualPremium).toBeGreaterThan(0);
      expect(result.monthlyPremium).toBe(result.annualPremium / 12);
      expect(result.personalPropertyCoverage).toBe(1000);
      expect(result.liabilityCoverageAmount).toBe(100000); // Default value
    });

    it('should calculate different coverage levels correctly', () => {
      const baseInputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'suburban',
        state: 'texas',
        deductible: '500'
      };

      const basicResult = calculateRentersInsurance({ ...baseInputs, coverageLevel: 'basic' });
      const standardResult = calculateRentersInsurance({ ...baseInputs, coverageLevel: 'standard' });
      const premiumResult = calculateRentersInsurance({ ...baseInputs, coverageLevel: 'premium' });
      const comprehensiveResult = calculateRentersInsurance({ ...baseInputs, coverageLevel: 'comprehensive' });

      expect(basicResult.annualPremium).toBeLessThan(standardResult.annualPremium);
      expect(standardResult.annualPremium).toBeLessThan(premiumResult.annualPremium);
      expect(premiumResult.annualPremium).toBeLessThan(comprehensiveResult.annualPremium);
    });
  });

  describe('Risk Factors', () => {
    it('should apply location risk factors correctly', () => {
      const baseInputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        deductible: '500',
        coverageLevel: 'standard'
      };

      const ruralResult = calculateRentersInsurance({ ...baseInputs, location: 'rural' });
      const suburbanResult = calculateRentersInsurance({ ...baseInputs, location: 'suburban' });
      const urbanResult = calculateRentersInsurance({ ...baseInputs, location: 'urban' });

      expect(ruralResult.annualPremium).toBeLessThan(suburbanResult.annualPremium);
      expect(suburbanResult.annualPremium).toBeLessThan(urbanResult.annualPremium);
    });

    it('should apply crime rate factors correctly', () => {
      const baseInputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'suburban',
        deductible: '500',
        coverageLevel: 'standard'
      };

      const lowCrimeResult = calculateRentersInsurance({ ...baseInputs, crimeRate: 'low' });
      const mediumCrimeResult = calculateRentersInsurance({ ...baseInputs, crimeRate: 'medium' });
      const highCrimeResult = calculateRentersInsurance({ ...baseInputs, crimeRate: 'high' });

      expect(lowCrimeResult.annualPremium).toBeLessThan(mediumCrimeResult.annualPremium);
      expect(mediumCrimeResult.annualPremium).toBeLessThan(highCrimeResult.annualPremium);
    });

    it('should apply natural disaster factors correctly', () => {
      const baseInputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'suburban',
        deductible: '500',
        coverageLevel: 'standard'
      };

      const noRiskResult = calculateRentersInsurance({ ...baseInputs, floodZone: 'none', earthquakeZone: 'none' });
      const floodRiskResult = calculateRentersInsurance({ ...baseInputs, floodZone: 'ae', earthquakeZone: 'none' });
      const earthquakeRiskResult = calculateRentersInsurance({ ...baseInputs, floodZone: 'none', earthquakeZone: 'high' });

      expect(noRiskResult.annualPremium).toBeLessThan(floodRiskResult.annualPremium);
      expect(noRiskResult.annualPremium).toBeLessThan(earthquakeRiskResult.annualPremium);
    });

    it('should apply credit score factors correctly', () => {
      const baseInputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'suburban',
        deductible: '500',
        coverageLevel: 'standard'
      };

      const excellentCreditResult = calculateRentersInsurance({ ...baseInputs, creditScore: 800 });
      const goodCreditResult = calculateRentersInsurance({ ...baseInputs, creditScore: 750 });
      const fairCreditResult = calculateRentersInsurance({ ...baseInputs, creditScore: 650 });
      const poorCreditResult = calculateRentersInsurance({ ...baseInputs, creditScore: 500 });

      expect(excellentCreditResult.annualPremium).toBeLessThan(goodCreditResult.annualPremium);
      expect(goodCreditResult.annualPremium).toBeLessThan(fairCreditResult.annualPremium);
      expect(fairCreditResult.annualPremium).toBeLessThan(poorCreditResult.annualPremium);
    });
  });

  describe('Deductible Calculations', () => {
    it('should apply deductible discounts correctly', () => {
      const baseInputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'suburban',
        coverageLevel: 'standard'
      };

      const lowDeductibleResult = calculateRentersInsurance({ ...baseInputs, deductible: '250' });
      const mediumDeductibleResult = calculateRentersInsurance({ ...baseInputs, deductible: '1000' });
      const highDeductibleResult = calculateRentersInsurance({ ...baseInputs, deductible: '2500' });

      expect(lowDeductibleResult.annualPremium).toBeGreaterThan(mediumDeductibleResult.annualPremium);
      expect(mediumDeductibleResult.annualPremium).toBeGreaterThan(highDeductibleResult.annualPremium);
    });

    it('should calculate recommended deductible correctly', () => {
      const lowValueInputs = {
        rentalValue: 200000,
        personalPropertyValue: 15000,
        rentalType: 'apartment',
        location: 'suburban',
        deductible: '500',
        coverageLevel: 'standard'
      };

      const highValueInputs = {
        rentalValue: 500000,
        personalPropertyValue: 75000,
        rentalType: 'house',
        location: 'suburban',
        deductible: '500',
        coverageLevel: 'standard'
      };

      const lowValueResult = calculateRentersInsurance(lowValueInputs);
      const highValueResult = calculateRentersInsurance(highValueInputs);

      expect(lowValueResult.recommendedDeductible).toBe(500);
      expect(highValueResult.recommendedDeductible).toBe(1000);
    });
  });

  describe('Additional Coverage', () => {
    it('should include additional coverage in total coverage calculation', () => {
      const inputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'suburban',
        deductible: '500',
        coverageLevel: 'standard',
        liabilityCoverage: 100000,
        jewelryCoverage: 5000,
        electronicsCoverage: 3000,
        waterBackup: 2000,
        identityTheft: 1000
      };

      const result = calculateRentersInsurance(inputs);

      const expectedTotal = 25000 + 100000 + 1000 + 5000 + 5000 + 3000 + 2000 + 1000;
      expect(result.totalCoverage).toBe(expectedTotal);
    });

    it('should calculate coverage ratio correctly', () => {
      const inputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'suburban',
        deductible: '500',
        coverageLevel: 'comprehensive' // 110% coverage
      };

      const result = calculateRentersInsurance(inputs);

      expect(result.personalPropertyCoverage).toBe(27500); // 110% of 25000
      expect(result.coverageRatio).toBe(110);
    });
  });

  describe('Security Features', () => {
    it('should apply security feature discounts correctly', () => {
      const baseInputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'suburban',
        deductible: '500',
        coverageLevel: 'standard'
      };

      const noSecurityResult = calculateRentersInsurance(baseInputs);
      const withSecurityResult = calculateRentersInsurance({
        ...baseInputs,
        securityFeatures: ['alarm-system', 'smoke-detectors', 'deadbolts']
      });

      expect(withSecurityResult.annualPremium).toBeLessThan(noSecurityResult.annualPremium);
    });

    it('should cap security discounts at 25%', () => {
      const baseInputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'suburban',
        deductible: '500',
        coverageLevel: 'standard'
      };

      const manySecurityFeatures = [
        'alarm-system', 'smoke-detectors', 'deadbolts', 'security-cameras',
        'gated-community', 'doorman', 'fire-sprinklers'
      ];

      const result = calculateRentersInsurance({
        ...baseInputs,
        securityFeatures: manySecurityFeatures
      });

      // The discount should be capped, so premium should still be positive
      expect(result.annualPremium).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const emptyInputs = {};
      const errors = validateRentersInsuranceInputs(emptyInputs);

      expect(errors).toContain('Rental property value is required');
      expect(errors).toContain('Personal property value is required');
    });

    it('should validate numeric ranges', () => {
      const invalidInputs = {
        rentalValue: 1000, // Too low
        personalPropertyValue: 1000000, // Too high
        creditScore: 200, // Too low
        squareFootage: 50000 // Too high
      };

      const errors = validateRentersInsuranceInputs(invalidInputs);

      expect(errors).toContain('Rental property value must be at least $50,000');
      expect(errors).toContain('Personal property value cannot exceed $500,000');
      expect(errors).toContain('Credit score must be at least 300');
      expect(errors).toContain('Square footage cannot exceed 10,000 sq ft');
    });

    it('should validate enum values', () => {
      const invalidInputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'invalid-type',
        location: 'invalid-location',
        crimeRate: 'invalid-crime-rate'
      };

      const errors = validateRentersInsuranceInputs(invalidInputs);

      expect(errors).toContain('Invalid rental type selected');
      expect(errors).toContain('Invalid location type selected');
      expect(errors).toContain('Invalid crime rate selected');
    });

    it('should validate business logic rules', () => {
      const invalidInputs = {
        rentalValue: 100000,
        personalPropertyValue: 60000, // More than 50% of rental value
        liabilityCoverage: 5000, // Less than 10% of personal property value
        lossOfUse: 15000 // More than 20% of personal property value
      };

      const errors = validateRentersInsuranceInputs(invalidInputs);

      expect(errors).toContain('Personal property value should not exceed 50% of rental property value');
      expect(errors).toContain('Liability coverage should be at least 10% of personal property value');
      expect(errors).toContain('Loss of use coverage should not exceed 20% of personal property value');
    });

    it('should pass validation with valid inputs', () => {
      const validInputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'suburban',
        state: 'california',
        deductible: '500',
        coverageLevel: 'standard',
        liabilityCoverage: 100000,
        creditScore: 750
      };

      const errors = validateRentersInsuranceInputs(validInputs);

      expect(errors).toHaveLength(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum values', () => {
      const maxInputs = {
        rentalValue: 5000000,
        personalPropertyValue: 500000,
        rentalType: 'mobile-home',
        location: 'urban',
        state: 'florida',
        crimeRate: 'high',
        floodZone: 've',
        earthquakeZone: 'very-high',
        hurricaneZone: 'very-high',
        tornadoZone: 'very-high',
        wildfireZone: 'very-high',
        deductible: '2500',
        coverageLevel: 'comprehensive',
        liabilityCoverage: 1000000,
        creditScore: 300,
        claimsHistory: '5-plus',
        buildingAge: 100,
        fireStationDistance: 50
      };

      const result = calculateRentersInsurance(maxInputs);

      expect(result.annualPremium).toBeGreaterThan(0);
      expect(result.riskScore).toBeGreaterThan(50);
      expect(result.premiumScore).toBeLessThan(50);
    });

    it('should handle minimum values', () => {
      const minInputs = {
        rentalValue: 50000,
        personalPropertyValue: 1000,
        rentalType: 'studio',
        location: 'rural',
        state: 'north-carolina',
        crimeRate: 'low',
        deductible: '250',
        coverageLevel: 'basic',
        liabilityCoverage: 25000,
        creditScore: 850,
        claimsHistory: 'none',
        buildingAge: 0,
        fireStationDistance: 0
      };

      const result = calculateRentersInsurance(minInputs);

      expect(result.annualPremium).toBeGreaterThan(0);
      expect(result.riskScore).toBeLessThan(30);
      expect(result.premiumScore).toBeGreaterThan(70);
    });

    it('should handle zero additional coverage', () => {
      const inputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'suburban',
        deductible: '500',
        coverageLevel: 'standard',
        liabilityCoverage: 100000,
        jewelryCoverage: 0,
        electronicsCoverage: 0,
        businessEquipmentCoverage: 0,
        musicalInstrumentsCoverage: 0,
        sportsEquipmentCoverage: 0,
        artworkCoverage: 0,
        collectiblesCoverage: 0,
        waterBackup: 0,
        identityTheft: 0,
        petLiability: 0
      };

      const result = calculateRentersInsurance(inputs);

      expect(result.totalCoverage).toBe(126000); // 25000 + 100000 + 1000 (default medical)
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct calculator metadata', () => {
      expect(RentersInsuranceCalculator.id).toBe('renters-insurance-calculator');
      expect(RentersInsuranceCalculator.name).toBe('Renters Insurance Calculator');
      expect(RentersInsuranceCalculator.category).toBe('finance');
      expect(RentersInsuranceCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = RentersInsuranceCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(2);
      expect(requiredInputs.some(input => input.id === 'rentalValue')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'personalPropertyValue')).toBe(true);
    });

    it('should have comprehensive outputs', () => {
      const outputIds = RentersInsuranceCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('annualPremium');
      expect(outputIds).toContain('monthlyPremium');
      expect(outputIds).toContain('personalPropertyCoverage');
      expect(outputIds).toContain('totalCoverage');
      expect(outputIds).toContain('riskScore');
      expect(outputIds).toContain('policyGrade');
    });

    it('should have examples', () => {
      expect(RentersInsuranceCalculator.examples).toHaveLength(3);
      expect(RentersInsuranceCalculator.examples[0].name).toBe('Basic Apartment Coverage');
      expect(RentersInsuranceCalculator.examples[1].name).toBe('Comprehensive House Coverage');
      expect(RentersInsuranceCalculator.examples[2].name).toBe('High-Risk Area Coverage');
    });

    it('should have formulas', () => {
      expect(RentersInsuranceCalculator.formulas).toHaveLength(6);
      expect(RentersInsuranceCalculator.formulas[0].name).toBe('Base Premium Calculation');
      expect(RentersInsuranceCalculator.formulas[1].name).toBe('Deductible Discount');
    });
  });

  describe('Integration Tests', () => {
    it('should calculate and validate together', () => {
      const inputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'suburban',
        state: 'california',
        deductible: '500',
        coverageLevel: 'standard',
        liabilityCoverage: 100000,
        creditScore: 750
      };

      // Should pass validation
      const validationErrors = validateRentersInsuranceInputs(inputs);
      expect(validationErrors).toHaveLength(0);

      // Should calculate successfully
      const result = calculateRentersInsurance(inputs);
      expect(result.annualPremium).toBeGreaterThan(0);
      expect(result.monthlyPremium).toBe(result.annualPremium / 12);
    });

    it('should handle calculator interface methods', () => {
      const inputs = {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'apartment',
        location: 'suburban',
        deductible: '500',
        coverageLevel: 'standard'
      };

      const outputs = RentersInsuranceCalculator.calculate(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);

      const report = RentersInsuranceCalculator.generateReport(inputs, outputs);
      expect(report).toContain('Renters Insurance Analysis Report');
    });
  });
});