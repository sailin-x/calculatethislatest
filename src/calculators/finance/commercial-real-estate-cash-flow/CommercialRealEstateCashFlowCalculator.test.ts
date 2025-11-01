import { describe, it, expect } from 'vitest';
import { CommercialRealEstateCashFlowCalculator } from './CommercialRealEstateCashFlowCalculator';
import { calculateCashFlow } from './formulas';
import { validateCashFlowInputs } from './validation';
import { validateAllCashFlowInputs } from './quickValidation';

describe('Commercial Real Estate Cash Flow Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(CommercialRealEstateCashFlowCalculator.id).toBe('CommercialRealEstate-CashFlowCalculator');
      expect(CommercialRealEstateCashFlowCalculator.name).toBe('Commercial Real Estate Cash Flow Calculator');
      expect(CommercialRealEstateCashFlowCalculator.category).toBe('finance');
      expect(CommercialRealEstateCashFlowCalculator.subcategory).toBe('business');
    });

    it('should have required input fields', () => {
      const requiredInputs = [
        'propertyType', 'totalUnits', 'occupiedUnits', 'averageRent', 'otherIncome',
        'propertyTax', 'insurance', 'utilities', 'maintenance', 'propertyManagement',
        'hoaFees', 'otherExpenses', 'purchasePrice', 'downPayment', 'loanAmount',
        'interestRate', 'loanTerm', 'closingCosts', 'renovationCosts', 'appreciationRate',
        'inflationRate', 'taxRate', 'depreciationPeriod'
      ];

      const inputIds = CommercialRealEstateCashFlowCalculator.inputs.map(input => input.id);
      requiredInputs.forEach(required => {
        expect(inputIds).toContain(required);
      });
    });

    it('should have required output fields', () => {
      const requiredOutputs = [
        'grossRentalIncome', 'effectiveGrossIncome', 'totalOperatingExpenses', 'netOperatingIncome',
        'annualNOI', 'monthlyMortgagePayment', 'monthlyCashFlow', 'annualCashFlow',
        'cashOnCashReturn', 'capRate', 'totalCashInvested', 'debtServiceCoverage',
        'operatingExpenseRatio', 'vacancyRate', 'breakEvenOccupancy', 'totalReturn',
        'cashFlowProjection', 'investmentAnalysis'
      ];

      const outputIds = CommercialRealEstateCashFlowCalculator.outputs.map(output => output.id);
      requiredOutputs.forEach(required => {
        expect(outputIds).toContain(required);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validInputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const validation = validateCashFlowInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject occupied units exceeding total units', () => {
      const invalidInputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 55, // Exceeds total units
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const validation = validateCashFlowInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Occupied units cannot exceed total units');
    });

    it('should reject invalid property type', () => {
      const invalidInputs = {
        propertyType: 'invalid-type',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const validation = validateCashFlowInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Invalid property type selected');
    });

    it('should reject loan amount exceeding purchase price', () => {
      const invalidInputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 4000000, // Exceeds purchase price
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const validation = validateCashFlowInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Loan amount cannot exceed purchase price');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate apartment building cash flow correctly', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);

      expect(outputs.grossRentalIncome).toBeGreaterThan(0);
      expect(outputs.effectiveGrossIncome).toBeGreaterThan(0);
      expect(outputs.totalOperatingExpenses).toBeGreaterThan(0);
      expect(outputs.netOperatingIncome).toBeGreaterThan(0);
      expect(outputs.annualNOI).toBeGreaterThan(0);
      expect(outputs.monthlyMortgagePayment).toBeGreaterThan(0);
      expect(outputs.monthlyCashFlow).toBeGreaterThan(0);
      expect(outputs.annualCashFlow).toBeGreaterThan(0);
      expect(outputs.cashOnCashReturn).toBeGreaterThan(0);
      expect(outputs.capRate).toBeGreaterThan(0);
      expect(outputs.totalCashInvested).toBeGreaterThan(0);
      expect(outputs.debtServiceCoverage).toBeGreaterThan(0);
      expect(outputs.operatingExpenseRatio).toBeGreaterThan(0);
      expect(outputs.vacancyRate).toBeGreaterThanOrEqual(0);
      expect(outputs.breakEvenOccupancy).toBeGreaterThan(0);
      expect(outputs.totalReturn).toBeGreaterThan(0);
      expect(typeof outputs.cashFlowProjection).toBe('string');
      expect(typeof outputs.investmentAnalysis).toBe('string');
    });

    it('should calculate office building cash flow correctly', () => {
      const inputs = {
        propertyType: 'office',
        totalUnits: 12,
        occupiedUnits: 10,
        averageRent: 3500,
        otherIncome: 2000,
        propertyTax: 25000,
        insurance: 15000,
        utilities: 4000,
        maintenance: 3000,
        propertyManagement: 4.0,
        hoaFees: 0,
        otherExpenses: 2000,
        purchasePrice: 1800000,
        downPayment: 360000,
        loanAmount: 1440000,
        interestRate: 6.0,
        loanTerm: 25,
        closingCosts: 45000,
        renovationCosts: 80000,
        appreciationRate: 2.5,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 39.0
      };

      const outputs = calculateCashFlow(inputs);

      expect(outputs.grossRentalIncome).toBeGreaterThan(0);
      expect(outputs.effectiveGrossIncome).toBeGreaterThan(0);
      expect(outputs.totalOperatingExpenses).toBeGreaterThan(0);
      expect(outputs.netOperatingIncome).toBeGreaterThan(0);
      expect(outputs.annualNOI).toBeGreaterThan(0);
      expect(outputs.monthlyMortgagePayment).toBeGreaterThan(0);
      expect(outputs.monthlyCashFlow).toBeGreaterThan(0);
      expect(outputs.annualCashFlow).toBeGreaterThan(0);
      expect(outputs.cashOnCashReturn).toBeGreaterThan(0);
      expect(outputs.capRate).toBeGreaterThan(0);
    });

    it('should calculate gross rental income correctly', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      
      // Manual calculation verification
      const expectedGrossRentalIncome = 48 * 1800; // $86,400
      expect(outputs.grossRentalIncome).toBe(expectedGrossRentalIncome);
    });

    it('should calculate effective gross income correctly', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      
      // Manual calculation verification
      const expectedEffectiveGrossIncome = (48 * 1800) + 5000; // $91,400
      expect(outputs.effectiveGrossIncome).toBe(expectedEffectiveGrossIncome);
    });

    it('should calculate net operating income correctly', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      
      // Manual calculation verification
      const effectiveGrossIncome = (48 * 1800) + 5000; // $91,400
      const monthlyPropertyTax = 30000 / 12; // $2,500
      const monthlyInsurance = 18000 / 12; // $1,500
      const managementFee = effectiveGrossIncome * 0.05; // $4,570
      const totalOperatingExpenses = monthlyPropertyTax + monthlyInsurance + 8000 + 6000 + managementFee + 0 + 4000; // $28,570
      const expectedNOI = effectiveGrossIncome - totalOperatingExpenses; // $62,830
      
      expect(outputs.netOperatingIncome).toBeCloseTo(expectedNOI, -1);
    });

    it('should calculate CashOnCash return correctly', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      
      // Manual calculation verification
      const totalCashInvested = 700000 + 70000 + 150000; // $920,000
      const expectedCashOnCashReturn = (outputs.annualCashFlow / totalCashInvested) * 100;
      
      expect(outputs.cashOnCashReturn).toBeCloseTo(expectedCashOnCashReturn, 1);
    });

    it('should calculate cap rate correctly', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      
      // Manual calculation verification
      const expectedCapRate = (outputs.annualNOI / 3500000) * 100;
      
      expect(outputs.capRate).toBeCloseTo(expectedCapRate, 1);
    });
  });

  describe('Cash Flow Analysis', () => {
    it('should calculate vacancy rate correctly', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      
      // Manual calculation verification
      const expectedVacancyRate = ((50 - 48) / 50) * 100; // 4%
      expect(outputs.vacancyRate).toBe(expectedVacancyRate);
    });

    it('should calculate debt service coverage correctly', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      
      // Manual calculation verification
      const expectedDebtServiceCoverage = outputs.annualNOI / (outputs.monthlyMortgagePayment * 12);
      
      expect(outputs.debtServiceCoverage).toBeCloseTo(expectedDebtServiceCoverage, 2);
    });

    it('should calculate operating expense ratio correctly', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      
      // Manual calculation verification
      const expectedOperatingExpenseRatio = (outputs.totalOperatingExpenses / outputs.effectiveGrossIncome) * 100;
      
      expect(outputs.operatingExpenseRatio).toBeCloseTo(expectedOperatingExpenseRatio, 1);
    });
  });

  describe('Investment Metrics', () => {
    it('should calculate total cash invested correctly', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      
      // Manual calculation verification
      const expectedTotalCashInvested = 700000 + 70000 + 150000; // $920,000
      expect(outputs.totalCashInvested).toBe(expectedTotalCashInvested);
    });

    it('should calculate break-even occupancy correctly', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      
      expect(outputs.breakEvenOccupancy).toBeGreaterThan(0);
      expect(outputs.breakEvenOccupancy).toBeLessThan(100);
    });

    it('should calculate total return correctly', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      
      expect(outputs.totalReturn).toBeGreaterThan(outputs.cashOnCashReturn);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero other income', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 0,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      expect(outputs.effectiveGrossIncome).toBe(outputs.grossRentalIncome);
    });

    it('should handle zero HOA fees', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      expect(outputs.totalOperatingExpenses).toBeGreaterThan(0);
    });

    it('should handle zero property management fee', () => {
      const inputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const outputs = calculateCashFlow(inputs);
      expect(outputs.totalOperatingExpenses).toBeGreaterThan(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const { validateTotalUnits, validateAverageRent } = require('./quickValidation');

      expect(validateTotalUnits(50).isValid).toBe(true);
      expect(validateTotalUnits(0).isValid).toBe(false);
      expect(validateAverageRent(1800).isValid).toBe(true);
      expect(validateAverageRent(50).isValid).toBe(false);
    });

    it('should validate all inputs comprehensively', () => {
      const validInputs = {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      };

      const validation = validateAllCashFlowInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });
});
