import { StructuredSettlementPayoutInputs, StructuredSettlementPayoutOutputs } from './types';

export function calculatePaymentFrequencyMultiplier(frequency: string): number {
  switch (frequency) {
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'annually': return 1;
    default: return 1;
  }
}

export function calculatePeriodicPayment(settlementAmount: number, payoutPeriod: number, frequency: string): number {
  const periodsPerYear = calculatePaymentFrequencyMultiplier(frequency);
  const totalPeriods = payoutPeriod * periodsPerYear;
  return settlementAmount / totalPeriods;
}

export function calculateNetPresentValue(payment: number, periods: number, discountRate: number, frequency: string): number {
  const periodsPerYear = calculatePaymentFrequencyMultiplier(frequency);
  const periodicRate = discountRate / 100 / periodsPerYear;
  const totalPeriods = periods * periodsPerYear;

  if (periodicRate === 0) {
    return payment * totalPeriods;
  }

  return payment * (1 - Math.pow(1 + periodicRate, -totalPeriods)) / periodicRate;
}

export function calculateLumpSumPresentValue(lumpSum: number, taxRate: number): number {
  return lumpSum * (1 - taxRate / 100);
}

export function calculateBreakEvenPeriod(
  structuredPayment: number,
  lumpSumPayment: number,
  discountRate: number,
  frequency: string
): number {
  const periodsPerYear = calculatePaymentFrequencyMultiplier(frequency);
  const periodicRate = discountRate / 100 / periodsPerYear;

  if (periodicRate === 0) {
    return lumpSumPayment / structuredPayment / periodsPerYear;
  }

  // Solve for n in: lumpSum = structuredPayment * (1 - (1+r)^-n) / r
  // Using numerical approximation
  let n = 1;
  while (n < 1000) {
    const npv = calculateNetPresentValue(structuredPayment, n / periodsPerYear, discountRate, frequency);
    if (npv >= lumpSumPayment) {
      return n / periodsPerYear;
    }
    n++;
  }
  return 100; // Default if no break-even found
}

export function calculateStructuredSettlementPayout(inputs: StructuredSettlementPayoutInputs): StructuredSettlementPayoutOutputs {
  // Calculate periodic payment
  const periodicPayment = calculatePeriodicPayment(inputs.settlementAmount, inputs.payoutPeriod, inputs.paymentFrequency);
  const periodsPerYear = calculatePaymentFrequencyMultiplier(inputs.paymentFrequency);

  // Calculate total structured payments
  const totalStructuredPayments = periodicPayment * inputs.payoutPeriod * periodsPerYear;

  // Calculate lump sum equivalent (if offered)
  const lumpSumEquivalent = inputs.lumpSumOffer || inputs.settlementAmount;

  // Calculate NPV of structured settlement
  const netPresentValueStructured = calculateNetPresentValue(
    periodicPayment,
    inputs.payoutPeriod,
    inputs.discountRate,
    inputs.paymentFrequency
  );

  // Calculate NPV of lump sum
  const netPresentValueLumpSum = calculateLumpSumPresentValue(lumpSumEquivalent, inputs.taxRate);

  // Calculate tax savings (structured settlements often have tax advantages)
  const taxSavings = (inputs.settlementAmount - netPresentValueStructured) * (inputs.taxRate / 100);

  // Calculate break-even period
  const breakEvenPeriod = calculateBreakEvenPeriod(
    periodicPayment,
    lumpSumEquivalent,
    inputs.discountRate,
    inputs.paymentFrequency
  );

  // Calculate monthly and annual equivalents
  const monthlyPayment = inputs.paymentFrequency === 'monthly' ? periodicPayment :
                        inputs.paymentFrequency === 'quarterly' ? periodicPayment / 3 :
                        periodicPayment / 12;
  const annualPayment = monthlyPayment * 12;

  // Calculate payments over life expectancy
  const yearsOfPayments = Math.min(inputs.lifeExpectancy - inputs.currentAge, inputs.payoutPeriod);
  const totalPaymentsOverLife = annualPayment * yearsOfPayments;

  // Calculate remaining value at death
  const remainingYears = Math.max(0, inputs.payoutPeriod - yearsOfPayments);
  const remainingValueAtDeath = annualPayment * remainingYears;

  // Generate payment schedule
  const paymentSchedule: StructuredSettlementPayoutOutputs['paymentSchedule'] = [];
  let cumulativePayments = 0;

  for (let period = 1; period <= inputs.payoutPeriod * periodsPerYear; period++) {
    const year = Math.ceil(period / periodsPerYear);
    const presentValue = periodicPayment / Math.pow(1 + inputs.discountRate / 100 / periodsPerYear, period);

    cumulativePayments += periodicPayment;

    // Only add one entry per year for readability
    if (period % periodsPerYear === 1 || period === inputs.payoutPeriod * periodsPerYear) {
      paymentSchedule.push({
        period: year,
        payment: periodicPayment * periodsPerYear,
        cumulativePayments,
        presentValue: presentValue * periodsPerYear
      });
    }
  }

  // Comparison analysis
  const structuredAdvantage = netPresentValueStructured - netPresentValueLumpSum;
  const lumpSumAdvantage = netPresentValueLumpSum - netPresentValueStructured;

  let recommendation = '';
  let riskAssessment = '';

  if (structuredAdvantage > 0) {
    recommendation = 'Structured settlement provides better long-term value';
    riskAssessment = inputs.riskTolerance === 'low' ? 'Low risk - guaranteed payments' :
                    inputs.riskTolerance === 'medium' ? 'Medium risk - consider investment returns' :
                    'High risk - lump sum may provide better returns if invested wisely';
  } else {
    recommendation = 'Lump sum payment provides better current value';
    riskAssessment = 'Higher risk - requires good investment management';
  }

  const comparisonAnalysis = {
    structuredAdvantage,
    lumpSumAdvantage,
    recommendation,
    riskAssessment
  };

  // Sensitivity analysis
  const sensitivityAnalysis: StructuredSettlementPayoutOutputs['sensitivityAnalysis'] = [
    {
      scenario: 'Conservative (4% return)',
      npvStructured: calculateNetPresentValue(periodicPayment, inputs.payoutPeriod, 4, inputs.paymentFrequency),
      npvLumpSum: netPresentValueLumpSum,
      advantage: 0
    },
    {
      scenario: 'Moderate (6% return)',
      npvStructured: calculateNetPresentValue(periodicPayment, inputs.payoutPeriod, 6, inputs.paymentFrequency),
      npvLumpSum: netPresentValueLumpSum,
      advantage: 0
    },
    {
      scenario: 'Aggressive (8% return)',
      npvStructured: calculateNetPresentValue(periodicPayment, inputs.payoutPeriod, 8, inputs.paymentFrequency),
      npvLumpSum: netPresentValueLumpSum,
      advantage: 0
    }
  ];

  // Calculate advantages for sensitivity analysis
  sensitivityAnalysis.forEach(scenario => {
    scenario.advantage = scenario.npvStructured - scenario.npvLumpSum;
  });

  return {
    totalStructuredPayments,
    lumpSumEquivalent,
    netPresentValueStructured,
    netPresentValueLumpSum,
    taxSavings,
    breakEvenPeriod,
    monthlyPayment,
    annualPayment,
    totalPaymentsOverLife,
    remainingValueAtDeath,
    paymentSchedule,
    comparisonAnalysis,
    sensitivityAnalysis
  };
}

export function calculateResult(inputs: StructuredSettlementPayoutInputs): number {
  const result = calculateStructuredSettlementPayout(inputs);
  return result.netPresentValueStructured;
}