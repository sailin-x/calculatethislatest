import { Calculator } from '../../engines/CalculatorEngine';
import { maximum_drawdown_calculatorCalculatorInputs, maximum_drawdown_calculatorCalculatorResults, maximum_drawdown_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class maximum_drawdown_calculatorCalculatorCalculator implements Calculator<maximum_drawdown_calculatorCalculatorInputs, maximum_drawdown_calculatorCalculatorResults> {
  readonly id = 'maximum_drawdown_calculatorCalculator';
  readonly name = 'maximum_drawdown_calculatorCalculator Calculator';
  readonly description = 'Calculate maximum_drawdown_calculatorCalculator values';

  calculate(inputs: maximum_drawdown_calculatorCalculatorInputs): maximum_drawdown_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: maximum_drawdown_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: maximum_drawdown_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
