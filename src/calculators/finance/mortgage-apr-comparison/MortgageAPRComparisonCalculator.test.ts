import { describe, it, expect } from 'vitest';
import { calculateMortgageAPRComparison } from './formulas';
import { generateMortgageAPRComparisonAnalysis } from './formulas';
import { validateAllMortgageAPRComparisonInputs } from './quickValidation';

describe('Mortgage APR Comparison Calculator', () => {
  const baseInputs = {
    loanAmount: 300000,
    loanTerm: 30,
    interestRate1: 6.5,
    interestRate2: 6.25,
    interestRate3: 6.75,
    originationFee1: 1500,
    originationFee2: 2000,
    originationFee3: 1000,
    discountPoints1: 0,
    discountPoints2: 1,
    discountPoints3: 0.5,
    appraisalFee1: 500,
    appraisalFee2: 450,
    appraisalFee3: 550,
    titleInsurance1: 1200,
    titleInsurance2: 1100,
    titleInsurance3: 1300,
    escrowFees1: 800,
    escrowFees2: 750,
    escrowFees3: 850,
    creditReportFee1: 50,
    creditReportFee2: 45,
    creditReportFee3: 55,
    processingFee1: 300,
    processingFee2: 250,
    processingFee3: 350,
    underwritingFee1: 400,
    underwritingFee2: 350,
    underwritingFee3: 450,
    documentPreparationFee1: 200,
    documentPreparationFee2: 180,
    documentPreparationFee3: 220,
    floodCertificationFee1: 20,
    floodCertificationFee2: 18,
    floodCertificationFee3: 22,
    taxServiceFee1: 75,
    taxServiceFee2: 70,
    taxServiceFee3: 80,
    prepaidInterest1: 500,
    prepaidInterest2: 480,
    prepaidInterest3: 520,
    prepaidInsurance1: 600,
    prepaidInsurance2: 580,
    prepaidInsurance3: 620,
    prepaidTaxes1: 1200,
    prepaidTaxes2: 1150,
    prepaidTaxes3: 1250,
    lenderCredits1: 0,
    lenderCredits2: -500,
    lenderCredits3: 200
  };

  describe('Basic APR Calculation', () => {
    it('should calculate APR for all three offers', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.apr1).toBeGreaterThan(0);
      expect(outputs.apr2).toBeGreaterThan(0);
      expect(outputs.apr3).toBeGreaterThan(0);
      expect(outputs.apr1).toBeGreaterThan(baseInputs.interestRate1);
      expect(outputs.apr2).toBeGreaterThan(baseInputs.interestRate2);
      expect(outputs.apr3).toBeGreaterThan(baseInputs.interestRate3);
    });

    it('should calculate monthly payments correctly', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.monthlyPayment1).toBeGreaterThan(0);
      expect(outputs.monthlyPayment2).toBeGreaterThan(0);
      expect(outputs.monthlyPayment3).toBeGreaterThan(0);
      expect(outputs.monthlyPayment1).toBeCloseTo(1896, 0);
      expect(outputs.monthlyPayment2).toBeCloseTo(1847, 0);
      expect(outputs.monthlyPayment3).toBeCloseTo(1945, 0);
    });

    it('should calculate total costs correctly', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.totalCost1).toBeGreaterThan(baseInputs.loanAmount);
      expect(outputs.totalCost2).toBeGreaterThan(baseInputs.loanAmount);
      expect(outputs.totalCost3).toBeGreaterThan(baseInputs.loanAmount);
    });
  });

  describe('Closing Costs Analysis', () => {
    it('should calculate closing costs for all offers', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.closingCosts1).toBeGreaterThan(0);
      expect(outputs.closingCosts2).toBeGreaterThan(0);
      expect(outputs.closingCosts3).toBeGreaterThan(0);
    });

    it('should include all fee types in closing costs', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      // Closing costs should include all fees minus lender credits
      const expectedClosingCosts1 = baseInputs.originationFee1 + 
                                   (baseInputs.discountPoints1 / 100) * baseInputs.loanAmount +
                                   baseInputs.appraisalFee1 + baseInputs.titleInsurance1 +
                                   baseInputs.escrowFees1 + baseInputs.creditReportFee1 +
                                   baseInputs.processingFee1 + baseInputs.underwritingFee1 +
                                   baseInputs.documentPreparationFee1 + baseInputs.floodCertificationFee1 +
                                   baseInputs.taxServiceFee1 + baseInputs.prepaidInterest1 +
                                   baseInputs.prepaidInsurance1 + baseInputs.prepaidTaxes1 -
                                   baseInputs.lenderCredits1;

      expect(outputs.closingCosts1).toBeCloseTo(expectedClosingCosts1, 0);
    });
  });

  describe('Total Interest Calculation', () => {
    it('should calculate total interest for all offers', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.totalInterest1).toBeGreaterThan(0);
      expect(outputs.totalInterest2).toBeGreaterThan(0);
      expect(outputs.totalInterest3).toBeGreaterThan(0);
    });

    it('should show higher interest for higher rates', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.totalInterest3).toBeGreaterThan(outputs.totalInterest1);
      expect(outputs.totalInterest1).toBeGreaterThan(outputs.totalInterest2);
    });
  });

  describe('Cost Comparison Analysis', () => {
    it('should generate cost comparison analysis', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.costComparison).toContain('Lowest Total Cost');
      expect(outputs.costComparison).toContain('Highest Total Cost');
      expect(outputs.costComparison).toContain('Savings Opportunity');
    });

    it('should identify the best offer based on APR', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.bestOffer).toContain('Best Offer Recommendation');
      expect(outputs.bestOffer).toContain('APR');
      expect(outputs.bestOffer).toContain('Advantage');
    });
  });

  describe('Savings Analysis', () => {
    it('should calculate monthly savings between offers', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.monthlySavings).toContain('Lowest Payment');
      expect(outputs.monthlySavings).toContain('Highest Payment');
      expect(outputs.monthlySavings).toContain('Monthly Difference');
      expect(outputs.monthlySavings).toContain('Annual Savings');
    });

    it('should calculate total savings between offers', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.totalSavings).toContain('Lowest Total Cost');
      expect(outputs.totalSavings).toContain('Highest Total Cost');
      expect(outputs.totalSavings).toContain('Total Savings');
      expect(outputs.totalSavings).toContain('Percentage Savings');
    });
  });

  describe('Break-Even Analysis', () => {
    it('should generate break-even analysis', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.breakEvenAnalysis).toContain('Break-Even Analysis');
      expect(outputs.breakEvenAnalysis).toContain('vs');
      expect(outputs.breakEvenAnalysis).toContain('months');
    });
  });

  describe('Fee Breakdown Analysis', () => {
    it('should generate fee breakdowns for all offers', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.feeBreakdown1).toContain('Offer 1 Fee Breakdown');
      expect(outputs.feeBreakdown2).toContain('Offer 2 Fee Breakdown');
      expect(outputs.feeBreakdown3).toContain('Offer 3 Fee Breakdown');
    });

    it('should include all fee types in breakdowns', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.feeBreakdown1).toContain('Origination Fee');
      expect(outputs.feeBreakdown1).toContain('Discount Points');
      expect(outputs.feeBreakdown1).toContain('Appraisal Fee');
      expect(outputs.feeBreakdown1).toContain('Title Insurance');
      expect(outputs.feeBreakdown1).toContain('Total Closing Costs');
    });
  });

  describe('APR Difference Analysis', () => {
    it('should calculate APR differences between offers', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.aprDifference).toContain('APR Comparison');
      expect(outputs.aprDifference).toContain('Lowest APR');
      expect(outputs.aprDifference).toContain('Highest APR');
      expect(outputs.aprDifference).toContain('APR Difference');
    });
  });

  describe('Recommendation Analysis', () => {
    it('should generate comprehensive recommendations', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.recommendation).toContain('Mortgage Offer Recommendation');
      expect(outputs.recommendation).toContain('Key Factors to Consider');
    });

    it('should consider both APR and total cost', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.recommendation).toContain('Best APR');
      expect(outputs.recommendation).toContain('Lowest Total Cost');
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);
      const report = generateMortgageAPRComparisonAnalysis(baseInputs, outputs);

      expect(report).toContain('Mortgage APR Comparison Analysis Report');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Key Metrics');
      expect(report).toContain('APR Comparison');
      expect(report).toContain('Monthly Payments');
      expect(report).toContain('Total Costs');
      expect(report).toContain('Detailed Analysis');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Important Considerations');
      expect(report).toContain('Conclusion');
    });

    it('should include key metrics in report', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);
      const report = generateMortgageAPRComparisonAnalysis(baseInputs, outputs);

      expect(report).toContain(outputs.apr1.toFixed(4));
      expect(report).toContain(outputs.apr2.toFixed(4));
      expect(report).toContain(outputs.apr3.toFixed(4));
      expect(report).toContain(outputs.monthlyPayment1.toLocaleString());
      expect(report).toContain(outputs.monthlyPayment2.toLocaleString());
      expect(report).toContain(outputs.monthlyPayment3.toLocaleString());
    });
  });

  describe('Validation', () => {
    it('should validate all inputs correctly', () => {
      const validationResult = validateAllMortgageAPRComparisonInputs(baseInputs);
      expect(validationResult.isValid).toBe(true);
    });

    it('should reject invalid loan amount', () => {
      const invalidInputs = { ...baseInputs, loanAmount: 5000 };
      const validationResult = validateAllMortgageAPRComparisonInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('Loan amount');
    });

    it('should reject invalid interest rates', () => {
      const invalidInputs = { ...baseInputs, interestRate1: 25 };
      const validationResult = validateAllMortgageAPRComparisonInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('Interest rate');
    });

    it('should reject negative fees', () => {
      const invalidInputs = { ...baseInputs, originationFee1: -100 };
      const validationResult = validateAllMortgageAPRComparisonInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('Origination fee');
    });

    it('should reject excessive discount points', () => {
      const invalidInputs = { ...baseInputs, discountPoints1: 15 };
      const validationResult = validateAllMortgageAPRComparisonInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('Discount points');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero fees', () => {
      const inputs = { ...baseInputs };
      // Set all fees to zero
      Object.keys(inputs).forEach(key => {
        if (key.includes('Fee') || key.includes('Insurance') || key.includes('Taxes') || key.includes('Interest')) {
          inputs[key] = 0;
        }
      });
      
      const outputs = calculateMortgageAPRComparison(inputs);
      expect(outputs.apr1).toBeCloseTo(baseInputs.interestRate1, 2);
      expect(outputs.apr2).toBeCloseTo(baseInputs.interestRate2, 2);
      expect(outputs.apr3).toBeCloseTo(baseInputs.interestRate3, 2);
    });

    it('should handle lender credits', () => {
      const inputs = { ...baseInputs, lenderCredits1: 5000, lenderCredits2: 3000, lenderCredits3: 1000 };
      const outputs = calculateMortgageAPRComparison(inputs);

      expect(outputs.closingCosts1).toBeLessThan(outputs.closingCosts2);
      expect(outputs.closingCosts2).toBeLessThan(outputs.closingCosts3);
    });

    it('should handle different loan terms', () => {
      const inputs = { ...baseInputs, loanTerm: 15 };
      const outputs = calculateMortgageAPRComparison(inputs);

      expect(outputs.monthlyPayment1).toBeGreaterThan(baseInputs.loanAmount / (15 * 12));
      expect(outputs.totalInterest1).toBeLessThan(outputs.totalInterest1);
    });

    it('should handle very high interest rates', () => {
      const inputs = { ...baseInputs, interestRate1: 15, interestRate2: 12, interestRate3: 18 };
      const outputs = calculateMortgageAPRComparison(inputs);

      expect(outputs.apr1).toBeGreaterThan(15);
      expect(outputs.apr2).toBeGreaterThan(12);
      expect(outputs.apr3).toBeGreaterThan(18);
    });
  });

  describe('APR Accuracy', () => {
    it('should calculate APR higher than interest rate due to fees', () => {
      const outputs = calculateMortgageAPRComparison(baseInputs);

      expect(outputs.apr1).toBeGreaterThan(baseInputs.interestRate1);
      expect(outputs.apr2).toBeGreaterThan(baseInputs.interestRate2);
      expect(outputs.apr3).toBeGreaterThan(baseInputs.interestRate3);
    });

    it('should reflect fee impact on APR', () => {
      const lowFeeInputs = { ...baseInputs, originationFee1: 500, originationFee2: 1000, originationFee3: 1500 };
      const highFeeInputs = { ...baseInputs, originationFee1: 3000, originationFee2: 4000, originationFee3: 5000 };
      
      const lowFeeOutputs = calculateMortgageAPRComparison(lowFeeInputs);
      const highFeeOutputs = calculateMortgageAPRComparison(highFeeInputs);

      expect(highFeeOutputs.apr1).toBeGreaterThan(lowFeeOutputs.apr1);
      expect(highFeeOutputs.apr2).toBeGreaterThan(lowFeeOutputs.apr2);
      expect(highFeeOutputs.apr3).toBeGreaterThan(lowFeeOutputs.apr3);
    });
  });
});
