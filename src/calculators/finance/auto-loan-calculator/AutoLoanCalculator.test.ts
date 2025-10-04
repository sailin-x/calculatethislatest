import { describe, it, expect } from 'vitest';
import {
  calculateLoanAmount,
  calculateMonthlyPayment,
  calculateTotalLoanPayments,
  calculateTotalInterestPaid,
  calculateVehicleDepreciationSchedule,
  calculateFuelCostAnalysis,
  calculateTradeInAnalysis,
  calculateWarrantyAnalysis,
  calculateAutoLoanResults
} from './formulas';
import { validateAutoLoanCalculatorInputs, validateAutoLoanCalculatorBusinessRules } from './validation';
import { AutoLoanCalculatorInputs } from './types';

describe('Auto Loan Calculator', () => {
  const mockInputs: AutoLoanCalculatorInputs = {
    vehiclePrice: 35000,
    downPayment: 5000,
    tradeInValue: 8000,
    loanTermYears: 5,
    interestRate: 6.5,
    vehicleYear: 2024,
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    currentMileage: 5000,
    fuelEfficiency: 32,
    annualMileage: 12000,
    fuelPricePerGallon: 3.50,
    extendedWarrantyCost: 1500,
    extendedWarrantyYears: 5,
    salesTaxRate: 6,
    otherFees: 500,
    creditScore: 750
  };

  describe('Loan Amount Calculations', () => {
    it('calculates loan amount correctly', () => {
      const result = calculateLoanAmount(mockInputs);
      // 35000 - 5000 - 8000 = 27000 taxable amount
      // 27000 * 0.06 = 1620 sales tax
      // 27000 + 1620 - 5000 + 500 = 20700 + 500 = 21200? Wait, let me check the formula
      // Actually: taxableAmount = vehiclePrice - tradeInValue = 35000 - 8000 = 27000
      // salesTax = 27000 * 0.06 = 1620
      // loanAmount = 27000 + 1620 - downPayment + otherFees = 28620 - 5000 + 500 = 24120? Wait, I think there's an error in my formula
      // Let me check: taxableAmount = vehiclePrice - tradeInValue = 35000 - 8000 = 27000
      // salesTax = 27000 * 0.06 = 1620
      // totalCost = vehiclePrice + salesTax = 35000 + 1620 = 36620
      // loanAmount = totalCost - downPayment - tradeInValue + otherFees = 36620 - 5000 - 8000 + 500 = 24120
      expect(result).toBeCloseTo(24120, 0);
    });

    it('calculates monthly payment correctly', () => {
      const loanAmount = 24120;
      const result = calculateMonthlyPayment(loanAmount, 6.5, 5);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(470, 0); // Approximate expected value
    });

    it('calculates total loan payments correctly', () => {
      const monthlyPayment = 470;
      const result = calculateTotalLoanPayments(monthlyPayment, 5);
      expect(result).toBe(470 * 5 * 12);
    });

    it('calculates total interest paid correctly', () => {
      const totalPayments = 28200;
      const loanAmount = 24120;
      const result = calculateTotalInterestPaid(totalPayments, loanAmount);
      expect(result).toBe(totalPayments - loanAmount);
    });
  });

  describe('Vehicle Depreciation', () => {
    it('calculates depreciation schedule correctly', () => {
      const schedule = calculateVehicleDepreciationSchedule(mockInputs);
      expect(schedule.length).toBe(6); // 5 years + initial year
      expect(schedule[0].value).toBe(35000); // Initial value
      expect(schedule[1].value).toBeLessThan(schedule[0].value); // Depreciates
    });
  });

  describe('Fuel Cost Analysis', () => {
    it('calculates fuel costs correctly', () => {
      const analysis = calculateFuelCostAnalysis(mockInputs);
      expect(analysis.monthlyFuelCost).toBeGreaterThan(0);
      expect(analysis.annualFuelCost).toBeGreaterThan(0);
      expect(analysis.totalFuelCostOverLoan).toBe(analysis.annualFuelCost * 5);
    });
  });

  describe('Trade-in Analysis', () => {
    it('calculates trade-in depreciation correctly', () => {
      const analysis = calculateTradeInAnalysis(mockInputs);
      expect(analysis.projectedTradeInValue).toBeLessThan(analysis.currentTradeInValue);
      expect(analysis.tradeInLoss).toBeGreaterThan(0);
    });
  });

  describe('Warranty Analysis', () => {
    it('calculates warranty costs correctly', () => {
      const analysis = calculateWarrantyAnalysis(mockInputs);
      expect(analysis.monthlyWarrantyCost).toBeGreaterThan(0);
      expect(analysis.totalWarrantyCost).toBe(1500);
    });
  });

  describe('Complete Auto Loan Calculation', () => {
    it('calculates complete auto loan results', () => {
      const results = calculateAutoLoanResults(mockInputs);
      expect(results.loanAmount).toBeGreaterThan(0);
      expect(results.monthlyPayment).toBeGreaterThan(0);
      expect(results.totalLoanPayments).toBeGreaterThan(results.loanAmount);
      expect(results.totalInterestPaid).toBeGreaterThan(0);
      expect(results.vehicleDepreciationSchedule).toBeDefined();
      expect(results.fuelCostAnalysis).toBeDefined();
      expect(results.tradeInAnalysis).toBeDefined();
      expect(results.warrantyAnalysis).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateAutoLoanCalculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates negative vehicle price', () => {
      const invalidInputs = { ...mockInputs, vehiclePrice: -1000 };
      const result = validateAutoLoanCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('vehiclePrice');
    });

    it('validates invalid loan term', () => {
      const invalidInputs = { ...mockInputs, loanTermYears: 15 };
      const result = validateAutoLoanCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('loanTermYears');
    });

    it('validates invalid interest rate', () => {
      const invalidInputs = { ...mockInputs, interestRate: 30 };
      const result = validateAutoLoanCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('interestRate');
    });

    it('validates missing required fields', () => {
      const invalidInputs = { ...mockInputs, vehicleMake: '' };
      const result = validateAutoLoanCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('vehicleMake');
    });
  });

  describe('Business Rules Validation', () => {
    it('validates interest rate based on credit score', () => {
      const lowRateInputs = { ...mockInputs, interestRate: 2, creditScore: 750 };
      const result = validateAutoLoanCalculatorBusinessRules(lowRateInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('interestRate');
    });

    it('warns about high loan-to-value ratio', () => {
      const highLTVInputs = { ...mockInputs, downPayment: 1000 };
      const result = validateAutoLoanCalculatorBusinessRules(highLTVInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('downPayment');
    });

    it('warns about low fuel efficiency', () => {
      const lowEfficiencyInputs = { ...mockInputs, fuelEfficiency: 15 };
      const result = validateAutoLoanCalculatorBusinessRules(lowEfficiencyInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('fuelEfficiency');
    });

    it('warns about high annual mileage', () => {
      const highMileageInputs = { ...mockInputs, annualMileage: 20000 };
      const result = validateAutoLoanCalculatorBusinessRules(highMileageInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('annualMileage');
    });
  });

  describe('Edge Cases', () => {
    it('handles zero down payment', () => {
      const zeroDownInputs = { ...mockInputs, downPayment: 0 };
      const result = calculateLoanAmount(zeroDownInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('handles zero trade-in value', () => {
      const zeroTradeInInputs = { ...mockInputs, tradeInValue: 0 };
      const result = calculateLoanAmount(zeroTradeInInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('handles zero interest rate', () => {
      const zeroRateInputs = { ...mockInputs, interestRate: 0 };
      const result = calculateMonthlyPayment(24120, 0, 5);
      expect(result).toBeCloseTo(24120 / 60, 0); // Principal divided by number of payments
    });
  });
});
