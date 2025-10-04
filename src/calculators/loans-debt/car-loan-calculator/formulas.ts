```typescript
import { CarLoanCalculatorInputs, CarLoanCalculatorMetrics, CarLoanCalculatorAnalysis } from './types';

/**
 * Calculates the effective loan amount for a car loan.
 * Loan Amount = Vehicle Price - Down Payment - Trade-in Value + Sales Tax + Fees
 * Ensures non-negative result.
 */
function calculateLoanAmount(inputs: CarLoanCalculatorInputs): number {
  const { vehiclePrice, downPayment = 0, tradeInValue = 0, salesTaxRate = 0, fees = 0 } = inputs;
  const salesTax = vehiclePrice * (salesTaxRate / 100);
  const loanAmount = vehiclePrice - downPayment - tradeInValue + salesTax + fees;
  return Math.max(0, loanAmount);
}

/**
 * Calculates the monthly payment using the standard loan amortization formula.
 * M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
 * Where:
 * - P = principal (loan amount)
 * - r = monthly interest rate (annual rate / 100 / 12)
 * - n = number of monthly payments (term in years * 12)
 * Handles zero interest or invalid inputs gracefully.
 */
function calculateMonthlyPayment(principal: number, annualInterestRate: number, loanTermYears: number): number {
  if (principal <= 0 || loanTermYears <= 0) {
    return 0;
  }

  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  if (monthlyInterestRate === 0) {
    // No interest: straight-line payment
    return principal / numberOfPayments;
  }

  const powerTerm = Math.pow(1 + monthlyInterestRate, numberOfPayments);
  const monthlyPayment = principal * (monthlyInterestRate * powerTerm) / (powerTerm - 1);

  return isNaN(monthlyPayment) ? 0 : monthlyPayment;
}

/**
 * Calculates total interest paid over the loan term.
 * Total Interest = (Monthly Payment * Number of Payments) - Principal
 */
function calculateTotalInterest(monthlyPayment: number, annualInterestRate: number, loanTermYears: number, principal: number): number {
  const numberOfPayments = loanTermYears * 12;
  const totalPayments = monthlyPayment * numberOfPayments;
  return Math.max(0, totalPayments - principal);
}

/**
 * Calculates the total cost of the loan (principal + interest).
 */
function calculateTotalLoanCost(monthlyPayment: number, loanTermYears: number): number {
  const numberOfPayments = loanTermYears * 12;
  return monthlyPayment * numberOfPayments;
}

export function calculateResult(inputs: CarLoanCalculatorInputs): number {
  const loanAmount = calculateLoanAmount(inputs);
  const { interestRate = 0, loanTerm = 0 } = inputs;
  return calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
}

export function generateAnalysis(
  inputs: CarLoanCalculatorInputs,
  metrics: CarLoanCalculatorMetrics
): CarLoanCalculatorAnalysis {
  const { interestRate = 0, loanTerm = 0 } = inputs;
  const loanAmount = calculateLoanAmount(inputs);
  const monthlyPayment = metrics.result;
  const totalInterest = calculateTotalInterest(monthlyPayment, interestRate, loanTerm, loanAmount);
  const totalLoanCost = calculateTotalLoanCost(monthlyPayment, loanTerm);

  // Risk level based on interest rate (common car loan risk indicator)
  // Low: < 5% (favorable rates), Medium: 5-8% (standard), High: >8% (potentially predatory or poor credit)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (interestRate >= 8) {
    riskLevel = 'High';
  } else if (interestRate >= 5) {
    riskLevel = 'Medium';
  }

  // Recommendation based on total interest relative to principal (affordability proxy)
  // If interest > 20% of principal, suggest reviewing terms; else, positive
  const interestToPrincipalRatio = (totalInterest / loanAmount) * 100;
  let recommendation: string;
  if (interestToPrincipalRatio > 20) {
    recommendation = `Your estimated monthly payment is $${monthlyPayment.toFixed(2)}, with total interest of $${totalInterest.toFixed(2)} over ${loanTerm} years. The high interest ratio (${interestToPrincipalRatio.toFixed(1)}%) suggests considering a lower rate or shorter term to reduce costs and improve affordability.`;
  } else if (interestToPrincipalRatio > 10) {
    recommendation = `Your estimated monthly payment is $${monthlyPayment.toFixed(2)}, with total interest of $${totalInterest.toFixed(2)} over ${loanTerm} years. This is reasonably affordable, but shop around for better rates to minimize the ${interestToPrincipalRatio.toFixed(1)}% interest burden.`;
  } else {
    recommendation = `Your estimated monthly payment is $${monthlyPayment.toFixed(2)}, with total interest of $${totalInterest.toFixed(2)} over ${loanTerm} years. At a low ${interestToPrincipalRatio.toFixed(1)}% interest ratio, this loan appears cost-effective—proceed if it fits your budget.`;
  }

  return {
    recommendation,
    riskLevel,
    additionalMetrics: {
      loanAmount,
      totalInterest,
      totalLoanCost,
      interestToPrincipalRatio: interestToPrincipalRatio.toFixed(1)
    }
  };
}
```