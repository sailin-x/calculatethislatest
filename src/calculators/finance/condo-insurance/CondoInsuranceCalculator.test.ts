import { describe, it, expect } from 'vitest';
import { CondoInsuranceCalculator } from './CondoInsuranceCalculator';
import { calculateInsurance } from './formulas';
import { validateInsuranceInputs } from './validation';
import { validateAllInsuranceInputs } from './quickValidation';

describe('Condo Insurance Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(CondoInsuranceCalculator.id).toBe('condo-insurance-calculator');
      expect(CondoInsuranceCalculator.name).toBe('Condo Insurance Calculator');
      expect(CondoInsuranceCalculator.category).toBe('finance');
      expect(CondoInsuranceCalculator.subcategory).toBe('insurance');
    });

    it('should have required input fields', () => {
      const requiredInputs = [
        'propertyType', 'squareFootage', 'propertyValue', 'personalPropertyValue',
        'buildingCoverage', 'lossOfUseCoverage', 'personalLiabilityCoverage',
        'medicalPaymentsCoverage', 'deductible', 'location', 'constructionType',
        'yearBuilt', 'securityFeatures', 'claimsHistory', 'creditScore',
        'occupancyType', 'hoaInsurance', 'floodZone', 'earthquakeZone'
      ];

      const inputIds = CondoInsuranceCalculator.inputs.map(input => input.id);
      requiredInputs.forEach(required => {
        expect(inputIds).toContain(required);
      });
    });

    it('should have required output fields', () => {
      const requiredOutputs = [
        'annualPremium', 'monthlyPremium', 'totalCoverage', 'coverageBreakdown',
        'riskScore', 'premiumFactors', 'recommendedCoverage', 'costSavings',
        'coverageGaps', 'policyComparison', 'claimsProbability', 'replacementCost',
        'actualCashValue', 'insuranceAnalysis'
      ];

      const outputIds = CondoInsuranceCalculator.outputs.map(output => output.id);
      requiredOutputs.forEach(required => {
        expect(outputIds).toContain(required);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validInputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const validation = validateInsuranceInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject personal property value exceeding property value', () => {
      const invalidInputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 400000, // Exceeds property value
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const validation = validateInsuranceInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Personal property value cannot exceed property value');
    });

    it('should reject building coverage exceeding property value', () => {
      const invalidInputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 400000, // Exceeds property value
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const validation = validateInsuranceInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Building coverage cannot exceed property value');
    });

    it('should reject invalid property type', () => {
      const invalidInputs = {
        propertyType: 'invalid-type',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const validation = validateInsuranceInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Invalid property type selected');
    });

    it('should reject invalid security features', () => {
      const invalidInputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['invalid-feature'], // Invalid feature
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const validation = validateInsuranceInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Invalid security feature selected');
    });

    it('should reject invalid year built', () => {
      const invalidInputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 1800, // Too old
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const validation = validateInsuranceInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Year built must be between 1900 and 2024');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate urban one-bedroom condo insurance correctly', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);

      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBeGreaterThan(0);
      expect(outputs.totalCoverage).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.claimsProbability).toBeGreaterThan(0);
      expect(outputs.replacementCost).toBeGreaterThan(0);
      expect(outputs.actualCashValue).toBeGreaterThan(0);
      expect(typeof outputs.coverageBreakdown).toBe('string');
      expect(typeof outputs.premiumFactors).toBe('string');
      expect(typeof outputs.recommendedCoverage).toBe('string');
      expect(typeof outputs.coverageGaps).toBe('string');
      expect(typeof outputs.policyComparison).toBe('string');
      expect(typeof outputs.insuranceAnalysis).toBe('string');
    });

    it('should calculate coastal penthouse insurance correctly', () => {
      const inputs = {
        propertyType: 'penthouse',
        squareFootage: 2500,
        propertyValue: 1200000,
        personalPropertyValue: 150000,
        buildingCoverage: 75000,
        lossOfUseCoverage: 50000,
        personalLiabilityCoverage: 500000,
        medicalPaymentsCoverage: 10000,
        deductible: 2500,
        location: 'coastal',
        constructionType: 'fire-resistive',
        yearBuilt: 2015,
        securityFeatures: ['alarm-system', 'security-camera', 'doorman', 'gated-access'],
        claimsHistory: '1',
        creditScore: 'good',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'all-inclusive',
        floodZone: 'v',
        earthquakeZone: 'moderate'
      };

      const outputs = calculateInsurance(inputs);

      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBeGreaterThan(0);
      expect(outputs.totalCoverage).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.claimsProbability).toBeGreaterThan(0);
      expect(outputs.replacementCost).toBeGreaterThan(0);
      expect(outputs.actualCashValue).toBeGreaterThan(0);
    });

    it('should calculate total coverage correctly', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      
      // Manual calculation verification
      const expectedTotalCoverage = 50000 + 25000 + 20000 + 300000 + 5000;
      
      expect(outputs.totalCoverage).toBe(expectedTotalCoverage);
    });

    it('should calculate monthly premium correctly', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      
      // Manual calculation verification
      const expectedMonthlyPremium = Math.round(outputs.annualPremium / 12);
      
      expect(outputs.monthlyPremium).toBe(expectedMonthlyPremium);
    });

    it('should calculate risk score correctly', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      
      expect(outputs.riskScore).toBeGreaterThanOrEqual(1);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should calculate claims probability correctly', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      
      expect(outputs.claimsProbability).toBeGreaterThanOrEqual(1);
      expect(outputs.claimsProbability).toBeLessThanOrEqual(50);
    });

    it('should calculate replacement cost correctly', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      
      expect(outputs.replacementCost).toBeGreaterThan(0);
      expect(outputs.replacementCost).toBeGreaterThanOrEqual(outputs.actualCashValue);
    });

    it('should calculate actual cash value correctly', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      
      expect(outputs.actualCashValue).toBeGreaterThan(0);
      expect(outputs.actualCashValue).toBeLessThanOrEqual(outputs.replacementCost);
    });
  });

  describe('Insurance Analysis', () => {
    it('should generate premium factors correctly', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      
      expect(outputs.premiumFactors).toContain('urban location');
      expect(outputs.premiumFactors).toContain('excellent credit');
      expect(outputs.premiumFactors).toContain('security features');
    });

    it('should generate recommended coverage correctly', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      
      expect(typeof outputs.recommendedCoverage).toBe('string');
      expect(outputs.recommendedCoverage.length).toBeGreaterThan(0);
    });

    it('should calculate cost savings correctly', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      
      expect(outputs.costSavings).toBeGreaterThanOrEqual(0);
    });

    it('should generate coverage gaps analysis correctly', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      
      expect(typeof outputs.coverageGaps).toBe('string');
      expect(outputs.coverageGaps.length).toBeGreaterThan(0);
    });

    it('should generate policy comparison correctly', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      
      expect(typeof outputs.policyComparison).toBe('string');
      expect(outputs.policyComparison.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero building coverage', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 0,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      expect(outputs.totalCoverage).toBe(375000); // 50000 + 0 + 20000 + 300000 + 5000
    });

    it('should handle zero loss of use coverage', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 0,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      expect(outputs.totalCoverage).toBe(380000); // 50000 + 25000 + 0 + 300000 + 5000
    });

    it('should handle no security features', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['none'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      expect(outputs.costSavings).toBeGreaterThanOrEqual(0);
    });

    it('should handle poor credit score', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'poor',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      expect(outputs.riskScore).toBeGreaterThan(50); // Should be higher with poor credit
    });

    it('should handle high claims history', () => {
      const inputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '3+',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const outputs = calculateInsurance(inputs);
      expect(outputs.riskScore).toBeGreaterThan(50); // Should be higher with claims history
      expect(outputs.claimsProbability).toBeGreaterThan(15); // Should be higher with claims history
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const { validateSquareFootage, validatePropertyValue } = require('./quickValidation');

      expect(validateSquareFootage(1200).isValid).toBe(true);
      expect(validateSquareFootage(100).isValid).toBe(false);
      expect(validatePropertyValue(350000).isValid).toBe(true);
      expect(validatePropertyValue(25000).isValid).toBe(false);
    });

    it('should validate all inputs comprehensively', () => {
      const validInputs = {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      };

      const validation = validateAllInsuranceInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });
});
