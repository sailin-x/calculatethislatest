import { describe, it, expect } from 'vitest';
import { mortgageClosingCostCalculator } from './MortgageClosingCostCalculator';
import { calculateMortgageClosingCosts, generateClosingCostAnalysis } from './formulas';
import { validateMortgageClosingCostInputs } from './validation';
import { MortgageClosingCostInputs } from './types';

describe('Mortgage Closing Cost Calculator', () => {
  const validInputs: MortgageClosingCostInputs = {
    purchasePrice: 300000,
    loanAmount: 240000,
    downPayment: 60000,
    propertyType: 'single-family',
    propertyLocation: 'Suburban',
    loanType: 'conventional',
    lenderFees: {
      originationFee: 2400,
      underwritingFee: 500,
      processingFee: 300,
      applicationFee: 100,
      creditReportFee: 50,
      floodCertificationFee: 20,
      taxServiceFee: 75,
      otherLenderFees: 200
    },
    thirdPartyFees: {
      appraisalFee: 500,
      inspectionFee: 400,
      surveyFee: 300,
      pestInspectionFee: 100,
      titleSearchFee: 200,
      titleInsuranceFee: 1200,
      attorneyFee: 500,
      recordingFee: 150,
      transferTax: 3000,
      otherThirdPartyFees: 100
    },
    prepaidItems: {
      propertyTaxes: 3000,
      homeownersInsurance: 1200,
      privateMortgageInsurance: 0,
      prepaidInterest: 800,
      escrowDeposit: 2000,
      otherPrepaidItems: 200
    },
    sellerConcessions: 5000,
    earnestMoney: 10000,
    rateLockFee: 0,
    points: 0,
    discountPoints: 0,
    creditScore: 750,
    debtToIncomeRatio: 35
  };

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(mortgageClosingCostCalculator.id).toBe('mortgage-closing-cost');
      expect(mortgageClosingCostCalculator.name).toBe('Mortgage Closing Cost Calculator');
      expect(mortgageClosingCostCalculator.category).toBe('finance');
      expect(mortgageClosingCostCalculator.tags).toContain('mortgage');
      expect(mortgageClosingCostCalculator.tags).toContain('closing-costs');
    });

    it('should have all required input fields', () => {
      const inputs = mortgageClosingCostCalculator.inputs;
      expect(inputs.purchasePrice).toBeDefined();
      expect(inputs.loanAmount).toBeDefined();
      expect(inputs.downPayment).toBeDefined();
      expect(inputs.propertyType).toBeDefined();
      expect(inputs.loanType).toBeDefined();
      expect(inputs.lenderFees).toBeDefined();
      expect(inputs.thirdPartyFees).toBeDefined();
      expect(inputs.prepaidItems).toBeDefined();
    });

    it('should have all required output fields', () => {
      const outputs = mortgageClosingCostCalculator.outputs;
      expect(outputs.totalLenderFees).toBeDefined();
      expect(outputs.totalThirdPartyFees).toBeDefined();
      expect(outputs.totalPrepaidItems).toBeDefined();
      expect(outputs.totalClosingCosts).toBeDefined();
      expect(outputs.cashToClose).toBeDefined();
      expect(outputs.closingCostPercentage).toBeDefined();
      expect(outputs.breakEvenMonths).toBeDefined();
      expect(outputs.analysis).toBeDefined();
    });
  });

  describe('Formulas', () => {
    it('should calculate closing costs correctly', () => {
      const metrics = calculateMortgageClosingCosts(validInputs);
      
      // Basic calculations
      expect(metrics.totalLenderFees).toBe(3645); // Sum of all lender fees
      expect(metrics.totalThirdPartyFees).toBe(6450); // Sum of all third party fees
      expect(metrics.totalPrepaidItems).toBe(7200); // Sum of all prepaid items
      expect(metrics.totalClosingCosts).toBe(17295); // Total of all fees
      
      // Cash to close calculation
      expect(metrics.cashToClose).toBe(12295); // Total closing costs - seller concessions - earnest money
      
      // Percentage calculations
      expect(metrics.closingCostPercentage).toBeCloseTo(5.77, 2); // (17295 / 300000) * 100
      
      // Break-even analysis
      expect(metrics.breakEvenMonths).toBeDefined();
      expect(metrics.monthlySavings).toBeDefined();
      expect(metrics.annualSavings).toBeDefined();
    });

    it('should handle different loan types', () => {
      const fhaInputs = { ...validInputs, loanType: 'fha' };
      const metrics = calculateMortgageClosingCosts(fhaInputs);
      
      expect(metrics.totalClosingCosts).toBeGreaterThan(validInputs.lenderFees.originationFee);
    });

    it('should generate closing cost analysis', () => {
      const metrics = calculateMortgageClosingCosts(validInputs);
      const analysis = generateClosingCostAnalysis(validInputs, metrics);
      
      expect(analysis).toContain('Mortgage Closing Cost Analysis');
      expect(analysis).toContain('$30,000');
      expect(analysis).toContain('RECOMMENDATIONS');
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateMortgageClosingCostInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid purchase price', () => {
      const invalidInputs = { ...validInputs, purchasePrice: 0 };
      const validation = validateMortgageClosingCostInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Purchase price must be greater than 0');
    });

    it('should reject invalid loan amount', () => {
      const invalidInputs = { ...validInputs, loanAmount: 0 };
      const validation = validateMortgageClosingCostInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Loan amount must be greater than 0');
    });

    it('should reject loan amount exceeding purchase price', () => {
      const invalidInputs = { ...validInputs, loanAmount: 350000 };
      const validation = validateMortgageClosingCostInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Loan amount cannot exceed purchase price');
    });

    it('should reject invalid down payment', () => {
      const invalidInputs = { ...validInputs, downPayment: -1000 };
      const validation = validateMortgageClosingCostInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Down payment cannot be negative');
    });

    it('should reject financing not equaling purchase price', () => {
      const invalidInputs = { ...validInputs, downPayment: 50000 };
      const validation = validateMortgageClosingCostInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Down payment plus loan amount must equal purchase price');
    });
  });

  describe('Calculator Integration', () => {
    it('should calculate results with valid inputs', () => {
      const results = mortgageClosingCostCalculator.calculate(validInputs);
      
      expect(results.totalLenderFees).toBe(3645);
      expect(results.totalThirdPartyFees).toBe(6450);
      expect(results.totalPrepaidItems).toBe(7200);
      expect(results.totalClosingCosts).toBe(17295);
      expect(results.cashToClose).toBe(12295);
      expect(results.closingCostPercentage).toBeDefined();
      expect(results.breakEvenMonths).toBeDefined();
      expect(results.analysis).toBeDefined();
    });

    it('should throw error with invalid inputs', () => {
      const invalidInputs = { ...validInputs, purchasePrice: 0 };
      
      expect(() => {
        mortgageClosingCostCalculator.calculate(invalidInputs);
      }).toThrow('Invalid inputs');
    });
  });

  describe('Business Logic', () => {
    it('should calculate closing cost percentage correctly', () => {
      const results = mortgageClosingCostCalculator.calculate(validInputs);
      
      const expectedPercentage = (results.totalClosingCosts / validInputs.purchasePrice) * 100;
      expect(results.closingCostPercentage).toBeCloseTo(expectedPercentage, 2);
    });

    it('should calculate cash to close correctly', () => {
      const results = mortgageClosingCostCalculator.calculate(validInputs);
      
      const expectedCashToClose = results.totalClosingCosts - validInputs.sellerConcessions - validInputs.earnestMoney;
      expect(results.cashToClose).toBe(expectedCashToClose);
    });

    it('should provide meaningful cost grades', () => {
      const results = mortgageClosingCostCalculator.calculate(validInputs);
      
      const validGrades = ['Excellent', 'Good', 'Average', 'High', 'Very High'];
      expect(validGrades).toContain(results.analysis.costGrade);
    });
  });
});
