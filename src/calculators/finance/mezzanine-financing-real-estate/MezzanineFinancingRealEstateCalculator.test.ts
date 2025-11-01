import { describe, it, expect } from 'vitest';
import { mezzanineFinancingRealEstateCalculator } from './MezzanineFinancingRealEstateCalculator';
import { calculateMezzanineFinancingMetrics, generateMezzanineFinancingReport } from './formulas';
import { validateMezzanineFinancingRealEstateInputs } from './validation';
import { MezzanineFinancingRealEstateInputs } from './types';

describe('Mezzanine Financing Real Estate Calculator', () => {
  const validInputs: MezzanineFinancingRealEstateInputs = {
    propertyValue: 5000000,
    purchasePrice: 4800000,
    seniorLoanAmount: 3000000,
    mezzanineLoanAmount: 1200000,
    equityContribution: 600000,
    seniorInterestRate: 4.5,
    mezzanineInterestRate: 12.0,
    seniorLoanTerm: 25,
    mezzanineLoanTerm: 5,
    netOperatingIncome: 400000,
    propertyType: 'office',
    location: 'Downtown',
    appreciationRate: 3.0,
    inflationRate: 2.5,
    exitStrategy: 'refinance',
    holdingPeriod: 5
  };

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(mezzanineFinancingRealEstateCalculator.id).toBe('MezzanineFinancingReal-estate');
      expect(mezzanineFinancingRealEstateCalculator.name).toBe('Mezzanine Financing Real Estate Calculator');
      expect(mezzanineFinancingRealEstateCalculator.category).toBe('finance');
      expect(mezzanineFinancingRealEstateCalculator.tags).toContain('mezzanine');
      expect(mezzanineFinancingRealEstateCalculator.tags).toContain('real-estate');
    });

    it('should have all required input fields', () => {
      const inputs = mezzanineFinancingRealEstateCalculator.inputs;
      expect(inputs.propertyValue).toBeDefined();
      expect(inputs.purchasePrice).toBeDefined();
      expect(inputs.seniorLoanAmount).toBeDefined();
      expect(inputs.mezzanineLoanAmount).toBeDefined();
      expect(inputs.equityContribution).toBeDefined();
      expect(inputs.seniorInterestRate).toBeDefined();
      expect(inputs.mezzanineInterestRate).toBeDefined();
      expect(inputs.seniorLoanTerm).toBeDefined();
      expect(inputs.mezzanineLoanTerm).toBeDefined();
      expect(inputs.netOperatingIncome).toBeDefined();
    });

    it('should have all required output fields', () => {
      const outputs = mezzanineFinancingRealEstateCalculator.outputs;
      expect(outputs.totalFinancing).toBeDefined();
      expect(outputs.seniorLoanPayment).toBeDefined();
      expect(outputs.mezzanineLoanPayment).toBeDefined();
      expect(outputs.totalDebtService).toBeDefined();
      expect(outputs.cashFlow).toBeDefined();
      expect(outputs.cashOnCashReturn).toBeDefined();
      expect(outputs.totalLTV).toBeDefined();
      expect(outputs.seniorLTV).toBeDefined();
      expect(outputs.mezzanineLTV).toBeDefined();
      expect(outputs.debtServiceCoverageRatio).toBeDefined();
      expect(outputs.breakEvenOccupancy).toBeDefined();
      expect(outputs.irr).toBeDefined();
      expect(outputs.analysis).toBeDefined();
    });
  });

  describe('Formulas', () => {
    it('should calculate mezzanine financing metrics correctly', () => {
      const metrics = calculateMezzanineFinancingMetrics(validInputs);
      
      // Basic calculations
      expect(metrics.totalFinancing).toBe(4800000); // 3000000 + 1200000 + 600000
      expect(metrics.seniorLTV).toBeCloseTo(60, 1); // (3000000 / 5000000) * 100
      expect(metrics.mezzanineLTV).toBeCloseTo(24, 1); // (1200000 / 5000000) * 100
      expect(metrics.totalLTV).toBeCloseTo(84, 1); // (4200000 / 5000000) * 100
      
      // Payment calculations
      expect(metrics.seniorLoanPayment).toBeGreaterThan(0);
      expect(metrics.mezzanineLoanPayment).toBeGreaterThan(0);
      expect(metrics.totalDebtService).toBe(metrics.seniorLoanPayment + metrics.mezzanineLoanPayment);
      
      // Cash flow calculations
      expect(metrics.cashFlow).toBeDefined();
      expect(metrics.cashOnCashReturn).toBeDefined();
      expect(metrics.debtServiceCoverageRatio).toBeDefined();
      
      // Investment metrics
      expect(metrics.irr).toBeDefined();
      expect(metrics.breakEvenOccupancy).toBeDefined();
    });

    it('should handle different financing structures', () => {
      const highLeverageInputs = { ...validInputs, seniorLoanAmount: 3500000, mezzanineLoanAmount: 1000000, equityContribution: 300000 };
      const metrics = calculateMezzanineFinancingMetrics(highLeverageInputs);
      
      expect(metrics.totalLTV).toBeCloseTo(90, 1); // (4500000 / 5000000) * 100
      expect(metrics.seniorLTV).toBeCloseTo(70, 1); // (3500000 / 5000000) * 100
    });

    it('should generate mezzanine financing report', () => {
      const metrics = calculateMezzanineFinancingMetrics(validInputs);
      const report = generateMezzanineFinancingReport(validInputs, metrics);
      
      expect(report).toContain('Mezzanine Financing Analysis');
      expect(report).toContain('Office');
      expect(report).toContain('$5,000,000');
      expect(report).toContain('RECOMMENDATIONS');
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateMezzanineFinancingRealEstateInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid property value', () => {
      const invalidInputs = { ...validInputs, propertyValue: 0 };
      const validation = validateMezzanineFinancingRealEstateInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Property value must be greater than 0');
    });

    it('should reject purchase price exceeding property value', () => {
      const invalidInputs = { ...validInputs, purchasePrice: 6000000 };
      const validation = validateMezzanineFinancingRealEstateInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Purchase price cannot exceed property value');
    });

    it('should reject invalid senior loan amount', () => {
      const invalidInputs = { ...validInputs, seniorLoanAmount: 0 };
      const validation = validateMezzanineFinancingRealEstateInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Senior loan amount must be greater than 0');
    });

    it('should reject invalid mezzanine loan amount', () => {
      const invalidInputs = { ...validInputs, mezzanineLoanAmount: 0 };
      const validation = validateMezzanineFinancingRealEstateInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Mezzanine loan amount must be greater than 0');
    });

    it('should reject mezzanine rate lower than senior rate', () => {
      const invalidInputs = { ...validInputs, mezzanineInterestRate: 3.0 };
      const validation = validateMezzanineFinancingRealEstateInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Mezzanine interest rate must be higher than senior interest rate');
    });

    it('should reject mezzanine term exceeding senior term', () => {
      const invalidInputs = { ...validInputs, mezzanineLoanTerm: 30 };
      const validation = validateMezzanineFinancingRealEstateInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Mezzanine loan term cannot exceed senior loan term');
    });

    it('should reject total LTV exceeding 95%', () => {
      const invalidInputs = { ...validInputs, seniorLoanAmount: 4000000, mezzanineLoanAmount: 1000000 };
      const validation = validateMezzanineFinancingRealEstateInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Total LoanToValue ratio cannot exceed 95%');
    });

    it('should reject financing not equaling purchase price', () => {
      const invalidInputs = { ...validInputs, equityContribution: 1000000 };
      const validation = validateMezzanineFinancingRealEstateInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Total financing must equal purchase price');
    });
  });

  describe('Calculator Integration', () => {
    it('should calculate results with valid inputs', () => {
      const results = mezzanineFinancingRealEstateCalculator.calculate(validInputs);
      
      expect(results.totalFinancing).toBe(4800000);
      expect(results.seniorLoanPayment).toBeGreaterThan(0);
      expect(results.mezzanineLoanPayment).toBeGreaterThan(0);
      expect(results.totalDebtService).toBeDefined();
      expect(results.cashFlow).toBeDefined();
      expect(results.cashOnCashReturn).toBeDefined();
      expect(results.totalLTV).toBeDefined();
      expect(results.seniorLTV).toBeDefined();
      expect(results.mezzanineLTV).toBeDefined();
      expect(results.debtServiceCoverageRatio).toBeDefined();
      expect(results.breakEvenOccupancy).toBeDefined();
      expect(results.irr).toBeDefined();
      expect(results.analysis).toBeDefined();
    });

    it('should throw error with invalid inputs', () => {
      const invalidInputs = { ...validInputs, propertyValue: 0 };
      
      expect(() => {
        mezzanineFinancingRealEstateCalculator.calculate(invalidInputs);
      }).toThrow('Invalid inputs');
    });
  });

  describe('Business Logic', () => {
    it('should calculate LTV ratios correctly', () => {
      const results = mezzanineFinancingRealEstateCalculator.calculate(validInputs);
      
      expect(results.seniorLTV).toBeCloseTo(60, 1);
      expect(results.mezzanineLTV).toBeCloseTo(24, 1);
      expect(results.totalLTV).toBeCloseTo(84, 1);
    });

    it('should calculate debt service coverage ratio correctly', () => {
      const results = mezzanineFinancingRealEstateCalculator.calculate(validInputs);
      
      const expectedDSCR = validInputs.netOperatingIncome / (results.totalDebtService * 12);
      expect(results.debtServiceCoverageRatio).toBeCloseTo(expectedDSCR, 2);
    });

    it('should calculate CashOnCash return correctly', () => {
      const results = mezzanineFinancingRealEstateCalculator.calculate(validInputs);
      
      const expectedCOC = (results.cashFlow * 12) / validInputs.equityContribution * 100;
      expect(results.cashOnCashReturn).toBeCloseTo(expectedCOC, 1);
    });
  });
});
