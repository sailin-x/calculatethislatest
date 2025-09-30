import { Calculator } from '../../engines/CalculatorEngine';
import { ammonia_calculatorCalculatorInputs, ammonia_calculatorCalculatorResults, ammonia_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ammonia_calculatorCalculatorCalculator implements Calculator<ammonia_calculatorCalculatorInputs, ammonia_calculatorCalculatorResults> {
  readonly id = 'ammonia_calculatorCalculator';
  readonly name = 'ammonia_calculatorCalculator Calculator';
  readonly description = 'Calculate ammonia_calculatorCalculator values';

  calculate(inputs: ammonia_calculatorCalculatorInputs): ammonia_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ammonia_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ammonia_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
