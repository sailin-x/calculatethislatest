import { describe, it, expect } from 'vitest';
import { calculateRealEstateSyndication, calculateRealEstateSyndicationMetrics } from './formulas';
import { validateRealEstateSyndicationInputs, validateRealEstateSyndicationOutputs } from './validation';
import { validateField } from './quickValidation';
import { RealEstateSyndicationInputs } from './types';

describe('Real Estate Syndication Calculator', () => {
  const mockInputs: RealEstateSyndicationInputs = {
    // Project Information
    projectName: 'Test Project',
    projectType: 'multifamily',
    projectAddress: '123 Main St, City, State',
    acquisitionDate: '2024-01-01',
    projectedHoldPeriod: 5,
    exitStrategy: 'sale',
    
    // Property Details
    totalAcquisitionCost: 5000000,
    propertyValue: 5000000,
    landValue: 1000000,
    buildingValue: 3500000,
    squareFootage: 50000,
    numberOfUnits: 50,
    occupancyRate: 95,
    currentRentRoll: 600000,
    projectedRentGrowth: 3,
    operatingExpenses: 180000,
    operatingExpenseRatio: 30,
    
    // Financing Structure
    totalEquityNeeded: 1500000,
    sponsorEquity: 300000,
    investorEquity: 1200000,
    debtFinancing: 3500000,
    loanType: 'conventional',
    interestRate: 5.5,
    loanTerm: 30,
    amortizationPeriod: 30,
    loanPoints: 1,
    loanFees: 35000,
    
    // Syndication Structure
    syndicationType: '506(b)',
    minimumInvestment: 50000,
    maximumInvestors: 35,
    sponsorPromote: 20,
    managementFee: 5,
    acquisitionFee: 3,
    dispositionFee: 3,
    refinanceFee: 1,
    
    // Waterfall Structure
    preferredReturn: 8,
    catchUpPercentage: 80,
    promoteTier1: 20,
    promoteTier2: 25,
    promoteTier3: 30,
    tier1Threshold: 12,
    tier2Threshold: 15,
    tier3Threshold: 18,
    
    // Operating Assumptions
    grossRentMultiplier: 8.33,
    capRate: 6,
    exitCapRate: 5.5,
    appreciationRate: 3,
    inflationRate: 2,
    vacancyRate: 5,
    collectionLossRate: 2,
    maintenanceReserve: 200,
    capitalExpenditureReserve: 5,
    
    // Tax Information
    taxRate: 24,
    stateTaxRate: 5,
    localTaxRate: 2,
    depreciationMethod: 'straight-line',
    recoveryPeriod: 27.5,
    bonusDepreciationEligible: false,
    bonusDepreciationPercentage: 0,
    
    // Exit Assumptions
    exitYear: 5,
    exitValue: 6000000,
    sellingCosts: 6,
    refinanceAmount: 0,
    refinanceCosts: 0,
    
    // Investor Information
    investorCount: 24,
    averageInvestment: 50000,
    accreditedInvestorRequirement: true,
    foreignInvestorAllowed: false,
    selfDirectedIRAAllowed: true,
    
    // Compliance & Legal
    secCompliance: true,
    blueSkyCompliance: true,
    offeringMemorandum: true,
    operatingAgreement: true,
    subscriptionAgreement: true,
    legalFees: 25000,
    accountingFees: 15000,
    complianceFees: 10000,
    
    // Reporting Preferences
    reportFormat: 'detailed',
    includeCharts: true,
    includeTaxAnalysis: true,
    includeRiskAnalysis: true,
    currency: 'USD',
    displayFormat: 'currency'
  };

  describe('calculateRealEstateSyndication', () => {
    it('should calculate basic metrics correctly', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      
      expect(results.metrics).toBeDefined();
      expect(results.metrics.netOperatingIncome).toBe(420000); // 600000 - 180000
      expect(results.metrics.capRate).toBe(8.4); // (420000 / 5000000) * 100
      expect(results.metrics.totalEquityInvestment).toBe(1500000);
      expect(results.metrics.totalDebtFinancing).toBe(3500000);
      expect(results.metrics.loanToValueRatio).toBe(70); // (3500000 / 5000000) * 100
    });

    it('should generate cash flow projections', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      
      expect(results.cashFlowProjections).toBeDefined();
      expect(results.cashFlowProjections.length).toBe(5); // 5 years
      expect(results.cashFlowProjections[0].year).toBe(1);
      expect(results.cashFlowProjections[0].grossIncome).toBeGreaterThan(600000); // With rent growth
      expect(results.cashFlowProjections[0].netOperatingIncome).toBeGreaterThan(420000);
    });

    it('should calculate waterfall structure', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      
      expect(results.waterfallCalculations).toBeDefined();
      expect(results.waterfallCalculations.length).toBe(5);
      expect(results.waterfallCalculations[0].tier).toBe(1);
      expect(results.waterfallCalculations[0].tierName).toBe('Preferred Return');
      expect(results.waterfallCalculations[0].irrThreshold).toBe(8);
    });

    it('should generate analysis', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      
      expect(results.analysis).toBeDefined();
      expect(results.analysis.riskAssessment).toBeDefined();
      expect(results.analysis.keyBenefits).toBeDefined();
      expect(results.analysis.keyRisks).toBeDefined();
      expect(results.analysis.recommendations).toBeDefined();
    });

    it('should calculate investor summary', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      
      expect(results.investorSummary).toBeDefined();
      expect(results.investorSummary.totalInvestors).toBe(24);
      expect(results.investorSummary.averageInvestment).toBe(50000);
      expect(results.investorSummary.accreditedInvestorRequirement).toBe(true);
    });

    it('should calculate sponsor summary', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      
      expect(results.sponsorSummary).toBeDefined();
      expect(results.sponsorSummary.equityContribution).toBe(300000);
      expect(results.sponsorSummary.promoteValue).toBeGreaterThan(0);
      expect(results.sponsorSummary.totalCompensation).toBeGreaterThan(0);
    });

    it('should calculate tax analysis', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      
      expect(results.taxAnalysis).toBeDefined();
      expect(results.taxAnalysis.depreciationExpense).toBeGreaterThan(0);
      expect(results.taxAnalysis.taxLiability).toBeGreaterThan(0);
      expect(results.taxAnalysis.effectiveTaxRate).toBeGreaterThan(0);
    });

    it('should generate sensitivity analysis', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      
      expect(results.sensitivityAnalysis).toBeDefined();
      expect(results.sensitivityAnalysis.scenarios).toBeDefined();
      expect(results.sensitivityAnalysis.scenarios.length).toBe(3); // Base, Optimistic, Pessimistic
      expect(results.sensitivityAnalysis.keyVariables).toBeDefined();
    });

    it('should generate stress test results', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      
      expect(results.stressTestResults).toBeDefined();
      expect(results.stressTestResults.length).toBeGreaterThan(0);
      expect(results.stressTestResults[0].testName).toBeDefined();
      expect(results.stressTestResults[0].scenario).toBeDefined();
      expect(results.stressTestResults[0].recommendation).toBeDefined();
    });
  });

  describe('calculateRealEstateSyndicationMetrics', () => {
    it('should calculate NOI correctly', () => {
      const metrics = calculateRealEstateSyndicationMetrics(mockInputs);
      expect(metrics.netOperatingIncome).toBe(420000); // 600000 - 180000
    });

    it('should calculate cap rate correctly', () => {
      const metrics = calculateRealEstateSyndicationMetrics(mockInputs);
      expect(metrics.capRate).toBe(8.4); // (420000 / 5000000) * 100
    });

    it('should calculate LTV ratio correctly', () => {
      const metrics = calculateRealEstateSyndicationMetrics(mockInputs);
      expect(metrics.loanToValueRatio).toBe(70); // (3500000 / 5000000) * 100
    });

    it('should calculate debt service correctly', () => {
      const metrics = calculateRealEstateSyndicationMetrics(mockInputs);
      expect(metrics.debtService).toBeGreaterThan(0);
      expect(metrics.debtService).toBeLessThan(metrics.netOperatingIncome);
    });

    it('should calculate cash flow correctly', () => {
      const metrics = calculateRealEstateSyndicationMetrics(mockInputs);
      expect(metrics.cashFlow).toBe(metrics.netOperatingIncome - metrics.debtService);
    });

    it('should calculate cash-on-cash return correctly', () => {
      const metrics = calculateRealEstateSyndicationMetrics(mockInputs);
      const expectedCoC = (metrics.cashFlow / metrics.totalEquityInvestment) * 100;
      expect(metrics.cashOnCashReturn).toBe(expectedCoC);
    });
  });

  describe('validateRealEstateSyndicationInputs', () => {
    it('should validate correct inputs', () => {
      const validation = validateRealEstateSyndicationInputs(mockInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toBeUndefined();
    });

    it('should reject empty project name', () => {
      const invalidInputs = { ...mockInputs, projectName: '' };
      const validation = validateRealEstateSyndicationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.projectName).toBe('Project name is required');
    });

    it('should reject invalid project type', () => {
      const invalidInputs = { ...mockInputs, projectType: 'invalid' as any };
      const validation = validateRealEstateSyndicationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.projectType).toBe('Invalid project type');
    });

    it('should reject negative acquisition cost', () => {
      const invalidInputs = { ...mockInputs, totalAcquisitionCost: -1000 };
      const validation = validateRealEstateSyndicationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.totalAcquisitionCost).toBe('Total acquisition cost must be greater than 0');
    });

    it('should reject invalid interest rate', () => {
      const invalidInputs = { ...mockInputs, interestRate: 30 };
      const validation = validateRealEstateSyndicationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.interestRate).toBe('Interest rate must be between 0% and 25%');
    });

    it('should reject invalid sponsor promote', () => {
      const invalidInputs = { ...mockInputs, sponsorPromote: 60 };
      const validation = validateRealEstateSyndicationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.sponsorPromote).toBe('Sponsor promote must be between 0% and 50%');
    });

    it('should reject invalid tier thresholds order', () => {
      const invalidInputs = { ...mockInputs, tier1Threshold: 15, tier2Threshold: 12 };
      const validation = validateRealEstateSyndicationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.tier2Threshold).toBe('Second tier threshold must be higher than first tier threshold');
    });

    it('should reject operating expenses exceeding rent roll', () => {
      const invalidInputs = { ...mockInputs, operatingExpenses: 700000 };
      const validation = validateRealEstateSyndicationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.operatingExpenses).toBe('Operating expenses cannot exceed current rent roll');
    });

    it('should reject invalid tax rates', () => {
      const invalidInputs = { ...mockInputs, taxRate: 60, stateTaxRate: 10, localTaxRate: 5 };
      const validation = validateRealEstateSyndicationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.taxRate).toBe('Combined tax rate cannot exceed 60%');
    });

    it('should reject exit year exceeding hold period', () => {
      const invalidInputs = { ...mockInputs, exitYear: 10, projectedHoldPeriod: 5 };
      const validation = validateRealEstateSyndicationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.exitYear).toBe('Exit year cannot exceed projected hold period');
    });
  });

  describe('validateRealEstateSyndicationOutputs', () => {
    it('should validate correct outputs', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      const validation = validateRealEstateSyndicationOutputs(results);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toBeUndefined();
    });

    it('should reject invalid IRR', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      results.metrics.projectedIRR = 150; // Invalid high IRR
      const validation = validateRealEstateSyndicationOutputs(results);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.projectedIRR).toBe('Projected IRR must be between -50% and 100%');
    });

    it('should reject invalid equity multiple', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      results.metrics.projectedEquityMultiple = 15; // Invalid high multiple
      const validation = validateRealEstateSyndicationOutputs(results);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.projectedEquityMultiple).toBe('Projected equity multiple must be between 0 and 10');
    });

    it('should reject invalid cap rate', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      results.metrics.capRate = 35; // Invalid high cap rate
      const validation = validateRealEstateSyndicationOutputs(results);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.capRate).toBe('Cap rate must be between 0% and 30%');
    });

    it('should reject invalid LTV ratio', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      results.metrics.loanToValueRatio = 110; // Invalid LTV
      const validation = validateRealEstateSyndicationOutputs(results);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.loanToValueRatio).toBe('Loan-to-value ratio must be between 0% and 100%');
    });

    it('should reject negative NOI', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      results.metrics.netOperatingIncome = -1000;
      const validation = validateRealEstateSyndicationOutputs(results);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.netOperatingIncome).toBe('Net operating income cannot be negative');
    });

    it('should reject missing cash flow projections', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      results.cashFlowProjections = [];
      const validation = validateRealEstateSyndicationOutputs(results);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.cashFlowProjections).toBe('Cash flow projections are required');
    });

    it('should reject missing waterfall calculations', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      results.waterfallCalculations = [];
      const validation = validateRealEstateSyndicationOutputs(results);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.waterfallCalculations).toBe('Waterfall calculations are required');
    });

    it('should reject missing analysis', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      results.analysis = undefined as any;
      const validation = validateRealEstateSyndicationOutputs(results);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.analysis).toBe('Analysis is required');
    });

    it('should reject invalid risk assessment', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      results.analysis.riskAssessment.overallRisk = 'invalid' as any;
      const validation = validateRealEstateSyndicationOutputs(results);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.overallRisk).toBe('Overall risk must be low, medium, or high');
    });

    it('should reject invalid risk score', () => {
      const results = calculateRealEstateSyndication(mockInputs);
      results.analysis.riskAssessment.riskScore = 150;
      const validation = validateRealEstateSyndicationOutputs(results);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.riskScore).toBe('Risk score must be between 0 and 100');
    });
  });

  describe('validateField', () => {
    it('should validate project name correctly', () => {
      const result = validateField('projectName', 'Test Project', mockInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('projectName', '', mockInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Project name is required');
    });

    it('should validate project type correctly', () => {
      const result = validateField('projectType', 'multifamily', mockInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('projectType', 'invalid', mockInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Invalid project type');
    });

    it('should validate acquisition cost with cross-field validation', () => {
      const result = validateField('totalAcquisitionCost', 5000000, mockInputs);
      expect(result.isValid).toBe(true);

      const invalidInputs = { ...mockInputs, totalEquityNeeded: 1000000, debtFinancing: 3000000 };
      const invalidResult = validateField('totalAcquisitionCost', 5000000, invalidInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Total equity + Debt financing must equal Total acquisition cost');
    });

    it('should validate interest rate correctly', () => {
      const result = validateField('interestRate', 5.5, mockInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('interestRate', 30, mockInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Interest rate must be between 0% and 25%');
    });

    it('should validate sponsor promote correctly', () => {
      const result = validateField('sponsorPromote', 20, mockInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('sponsorPromote', 60, mockInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Sponsor promote must be between 0% and 50%');
    });

    it('should validate tier thresholds with cross-field validation', () => {
      const result = validateField('tier1Threshold', 12, mockInputs);
      expect(result.isValid).toBe(true);

      const invalidInputs = { ...mockInputs, tier2Threshold: 10 };
      const invalidResult = validateField('tier1Threshold', 12, invalidInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('First tier threshold must be lower than second tier threshold');
    });

    it('should validate tax rates with combined rate check', () => {
      const result = validateField('taxRate', 24, mockInputs);
      expect(result.isValid).toBe(true);

      const invalidInputs = { ...mockInputs, stateTaxRate: 25, localTaxRate: 15 };
      const invalidResult = validateField('taxRate', 25, invalidInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Combined tax rate cannot exceed 60%');
    });

    it('should validate exit year with hold period check', () => {
      const result = validateField('exitYear', 5, mockInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('exitYear', 10, mockInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Exit year cannot exceed projected hold period');
    });

    it('should validate investor count with maximum check', () => {
      const result = validateField('investorCount', 24, mockInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('investorCount', 50, mockInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Investor count cannot exceed maximum investors');
    });

    it('should validate unknown field', () => {
      const result = validateField('unknownField' as any, 'value', mockInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle zero values appropriately', () => {
      const zeroInputs = { ...mockInputs, totalAcquisitionCost: 0 };
      const validation = validateRealEstateSyndicationInputs(zeroInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.totalAcquisitionCost).toBe('Total acquisition cost must be greater than 0');
    });

    it('should handle very large values', () => {
      const largeInputs = { ...mockInputs, totalAcquisitionCost: 1000000000000 };
      const results = calculateRealEstateSyndication(largeInputs);
      expect(results.metrics.totalEquityInvestment).toBe(largeInputs.totalEquityNeeded);
    });

    it('should handle negative values in validation', () => {
      const negativeInputs = { ...mockInputs, interestRate: -5 };
      const validation = validateRealEstateSyndicationInputs(negativeInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.interestRate).toBe('Interest rate must be between 0% and 25%');
    });

    it('should handle missing required fields', () => {
      const incompleteInputs = { ...mockInputs };
      delete (incompleteInputs as any).projectName;
      const validation = validateRealEstateSyndicationInputs(incompleteInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.projectName).toBe('Project name is required');
    });

    it('should handle invalid date formats', () => {
      const invalidDateInputs = { ...mockInputs, acquisitionDate: 'invalid-date' };
      const validation = validateRealEstateSyndicationInputs(invalidDateInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.acquisitionDate).toBe('Acquisition date is required');
    });

    it('should handle future acquisition dates', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const futureDateInputs = { ...mockInputs, acquisitionDate: futureDate.toISOString().split('T')[0] };
      const validation = validateRealEstateSyndicationInputs(futureDateInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors?.acquisitionDate).toBe('Acquisition date cannot be in the future');
    });
  });
});