import { describe, it, expect } from 'vitest';
import { GrossRentMultiplierCalculator } from './GrossRentMultiplierCalculator';
import { calculateGrossRentMultiplier } from './formulas';
import { validateGrossRentMultiplierInputs } from './validation';
import { validateAllGrossRentMultiplierInputs } from './quickValidation';

describe('Gross Rent Multiplier Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(GrossRentMultiplierCalculator.id).toBe('gross-rent-multiplier-calculator');
      expect(GrossRentMultiplierCalculator.name).toBe('Gross Rent Multiplier Calculator');
      expect(GrossRentMultiplierCalculator.category).toBe('finance');
      expect(GrossRentMultiplierCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = ['propertyValue', 'grossAnnualRent', 'propertyType', 'location', 'marketType'];
      requiredInputs.forEach(inputId => {
        const input = GrossRentMultiplierCalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have expected outputs', () => {
      const expectedOutputs = ['grossRentMultiplier', 'netRentMultiplier', 'cashOnCashReturn', 'capRate', 'totalExpenses', 'expenseRatio', 'profitMargin'];
      expectedOutputs.forEach(outputId => {
        const output = GrossRentMultiplierCalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateGrossRentMultiplierInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value is required');
      expect(result.errors).toContain('Gross annual rent is required');
      expect(result.errors).toContain('Property type is required');
      expect(result.errors).toContain('Location is required');
      expect(result.errors).toContain('Market type is required');
    });

    it('should validate data types', () => {
      const result = validateGrossRentMultiplierInputs({
        propertyValue: 'invalid' as any,
        grossAnnualRent: 'invalid' as any,
        propertyType: 'single-family',
        location: 'urban',
        marketType: 'stable'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be a number');
      expect(result.errors).toContain('Gross annual rent must be a number');
    });

    it('should validate ranges', () => {
      const result = validateGrossRentMultiplierInputs({
        propertyValue: 5000, // Too low
        grossAnnualRent: 500, // Too low
        propertyType: 'single-family',
        location: 'urban',
        marketType: 'stable'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be between $10,000 and $100,000,000');
      expect(result.errors).toContain('Gross annual rent must be between $1,000 and $10,000,000');
    });

    it('should validate logical relationships', () => {
      const result = validateGrossRentMultiplierInputs({
        propertyValue: 200000,
        grossAnnualRent: 250000, // Exceeds property value
        propertyType: 'single-family',
        location: 'urban',
        marketType: 'stable'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Gross annual rent cannot exceed property value');
    });

    it('should validate enum values', () => {
      const result = validateGrossRentMultiplierInputs({
        propertyValue: 200000,
        grossAnnualRent: 25000,
        propertyType: 'INVALID',
        location: 'INVALID',
        marketType: 'INVALID'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid property type');
      expect(result.errors).toContain('Invalid location');
      expect(result.errors).toContain('Invalid market type');
    });

    it('should pass validation with valid inputs', () => {
      const result = validateGrossRentMultiplierInputs({
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable',
        squareFootage: 2000,
        bedrooms: 3,
        bathrooms: 2
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic GRM metrics correctly', () => {
      const inputs = {
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable'
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      expect(outputs.grossRentMultiplier).toBe(8.33); // 500000 / 60000
      expect(outputs.monthlyRent).toBe(5000); // 60000 / 12
      expect(outputs.rentalYield).toBe(12.0); // (60000 / 500000) * 100
    });

    it('should calculate net rent multiplier correctly', () => {
      const inputs = {
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable',
        operatingExpenses: 10000,
        propertyTaxes: 8000,
        insurance: 3000,
        maintenance: 5000,
        managementFees: 2000,
        utilities: 4000,
        hoaFees: 0
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      const totalExpenses = 10000 + 8000 + 3000 + 5000 + 2000 + 4000 + 0;
      const netAnnualRent = 60000 - totalExpenses;
      const expectedNRM = 500000 / netAnnualRent;
      expect(outputs.netRentMultiplier).toBeCloseTo(expectedNRM, 1);
    });

    it('should calculate cash-on-cash return correctly', () => {
      const inputs = {
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable',
        operatingExpenses: 10000,
        propertyTaxes: 8000,
        insurance: 3000,
        maintenance: 5000,
        managementFees: 2000,
        utilities: 4000,
        hoaFees: 0
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      const totalExpenses = 10000 + 8000 + 3000 + 5000 + 2000 + 4000 + 0;
      const netAnnualRent = 60000 - totalExpenses;
      const expectedCoC = (netAnnualRent / 500000) * 100;
      expect(outputs.cashOnCashReturn).toBeCloseTo(expectedCoC, 1);
    });

    it('should calculate price per square foot correctly', () => {
      const inputs = {
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable',
        squareFootage: 2500
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      expect(outputs.pricePerSquareFoot).toBe(200); // 500000 / 2500
      expect(outputs.rentPerSquareFoot).toBe(24); // 60000 / 2500
    });

    it('should calculate expense ratio correctly', () => {
      const inputs = {
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable',
        operatingExpenses: 10000,
        propertyTaxes: 8000,
        insurance: 3000,
        maintenance: 5000,
        managementFees: 2000,
        utilities: 4000,
        hoaFees: 0
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      const totalExpenses = 10000 + 8000 + 3000 + 5000 + 2000 + 4000 + 0;
      const expectedExpenseRatio = (totalExpenses / 60000) * 100;
      expect(outputs.expenseRatio).toBeCloseTo(expectedExpenseRatio, 1);
    });

    it('should calculate profit margin correctly', () => {
      const inputs = {
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable',
        operatingExpenses: 10000,
        propertyTaxes: 8000,
        insurance: 3000,
        maintenance: 5000,
        managementFees: 2000,
        utilities: 4000,
        hoaFees: 0
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      const totalExpenses = 10000 + 8000 + 3000 + 5000 + 2000 + 4000 + 0;
      const netAnnualRent = 60000 - totalExpenses;
      const expectedProfitMargin = (netAnnualRent / 60000) * 100;
      expect(outputs.profitMargin).toBeCloseTo(expectedProfitMargin, 1);
    });

    it('should calculate break-even rent correctly', () => {
      const inputs = {
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable',
        operatingExpenses: 10000,
        propertyTaxes: 8000,
        insurance: 3000,
        maintenance: 5000,
        managementFees: 2000,
        utilities: 4000,
        hoaFees: 0
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      const totalExpenses = 10000 + 8000 + 3000 + 5000 + 2000 + 4000 + 0;
      const expectedBreakEven = totalExpenses / 12;
      expect(outputs.breakEvenRent).toBe(expectedBreakEven);
    });
  });

  describe('Gross Rent Multiplier Analysis', () => {
    it('should generate comprehensive analysis', () => {
      const inputs = {
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable',
        squareFootage: 2500,
        bedrooms: 3,
        bathrooms: 2,
        condition: 'good',
        amenities: ['central-air', 'hardwood-floors']
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      const analysis = GrossRentMultiplierCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Gross Rent Multiplier Analysis');
      expect(analysis).toContain('Executive Summary');
      expect(analysis).toContain('Property Analysis');
      expect(analysis).toContain('Financial Metrics');
      expect(analysis).toContain('Investment Analysis');
      expect(analysis).toContain('Risk Assessment');
      expect(analysis).toContain('Market Analysis');
      expect(analysis).toContain('Recommendations');
    });

    it('should include investment grade assessment', () => {
      const inputs = {
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable'
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      const analysis = GrossRentMultiplierCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Investment Grade:');
      expect(['A', 'B', 'C', 'D']).toContain(outputs.investmentGrade);
    });

    it('should include recommended action', () => {
      const inputs = {
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable'
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      const analysis = GrossRentMultiplierCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Recommended Action:');
      expect(outputs.recommendedAction).toBeDefined();
    });

    it('should include market comparison', () => {
      const inputs = {
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable'
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      const analysis = GrossRentMultiplierCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Market Comparison:');
      expect(outputs.marketComparison).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum values', () => {
      const inputs = {
        propertyValue: 10000,
        grossAnnualRent: 1000,
        propertyType: 'single-family',
        location: 'rural',
        marketType: 'declining'
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      expect(outputs.grossRentMultiplier).toBe(10.0); // 10000 / 1000
      expect(outputs.rentalYield).toBe(10.0); // (1000 / 10000) * 100
    });

    it('should handle maximum values', () => {
      const inputs = {
        propertyValue: 100000000,
        grossAnnualRent: 10000000,
        propertyType: 'commercial',
        location: 'urban',
        marketType: 'hot'
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      expect(outputs.grossRentMultiplier).toBe(10.0); // 100000000 / 10000000
      expect(outputs.rentalYield).toBe(10.0); // (10000000 / 100000000) * 100
    });

    it('should handle zero optional values', () => {
      const inputs = {
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable',
        operatingExpenses: 0,
        propertyTaxes: 0,
        insurance: 0,
        maintenance: 0,
        managementFees: 0,
        utilities: 0,
        hoaFees: 0
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      expect(outputs.totalExpenses).toBe(0);
      expect(outputs.netAnnualRent).toBe(60000);
      expect(outputs.netMonthlyRent).toBe(5000);
    });

    it('should handle missing square footage', () => {
      const inputs = {
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable'
      };

      const outputs = calculateGrossRentMultiplier(inputs);
      expect(outputs.pricePerSquareFoot).toBe(0);
      expect(outputs.rentPerSquareFoot).toBe(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const result = validateAllGrossRentMultiplierInputs({
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable'
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch individual field errors', () => {
      const result = validateAllGrossRentMultiplierInputs({
        propertyValue: 5000, // Too low
        grossAnnualRent: 60000,
        propertyType: 'INVALID',
        location: 'suburban',
        marketType: 'stable'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be between $10,000 and $100,000,000');
      expect(result.errors).toContain('Invalid property type');
    });

    it('should validate logical relationships', () => {
      const result = validateAllGrossRentMultiplierInputs({
        propertyValue: 200000,
        grossAnnualRent: 250000, // Exceeds property value
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Gross annual rent cannot exceed property value');
    });

    it('should validate amenities array', () => {
      const result = validateAllGrossRentMultiplierInputs({
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable',
        amenities: ['invalid-amenity']
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid amenity: invalid-amenity');
    });

    it('should validate square footage relationships', () => {
      const result = validateAllGrossRentMultiplierInputs({
        propertyValue: 500000,
        grossAnnualRent: 60000,
        propertyType: 'single-family',
        location: 'suburban',
        marketType: 'stable',
        squareFootage: 1000,
        bedrooms: 5,
        bathrooms: 3
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Square footage seems too low for the number of bedrooms');
      expect(result.errors).toContain('Square footage seems too low for the number of bathrooms');
    });
  });
});
