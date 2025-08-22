import { describe, it, expect } from 'vitest';
import { calculateMortgageAPRComparison, generateMortgageAPRComparisonAnalysis } from './formulas';
import { validateMortgageAPRComparisonInputs } from './validation';
import { quickValidateMortgageAPRComparison } from './quickValidation';
import { MortgageAPRComparisonInputs, MortgageOption } from './validation';

describe('Mortgage APR Comparison Calculator', () => {
  const sampleMortgageOptions: MortgageOption[] = [
    {
      id: 'option1',
      name: 'Bank A - 30 Year Fixed',
      interestRate: 5.5,
      closingCosts: 3000,
      points: 0,
      originationFee: 1000,
      applicationFee: 500,
      appraisalFee: 400,
      titleInsurance: 800,
      escrowFees: 200,
      otherFees: 300,
      lenderCredits: 0,
      rateLockFee: 0,
      prepaymentPenalty: 0,
      monthlyPMI: 0,
      monthlyPropertyTax: 0,
      monthlyInsurance: 0
    },
    {
      id: 'option2',
      name: 'Bank B - 30 Year Fixed',
      interestRate: 5.25,
      closingCosts: 5000,
      points: 1,
      originationFee: 1500,
      applicationFee: 600,
      appraisalFee: 450,
      titleInsurance: 900,
      escrowFees: 250,
      otherFees: 400,
      lenderCredits: 0,
      rateLockFee: 0,
      prepaymentPenalty: 0,
      monthlyPMI: 0,
      monthlyPropertyTax: 0,
      monthlyInsurance: 0
    },
    {
      id: 'option3',
      name: 'Credit Union - 30 Year Fixed',
      interestRate: 5.75,
      closingCosts: 2000,
      points: 0,
      originationFee: 800,
      applicationFee: 400,
      appraisalFee: 350,
      titleInsurance: 700,
      escrowFees: 150,
      otherFees: 200,
      lenderCredits: 500,
      rateLockFee: 0,
      prepaymentPenalty: 0,
      monthlyPMI: 0,
      monthlyPropertyTax: 0,
      monthlyInsurance: 0
    }
  ];

  const validInputs: MortgageAPRComparisonInputs = {
    loanAmount: 300000,
    loanTerm: 30,
    propertyValue: 375000,
    downPayment: 75000,
    downPaymentPercentage: 20,
    creditScore: 750,
    propertyType: 'Primary Residence',
    occupancyType: 'Owner Occupied',
    loanType: 'Conventional',
    state: 'CA',
    propertyTaxRate: 1.2,
    homeownersInsuranceRate: 0.5,
    pmiRate: 0.5,
    mortgageOptions: sampleMortgageOptions
  };

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgageAPRComparisonInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing loan amount', () => {
      const invalidInputs = { ...validInputs, loanAmount: 0 };
      const result = validateMortgageAPRComparisonInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be greater than 0');
    });

    it('should reject missing loan term', () => {
      const invalidInputs = { ...validInputs, loanTerm: 0 };
      const result = validateMortgageAPRComparisonInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be greater than 0');
    });

    it('should reject insufficient mortgage options', () => {
      const invalidInputs = { ...validInputs, mortgageOptions: [sampleMortgageOptions[0]] };
      const result = validateMortgageAPRComparisonInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('At least two mortgage options are required for comparison');
    });

    it('should reject invalid interest rate', () => {
      const invalidOptions = [...sampleMortgageOptions];
      invalidOptions[0].interestRate = 0;
      const invalidInputs = { ...validInputs, mortgageOptions: invalidOptions };
      const result = validateMortgageAPRComparisonInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mortgage option 1 must have a valid interest rate');
    });

    it('should reject duplicate option IDs', () => {
      const invalidOptions = [...sampleMortgageOptions];
      invalidOptions[1].id = 'option1';
      const invalidInputs = { ...validInputs, mortgageOptions: invalidOptions };
      const result = validateMortgageAPRComparisonInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mortgage options must have unique IDs');
    });

    it('should reject negative closing costs', () => {
      const invalidOptions = [...sampleMortgageOptions];
      invalidOptions[0].closingCosts = -100;
      const invalidInputs = { ...validInputs, mortgageOptions: invalidOptions };
      const result = validateMortgageAPRComparisonInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mortgage option 1 closing costs cannot be negative');
    });

    it('should reject invalid credit score', () => {
      const invalidInputs = { ...validInputs, creditScore: 200 };
      const result = validateMortgageAPRComparisonInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Credit score should be between 300 and 850');
    });

    it('should reject down payment exceeding property value', () => {
      const invalidInputs = { ...validInputs, downPayment: 400000 };
      const result = validateMortgageAPRComparisonInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment cannot exceed property value');
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation with valid inputs', () => {
      const result = quickValidateMortgageAPRComparison(validInputs);
      expect(result).toBe(true);
    });

    it('should fail quick validation with missing required fields', () => {
      const invalidInputs = { ...validInputs, loanAmount: 0 };
      const result = quickValidateMortgageAPRComparison(invalidInputs);
      expect(result).toBe(false);
    });

    it('should fail quick validation with insufficient options', () => {
      const invalidInputs = { ...validInputs, mortgageOptions: [sampleMortgageOptions[0]] };
      const result = quickValidateMortgageAPRComparison(invalidInputs);
      expect(result).toBe(false);
    });

    it('should fail quick validation with duplicate IDs', () => {
      const invalidOptions = [...sampleMortgageOptions];
      invalidOptions[1].id = 'option1';
      const invalidInputs = { ...validInputs, mortgageOptions: invalidOptions };
      const result = quickValidateMortgageAPRComparison(invalidInputs);
      expect(result).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate APR comparison correctly', () => {
      const result = calculateMortgageAPRComparison(validInputs);
      
      expect(result.comparisonTable).toHaveLength(3);
      expect(result.bestOption).toBeDefined();
      expect(result.aprComparison).toBeDefined();
      expect(result.aprComparison.options).toHaveLength(3);
    });

    it('should calculate monthly payment comparison', () => {
      const result = calculateMortgageAPRComparison(validInputs);
      
      expect(result.monthlyPaymentComparison).toBeDefined();
      expect(result.monthlyPaymentComparison.options).toHaveLength(3);
      expect(result.monthlyPaymentComparison.lowestPayment).toBeDefined();
      expect(result.monthlyPaymentComparison.highestPayment).toBeDefined();
    });

    it('should calculate total cost comparison', () => {
      const result = calculateMortgageAPRComparison(validInputs);
      
      expect(result.totalCostComparison).toBeDefined();
      expect(result.totalCostComparison.options).toHaveLength(3);
      expect(result.totalCostComparison.bestOption).toBeDefined();
      expect(result.totalCostComparison.worstOption).toBeDefined();
    });

    it('should calculate break-even analysis', () => {
      const result = calculateMortgageAPRComparison(validInputs);
      
      expect(result.breakEvenAnalysis).toBeDefined();
      expect(result.breakEvenAnalysis.comparisons).toBeDefined();
      expect(result.breakEvenAnalysis.averageBreakEven).toBeGreaterThanOrEqual(0);
    });

    it('should calculate savings analysis', () => {
      const result = calculateMortgageAPRComparison(validInputs);
      
      expect(result.savingsAnalysis).toBeDefined();
      expect(result.savingsAnalysis.bestVsWorst).toBeGreaterThanOrEqual(0);
      expect(result.savingsAnalysis.fiveYearSavings).toBeGreaterThanOrEqual(0);
      expect(result.savingsAnalysis.tenYearSavings).toBeGreaterThanOrEqual(0);
      expect(result.savingsAnalysis.lifetimeSavings).toBeGreaterThanOrEqual(0);
    });

    it('should calculate key metrics', () => {
      const result = calculateMortgageAPRComparison(validInputs);
      
      expect(result.keyMetrics).toBeDefined();
      expect(result.keyMetrics.averageAPR).toBeGreaterThan(0);
      expect(result.keyMetrics.averageMonthlyPayment).toBeGreaterThan(0);
      expect(result.keyMetrics.averageClosingCosts).toBeGreaterThanOrEqual(0);
      expect(result.keyMetrics.averageTotalCost).toBeGreaterThan(0);
    });

    it('should generate recommendation', () => {
      const result = calculateMortgageAPRComparison(validInputs);
      
      expect(result.recommendation).toBeDefined();
      expect(typeof result.recommendation).toBe('string');
      expect(result.recommendation.length).toBeGreaterThan(50);
    });

    it('should sort options by total cost', () => {
      const result = calculateMortgageAPRComparison(validInputs);
      
      for (let i = 1; i < result.comparisonTable.length; i++) {
        expect(result.comparisonTable[i].totalCost).toBeGreaterThanOrEqual(result.comparisonTable[i-1].totalCost);
      }
    });

    it('should calculate APR correctly', () => {
      const result = calculateMortgageAPRComparison(validInputs);
      
      result.comparisonTable.forEach(option => {
        expect(option.apr).toBeGreaterThan(0);
        expect(option.apr).toBeGreaterThanOrEqual(option.interestRate);
      });
    });

    it('should calculate monthly payments correctly', () => {
      const result = calculateMortgageAPRComparison(validInputs);
      
      result.comparisonTable.forEach(option => {
        expect(option.monthlyPayment).toBeGreaterThan(0);
      });
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const outputs = calculateMortgageAPRComparison(validInputs);
      const report = generateMortgageAPRComparisonAnalysis(validInputs, outputs);
      
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(500);
    });

    it('should include key metrics in report', () => {
      const outputs = calculateMortgageAPRComparison(validInputs);
      const report = generateMortgageAPRComparisonAnalysis(validInputs, outputs);
      
      expect(report).toContain('Loan Amount');
      expect(report).toContain('Loan Term');
      expect(report).toContain('Best Option');
      expect(report).toContain('Potential Savings');
    });

    it('should include comparison table in report', () => {
      const outputs = calculateMortgageAPRComparison(validInputs);
      const report = generateMortgageAPRComparisonAnalysis(validInputs, outputs);
      
      expect(report).toContain('| Option | Interest Rate | APR | Monthly Payment | Total Cost | Closing Costs | Recommendation |');
      expect(report).toContain('Bank A - 30 Year Fixed');
      expect(report).toContain('Bank B - 30 Year Fixed');
      expect(report).toContain('Credit Union - 30 Year Fixed');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero closing costs', () => {
      const zeroCostOptions = sampleMortgageOptions.map(option => ({
        ...option,
        closingCosts: 0,
        originationFee: 0,
        applicationFee: 0,
        appraisalFee: 0,
        titleInsurance: 0,
        escrowFees: 0,
        otherFees: 0,
        rateLockFee: 0,
        lenderCredits: 0
      }));
      
      const inputs = { ...validInputs, mortgageOptions: zeroCostOptions };
      const result = calculateMortgageAPRComparison(inputs);
      
      expect(result).toBeDefined();
      result.comparisonTable.forEach(option => {
        expect(option.totalFees).toBe(0);
      });
    });

    it('should handle high interest rates', () => {
      const highRateOptions = sampleMortgageOptions.map(option => ({
        ...option,
        interestRate: 15
      }));
      
      const inputs = { ...validInputs, mortgageOptions: highRateOptions };
      const result = calculateMortgageAPRComparison(inputs);
      
      expect(result).toBeDefined();
      result.comparisonTable.forEach(option => {
        expect(option.interestRate).toBe(15);
        expect(option.apr).toBeGreaterThanOrEqual(15);
      });
    });

    it('should handle short loan terms', () => {
      const inputs = { ...validInputs, loanTerm: 5 };
      const result = calculateMortgageAPRComparison(inputs);
      
      expect(result).toBeDefined();
      expect(result.comparisonTable).toHaveLength(3);
    });

    it('should handle large loan amounts', () => {
      const inputs = { ...validInputs, loanAmount: 1000000 };
      const result = calculateMortgageAPRComparison(inputs);
      
      expect(result).toBeDefined();
      result.comparisonTable.forEach(option => {
        expect(option.monthlyPayment).toBeGreaterThan(0);
        expect(option.totalCost).toBeGreaterThan(1000000);
      });
    });
  });
});