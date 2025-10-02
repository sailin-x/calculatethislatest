import { describe, it, expect } from 'vitest';
import { SelfStorageROICalculator } from './SelfStorageROICalculator';
import { validateSelfStorageROIInputs } from './validation';
import { validateAllSelfStorageROIInputs } from './quickValidation';
import { calculateSelfStorageROI, generateSelfStorageROIAnalysis } from './formulas';
import { CalculatorInputs, CalculatorOutputs } from '../../types/calculator';

describe('SelfStorageROICalculator', () => {
  it('should have correct calculator structure', () => {
    expect(SelfStorageROICalculator.id).toBe('self-storage-roi-calculator');
    expect(SelfStorageROICalculator.name).toBe('Self-Storage Facility ROI Calculator');
    expect(SelfStorageROICalculator.category).toBe('finance');
    expect(SelfStorageROICalculator.subcategory).toBe('real-estate');
    expect(SelfStorageROICalculator.description).toContain('Calculate ROI');
    expect(SelfStorageROICalculator.inputs).toHaveLength(20);
    expect(SelfStorageROICalculator.outputs).toHaveLength(20);
    expect(typeof SelfStorageROICalculator.calculate).toBe('function');
    expect(typeof SelfStorageROICalculator.generateReport).toBe('function');
  });

  it('should have all required input fields', () => {
    const inputIds = SelfStorageROICalculator.inputs.map(input => input.id);
    const requiredInputs = [
      'facilitySize', 'unitCount', 'averageUnitSize', 'purchasePrice', 'downPayment',
      'interestRate', 'loanTerm', 'averageRentPerSqFt', 'occupancyRate', 'annualExpenses',
      'propertyTaxes', 'insurance', 'utilities', 'maintenance', 'managementFee',
      'appreciationRate', 'analysisPeriod', 'rentIncreaseRate', 'expenseIncreaseRate', 'vacancyLoss'
    ];
    
    requiredInputs.forEach(inputId => {
      expect(inputIds).toContain(inputId);
    });
  });

  it('should have all required output fields', () => {
    const outputIds = SelfStorageROICalculator.outputs.map(output => output.id);
    const requiredOutputs = [
      'monthlyPayment', 'annualRentalIncome', 'annualOperatingIncome', 'annualCashFlow',
      'cashOnCashReturn', 'capRate', 'totalROI', 'breakEvenOccupancy', 'debtServiceCoverage',
      'profitabilityScore', 'investmentScore', 'riskScore', 'valueScore', 'projectedValue',
      'totalReturn', 'netPresentValue', 'internalRateOfReturn', 'paybackPeriod',
      'monthlyCashFlow', 'annualizedReturn'
    ];
    
    requiredOutputs.forEach(outputId => {
      expect(outputIds).toContain(outputId);
    });
  });
});

