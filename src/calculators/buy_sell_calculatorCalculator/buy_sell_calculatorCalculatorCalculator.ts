import { Calculator } from '../../engines/CalculatorEngine';
import { buy_sell_calculatorCalculatorInputs, buy_sell_calculatorCalculatorResults, buy_sell_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class buy_sell_calculatorCalculatorCalculator implements Calculator<buy_sell_calculatorCalculatorInputs, buy_sell_calculatorCalculatorResults> {
  readonly id = 'buy_sell_calculatorCalculator';
  readonly name = 'buy_sell_calculatorCalculator Calculator';
  readonly description = 'Calculate buy_sell_calculatorCalculator values';

  calculate(inputs: buy_sell_calculatorCalculatorInputs): buy_sell_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: buy_sell_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: buy_sell_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
