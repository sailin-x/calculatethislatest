import { HomeEquityLoanCalculator } from './HomeEquityLoanCalculator';
import { validateHomeEquityLoanInputs } from './validation';
import { calculateHomeEquityLoan } from './formulas';

describe('HomeEquityLoanCalculator', () => {
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
    
    // Home Equity Loan Information
    loanAmount: 100000,
    interestRate: 7.5,
    loanTerm: 15,
    paymentType: 'fixed' as const,
    paymentFrequency: 'monthly' as const,
    
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
    attorneyFee: 500,
    creditReportFee: 50,
    floodCertificationFee: 25,
    taxServiceFee: 75,
    otherFees: 200,
    
    // Loan Purpose
    loanPurpose: 'home_improvement' as const,
    purposeDescription: 'Kitchen renovation and bathroom remodel',
    
    // Market Information
    marketCondition: 'stable' as const,
    marketGrowthRate: 3.0,
    
    // Risk Factors
    marketRisk: 'medium' as const,
    propertyRisk: 'medium' as const,
    borrowerRisk: 'medium' as const,
    
    // Analysis Parameters
    analysisPeriod: 15,
    inflationRate: 2.5,
    taxRate: 25,
    
    // Reporting Preferences
    currency: 'USD' as const,
    displayFormat: 'currency' as const,
    includeCharts: true
  };

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(HomeEquityLoanCalculator.id).toBe('home-equity-loan');
      expect(HomeEquityLoanCalculator.name).toBe('Home Equity Loan Calculator');
      expect(HomeEquityLoanCalculator.category).toBe('finance');
      expect(HomeEquityLoanCalculator.subcategory).toBe('real-estate');
    });

    it('should have comprehensive description', () => {
      expect(HomeEquityLoanCalculator.description).toBeTruthy();
      expect(HomeEquityLoanCalculator.longDescription).toBeTruthy();
      expect(HomeEquityLoanCalculator.longDescription.length).toBeGreaterThan(100);
    });

    it('should have all required input fields', () => {
      const requiredFields = [
        'propertyValue', 'propertyAddress', 'propertyType', 'propertyAge',
        'propertyCondition', 'currentMortgageBalance', 'currentMortgageRate',
        'currentMortgagePayment', 'mortgageType', 'loanAmount', 'interestRate',
        'loanTerm', 'paymentType', 'paymentFrequency', 'borrowerCreditScore',
        'borrowerIncome', 'borrowerDebtToIncomeRatio', 'borrowerEmploymentType',
        'borrowerEmploymentLength', 'originationFee', 'appraisalFee',
        'titleInsuranceFee', 'recordingFee', 'attorneyFee', 'creditReportFee',
        'floodCertificationFee', 'taxServiceFee', 'otherFees', 'loanPurpose',
        'purposeDescription', 'marketCondition', 'marketGrowthRate',
        'marketRisk', 'propertyRisk', 'borrowerRisk', 'analysisPeriod',
        'inflationRate', 'taxRate', 'currency', 'displayFormat', 'includeCharts'
      ];

      requiredFields.forEach(field => {
        expect(HomeEquityLoanCalculator.inputs[field]).toBeDefined();
      });
    });

    it('should have all required output fields', () => {
      const requiredOutputs = [
        'totalEquity', 'availableEquity', 'combinedLTV', 'monthlyPayment',
        'totalInterestPaid', 'effectiveInterestRate', 'totalFees',
        'riskScore', 'analysis'
      ];

      requiredOutputs.forEach(field => {
        expect(HomeEquityLoanCalculator.outputs[field]).toBeDefined();
      });
    });

    it('should have formulas defined', () => {
      expect(HomeEquityLoanCalculator.formulas).toBeDefined();
      expect(Object.keys(HomeEquityLoanCalculator.formulas).length).toBeGreaterThan(0);
    });

    it('should have examples defined', () => {
      expect(HomeEquityLoanCalculator.examples).toBeDefined();
      expect(HomeEquityLoanCalculator.examples.length).toBeGreaterThan(0);
    });

    it('should have tags defined', () => {
      expect(HomeEquityLoanCalculator.tags).toBeDefined();
      expect(HomeEquityLoanCalculator.tags.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateHomeEquityLoanInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).propertyValue;
      
      const result = validateHomeEquityLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be greater than 0');
    });

    it('should reject invalid property value', () => {
      const invalidInputs = { ...validInputs, propertyValue: -1000 };
      
      const result = validateHomeEquityLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be greater than 0');
    });

    it('should reject invalid credit score', () => {
      const invalidInputs = { ...validInputs, borrowerCreditScore: 200 };
      
      const result = validateHomeEquityLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower credit score must be between 300 and 850');
    });

    it('should reject invalid interest rate', () => {
      const invalidInputs = { ...validInputs, interestRate: 20 };
      
      const result = validateHomeEquityLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate cannot exceed 15%');
    });

    it('should reject invalid loan amount', () => {
      const invalidInputs = { ...validInputs, loanAmount: 2000000 };
      
      const result = validateHomeEquityLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount cannot exceed $1,000,000');
    });

    it('should reject high combined LTV', () => {
      const invalidInputs = { ...validInputs, loanAmount: 200000 };
      
      const result = validateHomeEquityLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Combined LTV cannot exceed 95%');
    });

    it('should provide warnings for business logic issues', () => {
      const warningInputs = { 
        ...validInputs, 
        borrowerCreditScore: 550,
        borrowerDebtToIncomeRatio: 55,
        propertyCondition: 'poor'
      };
      
      const result = validateHomeEquityLoanInputs(warningInputs);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Credit score below 620 may affect loan approval');
      expect(result.warnings).toContain('High debt-to-income ratio may affect loan approval');
      expect(result.warnings).toContain('Poor property condition may affect loan approval');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate total equity correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.totalEquity).toBe(200000); // 500000 - 300000
      expect(typeof metrics.totalEquity).toBe('number');
    });

    it('should calculate available equity correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.availableEquity).toBe(170000); // 200000 * 0.85
      expect(typeof metrics.availableEquity).toBe('number');
    });

    it('should calculate combined LTV correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.combinedLTV).toBe(80); // (300000 + 100000) / 500000 * 100
      expect(typeof metrics.combinedLTV).toBe('number');
    });

    it('should calculate home equity LTV correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.homeEquityLTV).toBe(20); // 100000 / 500000 * 100
      expect(typeof metrics.homeEquityLTV).toBe('number');
    });

    it('should calculate monthly payment correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.monthlyPayment).toBeGreaterThan(0);
      expect(typeof metrics.monthlyPayment).toBe('number');
    });

    it('should calculate total interest paid correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.totalInterestPaid).toBeGreaterThan(0);
      expect(typeof metrics.totalInterestPaid).toBe('number');
    });

    it('should calculate effective interest rate correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.effectiveInterestRate).toBeGreaterThan(0);
      expect(typeof metrics.effectiveInterestRate).toBe('number');
    });

    it('should calculate total fees correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.totalFees).toBe(2700); // Sum of all fees
      expect(typeof metrics.totalFees).toBe('number');
    });

    it('should calculate cost of credit correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.costOfCredit).toBeGreaterThan(0);
      expect(typeof metrics.costOfCredit).toBe('number');
    });

    it('should calculate cash flow metrics correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.monthlyCashFlow).toBeLessThan(0); // Negative because it's an expense
      expect(metrics.totalCashFlow).toBeDefined();
      expect(metrics.breakEvenPoint).toBeDefined();
      expect(typeof metrics.monthlyCashFlow).toBe('number');
    });

    it('should calculate risk metrics correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.riskScore).toBeGreaterThanOrEqual(1);
      expect(metrics.riskScore).toBeLessThanOrEqual(10);
      expect(metrics.probabilityOfDefault).toBeGreaterThan(0);
      expect(metrics.lossGivenDefault).toBeGreaterThan(0);
      expect(metrics.expectedLoss).toBeGreaterThan(0);
      expect(typeof metrics.riskScore).toBe('number');
    });

    it('should calculate sensitivity matrix correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.sensitivityMatrix).toBeDefined();
      expect(Array.isArray(metrics.sensitivityMatrix)).toBe(true);
      expect(metrics.sensitivityMatrix.length).toBeGreaterThan(0);
    });

    it('should calculate scenarios correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.scenarios).toBeDefined();
      expect(Array.isArray(metrics.scenarios)).toBe(true);
      expect(metrics.scenarios.length).toBeGreaterThan(0);
    });

    it('should calculate payment schedule correctly', () => {
      const metrics = calculateHomeEquityLoan(validInputs);
      
      expect(metrics.paymentSchedule).toBeDefined();
      expect(Array.isArray(metrics.paymentSchedule)).toBe(true);
      expect(metrics.paymentSchedule.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Integration', () => {
    it('should calculate complete output with valid inputs', () => {
      const output = HomeEquityLoanCalculator.calculate(validInputs);
      
      expect(output).toBeDefined();
      expect(output.totalEquity).toBeDefined();
      expect(output.analysis).toBeDefined();
      expect(output.analysis.loanRating).toBeDefined();
      expect(output.analysis.recommendation).toBeDefined();
    });

    it('should throw error with invalid inputs', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).propertyValue;
      
      expect(() => {
        HomeEquityLoanCalculator.calculate(invalidInputs);
      }).toThrow('Validation failed');
    });

    it('should generate report correctly', () => {
      const output = HomeEquityLoanCalculator.calculate(validInputs);
      const report = HomeEquityLoanCalculator.generateReport(validInputs, output);
      
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(100);
    });
  });

  describe('Edge Cases', () => {
    it('should handle high property value', () => {
      const highValueInputs = { ...validInputs, propertyValue: 2000000 };
      const metrics = calculateHomeEquityLoan(highValueInputs);
      
      expect(metrics.totalEquity).toBeDefined();
      expect(metrics.combinedLTV).toBeDefined();
    });

    it('should handle low property value', () => {
      const lowValueInputs = { ...validInputs, propertyValue: 100000 };
      const metrics = calculateHomeEquityLoan(lowValueInputs);
      
      expect(metrics.totalEquity).toBeDefined();
      expect(metrics.combinedLTV).toBeDefined();
    });

    it('should handle high loan amount', () => {
      const highLoanInputs = { ...validInputs, loanAmount: 500000 };
      const metrics = calculateHomeEquityLoan(highLoanInputs);
      
      expect(metrics.combinedLTV).toBeDefined();
      expect(metrics.monthlyPayment).toBeDefined();
    });

    it('should handle low credit score', () => {
      const lowCreditInputs = { ...validInputs, borrowerCreditScore: 550 };
      const metrics = calculateHomeEquityLoan(lowCreditInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(5);
      expect(metrics.probabilityOfDefault).toBeGreaterThan(8);
    });

    it('should handle high interest rates', () => {
      const highRateInputs = { ...validInputs, interestRate: 12 };
      const metrics = calculateHomeEquityLoan(highRateInputs);
      
      expect(metrics.monthlyPayment).toBeDefined();
      expect(metrics.totalInterestPaid).toBeDefined();
    });

    it('should handle interest-only payments', () => {
      const interestOnlyInputs = { ...validInputs, paymentType: 'interest_only' as const };
      const metrics = calculateHomeEquityLoan(interestOnlyInputs);
      
      expect(metrics.monthlyPayment).toBeDefined();
      expect(metrics.riskScore).toBeGreaterThan(5);
    });

    it('should handle balloon payments', () => {
      const balloonInputs = { ...validInputs, paymentType: 'balloon' as const };
      const metrics = calculateHomeEquityLoan(balloonInputs);
      
      expect(metrics.monthlyPayment).toBeDefined();
      expect(metrics.riskScore).toBeGreaterThan(5);
    });

    it('should handle poor property condition', () => {
      const poorConditionInputs = { ...validInputs, propertyCondition: 'poor' as const };
      const metrics = calculateHomeEquityLoan(poorConditionInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(5);
    });

    it('should handle declining market', () => {
      const decliningMarketInputs = { ...validInputs, marketCondition: 'declining' as const };
      const metrics = calculateHomeEquityLoan(decliningMarketInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(5);
    });

    it('should handle unemployed borrower', () => {
      const unemployedInputs = { ...validInputs, borrowerEmploymentType: 'unemployed' as const };
      const metrics = calculateHomeEquityLoan(unemployedInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(7);
      expect(metrics.probabilityOfDefault).toBeGreaterThan(10);
    });
  });

  describe('Performance', () => {
    it('should calculate results quickly', () => {
      const startTime = Date.now();
      const metrics = calculateHomeEquityLoan(validInputs);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
      expect(metrics.totalEquity).toBeDefined();
    });

    it('should handle large loan amounts', () => {
      const largeLoanInputs = { ...validInputs, loanAmount: 800000 };
      const metrics = calculateHomeEquityLoan(largeLoanInputs);
      
      expect(metrics.combinedLTV).toBeDefined();
      expect(metrics.monthlyPayment).toBeDefined();
    });

    it('should handle long loan terms', () => {
      const longTermInputs = { ...validInputs, loanTerm: 30 };
      const metrics = calculateHomeEquityLoan(longTermInputs);
      
      expect(metrics.totalInterestPaid).toBeDefined();
      expect(metrics.paymentSchedule.length).toBe(360);
    });
  });
});
