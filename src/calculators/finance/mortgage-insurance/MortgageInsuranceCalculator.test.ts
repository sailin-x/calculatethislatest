import { describe, it, expect } from 'vitest';
import { calculateMortgageInsurance } from './formulas';
import { validateAllMortgageInsuranceInputs } from './quickValidation';

describe('Mortgage Insurance Calculator', () => {
  const mockInputs = {
    homeValue: 400000,
    loanAmount: 360000,
    currentLoanBalance: 340000,
    downPayment: 40000,
    creditScore: 720,
    loanType: 'conventional',
    loanTerm: 30,
    interestRate: 6.5,
    monthlyPayment: 2275,
    purchaseDate: '2023-01-15',
    propertyType: 'single-family',
    occupancyType: 'primary',
    propertyTaxRate: 1.2,
    homeownersInsuranceAnnual: 1200,
    monthlyPrincipalPayment: 450,
    additionalPrincipalPayments: 0,
    homeImprovements: 0,
    marketAppreciationRate: 3.5,
    refinanceHistory: 'none',
    paymentHistory: 'perfect',
    bankruptcyHistory: 'none',
    foreclosureHistory: 'none',
    debtToIncomeRatio: 35,
    annualIncome: 80000,
    otherMonthlyDebts: 800,
    state: 'CA',
    county: 'urban'
  };

  describe('calculateMortgageInsurance', () => {
    it('should calculate LTV ratios correctly', () => {
      const result = calculateMortgageInsurance(mockInputs);
      
      expect(result.originalLTV).toBe(90); // (360000 / 400000) * 100
      expect(result.loanToValueRatio).toBe(85); // (340000 / 400000) * 100
    });

    it('should calculate PMI rate and costs correctly', () => {
      const result = calculateMortgageInsurance(mockInputs);
      
      expect(result.pmiRate).toBeGreaterThan(0);
      expect(result.monthlyPMI).toBeGreaterThan(0);
      expect(result.annualPMI).toBe(result.monthlyPMI * 12);
    });

    it('should calculate cancellation requirements correctly', () => {
      const result = calculateMortgageInsurance(mockInputs);
      
      expect(result.equityNeeded).toBeGreaterThan(0);
      expect(result.principalNeeded).toBeGreaterThan(0);
      expect(result.monthsToCancellation).toBeGreaterThan(0);
    });

    it('should calculate savings correctly', () => {
      const result = calculateMortgageInsurance(mockInputs);
      
      expect(result.monthlySavings).toBe(result.monthlyPMI);
      expect(result.annualSavings).toBe(result.monthlySavings * 12);
      expect(result.totalSavings).toBe(result.monthlyPMI * result.monthsToCancellation);
    });

    it('should handle FHA loans correctly', () => {
      const fhaInputs = {
        ...mockInputs,
        loanType: 'fha',
        downPayment: 20000 // 5% down payment
      };
      
      const result = calculateMortgageInsurance(fhaInputs);
      
      expect(result.fhaMIPRate).toBeGreaterThan(0);
      expect(result.monthlyFHA).toBeGreaterThan(0);
      expect(result.fhaCancellation).toContain('FHA MIP');
    });

    it('should handle high credit scores correctly', () => {
      const highCreditInputs = {
        ...mockInputs,
        creditScore: 780
      };
      
      const result = calculateMortgageInsurance(highCreditInputs);
      
      // Higher credit score should result in lower PMI rate
      expect(result.pmiRate).toBeLessThan(1.0);
    });

    it('should handle low LTV scenarios correctly', () => {
      const lowLTVInputs = {
        ...mockInputs,
        currentLoanBalance: 300000 // 75% LTV
      };
      
      const result = calculateMortgageInsurance(lowLTVInputs);
      
      expect(result.loanToValueRatio).toBe(75);
      expect(result.equityNeeded).toBeLessThanOrEqual(0); // Should be eligible for cancellation
    });
  });

  describe('validation', () => {
    it('should validate all inputs correctly', () => {
      const validationResults = validateAllMortgageInsuranceInputs(mockInputs);
      
      expect(validationResults.every(result => result.isValid)).toBe(true);
    });

    it('should reject invalid home value', () => {
      const invalidInputs = { ...mockInputs, homeValue: -1000 };
      const validationResults = validateAllMortgageInsuranceInputs(invalidInputs);
      
      const homeValueValidation = validationResults.find(result => 
        result.message?.includes('Home value')
      );
      expect(homeValueValidation?.isValid).toBe(false);
    });

    it('should reject invalid credit score', () => {
      const invalidInputs = { ...mockInputs, creditScore: 200 };
      const validationResults = validateAllMortgageInsuranceInputs(invalidInputs);
      
      const creditScoreValidation = validationResults.find(result => 
        result.message?.includes('Credit score')
      );
      expect(creditScoreValidation?.isValid).toBe(false);
    });

    it('should reject invalid loan type', () => {
      const invalidInputs = { ...mockInputs, loanType: 'invalid' };
      const validationResults = validateAllMortgageInsuranceInputs(invalidInputs);
      
      const loanTypeValidation = validationResults.find(result => 
        result.message?.includes('Loan type')
      );
      expect(loanTypeValidation?.isValid).toBe(false);
    });

    it('should reject invalid purchase date', () => {
      const invalidInputs = { ...mockInputs, purchaseDate: '2025-01-15' };
      const validationResults = validateAllMortgageInsuranceInputs(invalidInputs);
      
      const purchaseDateValidation = validationResults.find(result => 
        result.message?.includes('Purchase date')
      );
      expect(purchaseDateValidation?.isValid).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle zero equity scenario', () => {
      const zeroEquityInputs = {
        ...mockInputs,
        currentLoanBalance: 400000 // 100% LTV
      };
      
      const result = calculateMortgageInsurance(zeroEquityInputs);
      
      expect(result.loanToValueRatio).toBe(100);
      expect(result.equityNeeded).toBeGreaterThan(0);
    });

    it('should handle negative equity scenario', () => {
      const negativeEquityInputs = {
        ...mockInputs,
        currentLoanBalance: 450000 // 112.5% LTV
      };
      
      const result = calculateMortgageInsurance(negativeEquityInputs);
      
      expect(result.loanToValueRatio).toBe(112.5);
      expect(result.equityNeeded).toBeGreaterThan(0);
    });

    it('should handle PMI cancellation scenario', () => {
      const cancellationInputs = {
        ...mockInputs,
        currentLoanBalance: 312000 // 78% LTV
      };
      
      const result = calculateMortgageInsurance(cancellationInputs);
      
      expect(result.loanToValueRatio).toBe(78);
      expect(result.equityNeeded).toBeLessThanOrEqual(0);
      expect(result.monthsToCancellation).toBe(0);
    });

    it('should handle additional principal payments', () => {
      const additionalPaymentsInputs = {
        ...mockInputs,
        additionalPrincipalPayments: 200
      };
      
      const result = calculateMortgageInsurance(additionalPaymentsInputs);
      
      expect(result.monthsToCancellation).toBeLessThan(
        calculateMortgageInsurance(mockInputs).monthsToCancellation
      );
    });
  });

  describe('analysis outputs', () => {
    it('should generate FHA cancellation analysis', () => {
      const fhaInputs = { ...mockInputs, loanType: 'fha' };
      const result = calculateMortgageInsurance(fhaInputs);
      
      expect(result.fhaCancellation).toContain('FHA MIP');
      expect(result.fhaCancellation).toContain('cancellation');
    });

    it('should generate insurance comparison', () => {
      const result = calculateMortgageInsurance(mockInputs);
      
      expect(result.insuranceComparison).toContain('Conventional PMI');
      expect(result.insuranceComparison).toContain('FHA MIP');
      expect(result.insuranceComparison).toContain('VA Funding Fee');
      expect(result.insuranceComparison).toContain('USDA Annual Fee');
    });

    it('should generate cancellation strategies', () => {
      const result = calculateMortgageInsurance(mockInputs);
      
      expect(result.cancellationStrategies).toContain('Principal Reduction');
      expect(result.cancellationStrategies).toContain('Refinancing');
      expect(result.cancellationStrategies).toContain('Lump Sum Payment');
    });

    it('should generate refinance analysis', () => {
      const result = calculateMortgageInsurance(mockInputs);
      
      expect(result.refinanceAnalysis).toContain('Refinance Analysis');
      expect(result.refinanceAnalysis).toContain('Current LTV');
      expect(result.refinanceAnalysis).toContain('Break-even Period');
    });

    it('should generate cost-benefit analysis', () => {
      const result = calculateMortgageInsurance(mockInputs);
      
      expect(result.costBenefitAnalysis).toContain('Cost-Benefit Analysis');
      expect(result.costBenefitAnalysis).toContain('Total PMI Cost');
      expect(result.costBenefitAnalysis).toContain('ROI on Principal Reduction');
    });

    it('should generate recommendations', () => {
      const result = calculateMortgageInsurance(mockInputs);
      
      expect(result.recommendations).toContain('Recommendations');
      expect(result.recommendations).toContain('Next Steps');
    });

    it('should generate risk assessment', () => {
      const result = calculateMortgageInsurance(mockInputs);
      
      expect(result.riskAssessment).toContain('Risk Assessment');
      expect(result.riskAssessment).toContain('Current LTV');
      expect(result.riskAssessment).toContain('Risk Factors');
    });

    it('should generate timeline', () => {
      const result = calculateMortgageInsurance(mockInputs);
      
      expect(result.timeline).toContain('PMI Cancellation Timeline');
      expect(result.timeline).toContain('Purchase Date');
      expect(result.timeline).toContain('Estimated Cancellation Date');
    });

    it('should generate legal requirements', () => {
      const result = calculateMortgageInsurance(mockInputs);
      
      expect(result.legalRequirements).toContain('Legal Requirements');
      expect(result.legalRequirements).toContain('Automatic Cancellation');
      expect(result.legalRequirements).toContain('Manual Cancellation');
    });
  });
});
