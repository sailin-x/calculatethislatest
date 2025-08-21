import { describe, it, expect } from 'vitest';
import { WindstormInsuranceCalculator } from './WindstormInsuranceCalculator';
import { calculateWindstormInsurance, generateWindstormInsuranceAnalysis } from './formulas';
import { validateWindstormInsuranceInputs } from './validation';
import {
  validatePropertyValue,
  validatePropertyType,
  validateConstructionType,
  validateRoofType,
  validateWindZone,
  validateDistanceFromCoast,
  validateBuildingAge,
  validateDeductible,
  validateCoverageType,
  validateAdditionalCoverages,
  validateMitigationFeatures,
  validateClaimsHistory,
  validatePolicyTerm,
  validateInsuranceCompany,
  validateAgentCommission,
  validateAllWindstormInsuranceInputs
} from './quickValidation';

describe('WindstormInsuranceCalculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(WindstormInsuranceCalculator.id).toBe('windstorm-insurance-calculator');
      expect(WindstormInsuranceCalculator.name).toBe('Windstorm Insurance Calculator');
      expect(WindstormInsuranceCalculator.category).toBe('finance');
      expect(WindstormInsuranceCalculator.subcategory).toBe('insurance');
    });

    it('should have required methods', () => {
      expect(typeof WindstormInsuranceCalculator.calculate).toBe('function');
      expect(typeof WindstormInsuranceCalculator.generateReport).toBe('function');
    });

    it('should have inputs defined as an object', () => {
      expect(typeof WindstormInsuranceCalculator.inputs).toBe('object');
      expect(Array.isArray(WindstormInsuranceCalculator.inputs)).toBe(false);
    });

    it('should have outputs defined as an array', () => {
      expect(Array.isArray(WindstormInsuranceCalculator.outputs)).toBe(true);
    });
  });

  describe('Input Validation', () => {
    it('should validate property value correctly', () => {
      expect(validatePropertyValue(100000)).toEqual({ isValid: true });
      expect(validatePropertyValue(5000)).toEqual({ 
        isValid: false, 
        error: 'Property value must be at least $10,000' 
      });
      expect(validatePropertyValue(15000000)).toEqual({ 
        isValid: false, 
        error: 'Property value cannot exceed $10,000,000' 
      });
      expect(validatePropertyValue('invalid')).toEqual({ 
        isValid: false, 
        error: 'Property value must be a valid number' 
      });
    });

    it('should validate property type correctly', () => {
      expect(validatePropertyType('residential')).toEqual({ isValid: true });
      expect(validatePropertyType('commercial')).toEqual({ isValid: true });
      expect(validatePropertyType('invalid')).toEqual({ 
        isValid: false, 
        error: 'Property type must be residential, commercial, industrial, or agricultural' 
      });
    });

    it('should validate construction type correctly', () => {
      expect(validateConstructionType('frame')).toEqual({ isValid: true });
      expect(validateConstructionType('steel')).toEqual({ isValid: true });
      expect(validateConstructionType('invalid')).toEqual({ 
        isValid: false, 
        error: 'Construction type must be frame, masonry, steel, or concrete' 
      });
    });

    it('should validate roof type correctly', () => {
      expect(validateRoofType('asphalt_shingle')).toEqual({ isValid: true });
      expect(validateRoofType('metal')).toEqual({ isValid: true });
      expect(validateRoofType('invalid')).toEqual({ 
        isValid: false, 
        error: 'Roof type must be asphalt_shingle, metal, tile, flat, hip, or gable' 
      });
    });

    it('should validate wind zone correctly', () => {
      expect(validateWindZone('low')).toEqual({ isValid: true });
      expect(validateWindZone('extreme')).toEqual({ isValid: true });
      expect(validateWindZone('invalid')).toEqual({ 
        isValid: false, 
        error: 'Wind zone must be low, medium, high, or extreme' 
      });
    });

    it('should validate distance from coast correctly', () => {
      expect(validateDistanceFromCoast(5)).toEqual({ isValid: true });
      expect(validateDistanceFromCoast(-1)).toEqual({ 
        isValid: false, 
        error: 'Distance from coast cannot be negative' 
      });
      expect(validateDistanceFromCoast(150)).toEqual({ 
        isValid: false, 
        error: 'Distance from coast cannot exceed 100 miles' 
      });
    });

    it('should validate building age correctly', () => {
      expect(validateBuildingAge(25)).toEqual({ isValid: true });
      expect(validateBuildingAge(60)).toEqual({ 
        isValid: true, 
        warning: 'Older buildings may have higher insurance costs' 
      });
      expect(validateBuildingAge(-1)).toEqual({ 
        isValid: false, 
        error: 'Building age cannot be negative' 
      });
    });

    it('should validate deductible correctly', () => {
      expect(validateDeductible(5000, { propertyValue: 200000 })).toEqual({ isValid: true });
      expect(validateDeductible(50, { propertyValue: 200000 })).toEqual({ 
        isValid: false, 
        error: 'Deductible must be at least $100' 
      });
      expect(validateDeductible(250000, { propertyValue: 200000 })).toEqual({ 
        isValid: false, 
        error: 'Deductible cannot exceed property value' 
      });
    });

    it('should validate coverage type correctly', () => {
      expect(validateCoverageType('standard')).toEqual({ isValid: true });
      expect(validateCoverageType('premium')).toEqual({ isValid: true });
      expect(validateCoverageType('invalid')).toEqual({ 
        isValid: false, 
        error: 'Coverage type must be basic, standard, comprehensive, or premium' 
      });
    });

    it('should validate additional coverages correctly', () => {
      expect(validateAdditionalCoverages(['contents', 'loss_of_use'])).toEqual({ isValid: true });
      expect(validateAdditionalCoverages(['invalid'])).toEqual({ 
        isValid: false, 
        error: 'Invalid coverage type: invalid' 
      });
    });

    it('should validate mitigation features correctly', () => {
      expect(validateMitigationFeatures(['impact_windows', 'storm_shutters'])).toEqual({ isValid: true });
      expect(validateMitigationFeatures([])).toEqual({ 
        isValid: true, 
        warning: 'No mitigation features may result in higher premiums' 
      });
      expect(validateMitigationFeatures(['invalid'])).toEqual({ 
        isValid: false, 
        error: 'Invalid mitigation feature: invalid' 
      });
    });

    it('should validate claims history correctly', () => {
      expect(validateClaimsHistory('none')).toEqual({ isValid: true });
      expect(validateClaimsHistory('three_plus')).toEqual({ 
        isValid: true, 
        warning: 'Multiple claims may result in higher premiums' 
      });
      expect(validateClaimsHistory('invalid')).toEqual({ 
        isValid: false, 
        error: 'Claims history must be none, one, two, or three_plus' 
      });
    });

    it('should validate policy term correctly', () => {
      expect(validatePolicyTerm(12)).toEqual({ isValid: true });
      expect(validatePolicyTerm(0)).toEqual({ 
        isValid: false, 
        error: 'Policy term must be at least 1 month' 
      });
      expect(validatePolicyTerm(15)).toEqual({ 
        isValid: false, 
        error: 'Policy term cannot exceed 12 months' 
      });
    });

    it('should validate insurance company correctly', () => {
      expect(validateInsuranceCompany('State Farm')).toEqual({ isValid: true });
      expect(validateInsuranceCompany('A')).toEqual({ 
        isValid: false, 
        error: 'Insurance company name must be at least 2 characters' 
      });
    });

    it('should validate agent commission correctly', () => {
      expect(validateAgentCommission(10)).toEqual({ isValid: true });
      expect(validateAgentCommission(-1)).toEqual({ 
        isValid: false, 
        error: 'Agent commission cannot be negative' 
      });
      expect(validateAgentCommission(25)).toEqual({ 
        isValid: false, 
        error: 'Agent commission cannot exceed 20%' 
      });
    });
  });

  describe('Comprehensive Validation', () => {
    it('should validate all inputs correctly', () => {
      const validInputs = {
        propertyValue: 300000,
        propertyType: 'residential',
        constructionType: 'masonry',
        roofType: 'asphalt_shingle',
        windZone: 'medium',
        distanceFromCoast: 10,
        buildingAge: 15,
        deductible: 3000,
        coverageType: 'standard',
        additionalCoverages: ['contents', 'loss_of_use'],
        mitigationFeatures: ['impact_windows'],
        claimsHistory: 'none',
        policyTerm: 12,
        insuranceCompany: 'State Farm',
        agentCommission: 10
      };

      const result = validateAllWindstormInsuranceInputs(validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should catch validation errors', () => {
      const invalidInputs = {
        propertyValue: 5000, // Too low
        propertyType: 'residential',
        constructionType: 'masonry',
        roofType: 'asphalt_shingle',
        windZone: 'medium',
        distanceFromCoast: 10,
        buildingAge: 15,
        deductible: 3000,
        coverageType: 'standard',
        additionalCoverages: ['contents'],
        mitigationFeatures: ['impact_windows'],
        claimsHistory: 'none',
        policyTerm: 12,
        insuranceCompany: 'State Farm',
        agentCommission: 10
      };

      const result = validateAllWindstormInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Property value must be at least $10,000');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate windstorm insurance correctly', () => {
      const inputs = {
        propertyValue: 300000,
        propertyType: 'residential',
        constructionType: 'masonry',
        roofType: 'asphalt_shingle',
        windZone: 'medium',
        distanceFromCoast: 10,
        buildingAge: 15,
        deductible: 3000,
        coverageType: 'standard',
        additionalCoverages: ['contents', 'loss_of_use'],
        mitigationFeatures: ['impact_windows'],
        claimsHistory: 'none',
        policyTerm: 12,
        insuranceCompany: 'State Farm',
        agentCommission: 10
      };

      const outputs = calculateWindstormInsurance(inputs);

      expect(outputs).toHaveProperty('annualPremium');
      expect(outputs).toHaveProperty('monthlyPremium');
      expect(outputs).toHaveProperty('riskScore');
      expect(outputs).toHaveProperty('riskLevel');
      expect(outputs).toHaveProperty('coverageAdequacy');
      expect(outputs).toHaveProperty('insuranceScore');
      expect(outputs).toHaveProperty('valueScore');
      expect(outputs).toHaveProperty('protectionScore');
      expect(outputs).toHaveProperty('affordabilityScore');

      expect(typeof outputs.annualPremium).toBe('number');
      expect(typeof outputs.monthlyPremium).toBe('number');
      expect(typeof outputs.riskScore).toBe('number');
      expect(typeof outputs.riskLevel).toBe('string');
    });

    it('should handle different risk levels correctly', () => {
      const lowRiskInputs = {
        propertyValue: 300000,
        propertyType: 'residential',
        constructionType: 'concrete',
        roofType: 'metal',
        windZone: 'low',
        distanceFromCoast: 50,
        buildingAge: 5,
        deductible: 3000,
        coverageType: 'basic',
        additionalCoverages: [],
        mitigationFeatures: ['impact_windows', 'storm_shutters'],
        claimsHistory: 'none',
        policyTerm: 12,
        insuranceCompany: 'State Farm',
        agentCommission: 10
      };

      const highRiskInputs = {
        propertyValue: 300000,
        propertyType: 'commercial',
        constructionType: 'frame',
        roofType: 'flat',
        windZone: 'extreme',
        distanceFromCoast: 1,
        buildingAge: 40,
        deductible: 3000,
        coverageType: 'comprehensive',
        additionalCoverages: ['contents', 'loss_of_use', 'debris_removal'],
        mitigationFeatures: [],
        claimsHistory: 'three_plus',
        policyTerm: 12,
        insuranceCompany: 'State Farm',
        agentCommission: 10
      };

      const lowRiskOutputs = calculateWindstormInsurance(lowRiskInputs);
      const highRiskOutputs = calculateWindstormInsurance(highRiskInputs);

      expect(lowRiskOutputs.riskLevel).toBe('Low');
      expect(highRiskOutputs.riskLevel).toBe('Extreme');
      expect(highRiskOutputs.annualPremium).toBeGreaterThan(lowRiskOutputs.annualPremium);
    });

    it('should calculate premium breakdown correctly', () => {
      const inputs = {
        propertyValue: 300000,
        propertyType: 'residential',
        constructionType: 'masonry',
        roofType: 'asphalt_shingle',
        windZone: 'medium',
        distanceFromCoast: 10,
        buildingAge: 15,
        deductible: 3000,
        coverageType: 'standard',
        additionalCoverages: ['contents'],
        mitigationFeatures: ['impact_windows'],
        claimsHistory: 'none',
        policyTerm: 12,
        insuranceCompany: 'State Farm',
        agentCommission: 10
      };

      const outputs = calculateWindstormInsurance(inputs);

      expect(outputs.basePremium).toBeGreaterThan(0);
      expect(outputs.deductibleAdjustment).toBeDefined();
      expect(outputs.coverageAdjustment).toBeDefined();
      expect(outputs.additionalCoverageCost).toBeGreaterThan(0);
      expect(outputs.mitigationDiscount).toBeGreaterThan(0);
      expect(outputs.grossPremium).toBeGreaterThan(0);
      expect(outputs.netPremium).toBeGreaterThan(0);
      expect(outputs.annualPremium).toBeGreaterThan(0);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = {
        propertyValue: 300000,
        propertyType: 'residential',
        constructionType: 'masonry',
        roofType: 'asphalt_shingle',
        windZone: 'medium',
        distanceFromCoast: 10,
        buildingAge: 15,
        deductible: 3000,
        coverageType: 'standard',
        additionalCoverages: ['contents', 'loss_of_use'],
        mitigationFeatures: ['impact_windows'],
        claimsHistory: 'none',
        policyTerm: 12,
        insuranceCompany: 'State Farm',
        agentCommission: 10
      };

      const outputs = calculateWindstormInsurance(inputs);
      const report = generateWindstormInsuranceAnalysis(inputs, outputs);

      expect(report).toContain('Windstorm Insurance Analysis');
      expect(report).toContain('Premium Summary');
      expect(report).toContain('Risk Assessment');
      expect(report).toContain('Coverage Analysis');
      expect(report).toContain('Cost-Benefit Analysis');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Assessment Scores');
      expect(report).toContain('Key Insights');

      expect(report).toContain(`$${outputs.annualPremium.toLocaleString()}`);
      expect(report).toContain(outputs.riskLevel);
      expect(report).toContain(outputs.coverageAdequacy);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum property values', () => {
      const inputs = {
        propertyValue: 10000,
        propertyType: 'residential',
        constructionType: 'masonry',
        roofType: 'asphalt_shingle',
        windZone: 'low',
        distanceFromCoast: 50,
        buildingAge: 1,
        deductible: 100,
        coverageType: 'basic',
        additionalCoverages: [],
        mitigationFeatures: [],
        claimsHistory: 'none',
        policyTerm: 12,
        insuranceCompany: 'State Farm',
        agentCommission: 5
      };

      const outputs = calculateWindstormInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeLessThan(50); // Should be low risk
    });

    it('should handle maximum property values', () => {
      const inputs = {
        propertyValue: 10000000,
        propertyType: 'commercial',
        constructionType: 'steel',
        roofType: 'metal',
        windZone: 'extreme',
        distanceFromCoast: 1,
        buildingAge: 100,
        deductible: 1000000,
        coverageType: 'premium',
        additionalCoverages: ['contents', 'loss_of_use', 'debris_removal', 'code_upgrades', 'ordinance_law'],
        mitigationFeatures: ['impact_windows', 'storm_shutters', 'reinforced_roof', 'wind_mitigation', 'elevated_foundation'],
        claimsHistory: 'three_plus',
        policyTerm: 12,
        insuranceCompany: 'State Farm',
        agentCommission: 20
      };

      const outputs = calculateWindstormInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(70); // Should be high risk
    });

    it('should handle all mitigation features', () => {
      const inputs = {
        propertyValue: 300000,
        propertyType: 'residential',
        constructionType: 'concrete',
        roofType: 'metal',
        windZone: 'high',
        distanceFromCoast: 5,
        buildingAge: 10,
        deductible: 5000,
        coverageType: 'comprehensive',
        additionalCoverages: ['contents', 'loss_of_use'],
        mitigationFeatures: ['impact_windows', 'storm_shutters', 'reinforced_roof', 'wind_mitigation', 'elevated_foundation'],
        claimsHistory: 'none',
        policyTerm: 12,
        insuranceCompany: 'State Farm',
        agentCommission: 10
      };

      const outputs = calculateWindstormInsurance(inputs);
      expect(outputs.mitigationDiscount).toBeGreaterThan(0);
      expect(outputs.affordabilityScore).toBeGreaterThan(70); // Should be good affordability
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator interface', () => {
      const inputs = {
        propertyValue: 300000,
        propertyType: 'residential',
        constructionType: 'masonry',
        roofType: 'asphalt_shingle',
        windZone: 'medium',
        distanceFromCoast: 10,
        buildingAge: 15,
        deductible: 3000,
        coverageType: 'standard',
        additionalCoverages: ['contents'],
        mitigationFeatures: ['impact_windows'],
        claimsHistory: 'none',
        policyTerm: 12,
        insuranceCompany: 'State Farm',
        agentCommission: 10
      };

      const outputs = WindstormInsuranceCalculator.calculate(inputs);
      const report = WindstormInsuranceCalculator.generateReport(inputs, outputs);

      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(100);
    });
  });
});
