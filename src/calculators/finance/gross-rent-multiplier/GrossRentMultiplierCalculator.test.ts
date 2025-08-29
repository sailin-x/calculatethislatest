import { GrossRentMultiplierCalculator } from './GrossRentMultiplierCalculator';
import { validateGrossRentMultiplierInputs } from './validation';
import { calculateGrossRentMultiplier } from './formulas';

describe('GrossRentMultiplierCalculator', () => {
  const validInputs = {
    // Property Information
    propertyAddress: '123 Oak Street, Suburban, CA 90210',
    propertyType: 'single_family' as const,
    propertySize: 2000,
    lotSize: 8000,
    yearBuilt: 2010,
    propertyCondition: 'good' as const,
    bedrooms: 3,
    bathrooms: 2,
    
    // Financial Information
    purchasePrice: 450000,
    marketValue: 475000,
    annualGrossRent: 36000,
    monthlyGrossRent: 3000,
    annualOperatingExpenses: 12000,
    monthlyOperatingExpenses: 1000,
    annualNetOperatingIncome: 24000,
    monthlyNetOperatingIncome: 2000,
    
    // Rent Information
    numberOfUnits: 1,
    vacancyRate: 5,
    collectionLoss: 2,
    effectiveGrossIncome: 33480,
    
    // Expense Breakdown
    propertyTaxes: 5000,
    insurance: 1500,
    utilities: 0,
    maintenance: 2000,
    propertyManagement: 1800,
    repairs: 1000,
    landscaping: 500,
    pestControl: 200,
    otherExpenses: 1000,
    
    // Market Information
    marketGRM: 12.5,
    marketCapRate: 5.5,
    marketRent: 18,
    
    // Location Information
    city: 'Suburban',
    state: 'CA',
    zipCode: '90210',
    neighborhood: 'Oak Street',
    marketType: 'stable' as const,
    marketTrend: 'appreciating' as const,
    
    // Property Features
    parkingSpaces: 2,
    hasPool: false,
    hasGym: false,
    hasLaundry: true,
    hasStorage: true,
    hasBalcony: false,
    hasFireplace: true,
    hasCentralAC: true,
    hasDishwasher: true,
    
    // Analysis Parameters
    analysisPeriod: 10,
    rentGrowthRate: 3.0,
    expenseGrowthRate: 2.5,
    appreciationRate: 4.0,
    discountRate: 8.0,
    
    // Reporting Preferences
    currency: 'USD' as const,
    displayFormat: 'percentage' as const,
    includeCharts: true
  };

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(GrossRentMultiplierCalculator.id).toBe('gross-rent-multiplier');
      expect(GrossRentMultiplierCalculator.name).toBe('Gross Rent Multiplier Calculator');
      expect(GrossRentMultiplierCalculator.category).toBe('finance');
      expect(GrossRentMultiplierCalculator.subcategory).toBe('real-estate');
    });

    it('should have comprehensive description', () => {
      expect(GrossRentMultiplierCalculator.description).toBeTruthy();
      expect(GrossRentMultiplierCalculator.longDescription).toBeTruthy();
      expect(GrossRentMultiplierCalculator.longDescription.length).toBeGreaterThan(100);
    });

    it('should have all required input fields', () => {
      const requiredFields = [
        'propertyAddress', 'propertyType', 'propertySize', 'lotSize', 'yearBuilt',
        'propertyCondition', 'bedrooms', 'bathrooms', 'purchasePrice', 'marketValue',
        'annualGrossRent', 'monthlyGrossRent', 'annualOperatingExpenses', 'monthlyOperatingExpenses',
        'annualNetOperatingIncome', 'monthlyNetOperatingIncome', 'numberOfUnits', 'vacancyRate',
        'collectionLoss', 'effectiveGrossIncome', 'propertyTaxes', 'insurance', 'utilities',
        'maintenance', 'propertyManagement', 'repairs', 'landscaping', 'pestControl',
        'otherExpenses', 'marketGRM', 'marketCapRate', 'marketRent', 'city', 'state',
        'zipCode', 'neighborhood', 'marketType', 'marketTrend', 'parkingSpaces',
        'hasPool', 'hasGym', 'hasLaundry', 'hasStorage', 'hasBalcony', 'hasFireplace',
        'hasCentralAC', 'hasDishwasher', 'analysisPeriod', 'rentGrowthRate',
        'expenseGrowthRate', 'appreciationRate', 'discountRate', 'currency',
        'displayFormat', 'includeCharts'
      ];

      requiredFields.forEach(field => {
        expect(GrossRentMultiplierCalculator.inputs[field]).toBeDefined();
      });
    });

    it('should have all required output fields', () => {
      const requiredOutputs = [
        'grossRentMultiplier', 'netRentMultiplier', 'effectiveGrossRentMultiplier',
        'marketGRMComparison', 'totalInvestment', 'annualCashFlow', 'monthlyCashFlow',
        'cashOnCashReturn', 'returnOnInvestment', 'grossIncome', 'netIncome',
        'effectiveGrossIncome', 'vacancyLoss', 'collectionLoss', 'totalExpenses',
        'expenseRatio', 'netIncomeMultiplier', 'marketValue', 'marketValuePerSquareFoot',
        'marketValuePerUnit', 'comparableValue', 'breakEvenRent', 'breakEvenOccupancy',
        'profitMargin', 'operatingExpenseRatio', 'riskScore', 'vacancyRisk',
        'marketRisk', 'expenseRisk', 'sensitivityMatrix', 'scenarios', 'analysis'
      ];

      requiredOutputs.forEach(field => {
        expect(GrossRentMultiplierCalculator.outputs[field]).toBeDefined();
      });
    });

    it('should have formulas defined', () => {
      expect(GrossRentMultiplierCalculator.formulas).toBeDefined();
      expect(Object.keys(GrossRentMultiplierCalculator.formulas).length).toBeGreaterThan(0);
    });

    it('should have examples defined', () => {
      expect(GrossRentMultiplierCalculator.examples).toBeDefined();
      expect(GrossRentMultiplierCalculator.examples.length).toBeGreaterThan(0);
    });

    it('should have tags defined', () => {
      expect(GrossRentMultiplierCalculator.tags).toBeDefined();
      expect(GrossRentMultiplierCalculator.tags.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateGrossRentMultiplierInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).propertyAddress;
      
      const result = validateGrossRentMultiplierInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property address is required');
    });

    it('should reject invalid property size', () => {
      const invalidInputs = { ...validInputs, propertySize: -1000 };
      
      const result = validateGrossRentMultiplierInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property size must be greater than 0');
    });

    it('should reject invalid year built', () => {
      const invalidInputs = { ...validInputs, yearBuilt: 1700 };
      
      const result = validateGrossRentMultiplierInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Year built must be between 1800 and 2030');
    });

    it('should reject invalid purchase price', () => {
      const invalidInputs = { ...validInputs, purchasePrice: 0 };
      
      const result = validateGrossRentMultiplierInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Purchase price must be greater than 0');
    });

    it('should reject invalid vacancy rate', () => {
      const invalidInputs = { ...validInputs, vacancyRate: 150 };
      
      const result = validateGrossRentMultiplierInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Vacancy rate cannot exceed 100%');
    });

    it('should reject invalid collection loss', () => {
      const invalidInputs = { ...validInputs, collectionLoss: 25 };
      
      const result = validateGrossRentMultiplierInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Collection loss cannot exceed 20%');
    });

    it('should reject invalid market GRM', () => {
      const invalidInputs = { ...validInputs, marketGRM: 60 };
      
      const result = validateGrossRentMultiplierInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Market GRM cannot exceed 50');
    });

    it('should reject invalid market cap rate', () => {
      const invalidInputs = { ...validInputs, marketCapRate: 25 };
      
      const result = validateGrossRentMultiplierInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Market cap rate cannot exceed 20%');
    });

    it('should provide warnings for business logic issues', () => {
      const warningInputs = { 
        ...validInputs, 
        annualGrossRent: 10000,
        annualOperatingExpenses: 12000 
      };
      
      const result = validateGrossRentMultiplierInputs(warningInputs);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Annual gross rent is less than or equal to annual operating expenses, which may indicate a poor investment');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate gross rent multiplier correctly', () => {
      const metrics = calculateGrossRentMultiplier(validInputs);
      
      const expectedGRM = validInputs.marketValue / validInputs.annualGrossRent;
      expect(metrics.grossRentMultiplier).toBeCloseTo(expectedGRM, 2);
      expect(typeof metrics.grossRentMultiplier).toBe('number');
    });

    it('should calculate net rent multiplier correctly', () => {
      const metrics = calculateGrossRentMultiplier(validInputs);
      
      const expectedNetRM = validInputs.marketValue / validInputs.annualNetOperatingIncome;
      expect(metrics.netRentMultiplier).toBeCloseTo(expectedNetRM, 2);
      expect(typeof metrics.netRentMultiplier).toBe('number');
    });

    it('should calculate effective gross rent multiplier correctly', () => {
      const metrics = calculateGrossRentMultiplier(validInputs);
      
      const expectedEffectiveGRM = validInputs.marketValue / validInputs.effectiveGrossIncome;
      expect(metrics.effectiveGrossRentMultiplier).toBeCloseTo(expectedEffectiveGRM, 2);
      expect(typeof metrics.effectiveGrossRentMultiplier).toBe('number');
    });

    it('should calculate market GRM comparison correctly', () => {
      const metrics = calculateGrossRentMultiplier(validInputs);
      
      const expectedComparison = (validInputs.marketValue / validInputs.annualGrossRent) - validInputs.marketGRM;
      expect(metrics.marketGRMComparison).toBeCloseTo(expectedComparison, 2);
      expect(typeof metrics.marketGRMComparison).toBe('number');
    });

    it('should calculate cash on cash return correctly', () => {
      const metrics = calculateGrossRentMultiplier(validInputs);
      
      const expectedCoC = (validInputs.annualNetOperatingIncome / validInputs.purchasePrice) * 100;
      expect(metrics.cashOnCashReturn).toBeCloseTo(expectedCoC, 2);
      expect(typeof metrics.cashOnCashReturn).toBe('number');
    });

    it('should calculate return on investment correctly', () => {
      const metrics = calculateGrossRentMultiplier(validInputs);
      
      const expectedROI = (validInputs.annualNetOperatingIncome / validInputs.marketValue) * 100;
      expect(metrics.returnOnInvestment).toBeCloseTo(expectedROI, 2);
      expect(typeof metrics.returnOnInvestment).toBe('number');
    });

    it('should calculate income metrics correctly', () => {
      const metrics = calculateGrossRentMultiplier(validInputs);
      
      expect(metrics.grossIncome).toBe(validInputs.annualGrossRent);
      expect(metrics.netIncome).toBe(validInputs.annualNetOperatingIncome);
      expect(metrics.effectiveGrossIncome).toBe(validInputs.effectiveGrossIncome);
      expect(metrics.vacancyLoss).toBe(validInputs.annualGrossRent * (validInputs.vacancyRate / 100));
      expect(metrics.collectionLoss).toBe(validInputs.annualGrossRent * (validInputs.collectionLoss / 100));
    });

    it('should calculate expense metrics correctly', () => {
      const metrics = calculateGrossRentMultiplier(validInputs);
      
      const expectedTotalExpenses = validInputs.propertyTaxes + validInputs.insurance + validInputs.utilities + 
                                   validInputs.maintenance + validInputs.propertyManagement + validInputs.repairs + 
                                   validInputs.landscaping + validInputs.pestControl + validInputs.otherExpenses;
      
      expect(metrics.totalExpenses).toBe(expectedTotalExpenses);
      expect(metrics.expenseRatio).toBeCloseTo((expectedTotalExpenses / validInputs.annualGrossRent) * 100, 2);
      expect(metrics.netIncomeMultiplier).toBeCloseTo(validInputs.marketValue / validInputs.annualNetOperatingIncome, 2);
    });

    it('should calculate market value metrics correctly', () => {
      const metrics = calculateGrossRentMultiplier(validInputs);
      
      expect(metrics.marketValue).toBe(validInputs.marketValue);
      expect(metrics.marketValuePerSquareFoot).toBe(validInputs.marketValue / validInputs.propertySize);
      expect(metrics.marketValuePerUnit).toBe(validInputs.marketValue / validInputs.numberOfUnits);
      expect(metrics.comparableValue).toBeDefined();
    });

    it('should calculate performance metrics correctly', () => {
      const metrics = calculateGrossRentMultiplier(validInputs);
      
      expect(metrics.breakEvenRent).toBeDefined();
      expect(metrics.breakEvenOccupancy).toBeDefined();
      expect(metrics.profitMargin).toBeDefined();
      expect(metrics.operatingExpenseRatio).toBeDefined();
    });

    it('should calculate risk metrics correctly', () => {
      const metrics = calculateGrossRentMultiplier(validInputs);
      
      expect(metrics.riskScore).toBeGreaterThanOrEqual(1);
      expect(metrics.riskScore).toBeLessThanOrEqual(10);
      expect(metrics.vacancyRisk).toBe(validInputs.vacancyRate);
      expect(metrics.marketRisk).toBeDefined();
      expect(metrics.expenseRisk).toBeDefined();
    });

    it('should calculate sensitivity matrix correctly', () => {
      const metrics = calculateGrossRentMultiplier(validInputs);
      
      expect(metrics.sensitivityMatrix).toBeDefined();
      expect(Array.isArray(metrics.sensitivityMatrix)).toBe(true);
      expect(metrics.sensitivityMatrix.length).toBeGreaterThan(0);
    });

    it('should calculate scenarios correctly', () => {
      const metrics = calculateGrossRentMultiplier(validInputs);
      
      expect(metrics.scenarios).toBeDefined();
      expect(Array.isArray(metrics.scenarios)).toBe(true);
      expect(metrics.scenarios.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Integration', () => {
    it('should calculate complete output with valid inputs', () => {
      const output = GrossRentMultiplierCalculator.calculate(validInputs);
      
      expect(output).toBeDefined();
      expect(output.grossRentMultiplier).toBeDefined();
      expect(output.analysis).toBeDefined();
      expect(output.analysis.investmentRating).toBeDefined();
      expect(output.analysis.recommendation).toBeDefined();
    });

    it('should throw error with invalid inputs', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).propertyAddress;
      
      expect(() => {
        GrossRentMultiplierCalculator.calculate(invalidInputs);
      }).toThrow('Validation failed');
    });

    it('should generate report correctly', () => {
      const output = GrossRentMultiplierCalculator.calculate(validInputs);
      const report = GrossRentMultiplierCalculator.generateReport(validInputs, output);
      
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(100);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero operating expenses', () => {
      const zeroExpensesInputs = { 
        ...validInputs, 
        annualOperatingExpenses: 0,
        monthlyOperatingExpenses: 0,
        annualNetOperatingIncome: validInputs.annualGrossRent,
        monthlyNetOperatingIncome: validInputs.monthlyGrossRent,
        propertyTaxes: 0,
        insurance: 0,
        utilities: 0,
        maintenance: 0,
        propertyManagement: 0,
        repairs: 0,
        landscaping: 0,
        pestControl: 0,
        otherExpenses: 0
      };
      const metrics = calculateGrossRentMultiplier(zeroExpensesInputs);
      
      expect(metrics.totalExpenses).toBe(0);
      expect(metrics.expenseRatio).toBe(0);
      expect(metrics.netIncome).toBe(validInputs.annualGrossRent);
    });

    it('should handle zero vacancy rate', () => {
      const zeroVacancyInputs = { ...validInputs, vacancyRate: 0 };
      const metrics = calculateGrossRentMultiplier(zeroVacancyInputs);
      
      expect(metrics.vacancyLoss).toBe(0);
      expect(metrics.vacancyRisk).toBe(0);
    });

    it('should handle high vacancy rate', () => {
      const highVacancyInputs = { ...validInputs, vacancyRate: 20 };
      const metrics = calculateGrossRentMultiplier(highVacancyInputs);
      
      expect(metrics.vacancyLoss).toBe(validInputs.annualGrossRent * 0.2);
      expect(metrics.vacancyRisk).toBe(20);
    });

    it('should handle declining market', () => {
      const decliningMarketInputs = { ...validInputs, marketType: 'declining' as const };
      const metrics = calculateGrossRentMultiplier(decliningMarketInputs);
      
      expect(metrics.marketRisk).toBeGreaterThan(5);
      expect(metrics.riskScore).toBeGreaterThan(5);
    });

    it('should handle poor property condition', () => {
      const poorConditionInputs = { ...validInputs, propertyCondition: 'poor' as const };
      const metrics = calculateGrossRentMultiplier(poorConditionInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(5);
    });

    it('should handle multi-family properties', () => {
      const multiFamilyInputs = { 
        ...validInputs, 
        propertyType: 'multi_family' as const,
        numberOfUnits: 4,
        bedrooms: 8,
        bathrooms: 4
      };
      const metrics = calculateGrossRentMultiplier(multiFamilyInputs);
      
      expect(metrics.marketValuePerUnit).toBe(validInputs.marketValue / 4);
      expect(metrics.grossRentMultiplier).toBeDefined();
    });

    it('should handle commercial properties', () => {
      const commercialInputs = { 
        ...validInputs, 
        propertyType: 'commercial' as const,
        numberOfUnits: 1,
        bedrooms: 0,
        bathrooms: 2
      };
      const metrics = calculateGrossRentMultiplier(commercialInputs);
      
      expect(metrics.grossRentMultiplier).toBeDefined();
      expect(metrics.marketValuePerSquareFoot).toBeDefined();
    });
  });

  describe('Performance', () => {
    it('should calculate results quickly', () => {
      const startTime = Date.now();
      const metrics = calculateGrossRentMultiplier(validInputs);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
      expect(metrics.grossRentMultiplier).toBeDefined();
    });

    it('should handle large property values', () => {
      const largeValueInputs = { 
        ...validInputs, 
        purchasePrice: 5000000,
        marketValue: 5500000,
        annualGrossRent: 400000
      };
      const metrics = calculateGrossRentMultiplier(largeValueInputs);
      
      expect(metrics.grossRentMultiplier).toBeDefined();
      expect(metrics.cashOnCashReturn).toBeDefined();
    });

    it('should handle high rent values', () => {
      const highRentInputs = { 
        ...validInputs, 
        annualGrossRent: 200000,
        monthlyGrossRent: 16667
      };
      const metrics = calculateGrossRentMultiplier(highRentInputs);
      
      expect(metrics.grossRentMultiplier).toBeDefined();
      expect(metrics.netRentMultiplier).toBeDefined();
    });
  });
});
