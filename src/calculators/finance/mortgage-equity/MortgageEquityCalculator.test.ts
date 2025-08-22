import { describe, it, expect } from 'vitest';
import { calculateMortgageEquity } from './formulas';
import { validateAllMortgageEquityInputs } from './quickValidation';

describe('Mortgage Equity Calculator', () => {
  const mockInputs = {
    homeValue: 500000,
    originalPurchasePrice: 400000,
    purchaseDate: '2020-01-15',
    originalLoanAmount: 320000,
    currentLoanBalance: 280000,
    interestRate: 4.5,
    loanTerm: 30,
    monthlyPayment: 1620,
    propertyTaxRate: 1.2,
    homeownersInsuranceAnnual: 1200,
    homeImprovements: 25000,
    marketAppreciationRate: 3.5,
    closingCosts: 12000,
    downPayment: 80000,
    pmiMonthly: 0,
    helocBalance: 0,
    secondMortgageBalance: 0,
    otherLiens: 0,
    rentalIncome: 0,
    rentalExpenses: 0,
    refinanceHistory: 'none',
    refinanceCosts: 0,
    propertyType: 'single-family',
    locationType: 'suburban',
    propertyAge: 15,
    squareFootage: 2000,
    bedrooms: 3,
    bathrooms: 2
  };

  describe('calculateMortgageEquity', () => {
    it('should calculate current equity correctly', () => {
      const result = calculateMortgageEquity(mockInputs);
      
      expect(result.currentEquity).toBe(220000); // 500000 - 280000
      expect(result.equityPercentage).toBe(44); // (220000 / 500000) * 100
      expect(result.loanToValueRatio).toBe(56); // (280000 / 500000) * 100
    });

    it('should calculate equity growth correctly', () => {
      const result = calculateMortgageEquity(mockInputs);
      
      expect(result.equityGrowth).toBe(140000); // 220000 - 80000
      expect(result.equityGrowthPercentage).toBe(175); // (140000 / 80000) * 100
    });

    it('should calculate investment metrics correctly', () => {
      const result = calculateMortgageEquity(mockInputs);
      
      expect(result.totalInvestment).toBe(117000); // 80000 + 12000 + 25000 + 0
      expect(result.returnOnInvestment).toBeCloseTo(88.03, 1); // ((220000 - 117000) / 117000) * 100
    });

    it('should calculate borrowing capacity correctly', () => {
      const result = calculateMortgageEquity(mockInputs);
      
      expect(result.borrowingCapacity).toBe(176000); // 220000 * 0.8
    });

    it('should handle additional debt correctly', () => {
      const inputsWithDebt = {
        ...mockInputs,
        helocBalance: 50000,
        secondMortgageBalance: 25000
      };
      
      const result = calculateMortgageEquity(inputsWithDebt);
      
      expect(result.totalDebt).toBe(355000); // 280000 + 50000 + 25000
      expect(result.currentEquity).toBe(145000); // 500000 - 355000
      expect(result.loanToValueRatio).toBe(71); // (355000 / 500000) * 100
    });

    it('should calculate principal paid correctly', () => {
      const result = calculateMortgageEquity(mockInputs);
      
      expect(result.principalPaid).toBe(40000); // 320000 - 280000
    });

    it('should calculate appreciation gain correctly', () => {
      const result = calculateMortgageEquity(mockInputs);
      
      expect(result.appreciationGain).toBe(100000); // 500000 - 400000
    });
  });

  describe('validation', () => {
    it('should validate all inputs correctly', () => {
      const validationResults = validateAllMortgageEquityInputs(mockInputs);
      
      expect(validationResults.every(result => result.isValid)).toBe(true);
    });

    it('should reject invalid home value', () => {
      const invalidInputs = { ...mockInputs, homeValue: -1000 };
      const validationResults = validateAllMortgageEquityInputs(invalidInputs);
      
      const homeValueValidation = validationResults.find(result => 
        result.message?.includes('Home value')
      );
      expect(homeValueValidation?.isValid).toBe(false);
    });

    it('should reject invalid purchase date', () => {
      const invalidInputs = { ...mockInputs, purchaseDate: '2025-01-15' };
      const validationResults = validateAllMortgageEquityInputs(invalidInputs);
      
      const purchaseDateValidation = validationResults.find(result => 
        result.message?.includes('Purchase date')
      );
      expect(purchaseDateValidation?.isValid).toBe(false);
    });

    it('should reject invalid interest rate', () => {
      const invalidInputs = { ...mockInputs, interestRate: 25 };
      const validationResults = validateAllMortgageEquityInputs(invalidInputs);
      
      const interestRateValidation = validationResults.find(result => 
        result.message?.includes('Interest rate')
      );
      expect(interestRateValidation?.isValid).toBe(false);
    });

    it('should reject invalid property type', () => {
      const invalidInputs = { ...mockInputs, propertyType: 'invalid' };
      const validationResults = validateAllMortgageEquityInputs(invalidInputs);
      
      const propertyTypeValidation = validationResults.find(result => 
        result.message?.includes('Property type')
      );
      expect(propertyTypeValidation?.isValid).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle zero equity scenario', () => {
      const zeroEquityInputs = {
        ...mockInputs,
        homeValue: 280000,
        currentLoanBalance: 280000
      };
      
      const result = calculateMortgageEquity(zeroEquityInputs);
      
      expect(result.currentEquity).toBe(0);
      expect(result.equityPercentage).toBe(0);
      expect(result.loanToValueRatio).toBe(100);
    });

    it('should handle negative equity scenario', () => {
      const negativeEquityInputs = {
        ...mockInputs,
        homeValue: 250000,
        currentLoanBalance: 280000
      };
      
      const result = calculateMortgageEquity(negativeEquityInputs);
      
      expect(result.currentEquity).toBe(-30000);
      expect(result.equityPercentage).toBe(-12);
      expect(result.loanToValueRatio).toBe(112);
    });

    it('should handle high equity scenario', () => {
      const highEquityInputs = {
        ...mockInputs,
        homeValue: 800000,
        currentLoanBalance: 100000
      };
      
      const result = calculateMortgageEquity(highEquityInputs);
      
      expect(result.currentEquity).toBe(700000);
      expect(result.equityPercentage).toBe(87.5);
      expect(result.loanToValueRatio).toBe(12.5);
    });

    it('should handle rental property scenario', () => {
      const rentalInputs = {
        ...mockInputs,
        rentalIncome: 2500,
        rentalExpenses: 800,
        propertyType: 'investment'
      };
      
      const result = calculateMortgageEquity(rentalInputs);
      
      expect(result.currentEquity).toBe(220000);
      expect(result.borrowingCapacity).toBe(176000);
    });
  });

  describe('analysis outputs', () => {
    it('should generate equity breakdown', () => {
      const result = calculateMortgageEquity(mockInputs);
      
      expect(result.equityBreakdown).toContain('Down Payment');
      expect(result.equityBreakdown).toContain('Principal Paid');
      expect(result.equityBreakdown).toContain('Market Appreciation');
      expect(result.equityBreakdown).toContain('Home Improvements');
    });

    it('should generate HELOC analysis', () => {
      const result = calculateMortgageEquity(mockInputs);
      
      expect(result.helocEligibility).toContain('HELOC Eligibility Analysis');
      expect(result.helocEligibility).toContain('Maximum HELOC Amount');
      expect(result.helocEligibility).toContain('Estimated Interest Rate');
    });

    it('should generate cash-out refinance analysis', () => {
      const result = calculateMortgageEquity(mockInputs);
      
      expect(result.cashOutRefinance).toContain('Cash-Out Refinance Options');
      expect(result.cashOutRefinance).toContain('Maximum Cash-Out');
      expect(result.cashOutRefinance).toContain('New LTV Ratio');
    });

    it('should generate investment analysis', () => {
      const result = calculateMortgageEquity(mockInputs);
      
      expect(result.investmentAnalysis).toContain('Investment Performance');
      expect(result.investmentAnalysis).toContain('Total ROI');
      expect(result.investmentAnalysis).toContain('Annualized Return');
    });

    it('should generate recommendations', () => {
      const result = calculateMortgageEquity(mockInputs);
      
      expect(result.recommendations).toContain('Recommendations');
      expect(result.recommendations).toContain('Next Steps');
    });

    it('should generate risk assessment', () => {
      const result = calculateMortgageEquity(mockInputs);
      
      expect(result.riskAssessment).toContain('Risk Assessment');
      expect(result.riskAssessment).toContain('Current LTV');
      expect(result.riskAssessment).toContain('Risk Factors');
    });
  });
});
