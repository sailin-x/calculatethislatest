import { Calculator } from '../../engines/CalculatorEngine';
import { price_to_earnings_calculatorCalculatorInputs, price_to_earnings_calculatorCalculatorResults, price_to_earnings_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class price_to_earnings_calculatorCalculatorCalculator implements Calculator<price_to_earnings_calculatorCalculatorInputs, price_to_earnings_calculatorCalculatorResults> {
  readonly id = 'price_to_earnings_calculatorCalculator';
  readonly name = 'price_to_earnings_calculatorCalculator Calculator';
  readonly description = 'Calculate price_to_earnings_calculatorCalculator values';

  calculate(inputs: price_to_earnings_calculatorCalculatorInputs): price_to_earnings_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: price_to_earnings_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: price_to_earnings_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
