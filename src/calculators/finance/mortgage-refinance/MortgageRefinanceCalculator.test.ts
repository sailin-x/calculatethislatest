import { calculateMortgageRefinance } from './formulas';
import { validateMortgageRefinanceInputs } from './validation';
import { MortgageRefinanceInputs } from './types';

describe('MortgageRefinanceCalculator', () => {
  const mockInputs: MortgageRefinanceInputs = {
    currentLoanAmount: 400000,
    currentInterestRate: 0.075,
    currentLoanTerm: 30,
    currentLoanType: 'conventional',
    currentPaymentType: 'principal_interest',
    currentMonthlyPayment: 2796,
    currentRemainingTerm: 25,
    currentPrincipalBalance: 350000,
    newLoanAmount: 350000,
    newInterestRate: 0.065,
    newLoanTerm: 30,
    newLoanType: 'conventional',
    newPaymentType: 'principal_interest',
    refinanceType: 'rate_term',
    propertyValue: 500000,
    propertyAddress: '123 Main St, City, State 12345',
    propertyType: 'single_family',
    propertySize: 2000,
    propertyAge: 20,
    closingCosts: 5000,
    originationFee: 1000,
    appraisalFee: 500,
    titleInsuranceFee: 1000,
    recordingFee: 200,
    attorneyFee: 500,
    creditReportFee: 50,
    floodCertificationFee: 25,
    taxServiceFee: 75,
    otherFees: 650,
    borrowerIncome: 120000,
    borrowerCreditScore: 750,
    borrowerDebtToIncomeRatio: 0.36,
    borrowerEmploymentType: 'employed',
    borrowerTaxRate: 25,
    marketLocation: 'Los Angeles, CA',
    marketCondition: 'stable',
    marketGrowthRate: 0.04,
    analysisPeriod: 5,
    inflationRate: 0.03,
    propertyAppreciationRate: 0.04,
    discountRate: 0.06,
    taxDeductionPeriod: 5,
    refinanceGoal: 'lower_payment',
    targetMonthlySavings: 200,
    targetRate: 0.06,
    cashOutAmount: 0,
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true
  };

  describe('calculateMortgageRefinance', () => {
    it('should calculate refinance metrics correctly', () => {
      const result = calculateMortgageRefinance(mockInputs);

      expect(result.monthlyPaymentSavings).toBeGreaterThan(0);
      expect(result.interestSavings).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.netSavings).toBeGreaterThan(0);
      expect(result.returnOnInvestment).toBeGreaterThan(0);
      expect(result.riskScore).toBeGreaterThan(0);
      expect(result.newMonthlyPayment).toBeGreaterThan(0);
      expect(result.totalRefinanceCost).toBeGreaterThan(0);
    });

    it('should handle different refinance types', () => {
      const cashOutInputs = { ...mockInputs, refinanceType: 'cash_out' as const, cashOutAmount: 50000 };
      const result = calculateMortgageRefinance(cashOutInputs);

      expect(result.newLoanAmount).toBe(350000);
      expect(result.cashOutAmount).toBe(50000);
    });

    it('should calculate break-even analysis correctly', () => {
      const result = calculateMortgageRefinance(mockInputs);

      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeLessThan(120);
    });

    it('should calculate risk score based on various factors', () => {
      const highRiskInputs = {
        ...mockInputs,
        newInterestRate: 0.08,
        marketCondition: 'declining' as const,
        borrowerCreditScore: 600,
        borrowerDebtToIncomeRatio: 0.5
      };
      const result = calculateMortgageRefinance(highRiskInputs);

      expect(result.riskScore).toBeGreaterThan(50);
    });

    it('should generate amortization comparison', () => {
      const result = calculateMortgageRefinance(mockInputs);

      expect(result.amortizationComparison).toBeDefined();
      expect(result.amortizationComparison.length).toBeGreaterThan(0);
      expect(result.amortizationComparison[0]).toHaveProperty('paymentNumber');
      expect(result.amortizationComparison[0]).toHaveProperty('date');
      expect(result.amortizationComparison[0]).toHaveProperty('currentPayment');
      expect(result.amortizationComparison[0]).toHaveProperty('newPayment');
      expect(result.amortizationComparison[0]).toHaveProperty('savings');
      expect(result.amortizationComparison[0]).toHaveProperty('cumulativeSavings');
    });

    it('should generate sensitivity matrix', () => {
      const result = calculateMortgageRefinance(mockInputs);

      expect(result.sensitivityMatrix).toBeDefined();
      expect(result.sensitivityMatrix.length).toBeGreaterThan(0);
      expect(result.sensitivityMatrix[0]).toHaveProperty('variable');
      expect(result.sensitivityMatrix[0]).toHaveProperty('values');
      expect(result.sensitivityMatrix[0]).toHaveProperty('impacts');
    });

    it('should generate scenarios', () => {
      const result = calculateMortgageRefinance(mockInputs);

      expect(result.scenarios).toBeDefined();
      expect(result.scenarios.length).toBeGreaterThan(0);
      expect(result.scenarios[0]).toHaveProperty('scenario');
      expect(result.scenarios[0]).toHaveProperty('probability');
      expect(result.scenarios[0]).toHaveProperty('rate');
      expect(result.scenarios[0]).toHaveProperty('payment');
      expect(result.scenarios[0]).toHaveProperty('savings');
    });

    it('should generate comparison analysis', () => {
      const result = calculateMortgageRefinance(mockInputs);

      expect(result.comparisonAnalysis).toBeDefined();
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
      expect(result.comparisonAnalysis[0]).toHaveProperty('option');
      expect(result.comparisonAnalysis[0]).toHaveProperty('rate');
      expect(result.comparisonAnalysis[0]).toHaveProperty('payment');
      expect(result.comparisonAnalysis[0]).toHaveProperty('totalCost');
      expect(result.comparisonAnalysis[0]).toHaveProperty('savings');
      expect(result.comparisonAnalysis[0]).toHaveProperty('breakEven');
    });

    it('should provide comprehensive analysis', () => {
      const result = calculateMortgageRefinance(mockInputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.refinanceRating).toBeDefined();
      expect(result.analysis.valueRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.keyStrengths).toBeDefined();
      expect(result.analysis.keyWeaknesses).toBeDefined();
      expect(result.analysis.valueFactors).toBeDefined();
      expect(result.analysis.opportunities).toBeDefined();
    });

    it('should calculate tax benefits correctly', () => {
      const result = calculateMortgageRefinance(mockInputs);

      expect(result.taxDeduction).toBeGreaterThan(0);
      expect(result.afterTaxSavings).toBeGreaterThan(0);
      expect(result.taxBenefit).toBeGreaterThan(0);
    });

    it('should calculate equity analysis correctly', () => {
      const result = calculateMortgageRefinance(mockInputs);

      expect(result.currentEquity).toBeGreaterThan(0);
      expect(result.newEquity).toBeGreaterThan(0);
      expect(result.equityChange).toBeDefined();
      expect(result.loanToValueRatio).toBeGreaterThan(0);
    });

    it('should calculate cash flow analysis correctly', () => {
      const result = calculateMortgageRefinance(mockInputs);

      expect(result.monthlyCashFlow).toBeDefined();
      expect(result.annualCashFlow).toBeDefined();
      expect(result.totalCashFlow).toBeDefined();
      expect(result.cashFlowImprovement).toBeDefined();
    });

    it('should calculate ROI analysis correctly', () => {
      const result = calculateMortgageRefinance(mockInputs);

      expect(result.returnOnInvestment).toBeDefined();
      expect(result.paybackPeriod).toBeDefined();
      expect(result.netPresentValue).toBeDefined();
      expect(result.internalRateOfReturn).toBeDefined();
    });
  });

  describe('validateMortgageRefinanceInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgageRefinanceInputs(mockInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch invalid current loan amount', () => {
      const invalidInputs = { ...mockInputs, currentLoanAmount: 5000 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current loan amount must be at least $10,000');
    });

    it('should catch invalid current interest rate', () => {
      const invalidInputs = { ...mockInputs, currentInterestRate: -0.01 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current interest rate must be between 0% and 50%');
    });

    it('should catch invalid current loan term', () => {
      const invalidInputs = { ...mockInputs, currentLoanTerm: 0 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current loan term must be between 1 and 50 years');
    });

    it('should catch invalid current monthly payment', () => {
      const invalidInputs = { ...mockInputs, currentMonthlyPayment: 50 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current monthly payment must be at least $100');
    });

    it('should catch invalid current remaining term', () => {
      const invalidInputs = { ...mockInputs, currentRemainingTerm: 0 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current remaining term must be between 1 and 50 years');
    });

    it('should catch invalid current principal balance', () => {
      const invalidInputs = { ...mockInputs, currentPrincipalBalance: 500 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current principal balance must be at least $1,000');
    });

    it('should catch invalid new loan amount', () => {
      const invalidInputs = { ...mockInputs, newLoanAmount: 5000 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('New loan amount must be at least $10,000');
    });

    it('should catch invalid new interest rate', () => {
      const invalidInputs = { ...mockInputs, newInterestRate: -0.01 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('New interest rate must be between 0% and 50%');
    });

    it('should catch invalid new loan term', () => {
      const invalidInputs = { ...mockInputs, newLoanTerm: 0 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('New loan term must be between 1 and 50 years');
    });

    it('should catch invalid property value', () => {
      const invalidInputs = { ...mockInputs, propertyValue: 10000 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be at least $50,000');
    });

    it('should catch invalid property size', () => {
      const invalidInputs = { ...mockInputs, propertySize: 50 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property size must be between 100 and 50,000 square feet');
    });

    it('should catch invalid property age', () => {
      const invalidInputs = { ...mockInputs, propertyAge: -1 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property age must be between 0 and 200 years');
    });

    it('should catch invalid closing costs', () => {
      const invalidInputs = { ...mockInputs, closingCosts: -100 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Closing costs cannot be negative');
    });

    it('should catch invalid origination fee', () => {
      const invalidInputs = { ...mockInputs, originationFee: -100 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Origination fee cannot be negative');
    });

    it('should catch invalid appraisal fee', () => {
      const invalidInputs = { ...mockInputs, appraisalFee: -100 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Appraisal fee cannot be negative');
    });

    it('should catch invalid title insurance fee', () => {
      const invalidInputs = { ...mockInputs, titleInsuranceFee: -100 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title insurance fee cannot be negative');
    });

    it('should catch invalid recording fee', () => {
      const invalidInputs = { ...mockInputs, recordingFee: -100 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Recording fee cannot be negative');
    });

    it('should catch invalid attorney fee', () => {
      const invalidInputs = { ...mockInputs, attorneyFee: -100 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Attorney fee cannot be negative');
    });

    it('should catch invalid credit report fee', () => {
      const invalidInputs = { ...mockInputs, creditReportFee: -100 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Credit report fee cannot be negative');
    });

    it('should catch invalid flood certification fee', () => {
      const invalidInputs = { ...mockInputs, floodCertificationFee: -100 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Flood certification fee cannot be negative');
    });

    it('should catch invalid tax service fee', () => {
      const invalidInputs = { ...mockInputs, taxServiceFee: -100 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Tax service fee cannot be negative');
    });

    it('should catch invalid other fees', () => {
      const invalidInputs = { ...mockInputs, otherFees: -100 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Other fees cannot be negative');
    });

    it('should catch invalid borrower income', () => {
      const invalidInputs = { ...mockInputs, borrowerIncome: -1000 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower income cannot be negative');
    });

    it('should catch invalid credit score', () => {
      const invalidInputs = { ...mockInputs, borrowerCreditScore: 200 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower credit score must be between 300 and 850');
    });

    it('should catch invalid debt-to-income ratio', () => {
      const invalidInputs = { ...mockInputs, borrowerDebtToIncomeRatio: 1.5 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Debt-to-income ratio must be between 0 and 1');
    });

    it('should catch invalid tax rate', () => {
      const invalidInputs = { ...mockInputs, borrowerTaxRate: 150 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower tax rate must be between 0% and 100%');
    });

    it('should catch invalid market growth rate', () => {
      const invalidInputs = { ...mockInputs, marketGrowthRate: 1.5 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Market growth rate must be between -50% and 100%');
    });

    it('should catch invalid analysis period', () => {
      const invalidInputs = { ...mockInputs, analysisPeriod: 0 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Analysis period must be between 1 and 30 years');
    });

    it('should catch invalid inflation rate', () => {
      const invalidInputs = { ...mockInputs, inflationRate: -0.15 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Inflation rate must be between -10% and 50%');
    });

    it('should catch invalid property appreciation rate', () => {
      const invalidInputs = { ...mockInputs, propertyAppreciationRate: -0.6 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property appreciation rate must be between -50% and 100%');
    });

    it('should catch invalid discount rate', () => {
      const invalidInputs = { ...mockInputs, discountRate: 1.5 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Discount rate must be between 0 and 100%');
    });

    it('should catch invalid tax deduction period', () => {
      const invalidInputs = { ...mockInputs, taxDeductionPeriod: 0 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Tax deduction period must be between 1 and 30 years');
    });

    it('should catch invalid target monthly savings', () => {
      const invalidInputs = { ...mockInputs, targetMonthlySavings: -100 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Target monthly savings cannot be negative');
    });

    it('should catch invalid target rate', () => {
      const invalidInputs = { ...mockInputs, targetRate: -0.01 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Target rate must be between 0% and 50%');
    });

    it('should catch invalid cash out amount', () => {
      const invalidInputs = { ...mockInputs, cashOutAmount: -1000 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Cash out amount cannot be negative');
    });

    it('should catch invalid current loan type', () => {
      const invalidInputs = { ...mockInputs, currentLoanType: 'invalid' as any };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current loan type must be one of: conventional, fha, va, usda, jumbo, hard_money, private');
    });

    it('should catch invalid new loan type', () => {
      const invalidInputs = { ...mockInputs, newLoanType: 'invalid' as any };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('New loan type must be one of: conventional, fha, va, usda, jumbo, hard_money, private');
    });

    it('should catch invalid current payment type', () => {
      const invalidInputs = { ...mockInputs, currentPaymentType: 'invalid' as any };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current payment type must be one of: principal_interest, interest_only, balloon, arm');
    });

    it('should catch invalid new payment type', () => {
      const invalidInputs = { ...mockInputs, newPaymentType: 'invalid' as any };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('New payment type must be one of: principal_interest, interest_only, balloon, arm');
    });

    it('should catch invalid refinance type', () => {
      const invalidInputs = { ...mockInputs, refinanceType: 'invalid' as any };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Refinance type must be one of: rate_term, cash_out, cash_in, streamline, fha_to_conventional');
    });

    it('should catch invalid property type', () => {
      const invalidInputs = { ...mockInputs, propertyType: 'invalid' as any };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property type must be one of: single_family, multi_family, condo, townhouse, commercial');
    });

    it('should catch invalid market condition', () => {
      const invalidInputs = { ...mockInputs, marketCondition: 'invalid' as any };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Market condition must be one of: declining, stable, growing, hot');
    });

    it('should catch invalid employment type', () => {
      const invalidInputs = { ...mockInputs, borrowerEmploymentType: 'invalid' as any };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Employment type must be one of: employed, self_employed, retired, business_owner');
    });

    it('should catch invalid refinance goal', () => {
      const invalidInputs = { ...mockInputs, refinanceGoal: 'invalid' as any };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Refinance goal must be one of: lower_payment, lower_rate, cash_out, shorter_term, remove_pmi, consolidate_debt');
    });

    it('should catch invalid currency', () => {
      const invalidInputs = { ...mockInputs, currency: 'invalid' as any };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Currency must be one of: USD, EUR, GBP, CAD, AUD');
    });

    it('should catch invalid display format', () => {
      const invalidInputs = { ...mockInputs, displayFormat: 'invalid' as any };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Display format must be one of: percentage, decimal, currency');
    });

    it('should catch invalid include charts', () => {
      const invalidInputs = { ...mockInputs, includeCharts: 'invalid' as any };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Include charts must be a boolean value');
    });

    it('should provide warnings for high risk scenarios', () => {
      const highRiskInputs = {
        ...mockInputs,
        currentLoanAmount: 600000,
        propertyValue: 500000,
        borrowerCreditScore: 600,
        borrowerDebtToIncomeRatio: 0.5,
        marketGrowthRate: 0.3,
        analysisPeriod: 15
      };
      const result = validateMortgageRefinanceInputs(highRiskInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should provide warnings for unusual values', () => {
      const unusualInputs = {
        ...mockInputs,
        borrowerIncome: 5000000,
        closingCosts: 75000,
        originationFee: 15000,
        appraisalFee: 3000,
        titleInsuranceFee: 8000,
        attorneyFee: 8000,
        otherFees: 15000,
        cashOutAmount: 2000000
      };
      const result = validateMortgageRefinanceInputs(unusualInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should provide warnings for cross-field validation issues', () => {
      const crossFieldInputs = {
        ...mockInputs,
        currentLoanAmount: 600000,
        propertyValue: 500000,
        newLoanAmount: 600000,
        propertyValue: 500000,
        currentInterestRate: 0.05,
        newInterestRate: 0.08,
        currentLoanAmount: 400000,
        newLoanAmount: 500000,
        borrowerIncome: 50000,
        newLoanAmount: 600000,
        refinanceType: 'cash_out' as const,
        cashOutAmount: 0,
        refinanceType: 'cash_in' as const,
        cashOutAmount: 50000,
        targetMonthlySavings: 200,
        newInterestRate: 0.08,
        targetRate: 0.06,
        newInterestRate: 0.07
      };
      const result = validateMortgageRefinanceInputs(crossFieldInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });
});