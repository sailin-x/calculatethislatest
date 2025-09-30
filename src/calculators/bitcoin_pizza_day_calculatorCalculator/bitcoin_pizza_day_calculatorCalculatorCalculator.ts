import { Calculator } from '../../engines/CalculatorEngine';
import { bitcoin_pizza_day_calculatorCalculatorInputs, bitcoin_pizza_day_calculatorCalculatorResults, bitcoin_pizza_day_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class bitcoin_pizza_day_calculatorCalculatorCalculator implements Calculator<bitcoin_pizza_day_calculatorCalculatorInputs, bitcoin_pizza_day_calculatorCalculatorResults> {
  readonly id = 'bitcoin_pizza_day_calculatorCalculator';
  readonly name = 'bitcoin_pizza_day_calculatorCalculator Calculator';
  readonly description = 'Calculate bitcoin_pizza_day_calculatorCalculator values';

  calculate(inputs: bitcoin_pizza_day_calculatorCalculatorInputs): bitcoin_pizza_day_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: bitcoin_pizza_day_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: bitcoin_pizza_day_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
