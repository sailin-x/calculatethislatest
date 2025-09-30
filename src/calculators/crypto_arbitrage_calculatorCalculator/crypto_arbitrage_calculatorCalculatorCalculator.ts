import { Calculator } from '../../engines/CalculatorEngine';
import { crypto_arbitrage_calculatorCalculatorInputs, crypto_arbitrage_calculatorCalculatorResults, crypto_arbitrage_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class crypto_arbitrage_calculatorCalculatorCalculator implements Calculator<crypto_arbitrage_calculatorCalculatorInputs, crypto_arbitrage_calculatorCalculatorResults> {
  readonly id = 'crypto_arbitrage_calculatorCalculator';
  readonly name = 'crypto_arbitrage_calculatorCalculator Calculator';
  readonly description = 'Calculate crypto_arbitrage_calculatorCalculator values';

  calculate(inputs: crypto_arbitrage_calculatorCalculatorInputs): crypto_arbitrage_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: crypto_arbitrage_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: crypto_arbitrage_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
