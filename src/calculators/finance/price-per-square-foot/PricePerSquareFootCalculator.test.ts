import { describe, it, expect } from 'vitest';
import { pricePerSquareFootCalculator } from './PricePerSquareFootCalculator';
import { pricePerSquareFootFormulas } from './formulas';
import { pricePerSquareFootValidationRules } from './validation';

describe('Price Per Square Foot Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have the correct basic properties', () => {
      expect(pricePerSquareFootCalculator.id).toBe('price-per-square-foot');
      expect(pricePerSquareFootCalculator.title).toBe('Price Per Square Foot Calculator');
      expect(pricePerSquareFootCalculator.category).toBe('finance');
      expect(pricePerSquareFootCalculator.subcategory).toBe('real-estate');
    });

    it('should have the correct number of inputs', () => {
      expect(pricePerSquareFootCalculator.inputs).toHaveLength(15);
    });

    it('should have the correct number of outputs', () => {
      expect(pricePerSquareFootCalculator.outputs).toHaveLength(12);
    });

    it('should have the correct number of formulas', () => {
      expect(pricePerSquareFootCalculator.formulas).toHaveLength(9);
    });

    it('should have the correct number of validation rules', () => {
      expect(pricePerSquareFootCalculator.validationRules).toHaveLength(17);
    });

    it('should have examples', () => {
      expect(pricePerSquareFootCalculator.examples).toHaveLength(2);
    });
  });

  describe('Input Validation', () => {
    describe('Required validations', () => {
      it('should validate required property price', () => {
        const rule = pricePerSquareFootValidationRules.find(r => r.id === 'property-price-required');
        expect(rule).toBeDefined();
        expect(rule!.validate('', {})).toBe(false);
        expect(rule!.validate(undefined, {})).toBe(false);
        expect(rule!.validate(null, {})).toBe(false);
        expect(rule!.validate(500000, {})).toBe(true);
      });

      it('should validate required total square footage', () => {
        const rule = pricePerSquareFootValidationRules.find(r => r.id === 'total-square-footage-required');
        expect(rule).toBeDefined();
        expect(rule!.validate('', {})).toBe(false);
        expect(rule!.validate(undefined, {})).toBe(false);
        expect(rule!.validate(null, {})).toBe(false);
        expect(rule!.validate(2000, {})).toBe(true);
      });

      it('should validate required property type', () => {
        const rule = pricePerSquareFootValidationRules.find(r => r.id === 'property-type-required');
        expect(rule).toBeDefined();
        expect(rule!.validate('', {})).toBe(false);
        expect(rule!.validate(undefined, {})).toBe(false);
        expect(rule!.validate(null, {})).toBe(false);
        expect(rule!.validate('single-family', {})).toBe(true);
      });
    });

    describe('Range validations', () => {
      it('should validate property price range', () => {
        const rule = pricePerSquareFootValidationRules.find(r => r.id === 'property-price-range');
        expect(rule).toBeDefined();
        expect(rule!.validate(5000, {})).toBe(false); // Too low
        expect(rule!.validate(500000, {})).toBe(true); // Valid
        expect(rule!.validate(200000000, {})).toBe(false); // Too high
      });

      it('should validate total square footage range', () => {
        const rule = pricePerSquareFootValidationRules.find(r => r.id === 'total-square-footage-range');
        expect(rule).toBeDefined();
        expect(rule!.validate(50, {})).toBe(false); // Too low
        expect(rule!.validate(2000, {})).toBe(true); // Valid
        expect(rule!.validate(200000, {})).toBe(false); // Too high
      });

      it('should validate bedrooms range', () => {
        const rule = pricePerSquareFootValidationRules.find(r => r.id === 'bedrooms-range');
        expect(rule).toBeDefined();
        expect(rule!.validate(-1, {})).toBe(false); // Too low
        expect(rule!.validate(3, {})).toBe(true); // Valid
        expect(rule!.validate(25, {})).toBe(false); // Too high
        expect(rule!.validate('', {})).toBe(true); // Optional
      });

      it('should validate bathrooms range', () => {
        const rule = pricePerSquareFootValidationRules.find(r => r.id === 'bathrooms-range');
        expect(rule).toBeDefined();
        expect(rule!.validate(-1, {})).toBe(false); // Too low
        expect(rule!.validate(2, {})).toBe(true); // Valid
        expect(rule!.validate(25, {})).toBe(false); // Too high
        expect(rule!.validate('', {})).toBe(true); // Optional
      });

      it('should validate location factor range', () => {
        const rule = pricePerSquareFootValidationRules.find(r => r.id === 'location-factor-range');
        expect(rule).toBeDefined();
        expect(rule!.validate('poor', {})).toBe(true);
        expect(rule!.validate('excellent', {})).toBe(true);
        expect(rule!.validate('invalid', {})).toBe(false);
        expect(rule!.validate('', {})).toBe(true); // Optional
      });

      it('should validate condition rating range', () => {
        const rule = pricePerSquareFootValidationRules.find(r => r.id === 'condition-rating-range');
        expect(rule).toBeDefined();
        expect(rule!.validate('poor', {})).toBe(true);
        expect(rule!.validate('excellent', {})).toBe(true);
        expect(rule!.validate('invalid', {})).toBe(false);
        expect(rule!.validate('', {})).toBe(true); // Optional
      });
    });

    describe('Business rule validations', () => {
      it('should validate property price to square footage ratio', () => {
        const rule = pricePerSquareFootValidationRules.find(r => r.id === 'property-price-square-footage-ratio');
        expect(rule).toBeDefined();
        
        // Valid ratio: $500,000 / 2000 sqft = $250/sqft
        expect(rule!.validate(500000, { totalSquareFootage: 2000 })).toBe(true);
        
        // Too low ratio: $500,000 / 20000 sqft = $25/sqft
        expect(rule!.validate(500000, { totalSquareFootage: 20000 })).toBe(false);
        
        // Too high ratio: $500,000 / 100 sqft = $5000/sqft
        expect(rule!.validate(500000, { totalSquareFootage: 100 })).toBe(false);
      });

      it('should validate lot size to property ratio', () => {
        const rule = pricePerSquareFootValidationRules.find(r => r.id === 'lot-size-property-ratio');
        expect(rule).toBeDefined();
        
        // Valid: lot size > building size
        expect(rule!.validate(5000, { totalSquareFootage: 2000 })).toBe(true);
        
        // Invalid: lot size < building size
        expect(rule!.validate(1000, { totalSquareFootage: 2000 })).toBe(false);
        
        // Skip validation if either is 0
        expect(rule!.validate(0, { totalSquareFootage: 2000 })).toBe(true);
        expect(rule!.validate(5000, { totalSquareFootage: 0 })).toBe(true);
      });
    });
  });

  describe('Calculation Logic', () => {
    describe('Basic PSF calculation', () => {
      it('should calculate basic price per square foot correctly', () => {
        const formula = pricePerSquareFootFormulas.find(f => f.id === 'basic-psf-calculation');
        expect(formula).toBeDefined();
        
        const result = formula!.calculate({ propertyPrice: 500000, totalSquareFootage: 2000 });
        expect(result.outputs.pricePerSquareFoot).toBe(250);
        expect(result.explanation).toContain('$250.00');
      });

      it('should handle zero square footage', () => {
        const formula = pricePerSquareFootFormulas.find(f => f.id === 'basic-psf-calculation');
        const result = formula!.calculate({ propertyPrice: 500000, totalSquareFootage: 0 });
        expect(result.outputs.pricePerSquareFoot).toBe(0);
      });
    });

    describe('Price per room calculation', () => {
      it('should calculate price per bedroom and bathroom correctly', () => {
        const formula = pricePerSquareFootFormulas.find(f => f.id === 'price-per-room-calculation');
        expect(formula).toBeDefined();
        
        const result = formula!.calculate({ propertyPrice: 500000, bedrooms: 3, bathrooms: 2 });
        expect(result.outputs.pricePerBedroom).toBe(166667);
        expect(result.outputs.pricePerBathroom).toBe(250000);
      });

      it('should handle zero bedrooms or bathrooms', () => {
        const formula = pricePerSquareFootFormulas.find(f => f.id === 'price-per-room-calculation');
        const result = formula!.calculate({ propertyPrice: 500000, bedrooms: 0, bathrooms: 0 });
        expect(result.outputs.pricePerBedroom).toBe(0);
        expect(result.outputs.pricePerBathroom).toBe(0);
      });
    });

    describe('Market comparison analysis', () => {
      it('should calculate market comparison correctly', () => {
        const formula = pricePerSquareFootFormulas.find(f => f.id === 'market-comparison-analysis');
        expect(formula).toBeDefined();
        
        const result = formula!.calculate({ propertyPrice: 500000, totalSquareFootage: 2000, marketAveragePSF: 200 });
        expect(result.outputs.pricePerSquareFoot).toBe(250);
        expect(result.outputs.marketComparison).toBe(25); // 25% above market
      });

      it('should handle zero market average PSF', () => {
        const formula = pricePerSquareFootFormulas.find(f => f.id === 'market-comparison-analysis');
        const result = formula!.calculate({ propertyPrice: 500000, totalSquareFootage: 2000, marketAveragePSF: 0 });
        expect(result.outputs.marketComparison).toBe(0);
      });
    });

    describe('Future projection', () => {
      it('should calculate future projection correctly', () => {
        const formula = pricePerSquareFootFormulas.find(f => f.id === 'future-projection');
        expect(formula).toBeDefined();
        
        const result = formula!.calculate({ propertyPrice: 500000, inflationRate: 3, projectionYears: 5 });
        const expectedValue = 500000 * Math.pow(1.03, 5);
        expect(result.outputs.futureProjection).toBe(Math.round(expectedValue));
      });
    });
  });

  describe('Helper Functions', () => {
    describe('Comparables analysis', () => {
      it('should generate appropriate comparables analysis', () => {
        const formula = pricePerSquareFootFormulas.find(f => f.id === 'comparables-analysis');
        const result = formula!.calculate({
          propertyPrice: 500000,
          totalSquareFootage: 2000,
          comparablePSF1: 250,
          comparablePSF2: 240,
          comparablePSF3: 260
        });
        
        expect(result.outputs.comparablesAnalysis).toContain('competitively');
      });

      it('should handle no comparables', () => {
        const formula = pricePerSquareFootFormulas.find(f => f.id === 'comparables-analysis');
        const result = formula!.calculate({
          propertyPrice: 500000,
          totalSquareFootage: 2000
        });
        
        expect(result.outputs.comparablesAnalysis).toContain('No comparable properties');
      });
    });

    describe('Value assessment', () => {
      it('should generate value assessment based on inputs', () => {
        const formula = pricePerSquareFootFormulas.find(f => f.id === 'value-assessment');
        const result = formula!.calculate({
          propertyPrice: 500000,
          totalSquareFootage: 2000,
          marketAveragePSF: 250,
          locationFactor: 'excellent',
          conditionRating: 'excellent',
          propertyType: 'single-family'
        });
        
        expect(result.outputs.valueAssessment).toContain('Prime location');
        expect(result.outputs.valueAssessment).toContain('Excellent condition');
      });
    });

    describe('Investment analysis', () => {
      it('should generate investment analysis', () => {
        const formula = pricePerSquareFootFormulas.find(f => f.id === 'investment-analysis');
        const result = formula!.calculate({
          propertyPrice: 500000,
          totalSquareFootage: 2000,
          marketAveragePSF: 250,
          locationFactor: 'excellent',
          conditionRating: 'good',
          yearBuilt: 2020
        });
        
        expect(result.outputs.investmentAnalysis).toContain('Strong location');
        expect(result.outputs.investmentAnalysis).toContain('Newer construction');
      });
    });
  });

  describe('Examples', () => {
    it('should have valid example data', () => {
      const example1 = pricePerSquareFootCalculator.examples[0];
      expect(example1.name).toBe('Single Family Home');
      expect(example1.inputs).toBeDefined();
      expect(example1.expectedOutputs).toBeDefined();

      const example2 = pricePerSquareFootCalculator.examples[1];
      expect(example2.name).toBe('Investment Property');
      expect(example2.inputs).toBeDefined();
      expect(example2.expectedOutputs).toBeDefined();
    });

    it('should have realistic example values', () => {
      const example1 = pricePerSquareFootCalculator.examples[0];
      expect(Number(example1.inputs.propertyPrice)).toBeGreaterThan(0);
      expect(Number(example1.inputs.totalSquareFootage)).toBeGreaterThan(0);
      expect(example1.inputs.propertyType).toBe('single-family');
    });
  });

  describe('Integration', () => {
    it('should work with the main calculator formulas array', () => {
      expect(pricePerSquareFootCalculator.formulas).toContainEqual(
        expect.objectContaining({ id: 'basic-psf-calculation' })
      );
      expect(pricePerSquareFootCalculator.formulas).toContainEqual(
        expect.objectContaining({ id: 'market-comparison-analysis' })
      );
    });

    it('should have validation rules that match the calculator inputs', () => {
      const inputFields = pricePerSquareFootCalculator.inputs.map(input => input.id);
      const validationFields = pricePerSquareFootCalculator.validationRules.map(rule => rule.field);
      
      // All required inputs should have validation rules
      const requiredInputs = pricePerSquareFootCalculator.inputs.filter(input => input.required);
      requiredInputs.forEach(input => {
        expect(validationFields).toContain(input.id);
      });
    });
  });
});