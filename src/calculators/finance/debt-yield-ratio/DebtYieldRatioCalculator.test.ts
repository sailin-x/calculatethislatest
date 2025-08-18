import { describe, it, expect } from 'vitest';
import { DebtYieldRatioCalculator } from './DebtYieldRatioCalculator';
import { calculateDebtYield } from './formulas';
import { validateDebtYieldInputs } from './validation';
import { validateAllDebtYieldInputs } from './quickValidation';

describe('Debt Yield Ratio Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(DebtYieldRatioCalculator.id).toBe('debt-yield-ratio-calculator');
      expect(DebtYieldRatioCalculator.name).toBe('Debt Yield Ratio Calculator');
      expect(DebtYieldRatioCalculator.category).toBe('finance');
      expect(DebtYieldRatioCalculator.subcategory).toBe('real-estate');
    });

    it('should have required inputs', () => {
      const inputIds = DebtYieldRatioCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('propertyType');
      expect(inputIds).toContain('grossRentalIncome');
      expect(inputIds).toContain('otherIncome');
      expect(inputIds).toContain('vacancyRate');
      expect(inputIds).toContain('loanAmount');
      expect(inputIds).toContain('propertyValue');
      expect(inputIds).toContain('requiredDebtYield');
    });

    it('should have required outputs', () => {
      const outputIds = DebtYieldRatioCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('noi');
      expect(outputIds).toContain('debtYieldRatio');
      expect(outputIds).toContain('maxLoanAmount');
      expect(outputIds).toContain('loanToValueRatio');
      expect(outputIds).toContain('capRate');
      expect(outputIds).toContain('debtServiceCoverageRatio');
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof DebtYieldRatioCalculator.calculate).toBe('function');
      expect(typeof DebtYieldRatioCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    const validInputs = {
      propertyType: 'office',
      grossRentalIncome: 1200000,
      otherIncome: 60000,
      vacancyRate: 5,
      operatingExpenses: 240000,
      propertyManagementFee: 60000,
      maintenanceCosts: 90000,
      insuranceCosts: 30000,
      propertyTaxes: 120000,
      utilities: 36000,
      repairs: 24000,
      landscaping: 12000,
      security: 18000,
      advertising: 6000,
      legalFees: 9600,
      accountingFees: 3600,
      loanAmount: 6000000,
      propertyValue: 10000000,
      requiredDebtYield: 10,
      marketCapRate: 7.5,
      propertyAge: 12,
      occupancyRate: 95,
      leaseType: 'triple-net',
      tenantCreditRating: 'investment-grade',
      marketConditions: 'stable',
      loanTerm: 30,
      interestRate: 5.5,
      amortizationPeriod: 30,
      loanToValue: 60,
      debtServiceCoverageRatio: 1.35
    };

    it('should validate correct inputs', () => {
      const result = validateDebtYieldInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject negative gross rental income', () => {
      const inputs = { ...validInputs, grossRentalIncome: -1000 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Gross rental income cannot be negative');
    });

    it('should reject negative vacancy rate', () => {
      const inputs = { ...validInputs, vacancyRate: -5 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Vacancy rate must be between 0% and 100%');
    });

    it('should reject vacancy rate over 100%', () => {
      const inputs = { ...validInputs, vacancyRate: 105 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Vacancy rate must be between 0% and 100%');
    });

    it('should reject loan amount greater than property value', () => {
      const inputs = { ...validInputs, loanAmount: 12000000, propertyValue: 10000000 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount cannot exceed property value');
    });

    it('should reject negative interest rate', () => {
      const inputs = { ...validInputs, interestRate: -1 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0% and 25%');
    });

    it('should reject interest rate over 25%', () => {
      const inputs = { ...validInputs, interestRate: 30 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0% and 25%');
    });

    it('should reject loan term less than 1 year', () => {
      const inputs = { ...validInputs, loanTerm: 0 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be between 1 and 50 years');
    });

    it('should reject loan term over 50 years', () => {
      const inputs = { ...validInputs, loanTerm: 60 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be between 1 and 50 years');
    });

    it('should reject required debt yield less than 7%', () => {
      const inputs = { ...validInputs, requiredDebtYield: 5 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Required debt yield must be between 7% and 15%');
    });

    it('should reject required debt yield over 15%', () => {
      const inputs = { ...validInputs, requiredDebtYield: 18 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Required debt yield must be between 7% and 15%');
    });

    it('should reject amortization period less than 1 year', () => {
      const inputs = { ...validInputs, amortizationPeriod: 0 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Amortization period must be between 1 and 50 years');
    });

    it('should reject amortization period over 50 years', () => {
      const inputs = { ...validInputs, amortizationPeriod: 60 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Amortization period must be between 1 and 50 years');
    });

    it('should reject when total expenses exceed total income', () => {
      const inputs = { 
        ...validInputs, 
        grossRentalIncome: 100000,
        otherIncome: 10000,
        operatingExpenses: 200000
      };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total expenses cannot exceed total income');
    });

    it('should reject when vacancy rate plus occupancy rate exceeds 100%', () => {
      const inputs = { ...validInputs, vacancyRate: 10, occupancyRate: 95 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Vacancy rate plus occupancy rate cannot exceed 100%');
    });

    it('should reject when loan term exceeds amortization period', () => {
      const inputs = { ...validInputs, loanTerm: 35, amortizationPeriod: 30 };
      const result = validateDebtYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term cannot exceed amortization period');
    });
  });

  describe('Calculation Logic', () => {
    const testInputs = {
      propertyType: 'office',
      grossRentalIncome: 1200000,
      otherIncome: 60000,
      vacancyRate: 5,
      operatingExpenses: 240000,
      propertyManagementFee: 60000,
      maintenanceCosts: 90000,
      insuranceCosts: 30000,
      propertyTaxes: 120000,
      utilities: 36000,
      repairs: 24000,
      landscaping: 12000,
      security: 18000,
      advertising: 6000,
      legalFees: 9600,
      accountingFees: 3600,
      loanAmount: 6000000,
      propertyValue: 10000000,
      requiredDebtYield: 10,
      marketCapRate: 7.5,
      propertyAge: 12,
      occupancyRate: 95,
      leaseType: 'triple-net',
      tenantCreditRating: 'investment-grade',
      marketConditions: 'stable',
      loanTerm: 30,
      interestRate: 5.5,
      amortizationPeriod: 30,
      loanToValue: 60,
      debtServiceCoverageRatio: 1.35
    };

    it('should calculate NOI correctly', () => {
      const outputs = calculateDebtYield(testInputs);
      
      // Expected NOI calculation:
      // Total income: 1,200,000 + 60,000 = 1,260,000
      // Vacancy loss: 1,260,000 * 0.05 = 63,000
      // Effective gross income: 1,260,000 - 63,000 = 1,197,000
      // Total expenses: 240,000 + 60,000 + 90,000 + 30,000 + 120,000 + 36,000 + 24,000 + 12,000 + 18,000 + 6,000 + 9,600 + 3,600 = 649,200
      // NOI: 1,197,000 - 649,200 = 547,800
      
      expect(outputs.noi).toBe(547800);
    });

    it('should calculate debt yield ratio correctly', () => {
      const outputs = calculateDebtYield(testInputs);
      
      // Debt yield ratio = (NOI / Loan Amount) * 100
      // Expected debt yield = (547,800 / 6,000,000) * 100 = 9.13%
      expect(outputs.debtYieldRatio).toBeCloseTo(9.1, 1);
    });

    it('should calculate maximum loan amount correctly', () => {
      const outputs = calculateDebtYield(testInputs);
      
      // Maximum loan amount = NOI / Required Debt Yield
      // Expected max loan = 547,800 / (10 / 100) = 5,478,000
      expect(outputs.maxLoanAmount).toBe(5478000);
    });

    it('should calculate loan-to-value ratio correctly', () => {
      const outputs = calculateDebtYield(testInputs);
      
      // LTV = (Loan Amount / Property Value) * 100
      // Expected LTV = (6,000,000 / 10,000,000) * 100 = 60%
      expect(outputs.loanToValueRatio).toBe(60);
    });

    it('should calculate cap rate correctly', () => {
      const outputs = calculateDebtYield(testInputs);
      
      // Cap rate = (NOI / Property Value) * 100
      // Expected cap rate = (547,800 / 10,000,000) * 100 = 5.48%
      expect(outputs.capRate).toBeCloseTo(5.5, 1);
    });

    it('should calculate debt service coverage ratio correctly', () => {
      const outputs = calculateDebtYield(testInputs);
      
      // DSCR = NOI / Annual Debt Service
      // For a $6M loan at 5.5% for 30 years, annual debt service ≈ $408,000
      // Expected DSCR ≈ 547,800 / 408,000 ≈ 1.34
      expect(outputs.debtServiceCoverageRatio).toBeGreaterThan(1.2);
      expect(outputs.debtServiceCoverageRatio).toBeLessThan(1.5);
    });

    it('should calculate annual debt service correctly', () => {
      const outputs = calculateDebtYield(testInputs);
      
      // For a $6M loan at 5.5% for 30 years, annual debt service ≈ $408,000
      expect(outputs.annualDebtService).toBeGreaterThan(400000);
      expect(outputs.annualDebtService).toBeLessThan(420000);
    });

    it('should calculate cash flow after debt service correctly', () => {
      const outputs = calculateDebtYield(testInputs);
      
      // Cash flow = NOI - Annual Debt Service
      expect(outputs.cashFlowAfterDebtService).toBe(outputs.noi - outputs.annualDebtService);
    });
  });

  describe('Debt Yield Analysis', () => {
    const testInputs = {
      propertyType: 'office',
      grossRentalIncome: 1200000,
      otherIncome: 60000,
      vacancyRate: 5,
      operatingExpenses: 240000,
      propertyManagementFee: 60000,
      maintenanceCosts: 90000,
      insuranceCosts: 30000,
      propertyTaxes: 120000,
      utilities: 36000,
      repairs: 24000,
      landscaping: 12000,
      security: 18000,
      advertising: 6000,
      legalFees: 9600,
      accountingFees: 3600,
      loanAmount: 6000000,
      propertyValue: 10000000,
      requiredDebtYield: 10,
      marketCapRate: 7.5,
      propertyAge: 12,
      occupancyRate: 95,
      leaseType: 'triple-net',
      tenantCreditRating: 'investment-grade',
      marketConditions: 'stable',
      loanTerm: 30,
      interestRate: 5.5,
      amortizationPeriod: 30,
      loanToValue: 60,
      debtServiceCoverageRatio: 1.35
    };

    it('should provide risk assessment', () => {
      const outputs = calculateDebtYield(testInputs);
      
      expect(outputs.riskAssessment).toHaveProperty('risk');
      expect(outputs.riskAssessment).toHaveProperty('color');
      expect(outputs.riskAssessment).toHaveProperty('description');
      
      // With debt yield around 9.1% and required 10%, should be high risk
      expect(['Low Risk', 'Moderate Risk', 'High Risk', 'Critical Risk']).toContain(outputs.riskAssessment.risk);
    });

    it('should provide sensitivity analysis', () => {
      const outputs = calculateDebtYield(testInputs);
      
      expect(outputs.sensitivityAnalysis).toBeInstanceOf(Array);
      expect(outputs.sensitivityAnalysis.length).toBeGreaterThan(0);
      
      outputs.sensitivityAnalysis.forEach(scenario => {
        expect(scenario).toHaveProperty('scenario');
        expect(scenario).toHaveProperty('noi');
        expect(scenario).toHaveProperty('debtYield');
        expect(scenario).toHaveProperty('maxLoan');
      });
    });

    it('should provide lender requirements analysis', () => {
      const outputs = calculateDebtYield(testInputs);
      
      expect(outputs.lenderRequirements).toHaveProperty('minRequiredNOI');
      expect(outputs.lenderRequirements).toHaveProperty('maxLoanAmount');
      expect(outputs.lenderRequirements).toHaveProperty('maxLTV');
      expect(outputs.lenderRequirements).toHaveProperty('minDebtYield');
      expect(outputs.lenderRequirements).toHaveProperty('lenderRiskScore');
      expect(outputs.lenderRequirements).toHaveProperty('creditAdjustment');
      expect(outputs.lenderRequirements).toHaveProperty('marketAdjustment');
      
      expect(outputs.lenderRequirements.maxLTV).toBe(75);
    });

    it('should provide cash flow analysis', () => {
      const outputs = calculateDebtYield(testInputs);
      
      expect(outputs.cashFlowAnalysis).toHaveProperty('monthlyNOI');
      expect(outputs.cashFlowAnalysis).toHaveProperty('monthlyDebtService');
      expect(outputs.cashFlowAnalysis).toHaveProperty('monthlyCashFlow');
      expect(outputs.cashFlowAnalysis).toHaveProperty('annualCashFlow');
      expect(outputs.cashFlowAnalysis).toHaveProperty('cashOnCashReturn');
      expect(outputs.cashFlowAnalysis).toHaveProperty('debtYieldBuffer');
      
      expect(outputs.cashFlowAnalysis.monthlyNOI).toBe(Math.round(outputs.noi / 12));
      expect(outputs.cashFlowAnalysis.monthlyDebtService).toBe(Math.round(outputs.annualDebtService / 12));
      expect(outputs.cashFlowAnalysis.monthlyCashFlow).toBe(Math.round(outputs.cashFlowAfterDebtService / 12));
    });

    it('should provide performance metrics', () => {
      const outputs = calculateDebtYield(testInputs);
      
      expect(outputs.performanceMetrics).toHaveProperty('grossRentMultiplier');
      expect(outputs.performanceMetrics).toHaveProperty('netRentMultiplier');
      expect(outputs.performanceMetrics).toHaveProperty('expenseRatio');
      expect(outputs.performanceMetrics).toHaveProperty('vacancyLoss');
      expect(outputs.performanceMetrics).toHaveProperty('effectiveGrossIncome');
      expect(outputs.performanceMetrics).toHaveProperty('operatingExpenseRatio');
      expect(outputs.performanceMetrics).toHaveProperty('noiMargin');
      
      expect(outputs.performanceMetrics.vacancyLoss).toBe(Math.round((testInputs.grossRentalIncome + testInputs.otherIncome) * 0.05));
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero interest rate', () => {
      const inputs = {
        propertyType: 'office',
        grossRentalIncome: 1000000,
        otherIncome: 0,
        vacancyRate: 0,
        operatingExpenses: 200000,
        propertyManagementFee: 0,
        maintenanceCosts: 0,
        insuranceCosts: 0,
        propertyTaxes: 0,
        utilities: 0,
        repairs: 0,
        landscaping: 0,
        security: 0,
        advertising: 0,
        legalFees: 0,
        accountingFees: 0,
        loanAmount: 1000000,
        propertyValue: 2000000,
        requiredDebtYield: 10,
        marketCapRate: 5,
        propertyAge: 10,
        occupancyRate: 100,
        leaseType: 'triple-net',
        tenantCreditRating: 'investment-grade',
        marketConditions: 'stable',
        loanTerm: 30,
        interestRate: 0,
        amortizationPeriod: 30,
        loanToValue: 50,
        debtServiceCoverageRatio: 1.5
      };

      const outputs = calculateDebtYield(inputs);
      expect(outputs.annualDebtService).toBe(33333); // 1,000,000 / 30
      expect(outputs.debtYieldRatio).toBeGreaterThan(0);
    });

    it('should handle very high debt yield', () => {
      const inputs = {
        propertyType: 'office',
        grossRentalIncome: 2000000,
        otherIncome: 0,
        vacancyRate: 0,
        operatingExpenses: 100000,
        propertyManagementFee: 0,
        maintenanceCosts: 0,
        insuranceCosts: 0,
        propertyTaxes: 0,
        utilities: 0,
        repairs: 0,
        landscaping: 0,
        security: 0,
        advertising: 0,
        legalFees: 0,
        accountingFees: 0,
        loanAmount: 1000000,
        propertyValue: 5000000,
        requiredDebtYield: 10,
        marketCapRate: 5,
        propertyAge: 10,
        occupancyRate: 100,
        leaseType: 'triple-net',
        tenantCreditRating: 'investment-grade',
        marketConditions: 'stable',
        loanTerm: 30,
        interestRate: 5,
        amortizationPeriod: 30,
        loanToValue: 20,
        debtServiceCoverageRatio: 2.0
      };

      const outputs = calculateDebtYield(inputs);
      expect(outputs.debtYieldRatio).toBeGreaterThan(15);
      expect(outputs.riskAssessment.risk).toBe('Low Risk');
    });

    it('should handle very low debt yield', () => {
      const inputs = {
        propertyType: 'office',
        grossRentalIncome: 500000,
        otherIncome: 0,
        vacancyRate: 0,
        operatingExpenses: 400000,
        propertyManagementFee: 0,
        maintenanceCosts: 0,
        insuranceCosts: 0,
        propertyTaxes: 0,
        utilities: 0,
        repairs: 0,
        landscaping: 0,
        security: 0,
        advertising: 0,
        legalFees: 0,
        accountingFees: 0,
        loanAmount: 1000000,
        propertyValue: 2000000,
        requiredDebtYield: 10,
        marketCapRate: 5,
        propertyAge: 10,
        occupancyRate: 100,
        leaseType: 'triple-net',
        tenantCreditRating: 'investment-grade',
        marketConditions: 'stable',
        loanTerm: 30,
        interestRate: 5,
        amortizationPeriod: 30,
        loanToValue: 50,
        debtServiceCoverageRatio: 0.8
      };

      const outputs = calculateDebtYield(inputs);
      expect(outputs.debtYieldRatio).toBeLessThan(10);
      expect(outputs.riskAssessment.risk).toBe('Critical Risk');
    });
  });

  describe('Quick Validation', () => {
    it('should validate gross rental income correctly', () => {
      const result = validateAllDebtYieldInputs({ grossRentalIncome: 1200000 });
      expect(result.isValid).toBe(true);

      const invalidResult = validateAllDebtYieldInputs({ grossRentalIncome: -1000 });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Gross rental income cannot be negative');
    });

    it('should validate loan amount correctly', () => {
      const result = validateAllDebtYieldInputs({ loanAmount: 6000000 });
      expect(result.isValid).toBe(true);

      const invalidResult = validateAllDebtYieldInputs({ loanAmount: 0 });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Loan amount must be greater than 0');
    });

    it('should validate interest rate correctly', () => {
      const result = validateAllDebtYieldInputs({ interestRate: 5.5 });
      expect(result.isValid).toBe(true);

      const invalidResult = validateAllDebtYieldInputs({ interestRate: 30 });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Interest rate must be between 0% and 25%');
    });

    it('should validate property value correctly', () => {
      const result = validateAllDebtYieldInputs({ propertyValue: 10000000 });
      expect(result.isValid).toBe(true);

      const invalidResult = validateAllDebtYieldInputs({ propertyValue: 0 });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Property value must be greater than 0');
    });

    it('should validate required debt yield correctly', () => {
      const result = validateAllDebtYieldInputs({ requiredDebtYield: 10 });
      expect(result.isValid).toBe(true);

      const invalidResult = validateAllDebtYieldInputs({ requiredDebtYield: 5 });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Required debt yield must be between 7% and 15%');
    });

    it('should validate logical relationships', () => {
      const result = validateAllDebtYieldInputs({ 
        loanAmount: 6000000, 
        propertyValue: 10000000 
      });
      expect(result.isValid).toBe(true);

      const invalidResult = validateAllDebtYieldInputs({ 
        loanAmount: 12000000, 
        propertyValue: 10000000 
      });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Loan amount cannot exceed property value');
    });

    it('should validate loan term vs amortization period', () => {
      const result = validateAllDebtYieldInputs({ 
        loanTerm: 30, 
        amortizationPeriod: 30 
      });
      expect(result.isValid).toBe(true);

      const invalidResult = validateAllDebtYieldInputs({ 
        loanTerm: 35, 
        amortizationPeriod: 30 
      });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Loan term cannot exceed amortization period');
    });
  });
});
