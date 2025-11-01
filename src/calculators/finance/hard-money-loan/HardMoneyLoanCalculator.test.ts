import { HardMoneyLoanCalculator } from './HardMoneyLoanCalculator';
import { validateHardMoneyLoanInputs } from './validation';
import { calculateHardMoneyLoan } from './formulas';

describe('HardMoneyLoanCalculator', () => {
  const validInputs = {
    // Loan Information
    loanAmount: 400000,
    loanTerm: 12,
    interestRate: 12.5,
    points: 2.0,
    originationFee: 2500,
    processingFee: 500,
    appraisalFee: 400,
    titleInsuranceFee: 1500,
    escrowFee: 800,
    recordingFee: 200,
    otherFees: 300,
    
    // Property Information
    propertyValue: 500000,
    propertyType: 'residential' as const,
    propertyCondition: 'fair' as const,
    propertyAddress: '123 Main St, City, State 12345',
    propertySize: 2000,
    propertyAge: 25,
    
    // Borrower Information
    borrowerCreditScore: 650,
    borrowerIncome: 75000,
    borrowerDebtToIncomeRatio: 45,
    borrowerLiquidity: 50000,
    borrowerExperience: 'intermediate' as const,
    
    // Project Information
    projectType: 'fix_and_flip' as const,
    projectTimeline: 6,
    renovationBudget: 50000,
    expectedARV: 700000,
    exitStrategy: 'sale' as const,
    
    // Market Information
    marketCondition: 'stable' as const,
    marketGrowthRate: 3.0,
    
    // Risk Factors
    marketRisk: 'medium' as const,
    propertyRisk: 'medium' as const,
    borrowerRisk: 'medium' as const,
    projectRisk: 'medium' as const,
    
    // Legal and Regulatory
    zoningCompliance: true,
    environmentalIssues: false,
    titleIssues: false,
    permitIssues: false,
    legalRestrictions: [],
    
    // Analysis Parameters
    analysisPeriod: 12,
    discountRate: 10.0,
    inflationRate: 2.5,
    taxRate: 25,
    
    // Reporting Preferences
    currency: 'USD' as const,
    displayFormat: 'currency' as const,
    includeCharts: true
  };

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(HardMoneyLoanCalculator.id).toBe('HardMoneyLoan');
      expect(HardMoneyLoanCalculator.name).toBe('Hard Money Loan Calculator');
      expect(HardMoneyLoanCalculator.category).toBe('finance');
      expect(HardMoneyLoanCalculator.subcategory).toBe('real-estate');
    });

    it('should have comprehensive description', () => {
      expect(HardMoneyLoanCalculator.description).toBeTruthy();
      expect(HardMoneyLoanCalculator.longDescription).toBeTruthy();
      expect(HardMoneyLoanCalculator.longDescription.length).toBeGreaterThan(100);
    });

    it('should have all required input fields', () => {
      const requiredFields = [
        'loanAmount', 'loanTerm', 'interestRate', 'points', 'originationFee',
        'processingFee', 'appraisalFee', 'titleInsuranceFee', 'escrowFee',
        'recordingFee', 'otherFees', 'propertyValue', 'propertyType',
        'propertyCondition', 'propertyAddress', 'propertySize', 'propertyAge',
        'borrowerCreditScore', 'borrowerIncome', 'borrowerDebtToIncomeRatio',
        'borrowerLiquidity', 'borrowerExperience', 'projectType',
        'projectTimeline', 'renovationBudget', 'expectedARV', 'exitStrategy',
        'marketCondition', 'marketGrowthRate', 'marketRisk', 'propertyRisk',
        'borrowerRisk', 'projectRisk', 'zoningCompliance', 'environmentalIssues',
        'titleIssues', 'permitIssues', 'analysisPeriod', 'discountRate',
        'inflationRate', 'taxRate', 'currency', 'displayFormat', 'includeCharts'
      ];

      requiredFields.forEach(field => {
        expect(HardMoneyLoanCalculator.inputs[field]).toBeDefined();
      });
    });

    it('should have all required output fields', () => {
      const requiredOutputs = [
        'totalLoanCost', 'monthlyPayment', 'totalInterestPaid',
        'effectiveInterestRate', 'loanToValueRatio', 'cashOnCashReturn',
        'internalRateOfReturn', 'riskScore', 'analysis'
      ];

      requiredOutputs.forEach(field => {
        expect(HardMoneyLoanCalculator.outputs[field]).toBeDefined();
      });
    });

    it('should have formulas defined', () => {
      expect(HardMoneyLoanCalculator.formulas).toBeDefined();
      expect(Object.keys(HardMoneyLoanCalculator.formulas).length).toBeGreaterThan(0);
    });

    it('should have examples defined', () => {
      expect(HardMoneyLoanCalculator.examples).toBeDefined();
      expect(HardMoneyLoanCalculator.examples.length).toBeGreaterThan(0);
    });

    it('should have tags defined', () => {
      expect(HardMoneyLoanCalculator.tags).toBeDefined();
      expect(HardMoneyLoanCalculator.tags.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateHardMoneyLoanInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).loanAmount;
      
      const result = validateHardMoneyLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be greater than 0');
    });

    it('should reject invalid loan amount', () => {
      const invalidInputs = { ...validInputs, loanAmount: -1000 };
      
      const result = validateHardMoneyLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be greater than 0');
    });

    it('should reject invalid loan term', () => {
      const invalidInputs = { ...validInputs, loanTerm: 0 };
      
      const result = validateHardMoneyLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be greater than 0');
    });

    it('should reject invalid interest rate', () => {
      const invalidInputs = { ...validInputs, interestRate: 30 };
      
      const result = validateHardMoneyLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate cannot exceed 25%');
    });

    it('should reject invalid credit score', () => {
      const invalidInputs = { ...validInputs, borrowerCreditScore: 200 };
      
      const result = validateHardMoneyLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower credit score must be between 300 and 850');
    });

    it('should reject loan amount exceeding property value', () => {
      const invalidInputs = { ...validInputs, loanAmount: 600000, propertyValue: 500000 };
      
      const result = validateHardMoneyLoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount cannot exceed property value');
    });

    it('should provide warnings for business logic issues', () => {
      const warningInputs = { 
        ...validInputs, 
        borrowerCreditScore: 550,
        borrowerDebtToIncomeRatio: 55
      };
      
      const result = validateHardMoneyLoanInputs(warningInputs);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Borrower has poor credit score, indicating higher default risk');
      expect(result.warnings).toContain('High DebtToIncome ratio may indicate borrower financial stress');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate total loan cost correctly', () => {
      const metrics = calculateHardMoneyLoan(validInputs);
      
      expect(metrics.totalLoanCost).toBeGreaterThan(validInputs.loanAmount);
      expect(metrics.totalFees).toBeGreaterThan(0);
      expect(typeof metrics.totalLoanCost).toBe('number');
    });

    it('should calculate monthly payment correctly', () => {
      const metrics = calculateHardMoneyLoan(validInputs);
      
      expect(metrics.monthlyPayment).toBeGreaterThan(0);
      expect(metrics.monthlyPayment).toBeLessThan(validInputs.loanAmount);
      expect(typeof metrics.monthlyPayment).toBe('number');
    });

    it('should calculate total interest paid correctly', () => {
      const metrics = calculateHardMoneyLoan(validInputs);
      
      expect(metrics.totalInterestPaid).toBeGreaterThan(0);
      expect(metrics.totalInterestPaid).toBeLessThan(validInputs.loanAmount);
      expect(typeof metrics.totalInterestPaid).toBe('number');
    });

    it('should calculate effective interest rate correctly', () => {
      const metrics = calculateHardMoneyLoan(validInputs);
      
      expect(metrics.effectiveInterestRate).toBeGreaterThan(0);
      expect(metrics.effectiveInterestRate).toBeLessThan(30);
      expect(typeof metrics.effectiveInterestRate).toBe('number');
    });

    it('should calculate LoanToValue ratio correctly', () => {
      const metrics = calculateHardMoneyLoan(validInputs);
      
      expect(metrics.loanToValueRatio).toBeCloseTo((validInputs.loanAmount / validInputs.propertyValue) * 100, 2);
      expect(metrics.loanToValueRatio).toBeGreaterThan(0);
      expect(metrics.loanToValueRatio).toBeLessThan(100);
    });

    it('should calculate CashOnCash return correctly', () => {
      const metrics = calculateHardMoneyLoan(validInputs);
      
      expect(metrics.cashOnCashReturn).toBeDefined();
      expect(typeof metrics.cashOnCashReturn).toBe('number');
    });

    it('should calculate IRR correctly', () => {
      const metrics = calculateHardMoneyLoan(validInputs);
      
      expect(metrics.internalRateOfReturn).toBeGreaterThan(0);
      expect(metrics.internalRateOfReturn).toBeLessThan(50);
      expect(typeof metrics.internalRateOfReturn).toBe('number');
    });

    it('should calculate risk score correctly', () => {
      const metrics = calculateHardMoneyLoan(validInputs);
      
      expect(metrics.riskScore).toBeGreaterThanOrEqual(1);
      expect(metrics.riskScore).toBeLessThanOrEqual(10);
      expect(typeof metrics.riskScore).toBe('number');
    });

    it('should calculate risk metrics correctly', () => {
      const metrics = calculateHardMoneyLoan(validInputs);
      
      expect(metrics.probabilityOfDefault).toBeGreaterThanOrEqual(0);
      expect(metrics.probabilityOfDefault).toBeLessThanOrEqual(30);
      expect(metrics.lossGivenDefault).toBeGreaterThanOrEqual(20);
      expect(metrics.lossGivenDefault).toBeLessThanOrEqual(80);
      expect(metrics.expectedLoss).toBeDefined();
    });

    it('should calculate sensitivity matrix correctly', () => {
      const metrics = calculateHardMoneyLoan(validInputs);
      
      expect(metrics.sensitivityMatrix).toBeDefined();
      expect(Array.isArray(metrics.sensitivityMatrix)).toBe(true);
      expect(metrics.sensitivityMatrix.length).toBeGreaterThan(0);
    });

    it('should calculate scenarios correctly', () => {
      const metrics = calculateHardMoneyLoan(validInputs);
      
      expect(metrics.scenarios).toBeDefined();
      expect(Array.isArray(metrics.scenarios)).toBe(true);
      expect(metrics.scenarios.length).toBeGreaterThan(0);
    });

    it('should calculate project timeline correctly', () => {
      const metrics = calculateHardMoneyLoan(validInputs);
      
      expect(metrics.projectTimeline).toBeDefined();
      expect(Array.isArray(metrics.projectTimeline)).toBe(true);
      expect(metrics.projectTimeline.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Integration', () => {
    it('should calculate complete output with valid inputs', () => {
      const output = HardMoneyLoanCalculator.calculate(validInputs);
      
      expect(output).toBeDefined();
      expect(output.totalLoanCost).toBeDefined();
      expect(output.analysis).toBeDefined();
      expect(output.analysis.loanRating).toBeDefined();
      expect(output.analysis.recommendation).toBeDefined();
    });

    it('should throw error with invalid inputs', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).loanAmount;
      
      expect(() => {
        HardMoneyLoanCalculator.calculate(invalidInputs);
      }).toThrow('Validation failed');
    });

    it('should generate report correctly', () => {
      const output = HardMoneyLoanCalculator.calculate(validInputs);
      const report = HardMoneyLoanCalculator.generateReport(validInputs, output);
      
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(100);
    });
  });

  describe('Edge Cases', () => {
    it('should handle high interest rates', () => {
      const highRateInputs = { ...validInputs, interestRate: 20 };
      const metrics = calculateHardMoneyLoan(highRateInputs);
      
      expect(metrics.monthlyPayment).toBeDefined();
      expect(metrics.totalInterestPaid).toBeDefined();
      expect(metrics.effectiveInterestRate).toBeDefined();
    });

    it('should handle short loan terms', () => {
      const shortTermInputs = { ...validInputs, loanTerm: 3 };
      const metrics = calculateHardMoneyLoan(shortTermInputs);
      
      expect(metrics.monthlyPayment).toBeDefined();
      expect(metrics.totalInterestPaid).toBeDefined();
    });

    it('should handle long loan terms', () => {
      const longTermInputs = { ...validInputs, loanTerm: 36 };
      const metrics = calculateHardMoneyLoan(longTermInputs);
      
      expect(metrics.monthlyPayment).toBeDefined();
      expect(metrics.totalInterestPaid).toBeDefined();
    });

    it('should handle poor borrower credit', () => {
      const poorCreditInputs = { ...validInputs, borrowerCreditScore: 550 };
      const metrics = calculateHardMoneyLoan(poorCreditInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(5);
      expect(metrics.probabilityOfDefault).toBeGreaterThan(10);
    });

    it('should handle high risk projects', () => {
      const highRiskInputs = { 
        ...validInputs, 
        projectType: 'construction' as const,
        propertyCondition: 'needs_renovation' as const
      };
      const metrics = calculateHardMoneyLoan(highRiskInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(5);
    });

    it('should handle declining markets', () => {
      const decliningMarketInputs = { 
        ...validInputs, 
        marketCondition: 'declining' as const,
        marketGrowthRate: -5
      };
      const metrics = calculateHardMoneyLoan(decliningMarketInputs);
      
      expect(metrics.riskScore).toBeGreaterThan(5);
    });

    it('should handle zero renovation budget', () => {
      const zeroRenovationInputs = { ...validInputs, renovationBudget: 0 };
      const metrics = calculateHardMoneyLoan(zeroRenovationInputs);
      
      expect(metrics.totalCashFlow).toBeDefined();
      expect(metrics.cashOnCashReturn).toBeDefined();
    });

    it('should handle high renovation budgets', () => {
      const highRenovationInputs = { ...validInputs, renovationBudget: 200000 };
      const metrics = calculateHardMoneyLoan(highRenovationInputs);
      
      expect(metrics.totalCashFlow).toBeDefined();
      expect(metrics.cashOnCashReturn).toBeDefined();
    });
  });

  describe('Performance', () => {
    it('should calculate results quickly', () => {
      const startTime = Date.now();
      const metrics = calculateHardMoneyLoan(validInputs);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
      expect(metrics.totalLoanCost).toBeDefined();
    });

    it('should handle large loan amounts', () => {
      const largeLoanInputs = { ...validInputs, loanAmount: 2000000 };
      const metrics = calculateHardMoneyLoan(largeLoanInputs);
      
      expect(metrics.totalLoanCost).toBeDefined();
      expect(metrics.monthlyPayment).toBeDefined();
    });

    it('should handle high property values', () => {
      const highValueInputs = { 
        ...validInputs, 
        propertyValue: 3000000,
        expectedARV: 4000000
      };
      const metrics = calculateHardMoneyLoan(highValueInputs);
      
      expect(metrics.totalLoanCost).toBeDefined();
      expect(metrics.loanToValueRatio).toBeDefined();
    });
  });
});
