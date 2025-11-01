import { describe, it, expect } from 'vitest';
import { EarthquakeInsuranceCalculator } from './EarthquakeInsuranceCalculator';
import { calculateEarthquakeInsurance } from './formulas';
import { validateEarthquakeInsuranceInputs } from './validation';
import { validateAllEarthquakeInsuranceInputs } from './quickValidation';

describe('Earthquake Insurance Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(EarthquakeInsuranceCalculator.id).toBe('EarthquakeInsuranceCalculator');
      expect(EarthquakeInsuranceCalculator.name).toBe('Earthquake Insurance Calculator');
      expect(EarthquakeInsuranceCalculator.category).toBe('finance');
      expect(EarthquakeInsuranceCalculator.subcategory).toBe('insurance');
    });

    it('should have required inputs', () => {
      const requiredInputIds = [
        'propertyValue', 'location', 'seismicZone', 'buildingType', 'buildingAge',
        'stories', 'squareFootage', 'foundationType', 'soilType', 'retrofitStatus',
        'coverageType', 'deductiblePercentage', 'coverageLimit', 'contentsValue',
        'businessInterruption', 'policyType', 'claimsHistory'
      ];

      const inputIds = EarthquakeInsuranceCalculator.inputs.map(input => input.id);
      requiredInputIds.forEach(id => {
        expect(inputIds).toContain(id);
      });
    });

    it('should have required outputs', () => {
      const requiredOutputIds = [
        'annualPremium', 'monthlyPremium', 'deductibleAmount', 'riskScore',
        'seismicRiskLevel', 'premiumFactors', 'coverageBreakdown', 'recommendations',
        'costBenefitAnalysis', 'mitigationOptions', 'policyComparison',
        'claimProbability', 'expectedLoss', 'earthquakeInsuranceAnalysis'
      ];

      const outputIds = EarthquakeInsuranceCalculator.outputs.map(output => output.id);
      requiredOutputIds.forEach(id => {
        expect(outputIds).toContain(id);
      });
    });

    it('should have formulas defined', () => {
      expect(EarthquakeInsuranceCalculator.formulas).toBeDefined();
      expect(EarthquakeInsuranceCalculator.formulas.length).toBeGreaterThan(0);
    });

    it('should have examples defined', () => {
      expect(EarthquakeInsuranceCalculator.examples).toBeDefined();
      expect(EarthquakeInsuranceCalculator.examples.length).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateEarthquakeInsuranceInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate property value range', () => {
      const inputs = {
        propertyValue: 25000,
        location: 'CA',
        seismicZone: 'zone-4',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 600000,
        contentsValue: 75000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const result = validateEarthquakeInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be between $50,000 and $10,000,000');
    });

    it('should validate seismic zone compatibility', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'TX',
        seismicZone: 'zone-4',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const result = validateEarthquakeInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Zone 4 seismic risk is typically only found in high-risk states');
    });

    it('should validate business interruption requirements', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'yes',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const result = validateEarthquakeInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Annual income is required when business interruption coverage is selected');
    });

    it('should validate valid inputs', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const result = validateEarthquakeInsuranceInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate annual premium correctly', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBe(outputs.annualPremium / 12);
    });

    it('should calculate deductible amount correctly', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.deductibleAmount).toBe(60000); // 400000 * 0.15
    });

    it('should calculate risk score correctly', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should calculate claim probability correctly', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.claimProbability).toBeGreaterThan(0);
      expect(outputs.claimProbability).toBeLessThanOrEqual(25);
    });

    it('should calculate expected loss correctly', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.expectedLoss).toBeGreaterThan(0);
      expect(outputs.expectedLoss).toBeLessThan(500000);
    });

    it('should determine seismic risk level correctly', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.seismicRiskLevel).toBeDefined();
      expect(['Very Low Risk', 'Low Risk', 'Moderate Risk', 'High Risk', 'Very High Risk']).toContain(outputs.seismicRiskLevel);
    });
  });

  describe('Earthquake Insurance Analysis', () => {
    it('should generate premium factors explanation', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.premiumFactors).toContain('Premium Factors');
      expect(outputs.premiumFactors).toContain('Seismic Zone');
      expect(outputs.premiumFactors).toContain('Building Type');
    });

    it('should generate coverage breakdown', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.coverageBreakdown).toContain('Coverage Breakdown');
      expect(outputs.coverageBreakdown).toContain('Building Coverage');
      expect(outputs.coverageBreakdown).toContain('Contents Coverage');
    });

    it('should generate recommendations', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.recommendations).toContain('Recommendations');
      expect(outputs.recommendations).toContain('Retrofit Consideration');
    });

    it('should generate cost-benefit analysis', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.costBenefitAnalysis).toContain('Cost-Benefit Analysis');
      expect(outputs.costBenefitAnalysis).toContain('30-Year Premium Cost');
      expect(outputs.costBenefitAnalysis).toContain('Break-Even Analysis');
    });

    it('should generate mitigation options', () => {
      const inputs = {
        propertyValue: 500000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 400000,
        contentsValue: 50000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.mitigationOptions).toContain('Mitigation Options');
      expect(outputs.mitigationOptions).toContain('Seismic Retrofit Options');
      expect(outputs.mitigationOptions).toContain('Emergency Preparedness');
    });
  });

  describe('Edge Cases', () => {
    it('should handle high-risk properties', () => {
      const inputs = {
        propertyValue: 1000000,
        location: 'CA',
        seismicZone: 'zone-4',
        buildingType: 'masonry',
        buildingAge: 80,
        stories: 3,
        squareFootage: 4000,
        foundationType: 'pier-beam',
        soilType: 'fill',
        retrofitStatus: 'none',
        coverageType: 'comprehensive',
        deductiblePercentage: 10,
        coverageLimit: 800000,
        contentsValue: 100000,
        businessInterruption: 'yes',
        annualIncome: 200000,
        policyType: 'commercial',
        claimsHistory: 'multiple'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.riskScore).toBeGreaterThan(70);
      expect(outputs.annualPremium).toBeGreaterThan(5000);
      expect(outputs.claimProbability).toBeGreaterThan(10);
    });

    it('should handle low-risk properties', () => {
      const inputs = {
        propertyValue: 300000,
        location: 'TX',
        seismicZone: 'zone-1',
        buildingType: 'steel-frame',
        buildingAge: 5,
        stories: 1,
        squareFootage: 2000,
        foundationType: 'post-tension',
        soilType: 'rock',
        retrofitStatus: 'complete',
        coverageType: 'building-only',
        deductiblePercentage: 20,
        coverageLimit: 250000,
        contentsValue: 25000,
        businessInterruption: 'no',
        policyType: 'endorsement',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.riskScore).toBeLessThan(30);
      expect(outputs.annualPremium).toBeLessThan(1000);
      expect(outputs.claimProbability).toBeLessThan(5);
    });

    it('should handle retrofitted properties', () => {
      const inputs = {
        propertyValue: 600000,
        location: 'WA',
        seismicZone: 'zone-3',
        buildingType: 'wood-frame',
        buildingAge: 45,
        stories: 2,
        squareFootage: 3000,
        foundationType: 'basement',
        soilType: 'hard-soil',
        retrofitStatus: 'complete',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 500000,
        contentsValue: 75000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.riskScore).toBeLessThan(60);
      expect(outputs.annualPremium).toBeLessThan(3000);
    });

    it('should handle manufactured homes', () => {
      const inputs = {
        propertyValue: 200000,
        location: 'CA',
        seismicZone: 'zone-3',
        buildingType: 'manufactured',
        buildingAge: 20,
        stories: 1,
        squareFootage: 1500,
        foundationType: 'pier-beam',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 150000,
        contentsValue: 30000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      };

      const outputs = calculateEarthquakeInsurance(inputs);
      expect(outputs.riskScore).toBeGreaterThan(60);
      expect(outputs.annualPremium).toBeGreaterThan(2000);
    });
  });

  describe('Quick Validation', () => {
    it('should validate property value in real-time', () => {
      const result = validateAllEarthquakeInsuranceInputs({ propertyValue: 25000 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be at least $50,000');
    });

    it('should validate building age in real-time', () => {
      const result = validateAllEarthquakeInsuranceInputs({ buildingAge: 250 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Building age cannot exceed 200 years');
    });

    it('should validate coverage limit compatibility', () => {
      const result = validateAllEarthquakeInsuranceInputs({
        propertyValue: 500000,
        coverageLimit: 1000000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Coverage limit should not exceed 150% of property value');
    });

    it('should validate seismic zone compatibility', () => {
      const result = validateAllEarthquakeInsuranceInputs({
        location: 'TX',
        seismicZone: 'zone-4'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Zone 4 seismic risk is typically only found in high-risk states');
    });

    it('should validate business interruption requirements', () => {
      const result = validateAllEarthquakeInsuranceInputs({
        businessInterruption: 'yes'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Annual income is required when business interruption coverage is selected');
    });
  });
});
