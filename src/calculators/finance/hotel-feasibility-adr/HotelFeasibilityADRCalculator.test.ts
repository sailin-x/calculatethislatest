import { describe, it, expect } from 'vitest';
import { HotelFeasibilityADRCalculator } from './HotelFeasibilityADRCalculator';
import { HotelFeasibilityADRInputs } from './types';

describe('HotelFeasibilityADRCalculator', () => {
  const validInputs: HotelFeasibilityADRInputs = {
    propertyAddress: '123 Hotel Blvd, City, State 12345',
    propertySize: 50000,
    numberOfRooms: 100,
    roomTypes: [
      { type: 'standard', count: 80, baseRate: 140, size: 300 },
      { type: 'deluxe', count: 15, baseRate: 180, size: 400 },
      { type: 'suite', count: 5, baseRate: 250, size: 600 }
    ],
    hotelClass: 'midscale',
    hotelBrand: 'Marriott',
    propertyAge: 15,
    lastRenovation: 5,
    marketLocation: 'Downtown Business District',
    marketType: 'urban',
    marketDemand: 'high',
    marketSupply: 'medium',
    marketGrowthRate: 3.5,
    seasonalityFactor: 1.2,
    competitors: [
      { name: 'Hilton Downtown', distance: 0.5, roomCount: 200, averageRate: 160, occupancyRate: 78, class: 'upscale' },
      { name: 'Sheraton Central', distance: 1.2, roomCount: 150, averageRate: 145, occupancyRate: 72, class: 'midscale' }
    ],
    purchasePrice: 15000000,
    acquisitionCosts: 500000,
    renovationCosts: 2000000,
    workingCapital: 500000,
    totalInvestment: 18000000,
    averageDailyRate: 150,
    occupancyRate: 75,
    revenuePerAvailableRoom: 112,
    averageLengthOfStay: 2.5,
    operatingDaysPerYear: 365,
    roomRevenue: 4000000,
    foodAndBeverageRevenue: 800000,
    ancillaryRevenue: 200000,
    otherRevenue: 100000,
    totalRevenue: 5100000,
    laborCosts: 1800000,
    utilities: 200000,
    maintenance: 150000,
    insurance: 50000,
    propertyTaxes: 100000,
    managementFees: 200000,
    marketing: 100000,
    administrative: 80000,
    otherExpenses: 50000,
    totalOperatingExpenses: 2630000,
    fullTimeEmployees: 25,
    partTimeEmployees: 15,
    averageWage: 18,
    benefitsPercentage: 25,
    businessTravel: 60,
    leisureTravel: 30,
    groupTravel: 10,
    localAttractions: 7,
    transportationAccess: 8,
    marketRisk: 'medium',
    operationalRisk: 'medium',
    financialRisk: 'medium',
    regulatoryRisk: 'low',
    loanAmount: 12600000,
    interestRate: 6.5,
    loanTerm: 25,
    downPayment: 5400000,
    analysisPeriod: 10,
    inflationRate: 2.5,
    discountRate: 12,
    taxRate: 25,
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true
  };

  describe('calculate', () => {
    it('should calculate hotel feasibility metrics correctly', () => {
      const result = HotelFeasibilityADRCalculator.calculate(validInputs);

      expect(result).toBeDefined();
      expect(result.netOperatingIncome).toBeGreaterThan(0);
      expect(result.cashFlow).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
      expect(result.averageDailyRate).toBeGreaterThan(0);
      expect(result.occupancyRate).toBeGreaterThan(0);
      expect(result.revenuePerAvailableRoom).toBeGreaterThan(0);
      expect(result.feasibilityRating).toBeDefined();
    });

    it('should handle invalid inputs', () => {
      const invalidInputs = { ...validInputs, totalInvestment: -1000 };

      expect(() => {
        HotelFeasibilityADRCalculator.calculate(invalidInputs);
      }).toThrow();
    });

    it('should calculate NOI correctly', () => {
      const result = HotelFeasibilityADRCalculator.calculate(validInputs);
      const expectedNOI = validInputs.totalRevenue - validInputs.totalOperatingExpenses;

      expect(result.netOperatingIncome).toBe(expectedNOI);
    });

    it('should calculate cash flow correctly', () => {
      const result = HotelFeasibilityADRCalculator.calculate(validInputs);
      const expectedNOI = validInputs.totalRevenue - validInputs.totalOperatingExpenses;
      const annualDebtService = (validInputs.loanAmount * (validInputs.interestRate / 100 / 12) *
        Math.pow(1 + validInputs.interestRate / 100 / 12, validInputs.loanTerm * 12)) /
        (Math.pow(1 + validInputs.interestRate / 100 / 12, validInputs.loanTerm * 12) - 1) * 12;
      const expectedCashFlow = expectedNOI - annualDebtService;

      expect(Math.abs(result.cashFlow - expectedCashFlow)).toBeLessThan(1);
    });

    it('should calculate cash-on-cash return correctly', () => {
      const result = HotelFeasibilityADRCalculator.calculate(validInputs);
      const expectedNOI = validInputs.totalRevenue - validInputs.totalOperatingExpenses;
      const annualDebtService = (validInputs.loanAmount * (validInputs.interestRate / 100 / 12) *
        Math.pow(1 + validInputs.interestRate / 100 / 12, validInputs.loanTerm * 12)) /
        (Math.pow(1 + validInputs.interestRate / 100 / 12, validInputs.loanTerm * 12) - 1) * 12;
      const cashFlow = expectedNOI - annualDebtService;
      const expectedCoC = (cashFlow / validInputs.totalInvestment) * 100;

      expect(Math.abs(result.cashOnCashReturn - expectedCoC)).toBeLessThan(0.01);
    });

    it('should optimize ADR based on market conditions', () => {
      const result = HotelFeasibilityADRCalculator.calculate(validInputs);

      // ADR should be optimized based on market demand and hotel class
      expect(result.averageDailyRate).toBeGreaterThan(validInputs.averageDailyRate * 0.9);
      expect(result.averageDailyRate).toBeLessThan(validInputs.averageDailyRate * 1.5);
    });

    it('should project occupancy based on market factors', () => {
      const result = HotelFeasibilityADRCalculator.calculate(validInputs);

      // Occupancy should be adjusted based on market conditions
      expect(result.occupancyRate).toBeGreaterThan(60);
      expect(result.occupancyRate).toBeLessThan(90);
    });

    it('should calculate RevPAR correctly', () => {
      const result = HotelFeasibilityADRCalculator.calculate(validInputs);
      const expectedRevPAR = result.averageDailyRate * (result.occupancyRate / 100);

      expect(Math.abs(result.revenuePerAvailableRoom - expectedRevPAR)).toBeLessThan(1);
    });

    it('should determine feasibility rating', () => {
      const result = HotelFeasibilityADRCalculator.calculate(validInputs);

      expect(['Excellent', 'Good', 'Fair', 'Poor']).toContain(result.feasibilityRating);
    });
  });

  describe('generateReport', () => {
    it('should generate a comprehensive report', () => {
      const outputs = HotelFeasibilityADRCalculator.calculate(validInputs);
      const report = HotelFeasibilityADRCalculator.generateReport(validInputs, outputs);

      expect(report).toContain('Hotel Feasibility & ADR Analysis Report');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Key Metrics');
      expect(report).toContain('Analysis');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Next Steps');
    });

    it('should include all key metrics in report', () => {
      const outputs = HotelFeasibilityADRCalculator.calculate(validInputs);
      const report = HotelFeasibilityADRCalculator.generateReport(validInputs, outputs);

      expect(report).toContain(outputs.netOperatingIncome.toLocaleString());
      expect(report).toContain(outputs.cashFlow.toLocaleString());
      expect(report).toContain(outputs.cashOnCashReturn.toFixed(2));
      expect(report).toContain(outputs.internalRateOfReturn.toFixed(2));
      expect(report).toContain(outputs.averageDailyRate.toFixed(2));
      expect(report).toContain(outputs.occupancyRate.toFixed(1));
      expect(report).toContain(outputs.revenuePerAvailableRoom.toFixed(2));
    });
  });

  describe('formulas', () => {
    it('should have correct formula definitions', () => {
      expect(HotelFeasibilityADRCalculator.formulas).toBeDefined();
      expect(HotelFeasibilityADRCalculator.formulas['Net Operating Income']).toBeDefined();
      expect(HotelFeasibilityADRCalculator.formulas['Cash Flow']).toBeDefined();
      expect(HotelFeasibilityADRCalculator.formulas['Cash-on-Cash Return']).toBeDefined();
      expect(HotelFeasibilityADRCalculator.formulas['Internal Rate of Return']).toBeDefined();
      expect(HotelFeasibilityADRCalculator.formulas['Average Daily Rate']).toBeDefined();
      expect(HotelFeasibilityADRCalculator.formulas['Occupancy Rate']).toBeDefined();
      expect(HotelFeasibilityADRCalculator.formulas['Revenue per Available Room']).toBeDefined();
    });
  });

  describe('examples', () => {
    it('should have valid example inputs', () => {
      expect(HotelFeasibilityADRCalculator.examples).toBeDefined();
      expect(HotelFeasibilityADRCalculator.examples.length).toBeGreaterThan(0);

      const example = HotelFeasibilityADRCalculator.examples[0];
      expect(example.name).toBeDefined();
      expect(example.inputs).toBeDefined();

      // Test that example inputs are valid
      expect(() => {
        HotelFeasibilityADRCalculator.calculate(example.inputs);
      }).not.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle zero revenue', () => {
      const zeroRevenueInputs = { ...validInputs, totalRevenue: 0 };
      const result = HotelFeasibilityADRCalculator.calculate(zeroRevenueInputs);

      expect(result.netOperatingIncome).toBe(-validInputs.totalOperatingExpenses);
      expect(result.cashFlow).toBeLessThan(0);
    });

    it('should handle high occupancy', () => {
      const highOccupancyInputs = { ...validInputs, occupancyRate: 95 };
      const result = HotelFeasibilityADRCalculator.calculate(highOccupancyInputs);

      expect(result.occupancyRate).toBeLessThanOrEqual(95);
    });

    it('should handle low occupancy', () => {
      const lowOccupancyInputs = { ...validInputs, occupancyRate: 20 };
      const result = HotelFeasibilityADRCalculator.calculate(lowOccupancyInputs);

      expect(result.occupancyRate).toBeGreaterThanOrEqual(20);
    });

    it('should handle luxury hotel class', () => {
      const luxuryInputs = { ...validInputs, hotelClass: 'luxury' as const };
      const result = HotelFeasibilityADRCalculator.calculate(luxuryInputs);

      expect(result.averageDailyRate).toBeGreaterThan(validInputs.averageDailyRate);
    });

    it('should handle budget hotel class', () => {
      const budgetInputs = { ...validInputs, hotelClass: 'budget' as const };
      const result = HotelFeasibilityADRCalculator.calculate(budgetInputs);

      expect(result.averageDailyRate).toBeLessThan(validInputs.averageDailyRate);
    });
  });
});