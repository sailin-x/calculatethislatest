import { Calculator } from '../../engines/CalculatorEngine';
import { body_recomposition_calculatorCalculatorInputs, body_recomposition_calculatorCalculatorResults, body_recomposition_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class body_recomposition_calculatorCalculatorCalculator implements Calculator<body_recomposition_calculatorCalculatorInputs, body_recomposition_calculatorCalculatorResults> {
  readonly id = 'body_recomposition_calculatorCalculator';
  readonly name = 'body_recomposition_calculatorCalculator Calculator';
  readonly description = 'Calculate body_recomposition_calculatorCalculator values';

  calculate(inputs: body_recomposition_calculatorCalculatorInputs): body_recomposition_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: body_recomposition_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: body_recomposition_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
