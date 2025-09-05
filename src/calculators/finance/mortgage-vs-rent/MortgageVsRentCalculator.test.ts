import { MortgageVsRentCalculator } from './MortgageVsRentCalculator';
import { MortgageVsRentInputs } from './types';

describe('MortgageVsRentCalculator', () => {
  let calculator: MortgageVsRentCalculator;

  beforeEach(() => {
    calculator = new MortgageVsRentCalculator();
  });

  const createValidInputs = (): MortgageVsRentInputs => ({
    propertyValue: 500000,
    propertyAddress: '123 Main St, Anytown, ST 12345',
    propertyType: 'single_family',
    propertySize: 2500,
    propertyAge: 10,
    loanAmount: 400000,
    interestRate: 6.5,
    loanTerm: 30,
    loanType: 'conventional',
    paymentType: 'principal_interest',
    downPayment: 100000,
    downPaymentPercentage: 20,
    downPaymentSource: 'savings',
    monthlyRent: 2500,
    annualRent: 30000,
    rentIncreaseRate: 3,
    rentEscalationClause: false,
    rentEscalationRate: 0,
    propertyInsurance: 1200,
    propertyTaxes: 5000,
    hoaFees: 0,
    floodInsurance: 0,
    mortgageInsurance: 0,
    rentersInsurance: 300,
    maintenanceCosts: 2000,
    utilityCosts: 2400,
    rentIncludesUtilities: false,
    utilitiesIncluded: [],
    closingCosts: 10000,
    originationFee: 2000,
    appraisalFee: 500,
    titleInsuranceFee: 1000,
    recordingFee: 200,
    attorneyFee: 1000,
    otherFees: 500,
    annualIncome: 120000,
    monthlyIncome: 10000,
    marginalTaxRate: 25,
    maxTaxDeduction: 10000,
    propertyAppreciationRate: 4,
    investmentReturnRate: 7,
    inflationRate: 3,
    insuranceIncreaseRate: 3,
    taxIncreaseRate: 2,
    hoaIncreaseRate: 3,
    maintenanceIncreaseRate: 3,
    utilityIncreaseRate: 3,
    analysisPeriod: 10,
    discountRate: 5,
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true
  });

  it('should calculate monthly costs correctly', () => {
    const inputs = createValidInputs();
    const result = calculator.calculate(inputs);
    
    expect(result.monthlyMortgagePayment).toBeGreaterThan(0);
    expect(result.totalMonthlyBuyingCosts).toBeGreaterThan(result.monthlyMortgagePayment);
    expect(result.totalMonthlyRentingCosts).toBeGreaterThan(0);
  });

  it('should calculate annual costs correctly', () => {
    const inputs = createValidInputs();
    const result = calculator.calculate(inputs);
    
    expect(result.annualBuyingCosts).toBeGreaterThan(0);
    expect(result.annualRentingCosts).toBeGreaterThan(0);
    expect(result.annualDifference).toBeDefined();
  });

  it('should calculate total costs over analysis period', () => {
    const inputs = createValidInputs();
    const result = calculator.calculate(inputs);
    
    expect(result.totalBuyingCosts).toBeGreaterThan(0);
    expect(result.totalRentingCosts).toBeGreaterThan(0);
    expect(result.totalDifference).toBeDefined();
  });

  it('should calculate equity and appreciation', () => {
    const inputs = createValidInputs();
    const result = calculator.calculate(inputs);
    
    expect(result.equityBuildup).toBeGreaterThan(0);
    expect(result.propertyAppreciation).toBeGreaterThan(0);
  });

  it('should calculate net worth comparison', () => {
    const inputs = createValidInputs();
    const result = calculator.calculate(inputs);
    
    expect(result.netWorthBuying).toBeDefined();
    expect(result.netWorthRenting).toBeDefined();
    expect(result.netWorthDifference).toBeDefined();
  });

  it('should calculate break-even point', () => {
    const inputs = createValidInputs();
    const result = calculator.calculate(inputs);
    
    expect(result.breakEvenPoint).toBeGreaterThan(0);
    expect(result.breakEvenPoint).toBeLessThanOrEqual(inputs.analysisPeriod);
  });

  it('should generate comprehensive analysis', () => {
    const inputs = createValidInputs();
    const result = calculator.calculate(inputs);
    
    expect(result.analysis).toBeDefined();
    expect(result.analysis.recommendation).toBeDefined();
    expect(result.analysis.financialSummary).toBeDefined();
    expect(result.analysis.costBreakdown).toBeDefined();
  });

  it('should generate scenarios', () => {
    const inputs = createValidInputs();
    const result = calculator.calculate(inputs);
    
    expect(result.scenarios).toBeInstanceOf(Array);
    expect(result.scenarios.length).toBeGreaterThan(0);
    
    result.scenarios.forEach(scenario => {
      expect(scenario.scenario).toBeDefined();
      expect(scenario.probability).toBeGreaterThanOrEqual(0);
      expect(scenario.probability).toBeLessThanOrEqual(100);
      expect(scenario.recommendation).toBeDefined();
    });
  });

  it('should generate sensitivity analysis', () => {
    const inputs = createValidInputs();
    const result = calculator.calculate(inputs);
    
    expect(result.sensitivityAnalysis).toBeInstanceOf(Array);
    expect(result.sensitivityAnalysis.length).toBeGreaterThan(0);
  });

  it('should generate timeline analysis', () => {
    const inputs = createValidInputs();
    const result = calculator.calculate(inputs);
    
    expect(result.timelineAnalysis).toBeInstanceOf(Array);
    expect(result.timelineAnalysis.length).toBeGreaterThan(0);
  });

  it('should throw error for invalid inputs', () => {
    const inputs = createValidInputs();
    inputs.propertyValue = -1000;
    
    expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
  });

  it('should handle edge cases', () => {
    const inputs = createValidInputs();
    inputs.analysisPeriod = 1; // Very short period
    
    const result = calculator.calculate(inputs);
    expect(result).toBeDefined();
    expect(result.analysis).toBeDefined();
  });
});