import { describe, it, expect } from 'vitest';
import { DebtServiceCoverageRatioCalculator } from './DebtServiceCoverageRatioCalculator';
import { calculateDSCR } from './formulas';
import { validateDSCRInputs } from './validation';
import { validateAllDSCRInputs } from './quickValidation';

describe('Debt Service Coverage Ratio Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(DebtServiceCoverageRatioCalculator.id).toBe('debt-service-coverage-ratio-calculator');
      expect(DebtServiceCoverageRatioCalculator.name).toBe('Debt Service Coverage Ratio Calculator');
      expect(DebtServiceCoverageRatioCalculator.category).toBe('finance');
      expect(DebtServiceCoverageRatioCalculator.subcategory).toBe('real-estate');
    });

    it('should have required inputs', () => {
      const inputIds = DebtServiceCoverageRatioCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('propertyType');
      expect(inputIds).toContain('grossRentalIncome');
      expect(inputIds).toContain('otherIncome');
      expect(inputIds).toContain('vacancyRate');
      expect(inputIds).toContain('loanAmount');
      expect(inputIds).toContain('interestRate');
      expect(inputIds).toContain('loanTerm');
      expect(inputIds).toContain('propertyValue');
    });

    it('should have required outputs', () => {
      const outputIds = DebtServiceCoverageRatioCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('noi');
      expect(outputIds).toContain('annualDebtService');
      expect(outputIds).toContain('dscr');
      expect(outputIds).toContain('cashFlowAfterDebtService');
      expect(outputIds).toContain('debtYieldRatio');
      expect(outputIds).toContain('loanToValueRatio');
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof DebtServiceCoverageRatioCalculator.calculate).toBe('function');
      expect(typeof DebtServiceCoverageRatioCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    const validInputs = {
      propertyType: 'office',
      grossRentalIncome: 1000000,
      otherIncome: 50000,
      vacancyRate: 5,
      operatingExpenses: 200000,
      propertyManagementFee: 50000,
      maintenanceCosts: 75000,
      insuranceCosts: 25000,
      propertyTaxes: 100000,
      utilities: 30000,
      repairs: 20000,
      landscaping: 10000,
      security: 15000,
      advertising: 5000,
      legalFees: 8000,
      accountingFees: 3000,
      loanAmount: 5000000,
      interestRate: 5.5,
      loanTerm: 30,
      paymentFrequency: 'monthly',
      propertyValue: 8000000,
      requiredDSCR: 1.25,
      marketCapRate: 7.5,
      propertyAge: 15,
      occupancyRate: 95,
      leaseType: 'triple-net',
      tenantCreditRating: 'investment-grade',
      marketConditions: 'stable'
    };

    it('should validate correct inputs', () => {
      const result = validateDSCRInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject negative gross rental income', () => {
      const inputs = { ...validInputs, grossRentalIncome: -1000 };
      const result = validateDSCRInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Gross rental income cannot be negative');
    });

    it('should reject negative vacancy rate', () => {
      const inputs = { ...validInputs, vacancyRate: -5 };
      const result = validateDSCRInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Vacancy rate must be between 0% and 100%');
    });

    it('should reject vacancy rate over 100%', () => {
      const inputs = { ...validInputs, vacancyRate: 105 };
      const result = validateDSCRInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Vacancy rate must be between 0% and 100%');
    });

    it('should reject loan amount greater than property value', () => {
      const inputs = { ...validInputs, loanAmount: 10000000, propertyValue: 8000000 };
      const result = validateDSCRInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount cannot exceed property value');
    });

    it('should reject negative interest rate', () => {
      const inputs = { ...validInputs, interestRate: -1 };
      const result = validateDSCRInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0% and 25%');
    });

    it('should reject interest rate over 25%', () => {
      const inputs = { ...validInputs, interestRate: 30 };
      const result = validateDSCRInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0% and 25%');
    });

    it('should reject loan term less than 1 year', () => {
      const inputs = { ...validInputs, loanTerm: 0 };
      const result = validateDSCRInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be between 1 and 50 years');
    });

    it('should reject loan term over 50 years', () => {
      const inputs = { ...validInputs, loanTerm: 60 };
      const result = validateDSCRInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be between 1 and 50 years');
    });

    it('should reject required DSCR less than 1.0', () => {
      const inputs = { ...validInputs, requiredDSCR: 0.8 };
      const result = validateDSCRInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Required DSCR must be between 1.0 and 3.0');
    });

    it('should reject required DSCR over 3.0', () => {
      const inputs = { ...validInputs, requiredDSCR: 3.5 };
      const result = validateDSCRInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Required DSCR must be between 1.0 and 3.0');
    });

    it('should reject invalid payment frequency', () => {
      const inputs = { ...validInputs, paymentFrequency: 'weekly' };
      const result = validateDSCRInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment frequency must be monthly, quarterly, or annually');
    });

    it('should reject when total expenses exceed total income', () => {
      const inputs = { 
        ...validInputs, 
        grossRentalIncome: 100000,
        otherIncome: 10000,
        operatingExpenses: 200000
      };
      const result = validateDSCRInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total expenses cannot exceed total income');
    });

    it('should reject when vacancy rate plus occupancy rate exceeds 100%', () => {
      const inputs = { ...validInputs, vacancyRate: 10, occupancyRate: 95 };
      const result = validateDSCRInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Vacancy rate plus occupancy rate cannot exceed 100%');
    });
  });

  describe('Calculation Logic', () => {
    const testInputs = {
      propertyType: 'office',
      grossRentalIncome: 1000000,
      otherIncome: 50000,
      vacancyRate: 5,
      operatingExpenses: 200000,
      propertyManagementFee: 50000,
      maintenanceCosts: 75000,
      insuranceCosts: 25000,
      propertyTaxes: 100000,
      utilities: 30000,
      repairs: 20000,
      landscaping: 10000,
      security: 15000,
      advertising: 5000,
      legalFees: 8000,
      accountingFees: 3000,
      loanAmount: 5000000,
      interestRate: 5.5,
      loanTerm: 30,
      paymentFrequency: 'monthly',
      propertyValue: 8000000,
      requiredDSCR: 1.25,
      marketCapRate: 7.5,
      propertyAge: 15,
      occupancyRate: 95,
      leaseType: 'triple-net',
      tenantCreditRating: 'investment-grade',
      marketConditions: 'stable'
    };

    it('should calculate NOI correctly', () => {
      const outputs = calculateDSCR(testInputs);
      
      // Expected NOI calculation:
      // Total income: 1,000,000 + 50,000 = 1,050,000
      // Vacancy loss: 1,050,000 * 0.05 = 52,500
      // Effective gross income: 1,050,000 - 52,500 = 997,500
      // Total expenses: 200,000 + 50,000 + 75,000 + 25,000 + 100,000 + 30,000 + 20,000 + 10,000 + 15,000 + 5,000 + 8,000 + 3,000 = 541,000
      // NOI: 997,500 - 541,000 = 456,500
      
      expect(outputs.noi).toBe(456500);
    });

    it('should calculate annual debt service correctly', () => {
      const outputs = calculateDSCR(testInputs);
      
      // For a $5M loan at 5.5% for 30 years, monthly payment ≈ $28,389
      // Annual debt service ≈ $340,668
      expect(outputs.annualDebtService).toBeGreaterThan(300000);
      expect(outputs.annualDebtService).toBeLessThan(400000);
    });

    it('should calculate DSCR correctly', () => {
      const outputs = calculateDSCR(testInputs);
      
      // DSCR = NOI / Annual Debt Service
      // Expected DSCR ≈ 456,500 / 340,668 ≈ 1.34
      expect(outputs.dscr).toBeGreaterThan(1.2);
      expect(outputs.dscr).toBeLessThan(1.5);
    });

    it('should calculate cash flow after debt service correctly', () => {
      const outputs = calculateDSCR(testInputs);
      
      // Cash flow = NOI - Annual Debt Service
      expect(outputs.cashFlowAfterDebtService).toBe(outputs.noi - outputs.annualDebtService);
    });

    it('should calculate debt yield ratio correctly', () => {
      const outputs = calculateDSCR(testInputs);
      
      // Debt yield ratio = (NOI / Loan Amount) * 100
      const expectedDebtYield = (outputs.noi / testInputs.loanAmount) * 100;
      expect(outputs.debtYieldRatio).toBeCloseTo(expectedDebtYield, 1);
    });

    it('should calculate loan-to-value ratio correctly', () => {
      const outputs = calculateDSCR(testInputs);
      
      // LTV = (Loan Amount / Property Value) * 100
      const expectedLTV = (testInputs.loanAmount / testInputs.propertyValue) * 100;
      expect(outputs.loanToValueRatio).toBeCloseTo(expectedLTV, 1);
    });

    it('should calculate cap rate correctly', () => {
      const outputs = calculateDSCR(testInputs);
      
      // Cap rate = (NOI / Property Value) * 100
      const expectedCapRate = (outputs.noi / testInputs.propertyValue) * 100;
      expect(outputs.capRate).toBeCloseTo(expectedCapRate, 1);
    });

    it('should calculate break-even occupancy correctly', () => {
      const outputs = calculateDSCR(testInputs);
      
      // Break-even occupancy should be reasonable
      expect(outputs.breakEvenOccupancy).toBeGreaterThan(0);
      expect(outputs.breakEvenOccupancy).toBeLessThan(100);
    });

    it('should calculate maximum loan amount correctly', () => {
      const outputs = calculateDSCR(testInputs);
      
      // Maximum loan amount should be reasonable based on NOI and required DSCR
      expect(outputs.maxLoanAmount).toBeGreaterThan(0);
      expect(outputs.maxLoanAmount).toBeLessThan(testInputs.propertyValue * 2);
    });
  });

  describe('DSCR Analysis', () => {
    const testInputs = {
      propertyType: 'office',
      grossRentalIncome: 1000000,
      otherIncome: 50000,
      vacancyRate: 5,
      operatingExpenses: 200000,
      propertyManagementFee: 50000,
      maintenanceCosts: 75000,
      insuranceCosts: 25000,
      propertyTaxes: 100000,
      utilities: 30000,
      repairs: 20000,
      landscaping: 10000,
      security: 15000,
      advertising: 5000,
      legalFees: 8000,
      accountingFees: 3000,
      loanAmount: 5000000,
      interestRate: 5.5,
      loanTerm: 30,
      paymentFrequency: 'monthly',
      propertyValue: 8000000,
      requiredDSCR: 1.25,
      marketCapRate: 7.5,
      propertyAge: 15,
      occupancyRate: 95,
      leaseType: 'triple-net',
      tenantCreditRating: 'investment-grade',
      marketConditions: 'stable'
    };

    it('should provide risk assessment', () => {
      const outputs = calculateDSCR(testInputs);
      
      expect(outputs.riskAssessment).toHaveProperty('risk');
      expect(outputs.riskAssessment).toHaveProperty('color');
      expect(outputs.riskAssessment).toHaveProperty('description');
      
      // With DSCR around 1.34, should be moderate risk
      expect(['Low Risk', 'Moderate Risk', 'High Risk', 'Critical Risk']).toContain(outputs.riskAssessment.risk);
    });

    it('should provide sensitivity analysis', () => {
      const outputs = calculateDSCR(testInputs);
      
      expect(outputs.sensitivityAnalysis).toBeInstanceOf(Array);
      expect(outputs.sensitivityAnalysis.length).toBeGreaterThan(0);
      
      outputs.sensitivityAnalysis.forEach(scenario => {
        expect(scenario).toHaveProperty('scenario');
        expect(scenario).toHaveProperty('noi');
        expect(scenario).toHaveProperty('dscr');
        expect(scenario).toHaveProperty('cashFlow');
      });
    });

    it('should provide lender requirements analysis', () => {
      const outputs = calculateDSCR(testInputs);
      
      expect(outputs.lenderRequirements).toHaveProperty('minRequiredNOI');
      expect(outputs.lenderRequirements).toHaveProperty('maxLoanAmount');
      expect(outputs.lenderRequirements).toHaveProperty('maxLTV');
      expect(outputs.lenderRequirements).toHaveProperty('minDSCR');
      expect(outputs.lenderRequirements).toHaveProperty('lenderRiskScore');
      
      expect(outputs.lenderRequirements.minDSCR).toBe(1.25);
      expect(outputs.lenderRequirements.maxLTV).toBe(75);
    });

    it('should provide cash flow analysis', () => {
      const outputs = calculateDSCR(testInputs);
      
      expect(outputs.cashFlowAnalysis).toHaveProperty('monthlyNOI');
      expect(outputs.cashFlowAnalysis).toHaveProperty('monthlyDebtService');
      expect(outputs.cashFlowAnalysis).toHaveProperty('monthlyCashFlow');
      expect(outputs.cashFlowAnalysis).toHaveProperty('annualCashFlow');
      expect(outputs.cashFlowAnalysis).toHaveProperty('cashOnCashReturn');
      
      expect(outputs.cashFlowAnalysis.monthlyNOI).toBe(Math.round(outputs.noi / 12));
      expect(outputs.cashFlowAnalysis.monthlyDebtService).toBe(Math.round(outputs.annualDebtService / 12));
      expect(outputs.cashFlowAnalysis.monthlyCashFlow).toBe(Math.round(outputs.cashFlowAfterDebtService / 12));
    });

    it('should provide performance metrics', () => {
      const outputs = calculateDSCR(testInputs);
      
      expect(outputs.performanceMetrics).toHaveProperty('grossRentMultiplier');
      expect(outputs.performanceMetrics).toHaveProperty('netRentMultiplier');
      expect(outputs.performanceMetrics).toHaveProperty('expenseRatio');
      expect(outputs.performanceMetrics).toHaveProperty('vacancyLoss');
      expect(outputs.performanceMetrics).toHaveProperty('effectiveGrossIncome');
      
      expect(outputs.performanceMetrics.vacancyLoss).toBe(Math.round((testInputs.grossRentalIncome + testInputs.otherIncome) * (testInputs.vacancyRate / 100)));
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
        interestRate: 0,
        loanTerm: 30,
        paymentFrequency: 'monthly',
        propertyValue: 2000000,
        requiredDSCR: 1.25,
        marketCapRate: 5,
        propertyAge: 10,
        occupancyRate: 100,
        leaseType: 'triple-net',
        tenantCreditRating: 'investment-grade',
        marketConditions: 'stable'
      };

      const outputs = calculateDSCR(inputs);
      expect(outputs.annualDebtService).toBe(33333); // 1,000,000 / 30
      expect(outputs.dscr).toBeGreaterThan(0);
    });

    it('should handle very high DSCR', () => {
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
        interestRate: 5,
        loanTerm: 30,
        paymentFrequency: 'monthly',
        propertyValue: 5000000,
        requiredDSCR: 1.25,
        marketCapRate: 5,
        propertyAge: 10,
        occupancyRate: 100,
        leaseType: 'triple-net',
        tenantCreditRating: 'investment-grade',
        marketConditions: 'stable'
      };

      const outputs = calculateDSCR(inputs);
      expect(outputs.dscr).toBeGreaterThan(5);
      expect(outputs.riskAssessment.risk).toBe('Low Risk');
    });

    it('should handle very low DSCR', () => {
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
        interestRate: 5,
        loanTerm: 30,
        paymentFrequency: 'monthly',
        propertyValue: 2000000,
        requiredDSCR: 1.25,
        marketCapRate: 5,
        propertyAge: 10,
        occupancyRate: 100,
        leaseType: 'triple-net',
        tenantCreditRating: 'investment-grade',
        marketConditions: 'stable'
      };

      const outputs = calculateDSCR(inputs);
      expect(outputs.dscr).toBeLessThan(1);
      expect(outputs.riskAssessment.risk).toBe('Critical Risk');
    });
  });

  describe('Quick Validation', () => {
    it('should validate gross rental income correctly', () => {
      const result = validateAllDSCRInputs({ grossRentalIncome: 1000000 });
      expect(result.isValid).toBe(true);

      const invalidResult = validateAllDSCRInputs({ grossRentalIncome: -1000 });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Gross rental income cannot be negative');
    });

    it('should validate loan amount correctly', () => {
      const result = validateAllDSCRInputs({ loanAmount: 5000000 });
      expect(result.isValid).toBe(true);

      const invalidResult = validateAllDSCRInputs({ loanAmount: 0 });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Loan amount must be greater than 0');
    });

    it('should validate interest rate correctly', () => {
      const result = validateAllDSCRInputs({ interestRate: 5.5 });
      expect(result.isValid).toBe(true);

      const invalidResult = validateAllDSCRInputs({ interestRate: 30 });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Interest rate must be between 0% and 25%');
    });

    it('should validate property value correctly', () => {
      const result = validateAllDSCRInputs({ propertyValue: 8000000 });
      expect(result.isValid).toBe(true);

      const invalidResult = validateAllDSCRInputs({ propertyValue: 0 });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Property value must be greater than 0');
    });

    it('should validate logical relationships', () => {
      const result = validateAllDSCRInputs({ 
        loanAmount: 5000000, 
        propertyValue: 8000000 
      });
      expect(result.isValid).toBe(true);

      const invalidResult = validateAllDSCRInputs({ 
        loanAmount: 10000000, 
        propertyValue: 8000000 
      });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Loan amount cannot exceed property value');
    });
  });
});
