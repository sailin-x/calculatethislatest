import { Calculator } from '../../engines/CalculatorEngine';
import { body_adiposity_index_calculatorCalculatorInputs, body_adiposity_index_calculatorCalculatorResults, body_adiposity_index_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class body_adiposity_index_calculatorCalculatorCalculator implements Calculator<body_adiposity_index_calculatorCalculatorInputs, body_adiposity_index_calculatorCalculatorResults> {
  readonly id = 'body_adiposity_index_calculatorCalculator';
  readonly name = 'body_adiposity_index_calculatorCalculator Calculator';
  readonly description = 'Calculate body_adiposity_index_calculatorCalculator values';

  calculate(inputs: body_adiposity_index_calculatorCalculatorInputs): body_adiposity_index_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: body_adiposity_index_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: body_adiposity_index_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
