```typescript
import { MunicipalBondCalculatorInputs, MunicipalBondCalculatorMetrics, MunicipalBondCalculatorAnalysis } from './types';

function calculateBondPrice(
  parValue: number,
  annualCouponRate: number,
  yearsToMaturity: number,
  periodicRate: number,
  periodsPerYear: number = 2
): number {
  const periods = yearsToMaturity * periodsPerYear;
  const periodicCoupon = parValue * annualCouponRate / periodsPerYear;
  let price = 0;
  for (let t = 1; t <= periods; t++) {
    const discountFactor = Math.pow(1 + periodicRate, t);
    price += periodicCoupon / discountFactor;
  }
  const finalDiscountFactor = Math.pow(1 + periodicRate, periods);
  price += parValue / finalDiscountFactor;
  return price;
}

function calculateYTM(
  parValue: number,
  annualCouponRate: number,
  yearsToMaturity: number,
  currentPrice: number,
  periodsPerYear: number = 2,
  tolerance: number = 1e-6,
  maxIterations: number = 100
): number {
  if (yearsToMaturity <= 0) {
    return annualCouponRate; // Edge case: matured bond
  }
  const periods = yearsToMaturity * periodsPerYear;
  const periodicCoupon = parValue * annualCouponRate / periodsPerYear;

  // Initial guess using current yield approximation
  let periodicRate = (parValue * annualCouponRate / currentPrice) / periodsPerYear;
  if (periodicRate <= 0 || isNaN(periodicRate)) {
    periodicRate = annualCouponRate / periodsPerYear || 0.01 / periodsPerYear;
  }

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let f = 0; // f(periodicRate) = calculated price - current price
    let df = 0; // f'(periodicRate)

    // Compute f and df for coupons
    for (let t = 1; t <= periods; t++) {
      const discountFactor = Math.pow(1 + periodicRate, t);
      f += periodicCoupon / discountFactor;
      df -= t * periodicCoupon / (discountFactor * (1 + periodicRate));
    }

    // Add par value component
    const finalDiscountFactor = Math.pow(1 + periodicRate, periods);
    f += parValue / finalDiscountFactor - currentPrice;
    df -= periods * parValue / (finalDiscountFactor * (1 + periodicRate));

    if (Math.abs(f) < tolerance) {
      return periodicRate * periodsPerYear;
    }

    const delta = f / df;
    periodicRate -= delta;

    if (Math.abs(delta) < tolerance) {
      return periodicRate * periodsPerYear;
    }

    // Prevent negative rates or divergence
    if (periodicRate < 0) {
      periodicRate = 0.0001;
    }
  }

  // Return approximation after max iterations
  return periodicRate * periodsPerYear;
}

export function calculateResult(inputs: MunicipalBondCalculatorInputs): number {
  // Validate inputs
  if (
    inputs.parValue <= 0 ||
    inputs.annualCouponRate < 0 ||
    inputs.yearsToMaturity <= 0 ||
    inputs.currentPrice <= 0 ||
    inputs.marginalTaxRate < 0 ||
    inputs.marginalTaxRate > 1
  ) {
    throw new Error('Invalid input values for Municipal Bond Calculator');
  }

  const ytm = calculateYTM(
    inputs.parValue,
    inputs.annualCouponRate,
    inputs.yearsToMaturity,
    inputs.currentPrice
  );

  // Tax-Equivalent Yield for municipal bonds (tax-exempt interest)
  const taxEquivalentYield = ytm / (1 - inputs.marginalTaxRate);

  return taxEquivalentYield;
}

export function generateAnalysis(
  inputs: MunicipalBondCalculatorInputs,
  metrics: MunicipalBondCalculatorMetrics
): MunicipalBondCalculatorAnalysis {
  const taxEquivalentYield = metrics.result;
  const ytm = calculateYTM(
    inputs.parValue,
    inputs.annualCouponRate,
    inputs.yearsToMaturity,
    inputs.currentPrice
  );

  // Risk level based on maturity (longer maturities have higher interest rate risk for bonds)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.yearsToMaturity > 20) {
    riskLevel = 'High';
  } else if (inputs.yearsToMaturity > 10) {
    riskLevel = 'Medium';
  }

  // Recommendation based on TEY attractiveness relative to typical benchmarks
  // (e.g., compare to historical muni yields; here, simplified threshold for production logic)
  let recommendation: string;
  if (taxEquivalentYield > 0.06) {
    recommendation = `This municipal bond offers an attractive tax-equivalent yield of ${taxEquivalentYield.toFixed(2)}%, making it a strong candidate for tax-advantaged income in your portfolio. The YTM of ${ytm.toFixed(2)}% exceeds typical benchmarks for similar maturities.`;
  } else if (taxEquivalentYield > 0.04) {
    recommendation = `The tax-equivalent yield of ${taxEquivalentYield.toFixed(2)}% provides moderate value for tax-exempt investing. Consider if it aligns with your overall portfolio yield targets, given the ${(inputs.currentPrice < inputs.parValue ? 'discount' : 'premium')} pricing.`;
  } else {
    recommendation = `With a tax-equivalent yield of ${taxEquivalentYield.toFixed(2)}%, this bond may offer limited upside compared to taxable alternatives. Evaluate issuer credit quality and compare to current market rates before investing.`;
  }

  return { recommendation, riskLevel };
}
```