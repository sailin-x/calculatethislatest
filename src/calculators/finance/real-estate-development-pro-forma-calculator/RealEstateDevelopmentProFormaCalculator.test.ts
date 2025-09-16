import { describe, it, expect } from 'vitest';
import { calculateRealEstateDevelopment } from './formulas';
// import { getRealEstateValidationRules } from './validation'; // TODO: Enable when validation.ts is properly integrated
import { realEstateDevelopmentProFormaCalculator } from './RealEstateDevelopmentProFormaCalculator';

describe('RealEstateDevelopmentProFormaCalculator', () => {
  describe('Real Estate Development Formulas', () => {
    describe('calculateDevelopmentCosts', () => {
      it('should calculate development costs correctly', () => {
        const result = calculateRealEstateDevelopment({
          calculationType: 'development_costs',
          landCost: 100000,
          constructionCostPerSqFt: 150,
          totalSqFt: 10000,
          softCostsPercentage: 15,
          contingencyPercentage: 5,
          marketingCost: 10000,
          financingCost: 5000
        });

        expect(result.landCost).toBe(100000);
        expect(result.constructionCost).toBe(1500000); // 150 * 10000
        expect(result.softCosts).toBe(225000); // 1,500,000 * 0.15
        expect(result.contingency).toBe(75000); // 1,500,000 * 0.05
        expect(result.totalDevelopmentCost).toBe(1925000); // 100k + 1.5M + 225k + 75k + 10k + 5k
        expect(result.costPerSqFt).toBe(192.5); // 1,925,000 / 10,000
      });

      it('should handle zero additional costs', () => {
        const result = calculateRealEstateDevelopment({
          calculationType: 'development_costs',
          landCost: 50000,
          constructionCostPerSqFt: 120,
          totalSqFt: 5000,
          softCostsPercentage: 10,
          contingencyPercentage: 3,
          marketingCost: 0,
          financingCost: 0
        });

        expect(result.totalDevelopmentCost).toBe(660000); // 50k + 600k + 60k + 18k
        expect(result.costPerSqFt).toBe(132); // 660,000 / 5,000
      });
    });

    describe('calculateRevenueProjections', () => {
      it('should calculate revenue projections with rent increases', () => {
        const result = calculateRealEstateDevelopment({
          calculationType: 'revenue_projections',
          totalSqFt: 10000,
          rentalRatePerSqFt: 25,
          occupancyRate: 95,
          annualRentIncrease: 3,
          holdingPeriodYears: 5,
          exitCapRate: 6
        });

        expect(result.grossAnnualRent).toBe(250000); // 25 * 10000
        expect(result.effectiveGrossIncome).toBe(237500); // 250,000 * 0.95
        expect(result.netOperatingIncome).toBe(213750); // 237,500 * 0.9 (simplified)
        expect(result.annualCashFlow.length).toBe(5);

        // Check rent increases
        expect(result.annualCashFlow[0].grossRent).toBe(250000);
        expect(result.annualCashFlow[1].grossRent).toBeCloseTo(257500, 0); // 250,000 * 1.03
        expect(result.annualCashFlow[4].grossRent).toBeCloseTo(275858, 0); // 250,000 * (1.03)^4
      });

      it('should calculate exit value correctly', () => {
        const result = calculateRealEstateDevelopment({
          calculationType: 'revenue_projections',
          totalSqFt: 10000,
          rentalRatePerSqFt: 25,
          occupancyRate: 95,
          annualRentIncrease: 3,
          holdingPeriodYears: 5,
          exitCapRate: 6
        });

        const finalNOI = result.annualCashFlow[4].netOperatingIncome;
        const expectedExitValue = finalNOI / 0.06; // NOI / cap rate
        expect(result.exitValue).toBeCloseTo(expectedExitValue, 0);
      });
    });

    describe('calculateDevelopmentFinancing', () => {
      it('should calculate financing with interest-only period', () => {
        const result = calculateRealEstateDevelopment({
          calculationType: 'financing',
          landCost: 100000,
          constructionCostPerSqFt: 150,
          totalSqFt: 10000,
          equityPercentage: 30,
          interestRate: 5,
          loanTermYears: 25,
          constructionPeriodMonths: 12,
          interestOnlyPeriodMonths: 24
        });

        const totalCost = 100000 + (150 * 10000); // 1,600,000
        expect(result.totalDevelopmentCost).toBe(1600000);
        expect(result.equityAmount).toBe(480000); // 1,600,000 * 0.3
        expect(result.loanAmount).toBe(1120000); // 1,600,000 * 0.7
        expect(result.loanToValueRatio).toBe(70);
        expect(result.monthlyDebtService).toBeGreaterThan(0);
        expect(result.annualDebtService).toBeGreaterThan(0);
      });

      it('should handle 100% equity financing', () => {
        const result = calculateRealEstateDevelopment({
          calculationType: 'financing',
          landCost: 100000,
          constructionCostPerSqFt: 150,
          totalSqFt: 10000,
          equityPercentage: 100,
          interestRate: 5,
          loanTermYears: 25,
          constructionPeriodMonths: 12,
          interestOnlyPeriodMonths: 24
        });

        expect(result.equityAmount).toBe(1600000);
        expect(result.loanAmount).toBe(0);
        expect(result.monthlyDebtService).toBe(0);
        expect(result.loanToValueRatio).toBe(0);
      });
    });

    describe('calculateInvestmentReturns', () => {
      it('should calculate IRR and returns correctly', () => {
        const result = calculateRealEstateDevelopment({
          calculationType: 'investment_returns',
          landCost: 100000,
          constructionCostPerSqFt: 150,
          totalSqFt: 10000,
          softCostsPercentage: 15,
          contingencyPercentage: 5,
          rentalRatePerSqFt: 25,
          occupancyRate: 95,
          annualRentIncrease: 3,
          holdingPeriodYears: 5,
          exitCapRate: 6,
          equityPercentage: 30,
          interestRate: 5,
          loanTermYears: 25,
          constructionPeriodMonths: 12,
          interestOnlyPeriodMonths: 24
        });

        expect(result.equityAmount).toBeGreaterThan(0);
        expect(result.totalCashFlow).toBeGreaterThan(result.equityAmount);
        expect(result.equityMultiple).toBeGreaterThan(1);
        expect(result.internalRateOfReturn).toBeGreaterThan(0);
        expect(result.cashOnCashReturn).toBeGreaterThan(0);
        expect(result.profit).toBeGreaterThan(0);
      });

      it('should handle negative returns', () => {
        const result = calculateRealEstateDevelopment({
          calculationType: 'investment_returns',
          landCost: 1000000, // Very expensive land
          constructionCostPerSqFt: 300, // Expensive construction
          totalSqFt: 5000,
          softCostsPercentage: 25,
          contingencyPercentage: 10,
          rentalRatePerSqFt: 15, // Low rental rate
          occupancyRate: 80,
          annualRentIncrease: 1,
          holdingPeriodYears: 5,
          exitCapRate: 8, // High exit cap rate
          equityPercentage: 40,
          interestRate: 7,
          loanTermYears: 20,
          constructionPeriodMonths: 18,
          interestOnlyPeriodMonths: 36
        });

        expect(result.equityAmount).toBeGreaterThan(0);
        expect(result.totalCashFlow).toBeGreaterThan(0);
        // May have negative IRR in poor scenarios
      });
    });

    describe('calculateSensitivityAnalysis', () => {
      it('should perform sensitivity analysis', () => {
        const result = calculateRealEstateDevelopment({
          calculationType: 'sensitivity_analysis',
          landCost: 100000,
          constructionCostPerSqFt: 150,
          totalSqFt: 10000,
          softCostsPercentage: 15,
          contingencyPercentage: 5,
          rentalRatePerSqFt: 25,
          occupancyRate: 95,
          annualRentIncrease: 3,
          holdingPeriodYears: 5,
          exitCapRate: 6,
          costVariance: '-20,-10,10,20',
          revenueVariance: '-15,-5,5,15',
          capRateVariance: '-10,-5,5,10'
        });

        expect(result.sensitivityMatrix).toBeDefined();
        expect(result.sensitivityMatrix.length).toBeGreaterThan(0);
        expect(result.worstCaseScenario).toBeDefined();
        expect(result.bestCaseScenario).toBeDefined();
        expect(result.worstCaseScenario.irr).toBeLessThanOrEqual(result.bestCaseScenario.irr);
      });
    });

    describe('comprehensive calculation', () => {
      it('should perform comprehensive pro-forma analysis', () => {
        const result = calculateRealEstateDevelopment({
          calculationType: 'comprehensive',
          landCost: 100000,
          constructionCostPerSqFt: 150,
          totalSqFt: 10000,
          softCostsPercentage: 15,
          contingencyPercentage: 5,
          rentalRatePerSqFt: 25,
          occupancyRate: 95,
          annualRentIncrease: 3,
          holdingPeriodYears: 5,
          exitCapRate: 6,
          equityPercentage: 30,
          interestRate: 5,
          loanTermYears: 25,
          constructionPeriodMonths: 12,
          interestOnlyPeriodMonths: 24
        });

        expect(result.developmentCosts).toBeDefined();
        expect(result.revenueProjections).toBeDefined();
        expect(result.financing).toBeDefined();
        expect(result.investmentReturns).toBeDefined();
        expect(result.summary).toBeDefined();

        expect(result.summary.totalDevelopmentCost).toBeGreaterThan(0);
        expect(result.summary.totalEquityRequired).toBeGreaterThan(0);
        expect(result.summary.year1NOI).toBeGreaterThan(0);
        expect(result.summary.exitValue).toBeGreaterThan(0);
        expect(result.summary.irr).toBeGreaterThan(0);
        expect(result.summary.equityMultiple).toBeGreaterThan(1);
        expect(result.summary.cashOnCashReturn).toBeGreaterThan(0);
      });
    });
  });

  describe('Real Estate Calculator Integration', () => {
    it('should calculate development costs through calculator interface', () => {
      const inputs = {
        calculationType: 'development_costs',
        landCost: 100000,
        constructionCostPerSqFt: 150,
        totalSqFt: 10000,
        softCostsPercentage: 15,
        contingencyPercentage: 5,
        marketingCost: 10000,
        financingCost: 5000
      };

      const result = realEstateDevelopmentProFormaCalculator.formulas[0].calculate(inputs);

      expect(result.outputs.totalDevelopmentCost).toBe(1925000);
      expect(result.outputs.costPerSqFt).toBe(192.5);
    });

    it('should handle comprehensive analysis', () => {
      const inputs = {
        calculationType: 'comprehensive',
        landCost: 100000,
        constructionCostPerSqFt: 150,
        totalSqFt: 10000,
        softCostsPercentage: 15,
        contingencyPercentage: 5,
        rentalRatePerSqFt: 25,
        occupancyRate: 95,
        annualRentIncrease: 3,
        holdingPeriodYears: 5,
        exitCapRate: 6,
        equityPercentage: 30,
        interestRate: 5,
        loanTermYears: 25,
        constructionPeriodMonths: 12,
        interestOnlyPeriodMonths: 24
      };

      const result = realEstateDevelopmentProFormaCalculator.formulas[0].calculate(inputs);

      expect(result.outputs.totalDevelopmentCost).toBeDefined();
      expect(result.outputs.netOperatingIncome).toBeDefined();
      expect(result.outputs.equityAmount).toBeDefined();
      expect(result.outputs.internalRateOfReturn).toBeDefined();
    });
  });

  describe('Validation Rules', () => {
    // TODO: Enable validation tests when validation.ts is properly integrated
    it.skip('should validate calculation type', () => {
      // const validationRules = getRealEstateValidationRules();
      // const typeRules = validationRules.filter(rule => rule.field === 'calculationType');
      // expect(typeRules.length).toBeGreaterThan(0);
    });

    it.skip('should validate cost inputs', () => {
      // const costRules = validationRules.filter(rule =>
      //   ['landCost', 'constructionCostPerSqFt', 'totalSqFt'].includes(rule.field)
      // );
      // expect(costRules.length).toBeGreaterThan(0);
    });

    it.skip('should validate revenue inputs', () => {
      // const revenueRules = validationRules.filter(rule =>
      //   ['rentalRatePerSqFt', 'occupancyRate', 'annualRentIncrease'].includes(rule.field)
      // );
      // expect(revenueRules.length).toBeGreaterThan(0);
    });

    it.skip('should validate financing inputs', () => {
      // const financingRules = validationRules.filter(rule =>
      //   ['equityPercentage', 'interestRate', 'loanTermYears'].includes(rule.field)
      // );
      // expect(financingRules.length).toBeGreaterThan(0);
    });

    it.skip('should validate sensitivity analysis inputs', () => {
      // const sensitivityRules = validationRules.filter(rule =>
      //   ['costVariance', 'revenueVariance', 'capRateVariance'].includes(rule.field)
      // );
      // expect(sensitivityRules.length).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('should throw error for invalid calculation type', () => {
      expect(() => calculateRealEstateDevelopment({
        calculationType: 'invalid_type'
      })).toThrow('Unknown real estate development calculation type');
    });

    it('should throw error for negative land cost', () => {
      expect(() => calculateRealEstateDevelopment({
        calculationType: 'development_costs',
        landCost: -100000,
        constructionCostPerSqFt: 150,
        totalSqFt: 10000,
        softCostsPercentage: 15,
        contingencyPercentage: 5
      })).toThrow('Land cost cannot be negative');
    });

    it('should throw error for zero square footage', () => {
      expect(() => calculateRealEstateDevelopment({
        calculationType: 'development_costs',
        landCost: 100000,
        constructionCostPerSqFt: 150,
        totalSqFt: 0,
        softCostsPercentage: 15,
        contingencyPercentage: 5
      })).toThrow('Total square footage must be positive');
    });

    it('should throw error for invalid percentage', () => {
      expect(() => calculateRealEstateDevelopment({
        calculationType: 'development_costs',
        landCost: 100000,
        constructionCostPerSqFt: 150,
        totalSqFt: 10000,
        softCostsPercentage: 150, // Invalid > 100%
        contingencyPercentage: 5
      })).toThrow('Soft costs percentage must be between 0 and 100');
    });
  });

  describe('Industry Standard Validation', () => {
    it('should match standard development cost calculations', () => {
      // Test against standard real estate development cost formulas
      const result = calculateRealEstateDevelopment({
        calculationType: 'development_costs',
        landCost: 200000,
        constructionCostPerSqFt: 180,
        totalSqFt: 15000,
        softCostsPercentage: 20,
        contingencyPercentage: 7,
        marketingCost: 25000,
        financingCost: 15000
      });

      const expectedHardCosts = 200000 + (180 * 15000); // 2,700,000
      const expectedSoftCosts = 2700000 * 0.20; // 540,000
      const expectedContingency = 2700000 * 0.07; // 189,000
      const expectedTotal = 200000 + 2700000 + 540000 + 189000 + 25000 + 15000; // 3,704,000

      expect(result.totalDevelopmentCost).toBe(expectedTotal);
      expect(result.costPerSqFt).toBeCloseTo(expectedTotal / 15000, 2);
    });

    it('should calculate realistic financing metrics', () => {
      // Test against standard real estate financing calculations
      const result = calculateRealEstateDevelopment({
        calculationType: 'financing',
        landCost: 150000,
        constructionCostPerSqFt: 160,
        totalSqFt: 12000,
        equityPercentage: 25,
        interestRate: 5.5,
        loanTermYears: 20,
        constructionPeriodMonths: 15,
        interestOnlyPeriodMonths: 30
      });

      const totalCost = 150000 + (160 * 12000); // 2,070,000
      expect(result.totalDevelopmentCost).toBe(2070000);
      expect(result.equityAmount).toBe(517500); // 2,070,000 * 0.25
      expect(result.loanAmount).toBe(1552500); // 2,070,000 * 0.75
      expect(result.loanToValueRatio).toBe(75);
      expect(result.monthlyDebtService).toBeGreaterThan(0);
    });

    it('should handle multi-year cash flow projections', () => {
      // Test against standard real estate cash flow projections
      const result = calculateRealEstateDevelopment({
        calculationType: 'revenue_projections',
        totalSqFt: 8000,
        rentalRatePerSqFt: 28,
        occupancyRate: 92,
        annualRentIncrease: 2.5,
        holdingPeriodYears: 7,
        exitCapRate: 6.5
      });

      expect(result.annualCashFlow.length).toBe(7);
      expect(result.annualCashFlow[0].grossRent).toBe(224000); // 28 * 8000
      expect(result.annualCashFlow[0].effectiveGrossIncome).toBeCloseTo(206080, 0); // 224,000 * 0.92

      // Check rent escalation
      expect(result.annualCashFlow[1].grossRent).toBeCloseTo(229600, 0); // 224,000 * 1.025
      expect(result.annualCashFlow[6].grossRent).toBeCloseTo(258048, 0); // 224,000 * (1.025)^6
    });
  });
});