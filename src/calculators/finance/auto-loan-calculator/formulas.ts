import {
  AutoLoanCalculatorInputs,
  AutoLoanCalculatorOutputs,
  VehicleDepreciationData,
  FuelCostAnalysis,
  TradeInAnalysis,
  WarrantyAnalysis
} from './types';

// Basic loan calculation functions
export function calculateLoanAmount(inputs: AutoLoanCalculatorInputs): number {
  const { vehiclePrice, downPayment, tradeInValue, salesTaxRate, otherFees } = inputs;
  const taxableAmount = vehiclePrice - tradeInValue;
  const salesTax = taxableAmount * (salesTaxRate / 100);
  return taxableAmount + salesTax - downPayment + otherFees;
}

export function calculateMonthlyPayment(loanAmount: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return loanAmount / numPayments;
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateTotalLoanPayments(monthlyPayment: number, years: number): number {
  return monthlyPayment * years * 12;
}

export function calculateTotalInterestPaid(totalPayments: number, loanAmount: number): number {
  return totalPayments - loanAmount;
}

export function calculateTotalCost(inputs: AutoLoanCalculatorInputs, totalLoanPayments: number): number {
  const { vehiclePrice, downPayment, tradeInValue, extendedWarrantyCost, otherFees } = inputs;
  return downPayment + totalLoanPayments + extendedWarrantyCost + otherFees - tradeInValue;
}

export function calculateEffectiveInterestRate(annualRate: number): number {
  // For simplicity, return the nominal rate as effective rate
  // In a real implementation, this would account for compounding
  return annualRate;
}

// Vehicle depreciation calculations
export function calculateVehicleDepreciationSchedule(inputs: AutoLoanCalculatorInputs): VehicleDepreciationData[] {
  const { vehiclePrice, loanTermYears, vehicleYear } = inputs;
  const currentYear = new Date().getFullYear();
  const vehicleAge = currentYear - vehicleYear;

  const schedule: VehicleDepreciationData[] = [];
  let currentValue = vehiclePrice;

  // Typical depreciation rates: 15-25% first year, then 10-15% annually
  for (let year = 0; year <= loanTermYears; year++) {
    let depreciationRate: number;
    if (year === 0) {
      depreciationRate = 0; // No depreciation in year 0
    } else if (year === 1) {
      depreciationRate = 20; // 20% first year
    } else if (year <= 3) {
      depreciationRate = 15; // 15% years 2-3
    } else if (year <= 5) {
      depreciationRate = 12; // 12% years 4-5
    } else {
      depreciationRate = 10; // 10% after year 5
    }

    const depreciation = currentValue * (depreciationRate / 100);
    currentValue -= depreciation;

    schedule.push({
      year: year + vehicleAge,
      value: Math.max(0, currentValue),
      depreciation,
      depreciationRate
    });
  }

  return schedule;
}

// Fuel cost analysis
export function calculateFuelCostAnalysis(inputs: AutoLoanCalculatorInputs): FuelCostAnalysis {
  const { annualMileage, fuelEfficiency, fuelPricePerGallon, loanTermYears } = inputs;

  const annualFuelCost = (annualMileage / fuelEfficiency) * fuelPricePerGallon;
  const monthlyFuelCost = annualFuelCost / 12;
  const totalFuelCostOverLoan = annualFuelCost * loanTermYears;

  // Assume average MPG is 25 for comparison
  const averageFuelEfficiency = 25;
  const averageAnnualFuelCost = (annualMileage / averageFuelEfficiency) * fuelPricePerGallon;
  const fuelCostSavingsVsAverage = averageAnnualFuelCost - annualFuelCost;

  return {
    monthlyFuelCost,
    annualFuelCost,
    totalFuelCostOverLoan,
    fuelCostSavingsVsAverage
  };
}

// Trade-in analysis
export function calculateTradeInAnalysis(inputs: AutoLoanCalculatorInputs): TradeInAnalysis {
  const { tradeInValue, loanTermYears } = inputs;

  // Estimate trade-in value depreciation (typically 10-15% per year)
  const annualDepreciationRate = 12;
  const projectedTradeInValue = tradeInValue * Math.pow(1 - annualDepreciationRate / 100, loanTermYears);
  const tradeInLoss = tradeInValue - projectedTradeInValue;
  const tradeInLossPercentage = (tradeInLoss / tradeInValue) * 100;

  return {
    currentTradeInValue: tradeInValue,
    projectedTradeInValue,
    tradeInLoss,
    tradeInLossPercentage
  };
}

// Warranty analysis
export function calculateWarrantyAnalysis(inputs: AutoLoanCalculatorInputs): WarrantyAnalysis {
  const { extendedWarrantyCost, extendedWarrantyYears, loanTermYears } = inputs;

  const monthlyWarrantyCost = extendedWarrantyCost / (extendedWarrantyYears * 12);
  const totalWarrantyCost = extendedWarrantyCost;

  // Estimate warranty value (typically covers 50-70% of repair costs)
  const warrantyValue = extendedWarrantyCost * 0.6; // Conservative estimate
  const netWarrantyCost = totalWarrantyCost - warrantyValue;

  return {
    monthlyWarrantyCost,
    totalWarrantyCost,
    warrantyValue,
    netWarrantyCost
  };
}

// Break-even analysis
export function calculateBreakEvenPoint(inputs: AutoLoanCalculatorInputs, monthlyPayment: number): number {
  const { vehiclePrice, downPayment, tradeInValue } = inputs;

  // Simple break-even: when cumulative payments equal initial investment
  const initialInvestment = downPayment;
  const monthlyBreakEven = initialInvestment / monthlyPayment;

  return Math.ceil(monthlyBreakEven);
}

// Total ownership cost
export function calculateTotalOwnershipCost(
  inputs: AutoLoanCalculatorInputs,
  totalLoanPayments: number,
  fuelCostAnalysis: FuelCostAnalysis,
  warrantyAnalysis: WarrantyAnalysis
): number {
  const { vehiclePrice, downPayment, tradeInValue, otherFees } = inputs;

  return (
    downPayment +
    totalLoanPayments +
    fuelCostAnalysis.totalFuelCostOverLoan +
    warrantyAnalysis.totalWarrantyCost +
    otherFees -
    tradeInValue
  );
}

// Cost per mile
export function calculateCostPerMile(
  totalOwnershipCost: number,
  inputs: AutoLoanCalculatorInputs
): number {
  const { annualMileage, loanTermYears } = inputs;
  const totalMileage = annualMileage * loanTermYears;

  return totalOwnershipCost / totalMileage;
}

// Main calculation function
export function calculateAutoLoanResults(inputs: AutoLoanCalculatorInputs): AutoLoanCalculatorOutputs {
  const loanAmount = calculateLoanAmount(inputs);
  const monthlyPayment = calculateMonthlyPayment(loanAmount, inputs.interestRate, inputs.loanTermYears);
  const totalLoanPayments = calculateTotalLoanPayments(monthlyPayment, inputs.loanTermYears);
  const totalInterestPaid = calculateTotalInterestPaid(totalLoanPayments, loanAmount);
  const totalCost = calculateTotalCost(inputs, totalLoanPayments);
  const effectiveInterestRate = calculateEffectiveInterestRate(inputs.interestRate);

  const vehicleDepreciationSchedule = calculateVehicleDepreciationSchedule(inputs);
  const fuelCostAnalysis = calculateFuelCostAnalysis(inputs);
  const tradeInAnalysis = calculateTradeInAnalysis(inputs);
  const warrantyAnalysis = calculateWarrantyAnalysis(inputs);
  const breakEvenPoint = calculateBreakEvenPoint(inputs, monthlyPayment);
  const totalOwnershipCost = calculateTotalOwnershipCost(inputs, totalLoanPayments, fuelCostAnalysis, warrantyAnalysis);
  const costPerMile = calculateCostPerMile(totalOwnershipCost, inputs);

  return {
    loanAmount,
    monthlyPayment,
    totalLoanPayments,
    totalInterestPaid,
    totalCost,
    effectiveInterestRate,
    vehicleDepreciationSchedule,
    fuelCostAnalysis,
    tradeInAnalysis,
    warrantyAnalysis,
    breakEvenPoint,
    totalOwnershipCost,
    costPerMile
  };
}
