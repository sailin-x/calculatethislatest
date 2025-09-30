import { Calculator } from '../../engines/CalculatorEngine';
import { merger_arbitrage_spread_calculatorCalculatorInputs, merger_arbitrage_spread_calculatorCalculatorResults, merger_arbitrage_spread_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class merger_arbitrage_spread_calculatorCalculatorCalculator implements Calculator<merger_arbitrage_spread_calculatorCalculatorInputs, merger_arbitrage_spread_calculatorCalculatorResults> {
  readonly id = 'merger_arbitrage_spread_calculatorCalculator';
  readonly name = 'merger_arbitrage_spread_calculatorCalculator Calculator';
  readonly description = 'Calculate merger_arbitrage_spread_calculatorCalculator values';

  calculate(inputs: merger_arbitrage_spread_calculatorCalculatorInputs): merger_arbitrage_spread_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: merger_arbitrage_spread_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: merger_arbitrage_spread_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
