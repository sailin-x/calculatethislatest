import { describe, it, expect, beforeEach } from 'vitest';
import { calculateRealEstateDevelopmentProForma } from './formulas';
import { validateRealEstateDevelopmentProFormaInputs } from './validation';
import { validateField } from './quickValidation';
import { RealEstateDevelopmentProFormaInputs } from './types';

describe('Real Estate Development Pro-Forma Calculator', () => {
  let validInputs: RealEstateDevelopmentProFormaInputs;

  beforeEach(() => {
    validInputs = {
      // Project Information
      projectName: 'Downtown Mixed-Use Development',
      projectType: 'mixed-use',
      projectPhase: 'feasibility',
      projectLocation: 'Downtown Metro Area',
      projectSize: 100000,
      landSize: 2.5,
      zoningType: 'Mixed-Use Commercial',
      density: 40,
      buildingHeight: 12,
      parkingRatio: 2.5,
      
      // Financial Assumptions
      landCost: 5000000,
      acquisitionCosts: 250000,
      constructionCost: 250,
      softCosts: 12,
      contingency: 8,
      financingCosts: 150000,
      marketingCosts: 75000,
      legalCosts: 50000,
      insuranceCosts: 25000,
      propertyTaxes: 50000,
      utilities: 15000,
      maintenanceCosts: 25000,
      managementFees: 4,
      vacancyRate: 5,
      rentGrowthRate: 3,
      expenseGrowthRate: 2,
      inflationRate: 2.5,
      discountRate: 10,
      exitCapRate: 6,
      holdPeriod: 7,
      
      // Revenue Assumptions
      unitMix: [],
      rentalRates: [],
      salesPrices: [],
      otherIncome: [],
      leaseTerms: [],
      tenantImprovements: [],
      concessions: [],
      
      // Construction Timeline
      constructionStartDate: '2024-06-01',
      constructionDuration: 24,
      leaseUpPeriod: 18,
      stabilizationPeriod: 6,
      constructionPhases: [],
      milestoneDates: [],
      
      // Financing
      loanAmount: 30000000,
      loanType: 'construction',
      interestRate: 6.5,
      loanTerm: 30,
      loanToCost: 75,
      loanToValue: 70,
      debtServiceCoverage: 1.35,
      interestOnlyPeriod: 24,
      prepaymentPenalty: 2,
      originationFee: 1,
      equityContribution: 10000000,
      equityReturn: 18,
      
      // Market Analysis
      marketRent: 3.5,
      marketVacancy: 4,
      marketCapRate: 5.5,
      marketAppreciation: 3.5,
      comparableSales: [],
      marketTrends: [],
      
      // Risk Factors
      constructionRisk: 6,
      marketRisk: 4,
      financingRisk: 3,
      regulatoryRisk: 5,
      environmentalRisk: 2,
      weatherRisk: 3,
      laborRisk: 4,
      materialRisk: 5,
      
      // Tax Considerations
      depreciationMethod: 'straight-line',
      taxRate: 25,
      taxIncentives: [],
      costSegregation: false,
      energyEfficiencyCredits: false,
      historicTaxCredits: false,
      
      // Exit Strategy
      exitStrategy: 'sale',
      exitTiming: 7,
      exitValue: 0,
      exitCosts: 6,
      reinvestmentPlan: '',
      
      // Sensitivity Analysis
      sensitivityScenarios: [],
      stressTests: [],
      breakEvenAnalysis: true,
      scenarioAnalysis: true,
      
      // Reporting Preferences
      reportFormat: 'detailed',
      includeCharts: true,
      includeAssumptions: true,
      includeSensitivity: true,
      includeComparables: true,
      currency: 'USD',
      displayFormat: 'currency',
    };
  });

  describe('calculateRealEstateDevelopmentProForma', () => {
    it('should calculate basic development metrics correctly', () => {
      const results = calculateRealEstateDevelopmentProForma(validInputs);

      expect(results.metrics.totalProjectCost).toBeGreaterThan(0);
      expect(results.metrics.totalRevenue).toBeGreaterThan(0);
      expect(results.metrics.totalProfit).toBeGreaterThan(0);
      expect(results.metrics.profitMargin).toBeGreaterThan(0);
      expect(results.metrics.internalRateOfReturn).toBeGreaterThan(0);
      expect(results.metrics.netPresentValue).toBeGreaterThan(0);
    });

    it('should calculate construction costs correctly', () => {
      const results = calculateRealEstateDevelopmentProForma(validInputs);

      expect(results.metrics.totalConstructionCost).toBe(validInputs.projectSize * validInputs.constructionCost);
      expect(results.metrics.constructionCostPerSqFt).toBe(validInputs.constructionCost);
      expect(results.metrics.softCostsAmount).toBe(results.metrics.totalConstructionCost * (validInputs.softCosts / 100));
    });

    it('should calculate revenue metrics correctly', () => {
      const results = calculateRealEstateDevelopmentProForma(validInputs);

      const expectedGrossPotentialRent = validInputs.projectSize * validInputs.marketRent * 12;
      expect(results.metrics.grossPotentialRent).toBe(expectedGrossPotentialRent);
      
      const expectedEffectiveGrossIncome = expectedGrossPotentialRent * (1 - validInputs.vacancyRate / 100);
      expect(results.metrics.effectiveGrossIncome).toBe(expectedEffectiveGrossIncome);
    });

    it('should calculate financing metrics correctly', () => {
      const results = calculateRealEstateDevelopmentProForma(validInputs);

      expect(results.metrics.debtService).toBeGreaterThan(0);
      expect(results.metrics.debtServiceCoverageRatio).toBeGreaterThan(1);
      expect(results.metrics.loanToCostRatio).toBe(validInputs.loanToCost);
      expect(results.metrics.equityContribution).toBe(validInputs.equityContribution);
    });

    it('should calculate return metrics correctly', () => {
      const results = calculateRealEstateDevelopmentProForma(validInputs);

      expect(results.metrics.returnOnCost).toBeGreaterThan(0);
      expect(results.metrics.returnOnEquity).toBeGreaterThan(0);
      expect(results.metrics.cashOnCashReturn).toBeGreaterThan(0);
      expect(results.metrics.equityMultiple).toBeGreaterThan(1);
      expect(results.metrics.paybackPeriod).toBeGreaterThan(0);
    });

    it('should calculate break-even analysis correctly', () => {
      const results = calculateRealEstateDevelopmentProForma(validInputs);

      expect(results.breakEvenAnalysis.breakEvenOccupancy).toBeGreaterThan(0);
      expect(results.breakEvenAnalysis.breakEvenRent).toBeGreaterThan(0);
      expect(results.breakEvenAnalysis.breakEvenTimeline).toBeGreaterThan(0);
      expect(results.breakEvenAnalysis.marginOfSafety).toBeGreaterThan(0);
    });

    it('should generate cash flow projections', () => {
      const results = calculateRealEstateDevelopmentProForma(validInputs);

      expect(results.cashFlowProjections).toHaveLength(validInputs.constructionDuration + validInputs.leaseUpPeriod + validInputs.stabilizationPeriod + (validInputs.holdPeriod * 12));
      
      const firstProjection = results.cashFlowProjections[0];
      expect(firstProjection.period).toBeDefined();
      expect(firstProjection.date).toBeDefined();
      expect(firstProjection.constructionCosts).toBeGreaterThanOrEqual(0);
      expect(firstProjection.revenue).toBeGreaterThanOrEqual(0);
      expect(firstProjection.cashFlow).toBeDefined();
    });

    it('should generate sensitivity analysis', () => {
      const results = calculateRealEstateDevelopmentProForma(validInputs);

      expect(results.sensitivityResults).toHaveLength(9); // Base case + 8 scenarios
      
      results.sensitivityResults.forEach(result => {
        expect(result.scenario).toBeDefined();
        expect(result.npv).toBeDefined();
        expect(result.irr).toBeDefined();
        expect(result.profitMargin).toBeDefined();
        expect(result.breakEvenOccupancy).toBeDefined();
        expect(['positive', 'negative', 'neutral']).toContain(result.impact);
      });
    });

    it('should generate stress test results', () => {
      const results = calculateRealEstateDevelopmentProForma(validInputs);

      expect(results.stressTestResults).toHaveLength(4); // 4 stress tests
      
      results.stressTestResults.forEach(result => {
        expect(result.test).toBeDefined();
        expect(result.npv).toBeDefined();
        expect(result.irr).toBeDefined();
        expect(result.cashFlow).toBeDefined();
        expect(['high', 'medium', 'low']).toContain(result.survivability);
      });
    });

    it('should generate comprehensive analysis', () => {
      const results = calculateRealEstateDevelopmentProForma(validInputs);

      expect(results.analysis.projectViability).toMatch(/^(highly-viable|viable|marginal|not-viable)$/);
      expect(results.analysis.viabilityScore).toBeGreaterThan(0);
      expect(results.analysis.viabilityScore).toBeLessThanOrEqual(100);
      expect(results.analysis.keyStrengths).toBeInstanceOf(Array);
      expect(results.analysis.keyRisks).toBeInstanceOf(Array);
      expect(results.analysis.recommendations).toBeInstanceOf(Array);
    });

    it('should calculate risk assessment correctly', () => {
      const results = calculateRealEstateDevelopmentProForma(validInputs);

      expect(['low', 'medium', 'high']).toContain(results.analysis.riskAssessment.overallRisk);
      expect(['low', 'medium', 'high']).toContain(results.analysis.riskAssessment.constructionRisk.level);
      expect(['low', 'medium', 'high']).toContain(results.analysis.riskAssessment.marketRisk.level);
      expect(['low', 'medium', 'high']).toContain(results.analysis.riskAssessment.financingRisk.level);
    });

    it('should generate investment summary', () => {
      const results = calculateRealEstateDevelopmentProForma(validInputs);

      expect(results.investmentSummary.totalInvestment).toBe(validInputs.equityContribution);
      expect(results.investmentSummary.expectedReturn).toBe(results.metrics.internalRateOfReturn);
      expect(results.investmentSummary.timeline).toBe(validInputs.holdPeriod);
      expect(['low', 'medium', 'high']).toContain(results.investmentSummary.riskLevel);
      expect(results.investmentSummary.summary).toBeDefined();
    });

    it('should generate timeline summary', () => {
      const results = calculateRealEstateDevelopmentProForma(validInputs);

      expect(results.timelineSummary.totalDuration).toBe(validInputs.constructionDuration + validInputs.leaseUpPeriod + validInputs.stabilizationPeriod);
      expect(results.timelineSummary.keyMilestones).toBeInstanceOf(Array);
      expect(results.timelineSummary.criticalPath).toBeInstanceOf(Array);
      expect(results.timelineSummary.riskFactors).toBeInstanceOf(Array);
    });

    it('should handle different project types correctly', () => {
      const residentialInputs = { ...validInputs, projectType: 'residential' as const };
      const commercialInputs = { ...validInputs, projectType: 'commercial' as const };
      const hotelInputs = { ...validInputs, projectType: 'hotel' as const };

      const residentialResults = calculateRealEstateDevelopmentProForma(residentialInputs);
      const commercialResults = calculateRealEstateDevelopmentProForma(commercialInputs);
      const hotelResults = calculateRealEstateDevelopmentProForma(hotelInputs);

      expect(residentialResults.metrics.totalProjectCost).toBeGreaterThan(0);
      expect(commercialResults.metrics.totalProjectCost).toBeGreaterThan(0);
      expect(hotelResults.metrics.totalProjectCost).toBeGreaterThan(0);
    });

    it('should handle different financing scenarios', () => {
      const highLeverageInputs = { ...validInputs, loanToCost: 85, equityContribution: 5000000 };
      const lowLeverageInputs = { ...validInputs, loanToCost: 60, equityContribution: 15000000 };

      const highLeverageResults = calculateRealEstateDevelopmentProForma(highLeverageInputs);
      const lowLeverageResults = calculateRealEstateDevelopmentProForma(lowLeverageInputs);

      expect(highLeverageResults.metrics.returnOnEquity).toBeGreaterThan(lowLeverageResults.metrics.returnOnEquity);
      expect(highLeverageResults.metrics.riskRating).toBe('high');
      expect(lowLeverageResults.metrics.riskRating).toBe('low');
    });

    it('should handle different market conditions', () => {
      const strongMarketInputs = { ...validInputs, marketRent: 4.5, marketCapRate: 4.5, marketAppreciation: 5 };
      const weakMarketInputs = { ...validInputs, marketRent: 2.5, marketCapRate: 7.5, marketAppreciation: 1 };

      const strongMarketResults = calculateRealEstateDevelopmentProForma(strongMarketInputs);
      const weakMarketResults = calculateRealEstateDevelopmentProForma(weakMarketInputs);

      expect(strongMarketResults.metrics.internalRateOfReturn).toBeGreaterThan(weakMarketResults.metrics.internalRateOfReturn);
      expect(strongMarketResults.metrics.profitMargin).toBeGreaterThan(weakMarketResults.metrics.profitMargin);
    });
  });

  describe('validateRealEstateDevelopmentProFormaInputs', () => {
    it('should validate correct inputs successfully', () => {
      const validation = validateRealEstateDevelopmentProFormaInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toBeUndefined();
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.projectName;

      const validation = validateRealEstateDevelopmentProFormaInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.projectName).toBeDefined();
    });

    it('should validate project size constraints', () => {
      const invalidInputs = { ...validInputs, projectSize: -1000 };
      const validation = validateRealEstateDevelopmentProFormaInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.projectSize).toBeDefined();

      const tooLargeInputs = { ...validInputs, projectSize: 15000000 };
      const validation2 = validateRealEstateDevelopmentProFormaInputs(tooLargeInputs);
      expect(validation2.isValid).toBe(false);
      expect(validation2.errors?.projectSize).toBeDefined();
    });

    it('should validate construction cost constraints', () => {
      const invalidInputs = { ...validInputs, constructionCost: 0 };
      const validation = validateRealEstateDevelopmentProFormaInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.constructionCost).toBeDefined();

      const tooExpensiveInputs = { ...validInputs, constructionCost: 2500 };
      const validation2 = validateRealEstateDevelopmentProFormaInputs(tooExpensiveInputs);
      expect(validation2.isValid).toBe(false);
      expect(validation2.errors?.constructionCost).toBeDefined();
    });

    it('should validate financing constraints', () => {
      const invalidInputs = { ...validInputs, loanAmount: 50000000 }; // Too high for 75% LTC
      const validation = validateRealEstateDevelopmentProFormaInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.loanAmount).toBeDefined();

      const insufficientEquityInputs = { ...validInputs, equityContribution: 1000000 }; // Too low
      const validation2 = validateRealEstateDevelopmentProFormaInputs(insufficientEquityInputs);
      expect(validation2.isValid).toBe(false);
      expect(validation2.errors?.equityContribution).toBeDefined();
    });

    it('should validate risk factor ranges', () => {
      const invalidInputs = { ...validInputs, constructionRisk: 15 };
      const validation = validateRealEstateDevelopmentProFormaInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.constructionRisk).toBeDefined();

      const invalidInputs2 = { ...validInputs, marketRisk: 0 };
      const validation2 = validateRealEstateDevelopmentProFormaInputs(invalidInputs2);
      expect(validation2.isValid).toBe(false);
      expect(validation2.errors?.marketRisk).toBeDefined();
    });

    it('should validate market assumptions', () => {
      const invalidInputs = { ...validInputs, marketRent: 0.25 };
      const validation = validateRealEstateDevelopmentProFormaInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.marketRent).toBeDefined();

      const invalidInputs2 = { ...validInputs, marketCapRate: 2 };
      const validation2 = validateRealEstateDevelopmentProFormaInputs(invalidInputs2);
      expect(validation2.isValid).toBe(false);
      expect(validation2.errors?.marketCapRate).toBeDefined();
    });

    it('should validate timeline constraints', () => {
      const invalidInputs = { ...validInputs, constructionDuration: 3 };
      const validation = validateRealEstateDevelopmentProFormaInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.constructionDuration).toBeDefined();

      const invalidInputs2 = { ...validInputs, leaseUpPeriod: 72 };
      const validation2 = validateRealEstateDevelopmentProFormaInputs(invalidInputs2);
      expect(validation2.isValid).toBe(false);
      expect(validation2.errors?.leaseUpPeriod).toBeDefined();
    });

    it('should validate property type specific constraints', () => {
      const residentialInputs = { ...validInputs, projectType: 'residential' as const, projectSize: 500 };
      const validation = validateRealEstateDevelopmentProFormaInputs(residentialInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.projectSize).toBeDefined();

      const multifamilyInputs = { ...validInputs, projectType: 'multifamily' as const, density: 5 };
      const validation2 = validateRealEstateDevelopmentProFormaInputs(multifamilyInputs);
      expect(validation2.isValid).toBe(false);
      expect(validation2.errors?.density).toBeDefined();
    });
  });

  describe('validateField', () => {
    it('should validate individual fields correctly', () => {
      expect(validateField('projectName', 'Test Project', validInputs).isValid).toBe(true);
      expect(validateField('projectName', '', validInputs).isValid).toBe(false);

      expect(validateField('projectSize', 50000, validInputs).isValid).toBe(true);
      expect(validateField('projectSize', -1000, validInputs).isValid).toBe(false);

      expect(validateField('constructionCost', 200, validInputs).isValid).toBe(true);
      expect(validateField('constructionCost', 0, validInputs).isValid).toBe(false);

      expect(validateField('interestRate', 6.5, validInputs).isValid).toBe(true);
      expect(validateField('interestRate', 30, validInputs).isValid).toBe(false);
    });

    it('should validate cross-field dependencies', () => {
      const allInputs = {
        projectSize: 100000,
        constructionCost: 250,
        landCost: 5000000,
        acquisitionCosts: 250000,
        softCosts: 12,
        financingCosts: 150000,
        marketingCosts: 75000,
        legalCosts: 50000,
        insuranceCosts: 25000,
        loanToCost: 75,
        loanAmount: 40000000
      };

      expect(validateField('loanAmount', 40000000, allInputs).isValid).toBe(false);
      expect(validateField('loanAmount', 30000000, allInputs).isValid).toBe(true);
    });

    it('should validate property type specific constraints', () => {
      const allInputs = { ...validInputs, projectType: 'residential' };
      expect(validateField('projectSize', 500, allInputs).isValid).toBe(false);
      expect(validateField('projectSize', 2000, allInputs).isValid).toBe(true);

      const allInputs2 = { ...validInputs, projectType: 'multifamily' };
      expect(validateField('density', 5, allInputs2).isValid).toBe(false);
      expect(validateField('density', 15, allInputs2).isValid).toBe(true);
    });

    it('should validate enum fields correctly', () => {
      expect(validateField('projectType', 'residential', validInputs).isValid).toBe(true);
      expect(validateField('projectType', 'invalid-type', validInputs).isValid).toBe(false);

      expect(validateField('loanType', 'construction', validInputs).isValid).toBe(true);
      expect(validateField('loanType', 'invalid-loan', validInputs).isValid).toBe(false);

      expect(validateField('exitStrategy', 'sale', validInputs).isValid).toBe(true);
      expect(validateField('exitStrategy', 'invalid-exit', validInputs).isValid).toBe(false);
    });

    it('should validate date fields correctly', () => {
      expect(validateField('constructionStartDate', '2024-06-01', validInputs).isValid).toBe(true);
      expect(validateField('constructionStartDate', 'invalid-date', validInputs).isValid).toBe(false);
      expect(validateField('constructionStartDate', '', validInputs).isValid).toBe(false);
    });

    it('should validate percentage fields correctly', () => {
      expect(validateField('vacancyRate', 5, validInputs).isValid).toBe(true);
      expect(validateField('vacancyRate', -5, validInputs).isValid).toBe(false);
      expect(validateField('vacancyRate', 60, validInputs).isValid).toBe(false);

      expect(validateField('managementFees', 4, validInputs).isValid).toBe(true);
      expect(validateField('managementFees', 25, validInputs).isValid).toBe(false);
    });

    it('should validate risk factor ranges', () => {
      expect(validateField('constructionRisk', 5, validInputs).isValid).toBe(true);
      expect(validateField('constructionRisk', 0, validInputs).isValid).toBe(false);
      expect(validateField('constructionRisk', 15, validInputs).isValid).toBe(false);

      expect(validateField('marketRisk', 4, validInputs).isValid).toBe(true);
      expect(validateField('marketRisk', 11, validInputs).isValid).toBe(false);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle zero values appropriately', () => {
      const zeroInputs = { ...validInputs, projectSize: 0 };
      const validation = validateRealEstateDevelopmentProFormaInputs(zeroInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.projectSize).toBeDefined();
    });

    it('should handle very large values', () => {
      const largeInputs = { ...validInputs, projectSize: 20000000 };
      const validation = validateRealEstateDevelopmentProFormaInputs(largeInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.projectSize).toBeDefined();
    });

    it('should handle negative values', () => {
      const negativeInputs = { ...validInputs, landCost: -1000000 };
      const validation = validateRealEstateDevelopmentProFormaInputs(negativeInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.landCost).toBeDefined();
    });

    it('should handle invalid project types', () => {
      const invalidInputs = { ...validInputs, projectType: 'invalid' as any };
      const validation = validateRealEstateDevelopmentProFormaInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.projectType).toBeDefined();
    });

    it('should handle invalid loan types', () => {
      const invalidInputs = { ...validInputs, loanType: 'invalid' as any };
      const validation = validateRealEstateDevelopmentProFormaInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.loanType).toBeDefined();
    });

    it('should handle invalid exit strategies', () => {
      const invalidInputs = { ...validInputs, exitStrategy: 'invalid' as any };
      const validation = validateRealEstateDevelopmentProFormaInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.exitStrategy).toBeDefined();
    });

    it('should handle invalid depreciation methods', () => {
      const invalidInputs = { ...validInputs, depreciationMethod: 'invalid' as any };
      const validation = validateRealEstateDevelopmentProFormaInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.depreciationMethod).toBeDefined();
    });

    it('should handle missing required fields', () => {
      const missingInputs = { ...validInputs };
      delete missingInputs.projectName;
      delete missingInputs.projectLocation;

      const validation = validateRealEstateDevelopmentProFormaInputs(missingInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.projectName).toBeDefined();
      expect(validation.errors?.projectLocation).toBeDefined();
    });

    it('should handle calculation with minimal viable inputs', () => {
      const minimalInputs = {
        ...validInputs,
        projectName: 'Minimal Project',
        projectLocation: 'Test Location',
        projectSize: 10000,
        landSize: 1,
        constructionCost: 150,
        landCost: 1000000,
        equityContribution: 2000000,
        loanAmount: 1000000,
        marketRent: 2,
        marketCapRate: 6,
        constructionDuration: 12,
        holdPeriod: 5
      };

      const results = calculateRealEstateDevelopmentProForma(minimalInputs);
      expect(results.metrics.totalProjectCost).toBeGreaterThan(0);
      expect(results.metrics.internalRateOfReturn).toBeGreaterThan(0);
      expect(results.metrics.netPresentValue).toBeDefined();
    });

    it('should handle different currencies', () => {
      const usdInputs = { ...validInputs, currency: 'USD' as const };
      const eurInputs = { ...validInputs, currency: 'EUR' as const };
      const gbpInputs = { ...validInputs, currency: 'GBP' as const };

      const usdResults = calculateRealEstateDevelopmentProForma(usdInputs);
      const eurResults = calculateRealEstateDevelopmentProForma(eurInputs);
      const gbpResults = calculateRealEstateDevelopmentProForma(gbpInputs);

      expect(usdResults.metrics.totalProjectCost).toBeGreaterThan(0);
      expect(eurResults.metrics.totalProjectCost).toBeGreaterThan(0);
      expect(gbpResults.metrics.totalProjectCost).toBeGreaterThan(0);
    });

    it('should handle different display formats', () => {
      const currencyInputs = { ...validInputs, displayFormat: 'currency' as const };
      const percentageInputs = { ...validInputs, displayFormat: 'percentage' as const };
      const decimalInputs = { ...validInputs, displayFormat: 'decimal' as const };

      const currencyResults = calculateRealEstateDevelopmentProForma(currencyInputs);
      const percentageResults = calculateRealEstateDevelopmentProForma(percentageInputs);
      const decimalResults = calculateRealEstateDevelopmentProForma(decimalInputs);

      expect(currencyResults.metrics.totalProjectCost).toBeGreaterThan(0);
      expect(percentageResults.metrics.totalProjectCost).toBeGreaterThan(0);
      expect(decimalResults.metrics.totalProjectCost).toBeGreaterThan(0);
    });
  });
});