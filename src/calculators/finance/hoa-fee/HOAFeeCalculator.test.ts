import { describe, it, expect } from 'vitest';
import { HOAFeeCalculator } from './HOAFeeCalculator';
import { calculateHOAFee } from './formulas';
import { validateHOAFeeInputs } from './validation';
import { validateAllHOAFeeInputs } from './quickValidation';

describe('HOA Fee Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(HOAFeeCalculator.id).toBe('HoaFeeCalculator');
      expect(HOAFeeCalculator.name).toBe('HOA Fee Calculator');
      expect(HOAFeeCalculator.category).toBe('finance');
      expect(HOAFeeCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = HOAFeeCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'monthlyHOAFee')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = HOAFeeCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('totalMonthlyFee');
      expect(outputIds).toContain('annualHOACost');
      expect(outputIds).toContain('valueScore');
      expect(outputIds).toContain('riskScore');
    });

    it('should have calculate function', () => {
      expect(typeof HOAFeeCalculator.calculate).toBe('function');
    });

    it('should have generateReport function', () => {
      expect(typeof HOAFeeCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateHOAFeeInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Monthly HOA fee is required');
    });

    it('should validate monthly HOA fee range', () => {
      const result = validateHOAFeeInputs({ monthlyHOAFee: -100 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Monthly HOA fee must be a non-negative number');

      const result2 = validateHOAFeeInputs({ monthlyHOAFee: 6000 });
      expect(result2.isValid).toBe(false);
      expect(result2.errors).toContain('Monthly HOA fee must be $5,000 or less');
    });

    it('should validate property type', () => {
      const result = validateHOAFeeInputs({ 
        monthlyHOAFee: 300, 
        propertyType: 'invalid-type' 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid property type');
    });

    it('should validate square footage range', () => {
      const result = validateHOAFeeInputs({ 
        monthlyHOAFee: 300, 
        squareFootage: 50 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Square footage must be between 100 and 10,000 square feet');
    });

    it('should validate valid inputs', () => {
      const validInputs = {
        monthlyHOAFee: 350,
        propertyType: 'condo',
        squareFootage: 1200,
        bedrooms: 2,
        bathrooms: 2,
        parkingSpaces: 1,
        amenities: ['pool', 'gym', 'concierge'],
        utilitiesIncluded: ['water', 'sewer', 'trash'],
        maintenanceIncluded: ['exterior-painting', 'landscaping'],
        insuranceIncluded: ['building-insurance'],
        reserveFund: 75,
        specialAssessment: 0,
        petFees: 25,
        marketComparison: 'market-rate',
        locationQuality: 'good',
        schoolDistrict: 'good',
        crimeRate: 'low'
      };

      const result = validateHOAFeeInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic HOA fee', () => {
      const inputs = {
        monthlyHOAFee: 350,
        propertyType: 'condo',
        squareFootage: 1200,
        bedrooms: 2,
        bathrooms: 2,
        parkingSpaces: 1,
        amenities: ['pool', 'gym', 'concierge'],
        utilitiesIncluded: ['water', 'sewer', 'trash'],
        maintenanceIncluded: ['exterior-painting', 'landscaping'],
        insuranceIncluded: ['building-insurance'],
        reserveFund: 75,
        specialAssessment: 0,
        petFees: 25
      };

      const outputs = calculateHOAFee(inputs);

      expect(outputs.totalMonthlyFee).toBeGreaterThan(0);
      expect(outputs.annualHOACost).toBeGreaterThan(0);
      expect(outputs.costPerSquareFoot).toBeGreaterThan(0);
      expect(outputs.costPerBedroom).toBeGreaterThan(0);
      expect(outputs.amenityValue).toBeGreaterThan(0);
      expect(outputs.utilitySavings).toBeGreaterThan(0);
      expect(outputs.maintenanceSavings).toBeGreaterThan(0);
      expect(outputs.insuranceSavings).toBeGreaterThan(0);
      expect(outputs.totalSavings).toBeGreaterThan(0);
      expect(outputs.netHOACost).toBeDefined();
      expect(outputs.valueScore).toBeGreaterThanOrEqual(0);
      expect(outputs.valueScore).toBeLessThanOrEqual(100);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should calculate total monthly fee correctly', () => {
      const inputs = {
        monthlyHOAFee: 300,
        reserveFund: 50,
        specialAssessment: 100,
        petFees: 25
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.totalMonthlyFee).toBe(475); // 300 + 50 + 100 + 25
    });

    it('should calculate annual HOA cost correctly', () => {
      const inputs = {
        monthlyHOAFee: 400
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.annualHOACost).toBe(4800); // 400 * 12
    });

    it('should calculate cost per square foot correctly', () => {
      const inputs = {
        monthlyHOAFee: 400,
        squareFootage: 1000
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.costPerSquareFoot).toBe(0.4); // 400 / 1000
    });

    it('should calculate cost per bedroom correctly', () => {
      const inputs = {
        monthlyHOAFee: 400,
        bedrooms: 2
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.costPerBedroom).toBe(200); // 400 / 2
    });

    it('should calculate amenity value correctly', () => {
      const inputs = {
        monthlyHOAFee: 300,
        amenities: ['pool', 'gym', 'concierge']
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.amenityValue).toBe(275); // 50 + 75 + 150
    });

    it('should calculate utility savings correctly', () => {
      const inputs = {
        monthlyHOAFee: 300,
        utilitiesIncluded: ['water', 'sewer', 'trash']
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.utilitySavings).toBe(95); // 40 + 30 + 25
    });

    it('should calculate maintenance savings correctly', () => {
      const inputs = {
        monthlyHOAFee: 300,
        maintenanceIncluded: ['exterior-painting', 'landscaping']
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.maintenanceSavings).toBe(75); // 35 + 40
    });

    it('should calculate insurance savings correctly', () => {
      const inputs = {
        monthlyHOAFee: 300,
        insuranceIncluded: ['building-insurance', 'liability-insurance']
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.insuranceSavings).toBe(120); // 80 + 40
    });

    it('should calculate total savings correctly', () => {
      const inputs = {
        monthlyHOAFee: 300,
        amenities: ['pool'],
        utilitiesIncluded: ['water'],
        maintenanceIncluded: ['landscaping'],
        insuranceIncluded: ['building-insurance']
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.totalSavings).toBe(275); // 50 + 40 + 40 + 80
    });

    it('should calculate net HOA cost correctly', () => {
      const inputs = {
        monthlyHOAFee: 300,
        amenities: ['pool'],
        utilitiesIncluded: ['water'],
        maintenanceIncluded: ['landscaping'],
        insuranceIncluded: ['building-insurance']
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.netHOACost).toBe(25); // 300 - 275
    });

    it('should calculate value score correctly', () => {
      const inputs = {
        monthlyHOAFee: 300,
        amenities: ['pool'],
        utilitiesIncluded: ['water'],
        maintenanceIncluded: ['landscaping'],
        insuranceIncluded: ['building-insurance']
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.valueScore).toBeGreaterThan(0);
      expect(outputs.valueScore).toBeLessThanOrEqual(100);
    });

    it('should calculate risk score correctly', () => {
      const inputs = {
        monthlyHOAFee: 300,
        reserveFundBalance: 100000,
        annualBudget: 500000,
        debtObligations: 0,
        pendingLitigation: 'none',
        managementCompany: 'professional-management',
        hoaAge: 10,
        occupancyRate: 95
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });
  });

  describe('HOA Fee Analysis', () => {
    it('should generate analysis report', () => {
      const inputs = {
        monthlyHOAFee: 350,
        propertyType: 'condo',
        squareFootage: 1200,
        bedrooms: 2,
        amenities: ['pool', 'gym']
      };

      const outputs = calculateHOAFee(inputs);
      const report = HOAFeeCalculator.generateReport(inputs, outputs);

      expect(report).toContain('HOA Fee Analysis');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Cost Overview');
      expect(report).toContain('Cost Breakdown');
      expect(report).toContain('Savings Analysis');
      expect(report).toContain('Value Assessment');
      expect(report).toContain('Risk Assessment');
      expect(report).toContain('Recommendations');
    });

    it('should include value score in report', () => {
      const inputs = { monthlyHOAFee: 300 };
      const outputs = calculateHOAFee(inputs);
      const report = HOAFeeCalculator.generateReport(inputs, outputs);

      expect(report).toContain(`Value Score: ${outputs.valueScore}/100`);
    });

    it('should include risk score in report', () => {
      const inputs = { monthlyHOAFee: 300 };
      const outputs = calculateHOAFee(inputs);
      const report = HOAFeeCalculator.generateReport(inputs, outputs);

      expect(report).toContain(`Risk Score: ${outputs.riskScore}/100`);
    });

    it('should include recommendation in report', () => {
      const inputs = { monthlyHOAFee: 300 };
      const outputs = calculateHOAFee(inputs);
      const report = HOAFeeCalculator.generateReport(inputs, outputs);

      expect(report).toContain(`Recommendation: ${outputs.recommendation}`);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero monthly fee', () => {
      const inputs = {
        monthlyHOAFee: 0
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.totalMonthlyFee).toBe(0);
      expect(outputs.annualHOACost).toBe(0);
    });

    it('should handle zero square footage', () => {
      const inputs = {
        monthlyHOAFee: 300,
        squareFootage: 0
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.costPerSquareFoot).toBe(0);
    });

    it('should handle zero bedrooms', () => {
      const inputs = {
        monthlyHOAFee: 300,
        bedrooms: 0
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.costPerBedroom).toBe(0);
    });

    it('should handle no amenities', () => {
      const inputs = {
        monthlyHOAFee: 300,
        amenities: []
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.amenityValue).toBe(0);
    });

    it('should handle no utilities included', () => {
      const inputs = {
        monthlyHOAFee: 300,
        utilitiesIncluded: []
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.utilitySavings).toBe(0);
    });

    it('should handle no maintenance included', () => {
      const inputs = {
        monthlyHOAFee: 300,
        maintenanceIncluded: []
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.maintenanceSavings).toBe(0);
    });

    it('should handle no insurance included', () => {
      const inputs = {
        monthlyHOAFee: 300,
        insuranceIncluded: []
      };

      const outputs = calculateHOAFee(inputs);
      expect(outputs.insuranceSavings).toBe(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate monthly HOA fee individually', () => {
      const result = validateAllHOAFeeInputs({ monthlyHOAFee: -100 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be a non-negative number');
    });

    it('should validate property type individually', () => {
      const result = validateAllHOAFeeInputs({ propertyType: 'invalid' });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid property type');
    });

    it('should validate square footage individually', () => {
      const result = validateAllHOAFeeInputs({ squareFootage: 50 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be between 100 and 10,000 square feet');
    });

    it('should validate valid inputs individually', () => {
      const result = validateAllHOAFeeInputs({
        monthlyHOAFee: 350,
        propertyType: 'condo',
        squareFootage: 1200,
        bedrooms: 2,
        bathrooms: 2,
        amenities: ['pool', 'gym'],
        utilitiesIncluded: ['water', 'sewer'],
        maintenanceIncluded: ['landscaping'],
        insuranceIncluded: ['building-insurance']
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
