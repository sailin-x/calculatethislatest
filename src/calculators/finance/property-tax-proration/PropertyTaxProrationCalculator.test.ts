import { propertyTaxProrationCalculator } from './PropertyTaxProrationCalculator';
import { PropertyTaxProrationInputs } from './types';

describe('PropertyTaxProrationCalculator', () => {
  const baseInputs: PropertyTaxProrationInputs = {
    annualPropertyTax: 12000,
    closingDate: '2024-06-15',
    taxYear: 2024,
    paymentSchedule: 'annual',
    sellerPaidMonths: 0,
    buyerPaidMonths: 0,
    prorationMethod: '365-day',
    sellerCredits: 0,
    buyerCredits: 0,
    specialAssessments: 0
  };

  test('should calculate basic proration correctly with 365-day method', () => {
    const result = propertyTaxProrationCalculator.calculate(baseInputs);
    
    expect(result.totalDaysInYear).toBe(365);
    expect(result.daysFromStartOfYear).toBe(166); // Jan 1 to Jun 15
    expect(result.daysRemainingInYear).toBe(199); // Jun 16 to Dec 31
    expect(result.breakdown.dailyRate).toBeCloseTo(32.88, 2); // 12000 / 365
    expect(result.breakdown.sellerAmount).toBeCloseTo(5457.53, 2); // 166 * 32.88
    expect(result.breakdown.buyerAmount).toBeCloseTo(6542.47, 2); // 199 * 32.88
    expect(result.sellerProration).toBeCloseTo(5457.53, 2);
    expect(result.buyerProration).toBeCloseTo(6542.47, 2);
    expect(result.netProration).toBeCloseTo(-1084.94, 2); // seller - buyer
    expect(result.sellerOwes).toBeCloseTo(5457.53, 2);
    expect(result.buyerOwes).toBe(0);
  });

  test('should calculate proration with 360-day method', () => {
    const inputs: PropertyTaxProrationInputs = {
      ...baseInputs,
      prorationMethod: '360-day'
    };

    const result = propertyTaxProrationCalculator.calculate(inputs);
    
    expect(result.totalDaysInYear).toBe(360);
    expect(result.breakdown.dailyRate).toBeCloseTo(33.33, 2); // 12000 / 360
  });

  test('should calculate proration with actual-days method for leap year', () => {
    const inputs: PropertyTaxProrationInputs = {
      ...baseInputs,
      taxYear: 2024, // Leap year
      prorationMethod: 'actual-days'
    };

    const result = propertyTaxProrationCalculator.calculate(inputs);
    
    expect(result.totalDaysInYear).toBe(366); // Leap year
    expect(result.breakdown.dailyRate).toBeCloseTo(32.79, 2); // 12000 / 366
  });

  test('should calculate proration with seller pre-paid taxes', () => {
    const inputs: PropertyTaxProrationInputs = {
      ...baseInputs,
      sellerPaidMonths: 6 // Seller paid for 6 months
    };

    const result = propertyTaxProrationCalculator.calculate(inputs);
    
    const sellerPaidAmount = (6 / 12) * 12000; // 6000
    expect(result.sellerProration).toBeCloseTo(5457.53 - 6000, 2); // -542.47
    expect(result.sellerOwes).toBe(0);
    expect(result.buyerOwes).toBeCloseTo(542.47, 2);
  });

  test('should calculate proration with buyer pre-paid taxes', () => {
    const inputs: PropertyTaxProrationInputs = {
      ...baseInputs,
      buyerPaidMonths: 6 // Buyer paid for 6 months
    };

    const result = propertyTaxProrationCalculator.calculate(inputs);
    
    const buyerPaidAmount = (6 / 12) * 12000; // 6000
    expect(result.buyerProration).toBeCloseTo(6542.47 - 6000, 2); // 542.47
    expect(result.sellerOwes).toBeCloseTo(5457.53, 2);
    expect(result.buyerOwes).toBe(0);
  });

  test('should calculate proration with credits', () => {
    const inputs: PropertyTaxProrationInputs = {
      ...baseInputs,
      sellerCredits: 1000,
      buyerCredits: 500
    };

    const result = propertyTaxProrationCalculator.calculate(inputs);
    
    expect(result.sellerProration).toBeCloseTo(5457.53 + 1000, 2); // 6457.53
    expect(result.buyerProration).toBeCloseTo(6542.47 + 500, 2); // 7042.47
    expect(result.netProration).toBeCloseTo(-584.94, 2); // 6457.53 - 7042.47
  });

  test('should calculate next payment schedule for annual payments', () => {
    const result = propertyTaxProrationCalculator.calculate(baseInputs);
    
    expect(result.paymentSchedule.nextPaymentDate).toBe('2025-01-01');
    expect(result.paymentSchedule.nextPaymentAmount).toBe(12000);
    expect(result.paymentSchedule.remainingPayments).toBe(1);
  });

  test('should calculate next payment schedule for quarterly payments', () => {
    const inputs: PropertyTaxProrationInputs = {
      ...baseInputs,
      paymentSchedule: 'quarterly'
    };

    const result = propertyTaxProrationCalculator.calculate(inputs);
    
    expect(result.paymentSchedule.nextPaymentAmount).toBe(3000); // 12000 / 4
    expect(result.paymentSchedule.remainingPayments).toBe(2); // Q3 and Q4
  });

  test('should calculate next payment schedule for monthly payments', () => {
    const inputs: PropertyTaxProrationInputs = {
      ...baseInputs,
      paymentSchedule: 'monthly'
    };

    const result = propertyTaxProrationCalculator.calculate(inputs);
    
    expect(result.paymentSchedule.nextPaymentAmount).toBe(1000); // 12000 / 12
    expect(result.paymentSchedule.remainingPayments).toBe(6); // July through December
  });

  test('should validate inputs correctly', () => {
    const validInputs: PropertyTaxProrationInputs = {
      annualPropertyTax: 15000,
      closingDate: '2024-08-20',
      taxYear: 2024,
      paymentSchedule: 'semi-annual',
      sellerPaidMonths: 4,
      buyerPaidMonths: 0,
      prorationMethod: 'actual-days',
      sellerCredits: 500,
      buyerCredits: 0,
      specialAssessments: 200
    };

    const validation = propertyTaxProrationCalculator.validate(validInputs);
    expect(validation.annualPropertyTax).toBe(true);
    expect(validation.closingDate).toBe(true);
    expect(validation.taxYear).toBe(true);
    expect(validation.paymentSchedule).toBe(true);
    expect(validation.prorationMethod).toBe(true);
  });

  test('should reject invalid annual property tax', () => {
    const invalidInputs: PropertyTaxProrationInputs = {
      ...baseInputs,
      annualPropertyTax: -1000
    };

    expect(() => propertyTaxProrationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid closing date', () => {
    const invalidInputs: PropertyTaxProrationInputs = {
      ...baseInputs,
      closingDate: 'invalid-date'
    };

    expect(() => propertyTaxProrationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid tax year', () => {
    const invalidInputs: PropertyTaxProrationInputs = {
      ...baseInputs,
      taxYear: 2010 // Too far in the past
    };

    expect(() => propertyTaxProrationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid payment schedule', () => {
    const invalidInputs: PropertyTaxProrationInputs = {
      ...baseInputs,
      paymentSchedule: 'invalid' as any
    };

    expect(() => propertyTaxProrationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid proration method', () => {
    const invalidInputs: PropertyTaxProrationInputs = {
      ...baseInputs,
      prorationMethod: 'invalid' as any
    };

    expect(() => propertyTaxProrationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should handle complex scenario with all parameters', () => {
    const inputs: PropertyTaxProrationInputs = {
      annualPropertyTax: 18000,
      closingDate: '2024-09-30',
      taxYear: 2024,
      paymentSchedule: 'quarterly',
      sellerPaidMonths: 9,
      buyerPaidMonths: 0,
      prorationMethod: 'actual-days',
      sellerCredits: 1500,
      buyerCredits: 800,
      specialAssessments: 500
    };

    const result = propertyTaxProrationCalculator.calculate(inputs);
    
    expect(result.totalDaysInYear).toBe(366); // Leap year
    expect(result.daysFromStartOfYear).toBe(273); // Jan 1 to Sep 30
    expect(result.daysRemainingInYear).toBe(93); // Oct 1 to Dec 31
    expect(result.breakdown.dailyRate).toBeCloseTo(49.18, 2); // 18000 / 366
    expect(result.paymentSchedule.nextPaymentAmount).toBe(4500); // 18000 / 4
    expect(result.paymentSchedule.remainingPayments).toBe(1); // Q4 only
  });
});