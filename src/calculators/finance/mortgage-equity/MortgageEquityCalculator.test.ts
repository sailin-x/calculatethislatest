import { describe, it, expect } from 'vitest';
import { calculateMortgageEquity, calculateEquityProjection, calculateRefinancingScenarios, generateEquityAnalysis } from './formulas';
import { validateMortgageEquityInputs, validateEquityReasonableness, validateRefinancingEligibility, validateEquityUtilization } from './validation';
import {
  quickValidateCurrentPropertyValue,
  quickValidateOriginalPurchasePrice,
  quickValidateOriginalDownPayment,
  quickValidateCurrentMortgageBalance,
  quickValidatePropertyImprovements,
  quickValidateMarketAppreciation,
  quickValidateInterestRate,
  quickValidateRemainingLoanTerm,
  quickValidateCreditScore,
  quickValidateDebtToIncomeRatio,
  quickValidateMonthlyPayment,
  quickValidatePropertyTaxes,
  quickValidateHomeInsurance,
  quickValidateHoaFees,
  quickValidateRentalIncome,
  quickValidateAllInputs
} from './quickValidation';
import { MortgageEquityInputs } from './formulas';

describe('Mortgage Equity Calculator', () => {
  describe('Core Equity Calculations', () => {
    it('should calculate basic equity correctly', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.totalEquity).toBe(220000);
      expect(result.equityPercentage).toBe(44);
      expect(result.equityGrowth).toBe(140000);
      expect(result.loanToValueRatio).toBe(56);
      expect(result.borrowableEquity).toBeGreaterThan(0);
      expect(result.monthlyEquityBuild).toBeGreaterThan(0);
      expect(result.recommendations).toBeTruthy();
    });

    it('should handle zero equity scenario', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 300000,
        originalPurchasePrice: 300000,
        originalDownPayment: 0,
        currentMortgageBalance: 300000
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.totalEquity).toBe(0);
      expect(result.equityPercentage).toBe(0);
      expect(result.equityGrowth).toBe(0);
      expect(result.loanToValueRatio).toBe(100);
      expect(result.borrowableEquity).toBe(0);
    });

    it('should handle negative equity scenario', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 250000,
        originalPurchasePrice: 300000,
        originalDownPayment: 60000,
        currentMortgageBalance: 280000
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.totalEquity).toBe(-30000);
      expect(result.equityPercentage).toBe(-12);
      expect(result.equityGrowth).toBe(-90000);
      expect(result.loanToValueRatio).toBe(112);
      expect(result.borrowableEquity).toBe(0);
    });

    it('should calculate equity with improvements and appreciation', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 550000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        propertyImprovements: 25000,
        marketAppreciation: 15
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.totalEquity).toBe(270000);
      expect(result.appreciationValue).toBe(125000);
      expect(result.breakdown.improvementValue).toBe(25000);
      expect(result.breakdown.paymentEquity).toBeGreaterThan(0);
    });

    it('should calculate time owned correctly', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        purchaseDate: '2020-01-15'
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.breakdown.timeOwned).toBeGreaterThan(0);
      expect(result.breakdown.equityGrowthRate).toBeGreaterThan(0);
    });

    it('should calculate monthly equity build correctly', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        interestRate: 6.5,
        remainingLoanTerm: 25,
        monthlyPayment: 1800
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.monthlyEquityBuild).toBeGreaterThan(0);
      expect(result.breakdown.annualEquityBuild).toBe(result.monthlyEquityBuild * 12);
    });
  });

  describe('Borrowable Equity Calculations', () => {
    it('should calculate borrowable equity for primary residence', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        occupancyType: 'Primary Residence',
        creditScore: 750,
        debtToIncomeRatio: 35
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.borrowableEquity).toBeGreaterThan(0);
      expect(result.borrowableEquity).toBeLessThan(result.totalEquity);
    });

    it('should calculate borrowable equity for investment property', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        occupancyType: 'Investment Property',
        creditScore: 720,
        debtToIncomeRatio: 40
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.borrowableEquity).toBeGreaterThan(0);
      expect(result.borrowableEquity).toBeLessThan(result.totalEquity * 0.8);
    });

    it('should adjust borrowable equity based on credit score', () => {
      const inputs1: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        occupancyType: 'Primary Residence',
        creditScore: 780,
        debtToIncomeRatio: 30
      };

      const inputs2: MortgageEquityInputs = {
        ...inputs1,
        creditScore: 600
      };

      const result1 = calculateMortgageEquity(inputs1);
      const result2 = calculateMortgageEquity(inputs2);

      expect(result1.borrowableEquity).toBeGreaterThan(result2.borrowableEquity);
    });

    it('should adjust borrowable equity based on DTI ratio', () => {
      const inputs1: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        occupancyType: 'Primary Residence',
        creditScore: 750,
        debtToIncomeRatio: 25
      };

      const inputs2: MortgageEquityInputs = {
        ...inputs1,
        debtToIncomeRatio: 45
      };

      const result1 = calculateMortgageEquity(inputs1);
      const result2 = calculateMortgageEquity(inputs2);

      expect(result1.borrowableEquity).toBeGreaterThan(result2.borrowableEquity);
    });
  });

  describe('Refinancing Options', () => {
    it('should identify cash-out refinance option', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        occupancyType: 'Primary Residence',
        creditScore: 750
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.refinancingOptions).toContain('Cash-out refinance');
      expect(result.refinancingOptions).toContain('HELOC');
    });

    it('should identify rate and term refinance option', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        occupancyType: 'Primary Residence',
        creditScore: 750
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.refinancingOptions).toContain('Rate and term refinance');
    });

    it('should identify investment property refinancing', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        occupancyType: 'Investment Property',
        creditScore: 720
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.refinancingOptions).toContain('Investment property refinancing');
    });

    it('should not identify refinancing options for low equity', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 300000,
        originalPurchasePrice: 300000,
        originalDownPayment: 60000,
        currentMortgageBalance: 270000,
        occupancyType: 'Primary Residence',
        creditScore: 750
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.refinancingOptions).not.toContain('Cash-out refinance');
      expect(result.refinancingOptions).not.toContain('HELOC');
    });
  });

  describe('Equity Projections', () => {
    it('should calculate 5-year equity projection', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        interestRate: 6.5,
        remainingLoanTerm: 25,
        monthlyPayment: 1800
      };

      const projection = calculateEquityProjection(inputs, 5);

      expect(projection).toHaveLength(5);
      expect(projection[0].year).toBe(1);
      expect(projection[4].year).toBe(5);
      expect(projection[4].projectedEquity).toBeGreaterThan(projection[0].projectedEquity);
      expect(projection[4].projectedLTV).toBeLessThan(projection[0].projectedLTV);
    });

    it('should handle zero equity in projection', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 300000,
        originalPurchasePrice: 300000,
        originalDownPayment: 0,
        currentMortgageBalance: 300000
      };

      const projection = calculateEquityProjection(inputs, 3);

      expect(projection).toHaveLength(3);
      expect(projection[0].projectedEquity).toBeGreaterThan(0); // Appreciation will create equity
    });
  });

  describe('Refinancing Scenarios', () => {
    it('should calculate refinancing scenario with payment savings', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        interestRate: 7.5,
        remainingLoanTerm: 25,
        monthlyPayment: 2000
      };

      const scenario = calculateRefinancingScenarios(inputs, 6.0, 30, 50000);

      expect(scenario.currentPayment).toBe(2000);
      expect(scenario.newPayment).toBeLessThan(scenario.currentPayment);
      expect(scenario.paymentSavings).toBeGreaterThan(0);
      expect(scenario.newBalance).toBe(330000);
      expect(scenario.breakEvenMonths).toBeGreaterThan(0);
      expect(scenario.totalSavings).toBeGreaterThan(0);
    });

    it('should calculate break-even analysis', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        interestRate: 7.0,
        remainingLoanTerm: 25,
        monthlyPayment: 1900
      };

      const scenario = calculateRefinancingScenarios(inputs, 6.5, 30, 0);

      expect(scenario.breakEvenMonths).toBeGreaterThan(0);
      expect(scenario.breakEvenMonths).toBeLessThan(60); // Should break even within 5 years
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const inputs = {} as MortgageEquityInputs;
      const errors = validateMortgageEquityInputs(inputs);

      expect(errors).toContain('Current property value is required');
      expect(errors).toContain('Original purchase price is required');
      expect(errors).toContain('Original down payment is required');
      expect(errors).toContain('Current mortgage balance is required');
    });

    it('should validate property value range', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 5000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000
      };
      const errors = validateMortgageEquityInputs(inputs);

      expect(errors).toContain('Current property value must be between $10,000 and $10,000,000');
    });

    it('should validate mortgage balance logic', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 300000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 350000
      };
      const errors = validateMortgageEquityInputs(inputs);

      expect(errors).toContain('Current mortgage balance cannot exceed current property value');
    });

    it('should validate down payment logic', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 450000,
        currentMortgageBalance: 280000
      };
      const errors = validateMortgageEquityInputs(inputs);

      expect(errors).toContain('Original down payment cannot be greater than or equal to original purchase price');
    });

    it('should validate occupancy type requirements', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        occupancyType: 'Investment Property',
        creditScore: 650
      };
      const errors = validateMortgageEquityInputs(inputs);

      expect(errors).toContain('Investment properties typically require higher credit scores');
    });

    it('should validate loan type requirements', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        loanType: 'FHA',
        occupancyType: 'Investment Property'
      };
      const errors = validateMortgageEquityInputs(inputs);

      expect(errors).toContain('FHA loans are only available for primary residences');
    });

    it('should validate equity reasonableness', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 1000000,
        originalPurchasePrice: 100000,
        originalDownPayment: 20000,
        currentMortgageBalance: 50000
      };
      const errors = validateEquityReasonableness(inputs);

      expect(errors).toContain('Property value increase seems unusually high - please verify current value');
    });

    it('should validate refinancing eligibility', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 300000,
        originalPurchasePrice: 300000,
        originalDownPayment: 60000,
        currentMortgageBalance: 270000,
        creditScore: 600,
        debtToIncomeRatio: 45
      };
      const errors = validateRefinancingEligibility(inputs);

      expect(errors).toContain('Insufficient equity for most refinancing options - need at least 20% equity');
      expect(errors).toContain('Low credit score - may not qualify for refinancing');
      expect(errors).toContain('High DTI ratio - may not qualify for refinancing');
    });
  });

  describe('Quick Validation', () => {
    it('should provide real-time validation feedback for current property value', () => {
      const result = quickValidateCurrentPropertyValue(5000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('at least $10,000');

      const result2 = quickValidateCurrentPropertyValue(6000000);
      expect(result2.isValid).toBe(true);
      expect(result2.severity).toBe('warning');
      expect(result2.message).toContain('High property value');
    });

    it('should provide real-time validation feedback for original down payment', () => {
      const result = quickValidateOriginalDownPayment(450000, 400000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('greater than or equal to original purchase price');

      const result2 = quickValidateOriginalDownPayment(60000, 400000);
      expect(result2.isValid).toBe(true);
      expect(result2.severity).toBe('warning');
      expect(result2.message).toContain('Low down payment');
    });

    it('should provide real-time validation feedback for current mortgage balance', () => {
      const result = quickValidateCurrentMortgageBalance(350000, 300000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('cannot exceed current property value');

      const result2 = quickValidateCurrentMortgageBalance(240000, 300000);
      expect(result2.isValid).toBe(true);
      expect(result2.severity).toBe('success');
      expect(result2.message).toContain('Good LTV ratio');
    });

    it('should provide real-time validation feedback for interest rate', () => {
      const result = quickValidateInterestRate(25);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('cannot exceed 20%');

      const result2 = quickValidateInterestRate(2.5);
      expect(result2.isValid).toBe(true);
      expect(result2.severity).toBe('success');
      expect(result2.message).toContain('Excellent interest rate');
    });

    it('should provide real-time validation feedback for credit score', () => {
      const result = quickValidateCreditScore(250);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('at least 300');

      const result2 = quickValidateCreditScore(750);
      expect(result2.isValid).toBe(true);
      expect(result2.severity).toBe('success');
      expect(result2.message).toContain('Very good credit score');
    });

    it('should provide real-time validation feedback for DTI ratio', () => {
      const result = quickValidateDebtToIncomeRatio(50);
      expect(result.isValid).toBe(true);
      expect(result.severity).toBe('warning');
      expect(result.message).toContain('High DTI ratio');

      const result2 = quickValidateDebtToIncomeRatio(25);
      expect(result2.isValid).toBe(true);
      expect(result2.severity).toBe('success');
      expect(result2.message).toContain('Excellent DTI ratio');
    });

    it('should validate all inputs at once', () => {
      const inputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        propertyImprovements: 25000,
        marketAppreciation: 15,
        interestRate: 6.5,
        remainingLoanTerm: 25,
        creditScore: 750,
        debtToIncomeRatio: 35,
        monthlyPayment: 1800,
        propertyTaxes: 6000,
        homeInsurance: 1200,
        hoaFees: 200,
        rentalIncome: 0
      };

      const results = quickValidateAllInputs(inputs);

      expect(results).toHaveLength(15);
      expect(results.every(r => r.isValid)).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum property values', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 10000000,
        originalPurchasePrice: 8000000,
        originalDownPayment: 1600000,
        currentMortgageBalance: 5600000
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.totalEquity).toBeGreaterThan(0);
      expect(result.equityPercentage).toBeGreaterThan(0);
      expect(result.equityPercentage).toBeLessThan(100);
    });

    it('should handle minimum property values', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 10000,
        originalPurchasePrice: 8000,
        originalDownPayment: 1600,
        currentMortgageBalance: 5600
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.totalEquity).toBeGreaterThan(0);
      expect(result.equityPercentage).toBeGreaterThan(0);
      expect(result.equityPercentage).toBeLessThan(100);
    });

    it('should handle zero down payment', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 0,
        currentMortgageBalance: 280000
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.totalEquity).toBe(220000);
      expect(result.equityGrowth).toBe(220000);
      expect(result.breakdown.summary.initialEquity).toBe(0);
    });

    it('should handle zero mortgage balance', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 0
      };

      const result = calculateMortgageEquity(inputs);

      expect(result.totalEquity).toBe(500000);
      expect(result.equityPercentage).toBe(100);
      expect(result.loanToValueRatio).toBe(0);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete primary residence scenario', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        purchaseDate: '2020-01-15',
        propertyImprovements: 25000,
        marketAppreciation: 15,
        propertyTaxes: 6000,
        homeInsurance: 1200,
        hoaFees: 200,
        maintenanceCosts: 3000,
        occupancyType: 'Primary Residence',
        creditScore: 750,
        debtToIncomeRatio: 35,
        loanType: 'Conventional',
        interestRate: 6.5,
        remainingLoanTerm: 25,
        monthlyPayment: 1800,
        propertyType: 'Single Family Home',
        state: 'CA'
      };

      const result = calculateMortgageEquity(inputs);
      const errors = validateMortgageEquityInputs(inputs);

      expect(result.totalEquity).toBe(220000);
      expect(result.equityPercentage).toBe(44);
      expect(result.equityGrowth).toBe(140000);
      expect(result.loanToValueRatio).toBe(56);
      expect(result.borrowableEquity).toBeGreaterThan(0);
      expect(result.monthlyEquityBuild).toBeGreaterThan(0);
      expect(result.recommendations).toBeTruthy();
      expect(result.refinancingOptions).toContain('Cash-out refinance');
      expect(errors).toHaveLength(0);
    });

    it('should handle complete investment property scenario', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 450000,
        originalPurchasePrice: 350000,
        originalDownPayment: 70000,
        currentMortgageBalance: 250000,
        purchaseDate: '2018-06-01',
        propertyImprovements: 15000,
        marketAppreciation: 20,
        propertyTaxes: 4500,
        homeInsurance: 900,
        hoaFees: 150,
        maintenanceCosts: 4000,
        rentalIncome: 24000,
        occupancyType: 'Investment Property',
        creditScore: 720,
        debtToIncomeRatio: 40,
        loanType: 'Conventional',
        interestRate: 7.0,
        remainingLoanTerm: 28,
        monthlyPayment: 1600,
        propertyType: 'Single Family Home',
        state: 'TX'
      };

      const result = calculateMortgageEquity(inputs);
      const errors = validateMortgageEquityInputs(inputs);

      expect(result.totalEquity).toBe(200000);
      expect(result.equityPercentage).toBe(44.4);
      expect(result.equityGrowth).toBe(130000);
      expect(result.loanToValueRatio).toBe(55.6);
      expect(result.borrowableEquity).toBeGreaterThan(0);
      expect(result.monthlyEquityBuild).toBeGreaterThan(0);
      expect(result.recommendations).toBeTruthy();
      expect(result.refinancingOptions).toContain('Investment property refinancing');
      expect(errors).toHaveLength(0);
    });

    it('should handle new purchase scenario', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 425000,
        originalPurchasePrice: 425000,
        originalDownPayment: 85000,
        currentMortgageBalance: 340000,
        purchaseDate: '2023-12-01',
        propertyImprovements: 0,
        marketAppreciation: 5,
        propertyTaxes: 5100,
        homeInsurance: 1020,
        hoaFees: 0,
        maintenanceCosts: 2000,
        occupancyType: 'Primary Residence',
        creditScore: 780,
        debtToIncomeRatio: 30,
        loanType: 'Conventional',
        interestRate: 7.5,
        remainingLoanTerm: 30,
        monthlyPayment: 2375,
        propertyType: 'Single Family Home',
        state: 'FL'
      };

      const result = calculateMortgageEquity(inputs);
      const errors = validateMortgageEquityInputs(inputs);

      expect(result.totalEquity).toBe(85000);
      expect(result.equityPercentage).toBe(20);
      expect(result.equityGrowth).toBe(21250);
      expect(result.loanToValueRatio).toBe(80);
      expect(result.borrowableEquity).toBeGreaterThan(0);
      expect(result.monthlyEquityBuild).toBeGreaterThan(0);
      expect(result.recommendations).toBeTruthy();
      expect(errors).toHaveLength(0);
    });
  });

  describe('Analysis Generation', () => {
    it('should generate comprehensive equity analysis', () => {
      const inputs: MortgageEquityInputs = {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        propertyImprovements: 25000,
        marketAppreciation: 15
      };

      const outputs = calculateMortgageEquity(inputs);
      const analysis = generateEquityAnalysis(inputs, outputs);

      expect(analysis).toContain('Mortgage Equity Analysis');
      expect(analysis).toContain('Summary');
      expect(analysis).toContain('Equity Breakdown');
      expect(analysis).toContain('Refinancing Options');
      expect(analysis).toContain('Recommendations');
      expect(analysis).toContain(outputs.totalEquity.toString());
      expect(analysis).toContain(outputs.equityPercentage.toString());
    });
  });
});