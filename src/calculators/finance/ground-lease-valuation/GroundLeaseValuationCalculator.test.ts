import { GroundLeaseValuationCalculator } from './GroundLeaseValuationCalculator';
import { validateGroundLeaseValuationInputs } from './validation';
import { calculateGroundLeaseValuation } from './formulas';

describe('GroundLeaseValuationCalculator', () => {
  const validInputs = {
    // Property Information
    propertyAddress: '123 Business District, Downtown, NY 10001',
    propertyType: 'commercial' as const,
    propertySize: 50000,
    landSize: 2.5,
    zoning: 'C-2',
    currentUse: 'Office building',
    highestBestUse: 'Mixed-use development',
    
    // Lease Information
    leaseType: 'ground_lease' as const,
    leaseStartDate: '2020-01-01',
    leaseEndDate: '2070-01-01',
    leaseTerm: 50,
    remainingTerm: 45,
    renewalOptions: 2,
    renewalTerm: 10,
    
    // Financial Information
    currentRent: 500000,
    rentEscalation: 2.5,
    rentEscalationFrequency: 'annual' as const,
    rentReviewClause: true,
    rentReviewFrequency: 5,
    rentReviewMethod: 'market' as const,
    
    // Operating Information
    operatingExpenses: 100000,
    propertyTaxes: 75000,
    insurance: 25000,
    maintenance: 50000,
    utilities: 30000,
    managementFees: 20000,
    
    // Market Information
    marketRent: 15,
    marketCapRate: 6.5,
    marketDiscountRate: 8.5,
    marketGrowthRate: 2.0,
    comparableSales: [
      {
        address: '456 Business Ave, Downtown, NY 10001',
        salePrice: 8000000,
        saleDate: '2023-01-01',
        capRate: 6.0,
        size: 45000
      }
    ],
    
    // Improvements
    buildingValue: 5000000,
    buildingAge: 5,
    buildingCondition: 'excellent' as const,
    remainingEconomicLife: 45,
    depreciationRate: 2.0,
    
    // Risk Factors
    tenantCredit: 'aa' as const,
    leaseSecurity: 'guaranteed' as const,
    marketRisk: 'low' as const,
    redevelopmentRisk: 'low' as const,
    
    // Legal and Regulatory
    zoningRestrictions: false,
    environmentalIssues: false,
    titleIssues: false,
    easements: false,
    restrictions: [],
    
    // Analysis Parameters
    analysisPeriod: 45,
    terminalCapRate: 7.0,
    reversionValue: 8000000,
    discountRate: 8.5,
    inflationRate: 2.0,
    
    // Reporting Preferences
    currency: 'USD' as const,
    displayFormat: 'percentage' as const,
    includeCharts: true
  };

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(GroundLeaseValuationCalculator.id).toBe('ground-lease-valuation');
      expect(GroundLeaseValuationCalculator.name).toBe('Ground Lease Valuation Calculator');
      expect(GroundLeaseValuationCalculator.category).toBe('finance');
      expect(GroundLeaseValuationCalculator.subcategory).toBe('real-estate');
    });

    it('should have comprehensive description', () => {
      expect(GroundLeaseValuationCalculator.description).toBeTruthy();
      expect(GroundLeaseValuationCalculator.longDescription).toBeTruthy();
      expect(GroundLeaseValuationCalculator.longDescription.length).toBeGreaterThan(100);
    });

    it('should have all required input fields', () => {
      const requiredFields = [
        'propertyAddress', 'propertyType', 'propertySize', 'landSize', 'zoning',
        'currentUse', 'highestBestUse', 'leaseType', 'leaseStartDate', 'leaseEndDate',
        'leaseTerm', 'remainingTerm', 'renewalOptions', 'renewalTerm', 'currentRent',
        'rentEscalation', 'rentEscalationFrequency', 'rentReviewClause',
        'rentReviewFrequency', 'rentReviewMethod', 'operatingExpenses', 'propertyTaxes',
        'insurance', 'maintenance', 'utilities', 'managementFees', 'marketRent',
        'marketCapRate', 'marketDiscountRate', 'marketGrowthRate', 'buildingValue',
        'buildingAge', 'buildingCondition', 'remainingEconomicLife', 'depreciationRate',
        'tenantCredit', 'leaseSecurity', 'marketRisk', 'redevelopmentRisk',
        'zoningRestrictions', 'environmentalIssues', 'titleIssues', 'easements',
        'analysisPeriod', 'terminalCapRate', 'reversionValue', 'discountRate',
        'inflationRate', 'currency', 'displayFormat', 'includeCharts'
      ];

      requiredFields.forEach(field => {
        expect(GroundLeaseValuationCalculator.inputs[field]).toBeDefined();
      });
    });

    it('should have all required output fields', () => {
      const requiredOutputs = [
        'presentValue', 'netPresentValue', 'internalRateOfReturn', 'yieldToMaturity',
        'capitalizationRate', 'annualCashFlow', 'totalCashFlow', 'cashOnCashReturn',
        'debtServiceCoverage', 'grossIncome', 'netOperatingIncome', 'effectiveGrossIncome',
        'vacancyLoss', 'collectionLoss', 'totalExpenses', 'expenseRatio',
        'netIncomeMultiplier', 'marketValue', 'marketValuePerSquareFoot',
        'marketValuePerAcre', 'comparableValue', 'riskScore', 'probabilityOfDefault',
        'lossGivenDefault', 'expectedLoss', 'sensitivityMatrix', 'scenarios', 'analysis'
      ];

      requiredOutputs.forEach(field => {
        expect(GroundLeaseValuationCalculator.outputs[field]).toBeDefined();
      });
    });

    it('should have formulas defined', () => {
      expect(GroundLeaseValuationCalculator.formulas).toBeDefined();
      expect(Object.keys(GroundLeaseValuationCalculator.formulas).length).toBeGreaterThan(0);
    });

    it('should have examples defined', () => {
      expect(GroundLeaseValuationCalculator.examples).toBeDefined();
      expect(GroundLeaseValuationCalculator.examples.length).toBeGreaterThan(0);
    });

    it('should have tags defined', () => {
      expect(GroundLeaseValuationCalculator.tags).toBeDefined();
      expect(GroundLeaseValuationCalculator.tags.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateGroundLeaseValuationInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).propertyAddress;
      
      const result = validateGroundLeaseValuationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property address is required');
    });

    it('should reject invalid property size', () => {
      const invalidInputs = { ...validInputs, propertySize: -1000 };
      
      const result = validateGroundLeaseValuationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property size must be greater than 0');
    });

    it('should reject invalid lease term', () => {
      const invalidInputs = { ...validInputs, leaseTerm: 0 };
      
      const result = validateGroundLeaseValuationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Lease term must be greater than 0');
    });

    it('should reject invalid rent escalation rate', () => {
      const invalidInputs = { ...validInputs, rentEscalation: 60 };
      
      const result = validateGroundLeaseValuationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Rent escalation rate cannot exceed 50%');
    });

    it('should reject invalid discount rate', () => {
      const invalidInputs = { ...validInputs, discountRate: 35 };
      
      const result = validateGroundLeaseValuationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Discount rate cannot exceed 30%');
    });

    it('should reject invalid dates', () => {
      const invalidInputs = { ...validInputs, leaseEndDate: '2020-01-01' };
      
      const result = validateGroundLeaseValuationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Lease end date must be after lease start date');
    });

    it('should provide warnings for business logic issues', () => {
      const warningInputs = { 
        ...validInputs, 
        currentRent: 50000,
        operatingExpenses: 60000 
      };
      
      const result = validateGroundLeaseValuationInputs(warningInputs);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Current rent is less than or equal to operating expenses, which may indicate a poor investment');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate present value correctly', () => {
      const metrics = calculateGroundLeaseValuation(validInputs);
      
      expect(metrics.presentValue).toBeGreaterThan(0);
      expect(metrics.presentValue).toBeLessThan(100000000);
      expect(typeof metrics.presentValue).toBe('number');
    });

    it('should calculate net present value correctly', () => {
      const metrics = calculateGroundLeaseValuation(validInputs);
      
      expect(metrics.netPresentValue).toBeDefined();
      expect(typeof metrics.netPresentValue).toBe('number');
    });

    it('should calculate IRR correctly', () => {
      const metrics = calculateGroundLeaseValuation(validInputs);
      
      expect(metrics.internalRateOfReturn).toBeGreaterThan(0);
      expect(metrics.internalRateOfReturn).toBeLessThan(50);
      expect(typeof metrics.internalRateOfReturn).toBe('number');
    });

    it('should calculate capitalization rate correctly', () => {
      const metrics = calculateGroundLeaseValuation(validInputs);
      
      expect(metrics.capitalizationRate).toBeGreaterThan(0);
      expect(metrics.capitalizationRate).toBeLessThan(20);
      expect(typeof metrics.capitalizationRate).toBe('number');
    });

    it('should calculate cash flow metrics correctly', () => {
      const metrics = calculateGroundLeaseValuation(validInputs);
      
      expect(metrics.annualCashFlow).toBeDefined();
      expect(metrics.totalCashFlow).toBeDefined();
      expect(metrics.cashOnCashReturn).toBeDefined();
      expect(typeof metrics.annualCashFlow).toBe('number');
      expect(typeof metrics.totalCashFlow).toBe('number');
      expect(typeof metrics.cashOnCashReturn).toBe('number');
    });

    it('should calculate income metrics correctly', () => {
      const metrics = calculateGroundLeaseValuation(validInputs);
      
      expect(metrics.grossIncome).toBe(validInputs.currentRent);
      expect(metrics.netOperatingIncome).toBeDefined();
      expect(metrics.effectiveGrossIncome).toBeDefined();
      expect(metrics.vacancyLoss).toBeDefined();
      expect(metrics.collectionLoss).toBeDefined();
    });

    it('should calculate expense metrics correctly', () => {
      const metrics = calculateGroundLeaseValuation(validInputs);
      
      const expectedTotalExpenses = validInputs.operatingExpenses + validInputs.propertyTaxes + 
                                   validInputs.insurance + validInputs.maintenance + 
                                   validInputs.utilities + validInputs.managementFees;
      
      expect(metrics.totalExpenses).toBe(expectedTotalExpenses);
      expect(metrics.expenseRatio).toBeDefined();
      expect(metrics.netIncomeMultiplier).toBeDefined();
    });

    it('should calculate market value metrics correctly', () => {
      const metrics = calculateGroundLeaseValuation(validInputs);
      
      expect(metrics.marketValue).toBeDefined();
      expect(metrics.marketValuePerSquareFoot).toBeDefined();
      expect(metrics.marketValuePerAcre).toBeDefined();
      expect(metrics.comparableValue).toBeDefined();
    });

    it('should calculate risk metrics correctly', () => {
      const metrics = calculateGroundLeaseValuation(validInputs);
      
      expect(metrics.riskScore).toBeGreaterThanOrEqual(1);
      expect(metrics.riskScore).toBeLessThanOrEqual(10);
      expect(metrics.probabilityOfDefault).toBeGreaterThanOrEqual(0);
      expect(metrics.probabilityOfDefault).toBeLessThanOrEqual(25);
      expect(metrics.lossGivenDefault).toBeGreaterThanOrEqual(20);
      expect(metrics.lossGivenDefault).toBeLessThanOrEqual(80);
      expect(metrics.expectedLoss).toBeDefined();
    });

    it('should calculate sensitivity matrix correctly', () => {
      const metrics = calculateGroundLeaseValuation(validInputs);
      
      expect(metrics.sensitivityMatrix).toBeDefined();
      expect(Array.isArray(metrics.sensitivityMatrix)).toBe(true);
      expect(metrics.sensitivityMatrix.length).toBeGreaterThan(0);
    });

    it('should calculate scenarios correctly', () => {
      const metrics = calculateGroundLeaseValuation(validInputs);
      
      expect(metrics.scenarios).toBeDefined();
      expect(Array.isArray(metrics.scenarios)).toBe(true);
      expect(metrics.scenarios.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Integration', () => {
    it('should calculate complete output with valid inputs', () => {
      const output = GroundLeaseValuationCalculator.calculate(validInputs);
      
      expect(output).toBeDefined();
      expect(output.presentValue).toBeDefined();
      expect(output.analysis).toBeDefined();
      expect(output.analysis.valuationRating).toBeDefined();
      expect(output.analysis.recommendation).toBeDefined();
    });

    it('should throw error with invalid inputs', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).propertyAddress;
      
      expect(() => {
        GroundLeaseValuationCalculator.calculate(invalidInputs);
      }).toThrow('Validation failed');
    });

    it('should generate report correctly', () => {
      const output = GroundLeaseValuationCalculator.calculate(validInputs);
      const report = GroundLeaseValuationCalculator.generateReport(validInputs, output);
      
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(100);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero rent escalation', () => {
      const zeroEscalationInputs = { ...validInputs, rentEscalation: 0 };
      const metrics = calculateGroundLeaseValuation(zeroEscalationInputs);
      
      expect(metrics.presentValue).toBeDefined();
      expect(metrics.internalRateOfReturn).toBeDefined();
    });

    it('should handle high rent escalation', () => {
      const highEscalationInputs = { ...validInputs, rentEscalation: 10 };
      const metrics = calculateGroundLeaseValuation(highEscalationInputs);
      
      expect(metrics.presentValue).toBeDefined();
      expect(metrics.internalRateOfReturn).toBeDefined();
    });

    it('should handle zero expenses', () => {
      const zeroExpensesInputs = { 
        ...validInputs, 
        operatingExpenses: 0,
        propertyTaxes: 0,
        insurance: 0,
        maintenance: 0,
        utilities: 0,
        managementFees: 0
      };
      const metrics = calculateGroundLeaseValuation(zeroExpensesInputs);
      
      expect(metrics.netOperatingIncome).toBe(validInputs.currentRent);
      expect(metrics.totalExpenses).toBe(0);
    });

    it('should handle poor tenant credit', () => {
      const poorCreditInputs = { ...validInputs, tenantCredit: 'ccc' as const };
      const metrics = calculateGroundLeaseValuation(poorCreditInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(5);
      expect(metrics.probabilityOfDefault).toBeGreaterThan(10);
    });

    it('should handle high market risk', () => {
      const highRiskInputs = { ...validInputs, marketRisk: 'high' as const };
      const metrics = calculateGroundLeaseValuation(highRiskInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(5);
    });

    it('should handle short lease terms', () => {
      const shortTermInputs = { 
        ...validInputs, 
        leaseTerm: 5,
        remainingTerm: 3,
        analysisPeriod: 3
      };
      const metrics = calculateGroundLeaseValuation(shortTermInputs);
      
      expect(metrics.presentValue).toBeDefined();
      expect(metrics.internalRateOfReturn).toBeDefined();
    });

    it('should handle long lease terms', () => {
      const longTermInputs = { 
        ...validInputs, 
        leaseTerm: 99,
        remainingTerm: 80,
        analysisPeriod: 50
      };
      const metrics = calculateGroundLeaseValuation(longTermInputs);
      
      expect(metrics.presentValue).toBeDefined();
      expect(metrics.internalRateOfReturn).toBeDefined();
    });
  });

  describe('Performance', () => {
    it('should calculate results quickly', () => {
      const startTime = Date.now();
      const metrics = calculateGroundLeaseValuation(validInputs);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
      expect(metrics.presentValue).toBeDefined();
    });

    it('should handle large property sizes', () => {
      const largePropertyInputs = { ...validInputs, propertySize: 1000000 };
      const metrics = calculateGroundLeaseValuation(largePropertyInputs);
      
      expect(metrics.presentValue).toBeDefined();
      expect(metrics.marketValuePerSquareFoot).toBeDefined();
    });

    it('should handle high property values', () => {
      const highValueInputs = { 
        ...validInputs, 
        buildingValue: 50000000,
        reversionValue: 80000000
      };
      const metrics = calculateGroundLeaseValuation(highValueInputs);
      
      expect(metrics.presentValue).toBeDefined();
      expect(metrics.netPresentValue).toBeDefined();
    });
  });
});
