import { Calculator } from '../../engines/CalculatorEngine';
import { correlation_calculatorCalculatorInputs, correlation_calculatorCalculatorResults, correlation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class correlation_calculatorCalculatorCalculator implements Calculator<correlation_calculatorCalculatorInputs, correlation_calculatorCalculatorResults> {
  readonly id = 'correlation_calculatorCalculator';
  readonly name = 'correlation_calculatorCalculator Calculator';
  readonly description = 'Calculate correlation_calculatorCalculator values';

  calculate(inputs: correlation_calculatorCalculatorInputs): correlation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: correlation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: correlation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
