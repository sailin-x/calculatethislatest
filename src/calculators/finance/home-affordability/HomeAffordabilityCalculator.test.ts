import { HomeAffordabilityCalculator } from './HomeAffordabilityCalculator';
import { validateHomeAffordabilityInputs } from './validation';
import { calculateHomeAffordability } from './formulas';

describe('HomeAffordabilityCalculator', () => {
  const validInputs = {
    // Borrower Information
    annualIncome: 75000,
    monthlyIncome: 6250,
    creditScore: 720,
    employmentType: 'employed' as const,
    employmentLength: 5,
    
    // Financial Information
    downPayment: 50000,
    downPaymentPercentage: 20,
    monthlyDebtPayments: 500,
    annualDebtPayments: 6000,
    debtToIncomeRatio: 25,
    frontEndRatio: 28,
    backEndRatio: 36,
    
    // Assets and Savings
    liquidAssets: 75000,
    retirementSavings: 100000,
    otherAssets: 25000,
    totalAssets: 200000,
    
    // Market Information
    interestRate: 6.5,
    loanTerm: 30,
    propertyTaxRate: 1.2,
    homeownersInsuranceRate: 0.5,
    pmiRate: 0.5,
    hoaFees: 200,
    
    // Location Information
    propertyLocation: 'Austin, TX',
    marketCondition: 'stable' as const,
    medianHomePrice: 350000,
    averageDaysOnMarket: 30,
    
    // Loan Information
    loanType: 'conventional' as const,
    maxLTV: 80,
    maxDTI: 43,
    maxFrontEndRatio: 28,
    
    // Additional Costs
    closingCosts: 8000,
    movingCosts: 2000,
    emergencyFund: 15000,
    maintenanceReserve: 5000,
    
    // Analysis Parameters
    analysisPeriod: 10,
    inflationRate: 2.5,
    incomeGrowthRate: 3.0,
    propertyAppreciationRate: 3.5,
    
    // Reporting Preferences
    currency: 'USD' as const,
    displayFormat: 'currency' as const,
    includeCharts: true
  };

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(HomeAffordabilityCalculator.id).toBe('home-affordability');
      expect(HomeAffordabilityCalculator.name).toBe('Home Affordability Calculator');
      expect(HomeAffordabilityCalculator.category).toBe('finance');
      expect(HomeAffordabilityCalculator.subcategory).toBe('real-estate');
    });

    it('should have comprehensive description', () => {
      expect(HomeAffordabilityCalculator.description).toBeTruthy();
      expect(HomeAffordabilityCalculator.longDescription).toBeTruthy();
      expect(HomeAffordabilityCalculator.longDescription.length).toBeGreaterThan(100);
    });

    it('should have all required input fields', () => {
      const requiredFields = [
        'annualIncome', 'monthlyIncome', 'creditScore', 'employmentType',
        'employmentLength', 'downPayment', 'downPaymentPercentage',
        'monthlyDebtPayments', 'annualDebtPayments', 'debtToIncomeRatio',
        'frontEndRatio', 'backEndRatio', 'liquidAssets', 'retirementSavings',
        'otherAssets', 'totalAssets', 'interestRate', 'loanTerm',
        'propertyTaxRate', 'homeownersInsuranceRate', 'pmiRate', 'hoaFees',
        'propertyLocation', 'marketCondition', 'medianHomePrice',
        'averageDaysOnMarket', 'loanType', 'maxLTV', 'maxDTI',
        'maxFrontEndRatio', 'closingCosts', 'movingCosts', 'emergencyFund',
        'maintenanceReserve', 'analysisPeriod', 'inflationRate',
        'incomeGrowthRate', 'propertyAppreciationRate', 'currency',
        'displayFormat', 'includeCharts'
      ];

      requiredFields.forEach(field => {
        expect(HomeAffordabilityCalculator.inputs[field]).toBeDefined();
      });
    });

    it('should have all required output fields', () => {
      const requiredOutputs = [
        'maxHomePrice', 'maxLoanAmount', 'totalMonthlyPayment',
        'affordabilityScore', 'riskLevel', 'analysis'
      ];

      requiredOutputs.forEach(field => {
        expect(HomeAffordabilityCalculator.outputs[field]).toBeDefined();
      });
    });

    it('should have formulas defined', () => {
      expect(HomeAffordabilityCalculator.formulas).toBeDefined();
      expect(Object.keys(HomeAffordabilityCalculator.formulas).length).toBeGreaterThan(0);
    });

    it('should have examples defined', () => {
      expect(HomeAffordabilityCalculator.examples).toBeDefined();
      expect(HomeAffordabilityCalculator.examples.length).toBeGreaterThan(0);
    });

    it('should have tags defined', () => {
      expect(HomeAffordabilityCalculator.tags).toBeDefined();
      expect(HomeAffordabilityCalculator.tags.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateHomeAffordabilityInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).annualIncome;
      
      const result = validateHomeAffordabilityInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Annual income must be greater than 0');
    });

    it('should reject invalid annual income', () => {
      const invalidInputs = { ...validInputs, annualIncome: -1000 };
      
      const result = validateHomeAffordabilityInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Annual income must be greater than 0');
    });

    it('should reject invalid credit score', () => {
      const invalidInputs = { ...validInputs, creditScore: 200 };
      
      const result = validateHomeAffordabilityInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Credit score must be between 300 and 850');
    });

    it('should reject invalid down payment percentage', () => {
      const invalidInputs = { ...validInputs, downPaymentPercentage: 110 };
      
      const result = validateHomeAffordabilityInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment percentage cannot exceed 100%');
    });

    it('should reject invalid interest rate', () => {
      const invalidInputs = { ...validInputs, interestRate: 20 };
      
      const result = validateHomeAffordabilityInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate cannot exceed 15%');
    });

    it('should provide warnings for business logic issues', () => {
      const warningInputs = { 
        ...validInputs, 
        creditScore: 550,
        downPaymentPercentage: 10
      };
      
      const result = validateHomeAffordabilityInputs(warningInputs);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Credit score below 650 may affect loan terms');
      expect(result.warnings).toContain('Down payment less than 20% may require PMI');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate max home price correctly', () => {
      const metrics = calculateHomeAffordability(validInputs);
      
      expect(metrics.maxHomePrice).toBeGreaterThan(0);
      expect(metrics.maxHomePrice).toBeLessThan(1000000);
      expect(typeof metrics.maxHomePrice).toBe('number');
    });

    it('should calculate max loan amount correctly', () => {
      const metrics = calculateHomeAffordability(validInputs);
      
      expect(metrics.maxLoanAmount).toBeGreaterThan(0);
      expect(metrics.maxLoanAmount).toBeLessThan(metrics.maxHomePrice);
      expect(typeof metrics.maxLoanAmount).toBe('number');
    });

    it('should calculate total monthly payment correctly', () => {
      const metrics = calculateHomeAffordability(validInputs);
      
      expect(metrics.totalMonthlyPayment).toBeGreaterThan(0);
      expect(typeof metrics.totalMonthlyPayment).toBe('number');
    });

    it('should calculate affordability score correctly', () => {
      const metrics = calculateHomeAffordability(validInputs);
      
      expect(metrics.affordabilityScore).toBeGreaterThanOrEqual(1);
      expect(metrics.affordabilityScore).toBeLessThanOrEqual(10);
      expect(typeof metrics.affordabilityScore).toBe('number');
    });

    it('should calculate risk level correctly', () => {
      const metrics = calculateHomeAffordability(validInputs);
      
      expect(['low', 'medium', 'high', 'very_high']).toContain(metrics.riskLevel);
      expect(typeof metrics.riskLevel).toBe('string');
    });

    it('should calculate financial ratios correctly', () => {
      const metrics = calculateHomeAffordability(validInputs);
      
      expect(metrics.actualDTI).toBeGreaterThan(0);
      expect(metrics.actualDTI).toBeLessThan(100);
      expect(metrics.actualFrontEndRatio).toBeGreaterThan(0);
      expect(metrics.actualFrontEndRatio).toBeLessThan(100);
      expect(metrics.actualBackEndRatio).toBeGreaterThan(0);
      expect(metrics.actualBackEndRatio).toBeLessThan(100);
    });

    it('should calculate cash flow metrics correctly', () => {
      const metrics = calculateHomeAffordability(validInputs);
      
      expect(metrics.monthlyCashFlow).toBeDefined();
      expect(metrics.annualCashFlow).toBeDefined();
      expect(metrics.emergencyFundMonths).toBeDefined();
      expect(metrics.savingsRate).toBeDefined();
      expect(typeof metrics.monthlyCashFlow).toBe('number');
      expect(typeof metrics.annualCashFlow).toBe('number');
    });

    it('should calculate market metrics correctly', () => {
      const metrics = calculateHomeAffordability(validInputs);
      
      expect(metrics.priceToIncomeRatio).toBeGreaterThan(0);
      expect(metrics.rentToPriceRatio).toBeGreaterThan(0);
      expect(metrics.marketAffordabilityIndex).toBeGreaterThanOrEqual(1);
      expect(metrics.marketAffordabilityIndex).toBeLessThanOrEqual(10);
    });

    it('should calculate sensitivity matrix correctly', () => {
      const metrics = calculateHomeAffordability(validInputs);
      
      expect(metrics.sensitivityMatrix).toBeDefined();
      expect(Array.isArray(metrics.sensitivityMatrix)).toBe(true);
      expect(metrics.sensitivityMatrix.length).toBeGreaterThan(0);
    });

    it('should calculate scenarios correctly', () => {
      const metrics = calculateHomeAffordability(validInputs);
      
      expect(metrics.scenarios).toBeDefined();
      expect(Array.isArray(metrics.scenarios)).toBe(true);
      expect(metrics.scenarios.length).toBeGreaterThan(0);
    });

    it('should calculate affordability timeline correctly', () => {
      const metrics = calculateHomeAffordability(validInputs);
      
      expect(metrics.affordabilityTimeline).toBeDefined();
      expect(Array.isArray(metrics.affordabilityTimeline)).toBe(true);
      expect(metrics.affordabilityTimeline.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Integration', () => {
    it('should calculate complete output with valid inputs', () => {
      const output = HomeAffordabilityCalculator.calculate(validInputs);
      
      expect(output).toBeDefined();
      expect(output.maxHomePrice).toBeDefined();
      expect(output.analysis).toBeDefined();
      expect(output.analysis.affordabilityRating).toBeDefined();
      expect(output.analysis.recommendation).toBeDefined();
    });

    it('should throw error with invalid inputs', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).annualIncome;
      
      expect(() => {
        HomeAffordabilityCalculator.calculate(invalidInputs);
      }).toThrow('Validation failed');
    });

    it('should generate report correctly', () => {
      const output = HomeAffordabilityCalculator.calculate(validInputs);
      const report = HomeAffordabilityCalculator.generateReport(validInputs, output);
      
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(100);
    });
  });

  describe('Edge Cases', () => {
    it('should handle high income', () => {
      const highIncomeInputs = { ...validInputs, annualIncome: 200000 };
      const metrics = calculateHomeAffordability(highIncomeInputs);
      
      expect(metrics.maxHomePrice).toBeDefined();
      expect(metrics.affordabilityScore).toBeGreaterThan(5);
    });

    it('should handle low income', () => {
      const lowIncomeInputs = { ...validInputs, annualIncome: 30000 };
      const metrics = calculateHomeAffordability(lowIncomeInputs);
      
      expect(metrics.maxHomePrice).toBeDefined();
      expect(metrics.affordabilityScore).toBeLessThan(7);
    });

    it('should handle high debt', () => {
      const highDebtInputs = { ...validInputs, monthlyDebtPayments: 2000 };
      const metrics = calculateHomeAffordability(highDebtInputs);
      
      expect(metrics.maxHomePrice).toBeDefined();
      expect(metrics.affordabilityScore).toBeLessThan(7);
    });

    it('should handle low credit score', () => {
      const lowCreditInputs = { ...validInputs, creditScore: 550 };
      const metrics = calculateHomeAffordability(lowCreditInputs);
      
      expect(metrics.affordabilityScore).toBeLessThan(7);
      expect(metrics.riskLevel).toBe('high' || 'very_high');
    });

    it('should handle high interest rates', () => {
      const highRateInputs = { ...validInputs, interestRate: 10 };
      const metrics = calculateHomeAffordability(highRateInputs);
      
      expect(metrics.maxHomePrice).toBeDefined();
      expect(metrics.totalMonthlyPayment).toBeDefined();
    });

    it('should handle zero down payment', () => {
      const zeroDownInputs = { ...validInputs, downPayment: 0, downPaymentPercentage: 0 };
      const metrics = calculateHomeAffordability(zeroDownInputs);
      
      expect(metrics.maxHomePrice).toBeDefined();
      expect(metrics.maxLoanAmount).toBeDefined();
    });

    it('should handle high property taxes', () => {
      const highTaxInputs = { ...validInputs, propertyTaxRate: 3 };
      const metrics = calculateHomeAffordability(highTaxInputs);
      
      expect(metrics.totalMonthlyPayment).toBeDefined();
      expect(metrics.monthlyPropertyTax).toBeDefined();
    });

    it('should handle hot market conditions', () => {
      const hotMarketInputs = { ...validInputs, marketCondition: 'hot' as const };
      const metrics = calculateHomeAffordability(hotMarketInputs);
      
      expect(metrics.marketAffordabilityIndex).toBeDefined();
    });
  });

  describe('Performance', () => {
    it('should calculate results quickly', () => {
      const startTime = Date.now();
      const metrics = calculateHomeAffordability(validInputs);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
      expect(metrics.maxHomePrice).toBeDefined();
    });

    it('should handle large property values', () => {
      const largePropertyInputs = { ...validInputs, medianHomePrice: 1000000 };
      const metrics = calculateHomeAffordability(largePropertyInputs);
      
      expect(metrics.maxHomePrice).toBeDefined();
      expect(metrics.priceToIncomeRatio).toBeDefined();
    });

    it('should handle high asset values', () => {
      const highAssetInputs = { ...validInputs, totalAssets: 1000000 };
      const metrics = calculateHomeAffordability(highAssetInputs);
      
      expect(metrics.affordabilityScore).toBeDefined();
      expect(metrics.emergencyFundMonths).toBeDefined();
    });
  });
});