describe('Self-Storage ROI Validation', () => {
  const validInputs: CalculatorInputs = {
    facilitySize: 50000,
    unitCount: 400,
    averageUnitSize: 125,
    purchasePrice: 2500000,
    downPayment: 500000,
    interestRate: 5.5,
    loanTerm: 25,
    averageRentPerSqFt: 1.25,
    occupancyRate: 85,
    annualExpenses: 150000,
    propertyTaxes: 25000,
    insurance: 15000,
    utilities: 20000,
    maintenance: 30000,
    managementFee: 5,
    appreciationRate: 3,
    analysisPeriod: 10,
    rentIncreaseRate: 2.5,
    expenseIncreaseRate: 2,
    vacancyLoss: 5
  };

  it('should validate correct inputs successfully', () => {
    const result = validateSelfStorageROIInputs(validInputs);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should validate inputs with quick validation successfully', () => {
    const result = validateAllSelfStorageROIInputs(validInputs);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject missing required fields', () => {
    const invalidInputs = { ...validInputs };
    delete invalidInputs.facilitySize;
    
    const result = validateSelfStorageROIInputs(invalidInputs);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('facilitySize is required');
  });

  it('should reject out-of-range facility size', () => {
    const invalidInputs = { ...validInputs, facilitySize: 500 };
    
    const result = validateSelfStorageROIInputs(invalidInputs);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Facility size must be between 1,000 and 1,000,000 sq ft');
  });

  it('should reject invalid down payment', () => {
    const invalidInputs = { ...validInputs, downPayment: 3000000 };
    
    const result = validateSelfStorageROIInputs(invalidInputs);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Down payment cannot be greater than or equal to purchase price');
  });

  it('should reject negative interest rate', () => {
    const invalidInputs = { ...validInputs, interestRate: -1 };
    
    const result = validateSelfStorageROIInputs(invalidInputs);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Interest rate must be between 1% and 15%');
  });

  it('should reject occupancy rate over 100%', () => {
    const invalidInputs = { ...validInputs, occupancyRate: 110 };
    
    const result = validateSelfStorageROIInputs(invalidInputs);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Occupancy rate must be between 50% and 100%');
  });

  it('should provide warnings for low occupancy rate', () => {
    const lowOccupancyInputs = { ...validInputs, occupancyRate: 65 };
    
    const result = validateSelfStorageROIInputs(lowOccupancyInputs);
    expect(result.isValid).toBe(true);
    expect(result.warnings).toContain('Low occupancy rate may indicate market challenges or management issues.');
  });

  it('should provide warnings for high management fee', () => {
    const highFeeInputs = { ...validInputs, managementFee: 12 };
    
    const result = validateSelfStorageROIInputs(highFeeInputs);
    expect(result.isValid).toBe(true);
    expect(result.warnings).toContain('High management fee may significantly impact profitability.');
  });
});

