import { HELOCCalculator } from './HELOCCalculator';
import { validateHELOCInputs } from './validation';
import { calculateHELOC } from './formulas';

describe('HELOCCalculator', () => {
  const validInputs = {
    // Property Information
    propertyValue: 500000,
    propertyAddress: '123 Main St, City, State 12345',
    propertyType: 'single_family' as const,
    propertyAge: 15,
    propertyCondition: 'good' as const,
    
    // Current Mortgage Information
    currentMortgageBalance: 300000,
    currentMortgageRate: 4.5,
    currentMortgagePayment: 1500,
    mortgageType: 'conventional' as const,
    
    // HELOC Information
    helocAmount: 100000,
    helocRate: 6.5,
    helocRateType: 'variable' as const,
    drawPeriod: 10,
    repaymentPeriod: 15,
    minimumPayment: 100,
    minimumPaymentType: 'interest_only' as const,
    
    // Borrower Information
    borrowerCreditScore: 720,
    borrowerIncome: 80000,
    borrowerDebtToIncomeRatio: 35,
    borrowerEmploymentType: 'employed' as const,
    borrowerEmploymentLength: 5,
    
    // Fees and Costs
    originationFee: 500,
    appraisalFee: 400,
    titleInsuranceFee: 800,
    recordingFee: 150,
    annualFee: 50,
    inactivityFee: 25,
    earlyClosureFee: 100,
    otherFees: 200,
    
    // Usage Information
    intendedUse: 'home_improvement' as const,
    drawAmount: 50000,
    drawFrequency: 'as_needed' as const,
    repaymentStrategy: 'interest_only' as const,
    
    // Market Information
    marketCondition: 'stable' as const,
    marketGrowthRate: 3.0,
    
    // Risk Factors
    marketRisk: 'medium' as const,
    propertyRisk: 'medium' as const,
    borrowerRisk: 'medium' as const,
    
    // Analysis Parameters
    analysisPeriod: 10,
    inflationRate: 2.5,
    taxRate: 25,
    
    // Reporting Preferences
    currency: 'USD' as const,
    displayFormat: 'currency' as const,
    includeCharts: true
  };

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(HELOCCalculator.id).toBe('heloc');
      expect(HELOCCalculator.name).toBe('HELOC (Home Equity Line of Credit) Calculator');
      expect(HELOCCalculator.category).toBe('finance');
      expect(HELOCCalculator.subcategory).toBe('real-estate');
    });

    it('should have comprehensive description', () => {
      expect(HELOCCalculator.description).toBeTruthy();
      expect(HELOCCalculator.longDescription).toBeTruthy();
      expect(HELOCCalculator.longDescription.length).toBeGreaterThan(100);
    });

    it('should have all required input fields', () => {
      const requiredFields = [
        'propertyValue', 'propertyAddress', 'propertyType', 'propertyAge',
        'propertyCondition', 'currentMortgageBalance', 'currentMortgageRate',
        'currentMortgagePayment', 'mortgageType', 'helocAmount', 'helocRate',
        'helocRateType', 'drawPeriod', 'repaymentPeriod', 'minimumPayment',
        'minimumPaymentType', 'borrowerCreditScore', 'borrowerIncome',
        'borrowerDebtToIncomeRatio', 'borrowerEmploymentType',
        'borrowerEmploymentLength', 'originationFee', 'appraisalFee',
        'titleInsuranceFee', 'recordingFee', 'annualFee', 'inactivityFee',
        'earlyClosureFee', 'otherFees', 'intendedUse', 'drawAmount',
        'drawFrequency', 'repaymentStrategy', 'marketCondition',
        'marketGrowthRate', 'marketRisk', 'propertyRisk', 'borrowerRisk',
        'analysisPeriod', 'inflationRate', 'taxRate', 'currency',
        'displayFormat', 'includeCharts'
      ];

      requiredFields.forEach(field => {
        expect(HELOCCalculator.inputs[field]).toBeDefined();
      });
    });

    it('should have all required output fields', () => {
      const requiredOutputs = [
        'totalEquity', 'availableEquity', 'combinedLTV', 'monthlyPayment',
        'totalInterestPaid', 'effectiveInterestRate', 'totalFees',
        'riskScore', 'analysis'
      ];

      requiredOutputs.forEach(field => {
        expect(HELOCCalculator.outputs[field]).toBeDefined();
      });
    });

    it('should have formulas defined', () => {
      expect(HELOCCalculator.formulas).toBeDefined();
      expect(Object.keys(HELOCCalculator.formulas).length).toBeGreaterThan(0);
    });

    it('should have examples defined', () => {
      expect(HELOCCalculator.examples).toBeDefined();
      expect(HELOCCalculator.examples.length).toBeGreaterThan(0);
    });

    it('should have tags defined', () => {
      expect(HELOCCalculator.tags).toBeDefined();
      expect(HELOCCalculator.tags.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateHELOCInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).propertyValue;
      
      const result = validateHELOCInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be greater than 0');
    });

    it('should reject invalid property value', () => {
      const invalidInputs = { ...validInputs, propertyValue: -1000 };
      
      const result = validateHELOCInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be greater than 0');
    });

    it('should reject invalid HELOC amount', () => {
      const invalidInputs = { ...validInputs, helocAmount: 0 };
      
      const result = validateHELOCInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('HELOC amount must be greater than 0');
    });

    it('should reject invalid credit score', () => {
      const invalidInputs = { ...validInputs, borrowerCreditScore: 200 };
      
      const result = validateHELOCInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower credit score must be between 300 and 850');
    });

    it('should reject mortgage balance exceeding property value', () => {
      const invalidInputs = { ...validInputs, currentMortgageBalance: 600000 };
      
      const result = validateHELOCInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current mortgage balance cannot exceed property value');
    });

    it('should provide warnings for business logic issues', () => {
      const warningInputs = { 
        ...validInputs, 
        borrowerCreditScore: 550,
        borrowerDebtToIncomeRatio: 55
      };
      
      const result = validateHELOCInputs(warningInputs);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Borrower has poor credit score, which may affect approval');
      expect(result.warnings).toContain('High debt-to-income ratio may affect approval');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate total equity correctly', () => {
      const metrics = calculateHELOC(validInputs);
      
      expect(metrics.totalEquity).toBe(validInputs.propertyValue - validInputs.currentMortgageBalance);
      expect(metrics.totalEquity).toBeGreaterThan(0);
      expect(typeof metrics.totalEquity).toBe('number');
    });

    it('should calculate available equity correctly', () => {
      const metrics = calculateHELOC(validInputs);
      
      expect(metrics.availableEquity).toBeCloseTo(metrics.totalEquity * 0.85, 2);
      expect(metrics.availableEquity).toBeGreaterThan(0);
      expect(typeof metrics.availableEquity).toBe('number');
    });

    it('should calculate combined LTV correctly', () => {
      const metrics = calculateHELOC(validInputs);
      
      const expectedCombinedLTV = ((validInputs.currentMortgageBalance + validInputs.helocAmount) / validInputs.propertyValue) * 100;
      expect(metrics.combinedLTV).toBeCloseTo(expectedCombinedLTV, 2);
      expect(metrics.combinedLTV).toBeGreaterThan(0);
      expect(metrics.combinedLTV).toBeLessThan(100);
    });

    it('should calculate monthly payment correctly', () => {
      const metrics = calculateHELOC(validInputs);
      
      expect(metrics.monthlyPayment).toBeGreaterThan(0);
      expect(typeof metrics.monthlyPayment).toBe('number');
    });

    it('should calculate total interest paid correctly', () => {
      const metrics = calculateHELOC(validInputs);
      
      expect(metrics.totalInterestPaid).toBeGreaterThan(0);
      expect(typeof metrics.totalInterestPaid).toBe('number');
    });

    it('should calculate effective interest rate correctly', () => {
      const metrics = calculateHELOC(validInputs);
      
      expect(metrics.effectiveInterestRate).toBeGreaterThan(0);
      expect(metrics.effectiveInterestRate).toBeLessThan(30);
      expect(typeof metrics.effectiveInterestRate).toBe('number');
    });

    it('should calculate total fees correctly', () => {
      const metrics = calculateHELOC(validInputs);
      
      const expectedTotalFees = validInputs.originationFee + validInputs.appraisalFee + 
                               validInputs.titleInsuranceFee + validInputs.recordingFee + 
                               validInputs.otherFees;
      expect(metrics.totalFees).toBe(expectedTotalFees);
      expect(typeof metrics.totalFees).toBe('number');
    });

    it('should calculate risk score correctly', () => {
      const metrics = calculateHELOC(validInputs);
      
      expect(metrics.riskScore).toBeGreaterThanOrEqual(1);
      expect(metrics.riskScore).toBeLessThanOrEqual(10);
      expect(typeof metrics.riskScore).toBe('number');
    });

    it('should calculate risk metrics correctly', () => {
      const metrics = calculateHELOC(validInputs);
      
      expect(metrics.probabilityOfDefault).toBeGreaterThanOrEqual(0);
      expect(metrics.probabilityOfDefault).toBeLessThanOrEqual(20);
      expect(metrics.lossGivenDefault).toBeGreaterThanOrEqual(15);
      expect(metrics.lossGivenDefault).toBeLessThanOrEqual(60);
      expect(metrics.expectedLoss).toBeDefined();
    });

    it('should calculate sensitivity matrix correctly', () => {
      const metrics = calculateHELOC(validInputs);
      
      expect(metrics.sensitivityMatrix).toBeDefined();
      expect(Array.isArray(metrics.sensitivityMatrix)).toBe(true);
      expect(metrics.sensitivityMatrix.length).toBeGreaterThan(0);
    });

    it('should calculate scenarios correctly', () => {
      const metrics = calculateHELOC(validInputs);
      
      expect(metrics.scenarios).toBeDefined();
      expect(Array.isArray(metrics.scenarios)).toBe(true);
      expect(metrics.scenarios.length).toBeGreaterThan(0);
    });

    it('should calculate payment schedule correctly', () => {
      const metrics = calculateHELOC(validInputs);
      
      expect(metrics.paymentSchedule).toBeDefined();
      expect(Array.isArray(metrics.paymentSchedule)).toBe(true);
      expect(metrics.paymentSchedule.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Integration', () => {
    it('should calculate complete output with valid inputs', () => {
      const output = HELOCCalculator.calculate(validInputs);
      
      expect(output).toBeDefined();
      expect(output.totalEquity).toBeDefined();
      expect(output.analysis).toBeDefined();
      expect(output.analysis.helocRating).toBeDefined();
      expect(output.analysis.recommendation).toBeDefined();
    });

    it('should throw error with invalid inputs', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).propertyValue;
      
      expect(() => {
        HELOCCalculator.calculate(invalidInputs);
      }).toThrow('Validation failed');
    });

    it('should generate report correctly', () => {
      const output = HELOCCalculator.calculate(validInputs);
      const report = HELOCCalculator.generateReport(validInputs, output);
      
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(100);
    });
  });

  describe('Edge Cases', () => {
    it('should handle high HELOC rates', () => {
      const highRateInputs = { ...validInputs, helocRate: 12 };
      const metrics = calculateHELOC(highRateInputs);
      
      expect(metrics.monthlyPayment).toBeDefined();
      expect(metrics.totalInterestPaid).toBeDefined();
      expect(metrics.effectiveInterestRate).toBeDefined();
    });

    it('should handle low credit scores', () => {
      const lowCreditInputs = { ...validInputs, borrowerCreditScore: 550 };
      const metrics = calculateHELOC(lowCreditInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(5);
      expect(metrics.probabilityOfDefault).toBeGreaterThan(10);
    });

    it('should handle high LTV ratios', () => {
      const highLTVInputs = { 
        ...validInputs, 
        currentMortgageBalance: 400000,
        helocAmount: 100000
      };
      const metrics = calculateHELOC(highLTVInputs);
      
      expect(metrics.combinedLTV).toBeGreaterThan(90);
      expect(metrics.riskScore).toBeGreaterThan(5);
    });

    it('should handle declining markets', () => {
      const decliningMarketInputs = { 
        ...validInputs, 
        marketCondition: 'declining' as const,
        marketGrowthRate: -5
      };
      const metrics = calculateHELOC(decliningMarketInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(5);
    });

    it('should handle unemployed borrowers', () => {
      const unemployedInputs = { 
        ...validInputs, 
        borrowerEmploymentType: 'unemployed' as const
      };
      const metrics = calculateHELOC(unemployedInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(5);
      expect(metrics.probabilityOfDefault).toBeGreaterThan(10);
    });

    it('should handle poor property conditions', () => {
      const poorConditionInputs = { 
        ...validInputs, 
        propertyCondition: 'poor' as const
      };
      const metrics = calculateHELOC(poorConditionInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(5);
    });

    it('should handle zero draw amounts', () => {
      const zeroDrawInputs = { ...validInputs, drawAmount: 0 };
      const metrics = calculateHELOC(zeroDrawInputs);
      
      expect(metrics.monthlyPayment).toBe(0);
      expect(metrics.totalInterestPaid).toBe(0);
    });

    it('should handle large draw amounts', () => {
      const largeDrawInputs = { ...validInputs, drawAmount: 80000 };
      const metrics = calculateHELOC(largeDrawInputs);
      
      expect(metrics.monthlyPayment).toBeDefined();
      expect(metrics.totalInterestPaid).toBeDefined();
    });
  });

  describe('Performance', () => {
    it('should calculate results quickly', () => {
      const startTime = Date.now();
      const metrics = calculateHELOC(validInputs);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
      expect(metrics.totalEquity).toBeDefined();
    });

    it('should handle large property values', () => {
      const largePropertyInputs = { ...validInputs, propertyValue: 2000000 };
      const metrics = calculateHELOC(largePropertyInputs);
      
      expect(metrics.totalEquity).toBeDefined();
      expect(metrics.availableEquity).toBeDefined();
    });

    it('should handle high HELOC amounts', () => {
      const highHELOCInputs = { ...validInputs, helocAmount: 500000 };
      const metrics = calculateHELOC(highHELOCInputs);
      
      expect(metrics.combinedLTV).toBeDefined();
      expect(metrics.monthlyPayment).toBeDefined();
    });
  });
});
