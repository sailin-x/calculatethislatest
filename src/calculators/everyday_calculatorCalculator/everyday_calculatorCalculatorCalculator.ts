import { Calculator } from '../../engines/CalculatorEngine';
import { everyday_calculatorCalculatorInputs, everyday_calculatorCalculatorResults, everyday_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class everyday_calculatorCalculatorCalculator implements Calculator<everyday_calculatorCalculatorInputs, everyday_calculatorCalculatorResults> {
  readonly id = 'everyday_calculatorCalculator';
  readonly name = 'everyday_calculatorCalculator Calculator';
  readonly description = 'Calculate everyday_calculatorCalculator values';

  calculate(inputs: everyday_calculatorCalculatorInputs): everyday_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: everyday_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: everyday_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
