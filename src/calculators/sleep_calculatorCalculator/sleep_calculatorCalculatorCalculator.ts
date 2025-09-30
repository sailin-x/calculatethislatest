import { Calculator } from '../../engines/CalculatorEngine';
import { sleep_calculatorCalculatorInputs, sleep_calculatorCalculatorResults, sleep_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class sleep_calculatorCalculatorCalculator implements Calculator<sleep_calculatorCalculatorInputs, sleep_calculatorCalculatorResults> {
  readonly id = 'sleep_calculatorCalculator';
  readonly name = 'sleep_calculatorCalculator Calculator';
  readonly description = 'Calculate sleep_calculatorCalculator values';

  calculate(inputs: sleep_calculatorCalculatorInputs): sleep_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: sleep_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: sleep_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
