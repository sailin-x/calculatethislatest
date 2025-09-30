import { Calculator } from '../../engines/CalculatorEngine';
import { child_support_calculatorCalculatorInputs, child_support_calculatorCalculatorResults, child_support_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class child_support_calculatorCalculatorCalculator implements Calculator<child_support_calculatorCalculatorInputs, child_support_calculatorCalculatorResults> {
  readonly id = 'child_support_calculatorCalculator';
  readonly name = 'child_support_calculatorCalculator Calculator';
  readonly description = 'Calculate child_support_calculatorCalculator values';

  calculate(inputs: child_support_calculatorCalculatorInputs): child_support_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: child_support_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: child_support_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
