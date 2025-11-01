import { describe, it, expect, beforeEach } from 'vitest';
import { CommercialRealEstateCalculator } from './CommercialRealEstateCalculator';
import { calculateCommercialRealEstate, generateCommercialAnalysis } from './formulas';
import { validateCommercialRealEstateInputs } from './validation';

describe('Commercial Real Estate Calculator', () => {
  let validInputs: Record<string, any>;

  beforeEach(() => {
    validInputs = {
      propertyValue: 2500000,
      purchasePrice: 2300000,
      downPayment: 575000,
      loanAmount: 1725000,
      interestRate: 5.5,
      loanTerm: 25,
      annualRent: 300000,
      vacancyRate: 8.0,
      propertyTax: 45000,
      insurance: 18000,
      utilities: 24000,
      maintenance: 36000,
      propertyManagement: 5.0,
      hoaFees: 0,
      otherExpenses: 12000,
      appreciationRate: 3.0,
      inflationRate: 2.5,
      propertyType: 'office',
      location: 'urban'
    };
  });

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(CommercialRealEstateCalculator.id).toBe('CommercialRealEstate-calculator');
      expect(CommercialRealEstateCalculator.name).toBe('Commercial Real Estate Calculator');
      expect(CommercialRealEstateCalculator.category).toBe('finance');
      expect(CommercialRealEstateCalculator.subcategory).toBe('investment');
    });

    it('should have all required inputs', () => {
      const inputIds = CommercialRealEstateCalculator.inputs.map(input => input.id);
      const requiredInputs = [
        'propertyValue', 'purchasePrice', 'downPayment', 'loanAmount', 'interestRate',
        'loanTerm', 'annualRent', 'vacancyRate', 'propertyTax', 'insurance',
        'utilities', 'maintenance', 'propertyManagement', 'hoaFees', 'otherExpenses',
        'appreciationRate', 'inflationRate', 'propertyType', 'location'
      ];
      
      requiredInputs.forEach(inputId => {
        expect(inputIds).toContain(inputId);
      });
    });

    it('should have all required outputs', () => {
      const outputIds = CommercialRealEstateCalculator.outputs.map(output => output.id);
      const requiredOutputs = [
        'monthlyPayment', 'effectiveGrossIncome', 'totalExpenses', 'netOperatingIncome',
        'monthlyCashFlow', 'annualCashFlow', 'capRate', 'cashOnCashReturn', 'totalReturn',
        'operatingExpenseRatio', 'debtServiceCoverageRatio', 'breakEvenOccupancy',
        'investmentGrade', 'riskAssessment', 'recommendations'
      ];
      
      requiredOutputs.forEach(outputId => {
        expect(outputIds).toContain(outputId);
      });
    });

    it('should have comprehensive examples', () => {
      expect(CommercialRealEstateCalculator.examples.length).toBeGreaterThan(0);
      CommercialRealEstateCalculator.examples.forEach(example => {
        expect(example.name).toBeDefined();
        expect(example.description).toBeDefined();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const incompleteInputs = { propertyValue: 2500000 };
      const result = validateCommercialRealEstateInputs(incompleteInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate property value range', () => {
      const lowValueInputs = { ...validInputs, propertyValue: 50000 };
      const result = validateCommercialRealEstateInputs(lowValueInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('property value'))).toBe(true);
    });

    it('should validate annual rent range', () => {
      const lowRentInputs = { ...validInputs, annualRent: 5000 };
      const result = validateCommercialRealEstateInputs(lowRentInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('annual rent'))).toBe(true);
    });

    it('should validate interest rate range', () => {
      const highRateInputs = { ...validInputs, interestRate: 20 };
      const result = validateCommercialRealEstateInputs(highRateInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('interest rate'))).toBe(true);
    });

    it('should validate LoanToValue ratio', () => {
      const highLTVInputs = { ...validInputs, loanAmount: 2000000 };
      const result = validateCommercialRealEstateInputs(highLTVInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('LoanToValue'))).toBe(true);
    });

    it('should validate down payment percentage', () => {
      const lowDownInputs = { ...validInputs, downPayment: 200000 };
      const result = validateCommercialRealEstateInputs(lowDownInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('Down payment'))).toBe(true);
    });

    it('should provide warnings for business rule violations', () => {
      const highExpenseInputs = { ...validInputs, propertyTax: 500000 };
      const result = validateCommercialRealEstateInputs(highExpenseInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should accept valid inputs', () => {
      const result = validateCommercialRealEstateInputs(validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Formula Calculations', () => {
    it('should calculate commercial real estate metrics correctly', () => {
      const metrics = calculateCommercialRealEstate(validInputs);
      
      expect(metrics.monthlyPayment).toBeGreaterThan(0);
      expect(metrics.effectiveGrossIncome).toBeGreaterThan(0);
      expect(metrics.totalExpenses).toBeGreaterThan(0);
      expect(metrics.netOperatingIncome).toBeGreaterThan(0);
      expect(metrics.monthlyCashFlow).toBeDefined();
      expect(metrics.annualCashFlow).toBeDefined();
      expect(metrics.capRate).toBeGreaterThan(0);
      expect(metrics.cashOnCashReturn).toBeDefined();
      expect(metrics.totalReturn).toBeDefined();
      expect(metrics.operatingExpenseRatio).toBeGreaterThan(0);
      expect(metrics.debtServiceCoverageRatio).toBeGreaterThan(0);
      expect(metrics.breakEvenOccupancy).toBeGreaterThan(0);
    });

    it('should calculate NOI correctly', () => {
      const metrics = calculateCommercialRealEstate(validInputs);
      
      const expectedNOI = metrics.effectiveGrossIncome - metrics.totalExpenses;
      expect(Math.abs(metrics.netOperatingIncome - expectedNOI)).toBeLessThan(0.01);
    });

    it('should calculate cap rate correctly', () => {
      const metrics = calculateCommercialRealEstate(validInputs);
      
      const expectedCapRate = (metrics.netOperatingIncome / validInputs.propertyValue) * 100;
      expect(Math.abs(metrics.capRate - expectedCapRate)).toBeLessThan(0.01);
    });

    it('should calculate CashOnCash return correctly', () => {
      const metrics = calculateCommercialRealEstate(validInputs);
      
      const expectedCashOnCash = (metrics.annualCashFlow / validInputs.downPayment) * 100;
      expect(Math.abs(metrics.cashOnCashReturn - expectedCashOnCash)).toBeLessThan(0.01);
    });

    it('should calculate debt service coverage ratio correctly', () => {
      const metrics = calculateCommercialRealEstate(validInputs);
      
      const annualDebtService = metrics.monthlyPayment * 12;
      const expectedDSCR = metrics.netOperatingIncome / annualDebtService;
      expect(Math.abs(metrics.debtServiceCoverageRatio - expectedDSCR)).toBeLessThan(0.01);
    });

    it('should handle different property types correctly', () => {
      const officeInputs = { ...validInputs, propertyType: 'office' };
      const retailInputs = { ...validInputs, propertyType: 'retail' };
      
      const officeResult = calculateCommercialRealEstate(officeInputs);
      const retailResult = calculateCommercialRealEstate(retailInputs);
      
      // Should have same calculations for same inputs (property type doesn't affect calculation)
      expect(officeResult.capRate).toBe(retailResult.capRate);
    });

    it('should handle different vacancy rates correctly', () => {
      const lowVacancyInputs = { ...validInputs, vacancyRate: 3.0 };
      const highVacancyInputs = { ...validInputs, vacancyRate: 15.0 };
      
      const lowVacancyResult = calculateCommercialRealEstate(lowVacancyInputs);
      const highVacancyResult = calculateCommercialRealEstate(highVacancyInputs);
      
      // Lower vacancy should result in higher NOI and cap rate
      expect(lowVacancyResult.netOperatingIncome).toBeGreaterThan(highVacancyResult.netOperatingIncome);
      expect(lowVacancyResult.capRate).toBeGreaterThan(highVacancyResult.capRate);
    });

    it('should handle different interest rates correctly', () => {
      const lowRateInputs = { ...validInputs, interestRate: 4.0 };
      const highRateInputs = { ...validInputs, interestRate: 7.0 };
      
      const lowRateResult = calculateCommercialRealEstate(lowRateInputs);
      const highRateResult = calculateCommercialRealEstate(highRateInputs);
      
      // Lower interest rate should result in higher cash flow
      expect(lowRateResult.monthlyCashFlow).toBeGreaterThan(highRateResult.monthlyCashFlow);
    });
  });

  describe('Commercial Analysis', () => {
    it('should generate commercial analysis', () => {
      const commercialMetrics = calculateCommercialRealEstate(validInputs);
      const analysis = generateCommercialAnalysis(validInputs, commercialMetrics);
      
      expect(analysis.investmentGrade).toBeDefined();
      expect(analysis.riskAssessment).toBeDefined();
      expect(analysis.recommendations).toBeDefined();
    });

    it('should provide meaningful investment grade', () => {
      const commercialMetrics = calculateCommercialRealEstate(validInputs);
      const analysis = generateCommercialAnalysis(validInputs, commercialMetrics);
      
      expect(analysis.investmentGrade).toMatch(/[A-C][+-]?/);
      expect(analysis.investmentGrade.length).toBeGreaterThan(20);
    });

    it('should provide risk assessment', () => {
      const commercialMetrics = calculateCommercialRealEstate(validInputs);
      const analysis = generateCommercialAnalysis(validInputs, commercialMetrics);
      
      expect(analysis.riskAssessment).toContain('Risk Assessment');
      expect(analysis.riskAssessment.length).toBeGreaterThan(50);
    });

    it('should provide recommendations', () => {
      const commercialMetrics = calculateCommercialRealEstate(validInputs);
      const analysis = generateCommercialAnalysis(validInputs, commercialMetrics);
      
      expect(analysis.recommendations).toContain('Recommendations');
      expect(analysis.recommendations.length).toBeGreaterThan(50);
    });
  });

  describe('Main Calculator Function', () => {
    it('should calculate all outputs correctly', () => {
      const result = CommercialRealEstateCalculator.calculate(validInputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.effectiveGrossIncome).toBeGreaterThan(0);
      expect(result.totalExpenses).toBeGreaterThan(0);
      expect(result.netOperatingIncome).toBeGreaterThan(0);
      expect(result.monthlyCashFlow).toBeDefined();
      expect(result.annualCashFlow).toBeDefined();
      expect(result.capRate).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeDefined();
      expect(result.totalReturn).toBeDefined();
      expect(result.operatingExpenseRatio).toBeGreaterThan(0);
      expect(result.debtServiceCoverageRatio).toBeGreaterThan(0);
      expect(result.breakEvenOccupancy).toBeGreaterThan(0);
      expect(result.investmentGrade).toBeDefined();
      expect(result.riskAssessment).toBeDefined();
      expect(result.recommendations).toBeDefined();
    });

    it('should throw error for invalid inputs', () => {
      const invalidInputs = { ...validInputs, propertyValue: -1000 };
      
      expect(() => {
        CommercialRealEstateCalculator.calculate(invalidInputs);
      }).toThrow();
    });

    it('should handle edge cases gracefully', () => {
      const edgeCaseInputs = { ...validInputs, annualRent: 5000, propertyValue: 100000 };
      const result = CommercialRealEstateCalculator.calculate(edgeCaseInputs);
      
      expect(result.netOperatingIncome).toBeDefined();
      expect(result.capRate).toBeDefined();
    });

    it('should match example calculations within tolerance', () => {
      const example = CommercialRealEstateCalculator.examples[0];
      const result = CommercialRealEstateCalculator.calculate(example.inputs);
      
      const noiAccuracy = Math.abs((result.netOperatingIncome - example.expectedOutputs.netOperatingIncome) / example.expectedOutputs.netOperatingIncome) * 100;
      const capRateAccuracy = Math.abs((result.capRate - example.expectedOutputs.capRate) / example.expectedOutputs.capRate) * 100;
      
      expect(noiAccuracy).toBeLessThan(20);
      expect(capRateAccuracy).toBeLessThan(20);
    });
  });

  describe('Performance', () => {
    it('should complete calculations quickly', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        CommercialRealEstateCalculator.calculate(validInputs);
      }
      
      const endTime = performance.now();
      const avgTime = (endTime - startTime) / 100;
      
      expect(avgTime).toBeLessThan(10); // Should complete in less than 10ms per calculation
    });
  });

  describe('Business Logic', () => {
    it('should show realistic commercial real estate values', () => {
      const result = CommercialRealEstateCalculator.calculate(validInputs);
      
      // Cap rate should be reasonable for commercial properties
      expect(result.capRate).toBeGreaterThan(3);
      expect(result.capRate).toBeLessThan(15);
    });

    it('should handle positive and negative cash flow', () => {
      const negativeCashFlowInputs = { ...validInputs, annualRent: 200000 };
      const positiveCashFlowInputs = { ...validInputs, annualRent: 400000 };
      
      const negativeResult = CommercialRealEstateCalculator.calculate(negativeCashFlowInputs);
      const positiveResult = CommercialRealEstateCalculator.calculate(positiveCashFlowInputs);
      
      expect(negativeResult.monthlyCashFlow).toBeLessThan(positiveResult.monthlyCashFlow);
    });

    it('should calculate debt service coverage ratio appropriately', () => {
      const result = CommercialRealEstateCalculator.calculate(validInputs);
      
      // DSCR should be reasonable
      expect(result.debtServiceCoverageRatio).toBeGreaterThan(0.5);
      expect(result.debtServiceCoverageRatio).toBeLessThan(5);
    });

    it('should provide meaningful operating expense ratio', () => {
      const result = CommercialRealEstateCalculator.calculate(validInputs);
      
      // Operating expense ratio should be reasonable
      expect(result.operatingExpenseRatio).toBeGreaterThan(20);
      expect(result.operatingExpenseRatio).toBeLessThan(90);
    });

    it('should calculate break-even occupancy correctly', () => {
      const result = CommercialRealEstateCalculator.calculate(validInputs);
      
      // Break-even occupancy should be reasonable
      expect(result.breakEvenOccupancy).toBeGreaterThan(50);
      expect(result.breakEvenOccupancy).toBeLessThan(100);
    });
  });
});
