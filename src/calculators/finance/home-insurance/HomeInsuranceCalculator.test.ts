import { describe, it, expect } from 'vitest';
import { HomeInsuranceCalculator } from './HomeInsuranceCalculator';
import { calculateHomeInsurance } from './formulas';
import { validateHomeInsuranceInputs } from './validation';
import { validateAllHomeInsuranceInputs } from './quickValidation';

describe('Home Insurance Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(HomeInsuranceCalculator.id).toBe('home-insurance');
      expect(HomeInsuranceCalculator.name).toBe('Home Insurance Calculator');
      expect(HomeInsuranceCalculator.category).toBe('finance');
      expect(HomeInsuranceCalculator.subcategory).toBe('insurance');
    });

    it('should have required inputs', () => {
      const requiredInputs = HomeInsuranceCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'propertyValue')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = HomeInsuranceCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('annualPremium');
      expect(outputIds).toContain('monthlyPremium');
      expect(outputIds).toContain('totalCoverage');
      expect(outputIds).toContain('riskScore');
      expect(outputIds).toContain('premiumToValueRatio');
      expect(outputIds).toContain('totalDiscounts');
      expect(outputIds).toContain('effectivePremium');
    });

    it('should have calculate function', () => {
      expect(typeof HomeInsuranceCalculator.calculate).toBe('function');
    });

    it('should have generateReport function', () => {
      expect(typeof HomeInsuranceCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateAllHomeInsuranceInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate property value range', () => {
      const result = validateAllHomeInsuranceInputs({ propertyValue: 10000 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be between $50,000 and $10,000,000');
    });

    it('should validate property type', () => {
      const result = validateAllHomeInsuranceInputs({
        propertyValue: 500000,
        propertyType: 'invalid-type'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid property type');
    });

    it('should validate construction type', () => {
      const result = validateAllHomeInsuranceInputs({
        propertyValue: 500000,
        constructionType: 'invalid-construction'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid construction type');
    });

    it('should validate dwelling coverage', () => {
      const result = validateAllHomeInsuranceInputs({
        propertyValue: 500000,
        dwellingCoverage: 10000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be between $50,000 and $5,000,000');
    });

    it('should validate deductible options', () => {
      const result = validateAllHomeInsuranceInputs({
        propertyValue: 500000,
        dwellingDeductible: 750
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be one of: 250, 500, 1000, 1500, 2000, 2500, 5000, 10000');
    });

    it('should accept valid inputs', () => {
      const validInputs = {
        propertyValue: 500000,
        propertyAddress: '123 Main St, City, State 12345',
        propertyType: 'single_family',
        propertyAge: 15,
        propertySize: 2500,
        constructionType: 'wood_frame',
        roofType: 'asphalt_shingle',
        roofAge: 10,
        state: 'CA',
        city: 'Los Angeles',
        zipCode: '90210',
        floodZone: 'low_risk',
        crimeRate: 'medium',
        fireStationDistance: 2.5,
        policeStationDistance: 3.0,
        dwellingCoverage: 500000,
        personalPropertyCoverage: 250000,
        liabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        lossOfUseCoverage: 100000,
        otherStructuresCoverage: 50000,
        dwellingDeductible: 1000,
        personalPropertyDeductible: 1000,
        liabilityDeductible: 0,
        hurricaneDeductible: 5000,
        windstormDeductible: 2500,
        claimsInLast3Years: 0,
        claimsInLast5Years: 0,
        claimsInLast10Years: 0,
        totalClaimAmount: 0,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        rentalUnits: 0
      };
      const result = validateAllHomeInsuranceInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic premium correctly', () => {
      const inputs = {
        propertyValue: 500000,
        propertyAddress: '123 Main St, City, State 12345',
        propertyType: 'single_family',
        propertyAge: 15,
        propertySize: 2500,
        constructionType: 'wood_frame',
        roofType: 'asphalt_shingle',
        roofAge: 10,
        state: 'CA',
        city: 'Los Angeles',
        zipCode: '90210',
        floodZone: 'low_risk',
        crimeRate: 'medium',
        fireStationDistance: 2.5,
        policeStationDistance: 3.0,
        dwellingCoverage: 500000,
        personalPropertyCoverage: 250000,
        liabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        lossOfUseCoverage: 100000,
        otherStructuresCoverage: 50000,
        dwellingDeductible: 1000,
        personalPropertyDeductible: 1000,
        liabilityDeductible: 0,
        hurricaneDeductible: 5000,
        windstormDeductible: 2500,
        claimsInLast3Years: 0,
        claimsInLast5Years: 0,
        claimsInLast10Years: 0,
        totalClaimAmount: 0,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        rentalUnits: 0
      };

      const outputs = calculateHomeInsurance(inputs);

      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBeGreaterThan(0);
      expect(outputs.totalCoverage).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(1);
      expect(outputs.riskScore).toBeLessThanOrEqual(10);
    });

    it('should calculate different premiums for different states', () => {
      const baseInputs = {
        propertyValue: 500000,
        propertyAddress: '123 Main St, City, State 12345',
        propertyType: 'single_family',
        propertyAge: 15,
        propertySize: 2500,
        constructionType: 'wood_frame',
        roofType: 'asphalt_shingle',
        roofAge: 10,
        city: 'Los Angeles',
        zipCode: '90210',
        floodZone: 'low_risk',
        crimeRate: 'medium',
        fireStationDistance: 2.5,
        policeStationDistance: 3.0,
        dwellingCoverage: 500000,
        personalPropertyCoverage: 250000,
        liabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        lossOfUseCoverage: 100000,
        otherStructuresCoverage: 50000,
        dwellingDeductible: 1000,
        personalPropertyDeductible: 1000,
        liabilityDeductible: 0,
        hurricaneDeductible: 5000,
        windstormDeductible: 2500,
        claimsInLast3Years: 0,
        claimsInLast5Years: 0,
        claimsInLast10Years: 0,
        totalClaimAmount: 0,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        rentalUnits: 0
      };

      const californiaOutputs = calculateHomeInsurance({ ...baseInputs, state: 'CA' });
      const floridaOutputs = calculateHomeInsurance({ ...baseInputs, state: 'FL' });

      expect(californiaOutputs.annualPremium).toBeGreaterThan(0);
      expect(floridaOutputs.annualPremium).toBeGreaterThan(0);
    });

    it('should calculate different premiums for different construction types', () => {
      const baseInputs = {
        propertyValue: 500000,
        propertyAddress: '123 Main St, City, State 12345',
        propertyType: 'single_family',
        propertyAge: 15,
        propertySize: 2500,
        roofType: 'asphalt_shingle',
        roofAge: 10,
        state: 'CA',
        city: 'Los Angeles',
        zipCode: '90210',
        floodZone: 'low_risk',
        crimeRate: 'medium',
        fireStationDistance: 2.5,
        policeStationDistance: 3.0,
        dwellingCoverage: 500000,
        personalPropertyCoverage: 250000,
        liabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        lossOfUseCoverage: 100000,
        otherStructuresCoverage: 50000,
        dwellingDeductible: 1000,
        personalPropertyDeductible: 1000,
        liabilityDeductible: 0,
        hurricaneDeductible: 5000,
        windstormDeductible: 2500,
        claimsInLast3Years: 0,
        claimsInLast5Years: 0,
        claimsInLast10Years: 0,
        totalClaimAmount: 0,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        rentalUnits: 0
      };

      const woodFrameOutputs = calculateHomeInsurance({ ...baseInputs, constructionType: 'wood_frame' });
      const brickOutputs = calculateHomeInsurance({ ...baseInputs, constructionType: 'brick' });

      expect(woodFrameOutputs.annualPremium).toBeGreaterThan(0);
      expect(brickOutputs.annualPremium).toBeGreaterThan(0);
    });

    it('should apply deductible discounts correctly', () => {
      const baseInputs = {
        propertyValue: 500000,
        propertyAddress: '123 Main St, City, State 12345',
        propertyType: 'single_family',
        propertyAge: 15,
        propertySize: 2500,
        constructionType: 'wood_frame',
        roofType: 'asphalt_shingle',
        roofAge: 10,
        state: 'CA',
        city: 'Los Angeles',
        zipCode: '90210',
        floodZone: 'low_risk',
        crimeRate: 'medium',
        fireStationDistance: 2.5,
        policeStationDistance: 3.0,
        dwellingCoverage: 500000,
        personalPropertyCoverage: 250000,
        liabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        lossOfUseCoverage: 100000,
        otherStructuresCoverage: 50000,
        personalPropertyDeductible: 1000,
        liabilityDeductible: 0,
        hurricaneDeductible: 5000,
        windstormDeductible: 2500,
        claimsInLast3Years: 0,
        claimsInLast5Years: 0,
        claimsInLast10Years: 0,
        totalClaimAmount: 0,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        rentalUnits: 0
      };

      const lowDeductibleOutputs = calculateHomeInsurance({ ...baseInputs, dwellingDeductible: 250 });
      const highDeductibleOutputs = calculateHomeInsurance({ ...baseInputs, dwellingDeductible: 10000 });

      expect(lowDeductibleOutputs.annualPremium).toBeGreaterThan(0);
      expect(highDeductibleOutputs.annualPremium).toBeGreaterThan(0);
    });

    it('should calculate risk scores correctly', () => {
      const lowRiskInputs = {
        propertyValue: 500000,
        propertyAddress: '123 Main St, City, State 12345',
        propertyType: 'single_family',
        propertyAge: 5,
        propertySize: 2500,
        constructionType: 'brick',
        roofType: 'asphalt_shingle',
        roofAge: 5,
        state: 'CA',
        city: 'Los Angeles',
        zipCode: '90210',
        floodZone: 'low_risk',
        crimeRate: 'low',
        fireStationDistance: 1.0,
        policeStationDistance: 1.0,
        dwellingCoverage: 500000,
        personalPropertyCoverage: 250000,
        liabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        lossOfUseCoverage: 100000,
        otherStructuresCoverage: 50000,
        dwellingDeductible: 1000,
        personalPropertyDeductible: 1000,
        liabilityDeductible: 0,
        hurricaneDeductible: 5000,
        windstormDeductible: 2500,
        claimsInLast3Years: 0,
        claimsInLast5Years: 0,
        claimsInLast10Years: 0,
        totalClaimAmount: 0,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        rentalUnits: 0
      };

      const highRiskInputs = {
        propertyValue: 500000,
        propertyAddress: '123 Main St, City, State 12345',
        propertyType: 'single_family',
        propertyAge: 50,
        propertySize: 2500,
        constructionType: 'wood_frame',
        roofType: 'wood_shake',
        roofAge: 25,
        state: 'FL',
        city: 'Miami',
        zipCode: '33101',
        floodZone: 'high_risk',
        crimeRate: 'very_high',
        fireStationDistance: 5.0,
        policeStationDistance: 5.0,
        dwellingCoverage: 500000,
        personalPropertyCoverage: 250000,
        liabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        lossOfUseCoverage: 100000,
        otherStructuresCoverage: 50000,
        dwellingDeductible: 1000,
        personalPropertyDeductible: 1000,
        liabilityDeductible: 0,
        hurricaneDeductible: 5000,
        windstormDeductible: 2500,
        claimsInLast3Years: 2,
        claimsInLast5Years: 3,
        claimsInLast10Years: 5,
        totalClaimAmount: 50000,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        rentalUnits: 2
      };

      const lowRiskOutputs = calculateHomeInsurance(lowRiskInputs);
      const highRiskOutputs = calculateHomeInsurance(highRiskInputs);

      expect(highRiskOutputs.riskScore).toBeGreaterThan(lowRiskOutputs.riskScore);
    });
  });

  describe('Home Insurance Analysis', () => {
    it('should generate analysis report', () => {
      const inputs = {
        propertyValue: 500000,
        propertyAddress: '123 Main St, City, State 12345',
        propertyType: 'single_family',
        propertyAge: 15,
        propertySize: 2500,
        constructionType: 'wood_frame',
        roofType: 'asphalt_shingle',
        roofAge: 10,
        state: 'CA',
        city: 'Los Angeles',
        zipCode: '90210',
        floodZone: 'low_risk',
        crimeRate: 'medium',
        fireStationDistance: 2.5,
        policeStationDistance: 3.0,
        dwellingCoverage: 500000,
        personalPropertyCoverage: 250000,
        liabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        lossOfUseCoverage: 100000,
        otherStructuresCoverage: 50000,
        dwellingDeductible: 1000,
        personalPropertyDeductible: 1000,
        liabilityDeductible: 0,
        hurricaneDeductible: 5000,
        windstormDeductible: 2500,
        claimsInLast3Years: 0,
        claimsInLast5Years: 0,
        claimsInLast10Years: 0,
        totalClaimAmount: 0,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        rentalUnits: 0
      };

      const outputs = calculateHomeInsurance(inputs);
      const report = HomeInsuranceCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Home Insurance Analysis Report');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Key Metrics');
      expect(report).toContain('Analysis');
    });

    it('should include premium information in report', () => {
      const inputs = {
        propertyValue: 500000,
        propertyAddress: '123 Main St, City, State 12345',
        propertyType: 'single_family',
        propertyAge: 15,
        propertySize: 2500,
        constructionType: 'wood_frame',
        roofType: 'asphalt_shingle',
        roofAge: 10,
        state: 'CA',
        city: 'Los Angeles',
        zipCode: '90210',
        floodZone: 'low_risk',
        crimeRate: 'medium',
        fireStationDistance: 2.5,
        policeStationDistance: 3.0,
        dwellingCoverage: 500000,
        personalPropertyCoverage: 250000,
        liabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        lossOfUseCoverage: 100000,
        otherStructuresCoverage: 50000,
        dwellingDeductible: 1000,
        personalPropertyDeductible: 1000,
        liabilityDeductible: 0,
        hurricaneDeductible: 5000,
        windstormDeductible: 2500,
        claimsInLast3Years: 0,
        claimsInLast5Years: 0,
        claimsInLast10Years: 0,
        totalClaimAmount: 0,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        rentalUnits: 0
      };

      const outputs = calculateHomeInsurance(inputs);
      const report = HomeInsuranceCalculator.generateReport(inputs, outputs);

      expect(report).toContain(`$${outputs.annualPremium.toLocaleString()}`);
      expect(report).toContain(`$${outputs.monthlyPremium.toLocaleString()}`);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum property value', () => {
      const inputs = {
        propertyValue: 50000,
        propertyAddress: '123 Main St, City, State 12345',
        propertyType: 'single_family',
        propertyAge: 15,
        propertySize: 2500,
        constructionType: 'wood_frame',
        roofType: 'asphalt_shingle',
        roofAge: 10,
        state: 'CA',
        city: 'Los Angeles',
        zipCode: '90210',
        floodZone: 'low_risk',
        crimeRate: 'medium',
        fireStationDistance: 2.5,
        policeStationDistance: 3.0,
        dwellingCoverage: 50000,
        personalPropertyCoverage: 25000,
        liabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        lossOfUseCoverage: 10000,
        otherStructuresCoverage: 5000,
        dwellingDeductible: 250,
        personalPropertyDeductible: 250,
        liabilityDeductible: 0,
        hurricaneDeductible: 5000,
        windstormDeductible: 2500,
        claimsInLast3Years: 0,
        claimsInLast5Years: 0,
        claimsInLast10Years: 0,
        totalClaimAmount: 0,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        rentalUnits: 0
      };

      const outputs = calculateHomeInsurance(inputs);

      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.totalCoverage).toBeGreaterThan(0);
    });

    it('should handle maximum property value', () => {
      const inputs = {
        propertyValue: 10000000,
        propertyAddress: '123 Main St, City, State 12345',
        propertyType: 'single_family',
        propertyAge: 15,
        propertySize: 2500,
        constructionType: 'wood_frame',
        roofType: 'asphalt_shingle',
        roofAge: 10,
        state: 'CA',
        city: 'Los Angeles',
        zipCode: '90210',
        floodZone: 'low_risk',
        crimeRate: 'medium',
        fireStationDistance: 2.5,
        policeStationDistance: 3.0,
        dwellingCoverage: 10000000,
        personalPropertyCoverage: 5000000,
        liabilityCoverage: 1000000,
        medicalPaymentsCoverage: 10000,
        lossOfUseCoverage: 1000000,
        otherStructuresCoverage: 1000000,
        dwellingDeductible: 10000,
        personalPropertyDeductible: 5000,
        liabilityDeductible: 5000,
        hurricaneDeductible: 50000,
        windstormDeductible: 25000,
        claimsInLast3Years: 0,
        claimsInLast5Years: 0,
        claimsInLast10Years: 0,
        totalClaimAmount: 0,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        rentalUnits: 0
      };

      const outputs = calculateHomeInsurance(inputs);

      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.totalCoverage).toBeGreaterThan(0);
    });

    it('should handle high risk properties', () => {
      const inputs = {
        propertyValue: 500000,
        propertyAddress: '123 Main St, City, State 12345',
        propertyType: 'single_family',
        propertyAge: 50,
        propertySize: 2500,
        constructionType: 'wood_frame',
        roofType: 'wood_shake',
        roofAge: 25,
        state: 'FL',
        city: 'Miami',
        zipCode: '33101',
        floodZone: 'high_risk',
        crimeRate: 'very_high',
        fireStationDistance: 5.0,
        policeStationDistance: 5.0,
        dwellingCoverage: 500000,
        personalPropertyCoverage: 250000,
        liabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        lossOfUseCoverage: 100000,
        otherStructuresCoverage: 50000,
        dwellingDeductible: 1000,
        personalPropertyDeductible: 1000,
        liabilityDeductible: 0,
        hurricaneDeductible: 5000,
        windstormDeductible: 2500,
        claimsInLast3Years: 2,
        claimsInLast5Years: 3,
        claimsInLast10Years: 5,
        totalClaimAmount: 50000,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        rentalUnits: 2
      };

      const outputs = calculateHomeInsurance(inputs);

      expect(outputs.riskScore).toBeGreaterThan(5);
      expect(outputs.annualPremium).toBeGreaterThan(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const propertyValueResult = validateAllHomeInsuranceInputs({ propertyValue: 500000 });
      expect(propertyValueResult.isValid).toBe(false); // Should fail because other required fields are missing

      const invalidPropertyValueResult = validateAllHomeInsuranceInputs({ propertyValue: 10000 });
      expect(invalidPropertyValueResult.isValid).toBe(false);
    });

    it('should validate multiple fields', () => {
      const inputs = {
        propertyValue: 500000,
        propertyAddress: '123 Main St',
        propertyType: 'single_family',
        propertyAge: 15,
        propertySize: 2500,
        constructionType: 'wood_frame',
        roofType: 'asphalt_shingle',
        roofAge: 10,
        state: 'CA',
        city: 'Los Angeles',
        zipCode: '90210',
        floodZone: 'low_risk',
        crimeRate: 'medium',
        fireStationDistance: 2.5,
        policeStationDistance: 3.0,
        dwellingCoverage: 500000,
        personalPropertyCoverage: 250000,
        liabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        lossOfUseCoverage: 100000,
        otherStructuresCoverage: 50000,
        dwellingDeductible: 1000,
        personalPropertyDeductible: 1000,
        liabilityDeductible: 0,
        hurricaneDeductible: 5000,
        windstormDeductible: 2500,
        claimsInLast3Years: 0,
        claimsInLast5Years: 0,
        claimsInLast10Years: 0,
        totalClaimAmount: 0,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        rentalUnits: 0
      };

      const result = validateAllHomeInsuranceInputs(inputs);
      expect(result.isValid).toBe(true);
    });

    it('should catch multiple validation errors', () => {
      const inputs = {
        propertyValue: 10000, // Too low
        propertyType: 'invalid-type', // Invalid
        dwellingDeductible: 150 // Invalid deductible
      };

      const result = validateAllHomeInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });
});
