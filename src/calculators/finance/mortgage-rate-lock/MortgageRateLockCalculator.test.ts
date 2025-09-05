import { MortgageRateLockCalculator } from './MortgageRateLockCalculator';
import { MortgageRateLockInputs } from './types';

describe('MortgageRateLockCalculator', () => {
  let calculator: MortgageRateLockCalculator;

  beforeEach(() => {
    calculator = new MortgageRateLockCalculator();
  });

  const createValidInputs = (): MortgageRateLockInputs => ({
    loanAmount: 500000,
    lockedRate: 6.5,
    currentMarketRate: 7.0,
    loanTerm: 30,
    loanType: 'conventional',
    paymentType: 'principal_interest',
    lockDate: '2024-01-01',
    lockExpirationDate: '2024-04-01',
    lockDuration: 90,
    lockType: 'paid',
    lockFee: 1000,
    lockFeeType: 'fixed',
    propertyValue: 600000,
    propertyAddress: '123 Main St, Anytown, ST 12345',
    propertyType: 'single_family',
    propertySize: 2500,
    propertyAge: 10,
    estimatedClosingDate: '2024-03-15',
    actualClosingDate: '',
    closingDelay: 5,
    extensionFee: 500,
    extensionFeeType: 'fixed',
    marketLocation: 'Anytown, ST',
    marketCondition: 'stable',
    marketVolatility: 15,
    rateTrend: 'rising',
    rateForecast: [],
    borrowerIncome: 120000,
    borrowerCreditScore: 750,
    borrowerDebtToIncomeRatio: 35,
    borrowerEmploymentType: 'employed',
    analysisPeriod: 5,
    inflationRate: 3,
    propertyAppreciationRate: 4,
    discountRate: 5,
    riskTolerance: 'moderate',
    maxRateIncrease: 1,
    minRateDecrease: 0.5,
    currency: 'USD',
    displayFormat: 'percentage',
    includeCharts: true
  });

  it('should calculate rate difference correctly', () => {
    const inputs = createValidInputs();
    const result = calculator.calculate(inputs);
    
    expect(result.rateDifference).toBeCloseTo(0.5, 2);
    expect(result.rateSavings).toBeCloseTo(0.5, 2);
  });

  it('should generate comprehensive analysis', () => {
    const inputs = createValidInputs();
    const result = calculator.calculate(inputs);
    
    expect(result.analysis).toBeDefined();
    expect(result.analysis.lockRating).toBeDefined();
    expect(result.analysis.valueRating).toBeDefined();
    expect(result.analysis.recommendation).toBeDefined();
  });

  it('should throw error for invalid inputs', () => {
    const inputs = createValidInputs();
    inputs.loanAmount = -1000;
    
    expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
  });
});