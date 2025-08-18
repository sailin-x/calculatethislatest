import { describe, it, expect } from 'vitest';
import { HotelFeasibilityCalculator } from './HotelFeasibilityCalculator';
import { calculateHotelFeasibility } from './formulas';
import { validateHotelFeasibilityInputs } from './validation';
import { validateAllHotelFeasibilityInputs } from './quickValidation';

describe('Hotel Feasibility Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(HotelFeasibilityCalculator.id).toBe('hotel-feasibility-calculator');
      expect(HotelFeasibilityCalculator.name).toBe('Hotel Feasibility & ADR Calculator');
      expect(HotelFeasibilityCalculator.category).toBe('finance');
      expect(HotelFeasibilityCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = HotelFeasibilityCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'totalRooms')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = HotelFeasibilityCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('totalInvestment');
      expect(outputIds).toContain('annualRevenue');
      expect(outputIds).toContain('netOperatingIncome');
      expect(outputIds).toContain('cashFlow');
      expect(outputIds).toContain('feasibilityScore');
      expect(outputIds).toContain('riskScore');
    });

    it('should have calculate function', () => {
      expect(typeof HotelFeasibilityCalculator.calculate).toBe('function');
    });

    it('should have generateReport function', () => {
      expect(typeof HotelFeasibilityCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateHotelFeasibilityInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total rooms is required');
    });

    it('should validate total rooms range', () => {
      const result = validateHotelFeasibilityInputs({ totalRooms: 0 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total rooms must be a positive number');

      const result2 = validateHotelFeasibilityInputs({ totalRooms: 15000 });
      expect(result2.isValid).toBe(false);
      expect(result2.errors).toContain('Total rooms must be between 1 and 10,000');
    });

    it('should validate hotel type', () => {
      const result = validateHotelFeasibilityInputs({ 
        totalRooms: 100, 
        hotelType: 'invalid-type' 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid hotel type');
    });

    it('should validate star rating', () => {
      const result = validateHotelFeasibilityInputs({ 
        totalRooms: 100, 
        starRating: '6' 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid star rating');
    });

    it('should validate location type', () => {
      const result = validateHotelFeasibilityInputs({ 
        totalRooms: 100, 
        location: 'invalid-location' 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid location type');
    });

    it('should validate market type', () => {
      const result = validateHotelFeasibilityInputs({ 
        totalRooms: 100, 
        market: 'invalid-market' 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid market type');
    });

    it('should validate occupancy rate range', () => {
      const result = validateHotelFeasibilityInputs({ 
        totalRooms: 100, 
        occupancyRate: 150 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Occupancy rate must be between 0 and 100');
    });

    it('should validate base ADR range', () => {
      const result = validateHotelFeasibilityInputs({ 
        totalRooms: 100, 
        baseADR: 10 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Base ADR must be between $20 and $2,000');
    });

    it('should validate construction cost range', () => {
      const result = validateHotelFeasibilityInputs({ 
        totalRooms: 100, 
        constructionCost: 10000 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Construction cost must be between $50,000 and $1,000,000 per room');
    });

    it('should validate valid inputs', () => {
      const validInputs = {
        totalRooms: 100,
        hotelType: 'upscale',
        starRating: '4',
        location: 'urban',
        market: 'business',
        occupancyRate: 75,
        baseADR: 200,
        constructionCost: 300000,
        landCost: 5000000,
        softCosts: 2000000,
        furnitureCost: 50000,
        operatingExpenses: 25000,
        laborCosts: 40000,
        utilityCosts: 8000,
        maintenanceCosts: 5000,
        insuranceCosts: 3000,
        propertyTaxes: 4000,
        managementFees: 3,
        franchiseFees: 5,
        financingRate: 6,
        loanTerm: 25,
        downPayment: 20,
        taxRate: 25,
        depreciationPeriod: 39,
        inflationRate: 2,
        revenueGrowth: 3,
        expenseGrowth: 2,
        exitYear: 10,
        exitCapRate: 7,
        additionalRevenue: ['restaurant', 'bar'],
        amenities: ['pool', 'gym', 'spa']
      };

      const result = validateHotelFeasibilityInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic hotel feasibility', () => {
      const inputs = {
        totalRooms: 100,
        hotelType: 'upscale',
        starRating: '4',
        location: 'urban',
        market: 'business',
        occupancyRate: 75,
        baseADR: 200,
        constructionCost: 300000,
        landCost: 5000000,
        softCosts: 2000000,
        furnitureCost: 50000,
        operatingExpenses: 25000,
        laborCosts: 40000,
        utilityCosts: 8000,
        maintenanceCosts: 5000,
        insuranceCosts: 3000,
        propertyTaxes: 4000,
        managementFees: 3,
        franchiseFees: 5,
        financingRate: 6,
        loanTerm: 25,
        downPayment: 20,
        taxRate: 25,
        depreciationPeriod: 39,
        inflationRate: 2,
        revenueGrowth: 3,
        expenseGrowth: 2,
        exitYear: 10,
        exitCapRate: 7,
        additionalRevenue: ['restaurant', 'bar'],
        amenities: ['pool', 'gym', 'spa']
      };

      const outputs = calculateHotelFeasibility(inputs);

      expect(outputs.totalInvestment).toBeGreaterThan(0);
      expect(outputs.annualRevenue).toBeGreaterThan(0);
      expect(outputs.netOperatingIncome).toBeGreaterThan(0);
      expect(outputs.cashFlow).toBeDefined();
      expect(outputs.feasibilityScore).toBeGreaterThanOrEqual(0);
      expect(outputs.feasibilityScore).toBeLessThanOrEqual(100);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should calculate construction cost total', () => {
      const inputs = {
        totalRooms: 50,
        constructionCost: 400000
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.constructionCostTotal).toBe(20000000); // 50 * 400000
    });

    it('should calculate total project cost', () => {
      const inputs = {
        totalRooms: 100,
        constructionCost: 300000,
        landCost: 5000000,
        softCosts: 2000000,
        furnitureCost: 50000
      };

      const outputs = calculateHotelFeasibility(inputs);
      const expectedTotal = 100 * 300000 + 5000000 + 2000000 + 100 * 50000;
      expect(outputs.totalProjectCost).toBe(expectedTotal);
    });

    it('should calculate annual revenue', () => {
      const inputs = {
        totalRooms: 100,
        occupancyRate: 80,
        baseADR: 250,
        additionalRevenue: ['restaurant', 'bar']
      };

      const outputs = calculateHotelFeasibility(inputs);
      const expectedRevenue = 100 * 0.8 * 250 * 365 * 1.23; // Including additional revenue
      expect(outputs.annualRevenue).toBeCloseTo(expectedRevenue, -2);
    });

    it('should calculate net operating income', () => {
      const inputs = {
        totalRooms: 100,
        occupancyRate: 75,
        baseADR: 200,
        operatingExpenses: 30000,
        laborCosts: 50000,
        utilityCosts: 10000,
        maintenanceCosts: 8000,
        insuranceCosts: 5000,
        propertyTaxes: 6000
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.netOperatingIncome).toBeGreaterThan(0);
      expect(outputs.annualExpenses).toBeGreaterThan(0);
    });

    it('should calculate cash flow', () => {
      const inputs = {
        totalRooms: 100,
        financingRate: 6,
        loanTerm: 25,
        downPayment: 20
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.cashFlow).toBeDefined();
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.annualDebtService).toBeGreaterThan(0);
    });

    it('should calculate cash-on-cash return', () => {
      const inputs = {
        totalRooms: 100,
        downPayment: 25
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.cashOnCashReturn).toBeGreaterThan(0);
      expect(outputs.cashOnCashReturn).toBeLessThanOrEqual(100);
    });

    it('should calculate cap rate', () => {
      const inputs = {
        totalRooms: 100
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.capRate).toBeGreaterThan(0);
      expect(outputs.capRate).toBeLessThanOrEqual(20);
    });

    it('should calculate IRR', () => {
      const inputs = {
        totalRooms: 100,
        exitYear: 10
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.IRR).toBeDefined();
    });

    it('should calculate payback period', () => {
      const inputs = {
        totalRooms: 100
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.paybackPeriod).toBeGreaterThan(0);
    });

    it('should calculate break-even occupancy', () => {
      const inputs = {
        totalRooms: 100,
        baseADR: 200
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.breakEvenOccupancy).toBeGreaterThan(0);
      expect(outputs.breakEvenOccupancy).toBeLessThanOrEqual(100);
    });

    it('should calculate break-even ADR', () => {
      const inputs = {
        totalRooms: 100,
        occupancyRate: 75
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.breakEvenADR).toBeGreaterThan(0);
    });
  });

  describe('Hotel Feasibility Analysis', () => {
    it('should generate analysis report', () => {
      const inputs = {
        totalRooms: 100,
        hotelType: 'upscale',
        starRating: '4',
        location: 'urban',
        market: 'business',
        occupancyRate: 75,
        baseADR: 200
      };

      const outputs = calculateHotelFeasibility(inputs);
      const report = HotelFeasibilityCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Hotel Feasibility & ADR Analysis');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Investment Overview');
      expect(report).toContain('Financial Projections');
      expect(report).toContain('Risk Assessment');
      expect(report).toContain('Market Analysis');
      expect(report).toContain('Recommendations');
    });

    it('should include feasibility score in report', () => {
      const inputs = { totalRooms: 100 };
      const outputs = calculateHotelFeasibility(inputs);
      const report = HotelFeasibilityCalculator.generateReport(inputs, outputs);

      expect(report).toContain(`Feasibility Score: ${outputs.feasibilityScore}/100`);
    });

    it('should include risk score in report', () => {
      const inputs = { totalRooms: 100 };
      const outputs = calculateHotelFeasibility(inputs);
      const report = HotelFeasibilityCalculator.generateReport(inputs, outputs);

      expect(report).toContain(`Risk Score: ${outputs.riskScore}/100`);
    });

    it('should include recommendation in report', () => {
      const inputs = { totalRooms: 100 };
      const outputs = calculateHotelFeasibility(inputs);
      const report = HotelFeasibilityCalculator.generateReport(inputs, outputs);

      expect(report).toContain(`Recommendation: ${outputs.recommendation}`);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum values', () => {
      const inputs = {
        totalRooms: 1,
        occupancyRate: 0,
        baseADR: 20,
        constructionCost: 50000
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.totalInvestment).toBeGreaterThan(0);
      expect(outputs.annualRevenue).toBeGreaterThanOrEqual(0);
    });

    it('should handle maximum values', () => {
      const inputs = {
        totalRooms: 10000,
        occupancyRate: 100,
        baseADR: 2000,
        constructionCost: 1000000
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.totalInvestment).toBeGreaterThan(0);
      expect(outputs.annualRevenue).toBeGreaterThan(0);
    });

    it('should handle zero land cost', () => {
      const inputs = {
        totalRooms: 100,
        landCost: 0
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.totalInvestment).toBeGreaterThan(0);
    });

    it('should handle zero soft costs', () => {
      const inputs = {
        totalRooms: 100,
        softCosts: 0
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.totalInvestment).toBeGreaterThan(0);
    });

    it('should handle no additional revenue', () => {
      const inputs = {
        totalRooms: 100,
        additionalRevenue: []
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.annualRevenue).toBeGreaterThan(0);
    });

    it('should handle no amenities', () => {
      const inputs = {
        totalRooms: 100,
        amenities: []
      };

      const outputs = calculateHotelFeasibility(inputs);
      expect(outputs.feasibilityScore).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate total rooms individually', () => {
      const result = validateAllHotelFeasibilityInputs({ totalRooms: 0 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be a positive number');
    });

    it('should validate hotel type individually', () => {
      const result = validateAllHotelFeasibilityInputs({ hotelType: 'invalid' });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid hotel type');
    });

    it('should validate star rating individually', () => {
      const result = validateAllHotelFeasibilityInputs({ starRating: '6' });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid star rating');
    });

    it('should validate location individually', () => {
      const result = validateAllHotelFeasibilityInputs({ location: 'invalid' });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid location type');
    });

    it('should validate market individually', () => {
      const result = validateAllHotelFeasibilityInputs({ market: 'invalid' });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid market type');
    });

    it('should validate occupancy rate individually', () => {
      const result = validateAllHotelFeasibilityInputs({ occupancyRate: 150 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be between 0 and 100');
    });

    it('should validate base ADR individually', () => {
      const result = validateAllHotelFeasibilityInputs({ baseADR: 10 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be between $20 and $2,000');
    });

    it('should validate construction cost individually', () => {
      const result = validateAllHotelFeasibilityInputs({ constructionCost: 10000 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be between $50,000 and $1,000,000 per room');
    });

    it('should validate valid inputs individually', () => {
      const result = validateAllHotelFeasibilityInputs({
        totalRooms: 100,
        hotelType: 'upscale',
        starRating: '4',
        location: 'urban',
        market: 'business',
        occupancyRate: 75,
        baseADR: 200,
        constructionCost: 300000
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
