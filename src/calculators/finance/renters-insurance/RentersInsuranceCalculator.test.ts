import { describe, it, expect } from 'vitest';
import { RentersInsuranceCalculator } from './RentersInsuranceCalculator';
import { validateRentersInsuranceInputs } from './validation';
import { validateAllRentersInsuranceInputs } from './quickValidation';
import { calculateRentersInsurance, generateRentersInsuranceAnalysis } from './formulas';
import { CalculatorInputs, CalculatorOutputs } from '../../types/calculator';

describe('RentersInsuranceCalculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(RentersInsuranceCalculator.id).toBe('renters-insurance-calculator');
      expect(RentersInsuranceCalculator.name).toBe('Renters Insurance Calculator');
      expect(RentersInsuranceCalculator.category).toBe('finance');
      expect(RentersInsuranceCalculator.subcategory).toBe('insurance');
    });

    it('should have required inputs', () => {
      const requiredInputs = [
        'personalPropertyValue'
      ];
      
      requiredInputs.forEach(inputId => {
        const input = RentersInsuranceCalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have required outputs', () => {
      const requiredOutputs = [
        'annualPremium', 'monthlyPremium', 'personalPropertyCoverage', 'totalCoverage',
        'riskScore', 'recommendation'
      ];
      
      requiredOutputs.forEach(outputId => {
        const output = RentersInsuranceCalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });

    it('should have calculation and report generation functions', () => {
      expect(typeof RentersInsuranceCalculator.calculate).toBe('function');
      expect(typeof RentersInsuranceCalculator.generateReport).toBe('function');
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const inputs: CalculatorInputs = {};
      const result = validateRentersInsuranceInputs(inputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Personal property value is required and must be greater than 0');
    });

    it('should validate personal property value ranges', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 2000000 // Invalid: too high
      };
      
      const result = validateRentersInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Personal property value must be between $0 and $1,000,000');
    });

    it('should validate enum values', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 25000,
        propertyType: 'invalid-type', // Invalid enum
        state: 'invalid-state', // Invalid enum
        city: 'invalid-city', // Invalid enum
        crimeRate: 'invalid-rate', // Invalid enum
        smoking: 'invalid-status', // Invalid enum
        pets: 'invalid-pet', // Invalid enum
        securityFeatures: 'invalid-features', // Invalid enum
        fireProtection: 'invalid-protection', // Invalid enum
        floodZone: 'invalid-zone', // Invalid enum
        earthquakeZone: 'invalid-earthquake', // Invalid enum
        claimsHistory: 'invalid-history', // Invalid enum
        occupation: 'invalid-occupation', // Invalid enum
        policyType: 'invalid-policy', // Invalid enum
        replacementCost: 'invalid-cost', // Invalid enum
        identityTheft: 'invalid-theft', // Invalid enum
        waterBackup: 'invalid-backup' // Invalid enum
      };
      
      const result = validateRentersInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property type must be one of: apartment, condo, house, townhouse, duplex, studio, loft, mobile-home');
      expect(result.errors).toContain('Invalid state selection');
      expect(result.errors).toContain('City type must be one of: major-metro, suburban, small-city, rural');
      expect(result.errors).toContain('Crime rate must be one of: low, medium, high');
      expect(result.errors).toContain('Smoking status must be one of: non-smoker, smoker, former-smoker');
      expect(result.errors).toContain('Pet type must be one of: none, dog, cat, other');
      expect(result.errors).toContain('Security features must be one of: none, basic, advanced, gated');
      expect(result.errors).toContain('Fire protection must be one of: none, smoke-detectors, sprinklers, fire-station-nearby');
      expect(result.errors).toContain('Flood zone must be one of: none, low-risk, moderate-risk, high-risk');
      expect(result.errors).toContain('Earthquake zone must be one of: none, low, moderate, high');
      expect(result.errors).toContain('Claims history must be one of: none, 1-2, 3-5, 5-plus');
      expect(result.errors).toContain('Occupation must be one of: student, professional, service, retail, unemployed, retired, other');
      expect(result.errors).toContain('Policy type must be one of: basic, standard, premium, comprehensive');
      expect(result.errors).toContain('Replacement cost must be one of: actual-cash-value, replacement-cost');
      expect(result.errors).toContain('Identity theft coverage must be one of: none, basic, comprehensive');
      expect(result.errors).toContain('Water backup coverage must be one of: none, basic, enhanced');
    });

    it('should provide warnings for logical issues', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 3000, // Very low value
        deductible: 2000, // High deductible
        liabilityCoverage: 50000 // Low liability coverage
      };
      
      const result = validateRentersInsuranceInputs(inputs);
      expect(result.warnings).toContain('Very low property value - consider if all items are included');
      expect(result.warnings).toContain('High deductible may result in significant out-of-pocket costs');
      expect(result.warnings).toContain('Consider higher liability coverage for better protection');
    });

    it('should accept valid inputs', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 25000,
        propertyType: 'apartment',
        state: 'ca',
        city: 'suburban',
        crimeRate: 'medium',
        smoking: 'non-smoker',
        pets: 'none',
        securityFeatures: 'basic',
        fireProtection: 'smoke-detectors',
        floodZone: 'none',
        earthquakeZone: 'none',
        claimsHistory: 'none',
        occupation: 'professional',
        policyType: 'standard',
        replacementCost: 'actual-cash-value',
        identityTheft: 'none',
        waterBackup: 'none'
      };
      
      const result = validateRentersInsuranceInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields', () => {
      const { validatePersonalPropertyValue, validateState } = require('./quickValidation');
      
      expect(validatePersonalPropertyValue(0)).toBe('Personal property value must be greater than 0');
      expect(validatePersonalPropertyValue(25000)).toBeNull();
      
      expect(validateState('invalid')).toBe('Invalid state');
      expect(validateState('ca')).toBeNull();
    });

    it('should validate all inputs', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 25000
      };
      
      const result = validateAllRentersInsuranceInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic renters insurance metrics', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 25000,
        state: 'ca',
        city: 'suburban',
        crimeRate: 'medium',
        smoking: 'non-smoker',
        pets: 'none',
        age: 30,
        creditScore: 750,
        claimsHistory: 'none',
        policyType: 'standard',
        replacementCost: 'actual-cash-value',
        identityTheft: 'none',
        waterBackup: 'none'
      };
      
      const outputs = calculateRentersInsurance(inputs);
      
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBe(outputs.annualPremium / 12);
      expect(outputs.personalPropertyCoverage).toBeGreaterThanOrEqual(25000);
      expect(outputs.liabilityCoverageAmount).toBe(100000); // Default value
      expect(outputs.medicalPaymentsCoverage).toBe(1000); // Default value
      expect(outputs.lossOfUseCoverage).toBe(5000); // Default value
      expect(outputs.totalCoverage).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
      expect(outputs.coverageScore).toBeGreaterThanOrEqual(0);
      expect(outputs.coverageScore).toBeLessThanOrEqual(100);
      expect(outputs.valueScore).toBeGreaterThanOrEqual(0);
      expect(outputs.valueScore).toBeLessThanOrEqual(100);
      expect(outputs.overallScore).toBeGreaterThanOrEqual(0);
      expect(outputs.overallScore).toBeLessThanOrEqual(100);
    });

    it('should handle high-risk scenarios', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 25000,
        state: 'ca',
        city: 'major-metro',
        crimeRate: 'high',
        smoking: 'smoker',
        pets: 'dog',
        petBreed: 'pit bull',
        age: 22,
        creditScore: 580,
        claimsHistory: '5-plus',
        floodZone: 'high-risk',
        earthquakeZone: 'high'
      };
      
      const outputs = calculateRentersInsurance(inputs);
      
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(50);
      expect(outputs.overallScore).toBeLessThan(50);
    });

    it('should calculate coverage analysis correctly', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 25000,
        electronicsValue: 5000,
        jewelryValue: 2000,
        furnitureValue: 8000,
        clothingValue: 3000,
        artValue: 1000,
        sportsEquipmentValue: 500,
        musicalInstrumentsValue: 1000
      };
      
      const outputs = calculateRentersInsurance(inputs);
      
      const totalPropertyValue = 25000 + 5000 + 2000 + 8000 + 3000 + 1000 + 500 + 1000;
      expect(outputs.personalPropertyCoverage).toBeGreaterThanOrEqual(totalPropertyValue);
      expect(outputs.coverageGap).toBeDefined();
      expect(outputs.coverageRatio).toBeDefined();
      expect(outputs.premiumPerThousand).toBeDefined();
    });

    it('should generate appropriate recommendations', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 25000,
        state: 'ca',
        city: 'suburban',
        crimeRate: 'medium'
      };
      
      const outputs = calculateRentersInsurance(inputs);
      
      expect(outputs.recommendation).toBeDefined();
      expect(typeof outputs.recommendation).toBe('string');
      expect(outputs.recommendation.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero property value', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 0
      };
      
      const outputs = calculateRentersInsurance(inputs);
      expect(outputs.personalPropertyCoverage).toBe(10000); // Minimum coverage
    });

    it('should handle very high property values', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 500000
      };
      
      const outputs = calculateRentersInsurance(inputs);
      expect(outputs.personalPropertyCoverage).toBe(500000);
      expect(outputs.annualPremium).toBeGreaterThan(0);
    });

    it('should handle all risk factors', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 25000,
        smoking: 'smoker',
        pets: 'dog',
        petBreed: 'rottweiler',
        age: 19,
        creditScore: 400,
        claimsHistory: '5-plus',
        crimeRate: 'high',
        floodZone: 'high-risk',
        earthquakeZone: 'high',
        securityFeatures: 'none',
        fireProtection: 'none'
      };
      
      const outputs = calculateRentersInsurance(inputs);
      expect(outputs.riskScore).toBeGreaterThan(70);
    });

    it('should handle all policy features', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 25000,
        policyType: 'comprehensive',
        replacementCost: 'replacement-cost',
        identityTheft: 'comprehensive',
        waterBackup: 'enhanced'
      };
      
      const outputs = calculateRentersInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.coverageScore).toBeGreaterThan(50);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 25000,
        state: 'ca',
        city: 'suburban',
        crimeRate: 'medium'
      };
      
      const outputs = calculateRentersInsurance(inputs);
      const report = generateRentersInsuranceAnalysis(inputs, outputs);
      
      expect(report).toContain('Renters Insurance Analysis Report');
      expect(report).toContain('Summary');
      expect(report).toContain('Premium Analysis');
      expect(report).toContain('Coverage Breakdown');
      expect(report).toContain('Coverage Analysis');
      expect(report).toContain('Property Details');
      expect(report).toContain('Location Factors');
      expect(report).toContain('Risk Factors');
      expect(report).toContain('Policy Features');
      expect(report).toContain('Key Benefits');
      expect(report).toContain('Key Risks');
      expect(report).toContain('Recommendations');
    });

    it('should include all calculated values in report', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 25000,
        state: 'ca',
        city: 'suburban',
        crimeRate: 'medium'
      };
      
      const outputs = calculateRentersInsurance(inputs);
      const report = generateRentersInsuranceAnalysis(inputs, outputs);
      
      expect(report).toContain(outputs.recommendation);
      expect(report).toContain(outputs.overallScore.toString());
      expect(report).toContain(outputs.annualPremium.toLocaleString());
      expect(report).toContain(outputs.monthlyPremium.toLocaleString());
      expect(report).toContain(outputs.totalCoverage.toLocaleString());
    });
  });

  describe('Integration', () => {
    it('should work with calculator interface', () => {
      const inputs: CalculatorInputs = {
        personalPropertyValue: 25000
      };
      
      const outputs = RentersInsuranceCalculator.calculate(inputs);
      const report = RentersInsuranceCalculator.generateReport(inputs, outputs);
      
      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
    });
  });
});
