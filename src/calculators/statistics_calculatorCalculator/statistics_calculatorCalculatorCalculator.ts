import { Calculator } from '../../engines/CalculatorEngine';
import { statistics_calculatorCalculatorInputs, statistics_calculatorCalculatorResults, statistics_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class statistics_calculatorCalculatorCalculator implements Calculator<statistics_calculatorCalculatorInputs, statistics_calculatorCalculatorResults> {
  readonly id = 'statistics_calculatorCalculator';
  readonly name = 'statistics_calculatorCalculator Calculator';
  readonly description = 'Calculate statistics_calculatorCalculator values';

  calculate(inputs: statistics_calculatorCalculatorInputs): statistics_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: statistics_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: statistics_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