describe('Self-Storage ROI Calculation', () => {
  const testInputs: CalculatorInputs = {
    facilitySize: 50000,
    unitCount: 400,
    averageUnitSize: 125,
    purchasePrice: 2500000,
    downPayment: 500000,
    interestRate: 5.5,
    loanTerm: 25,
    averageRentPerSqFt: 1.25,
    occupancyRate: 85,
    annualExpenses: 150000,
    propertyTaxes: 25000,
    insurance: 15000,
    utilities: 20000,
    maintenance: 30000,
    managementFee: 5,
    appreciationRate: 3,
    analysisPeriod: 10,
    rentIncreaseRate: 2.5,
    expenseIncreaseRate: 2,
    vacancyLoss: 5
  };

  it('should calculate ROI metrics correctly', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    
    expect(outputs.monthlyPayment).toBeGreaterThan(0);
    expect(outputs.annualRentalIncome).toBeGreaterThan(0);
    expect(outputs.annualOperatingIncome).toBeGreaterThan(0);
    expect(outputs.cashOnCashReturn).toBeGreaterThan(0);
    expect(outputs.capRate).toBeGreaterThan(0);
    expect(outputs.totalROI).toBeGreaterThan(0);
    expect(outputs.debtServiceCoverage).toBeGreaterThan(0);
    expect(outputs.profitabilityScore).toBeGreaterThanOrEqual(0);
    expect(outputs.profitabilityScore).toBeLessThanOrEqual(100);
    expect(outputs.investmentScore).toBeGreaterThanOrEqual(0);
    expect(outputs.investmentScore).toBeLessThanOrEqual(100);
    expect(outputs.riskScore).toBeGreaterThanOrEqual(0);
    expect(outputs.riskScore).toBeLessThanOrEqual(100);
    expect(outputs.valueScore).toBeGreaterThanOrEqual(0);
    expect(outputs.valueScore).toBeLessThanOrEqual(100);
  });

  it('should calculate monthly payment correctly', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const loanAmount = testInputs.purchasePrice as number - testInputs.downPayment as number;
    const monthlyRate = (testInputs.interestRate as number) / 100 / 12;
    const totalPayments = (testInputs.loanTerm as number) * 12;
    const expectedPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                           (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    expect(outputs.monthlyPayment).toBeCloseTo(expectedPayment, 2);
  });

  it('should calculate annual rental income correctly', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const effectiveOccupancyRate = (testInputs.occupancyRate as number) / 100 * (1 - (testInputs.vacancyLoss as number) / 100);
    const expectedIncome = (testInputs.facilitySize as number) * (testInputs.averageRentPerSqFt as number) * 12 * effectiveOccupancyRate;
    
    expect(outputs.annualRentalIncome).toBeCloseTo(expectedIncome, 2);
  });

  it('should calculate cash-on-cash return correctly', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const expectedCoC = (outputs.annualCashFlow / (testInputs.downPayment as number)) * 100;
    
    expect(outputs.cashOnCashReturn).toBeCloseTo(expectedCoC, 2);
  });

  it('should calculate cap rate correctly', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const expectedCapRate = (outputs.annualOperatingIncome / (testInputs.purchasePrice as number)) * 100;
    
    expect(outputs.capRate).toBeCloseTo(expectedCapRate, 2);
  });

  it('should calculate debt service coverage correctly', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const expectedDSCR = outputs.annualOperatingIncome / (outputs.monthlyPayment * 12);
    
    expect(outputs.debtServiceCoverage).toBeCloseTo(expectedDSCR, 2);
  });

  it('should handle negative cash flow scenarios', () => {
    const negativeCashFlowInputs = {
      ...testInputs,
      occupancyRate: 50,
      averageRentPerSqFt: 0.5
    };
    
    const outputs = calculateSelfStorageROI(negativeCashFlowInputs);
    
    expect(outputs.annualCashFlow).toBeLessThan(0);
    expect(outputs.cashOnCashReturn).toBeLessThan(0);
  });

  it('should calculate break-even occupancy correctly', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    
    expect(outputs.breakEvenOccupancy).toBeGreaterThan(0);
    expect(outputs.breakEvenOccupancy).toBeLessThan(100);
  });

  it('should calculate projected value correctly', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const expectedValue = (testInputs.purchasePrice as number) * Math.pow(1 + (testInputs.appreciationRate as number) / 100, testInputs.analysisPeriod as number);
    
    expect(outputs.projectedValue).toBeCloseTo(expectedValue, 2);
  });

  it('should calculate total ROI correctly', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const expectedTotalReturn = outputs.projectedValue - (testInputs.purchasePrice as number) + (outputs.annualCashFlow * (testInputs.analysisPeriod as number));
    const expectedROI = (expectedTotalReturn / (testInputs.downPayment as number)) * 100;
    
    expect(outputs.totalROI).toBeCloseTo(expectedROI, 2);
  });

  it('should calculate scoring metrics within valid ranges', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    
    [outputs.profitabilityScore, outputs.investmentScore, outputs.riskScore, outputs.valueScore].forEach(score => {
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });
  });

  it('should handle edge case with very low occupancy', () => {
    const lowOccupancyInputs = { ...testInputs, occupancyRate: 55 };
    
    const outputs = calculateSelfStorageROI(lowOccupancyInputs);
    
    expect(outputs.annualRentalIncome).toBeGreaterThan(0);
    expect(outputs.breakEvenOccupancy).toBeGreaterThan(55);
  });

  it('should handle edge case with high interest rate', () => {
    const highRateInputs = { ...testInputs, interestRate: 12 };
    
    const outputs = calculateSelfStorageROI(highRateInputs);
    
    expect(outputs.monthlyPayment).toBeGreaterThan(0);
    expect(outputs.debtServiceCoverage).toBeLessThan(testInputs.interestRate as number);
  });
});

