import { calculateHotelFeasibility } from './formulas';
import { validateHotelFeasibilityInputs } from './validation';
import { HotelFeasibilityInputs } from './types';

describe('HotelFeasibilityCalculator', () => {
  const mockInputs: HotelFeasibilityInputs = {
    propertyAddress: '123 Hotel Blvd, Miami, FL 33101',
    city: 'Miami',
    state: 'FL',
    zipCode: '33101',
    totalRooms: 150,
    roomTypes: {
      standard: 120,
      deluxe: 25,
      suite: 4,
      presidential: 1
    },
    totalSquareFootage: 150000,
    landArea: 5.0,
    buildingAge: 15,
    lastRenovationYear: 2020,
    marketType: 'urban',
    competitionLevel: 'moderate',
    marketDemand: 'high',
    seasonality: 'moderate',
    averageMarketADR: 150,
    averageMarketOccupancy: 70,
    projectedADR: {
      standard: 140,
      deluxe: 180,
      suite: 300,
      presidential: 500
    },
    projectedOccupancy: 75,
    averageLengthOfStay: 2.5,
    revenuePerAvailableRoom: 112,
    acquisitionCost: 15000000,
    renovationCost: 2000000,
    furnitureFixturesEquipment: 1000000,
    workingCapital: 500000,
    totalInvestment: 18500000,
    loanAmount: 12000000,
    interestRate: 0.065,
    loanTerm: 25,
    downPayment: 3000000,
    equityContribution: 6500000,
    roomRevenue: 6000000,
    foodBeverageRevenue: 1200000,
    meetingSpaceRevenue: 300000,
    otherRevenue: 100000,
    targetMarket: ['Business travelers', 'Leisure guests'],
    competitiveAdvantages: ['Prime location', 'Modern amenities'],
    marketChallenges: ['Seasonal demand', 'Competition'],
    growthPotential: 'high',
    marketRisk: 'moderate',
    operationalRisk: 'moderate',
    financialRisk: 'moderate',
    regulatoryRisk: 'low',
    laborCosts: {
      management: 500000,
      frontDesk: 300000,
      housekeeping: 400000,
      maintenance: 200000,
      foodBeverage: 350000,
      other: 150000
    },
    utilityCosts: {
      electricity: 200000,
      gas: 50000,
      water: 30000,
      internet: 20000,
      other: 10000
    },
    maintenanceCosts: {
      routine: 150000,
      capital: 200000,
      emergency: 50000
    },
    insuranceCosts: {
      property: 100000,
      liability: 50000,
      business: 25000
    },
    marketingCosts: {
      advertising: 100000,
      online: 75000,
      promotions: 25000
    },
    otherOperatingCosts: {
      supplies: 100000,
      professional: 50000,
      taxes: 200000,
      other: 50000
    }
  };

  describe('calculateHotelFeasibility', () => {
    it('should calculate basic financial metrics', () => {
      const result = calculateHotelFeasibility(mockInputs);
      
      expect(result).toBeDefined();
      expect(result.totalRevenue).toBeGreaterThan(0);
      expect(result.totalOperatingExpenses).toBeGreaterThan(0);
      expect(result.netOperatingIncome).toBeDefined();
      expect(result.debtService).toBeGreaterThan(0);
      expect(result.cashFlow).toBeDefined();
    });

    it('should calculate key performance indicators', () => {
      const result = calculateHotelFeasibility(mockInputs);
      
      expect(result.averageDailyRate).toBeGreaterThan(0);
      expect(result.occupancyRate).toBe(mockInputs.projectedOccupancy);
      expect(result.revenuePerAvailableRoom).toBeGreaterThan(0);
      expect(result.averageRevenuePerUser).toBeGreaterThan(0);
      expect(result.costPerOccupiedRoom).toBeGreaterThan(0);
      expect(result.grossOperatingProfit).toBeDefined();
      expect(result.grossOperatingProfitMargin).toBeDefined();
    });

    it('should calculate investment analysis metrics', () => {
      const result = calculateHotelFeasibility(mockInputs);
      
      expect(result.totalInvestment).toBeGreaterThan(0);
      expect(result.netPresentValue).toBeDefined();
      expect(result.internalRateOfReturn).toBeDefined();
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.returnOnInvestment).toBeDefined();
      expect(result.returnOnEquity).toBeDefined();
    });

    it('should provide market analysis', () => {
      const result = calculateHotelFeasibility(mockInputs);
      
      expect(result.marketPosition).toBeDefined();
      expect(result.competitivePosition).toBeDefined();
      expect(result.marketShare).toBeGreaterThan(0);
      expect(result.priceElasticity).toBeDefined();
    });

    it('should assess risks', () => {
      const result = calculateHotelFeasibility(mockInputs);
      
      expect(result.overallRiskScore).toBeGreaterThanOrEqual(1);
      expect(result.overallRiskScore).toBeLessThanOrEqual(100);
      expect(Array.isArray(result.riskFactors)).toBe(true);
      expect(Array.isArray(result.riskMitigationStrategies)).toBe(true);
    });

    it('should provide sensitivity analysis', () => {
      const result = calculateHotelFeasibility(mockInputs);
      
      expect(result.breakevenOccupancy).toBeGreaterThan(0);
      expect(result.breakevenADR).toBeGreaterThan(0);
      expect(result.sensitivityAnalysis).toBeDefined();
      expect(result.sensitivityAnalysis.occupancyImpact).toBeDefined();
      expect(result.sensitivityAnalysis.adrImpact).toBeDefined();
      expect(result.sensitivityAnalysis.costImpact).toBeDefined();
    });

    it('should generate recommendations', () => {
      const result = calculateHotelFeasibility(mockInputs);
      
      expect(result.feasibilityRecommendation).toBeDefined();
      expect(Array.isArray(result.keyRecommendations)).toBe(true);
      expect(Array.isArray(result.operationalRecommendations)).toBe(true);
      expect(Array.isArray(result.financialRecommendations)).toBe(true);
      expect(Array.isArray(result.marketingRecommendations)).toBe(true);
    });

    it('should provide five-year projections', () => {
      const result = calculateHotelFeasibility(mockInputs);
      
      expect(result.fiveYearProjections).toBeDefined();
      expect(result.fiveYearProjections.year1).toBeDefined();
      expect(result.fiveYearProjections.year2).toBeDefined();
      expect(result.fiveYearProjections.year3).toBeDefined();
      expect(result.fiveYearProjections.year4).toBeDefined();
      expect(result.fiveYearProjections.year5).toBeDefined();
      
      expect(result.fiveYearProjections.year1.revenue).toBeGreaterThan(0);
      expect(result.fiveYearProjections.year1.expenses).toBeGreaterThan(0);
      expect(result.fiveYearProjections.year1.netIncome).toBeDefined();
    });

    it('should provide summary', () => {
      const result = calculateHotelFeasibility(mockInputs);
      
      expect(result.summary).toBeDefined();
      expect(result.summary.totalAnnualRevenue).toBeGreaterThan(0);
      expect(result.summary.totalAnnualExpenses).toBeGreaterThan(0);
      expect(result.summary.netAnnualIncome).toBeDefined();
      expect(Array.isArray(result.summary.keyStrengths)).toBe(true);
      expect(Array.isArray(result.summary.keyChallenges)).toBe(true);
      expect(Array.isArray(result.summary.nextSteps)).toBe(true);
    });
  });

  describe('validateHotelFeasibilityInputs', () => {
    it('should validate valid inputs', () => {
      const result = validateHotelFeasibilityInputs(mockInputs);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch invalid property address', () => {
      const invalidInputs = { ...mockInputs, propertyAddress: '123' };
      const result = validateHotelFeasibilityInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property address is required and must be at least 10 characters');
    });

    it('should catch invalid total rooms', () => {
      const invalidInputs = { ...mockInputs, totalRooms: 0 };
      const result = validateHotelFeasibilityInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total rooms must be at least 1');
    });

    it('should catch invalid acquisition cost', () => {
      const invalidInputs = { ...mockInputs, acquisitionCost: 50000 };
      const result = validateHotelFeasibilityInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Acquisition cost must be at least $100,000');
    });

    it('should catch invalid interest rate', () => {
      const invalidInputs = { ...mockInputs, interestRate: 0.6 };
      const result = validateHotelFeasibilityInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0% and 50%');
    });

    it('should catch invalid occupancy', () => {
      const invalidInputs = { ...mockInputs, projectedOccupancy: 150 };
      const result = validateHotelFeasibilityInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Projected occupancy must be between 0% and 100%');
    });

    it('should provide warnings for high-risk scenarios', () => {
      const highRiskInputs = { 
        ...mockInputs, 
        buildingAge: 35,
        competitionLevel: 'very_high' as const,
        marketDemand: 'low' as const,
        seasonality: 'extreme' as const,
        projectedOccupancy: 40
      };
      const result = validateHotelFeasibilityInputs(highRiskInputs);
      
      expect(result.warnings).toContain('Building age is over 30 years - consider renovation needs');
      expect(result.warnings).toContain('Very high competition level may impact profitability');
      expect(result.warnings).toContain('Low market demand may affect occupancy rates');
      expect(result.warnings).toContain('Extreme seasonality may create cash flow challenges');
      expect(result.warnings).toContain('Projected occupancy below 50% may indicate market challenges');
    });
  });
});
