import { describe, it, expect, beforeEach } from 'vitest';
import { TripleNetLeaseROICalculator } from './TripleNetLeaseROICalculator';
import { calculateTripleNetLeaseROI, generateTripleNetLeaseROIAnalysis } from './formulas';
import { validateTripleNetLeaseROIInputs } from './validation';
import { validateAllTripleNetLeaseROIInputs } from './quickValidation';

describe('TripleNetLeaseROICalculator', () => {
  let validInputs: any;

  beforeEach(() => {
    validInputs = {
      propertyValue: 1500000,
      downPayment: 300000,
      interestRate: 5.5,
      loanTerm: 25,
      annualRent: 120000,
      propertyTaxes: 18000,
      insurance: 12000,
      maintenance: 8000,
      propertyManagement: 5,
      vacancyRate: 5,
      appreciationRate: 3.0,
      rentEscalation: 2.0,
      leaseTerm: 15,
      tenantCreditRating: 'bbb',
      propertyType: 'retail',
      analysisPeriod: 10,
      closingCosts: 25000,
      exitCapRate: 6.5
    };
  });

  describe('Calculator Structure', () => {
    it('should have correct metadata', () => {
      expect(TripleNetLeaseROICalculator.name).toBe('Triple Net (NNN) Lease ROI Calculator');
      expect(TripleNetLeaseROICalculator.category).toBe('finance');
      expect(TripleNetLeaseROICalculator.description).toContain('triple net');
    });

    it('should have all required input fields', () => {
      const inputFields = TripleNetLeaseROICalculator.inputs;
      expect(inputFields).toBeDefined();
      expect(inputFields.propertyValue).toBeDefined();
      expect(inputFields.downPayment).toBeDefined();
      expect(inputFields.interestRate).toBeDefined();
      expect(inputFields.loanTerm).toBeDefined();
      expect(inputFields.annualRent).toBeDefined();
      expect(inputFields.propertyTaxes).toBeDefined();
      expect(inputFields.insurance).toBeDefined();
      expect(inputFields.maintenance).toBeDefined();
      expect(inputFields.propertyManagement).toBeDefined();
      expect(inputFields.vacancyRate).toBeDefined();
      expect(inputFields.appreciationRate).toBeDefined();
      expect(inputFields.rentEscalation).toBeDefined();
      expect(inputFields.leaseTerm).toBeDefined();
      expect(inputFields.tenantCreditRating).toBeDefined();
      expect(inputFields.propertyType).toBeDefined();
      expect(inputFields.analysisPeriod).toBeDefined();
      expect(inputFields.closingCosts).toBeDefined();
      expect(inputFields.exitCapRate).toBeDefined();
    });

    it('should have all required output fields', () => {
      const outputFields = TripleNetLeaseROICalculator.outputs;
      expect(outputFields).toBeDefined();
      expect(outputFields.monthlyPayment).toBeDefined();
      expect(outputFields.annualDebtService).toBeDefined();
      expect(outputFields.netOperatingIncome).toBeDefined();
      expect(outputFields.cashFlow).toBeDefined();
      expect(outputFields.cashOnCashReturn).toBeDefined();
      expect(outputFields.capRate).toBeDefined();
      expect(outputFields.debtServiceCoverage).toBeDefined();
      expect(outputFields.totalROI).toBeDefined();
      expect(outputFields.internalRateOfReturn).toBeDefined();
      expect(outputFields.netPresentValue).toBeDefined();
      expect(outputFields.paybackPeriod).toBeDefined();
      expect(outputFields.breakEvenOccupancy).toBeDefined();
      expect(outputFields.projectedValue).toBeDefined();
      expect(outputFields.totalReturn).toBeDefined();
      expect(outputFields.annualizedReturn).toBeDefined();
      expect(outputFields.tenantRiskScore).toBeDefined();
      expect(outputFields.investmentScore).toBeDefined();
      expect(outputFields.recommendation).toBeDefined();
    });

    it('should have calculation and report generation functions', () => {
      expect(TripleNetLeaseROICalculator.calculate).toBe(calculateTripleNetLeaseROI);
      expect(TripleNetLeaseROICalculator.generateReport).toBe(generateTripleNetLeaseROIAnalysis);
    });
  });

  describe('Input Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateTripleNetLeaseROIInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.propertyValue;
      
      const result = validateTripleNetLeaseROIInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be a valid number');
    });

    it('should detect OutOfRange values', () => {
      const invalidInputs = { ...validInputs, propertyValue: -100 };
      
      const result = validateTripleNetLeaseROIInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be greater than 0');
    });

    it('should detect logical errors', () => {
      const invalidInputs = { ...validInputs, downPayment: 2000000 };
      
      const result = validateTripleNetLeaseROIInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment must be less than property value');
    });

    it('should provide warnings for unusual values', () => {
      const warningInputs = { ...validInputs, interestRate: 30 };
      
      const result = validateTripleNetLeaseROIInputs(warningInputs);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Interest rate is very high. Verify the value is correct');
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const result = validateAllTripleNetLeaseROIInputs(validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should handle invalid property value', () => {
      const invalidInputs = { ...validInputs, propertyValue: -100 };
      const result = validateAllTripleNetLeaseROIInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Property value must be greater than 0');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic financial metrics correctly', () => {
      const outputs = calculateTripleNetLeaseROI(validInputs);
      
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.annualDebtService).toBeDefined();
      expect(outputs.netOperatingIncome).toBeDefined();
      expect(outputs.cashFlow).toBeDefined();
      expect(outputs.cashOnCashReturn).toBeDefined();
      expect(outputs.capRate).toBeDefined();
      expect(outputs.debtServiceCoverage).toBeDefined();
    });

    it('should calculate investment returns', () => {
      const outputs = calculateTripleNetLeaseROI(validInputs);
      
      expect(outputs.totalROI).toBeDefined();
      expect(outputs.internalRateOfReturn).toBeDefined();
      expect(outputs.netPresentValue).toBeDefined();
      expect(outputs.paybackPeriod).toBeDefined();
      expect(outputs.annualizedReturn).toBeDefined();
    });

    it('should calculate scoring metrics', () => {
      const outputs = calculateTripleNetLeaseROI(validInputs);
      
      expect(outputs.tenantRiskScore).toBeGreaterThanOrEqual(0);
      expect(outputs.tenantRiskScore).toBeLessThanOrEqual(100);
      expect(outputs.investmentScore).toBeGreaterThanOrEqual(0);
      expect(outputs.investmentScore).toBeLessThanOrEqual(100);
    });

    it('should generate recommendations', () => {
      const outputs = calculateTripleNetLeaseROI(validInputs);
      
      expect(outputs.recommendation).toBeDefined();
      expect(typeof outputs.recommendation).toBe('string');
      expect(outputs.recommendation.length).toBeGreaterThan(0);
    });

    it('should handle different tenant credit ratings', () => {
      const aaaInputs = { ...validInputs, tenantCreditRating: 'aaa' };
      const cccInputs = { ...validInputs, tenantCreditRating: 'ccc' };
      
      const aaaOutputs = calculateTripleNetLeaseROI(aaaInputs);
      const cccOutputs = calculateTripleNetLeaseROI(cccInputs);
      
      expect(aaaOutputs.tenantRiskScore).toBeGreaterThan(cccOutputs.tenantRiskScore);
    });

    it('should handle different property types', () => {
      const retailInputs = { ...validInputs, propertyType: 'retail' };
      const medicalInputs = { ...validInputs, propertyType: 'medical' };
      
      const retailOutputs = calculateTripleNetLeaseROI(retailInputs);
      const medicalOutputs = calculateTripleNetLeaseROI(medicalInputs);
      
      expect(retailOutputs.tenantRiskScore).not.toBe(medicalOutputs.tenantRiskScore);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero values appropriately', () => {
      const zeroInputs = { ...validInputs, maintenance: 0 };
      const outputs = calculateTripleNetLeaseROI(zeroInputs);
      
      expect(outputs).toBeDefined();
      expect(outputs.netOperatingIncome).toBeGreaterThan(0);
    });

    it('should handle very high property values', () => {
      const highValueInputs = { ...validInputs, propertyValue: 50000000 };
      const outputs = calculateTripleNetLeaseROI(highValueInputs);
      
      expect(outputs).toBeDefined();
      expect(outputs.capRate).toBeGreaterThan(0);
    });

    it('should handle very high rent', () => {
      const highRentInputs = { ...validInputs, annualRent: 2000000 };
      const outputs = calculateTripleNetLeaseROI(highRentInputs);
      
      expect(outputs).toBeDefined();
      expect(outputs.cashOnCashReturn).toBeGreaterThan(0);
    });

    it('should handle negative cash flow', () => {
      const negativeCashFlowInputs = { ...validInputs, annualRent: 50000 };
      const outputs = calculateTripleNetLeaseROI(negativeCashFlowInputs);
      
      expect(outputs).toBeDefined();
      expect(outputs.cashFlow).toBeLessThan(0);
    });
  });

  describe('Report Generation', () => {
    it('should generate a comprehensive analysis report', () => {
      const outputs = calculateTripleNetLeaseROI(validInputs);
      const report = generateTripleNetLeaseROIAnalysis(validInputs, outputs);
      
      expect(report).toContain('Triple Net (NNN) Lease ROI Analysis');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Financial Performance');
      expect(report).toContain('Property Details');
      expect(report).toContain('Financial Terms');
      expect(report).toContain('Lease Structure (NNN)');
      expect(report).toContain('Market Assumptions');
      expect(report).toContain('Assessment Scores');
      expect(report).toContain('NNN Lease Benefits');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Investment Decision');
    });

    it('should include all key metrics in the report', () => {
      const outputs = calculateTripleNetLeaseROI(validInputs);
      const report = generateTripleNetLeaseROIAnalysis(validInputs, outputs);
      
      expect(report).toContain(outputs.cashOnCashReturn.toString());
      expect(report).toContain(outputs.totalROI.toString());
      expect(report).toContain(outputs.internalRateOfReturn.toString());
      expect(report).toContain(outputs.debtServiceCoverage.toString());
      expect(report).toContain(outputs.capRate.toString());
    });

    it('should include property and financial details', () => {
      const outputs = calculateTripleNetLeaseROI(validInputs);
      const report = generateTripleNetLeaseROIAnalysis(validInputs, outputs);
      
      expect(report).toContain(validInputs.propertyType);
      expect(report).toContain(validInputs.tenantCreditRating.toUpperCase());
      expect(report).toContain(validInputs.propertyValue.toString());
      expect(report).toContain(validInputs.annualRent.toString());
    });

    it('should include NNN lease specific information', () => {
      const outputs = calculateTripleNetLeaseROI(validInputs);
      const report = generateTripleNetLeaseROIAnalysis(validInputs, outputs);
      
      expect(report).toContain('Triple Net Structure');
      expect(report).toContain('(paid by tenant)');
      expect(report).toContain('NNN Lease Benefits');
    });
  });

  describe('Integration Tests', () => {
    it('should work with the complete calculator flow', () => {
      // Test the complete flow from inputs to outputs
      const validation = validateTripleNetLeaseROIInputs(validInputs);
      expect(validation.isValid).toBe(true);
      
      const outputs = calculateTripleNetLeaseROI(validInputs);
      expect(outputs).toBeDefined();
      
      const report = generateTripleNetLeaseROIAnalysis(validInputs, outputs);
      expect(report).toBeDefined();
    });

    it('should handle realistic NNN lease scenarios', () => {
      const realisticInputs = {
        propertyValue: 2500000,
        downPayment: 500000,
        interestRate: 4.5,
        loanTerm: 25,
        annualRent: 180000,
        propertyTaxes: 25000,
        insurance: 15000,
        maintenance: 12000,
        propertyManagement: 4,
        vacancyRate: 3,
        appreciationRate: 2.5,
        rentEscalation: 1.5,
        leaseTerm: 20,
        tenantCreditRating: 'aa',
        propertyType: 'medical',
        analysisPeriod: 15,
        closingCosts: 35000,
        exitCapRate: 5.5
      };
      
      const outputs = calculateTripleNetLeaseROI(realisticInputs);
      
      expect(outputs.cashOnCashReturn).toBeGreaterThan(-50);
      expect(outputs.cashOnCashReturn).toBeLessThan(50);
      expect(outputs.totalROI).toBeGreaterThan(0);
      expect(outputs.totalROI).toBeLessThan(500);
      expect(outputs.internalRateOfReturn).toBeGreaterThan(0);
      expect(outputs.internalRateOfReturn).toBeLessThan(1);
      expect(outputs.tenantRiskScore).toBeGreaterThan(60); // AA credit rating should have good score
    });

    it('should handle high-risk scenarios', () => {
      const highRiskInputs = {
        propertyValue: 1000000,
        downPayment: 100000,
        interestRate: 8.0,
        loanTerm: 20,
        annualRent: 60000,
        propertyTaxes: 15000,
        insurance: 8000,
        maintenance: 5000,
        propertyManagement: 8,
        vacancyRate: 15,
        appreciationRate: 1.0,
        rentEscalation: 0.5,
        leaseTerm: 5,
        tenantCreditRating: 'ccc',
        propertyType: 'restaurant',
        analysisPeriod: 10,
        closingCosts: 15000,
        exitCapRate: 8.0
      };
      
      const outputs = calculateTripleNetLeaseROI(highRiskInputs);
      
      expect(outputs.tenantRiskScore).toBeLessThan(50); // CCC credit rating should have low score
      expect(outputs.investmentScore).toBeLessThan(60); // High risk should have lower investment score
    });
  });
});