describe('Self-Storage ROI Report Generation', () => {
  const testInputs: CalculatorInputs = {
    facilitySize: 50000,
    unitCount: 400,
    averageUnitSize: 125,
    purchasePrice: 2500000,
    downPayment: 500000,
    interestRate: 5.5,
    loanTerm: 25,
    averageRentPerSqFt: 1.25,
    occupancyRate: 85,
    annualExpenses: 150000,
    propertyTaxes: 25000,
    insurance: 15000,
    utilities: 20000,
    maintenance: 30000,
    managementFee: 5,
    appreciationRate: 3,
    analysisPeriod: 10,
    rentIncreaseRate: 2.5,
    expenseIncreaseRate: 2,
    vacancyLoss: 5
  };

  it('should generate comprehensive analysis report', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const report = generateSelfStorageROIAnalysis(testInputs, outputs);
    
    expect(report).toContain('Self-Storage Facility ROI Analysis');
    expect(report).toContain('Executive Summary');
    expect(report).toContain('Financial Performance');
    expect(report).toContain('Investment Returns');
    expect(report).toContain('Risk Assessment');
    expect(report).toContain('Cash Flow Projection');
    expect(report).toContain('Occupancy Sensitivity Analysis');
    expect(report).toContain('Property Valuation');
    expect(report).toContain('Market Analysis');
    expect(report).toContain('Recommendations');
    expect(report).toContain('Investment Decision');
  });

  it('should include key metrics in the report', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const report = generateSelfStorageROIAnalysis(testInputs, outputs);
    
    expect(report).toContain(`${outputs.cashOnCashReturn}%`);
    expect(report).toContain(`${outputs.capRate}%`);
    expect(report).toContain(`${outputs.totalROI}%`);
    expect(report).toContain(`${outputs.debtServiceCoverage}x`);
    expect(report).toContain(`${outputs.breakEvenOccupancy}%`);
  });

  it('should include financial performance data', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const report = generateSelfStorageROIAnalysis(testInputs, outputs);
    
    expect(report).toContain(outputs.annualRentalIncome?.toLocaleString());
    expect(report).toContain(outputs.annualOperatingIncome?.toLocaleString());
    expect(report).toContain(outputs.annualCashFlow?.toLocaleString());
    expect(report).toContain(outputs.monthlyCashFlow?.toLocaleString());
  });

  it('should include investment returns data', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const report = generateSelfStorageROIAnalysis(testInputs, outputs);
    
    expect(report).toContain(`${outputs.internalRateOfReturn}%`);
    expect(report).toContain(`${outputs.annualizedReturn}%`);
    expect(report).toContain(`${outputs.paybackPeriod} years`);
  });

  it('should include risk assessment scores', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const report = generateSelfStorageROIAnalysis(testInputs, outputs);
    
    expect(report).toContain(`${outputs.profitabilityScore}/100`);
    expect(report).toContain(`${outputs.investmentScore}/100`);
    expect(report).toContain(`${outputs.riskScore}/100`);
    expect(report).toContain(`${outputs.valueScore}/100`);
  });

  it('should include property valuation data', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const report = generateSelfStorageROIAnalysis(testInputs, outputs);
    
    expect(report).toContain(testInputs.purchasePrice?.toLocaleString());
    expect(report).toContain(testInputs.downPayment?.toLocaleString());
    expect(report).toContain(outputs.monthlyPayment?.toLocaleString());
    expect(report).toContain(outputs.projectedValue?.toLocaleString());
  });

  it('should include market analysis data', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const report = generateSelfStorageROIAnalysis(testInputs, outputs);
    
    expect(report).toContain(`$${testInputs.averageRentPerSqFt}/sq ft/month`);
    expect(report).toContain(`${testInputs.occupancyRate}%`);
    expect(report).toContain(`${testInputs.rentIncreaseRate}%`);
    expect(report).toContain(`${testInputs.appreciationRate}%`);
  });

  it('should include recommendations section', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const report = generateSelfStorageROIAnalysis(testInputs, outputs);
    
    expect(report).toContain('Recommendations');
    expect(report).toContain('Investment Decision');
  });

  it('should handle negative cash flow in recommendations', () => {
    const negativeCashFlowInputs = {
      ...testInputs,
      occupancyRate: 50,
      averageRentPerSqFt: 0.5
    };
    
    const outputs = calculateSelfStorageROI(negativeCashFlowInputs);
    const report = generateSelfStorageROIAnalysis(negativeCashFlowInputs, outputs);
    
    expect(report).toContain('Negative cash flow');
  });

  it('should include overall score and recommendation', () => {
    const outputs = calculateSelfStorageROI(testInputs);
    const report = generateSelfStorageROIAnalysis(testInputs, outputs);
    
    const overallScore = Math.round((outputs.profitabilityScore + outputs.investmentScore + outputs.riskScore + outputs.valueScore) / 4);
    expect(report).toContain(`${overallScore}/100`);
    
    if (outputs.investmentScore >= 70) {
      expect(report).toContain('Consider proceeding with investment');
    } else {
      expect(report).toContain('Reconsider or renegotiate terms');
    }
  });
});
