import { Calculator } from '../../engines/CalculatorEngine';
import { growth_hormone_calculatorCalculatorInputs, growth_hormone_calculatorCalculatorResults, growth_hormone_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class growth_hormone_calculatorCalculatorCalculator implements Calculator<growth_hormone_calculatorCalculatorInputs, growth_hormone_calculatorCalculatorResults> {
  readonly id = 'growth_hormone_calculatorCalculator';
  readonly name = 'growth_hormone_calculatorCalculator Calculator';
  readonly description = 'Calculate growth_hormone_calculatorCalculator values';

  calculate(inputs: growth_hormone_calculatorCalculatorInputs): growth_hormone_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: growth_hormone_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: growth_hormone_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
