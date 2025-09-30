import { Calculator } from '../../engines/CalculatorEngine';
import { body_frame_size_calculatorCalculatorInputs, body_frame_size_calculatorCalculatorResults, body_frame_size_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class body_frame_size_calculatorCalculatorCalculator implements Calculator<body_frame_size_calculatorCalculatorInputs, body_frame_size_calculatorCalculatorResults> {
  readonly id = 'body_frame_size_calculatorCalculator';
  readonly name = 'body_frame_size_calculatorCalculator Calculator';
  readonly description = 'Calculate body_frame_size_calculatorCalculator values';

  calculate(inputs: body_frame_size_calculatorCalculatorInputs): body_frame_size_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: body_frame_size_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: body_frame_size_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
